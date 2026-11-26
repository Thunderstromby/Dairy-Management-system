import { cleanup, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { DocumentMeta } from './DocumentMeta';

function renderAt(path: string) {
  window.location.hash = `#${path}`;
  return render(
    <HashRouter>
      <DocumentMeta />
    </HashRouter>,
  );
}

function metaContent(selector: string) {
  return document.head.querySelector(selector)?.getAttribute('content');
}

describe('DocumentMeta', () => {
  afterEach(() => {
    cleanup();
  });

  it('uses the approved screen title and index directive on a public page', () => {
    renderAt('/public/about');

    expect(document.title).toBe('About SmartFarm | SmartFarm');
    expect(metaContent('meta[name="description"]')).toBe(
      'Product introduction and platform value proposition.',
    );
    expect(metaContent('meta[name="robots"]')).toBe('index, follow');
    expect(metaContent('meta[property="og:type"]')).toBe('website');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain(
      '/#/public/about',
    );
  });

  it('marks private and unknown routes noindex', () => {
    const privateRoute = renderAt('/farm/payroll/salary');
    expect(metaContent('meta[name="robots"]')).toBe('noindex, nofollow');
    privateRoute.unmount();

    renderAt('/not-approved');
    expect(metaContent('meta[name="robots"]')).toBe('noindex, nofollow');
  });
});
