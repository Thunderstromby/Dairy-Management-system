export type Surface = 'public' | 'platform' | 'farm';

export type ScreenTemplate =
  | 'home'
  | 'content'
  | 'dashboard'
  | 'list'
  | 'form'
  | 'detail'
  | 'settings'
  | 'report'
  | 'login'
  | 'state';

export interface ScreenDefinition {
  id: string;
  path: string;
  title: string;
  surface: Surface;
  template: ScreenTemplate;
  description: string;
  stitchReference?: string;
  sitemapReference: string;
  allowedRoles?: readonly string[];
  group?: string;
}
