import type { DataSource, DraftCollection, PrototypeLabels } from './types';

export const DATA_SOURCE_NOT_WIRED = 'DATA_SOURCE_NOT_WIRED';

function notWired(): never {
  throw new Error(`${DATA_SOURCE_NOT_WIRED}: the OpenAPI 3.1 contract is not approved yet`);
}

const labels: PrototypeLabels = {
  fixtureNotice: 'API data adapter; no sample fixture data is included in production builds.',
  localDraft: 'No local draft is available in the production data adapter.',
  roleGuard: 'Restricted in this preview; server enforcement pending.',
  roleSelector: 'Preview role selector — not authentication',
};

const unavailableDrafts: DraftCollection = {
  list: notWired,
  create: notWired,
  rename: notWired,
  remove: notWired,
};

export function createApiDataSource(): DataSource {
  return {
    mode: 'api',
    labels,
    getIllustrativeChart: async () => notWired(),
    getScreenData: async () => notWired(),
    drafts: () => unavailableDrafts,
  };
}
