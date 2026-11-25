import { findScreen } from './routes';
import { useHashRoute } from './useHashRoute';
import { PublicFooter } from '../features/public/PublicFooter';
import { PublicInnerContent } from '../features/public/PublicContent';
import { PublicNavbar } from '../features/public/PublicNavbar';

export function AppRouter() {
  const route = useHashRoute();
  const screen = findScreen(route);

  if (!screen) {
    return (
      <main className="sf-page">
        <div className="sf-content">
          <div className="sf-state">
            <h1>Screen not found</h1>
            <p>No approved sitemap screen matches this address.</p>
            <a
              className="sf-button sf-button--primary"
              href="#/public/home"
              style={{ marginTop: 16 }}
            >
              Return Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (screen.surface === 'public') {
    return (
      <div className="sf-page">
        <PublicNavbar />
        <main>
          {screen.template === 'home' ? null : (
            <div className="sf-inner-hero">
              <div className="sf-inner-hero__inner">
                <p className="sf-eyebrow">SmartFarm</p>
                <h1>{screen.title}</h1>
                <p>{screen.description}</p>
              </div>
            </div>
          )}
          <PublicInnerContent screenId={screen.id} />
        </main>
        <PublicFooter />
      </div>
    );
  }

  return null;
}
