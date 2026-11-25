import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { publicRoutes } from '../../app/routes';
import { useHashRoute } from '../../app/useHashRoute';

export function PublicNavbar() {
  const route = useHashRoute();
  const [open, setOpen] = useState(false);

  return (
    <header className="sf-public-nav">
      <div className="sf-public-nav__inner">
        <a className="sf-brand" href="#/public/home">
          <span className="sf-brand__mark" aria-hidden="true">
            S
          </span>
          SmartFarm
        </a>

        <nav className="sf-public-nav__links" aria-label="Public navigation">
          {publicRoutes.map((item) => (
            <a
              key={item.id}
              href={`#${item.path}`}
              aria-current={route === item.path ? 'page' : undefined}
            >
              {item.title}
            </a>
          ))}
        </nav>

        <a className="sf-button sf-button--primary" href="#/public/contact">
          Contact Us
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
          {publicRoutes.map((item) => (
            <a key={item.id} href={`#${item.path}`} onClick={() => setOpen(false)}>
              {item.title}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
