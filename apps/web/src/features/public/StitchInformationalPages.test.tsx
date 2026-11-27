import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { AppRouter } from '../../app/AppRouter';

const PAGES = [
  { path: '/public/privacy-policy', title: 'Privacy Policy' },
  { path: '/public/terms-of-service', title: 'Terms of Service' },
  { path: '/public/operational-security', title: 'Operational Security' },
] as const;

describe('approved informational public pages', () => {
  afterEach(() => {
    cleanup();
  });

  it.each(PAGES)('renders $title as a static placeholder page', async ({ path, title }) => {
    window.location.hash = `#${path}`;
    render(
      <HashRouter>
        <AppRouter />
      </HashRouter>,
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: title })).not.toBeNull();
    });
    expect(screen.getByText('Coming Soon')).not.toBeNull();
    expect(screen.getByText(/We're preparing the information for this page/)).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Continue exploring SmartFarm' }),
    ).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Back to Home' }).getAttribute('href')).toBe(
      '#/public/home',
    );
    expect(screen.getByRole('link', { name: 'Contact SmartFarm' }).getAttribute('href')).toBe(
      '#/public/contact',
    );
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Terms of Service' })).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Operational Security' })).not.toBeNull();
  });
});
