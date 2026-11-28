import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { AppRouter } from '../../app/AppRouter';
import { SuperAdminSignIn } from './SuperAdminSignIn';

describe('Super Admin sign-in (Stitch screen)', () => {
  afterEach(() => {
    cleanup();
  });

  it('reproduces the approved two-panel Stitch content', () => {
    render(<SuperAdminSignIn />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Enterprise Dairy Management & Tenant Administration',
      }),
    ).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Super Admin Portal' })).not.toBeNull();
    expect(screen.getByLabelText('Administrative Email')).not.toBeNull();
    expect(screen.getByLabelText('Password')).not.toBeNull();
    expect(screen.getByLabelText('Remember this workstation')).not.toBeNull();
    expect(screen.getByRole('button', { name: /Sign In to Super Admin/ })).not.toBeNull();
    expect(screen.getByText('Forgot credential support?').getAttribute('aria-disabled')).toBe(
      'true',
    );
  });

  it('toggles password visibility and never claims authentication', async () => {
    const user = userEvent.setup();
    render(<SuperAdminSignIn />);
    const password = screen.getByLabelText('Password');

    expect(password.getAttribute('type')).toBe('password');
    await user.click(screen.getByRole('button', { name: 'Toggle password visibility' }));
    expect(password.getAttribute('type')).toBe('text');

    await user.type(screen.getByLabelText('Administrative Email'), 'admin@example.com');
    await user.type(password, 'example-password');
    await user.click(screen.getByRole('button', { name: /Sign In to Super Admin/ }));
    expect(
      screen.getByRole('status').textContent?.includes('not connected in this prototype'),
    ).toBe(true);
  });

  it('renders on the approved platform.login route', async () => {
    window.location.hash = '#/platform/login';
    render(
      <HashRouter>
        <AppRouter />
      </HashRouter>,
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Enterprise Dairy Management & Tenant Administration',
      }),
    ).not.toBeNull();
  });

  it('keeps the recovery label non-interactive', () => {
    render(<SuperAdminSignIn />);
    const recovery = screen.getByText('Forgot credential support?');
    expect(recovery.tagName).toBe('SPAN');
    fireEvent.click(recovery);
    expect(screen.queryByRole('status')).toBeNull();
  });
});
