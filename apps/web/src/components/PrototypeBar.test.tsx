import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { publicRoutes } from '../app/routes';
import { PrototypeRoleProvider } from '../auth/prototype-role';
import { PrototypeBar } from './PrototypeBar';

vi.mock('@smartfarm/data-source', async () => {
  const { createFixtureDataSource } = await import('../data/fixture-adapter');
  return { getDataSource: createFixtureDataSource };
});

function renderBar() {
  return render(
    <HashRouter>
      <PrototypeRoleProvider initialRole="guest">
        <PrototypeBar />
      </PrototypeRoleProvider>
    </HashRouter>,
  );
}

describe('PrototypeBar visibility', () => {
  beforeEach(() => {
    window.location.hash = '#/public/home';
  });

  afterEach(() => {
    cleanup();
  });

  it('stays hidden on every approved public route', () => {
    for (const route of publicRoutes) {
      window.location.hash = `#${route.path}`;
      const { container, unmount } = renderBar();
      expect(container.querySelector('.sf-prototype-bar')).toBeNull();
      unmount();
    }
  });

  it('remains available on prototype platform and farm routes', () => {
    window.location.hash = '#/platform/customers';
    const { container, unmount } = renderBar();
    expect(container.querySelector('.sf-prototype-bar')).not.toBeNull();
    unmount();

    window.location.hash = '#/farm/dashboard';
    const farm = renderBar();
    expect(farm.container.querySelector('.sf-prototype-bar')).not.toBeNull();
  });
});
