import { getDataSource } from '@smartfarm/data-source';
import { useHashRoute } from '../app/useHashRoute';
import { PrototypeRoleSelector } from '../auth/prototype-role';

export function PrototypeBar() {
  const route = useHashRoute();

  if (route.startsWith('/public/')) {
    return null;
  }

  return (
    <div className="sf-prototype-bar">
      <span>{getDataSource().labels.fixtureNotice}</span>
      <PrototypeRoleSelector />
    </div>
  );
}
