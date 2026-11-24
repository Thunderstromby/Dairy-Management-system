import type { IllustrativeChartData } from '../data/types';

export function IllustrativeChart({ data }: { data: IllustrativeChartData }) {
  const maxValue = Math.max(1, ...data.points.map((point) => point.value));

  return (
    <figure>
      <figcaption>
        {data.title} — Illustrative · period: {data.period} · unit: {data.unit} · source:{' '}
        {data.source}
      </figcaption>
      <div role="img" aria-label={data.summary}>
        {data.points.map((point) => (
          <div key={point.label}>
            <span aria-hidden="true" style={{ width: `${(point.value / maxValue) * 100}%` }} />
            <span>{point.label}</span>
            <span>
              {point.value} {data.unit}
            </span>
          </div>
        ))}
      </div>
      <p>{data.summary}</p>
    </figure>
  );
}
