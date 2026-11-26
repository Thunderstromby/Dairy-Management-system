import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppLink } from './AppLink';
import { findScreen } from './routes';
import { DEFAULT_ROUTE, useAppRoute } from './useAppRoute';
import { RoleGuard } from '../auth/prototype-role';
import { PublicFooter } from '../features/public/PublicFooter';
import { PublicInnerContent } from '../features/public/PublicContent';
import { PublicNavbar } from '../features/public/PublicNavbar';
import { StitchBrandStrip } from '../features/public/StitchBrandStrip';
import { StandaloneScreen, WorkspaceAppShell } from '../features/workspace/AppShell';
import { WorkspaceScreen } from '../features/workspace/WorkspaceScreens';
import type { ScreenDefinition } from './types';

function NotFound() {
  return (
    <main className="sf-page">
      <div className="sf-content">
        <div className="sf-state">
          <h1>Screen not found</h1>
          <p>No approved sitemap screen matches this address.</p>
          <AppLink
            className="sf-button sf-button--primary"
            href="#/public/home"
            style={{ marginTop: 16 }}
          >
            Return Home
          </AppLink>
        </div>
      </div>
    </main>
  );
}

function PrivateScreen({ screen }: { screen: ScreenDefinition }) {
  const content = <WorkspaceScreen screen={screen} />;
  const standalone = screen.template === 'login' || screen.template === 'state';

  const view = standalone ? (
    <StandaloneScreen screen={screen}>{content}</StandaloneScreen>
  ) : (
    <WorkspaceAppShell screen={screen}>{content}</WorkspaceAppShell>
  );

  if (!screen.allowedRoles?.length) {
    return view;
  }

  return <RoleGuard allow={screen.allowedRoles}>{view}</RoleGuard>;
}

export function AppRouter() {
  const location = useLocation();
  const route = useAppRoute();
  const screen = findScreen(route);

  useEffect(() => {
    const scrollingElement = document.scrollingElement ?? document.documentElement;
    scrollingElement.scrollTop = 0;
  }, [route]);

  if (location.pathname === '/') {
    return <Navigate to={DEFAULT_ROUTE} replace />;
  }

  if (!screen) {
    return <NotFound />;
  }

  if (screen.surface === 'public') {
    return (
      <div className={screen.template === 'home' ? 'sf-page sf-page--home' : 'sf-page'}>
        <PublicNavbar />
        <main>
          <PublicInnerContent screenId={screen.id} />
        </main>
        <PublicFooter />
        <StitchBrandStrip />
      </div>
    );
  }

  return <PrivateScreen screen={screen} />;
}
