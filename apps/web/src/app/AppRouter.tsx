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

  useEffect(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
    );
    sections.forEach((section, index) => {
      if (section.id === 'hero') return;
      section.classList.add('sf-scroll-reveal');
      const depth =
        section.dataset.sfDepth ??
        (section.querySelector('[data-sf-depth="product"]')
          ? 'product'
          : index === 0
            ? 'editorial'
            : 'standard');
      if (depth !== 'standard') section.dataset.sfDepth = depth;
      section.querySelectorAll<HTMLElement>('[data-sf-item]').forEach((item, itemIndex) => {
        item.style.setProperty('--sf-index', String(itemIndex));
      });
      section.style.transitionDelay = `${Math.min(index, 3) * 60}ms`;
      observer.observe(section);
    });
    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove('sf-scroll-reveal', 'is-visible');
        section.style.removeProperty('transition-delay');
      });
    };
  }, [route]);

  useEffect(() => {
    if (
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(min-width: 641px)').matches
    ) {
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>('#hero');
      if (!hero) return;
      const offset = Math.min(window.scrollY * 0.12, 72);
      hero.style.setProperty('--sf-hero-shift', `${offset}px`);
      hero.style.setProperty('--sf-hero-scale', `${1 + Math.min(window.scrollY / 12000, 0.035)}`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      const hero = document.querySelector<HTMLElement>('#hero');
      hero?.style.removeProperty('--sf-hero-shift');
      hero?.style.removeProperty('--sf-hero-scale');
    };
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
