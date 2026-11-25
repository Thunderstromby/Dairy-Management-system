import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  farmRoutes,
  findScreen,
  platformRoutes,
  publicRoutes,
  routes,
} from '../../apps/web/src/app/routes';

const root = resolve(process.cwd(), 'apps/web/src');

function sourceFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...sourceFiles(fullPath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name) && !entry.name.includes('.test.')) {
      files.push(fullPath);
    }
  }

  return files.filter((file) => statSync(file).isFile());
}

describe('approved sitemap route registry', () => {
  it('has unique route ids and paths', () => {
    expect(new Set(routes.map((route) => route.id)).size).toBe(routes.length);
    expect(new Set(routes.map((route) => route.path)).size).toBe(routes.length);
  });

  it('covers all approved public sections', () => {
    expect(publicRoutes.map((route) => route.id)).toEqual([
      'public.home',
      'public.about',
      'public.features',
      'public.how-it-works',
      'public.benefits',
      'public.dashboard-preview',
      'public.contact',
    ]);
  });

  it('maps every screen to the approved sitemap', () => {
    for (const route of routes) {
      expect(route.sitemapReference).toMatch(/^sitemap\.md §\d/);
      expect(route.description.length).toBeGreaterThan(0);
    }
  });

  it('excludes unapproved Stitch routes and login methods', () => {
    const paths = routes.map((route) => route.path).join(' ');
    expect(paths).not.toMatch(/pricing/i);
    expect(paths).not.toMatch(/supervisor-access/i);
    expect(paths).not.toMatch(/passkey/i);
  });

  it('never grants Super Admin access to farm operational screens', () => {
    for (const route of farmRoutes) {
      expect(route.allowedRoles ?? []).not.toContain('super-admin');
    }
  });

  it('requires a role for every protected platform and farm screen', () => {
    for (const route of [...platformRoutes, ...farmRoutes]) {
      if (route.template === 'login' || route.template === 'state') {
        expect(route.allowedRoles ?? []).toEqual([]);
        continue;
      }

      expect(route.allowedRoles?.length).toBeGreaterThan(0);
      expect(route.allowedRoles).not.toContain('guest');
    }
  });

  it('restricts Supervisor away from payroll, finance, stock correction, leave approval and settings', () => {
    const denied = farmRoutes.filter((route) =>
      /payroll|finance|stock-adjustments|leave|settings|data\.(import|export|backups|activity)/.test(
        route.path,
      ),
    );

    expect(denied.length).toBeGreaterThan(0);
    for (const route of denied) {
      expect(route.allowedRoles).toEqual(['farm-admin']);
    }
  });

  it('resolves a known route and returns undefined for an unknown route', () => {
    expect(findScreen('/farm/dashboard')?.id).toBe('farm.dashboard');
    expect(findScreen('/not-approved')).toBeUndefined();
  });
});

describe('Stitch coverage register', () => {
  it('accounts for all 108 visual exports without marking any page PASS', () => {
    const register = readFileSync(
      resolve(process.cwd(), 'docs/stitch-coverage-register.md'),
      'utf8',
    );
    const exportRows = register.match(/^\| `[a-z0-9_]+` \|/gm) ?? [];

    expect(exportRows).toHaveLength(108);
    expect(register).not.toMatch(/\| PASS \|/);
  });
});

describe('private frontend boundary', () => {
  it('contains no WebGL, canvas, 3D library or model asset usage', () => {
    const forbidden =
      /<canvas|getContext\s*\(|WebGLRenderer|WebGLRenderingContext|from\s+['"]three|@react-three|model-viewer|\.glb|\.gltf/i;
    const offenders = sourceFiles(root).filter((file) =>
      forbidden.test(readFileSync(file, 'utf8')),
    );

    expect(offenders).toEqual([]);
  });
});
