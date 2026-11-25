import { useEffect, useState } from 'react';

export const DEFAULT_ROUTE = '/public/home';

function readRoute(): string {
  const route = window.location.hash.replace(/^#/, '');
  return route.startsWith('/') ? route : DEFAULT_ROUTE;
}

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = DEFAULT_ROUTE;
    }

    const update = () => setRoute(readRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.location.hash = path;
}
