import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrototypeRoleProvider } from '../../../../auth/prototype-role';
import { afterEach, describe, expect, it } from 'vitest';
import { WorkerDirectoryScreen } from './worker-directory';

function renderDirectory(role: 'farm-admin' | 'farm-supervisor') {
  return render(
    <PrototypeRoleProvider initialRole={role}>
      <WorkerDirectoryScreen />
    </PrototypeRoleProvider>,
  );
}

describe('Worker Directory Add Worker integration', () => {
  afterEach(() => {
    cleanup();
  });

  it('opens the Stitch registration form as an accessible modal for Farm Admin', async () => {
    const user = userEvent.setup();
    renderDirectory('farm-admin');

    const cta = screen.getByRole('button', { name: /Add worker \(local preview\)/ });
    await user.click(cta);

    const dialog = screen.getByRole('dialog', { name: 'Worker registration' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(screen.getByRole('heading', { name: 'Register New Farm Worker' })).not.toBeNull();
    expect(screen.getByText('Identity & Personal Profile')).not.toBeNull();
    expect(screen.getByText('Operational & Farm Role')).not.toBeNull();
    expect(screen.getByText('Statutory Document Associations')).not.toBeNull();
    expect(screen.getByText(/rejects duplicate identity references per workspace/)).not.toBeNull();
    expect(screen.getByLabelText(/National Identity \(CNIC\)/)).not.toBeNull();
    expect(screen.getByLabelText(/Contact Name & Relation/)).not.toBeNull();
    expect(screen.getByLabelText(/Contact Phone Number/)).not.toBeNull();
    expect(screen.getByText('Worker Profile Photo')).not.toBeNull();
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Close worker registration');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(cta);
  });

  it('does not expose worker registration to Farm Supervisor', async () => {
    const user = userEvent.setup();
    renderDirectory('farm-supervisor');

    expect(screen.queryByRole('button', { name: /Add worker/ })).toBeNull();
    expect(screen.getByText('Farm Workforce Directory & Records')).not.toBeNull();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
