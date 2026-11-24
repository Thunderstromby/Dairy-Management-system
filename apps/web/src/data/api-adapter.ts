import type { DataSource, DraftCollection } from './types';

export const DATA_SOURCE_NOT_WIRED = 'DATA_SOURCE_NOT_WIRED';

function notWired(): never {
  throw new Error(`${DATA_SOURCE_NOT_WIRED}: the OpenAPI 3.1 contract is not approved yet`);
}

const unavailableDrafts: DraftCollection = {
  list: notWired,
  create: notWired,
  rename: notWired,
  remove: notWired,
};

export function createApiDataSource(): DataSource {
  return {
    mode: 'api',
    getIllustrativeChart: async () => notWired(),
    drafts: () => unavailableDrafts,
  };
}
