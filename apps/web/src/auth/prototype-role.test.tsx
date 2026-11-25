import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PrototypeRoleProvider, PrototypeRoleSelector, RoleGuard } from './prototype-role';

describe('prototype route guard', () => {
  it('denies an unselected role and labels the guard as prototype-only', () => {
    render(
      <PrototypeRoleProvider>
        <RoleGuard allow={['farm-admin']}>
          <p>Protected content</p>
        </RoleGuard>
      </PrototypeRoleProvider>,
    );

    expect(screen.queryByText('Protected content')).toBeNull();
    expect(screen.getByText(/Restricted in this preview/)).toBeTruthy();
  });

  it('permits an explicitly selected prototype role', async () => {
    const user = userEvent.setup();

    render(
      <PrototypeRoleProvider>
        <PrototypeRoleSelector />
        <RoleGuard allow={['farm-admin']}>
          <p>Protected content</p>
        </RoleGuard>
      </PrototypeRoleProvider>,
    );

    await user.click(screen.getByLabelText('farm-admin'));
    expect(screen.getByText('Protected content')).toBeTruthy();
  });
});
