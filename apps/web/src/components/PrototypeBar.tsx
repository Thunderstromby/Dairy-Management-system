import { getDataSource } from '@smartfarm/data-source';
import { useAppRoute } from '../app/useAppRoute';
import { PrototypeRoleSelector } from '../auth/prototype-role';

export function PrototypeBar() {
  const route = useAppRoute();

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
