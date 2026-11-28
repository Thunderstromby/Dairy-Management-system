import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Droplets,
  Info,
  Moon,
  PawPrint,
  Sun,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const timeframes = ['Last 14 days', 'Last 30 days', 'Current lactation', 'Custom range'];

const sessions = [
  {
    date: 'Sample date',
    session: 'Morning',
    vol: '14.85 L',
    total: 'Not calculated',
    quality: 'Good',
    operator: 'Station A · staff role',
  },
  {
    date: 'Sample date',
    session: 'Evening',
    vol: '12.90 L',
    total: '27.50 L',
    quality: 'Good',
    operator: 'Station B · staff role',
  },
  {
    date: 'Sample date',
    session: 'Morning',
    vol: '14.60 L',
    total: 'Not calculated',
    quality: 'Good',
    operator: 'Station A · staff role',
  },
  {
    date: 'Sample date',
    session: 'Evening',
    vol: '13.10 L',
    total: '28.10 L',
    quality: 'Good',
    operator: 'Station B · staff role',
  },
  {
    date: 'Sample date',
    session: 'Morning',
    vol: '15.00 L',
    total: 'Not calculated',
    quality: 'Good',
    operator: 'Station A · staff role',
  },
  {
    date: 'Sample date',
    session: 'Evening',
    vol: '12.80 L',
    total: '27.55 L',
    quality: 'Average',
    operator: 'Station C · staff role',
  },
] as const;

const qualityTone: Record<(typeof sessions)[number]['quality'], string> = {
  Good: 'bg-[#d9e8c7] text-[#2f4126]',
  Average: 'bg-[#ffdcc6] text-[#7a461c]',
};

