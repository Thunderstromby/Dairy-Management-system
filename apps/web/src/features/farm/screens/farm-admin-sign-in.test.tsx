import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { FarmAdminSignIn } from './farm-admin-sign-in';

describe('Farm Admin sign-in (Stitch screen)', () => {
  afterEach(() => {
    cleanup();
  });

  it('reproduces the approved placeholder content', () => {
    render(<FarmAdminSignIn />);

    expect(screen.getByRole('heading', { level: 1, name: 'SmartFarm' })).not.toBeNull();
    expect(screen.getByText('Admin Portal')).not.toBeNull();
    expect(screen.getByText('Sign in to manage your assigned dairy workspace.')).not.toBeNull();
    expect(screen.getByLabelText('Farm Admin Identifier or Email')).not.toBeNull();
    expect(screen.getByLabelText('Password')).not.toBeNull();
    expect(screen.getByRole('button', { name: /Sign In to Farm Workspace/ })).not.toBeNull();
    expect(screen.getByText('Forgot Password?').getAttribute('aria-disabled')).toBe('true');
    expect(screen.getByText('Assigned workspace')).not.toBeNull();
  });

  it('toggles password visibility and does not claim authentication', async () => {
    const user = userEvent.setup();
    render(<FarmAdminSignIn />);
    const password = screen.getByLabelText('Password');

    expect(password.getAttribute('type')).toBe('password');
    await user.click(screen.getByRole('button', { name: 'Toggle password view' }));
    expect(password.getAttribute('type')).toBe('text');

    await user.type(screen.getByLabelText('Farm Admin Identifier or Email'), 'admin@example.com');
    await user.type(password, 'example-password');
    await user.click(screen.getByRole('button', { name: /Sign In to Farm Workspace/ }));
    expect(
      screen.getByRole('status').textContent?.includes('not connected in this prototype'),
    ).toBe(true);
  });
});
