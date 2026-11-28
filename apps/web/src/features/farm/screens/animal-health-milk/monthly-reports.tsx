import { useState } from 'react';
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  Download,
  Info,
  Printer,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const days = [
  {
    date: 'Sample day 1',
    milkers: '890',
    am: '13,200.0 L',
    pm: '11,450.0 L',
    total: '24,650.0 L',
    avg: '27.70 L',
    quality: '96.8% Grade A',
    withheld: '18.2 L',
  },
  {
    date: 'Sample day 2',
    milkers: '890',
    am: '13,150.0 L',
    pm: '11,380.0 L',
    total: '24,530.0 L',
    avg: '27.56 L',
    quality: '97.1% Grade A',
    withheld: '18.2 L',
  },
  {
    date: 'Sample day 3',
    milkers: '889',
    am: '12,980.0 L',
    pm: '11,210.0 L',
    total: '24,190.0 L',
    avg: '27.21 L',
    quality: '96.5% Grade A',
    withheld: '36.4 L',
  },
] as const;

const cohorts = [
  ['Pen 04 — high yield', '34.2%'],
  ['Pen 02 — creamery group', '28.5%'],
  ['Pen 01 — fresh cows', '21.8%'],
  ['Pen 03 — late lactation', '15.5%'],
];

const leaders = [
  ['Animal D', 'TAG-A-04', '31.2 L/day (illustrative)'],
  ['Animal A', 'TAG-A-01', '27.7 L/day (illustrative)'],
];

