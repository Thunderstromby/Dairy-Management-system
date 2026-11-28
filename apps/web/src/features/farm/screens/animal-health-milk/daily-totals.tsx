import { useState } from 'react';
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Droplets,
  Moon,
  ShieldAlert,
  Sun,
  Tag,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const rows = [
  {
    tag: 'TAG-A-01',
    animal: 'Animal A',
    pen: 'Pen 04',
    am: '14.85 L',
    pm: '12.85 L',
    total: '27.70 L',
    quality: 'Good',
  },
  {
    tag: 'TAG-A-02',
    animal: 'Animal B',
    pen: 'Pen 02',
    am: '12.40 L',
    pm: '11.10 L',
    total: '23.50 L',
    quality: 'Good',
  },
  {
    tag: 'TAG-A-04',
    animal: 'Animal D',
    pen: 'Pen 04',
    am: '15.10 L',
    pm: '13.40 L',
    total: '28.50 L',
    quality: 'Average',
  },
  {
    tag: 'TAG-A-06',
    animal: 'Animal F',
    pen: 'Pen 02',
    am: '11.25 L',
    pm: '10.15 L',
    total: '21.40 L',
    quality: 'Good',
  },
  {
    tag: 'TAG-A-03',
    animal: 'Animal C',
    pen: 'Pen H-1',
    am: '0.00 L',
    pm: '0.00 L',
    total: '0.00 L',
    quality: 'Poor',
  },
] as const;

const qualityTone: Record<(typeof rows)[number]['quality'], string> = {
  Good: 'bg-[#d9e8c7] text-[#2f4126]',
  Average: 'bg-[#ffdcc6] text-[#7a461c]',
  Poor: 'bg-[#ffdad6] text-[#ba1a1a]',
};

