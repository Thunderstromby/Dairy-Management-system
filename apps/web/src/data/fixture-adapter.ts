import { illustrativeChart } from '../fixtures/illustrative-chart';
import { createLocalDraftCollection } from './local-drafts';
import type { DataSource } from './types';

export function createFixtureDataSource(): DataSource {
  const localDrafts = createLocalDraftCollection();

  return {
    mode: 'fixture',
    getIllustrativeChart: async () => illustrativeChart,
    drafts: () => localDrafts,
  };
}
