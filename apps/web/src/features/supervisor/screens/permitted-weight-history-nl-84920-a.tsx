import { useState } from 'react';
import { Info, LockKeyhole, Scale, Search } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const RANGES = ['30 days', '90 days', 'Current cycle', 'Lifetime'] as const;

const RECORDS = [
  { date: 'Sample date', time: 'Morning', weight: '642 kg', station: 'Weigh station A' },
  { date: 'Sample date', time: 'Morning', weight: '638 kg', station: 'Weigh station A' },
  { date: 'Sample date', time: 'Afternoon', weight: '635 kg', station: 'Weigh station B' },
  { date: 'Sample date', time: 'Morning', weight: '626 kg', station: 'Weigh station A' },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/permitted_weight_history_nl_84920_a */
export function PermittedWeightHistoryNl84920AScreen() {
  const [range, setRange] = useState<string>('Current cycle');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [query, setQuery] = useState('');

  const visible = RECORDS.filter((record) =>
    `${record.date} ${record.time} ${record.weight} ${record.station}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-[#444840]"
        >
          <span>Animals</span>
          <span aria-hidden="true">/</span>
          <span>Animal A-1042</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Permitted Weight History</span>
        </nav>

        <header className="rounded-xl border border-[#c4c8bd] bg-white p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f0eee8] text-[#46583b]">
                <Scale size={28} aria-hidden="true" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-[#1b1c18]">Animal A-1042</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#444840]">
                  <span className="rounded bg-[#f0eee8] px-2 py-0.5 font-mono text-xs">
                    ET-A1042
                  </span>
                  <span>Milking group 02</span>
                  <span aria-hidden="true">·</span>
                  <span>Record station A</span>
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f0eee8] px-3 py-2 text-xs text-[#444840]">
              <LockKeyhole size={14} aria-hidden="true" /> Read-only operational audit
            </span>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Latest recorded weight', value: '642 kg' },
            { label: 'Reference range', value: '620 – 660 kg' },
            { label: 'Condition score', value: '3.25 / 5' },
            { label: 'Last record', value: 'Sample date' },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {card.label}
              </p>
              <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">Illustrative</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-[#c4c8bd] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="History range">
            {RANGES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={range === item}
                onClick={() => setRange(item)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${range === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Display unit">
            <span className="text-xs font-semibold uppercase text-[#444840]">Display unit</span>
            {(['kg', 'lb'] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={unit === item}
                onClick={() => setUnit(item)}
                className={`rounded-lg px-3 py-2 font-mono text-xs ${unit === item ? 'bg-[#46583b] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <section className="rounded-xl border border-[#c4c8bd] bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
                Weight history overview
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Illustrative trend line. No automated calculation, prediction or device telemetry is
                represented.
              </p>
            </div>
            <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-xs text-[#444840]">
              Illustrative
            </span>
          </div>
          <div className="mt-5 overflow-x-auto">
            <svg
              viewBox="0 0 600 180"
              className="h-44 w-full min-w-[520px]"
              role="img"
              aria-label="Illustrative weight trend line with dated sample points"
            >
              {[20, 60, 100, 140].map((y) => (
                <line key={y} x1="20" x2="580" y1={y} y2={y} stroke="#e4e2dd" strokeWidth="1" />
              ))}
              <polyline
                points="35,60 140,72 245,88 350,110 455,102 560,70"
                fill="none"
                stroke="#2f4126"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {[35, 140, 245, 350, 455, 560].map((x, index) => (
                <circle
                  key={x}
                  cx={x}
                  cy={[60, 72, 88, 110, 102, 70][index]}
                  r="4"
                  fill="#fbf9f3"
                  stroke="#46583b"
                  strokeWidth="2"
                />
              ))}
              <text x="35" y="168" fontSize="11" fill="#444840">
                Sample 1
              </text>
              <text x="560" y="168" fontSize="11" fill="#444840" textAnchor="end">
                Sample 6
              </text>
            </svg>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Permitted weigh ledger
                </h2>
                <p className="mt-1 text-xs text-[#444840]">
                  Sample records · no export is available to this role
                </p>
              </div>
              <label className="relative w-full sm:max-w-xs">
                <span className="sr-only">Filter weight records</span>
                <Search
                  size={15}
                  aria-hidden="true"
                  className="absolute left-3 top-3 text-[#75786f]"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter ledger"
                  className={`h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
                />
              </label>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead>
                  <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                    <th scope="col" className="px-3 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Recorded weight
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Station
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Recorded by
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0eee8]">
                  {visible.map((record, index) => (
                    <tr key={`${record.date}-${index}`}>
                      <td className="px-3 py-3">
                        {record.date}
                        <span className="block text-xs text-[#444840]">{record.time}</span>
                      </td>
                      <td className="px-3 py-3 font-mono font-bold text-[#2f4126]">
                        {unit === 'kg' ? record.weight : `${record.weight} (kg source)`}
                      </td>
                      <td className="px-3 py-3">{record.station}</td>
                      <td className="px-3 py-3 text-[#444840]">Recorded entry</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visible.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#444840]">
                  No weight record matches this filter.
                </p>
              ) : null}
            </div>
          </section>

          <div className="space-y-4 lg:col-span-4">
            <section className="rounded-xl border border-[#c4c8bd] bg-white p-5">
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                Cycle reference values
              </h2>
              <dl className="mt-3 divide-y divide-[#f0eee8] text-sm">
                {[
                  ['Highest recorded', '658 kg'],
                  ['Lowest recorded', '618 kg'],
                  ['Cycle average', '638 kg'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2 py-2">
                    <dt className="text-[#444840]">{label}</dt>
                    <dd className="font-mono font-semibold text-[#1b1c18]">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-[#444840]">Illustrative values only.</p>
            </section>
            <section className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-5">
              <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
              <p className="text-xs leading-relaxed text-[#444840]">
                Direct weight overrides, baseline restatements and retroactive edits are restricted
                to Farm Admin. This screen contains no export, print, scanner or telemetry control.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
