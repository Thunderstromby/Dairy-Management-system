import { describe, expect, it } from 'vitest';
import { DATA_SOURCE_NOT_WIRED, createApiDataSource } from '../../apps/web/src/data/api-adapter';
import { createFixtureDataSource } from '../../apps/web/src/data/fixture-adapter';

describe('data-source seam', () => {
  it('returns labelled visual-only data from the fixture adapter', async () => {
    const source = createFixtureDataSource();
    const chart = await source.getIllustrativeChart();

    expect(source.mode).toBe('fixture');
    expect(chart.illustrative).toBe(true);
    expect(chart.period).toBeTruthy();
    expect(chart.unit).toBeTruthy();
    expect(chart.source).toBe('visual-only fixture');
  });

  it('never invents an API when the non-fixture adapter is used', async () => {
    const source = createApiDataSource();

    expect(source.mode).toBe('api');
    await expect(source.getIllustrativeChart()).rejects.toThrow(DATA_SOURCE_NOT_WIRED);
    expect(() => source.drafts().list()).toThrow(DATA_SOURCE_NOT_WIRED);
  });

  it('keeps simulated create, edit and delete in local memory only', () => {
    const drafts = createFixtureDataSource().drafts();
    const created = drafts.create('Local entry');

    expect(drafts.list()).toHaveLength(1);
    expect(drafts.rename(created.id, 'Renamed local entry')?.label).toBe('Renamed local entry');
    expect(drafts.remove(created.id)).toBe(true);
    expect(drafts.list()).toHaveLength(0);
  });
});
