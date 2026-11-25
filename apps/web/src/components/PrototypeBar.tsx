import { getDataSource } from '@smartfarm/data-source';
import { PrototypeRoleSelector } from '../auth/prototype-role';

export function PrototypeBar() {
  return (
    <div className="sf-prototype-bar">
      <span>{getDataSource().labels.fixtureNotice}</span>
      <PrototypeRoleSelector />
    </div>
  );
}
