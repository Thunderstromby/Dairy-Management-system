// visual-only sample data
import type { IllustrativeChartData } from '../data/types';

export const illustrativeChart: IllustrativeChartData = {
  title: 'Illustrative pattern',
  period: 'Prototype week 01',
  unit: 'neutral units',
  source: 'visual-only fixture',
  illustrative: true,
  points: [
    { label: 'Slot A', value: 2 },
    { label: 'Slot B', value: 4 },
    { label: 'Slot C', value: 3 },
    { label: 'Slot D', value: 5 },
  ],
  summary: 'Illustrative values only; not farm data and not a saved record.',
};
