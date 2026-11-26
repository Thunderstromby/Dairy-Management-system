import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AppLink } from '../../app/AppLink';
import { useAppRoute } from '../../app/useAppRoute';
import { StitchLogo } from './StitchLogo';

const STITCH_NAV_LINKS = [
  { path: '/public/home', label: 'Home' },
  { path: '/public/about', label: 'About' },
  { path: '/public/features', label: 'Features' },
  { path: '/public/how-it-works', label: 'How It Works' },
  { path: '/public/contact', label: 'Contact' },
] as const;

export function PublicNavbar() {
  const route = useAppRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const navLinkClass = (active: boolean) =>
    `nav-link py-1 transition-colors ${
      scrolled
        ? active
          ? 'relative text-deep-forest after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-harvest-gold after:scale-x-100'
          : 'text-deep-charcoal hover:text-pasture-green'
        : active
          ? 'relative text-white/90 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-harvest-gold after:scale-x-100'
          : 'text-white/80 hover:text-white'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-scrolled py-3.5 text-deep-charcoal' : 'py-5 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        <AppLink
          href="#/public/home"
          className="group flex items-center gap-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-pasture-green"
        >
          <StitchLogo />
          <span
            className={`font-heading text-xl font-extrabold tracking-tight transition-colors ${
              scrolled ? 'text-deep-forest' : 'text-white'
            }`}
          >
            SmartFarm
          </span>
        </AppLink>

        <nav
          className="hidden items-center space-x-9 text-[15px] font-medium tracking-wide md:flex"
          aria-label="Public navigation"
        >
          {STITCH_NAV_LINKS.map((item) => (
            <AppLink
              key={item.path}
              href={`#${item.path}`}
              aria-current={route === item.path ? 'page' : undefined}
              className={navLinkClass(route === item.path)}
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          <AppLink
            href="#/public/contact"
            aria-current={route === '/public/contact' ? 'page' : undefined}
            className="nav-cta inline-flex items-center justify-center rounded-lg bg-pasture-green px-5 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-[#2e6447] hover:shadow-md focus:ring-2 focus:ring-pasture-green focus:ring-offset-2"
          >
            {`Let's Talk`}
          </AppLink>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobileDrawer"
          onClick={() => setOpen((value) => !value)}
          className={`rounded-lg p-2 transition-colors focus:outline-none md:hidden ${
            scrolled ? 'text-deep-forest hover:bg-deep-forest/5' : 'text-white hover:bg-white/10'
          }`}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobileDrawer"
          className="fixed inset-x-0 top-[72px] z-40 flex flex-col justify-between border-t border-border-subtle bg-warm-ivory p-6 shadow-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col space-y-6 pt-4 font-heading text-lg font-semibold text-deep-forest">
            {STITCH_NAV_LINKS.map((item) => (
              <AppLink
                key={item.path}
                href={`#${item.path}`}
                aria-current={route === item.path ? 'page' : undefined}
                className="border-b border-border-subtle py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </AppLink>
            ))}
          </div>
          <div className="pb-12">
            <AppLink
              href="#/public/contact"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-lg bg-pasture-green py-3.5 text-base font-semibold text-white shadow-md"
            >
              {`Let's Talk`}
            </AppLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
