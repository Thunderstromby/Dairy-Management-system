import { publicRoutes } from '../../app/routes';
import { DEFAULT_ROUTE, useHashRoute } from '../../app/useHashRoute';
import { scrollToSection } from './scrollToSection';
import { StitchLogo } from './StitchLogo';

const STITCH_FOOTER_LINKS = [
  { id: 'hero', label: 'Home', target: 'hero' },
  { id: 'about', label: 'About SmartFarm', target: 'about' },
  { id: 'features', label: 'Features', target: 'features' },
  { id: 'how-it-works', label: 'How It Works', target: 'how-it-works' },
  { id: 'benefits', label: 'Benefits', target: 'features' },
  { id: 'dashboard-preview', label: 'Dashboard Preview', target: 'features' },
  { id: 'contact', label: 'Contact', target: 'contact' },
] as const;

function StitchFooter() {
  return (
    <footer className="border-t border-white/10 bg-deep-forest pb-12 pt-20 font-inter text-white/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <div className="group flex items-center gap-3">
              <StitchLogo className="h-8 w-8" />
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                SmartFarm
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              The intelligence behind better dairy farming. Connecting herd care, milk yields,
              operations, and management into one reliable workspace.
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="grid grid-cols-2 gap-y-2.5 text-sm">
              {STITCH_FOOTER_LINKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.target}`}
                    onClick={(event) => scrollToSection(event, item.target)}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-white">
              Inquiries
            </h4>
            <p className="mb-3 text-sm leading-relaxed text-white/70">
              Schedule an operational consultation with our agricultural software engineering team.
            </p>
            <a
              href="#contact"
              onClick={(event) => scrollToSection(event, 'contact')}
              className="text-sm font-semibold text-harvest-gold hover:underline"
            >
              Connect with our team →
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-white/50 sm:flex-row">
          <span>Copyright © 2026 SmartFarm. All rights reserved.</span>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Operational Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CanonicalFooter() {
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

export function PublicFooter() {
  const route = useHashRoute();

  return route === DEFAULT_ROUTE ? <StitchFooter /> : <CanonicalFooter />;
}
