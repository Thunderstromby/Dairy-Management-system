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

export interface ScreenDataRequest {
  id: string;
  title: string;
  template: string;
  description: string;
}

export type StatusTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';

export interface ScreenMetric {
  label: string;
  value: string;
  unit?: string;
  iconHint?: string;
}

export interface ScreenRow {
  cells: readonly string[];
  status?: { label: string; tone: StatusTone };
}

export type ScreenFieldControl =
  'text' | 'email' | 'password' | 'date' | 'number' | 'select' | 'textarea';

export interface ScreenField {
  label: string;
  control: ScreenFieldControl;
  required: boolean;
  hint?: string;
}

export interface ScreenSection {
  title: string;
  body?: string;
  rows?: readonly ScreenRow[];
  fields?: readonly ScreenField[];
}

export interface PrototypeScreenData {
  notice: string;
  summary: string;
  metrics: readonly ScreenMetric[];
  columns: readonly string[];
  rows: readonly ScreenRow[];
  fields: readonly ScreenField[];
  sections: readonly ScreenSection[];
  actions: readonly string[];
  chart?: IllustrativeChartData;
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
  getScreenData(request: ScreenDataRequest): Promise<PrototypeScreenData>;
  drafts(): DraftCollection;
}