export function MonthlyReports() {
  const [month, setMonth] = useState('Sample month');
  const [stage, setStage] = useState('Full herd');
  const [notice, setNotice] = useState('');

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
              <span className="text-[#2f4126]">Monthly reports</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Monthly Milk Production & Compliance Reports
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Report preview with illustrative figures. No certification, export or dispatch is
              produced by this prototype.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['Schedule dispatch', <CalendarDays key="cal" aria-hidden="true" size={14} />],
              ['Print report', <Printer key="print" aria-hidden="true" size={14} />],
              ['Export data', <Download key="export" aria-hidden="true" size={14} />],
              ['Download PDF', <Download key="pdf" aria-hidden="true" size={14} />],
            ].map(([label, icon]) => (
              <button
                key={label as string}
                type="button"
                onClick={() => setNotice(`${label} is not wired in this prototype.`)}
                className={`inline-flex items-center gap-1.5 rounded-lg ${label === 'Download PDF' ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#1b1c18]'} px-3 py-2 text-sm font-semibold ${focus}`}
              >
                {icon} {label as string}
              </button>
            ))}
          </div>
        </header>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label
                htmlFor="report-month"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
              >
                Report month
              </label>
              <select
                id="report-month"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option>Sample month</option>
                <option>Previous sample month</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="report-scope"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
              >
                Operational scope
              </label>
              <input
                id="report-scope"
                readOnly
                value="Farm workspace (all parlors & pens)"
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm text-[#444840] ${focus}`}
              />
            </div>
            <div>
              <label
                htmlFor="report-stage"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
              >
                Lactation stage
              </label>
              <select
                id="report-stage"
                value={stage}
                onChange={(event) => setStage(event.target.value)}
                className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option>Full herd</option>
                <option>Fresh cows</option>
                <option>High yield</option>
              </select>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-[#444840]">
            <Info aria-hidden="true" size={13} /> Sample reporting period only; no audit closure is
            implied.
          </p>
          {notice ? (
            <p role="status" className="mt-2 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
              {notice}
            </p>
          ) : null}
        </section>

        <section
          aria-label="Monthly summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5"
        >
          {[
            {
              label: 'Total monthly yield',
              value: '748,520 L',
              note: 'Illustrative monthly total',
            },
            { label: 'Morning cumulative', value: '401,980 L', note: 'Illustrative shift total' },
            { label: 'Evening cumulative', value: '346,540 L', note: 'Illustrative shift total' },
            { label: 'Herd daily average', value: '27.42 L/cow/d', note: 'Illustrative average' },
            {
              label: 'Quality compliance',
              value: '97.2% Grade A',
              note: 'Illustrative quality split',
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

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-base font-bold">Daily volume breakdown</h2>
          <p className="mt-1 text-xs text-[#444840]">
            Illustrative stacked bars by shift; no target baseline is applied.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#444840]">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-[#2f4126]" /> Morning shift
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-[#d9e8c7]" /> Evening shift
            </span>
          </div>
          <div
            role="img"
            aria-label="Illustrative daily stacked bars for a sample month."
            className="mt-4 flex h-40 items-end gap-1.5 border-b border-[#c4c8bd] pb-1"
          >
            {Array.from({ length: 16 }, (_, index) => (
              <div key={index} className="flex flex-1 flex-col justify-end gap-0.5">
                <div
                  className="w-full rounded-t bg-[#d9e8c7]"
                  style={{ height: `${28 + (index % 5) * 6}%` }}
                />
                <div
                  className="w-full bg-[#2f4126]"
                  style={{ height: `${32 + (index % 4) * 7}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-[#444840]">
            <span>Day 01</span>
            <span>Day 08</span>
            <span>Day 16</span>
            <span>Day 23</span>
          </div>
          <p className="mt-2 text-xs text-[#444840]">
            Text summary: sample volumes; values are not live.
          </p>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] p-4">
            <h2 className="font-heading text-base font-bold">Day-by-day production audit ledger</h2>
            <div className="flex flex-wrap gap-2">
              <select
                aria-label="Station filter"
                className={`rounded-lg bg-white px-3 py-2 text-sm ${focus}`}
              >
                <option>All stations</option>
              </select>
              <select
                aria-label="Quality filter"
                className={`rounded-lg bg-white px-3 py-2 text-sm ${focus}`}
              >
                <option>All qualities</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Date',
                    'Active milking',
                    'Morning total',
                    'Evening total',
                    'Daily total',
                    'Avg / cow',
                    'Quality',
                    'Withheld',
                    'Action',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {days.map((row) => (
                  <tr key={row.date}>
                    <td className="whitespace-nowrap px-3 py-3 font-semibold">{row.date}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.milkers} head</td>
                    <td className="px-3 py-3 text-xs">{row.am}</td>
                    <td className="px-3 py-3 text-xs">{row.pm}</td>
                    <td className="px-3 py-3 font-heading text-sm font-bold text-[#2f4126]">
                      {row.total}
                    </td>
                    <td className="px-3 py-3 text-xs">{row.avg}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#2f4126]">
                        {row.quality}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.withheld}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        className={`rounded bg-[#f0eee8] px-2 py-1 text-xs font-semibold ${focus}`}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {days.length} illustrative days</span>
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Herd cohort volume contributions</h2>
            <p className="mt-1 text-xs text-[#444840]">Illustrative proportional split by pen.</p>
            <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-[#f0eee8]">
              {['bg-[#2f4126]', 'bg-[#46583b]', 'bg-[#556249]', 'bg-[#d9e8c7]'].map((colour) => (
                <div key={colour} className={`h-full ${colour}`} style={{ width: '25%' }} />
              ))}
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {cohorts.map(([name, share]) => (
                <li
                  key={name}
                  className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-2.5 text-sm"
                >
                  {name} <span className="font-heading font-bold text-[#2f4126]">{share}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Individual production leaders</h2>
            <p className="mt-1 text-xs text-[#444840]">
              Neutral placeholders; no ranking formula applied.
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {leaders.map(([name, tag, value], index) => (
                <li
                  key={tag}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#f5f3ed] p-3"
                >
                  <span className="flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d9e8c7] text-sm font-bold text-[#2f4126]">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="font-heading text-sm font-bold">{name}</span>
                      <span className="block font-mono text-[11px] text-[#444840]">{tag}</span>
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-[#2f4126]">{value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[#444840]">
              <TrendingUp aria-hidden="true" size={13} /> Extended rankings are not shown.
            </p>
          </section>
        </div>

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <ShieldCheck aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#2f4126]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Compliance notice</h2>
            <p className="mt-1 text-sm text-[#444840]">
              This report preview carries no certification, checksum or legal claim. Values are
              illustrative and must not be treated as an audited document.
            </p>
          </div>
          <BarChart3 aria-hidden="true" size={16} className="ml-auto text-[#444840]" />
        </section>
      </div>
    </div>
  );
}
