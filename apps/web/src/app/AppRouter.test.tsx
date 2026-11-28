import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { PrototypeRoleProvider } from '../auth/prototype-role';
import type { PrototypeRole } from '../data/types';
import { AppRouter } from './AppRouter';

vi.mock('@smartfarm/data-source', async () => {
  const { createFixtureDataSource } = await import('../data/fixture-adapter');
  return { getDataSource: createFixtureDataSource };
});

async function renderAt(path: string, role: PrototypeRole = 'guest') {
  window.location.hash = path;
  const result = render(
    <HashRouter>
      <PrototypeRoleProvider initialRole={role}>
        <AppRouter />
      </PrototypeRoleProvider>
    </HashRouter>,
  );

  await waitFor(() => {
    expect(screen.queryByText(/Loading screen layout/)).toBeNull();
  });

  return result;
}

describe('AppRouter role boundaries', () => {
  beforeEach(() => {
    window.location.hash = '#/public/home';
  });

  afterEach(() => {
    cleanup();
  });

  it('places the static signature strip after the footer on public pages', async () => {
    const { container } = await renderAt('#/public/home');

    const footer = container.querySelector('footer');
    const strip = container.querySelector('.sf-stitch-brand-strip');
    expect(footer).not.toBeNull();
    expect(strip).not.toBeNull();
    const position = footer!.compareDocumentPosition(strip!);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('starts each public page at the top after following a page link', async () => {
    await renderAt('#/public/home');
    const scrollingElement = document.scrollingElement ?? document.documentElement;
    scrollingElement.scrollTop = 400;

    await userEvent.click(screen.getByRole('link', { name: 'About' }));

    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', {
            level: 1,
            name: 'Better understanding. Better connected dairy farming.',
          }),
        ).not.toBeNull();
      },
      { timeout: 5000 },
    );
    expect(scrollingElement.scrollTop).toBe(0);
  });

  it('allows a Farm Admin to open the approved farm dashboard', async () => {
    await renderAt('#/farm/dashboard', 'farm-admin');

    expect(screen.getByRole('heading', { level: 1, name: 'Dashboard' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Milk Production & Shift Yield' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Public site' })).toBeTruthy();
  });

  it('denies a Supervisor access to payroll', async () => {
    await renderAt('#/farm/payroll/salary', 'farm-supervisor');

    expect(screen.queryByRole('heading', { level: 1, name: 'Salary Management' })).toBeNull();
    expect(screen.getByText(/Restricted in this preview/)).toBeTruthy();
  });

  it('denies a Super Admin access to farm operational data', async () => {
    await renderAt('#/farm/dashboard', 'super-admin');

    expect(screen.queryByRole('heading', { level: 1, name: 'Dashboard' })).toBeNull();
    expect(screen.getByText(/Restricted in this preview/)).toBeTruthy();
  });

  it('denies a guest access to platform provisioning', async () => {
    await renderAt('#/platform/customers/new', 'guest');

    expect(screen.queryByRole('heading', { level: 1, name: 'Add Customer' })).toBeNull();
    expect(screen.getByText(/Restricted in this preview/)).toBeTruthy();
  });

  it('allows a Super Admin to open customer management', async () => {
    await renderAt('#/platform/customers', 'super-admin');

    expect(screen.getAllByRole('heading', { name: 'Customer Management' }).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText(/View Details/).length).toBeGreaterThan(0);
  });

  it('hides report export controls from a Supervisor', async () => {
    await renderAt('#/farm/reports/milk', 'farm-supervisor');

    expect(screen.getByRole('heading', { level: 1, name: 'Milk Reports' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Export/ })).toBeNull();
    expect(screen.getByText(/No export or print action is available here/)).toBeTruthy();
  });

  it('hides Farm Admin-only routes from Supervisor navigation', async () => {
    await renderAt('#/farm/dashboard', 'farm-supervisor');

    expect(screen.queryByRole('link', { name: 'Salary Management' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Leave Management' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Stock Adjustments' })).toBeNull();
    expect(screen.getByRole('link', { name: 'Animal List' })).toBeTruthy();
  });

  it('opens a local-draft confirmation dialog for workspace suspension', async () => {
    const user = userEvent.setup();
    await renderAt('#/platform/workspace-suspension', 'super-admin');

    await user.click(screen.getByRole('button', { name: 'Review suspension draft' }));

    expect(screen.getByRole('dialog', { name: 'Confirm suspension draft' })).toBeTruthy();
    expect(screen.getByText(/does not suspend a workspace/)).toBeTruthy();
  });

  it('shows a not-found state for an unapproved route', async () => {
    await renderAt('#/not-approved');

    expect(screen.getByRole('heading', { level: 1, name: 'Screen not found' })).toBeTruthy();
  });
});
