import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { PrototypeRole } from '../data/types';

const ROLES: readonly PrototypeRole[] = ['guest', 'super-admin', 'farm-admin', 'farm-supervisor'];

interface PrototypeRoleContextValue {
  role: PrototypeRole;
  setRole: (role: PrototypeRole) => void;
}

const PrototypeRoleContext = createContext<PrototypeRoleContextValue | null>(null);

export function PrototypeRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<PrototypeRole>('guest');
  const value = useMemo(() => ({ role, setRole }), [role]);

  return <PrototypeRoleContext.Provider value={value}>{children}</PrototypeRoleContext.Provider>;
}

export function usePrototypeRole(): PrototypeRoleContextValue {
  const context = useContext(PrototypeRoleContext);
  if (!context) {
    throw new Error('PrototypeRoleProvider is required');
  }
  return context;
}

export function PrototypeRoleSelector() {
  const { role, setRole } = usePrototypeRole();

  return (
    <fieldset>
      <legend>Prototype role selector — not authentication</legend>
      {ROLES.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name="prototype-role"
            value={option}
            checked={role === option}
            onChange={() => setRole(option)}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
}

export function RoleGuard({
  allow,
  children,
}: {
  allow: readonly PrototypeRole[];
  children: ReactNode;
}) {
  const { role } = usePrototypeRole();
  const permitted = allow.includes(role);

  if (!permitted) {
    return (
      <p role="status">
        Restricted in this prototype. Prototype guard only — server enforcement pending.
      </p>
    );
  }

  return <>{children}</>;
}
