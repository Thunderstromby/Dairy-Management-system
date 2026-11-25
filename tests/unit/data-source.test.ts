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

  it('returns neutral screen layouts without restricted values or hardcoded currency', async () => {
    const request = {
      id: 'farm.reports.milk',
      title: 'Milk Reports',
      template: 'report',
      description: 'Milk production report preview.',
    };
    const screen = await createFixtureDataSource().getScreenData(request);
    const cellText = screen.rows.flatMap((row) => row.cells).join(' ');

    expect(screen.notice).toMatch(/Illustrative layout only/);
    expect(screen.columns.length).toBeGreaterThan(0);
    expect(screen.sections.length).toBeGreaterThan(0);
    expect(cellText).not.toMatch(/High|Critical/i);
    expect(cellText).not.toMatch(/\$|USD/i);
    await expect(createApiDataSource().getScreenData(request)).rejects.toThrow(
      DATA_SOURCE_NOT_WIRED,
    );
  });

  it('keeps fixture labels out of the production adapter', () => {
    const fixture = createFixtureDataSource();
    const api = createApiDataSource();

    expect(fixture.labels.localDraft).toBe(
      'Local draft — not saved; no server action was performed.',
    );
    expect(fixture.labels.roleGuard).toContain('Prototype guard only');
    expect(api.labels.localDraft).not.toContain('Local draft — not saved');
    expect(api.labels.roleGuard).not.toContain('Prototype guard only');
    expect(api.labels.fixtureNotice).not.toContain('visual-only fixture');
    expect(api.labels.roleSelector).not.toContain('prototype role selector');
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
