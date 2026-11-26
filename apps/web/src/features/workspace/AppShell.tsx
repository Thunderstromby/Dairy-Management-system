import {
  Bell,
  Building2,
  CalendarCheck,
  ChevronLeft,
  Database,
  FileBarChart,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Menu,
  Milk,
  Package,
  PawPrint,
  Settings,
  ShieldCheck,
  Sprout,
  Users,
  UserCog,
  Wallet,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { AppLink } from '../../app/AppLink';
import { routesForSurface } from '../../app/routes';
import type { ScreenDefinition, Surface } from '../../app/types';
import { usePrototypeRole } from '../../auth/prototype-role';

const GROUP_ICONS: Record<string, LucideIcon> = {
  Overview: LayoutDashboard,
  Customers: Users,
  Workspaces: Building2,
  'Farm Admins': UserCog,
  Access: ShieldCheck,
  Animals: PawPrint,
  'Animal Health': HeartPulse,
  'Milk Production': Milk,
  'Milk Management': Milk,
  Inventory: Package,
  Feeding: Sprout,
  Workers: Users,
  Attendance: CalendarCheck,
  Payroll: Wallet,
  Finance: Wallet,
  Equipment: Wrench,
  Notifications: Bell,
  Reports: FileBarChart,
  'Data Management': Database,
  Settings: Settings,
};

function surfaceLabel(surface: Surface): string {
  return surface === 'platform' ? 'Platform administration' : 'Farm workspace';
}

export function WorkspaceAppShell({
  screen,
  children,
}: {
  screen: ScreenDefinition;
  children: ReactNode;
}) {
  const { role } = usePrototypeRole();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleRoutes = routesForSurface(screen.surface).filter(
    (item) =>
      item.group !== undefined &&
      item.allowedRoles !== undefined &&
      item.allowedRoles.includes(role),
  );

  const groups: { name: string; items: readonly ScreenDefinition[] }[] = [];
  for (const item of visibleRoutes) {
    const groupName = item.group ?? 'Other';
    const existing = groups.find((group) => group.name === groupName);
    if (existing) {
      (existing.items as ScreenDefinition[]).push(item);
    } else {
      groups.push({ name: groupName, items: [item] });
    }
  }

  return (
    <div className="sf-shell" data-sidebar={collapsed ? 'collapsed' : 'expanded'}>
      <aside
        id="workspace-nav"
        className={`sf-sidebar${mobileOpen ? ' sf-sidebar--open' : ''}`}
        aria-label={`${surfaceLabel(screen.surface)} navigation`}
      >
        <div className="sf-sidebar__head">
          <AppLink className="sf-brand" href="#/public/home">
            <span className="sf-brand__mark" aria-hidden="true">
              S
            </span>
            <span className="sf-sidebar__label">SmartFarm</span>
          </AppLink>
          <button
            type="button"
            className="sf-sidebar__collapse"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((value) => !value)}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
        </div>

        <nav className="sf-sidebar__nav">
          {groups.length === 0 ? (
            <p className="sf-panel__hint">
              No navigation items are permitted for this preview role.
            </p>
          ) : (
            groups.map((group) => {
              const Icon = GROUP_ICONS[group.name] ?? FileText;
              return (
                <div key={group.name}>
                  <p className="sf-sidebar__group">{group.name}</p>
                  {group.items.map((item) => (
                    <AppLink
                      key={item.id}
                      className="sf-sidebar__link"
                      href={`#${item.path}`}
                      aria-current={screen.id === item.id ? 'page' : undefined}
                      title={item.title}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={17} aria-hidden="true" />
                      <span className="sf-sidebar__label">{item.title}</span>
                    </AppLink>
                  ))}
                </div>
              );
            })
          )}
        </nav>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="sf-sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div className="sf-main">
        <header className="sf-topbar">
          <div className="sf-topbar__context">
            <button
              type="button"
              className="sf-shell__mobile-toggle"
              aria-expanded={mobileOpen}
              aria-controls="workspace-nav"
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <X size={18} aria-hidden="true" />
              ) : (
                <Menu size={18} aria-hidden="true" />
              )}
              <span>Menu</span>
            </button>
            <span>{surfaceLabel(screen.surface)}</span>
          </div>
          <div className="sf-topbar__actions">
            <span className="sf-topbar__badge">Preview role: {role}</span>
            <AppLink className="sf-link" href="#/public/home">
              Public site
            </AppLink>
          </div>
        </header>

        <main className="sf-content">
          <div className="sf-page-header">
            <div>
              <p className="sf-breadcrumb">
                {surfaceLabel(screen.surface)} / {screen.group ?? 'Access'} / {screen.title}
              </p>
              <h1>{screen.title}</h1>
              <p>{screen.description}</p>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function StandaloneScreen({
  screen,
  children,
}: {
  screen: ScreenDefinition;
  children: ReactNode;
}) {
  return (
    <main className="sf-login-wrap">
      <div className="sf-login-card">
        <AppLink className="sf-brand" href="#/public/home">
          <span className="sf-brand__mark" aria-hidden="true">
            S
          </span>
          SmartFarm
        </AppLink>
        <p className="sf-eyebrow" style={{ marginTop: 20 }}>
          {screen.surface === 'platform' ? 'Super Admin Panel' : 'Farm application'}
        </p>
        <h1>{screen.title}</h1>
        <p>{screen.description}</p>
        {children}
        <p style={{ marginTop: 20 }}>
          <AppLink className="sf-link" href="#/public/home">
            Return to public site
          </AppLink>
        </p>
      </div>
    </main>
  );
}
