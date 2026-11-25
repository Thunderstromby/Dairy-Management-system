import { publicRoutes } from '../../app/routes';
import { DEFAULT_ROUTE, useHashRoute } from '../../app/useHashRoute';
import { scrollToSection } from './scrollToSection';

const STITCH_FOOTER_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About SmartFarm' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'dashboard-preview', label: 'Dashboard Preview' },
  { id: 'contact', label: 'Contact' },
] as const;

function StitchFooter() {
  return (
    <footer className="sf-public-footer sf-public-footer--stitch">
      <div className="sf-public-footer__inner">
        <div>
          <div className="sf-brand" style={{ color: 'var(--color-surface)' }}>
            <span
              className="sf-brand__mark"
              style={{ background: '#ffffff', color: 'var(--color-primary)' }}
            >
              S
            </span>
            SmartFarm
          </div>
          <p className="sf-public-footer__stitch-copy">
            The intelligence behind better dairy farming. Connecting herd care, milk yields,
            operations, and management into one reliable workspace.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul className="sf-public-footer__stitch-links">
            {STITCH_FOOTER_LINKS.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(event) => scrollToSection(event, item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Inquiries</h3>
          <p className="sf-public-footer__stitch-copy">
            Schedule an operational consultation with our agricultural software engineering team.
          </p>
          <a
            className="sf-public-footer__stitch-link"
            href="#contact"
            onClick={(event) => scrollToSection(event, 'contact')}
          >
            Connect with our team →
          </a>
        </div>
      </div>

      <div className="sf-public-footer__bottom sf-public-footer__bottom--stitch">
        <span>Copyright © 2026 SmartFarm. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service · Operational Security — content pending</span>
      </div>
    </footer>
  );
}

export function PublicFooter() {
  const route = useHashRoute();

  if (route === DEFAULT_ROUTE) {
    return <StitchFooter />;
  }

  return (
    <footer className="sf-public-footer">
      <div className="sf-public-footer__inner">
        <div>
          <div className="sf-brand" style={{ color: 'var(--color-surface)' }}>
            <span
              className="sf-brand__mark"
              style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}
            >
              S
            </span>
            SmartFarm
          </div>
          <p style={{ marginTop: 12, maxWidth: 320, opacity: 0.82 }}>
            Clarity for everyday dairy farm operations.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            {publicRoutes.map((item) => (
              <li key={item.id}>
                <a href={`#${item.path}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Inquiries</h3>
          <p style={{ margin: 0, opacity: 0.82 }}>
            Use the public contact form to reach the SmartFarm team. No public account registration
            or checkout is offered.
          </p>
          <a
            className="sf-button sf-button--secondary"
            style={{ marginTop: 16 }}
            href="#/public/contact"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="sf-public-footer__bottom">
        © {new Date().getFullYear()} SmartFarm. Approved contact details and legal links pending
        owner content.
      </div>
    </footer>
  );
}
