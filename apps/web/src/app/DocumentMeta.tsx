import { useEffect } from 'react';
import { findScreen } from './routes';
import { useAppRoute } from './useAppRoute';

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

/** Per-route document metadata; private and unknown routes are never indexed. */
export function DocumentMeta() {
  const route = useAppRoute();
  const screen = findScreen(route);

  useEffect(() => {
    const isPublic = screen?.surface === 'public';
    const title = screen ? `${screen.title} | SmartFarm` : 'Screen not found | SmartFarm';
    const description = screen?.description ?? 'No approved sitemap screen matches this address.';
    const canonical = `${window.location.origin}/#${route}`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', isPublic ? 'index, follow' : 'noindex, nofollow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', isPublic ? 'website' : 'article');
    setMeta('property', 'og:url', canonical);
    setCanonical(canonical);
  }, [route, screen]);

  return null;
}
