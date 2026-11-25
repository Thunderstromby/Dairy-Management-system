import { getDataSource } from '@smartfarm/data-source';
import { DEFAULT_ROUTE, useHashRoute } from '../app/useHashRoute';
import { PrototypeRoleSelector } from '../auth/prototype-role';

export function PrototypeBar() {
  const route = useHashRoute();

  if (route === DEFAULT_ROUTE) {
    return null;
  }

  return (
    <div className="sf-prototype-bar">
      <span>{getDataSource().labels.fixtureNotice}</span>
      <PrototypeRoleSelector />
    </div>
  );
}
