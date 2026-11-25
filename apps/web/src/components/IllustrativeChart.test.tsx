import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createApiDataSource } from '../data/api-adapter';
import { createFixtureDataSource } from '../data/fixture-adapter';
import { illustrativeChart } from '../fixtures/illustrative-chart';
import { IllustrativeChart } from './IllustrativeChart';
import { IllustrativeChartPanel } from './IllustrativeChartPanel';
import { LocalDraftStatus } from './LocalDraftStatus';

describe('illustrative chart', () => {
  it('states period, unit, source and illustrative status', () => {
    render(<IllustrativeChart data={illustrativeChart} />);

    const caption = screen.getByText(/Illustrative · period:/);
    expect(caption.textContent).toContain(illustrativeChart.period);
    expect(caption.textContent).toContain(illustrativeChart.unit);
    expect(caption.textContent).toContain(illustrativeChart.source);
    expect(screen.getByRole('img', { name: illustrativeChart.summary })).toBeTruthy();
  });

  it('labels simulated changes as local drafts only', () => {
    render(<LocalDraftStatus />);
    expect(screen.getByText(/No local draft is available/)).toBeTruthy();
  });

  it('renders fixture data through the data-access seam', async () => {
    render(<IllustrativeChartPanel source={createFixtureDataSource()} />);
    expect(await screen.findByText(/Illustrative · period:/)).toBeTruthy();
  });

  it('shows an explicit unwired state when the real adapter is selected', async () => {
    render(<IllustrativeChartPanel source={createApiDataSource()} />);
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Data source not wired yet');
  });
});
