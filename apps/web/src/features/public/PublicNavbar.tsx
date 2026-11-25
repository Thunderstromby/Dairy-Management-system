import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { publicRoutes } from '../../app/routes';
import { DEFAULT_ROUTE, useHashRoute } from '../../app/useHashRoute';
import { scrollToSection } from './scrollToSection';

const STITCH_NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'contact', label: 'Contact' },
] as const;

export function PublicNavbar() {
  const route = useHashRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = route === DEFAULT_ROUTE;

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const update = () => setScrolled(window.scrollY > 80);

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHome]);

  const navClassName = isHome
    ? `sf-public-nav sf-public-nav--stitch${scrolled ? ' sf-public-nav--stitch-scrolled' : ''}`
    : 'sf-public-nav';

  return (
    <header className={navClassName}>
      <div className="sf-public-nav__inner">
        <a
          className="sf-brand"
          href={isHome ? '#hero' : '#/public/home'}
          onClick={isHome ? (event) => scrollToSection(event, 'hero') : undefined}
        >
          <span className="sf-brand__mark" aria-hidden="true">
            S
          </span>
          SmartFarm
        </a>

        <nav className="sf-public-nav__links" aria-label="Public navigation">
          {isHome
            ? STITCH_NAV_LINKS.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={index === 0 ? 'page' : undefined}
                  onClick={(event) => scrollToSection(event, item.id)}
                >
                  {item.label}
                </a>
              ))
            : publicRoutes.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.path}`}
                  aria-current={route === item.path ? 'page' : undefined}
                >
                  {item.title}
                </a>
              ))}
        </nav>

        <a
          className={isHome ? 'sf-public-nav__stitch-cta' : 'sf-button sf-button--primary'}
          href={isHome ? '#contact' : '#/public/contact'}
          onClick={isHome ? (event) => scrollToSection(event, 'contact') : undefined}
        >
          {isHome ? "Let's Talk" : 'Contact Us'}
        </a>

        <button
          type="button"
          className="sf-public-nav__toggle"
          aria-expanded={open}
          aria-controls="public-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          <span>Menu</span>
        </button>
      </div>

      {open ? (
        <nav
          id="public-mobile-nav"
          className="sf-public-nav__drawer"
          aria-label="Mobile navigation"
        >
          {isHome
            ? STITCH_NAV_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    scrollToSection(event, item.id);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))
            : publicRoutes.map((item) => (
                <a key={item.id} href={`#${item.path}`} onClick={() => setOpen(false)}>
                  {item.title}
                </a>
              ))}
          {isHome ? (
            <a
              className="sf-public-nav__stitch-mobile-cta"
              href="#contact"
              onClick={(event) => {
                scrollToSection(event, 'contact');
                setOpen(false);
              }}
            >
              Let&apos;s Talk
            </a>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
