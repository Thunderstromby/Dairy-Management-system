import { useLocation } from 'react-router-dom';

export const DEFAULT_ROUTE = '/public/home';

/** Reads the approved route from React Router's hash-based location. */
export function useAppRoute() {
  const location = useLocation();
  return location.pathname === '/' ? DEFAULT_ROUTE : location.pathname;
}
