import { useEffect, useState } from 'react';
import { getDataSource } from '@smartfarm/data-source';
import type { DataSource, IllustrativeChartData } from '../data/types';
import { IllustrativeChart } from './IllustrativeChart';

export function IllustrativeChartPanel({ source = getDataSource() }: { source?: DataSource }) {
  const [chart, setChart] = useState<IllustrativeChartData>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;

    source
      .getIllustrativeChart()
      .then((data) => {
        if (active) {
          setChart(data);
        }
      })
      .catch(() => {
        if (active) {
          setError('Data source not wired yet. No API or formula was invented.');
        }
      });

    return () => {
      active = false;
    };
  }, [source]);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!chart) {
    return <p role="status">Loading illustrative view…</p>;
  }

  return <IllustrativeChart data={chart} />;
}
