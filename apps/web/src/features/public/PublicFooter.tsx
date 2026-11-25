import { StitchLogo } from './StitchLogo';

const STITCH_FOOTER_LINKS = [
  { path: '/public/home', label: 'Home' },
  { path: '/public/about', label: 'About SmartFarm' },
  { path: '/public/features', label: 'Features' },
  { path: '/public/how-it-works', label: 'How It Works' },
  { path: '/public/benefits', label: 'Benefits' },
  { path: '/public/dashboard-preview', label: 'Dashboard Preview' },
  { path: '/public/contact', label: 'Contact' },
] as const;

export function PublicFooter() {
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
                <li key={item.path}>
                  <a href={`#${item.path}`} className="transition-colors hover:text-white">
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
              href="#/public/contact"
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
