import { useState } from 'react';
import { ClipboardCheck, Info, ShieldCheck } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const WEEK = [72, 76, 70, 68, 74, 78, 80] as const;
const LEDGER = [
  {
    tag: 'ET-A1042',
    animal: 'Animal A-1042',
    pen: 'PEN 02',
    am: '18.4 L',
    pm: '16.5 L',
    total: '34.9 L',
    quality: 'Good',
  },
  {
    tag: 'ET-C3088',
    animal: 'Animal C-3088',
    pen: 'PEN 01',
    am: '16.8 L',
    pm: '15.0 L',
    total: '31.8 L',
    quality: 'Good',
  },
  {
    tag: 'ET-D4119',
    animal: 'Animal D-4119',
    pen: 'PEN 03',
    am: '11.5 L',
    pm: '8.9 L',
    total: '20.4 L',
    quality: 'Average',
  },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/permitted_operational_shift_milk_production_report */
export function PermittedOperationalShiftMilkProductionReportScreen() {
  const [period, setPeriod] = useState('Sample period');
  const [session, setSession] = useState('All sessions');
  const [pen, setPen] = useState('All groups');
  const [remarks, setRemarks] = useState('');
  const [status, setStatus] = useState('');

  const isEmpty = period === 'No records in selected period';

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1520px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Shift reports</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Operational milk report</span>
        </nav>

        <header className="space-y-2">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
            Permitted Operational Shift &amp; Milk Production Report
          </h1>
          <p className="max-w-3xl text-sm text-[#444840]">
            Physical volume metrics and session splits for shift handover. Sample figures are
            illustrative; financial, payroll and sales data are excluded.
          </p>
        </header>

        <section className="flex flex-col gap-3 rounded-xl border-l-4 border-[#7a461c] bg-[#f0eee8] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a461c]" />
            <div>
              <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
                Supervisor scope: read-only shift audit
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Financial reports, sales contracts, hauler billing and payroll summaries require
                Farm Admin credentials. No export or print action is available here.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded bg-white px-3 py-1 font-mono text-xs text-[#444840]">
            OPERATIONAL ONLY
          </span>
        </section>

        <section className="grid gap-4 rounded-xl border border-[#c4c8bd] bg-white p-5 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label htmlFor="report-period" className="text-sm font-semibold">
              Reporting period
            </label>
            <select
              id="report-period"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
            >
              <option>Sample period</option>
              <option>No records in selected period</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="report-session" className="text-sm font-semibold">
              Session split
            </label>
            <select
              id="report-session"
              value={session}
              onChange={(event) => setSession(event.target.value)}
              className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
            >
              <option>All sessions</option>
              <option>Morning session</option>
              <option>Evening session</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="report-pen" className="text-sm font-semibold">
              Group focus
            </label>
            <select
              id="report-pen"
              value={pen}
              onChange={(event) => setPen(event.target.value)}
              className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
            >
              <option>All groups</option>
              <option>Milking group 01</option>
              <option>Milking group 02</option>
              <option>Observation group 04</option>
            </select>
          </div>
        </section>

        {isEmpty ? (
          <section className="rounded-xl border border-[#c4c8bd] bg-white p-12 text-center">
            <h2 className="font-heading text-lg font-bold">No harvest logs in selected period</h2>
            <p className="mt-2 text-sm text-[#444840]">
              No sample milking sessions were recorded for this filter.
            </p>
            <button
              type="button"
              onClick={() => setPeriod('Sample period')}
              className={`mt-4 h-10 rounded-lg bg-[#46583b] px-4 text-sm font-semibold text-white ${focusRing}`}
            >
              Reset to sample period
            </button>
          </section>
        ) : (
          <>
            <section
              aria-label="Operational KPI overview"
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
            >
              {[
                { label: 'Total net yield', value: '4,820.5 L' },
                { label: 'Morning session', value: '2,640.0 L' },
                { label: 'Evening session', value: '2,180.5 L' },
                { label: 'Bulk quality split', value: '96.2% good' },
                { label: 'Milking roster', value: '184 head' },
              ].map((card) => (
                <article
                  key={card.label}
                  className="rounded-xl border border-[#c4c8bd] bg-white p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                    {card.label}
                  </p>
                  <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{card.value}</p>
                  <p className="mt-1 text-xs text-[#444840]">Illustrative</p>
                </article>
              ))}
            </section>

            <div className="grid gap-6 lg:grid-cols-12">
              <section className="rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-7">
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Seven-day session overview
                </h2>
                <p className="mt-1 text-sm text-[#444840]">
                  Illustrative volumes only; no target formula or telemetry.
                </p>
                <div
                  className="mt-5 flex h-40 items-end gap-2"
                  role="img"
                  aria-label="Illustrative seven-day session overview"
                >
                  {WEEK.map((value, index) => (
                    <div key={index} className="flex h-full flex-1 items-end gap-0.5">
                      <div
                        className="w-1/2 rounded-sm bg-[#2f4126]"
                        style={{ height: `${value}%` }}
                      />
                      <div
                        className="w-1/2 rounded-sm bg-[#556249]"
                        style={{ height: `${value * 0.82}%` }}
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section className="rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-5">
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Group production breakdown
                </h2>
                <div className="mt-4 space-y-4">
                  {[
                    { label: 'Milking group 01', value: '890.0 L', width: '48%' },
                    { label: 'Milking group 02', value: '2,080.0 L', width: '100%' },
                    { label: 'Milking group 03', value: '1,850.5 L', width: '89%' },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between gap-2 text-sm">
                        <span className="text-[#444840]">{row.label}</span>
                        <span className="font-mono font-semibold">{row.value}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-[#f0eee8]">
                        <div
                          className="h-full rounded-full bg-[#46583b]"
                          style={{ width: row.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[#444840]">Illustrative allocation.</p>
              </section>
            </div>

            <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                Animal harvest audit &amp; handover ledger
              </h2>
              <p className="text-sm text-[#444840]">Sample records · illustrative</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
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
                        AM
                      </th>
                      <th scope="col" className="px-3 py-3 text-right">
                        PM
                      </th>
                      <th scope="col" className="px-3 py-3 text-right">
                        Total
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Quality
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eee8]">
                    {LEDGER.map((row) => (
                      <tr key={row.tag}>
                        <td className="px-3 py-3 font-mono font-semibold text-[#2f4126]">
                          {row.tag}
                        </td>
                        <td className="px-3 py-3">{row.animal}</td>
                        <td className="px-3 py-3">{row.pen}</td>
                        <td className="px-3 py-3 text-right font-mono">{row.am}</td>
                        <td className="px-3 py-3 text-right font-mono">{row.pm}</td>
                        <td className="px-3 py-3 text-right font-mono font-bold">{row.total}</td>
                        <td className="px-3 py-3">
                          <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                            {row.quality}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3 rounded-xl border border-[#c4c8bd] bg-white p-5">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={19} aria-hidden="true" className="text-[#46583b]" />
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Supervisor shift handover remarks
                </h2>
              </div>
              <label htmlFor="handover-remarks" className="text-sm font-semibold">
                Remarks (local draft only)
              </label>
              <textarea
                id="handover-remarks"
                rows={3}
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                placeholder="Record a neutral handover remark"
                className={`w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] p-3 text-sm ${focusRing}`}
              />
              <button
                type="button"
                onClick={() => setStatus('Handover remark validated locally. No record was saved.')}
                className={`h-10 rounded-lg bg-[#46583b] px-4 text-sm font-semibold text-white ${focusRing}`}
              >
                Validate handover note
              </button>
              {status ? (
                <p role="status" className="text-xs text-[#46583b]">
                  {status}
                </p>
              ) : null}
            </section>
          </>
        )}

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            Offline caching, sync-paused states, variance alerts, export and print controls are not
            available in this supervisor report.
          </p>
        </div>
      </div>
    </main>
  );
}