export function AnimalProductionHistory() {
  const [animal, setAnimal] = useState('Animal A');
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  const [sessionFilter, setSessionFilter] = useState('all');
  const [notice, setNotice] = useState('');

  const visible = sessions.filter(
    (item) => sessionFilter === 'all' || item.session === sessionFilter,
  );

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Dashboard</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Milk production</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Animal production history</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Individual Animal Production History
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Session-by-session preview with neutral identities. Projections, rolling baselines and
              variance percentages are not calculated because the rule is unapproved.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setNotice('Production entry is a separate screen; no data is saved here.')
              }
              className={`rounded-lg bg-[#f0eee8] px-3 py-2 text-sm font-semibold ${focus}`}
            >
              Production entry
            </button>
            <button
              type="button"
              onClick={() => setNotice('Daily totals are shown in the Daily Totals screen.')}
              className={`rounded-lg bg-[#f0eee8] px-3 py-2 text-sm font-semibold ${focus}`}
            >
              Check daily totals
            </button>
            <button
              type="button"
              onClick={() => setNotice('Animal profile is a separate screen.')}
              className={`rounded-lg bg-[#2f4126] px-3 py-2 text-sm font-semibold text-white ${focus}`}
            >
              View animal profile
            </button>
          </div>
        </header>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <label
            htmlFor="animal-select"
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
          >
            Active subject inspection
          </label>
          <div className="relative">
            <PawPrint
              aria-hidden="true"
              size={16}
              className="absolute left-3 top-3 text-[#2f4126]"
            />
            <select
              id="animal-select"
              value={animal}
              onChange={(event) => setAnimal(event.target.value)}
              className={`w-full rounded-lg bg-[#f0eee8] py-2.5 pl-10 pr-3 font-heading text-sm font-bold text-[#1b1c18] ${focus}`}
            >
              <option>Animal A</option>
              <option>Animal B</option>
              <option>Animal D</option>
              <option>Animal E</option>
            </select>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#2f4126]">
              TAG-A-01
            </span>
            <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-[11px] font-semibold text-[#444840]">
              Pen 04 · high yield group
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-[#f5f3ed] p-3">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#eae8e2] text-[#2f4126]">
              <PawPrint aria-hidden="true" size={26} />
            </div>
            <div>
              <p className="font-heading text-sm font-bold">{animal}</p>
              <p className="text-xs text-[#444840]">Calved: sample date · illustrative</p>
              <p className="text-xs font-semibold text-[#2f4126]">Peak phase (illustrative)</p>
            </div>
          </div>
          {notice ? (
            <p role="status" className="mt-3 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
              {notice}
            </p>
          ) : null}
        </section>

        <section
          aria-label="Production summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5"
        >
          {[
            { label: '305-day projection', value: 'Not approved', note: 'No formula applied' },
            { label: 'Lactation stage', value: 'Day 73', note: 'Illustrative' },
            { label: '30-day daily average', value: '27.8 L/d', note: 'Illustrative' },
            { label: 'Quality score', value: '98.4%', note: 'Illustrative quality ratio' },
            {
              label: 'Rolling 3-day baseline',
              value: 'Not calculated',
              note: 'Rule pending approval',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {item.label}
              </p>
              <p className="mt-2 font-heading text-lg font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Timeframe">
            {timeframes.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={timeframe === item}
                onClick={() => setTimeframe(item)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${timeframe === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focus}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <div>
              <label
                htmlFor="history-session"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Session
              </label>
              <select
                id="history-session"
                value={sessionFilter}
                onChange={(event) => setSessionFilter(event.target.value)}
                className={`rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All sessions</option>
                <option>Morning</option>
                <option>Evening</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="history-quality"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Quality
              </label>
              <select
                id="history-quality"
                className={`rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option>All qualities</option>
                <option>Good</option>
                <option>Average</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-base font-bold">
            Lactation volume & daily total trajectory
          </h2>
          <p className="mt-1 text-xs text-[#444840]">
            Illustrative session bars. Daily totals are shown only where both sessions exist; no
            missing-session rule is applied.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#444840]">
            <span className="flex items-center gap-1.5">
              <Sun aria-hidden="true" size={13} className="text-[#2f4126]" /> Morning (illustrative)
            </span>
            <span className="flex items-center gap-1.5">
              <Moon aria-hidden="true" size={13} className="text-[#556249]" /> Evening
              (illustrative)
            </span>
          </div>
          <div
            role="img"
            aria-label="Illustrative session volume bars for a sample period."
            className="mt-4 flex h-36 items-end gap-2"
          >
            {[58, 42, 62, 46, 66, 48, 70, 52, 64, 44].map((height, index) => (
              <div
                key={index}
                className={`flex flex-1 items-end rounded-t ${index % 2 === 0 ? 'bg-[#2f4126]' : 'bg-[#d9e8c7]'}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-[#444840]">
            Text summary: sample values only; no projection is derived.
          </p>
        </section>

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Info aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Production health safeguard</h2>
            <p className="mt-1 text-sm text-[#444840]">
              The rolling 3-day / 15% drop rule is pending approval. No clinical review flag or
              variance alert is generated from these illustrative entries.
            </p>
          </div>
          <Activity aria-hidden="true" size={16} className="ml-auto text-[#444840]" />
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] p-4">
            <div>
              <h2 className="font-heading text-base font-bold">Recorded milking sessions log</h2>
              <p className="text-xs text-[#444840]">
                Illustrative session records · no calculated variance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotice('CSV export is not wired in this prototype.')}
              className={`rounded-lg bg-white px-3 py-2 text-sm font-semibold ${focus}`}
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Date',
                    'Session',
                    'Session volume',
                    'Daily total',
                    'Quality',
                    'Variance',
                    'Station / operator',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((item, index) => (
                  <tr key={`${item.date}-${index}`}>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.date}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 rounded bg-[#f0eee8] px-2 py-0.5 text-xs font-semibold">
                        {item.session === 'Morning' ? (
                          <Sun aria-hidden="true" size={12} />
                        ) : (
                          <Moon aria-hidden="true" size={12} />
                        )}{' '}
                        {item.session}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-semibold">{item.vol}</td>
                    <td className="px-3 py-3 font-heading text-sm font-bold text-[#2f4126]">
                      {item.total}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${qualityTone[item.quality]}`}
                      >
                        {item.quality}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">Not calculated</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.operator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {visible.length} illustrative session records</span>
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

        <section className="flex flex-wrap items-center gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <ClipboardList aria-hidden="true" size={20} className="text-[#2f4126]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Need deeper analysis?</h2>
            <p className="text-xs text-[#444840]">
              Cross-referencing with other modules is not wired. No somatic, feed or fertility
              diagnostic value is shown.
            </p>
          </div>
          <button
            type="button"
            className={`ml-auto inline-flex items-center gap-1 rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
          >
            Log entry <ArrowRight aria-hidden="true" size={14} />
          </button>
          <span className="flex items-center gap-1 text-xs text-[#444840]">
            <CalendarDays aria-hidden="true" size={13} /> Illustrative period
          </span>
          <Droplets aria-hidden="true" size={14} className="text-[#444840]" />
        </section>
      </div>
    </div>
  );
}
