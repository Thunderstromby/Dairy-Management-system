export type PrototypeRole = 'guest' | 'super-admin' | 'farm-admin' | 'farm-supervisor';

export interface IllustrativePoint {
  label: string;
  value: number;
}

export interface IllustrativeChartData {
  title: string;
  period: string;
  unit: string;
  source: string;
  illustrative: true;
  points: readonly IllustrativePoint[];
  summary: string;
}

export interface PrototypeLabels {
  fixtureNotice: string;
  localDraft: string;
  roleGuard: string;
  roleSelector: string;
}

export interface DraftRecord {
  id: string;
  label: string;
}

export interface DraftCollection {
  list(): readonly DraftRecord[];
  create(label: string): DraftRecord;
  rename(id: string, label: string): DraftRecord | undefined;
  remove(id: string): boolean;
}

export interface DataSource {
  readonly mode: 'fixture' | 'api';
  readonly labels: PrototypeLabels;
  getIllustrativeChart(): Promise<IllustrativeChartData>;
  drafts(): DraftCollection;
}