export function DailyTotals() {
  const [day, setDay] = useState('Sample day');
  const [pen, setPen] = useState('all');
  const [quality, setQuality] = useState('all');
  const [notice, setNotice] = useState('');

  const visible = rows.filter((row) => {
    const matchesPen = pen === 'all' || row.pen === pen;
    const matchesQuality = quality === 'all' || row.quality === quality;
    return matchesPen && matchesQuality;
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Dashboard</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Milk production</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Daily totals</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-[#2f4126] sm:text-3xl">
              Daily Milk Production Totals
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Farm-level aggregation preview. Every figure is illustrative; no total, baseline or
              alert threshold is calculated.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotice('CSV export is not wired in this prototype.')}
              className={`rounded-lg bg-[#f0eee8] px-3 py-2 text-sm font-semibold ${focus}`}
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setNotice('Printing is not wired in this prototype.')}
              className={`rounded-lg bg-[#f0eee8] px-3 py-2 text-sm font-semibold ${focus}`}
            >
              Print sheet
            </button>
            <button
              type="button"
              onClick={() =>
                setNotice('Daily sign-off is approval-controlled and is not reproduced here.')
              }
              className={`rounded-lg bg-[#2f4126] px-3.5 py-2 text-sm font-semibold text-white ${focus}`}
            >
              Sign-off daily total
            </button>
          </div>
        </header>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous day"
              onClick={() => setDay('Previous sample day')}
              className={`rounded-lg bg-[#f0eee8] p-1.5 ${focus}`}
            >
              <ChevronLeft aria-hidden="true" size={16} />
            </button>
            <span className="flex items-center gap-2 px-3 py-1.5 font-heading text-sm font-bold">
              <CalendarDays aria-hidden="true" size={16} /> {day}
            </span>
            <button
              type="button"
              aria-label="Next day"
              onClick={() => setDay('Next sample day')}
              className={`rounded-lg bg-[#f0eee8] p-1.5 ${focus}`}
            >
              <ChevronRight aria-hidden="true" size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDay('Sample day')}
              className={`rounded-lg bg-[#f0eee8] px-3 py-1.5 text-sm font-semibold ${focus}`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setNotice('Date range selection is local only.')}
              className={`rounded-lg bg-[#eae8e2] px-3 py-1.5 text-sm font-semibold ${focus}`}
            >
              Select range
            </button>
          </div>
        </section>
        {notice ? (
          <p role="status" className="rounded-lg bg-[#f5f3ed] p-3 text-sm text-[#444840]">
            {notice}
          </p>
        ) : null}

        <section
          aria-label="Daily production summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Farm daily total volume',
              value: '24,650.0 L',
              note: 'Illustrative total · no live feed',
              icon: <Droplets aria-hidden="true" size={18} />,
            },
            {
              label: 'Morning shift total',
              value: '13,200.0 L',
              note: 'Illustrative shift value',
              icon: <Sun aria-hidden="true" size={18} />,
            },
            {
              label: 'Evening shift total',
              value: '11,450.0 L',
              note: 'Illustrative shift value',
              icon: <Moon aria-hidden="true" size={18} />,
            },
            {
              label: 'Quality & integrity',
              value: '96.8% Grade A',
              note: 'Illustrative quality split',
              icon: <ClipboardCheck aria-hidden="true" size={18} />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {item.label}
                </span>
                <span className="text-[#2f4126]">{item.icon}</span>
              </div>
              <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-base font-bold">Shift volume dynamics</h2>
          <p className="mt-1 text-xs text-[#444840]">
            Illustrative 24-hour intake preview with no live telemetry.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#444840]">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-[#2f4126]" /> Morning (illustrative)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-[#d9e8c7]" /> Evening (illustrative)
            </span>
          </div>
          <div
            role="img"
            aria-label="Illustrative morning and evening volume bars with no calculated target."
            className="mt-4 flex h-32 items-end gap-2"
          >
            {[38, 52, 70, 64, 48, 56, 72, 58].map((height, index) => (
              <div key={index} className="flex flex-1 items-end gap-0.5">
                <div className="w-1/2 rounded-t bg-[#2f4126]" style={{ height: `${height}%` }} />
                <div
                  className="w-1/2 rounded-t bg-[#d9e8c7]"
                  style={{ height: `${Math.round(height * 0.8)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-[#444840]">
            <span>03:00</span>
            <span>09:00</span>
            <span>15:00</span>
            <span>21:00</span>
          </div>
          <p className="mt-2 text-xs text-[#444840]">
            Text summary: sample volumes only; no operational status is implied.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {[
            ['Parlor 01', 'Parallel configuration', '11,850 L illustrative'],
            ['Parlor 02', 'Herringbone configuration', '6,950 L illustrative'],
            ['Rotary parlor', 'Continuous configuration', '5,850 L illustrative'],
          ].map(([name, type, value]) => (
            <section
              key={name}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <h3 className="font-heading text-sm font-bold">{name}</h3>
              <p className="text-xs text-[#444840]">{type}</p>
              <p className="mt-2 font-heading text-lg font-bold text-[#2f4126]">{value}</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-[#eae8e2]">
                <div className="h-1.5 w-2/3 rounded-full bg-[#46583b]" />
              </div>
            </section>
          ))}
        </div>

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <ShieldAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">
              Production drop rule — approval pending
            </h2>
            <p className="mt-1 text-sm text-[#444840]">
              The rolling-average variance rule is not approved. No threshold, percentage or
              automated alert is applied here; “baseline” columns are shown as informational labels
              only.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f5f3ed] p-4">
            <h2 className="font-heading text-base font-bold">Animal-level production breakdown</h2>
            <div className="flex flex-wrap gap-2">
              <label htmlFor="daily-pen" className="sr-only">
                Filter by pen
              </label>
              <select
                id="daily-pen"
                value={pen}
                onChange={(event) => setPen(event.target.value)}
                className={`rounded-lg bg-white px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All pens</option>
                <option>Pen 04</option>
                <option>Pen 02</option>
                <option>Pen H-1</option>
              </select>
              <label htmlFor="daily-quality" className="sr-only">
                Filter by quality
              </label>
              <select
                id="daily-quality"
                value={quality}
                onChange={(event) => setQuality(event.target.value)}
                className={`rounded-lg bg-white px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All qualities</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Animal & tag',
                    'Pen',
                    'Morning yield',
                    'Evening yield',
                    'Daily total',
                    'Quality',
                    'Baseline note',
                    'Status',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((row) => (
                  <tr key={row.tag}>
                    <td className="px-3 py-3">
                      <p className="flex items-center gap-1 font-heading text-sm font-bold">
                        <Tag aria-hidden="true" size={13} className="text-[#2f4126]" /> {row.animal}
                      </p>
                      <p className="font-mono text-xs text-[#444840]">{row.tag}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.pen}</td>
                    <td className="px-3 py-3 text-sm">{row.am}</td>
                    <td className="px-3 py-3 text-sm">{row.pm}</td>
                    <td className="px-3 py-3 font-heading text-sm font-bold text-[#2f4126]">
                      {row.total}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${qualityTone[row.quality]}`}
                      >
                        {row.quality}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">Not calculated</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">
                      {row.quality === 'Poor'
                        ? 'Withheld — health details restricted'
                        : 'Recorded (illustrative)'}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        className={`rounded-lg bg-[#f0eee8] px-2 py-1 text-xs font-semibold text-[#2f4126] ${focus}`}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {visible.length} illustrative animals</span>
            <div className="flex gap-1">
              <button type="button" disabled className="rounded bg-[#eae8e2] px-2 py-1 opacity-60">
                Previous
              </button>
              <button
                type="button"
                aria-current="page"
                className={`rounded bg-[#2f4126] px-2 py-1 font-semibold text-white ${focus}`}
              >
                1
              </button>
              <button type="button" disabled className="rounded bg-[#eae8e2] px-2 py-1 opacity-60">
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-3 rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <ClipboardCheck aria-hidden="true" size={20} className="text-[#2f4126]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Official daily sign-off</h2>
            <p className="text-xs text-[#444840]">
              Authorization controls, digital signatures and export actions are unavailable in this
              prototype. No record is finalized.
            </p>
          </div>
          <BarChart3 aria-hidden="true" size={16} className="ml-auto text-[#444840]" />
        </section>
      </div>
    </div>
  );
}
