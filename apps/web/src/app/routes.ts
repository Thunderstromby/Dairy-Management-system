import type { ScreenDefinition } from './types';

export const publicRoutes: readonly ScreenDefinition[] = [
  {
    id: 'public.home',
    path: '/public/home',
    title: 'Home',
    surface: 'public',
    template: 'home',
    description: 'Public homepage with all approved Home sections.',
    sitemapReference: 'sitemap.md §1',
    stitchReference: 'smartfarm_public_website_homepage',
  },
  {
    id: 'public.about',
    path: '/public/about',
    title: 'About SmartFarm',
    surface: 'public',
    template: 'content',
    description: 'Product introduction and platform value proposition.',
    sitemapReference: 'sitemap.md §1.3',
    stitchReference: 'smartfarm_about_page',
  },
  {
    id: 'public.features',
    path: '/public/features',
    title: 'Features',
    surface: 'public',
    template: 'content',
    description: 'Eight approved platform capability areas.',
    sitemapReference: 'sitemap.md §1.4',
    stitchReference: 'smartfarm_features_page',
  },
  {
    id: 'public.how-it-works',
    path: '/public/how-it-works',
    title: 'How It Works',
    surface: 'public',
    template: 'content',
    description: 'General farm-management workflow overview.',
    sitemapReference: 'sitemap.md §1.5',
    stitchReference: 'smartfarm_how_it_works_page',
  },
  {
    id: 'public.benefits',
    path: '/public/benefits',
    title: 'Benefits',
    surface: 'public',
    template: 'content',
    description: 'Five approved operational benefits.',
    sitemapReference: 'sitemap.md §1.6',
    stitchReference: 'smartfarm_benefits_page',
  },
  {
    id: 'public.dashboard-preview',
    path: '/public/dashboard-preview',
    title: 'Dashboard Preview',
    surface: 'public',
    template: 'content',
    description: 'Clearly labelled illustrative dashboard preview.',
    sitemapReference: 'sitemap.md §1.7',
    stitchReference: 'smartfarm_dashboard_preview_page',
  },
  {
    id: 'public.contact',
    path: '/public/contact',
    title: 'Contact Inquiry',
    surface: 'public',
    template: 'content',
    description: 'Approved inquiry form with local draft only.',
    sitemapReference: 'sitemap.md §1.8',
    stitchReference: 'smartfarm_contact_page',
  },
];

export const routes: readonly ScreenDefinition[] = [...publicRoutes];

export function findScreen(path: string): ScreenDefinition | undefined {
  return routes.find((route) => route.path === path);
}
