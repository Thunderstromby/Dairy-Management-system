import type { DraftCollection, DraftRecord } from './types';

export function createLocalDraftCollection(): DraftCollection {
  const records = new Map<string, DraftRecord>();
  let sequence = 0;

  return {
    list: () => [...records.values()],
    create: (label) => {
      sequence += 1;
      const record: DraftRecord = { id: `local-draft-${sequence}`, label };
      records.set(record.id, record);
      return record;
    },
    rename: (id, label) => {
      const existing = records.get(id);
      if (!existing) {
        return undefined;
      }
      const updated: DraftRecord = { ...existing, label };
      records.set(id, updated);
      return updated;
    },
    remove: (id) => records.delete(id),
  };
}
