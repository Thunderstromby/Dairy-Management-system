import { getDataSource } from '@smartfarm/data-source';

export function LocalDraftStatus() {
  return <p role="status">{getDataSource().labels.localDraft}</p>;
}
