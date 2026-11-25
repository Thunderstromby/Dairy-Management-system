import { illustrativeChart } from '../fixtures/illustrative-chart';
import { createScreenData } from '../fixtures/screen-data';
import { createLocalDraftCollection } from './local-drafts';
import type { DataSource, PrototypeLabels } from './types';

const labels: PrototypeLabels = {
  fixtureNotice: 'Prototype preview — visual-only fixtures; no server action is represented.',
  localDraft: 'Local draft — not saved; no server action was performed.',
  roleGuard: 'Prototype guard only — server enforcement pending.',
  roleSelector: 'Prototype role selector — not authentication',
};

export function createFixtureDataSource(): DataSource {
  const localDrafts = createLocalDraftCollection();

  return {
    mode: 'fixture',
    labels,
    getIllustrativeChart: async () => illustrativeChart,
    getScreenData: async (request) => createScreenData(request),
    drafts: () => localDrafts,
  };
}
