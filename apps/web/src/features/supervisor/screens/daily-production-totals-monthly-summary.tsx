import { useState } from 'react';
import { CalendarDays, Grid2X2, Info, Search, TrendingUp } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const TABS = ['Daily herd totals', 'Monthly summary', 'Pen allocation'] as const;
const WEEK = [72, 76, 70, 68, 74, 78, 80] as const;
const MONTH = [
  82, 84, 74, 88, 90, 86, 89, 78, 91, 93, 87, 89, 76, 92, 89, 85, 90, 81, 88, 94, 86, 91, 83, 87,
] as const;

const PENS = [
  { code: 'PEN 01', name: 'Fresh Cows', am: '480.0 L', pm: '410.0 L', total: '890.0 L' },
  { code: 'PEN 02', name: 'Peak Lactation', am: '1,120.0 L', pm: '960.0 L', total: '2,080.0 L' },
  {
    code: 'PEN 03',
    name: 'Mid-Late Lactation',
    am: '1,040.0 L',
    pm: '810.5 L',
    total: '1,850.5 L',
  },
  {
    code: 'PEN 04',
    name: 'Hospital Pen',
    am: 'Recorded separately',
    pm: 'Recorded separately',
    total: 'Not added to bulk',
  },
] as const;

const LEDGER = [
  {
    tag: 'ET-A1042',
    animal: 'Animal A-1042',
    pen: 'PEN 02',
    am: '18.4',
    pm: '16.5',
    total: '34.9',
  },
  {
    tag: 'ET-C3088',
    animal: 'Animal C-3088',
    pen: 'PEN 01',
    am: '16.8',
    pm: '15.0',
    total: '31.8',
  },
  { tag: 'ET-D4119', animal: 'Animal D-4119', pen: 'PEN 03', am: '11.5', pm: '8.9', total: '20.4' },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/daily_production_totals_monthly_summary */
export function DailyProductionTotalsMonthlySummaryScreen() {
  const [tab, setTab] = useState<string>('Daily herd totals');
  const [dayOffset, setDayOffset] = useState(0);
  const [query, setQuery] = useState('');

  const visibleLedger = LEDGER.filter((row) =>
    `${row.tag} ${row.animal} ${row.pen}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
              <span>Farm Workspace</span>
              <span aria-hidden="true">/</span>
              <span>Milk production</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#1b1c18]">
                Daily totals &amp; monthly summary
              </span>
            </nav>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
              Daily Production Totals &amp; Operational Summary
            </h1>
            <p className="max-w-3xl text-sm text-[#444840]">
              Aggregated session volumes and permitted operational summaries. Sample figures are
              illustrative; commercial, pricing and billing data are excluded.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#f0eee8] p-2">
            <button
              type="button"
              aria-label="Previous sample day"
              onClick={() => setDayOffset((value) => value - 1)}
              className={`h-9 w-9 rounded text-lg ${focusRing}`}
            >
              ‹
            </button>
            <span className="inline-flex items-center gap-2 px-2 text-sm font-semibold">
              <CalendarDays size={15} aria-hidden="true" /> Sample day{' '}
              {dayOffset === 0 ? '(current)' : dayOffset}
            </span>
            <button
              type="button"
              aria-label="Next sample day"
              onClick={() => setDayOffset((value) => value + 1)}
              className={`h-9 w-9 rounded text-lg ${focusRing}`}
            >
              ›
            </button>
          </div>
        </header>

        <div
          className="flex gap-1 overflow-x-auto rounded-xl bg-[#f0eee8] p-1.5"
          role="tablist"
          aria-label="Production summary views"
        >
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === item ? 'bg-white text-[#1b1c18] shadow-sm' : 'text-[#444840]'} ${focusRing}`}
            >
              {item === 'Pen allocation' ? <Grid2X2 size={15} aria-hidden="true" /> : null}
              {item}
            </button>
          ))}
        </div>

        <section className="rounded-xl border-l-4 border-[#7a461c] bg-[#f0eee8] p-4">
          <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
            Supervisor operational scope
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            This view is limited to volumetric summaries. Milk contracts, farmgate pricing,
            processing invoices, stock adjustments and hauler billing require Farm Admin access.
          </p>
        </section>

        <section aria-label="Daily overview" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Total collected', value: '4,820.5 L' },
            { label: 'Morning session', value: '2,640.0 L' },
            { label: 'Evening session', value: '2,180.5 L' },
            { label: 'Quality split', value: '96.2% good' },
            { label: 'Yield per head', value: '26.2 L/day' },
          ].map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {card.label}
              </p>
              <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">Illustrative</p>
            </article>
          ))}
        </section>

        {tab === 'Daily herd totals' || tab === 'Monthly summary' ? (
          <section className="rounded-xl border border-[#c4c8bd] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  7-Day Herd Milking Trajectory
                </h2>
                <p className="mt-1 text-sm text-[#444840]">
                  Illustrative morning and evening bars. No target formula, prediction or telemetry
                  is represented.
                </p>
              </div>
              <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-xs text-[#444840]">
                Illustrative
              </span>
            </div>
            <div
              className="mt-5 flex h-44 items-end gap-3"
              role="img"
              aria-label="Illustrative seven-day session overview"
            >
              {WEEK.map((value, index) => (
                <div key={index} className="flex h-full flex-1 items-end gap-0.5">
                  <div className="w-1/2 rounded-sm bg-[#2f4126]" style={{ height: `${value}%` }} />
                  <div
                    className="w-1/2 rounded-sm bg-[#556249]"
                    style={{ height: `${value * 0.82}%` }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-[#444840]">
              <TrendingUp size={14} aria-hidden="true" /> Morning / evening split shown for context
              only.
            </p>
          </section>
        ) : null}

        {tab === 'Pen allocation' ? (
          <>
            <h2 className="font-heading text-base font-bold text-[#1b1c18]">
              Pen-Level Milking Groups Breakdown
            </h2>
            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PENS.map((pen) => (
                <article key={pen.code} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
                  <span className="rounded bg-[#f0eee8] px-2 py-0.5 font-mono text-xs font-bold text-[#46583b]">
                    {pen.code}
                  </span>
                  <h3 className="mt-2 font-heading text-sm font-bold text-[#1b1c18]">{pen.name}</h3>
                  <dl className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#444840]">AM</dt>
                      <dd className="font-mono">{pen.am}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#444840]">PM</dt>
                      <dd className="font-mono">{pen.pm}</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-[#f0eee8] pt-1">
                      <dt className="font-semibold">Total</dt>
                      <dd className="font-mono font-bold">{pen.total}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs text-[#444840]">Illustrative</p>
                </article>
              ))}
            </section>
          </>
        ) : null}

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                Individual Milking Ledger
              </h2>
              <p className="mt-1 text-sm text-[#444840]">Sample records · no export is available</p>
            </div>
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Filter ledger</span>
              <Search
                size={15}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by tag or group"
                className={`h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
              />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Ear tag
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Animal
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Group
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    AM (L)
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    PM (L)
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Total (L)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {visibleLedger.map((row) => (
                  <tr key={row.tag}>
                    <td className="px-3 py-3 font-mono font-semibold text-[#2f4126]">{row.tag}</td>
                    <td className="px-3 py-3">{row.animal}</td>
                    <td className="px-3 py-3">{row.pen}</td>
                    <td className="px-3 py-3 text-right font-mono">{row.am}</td>
                    <td className="px-3 py-3 text-right font-mono">{row.pm}</td>
                    <td className="px-3 py-3 text-right font-mono font-bold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleLedger.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#444840]">
                No ledger record matches this filter.
              </p>
            ) : null}
          </div>
        </section>

        {tab === 'Monthly summary' ? (
          <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Monthly operational aggregate
                </h2>
                <p className="mt-1 text-sm text-[#444840]">
                  Physical volume only · illustrative distribution across sample days
                </p>
              </div>
              <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-xs text-[#444840]">
                Illustrative
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Month-to-date volume', value: '118,450 L' },
                { label: 'Daily rolling average', value: '4,935 L' },
                { label: 'Days recorded', value: '24 / 31' },
                { label: 'Bulk quality', value: '96.8% good' },
              ].map((card) => (
                <div key={card.label} className="rounded-lg bg-[#f0eee8] p-4">
                  <p className="text-[11px] font-semibold uppercase text-[#444840]">{card.label}</p>
                  <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{card.value}</p>
                </div>
              ))}
            </div>
            <h3 className="font-heading text-sm font-bold text-[#1b1c18]">
              Daily Volume Distribution (Days 1–24 October)
            </h3>
            <div
              className="grid grid-cols-6 gap-1.5 sm:grid-cols-12"
              role="img"
              aria-label="Illustrative daily volume distribution"
            >
              {MONTH.map((height, index) => (
                <div key={index} className="flex h-24 flex-col items-center justify-end">
                  <div
                    className={`w-full rounded-sm ${height > 85 ? 'bg-[#2f4126]' : 'bg-[#556249]'}`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="mt-1 text-[9px] text-[#444840]">{index + 1}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-xl border border-[#c4c8bd] bg-white p-5">
          <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
            October 2024 Operational Aggregate
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            Permitted volumetric summary only. No pricing, billing or commercial data is shown.
          </p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ['Recorded sessions', 'Illustrative'],
              ['Collected volume', 'Illustrative'],
              ['Reviewed summaries', 'Illustrative'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-[#f0eee8] p-3">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {label}
                </dt>
                <dd className="mt-1 font-heading text-sm font-bold text-[#2f4126]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            Print, export, sign-off, tank telemetry and health-alert widgets are not part of this
            supervisor view.
          </p>
        </div>
      </div>
    </main>
  );
}
