import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

type AppLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string };

/**
 * Keeps the documented `#/public/...` hash-route links while delegating
 * navigation to React Router. Bare `#section` links stay ordinary anchors so
 * the section-scroll helper can handle them.
 */
export function AppLink({ href, ...props }: AppLinkProps) {
  if (href.startsWith('#/')) {
    return <Link to={href.slice(1)} {...props} />;
  }
  return <a href={href} {...props} />;
}
