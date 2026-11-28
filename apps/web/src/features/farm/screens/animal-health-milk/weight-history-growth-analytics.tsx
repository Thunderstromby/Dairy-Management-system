import { useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Eye,
  Gauge,
  History,
  Info,
  Plus,
  Scale,
  Search,
  Ruler,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const records = [
  {
    date: 'Sample date A',
    weight: '642.0',
    stage: 'Lactating · Pen 04',
    operator: 'Farm staff (illustrative)',
    note: 'Routine entry',
    tone: 'primary',
  },
  {
    date: 'Sample date B',
    weight: '638.0',
    stage: 'Lactating · Pen 04',
    operator: 'Farm Admin (illustrative)',
    note: 'Post-calving check',
    tone: 'primary',
  },
  {
    date: 'Sample date C',
    weight: '628.0',
    stage: 'Calving day',
    operator: 'Veterinary staff (illustrative)',
    note: 'Calving-day entry',
    tone: 'tertiary',
  },
  {
    date: 'Sample date D',
    weight: '650.0',
    stage: 'Gestation · Pen 02',
    operator: 'Farm Admin (illustrative)',
    note: 'Routine entry',
    tone: 'primary',
  },
  {
    date: 'Sample date E',
    weight: '42.0',
    stage: 'Nursery calf',
    operator: 'Veterinary staff (illustrative)',
    note: 'Birth baseline',
    tone: 'neutral',
  },
] as const;

const toneClass: Record<(typeof records)[number]['tone'], string> = {
  primary: 'bg-[#f0eee8] text-[#444840]',
  tertiary: 'bg-[#ffdcc6] text-[#7a461c]',
  neutral: 'bg-[#eae8e2] text-[#444840]',
};

export function WeightHistoryGrowthAnalytics() {
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const filtered = records.filter((record) =>
    `${record.date} ${record.stage} ${record.note}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
            <span>Animal management</span>
            <ChevronRight aria-hidden="true" size={13} />
            <span>Weight history</span>
          </div>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Animal A · TAG-A-01
              </h1>
              <p className="mt-1 text-sm text-[#444840]">
                Weight History & Growth Analytics — all values are illustrative.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#2f4126]">
                  Active lactation
                </span>
                <span className="rounded-full bg-[#eae8e2] px-2.5 py-1 text-xs font-semibold text-[#444840]">
                  Pen 04
                </span>
                <span className="rounded-full bg-[#eae8e2] px-2.5 py-1 text-xs font-semibold text-[#444840]">
                  Configured unit: kg
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMessage('Export is not wired in this prototype.')}
                className={`rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-semibold ${focus}`}
              >
                Export weight CSV
              </button>
              <button
                type="button"
                aria-expanded={formOpen}
                onClick={() => setFormOpen((open) => !open)}
                className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white ${focus}`}
              >
                <Plus aria-hidden="true" size={15} /> Log new weight
              </button>
            </div>
          </div>
          {message ? (
            <p role="status" className="mt-3 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
              {message}
            </p>
          ) : null}
        </header>

        <section
          aria-label="Weight summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Latest recorded weight',
              value: '642.0 kg',
              detail: 'Sample entry · illustrative',
              icon: <Scale aria-hidden="true" size={18} />,
            },
            {
              label: 'Previous verified weight',
              value: '638.0 kg',
              detail: 'Sample entry · illustrative',
              icon: <History aria-hidden="true" size={18} />,
            },
            {
              label: 'Body condition score',
              value: '3.25 / 5',
              detail: 'Illustrative observation',
              icon: <Ruler aria-hidden="true" size={18} />,
            },
            {
              label: 'Weigh-in log total',
              value: '24 entries',
              detail: 'Illustrative count',
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
              <p className="mt-1 text-xs text-[#444840]">{item.detail}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-lg font-bold">Life-cycle weight trajectory</h2>
            <span className="rounded bg-[#f0eee8] px-2 py-1 text-[11px] font-semibold text-[#444840]">
              Illustrative timeline
            </span>
          </div>
          <p className="mt-1 text-sm text-[#444840]">
            Empirical record preview from birth baseline to current lactation. No growth formula or
            projection is applied.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#444840]">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#2f4126]" /> Observed weight
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#7a461c]" /> Milestone
            </span>
          </div>
          <div
            role="img"
            aria-label="Illustrative weight trajectory with three sample milestones and no calculated trend."
            className="mt-4 flex h-40 items-end gap-2 border-b border-[#c4c8bd] pb-1"
          >
            {[24, 34, 46, 58, 68, 76, 74].map((height, index) => (
              <div key={index} className="relative flex flex-1 items-end">
                <div className="w-full rounded-t bg-[#46583b]" style={{ height: `${height}%` }} />
                {index === 0 || index === 4 || index === 6 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -top-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#7a461c]"
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#444840]">
            {[
              'Birth baseline: illustrative',
              'Highest record: illustrative',
              'Latest record: illustrative',
            ].map((note) => (
              <span key={note} className="rounded-lg bg-[#f0eee8] px-2.5 py-1.5">
                {note}
              </span>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f5f3ed] p-4">
            <div>
              <h2 className="font-heading text-base font-bold">Historical scale record ledger</h2>
              <p className="mt-1 text-xs text-[#444840]">
                Validated manual entries with staff accountability (illustrative).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search
                  aria-hidden="true"
                  size={15}
                  className="absolute left-2.5 top-2.5 text-[#444840]"
                />
                <label htmlFor="weight-search" className="sr-only">
                  Search weight records
                </label>
                <input
                  id="weight-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search records"
                  className={`w-48 rounded-lg border border-[#c4c8bd] bg-white py-2 pl-8 pr-2 text-sm ${focus}`}
                />
              </div>
              <span className="rounded-lg bg-[#eae8e2] px-3 py-2 text-xs font-semibold">
                Show all ({records.length})
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Date & time',
                    'Recorded weight',
                    'Life stage / pen',
                    'Measured by',
                    'Method',
                    'Notes',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {filtered.map((record) => (
                  <tr key={record.date}>
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs font-semibold text-[#1b1c18]">
                        {record.date}
                      </p>
                      <p className="text-[11px] text-[#444840]">Local time</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-heading text-sm font-bold text-[#2f4126]">
                      {record.weight} kg
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass[record.tone]}`}
                      >
                        {record.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#444840]">{record.operator}</td>
                    <td className="px-4 py-3 text-xs text-[#444840]">
                      Manual record (illustrative)
                    </td>
                    <td className="px-4 py-3 text-xs text-[#444840]">{record.note}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        aria-label={`View record ${record.date}`}
                        className={`rounded-lg p-1.5 text-[#444840] ${focus}`}
                      >
                        <Eye aria-hidden="true" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <Gauge aria-hidden="true" size={28} className="mx-auto text-[#444840]" />
                <p className="mt-2 font-heading text-sm font-bold">No matching weight records</p>
                <p className="mt-1 text-xs text-[#444840]">
                  Adjust the search to see more illustrative entries.
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>
              Showing {filtered.length} of {records.length} illustrative records
            </span>
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

        {formOpen ? (
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Add weight record — Animal A</h2>
            <p className="mt-1 text-xs text-[#444840]">
              Local validation preview; no record is saved.
            </p>
            <form
              className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (!weight.trim() || !date.trim()) {
                  setMessage('Complete the date and weight fields to validate locally.');
                  return;
                }
                setMessage('Local entry validated. No data saved and no server request made.');
              }}
            >
              <div>
                <label
                  htmlFor="weight-date"
                  className="mb-1 flex items-center gap-1 text-sm font-semibold"
                >
                  <CalendarDays aria-hidden="true" size={14} /> Date & time{' '}
                  <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="weight-date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                  placeholder="Sample date"
                />
              </div>
              <div>
                <label htmlFor="weight-value" className="mb-1 block text-sm font-semibold">
                  Recorded weight (kg) <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="weight-value"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  inputMode="decimal"
                  className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                  placeholder="0.0"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="weight-operator" className="mb-1 block text-sm font-semibold">
                  Measured by
                </label>
                <select
                  id="weight-operator"
                  className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                >
                  <option>Farm staff (illustrative)</option>
                  <option>Farm Admin (illustrative)</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <button
                  type="submit"
                  className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  <Check aria-hidden="true" size={15} /> Validate entry locally
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWeight('');
                    setDate('');
                  }}
                  className={`rounded-lg bg-[#f0eee8] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Clear
                </button>
              </div>
            </form>
            {message ? (
              <p
                role="status"
                className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]"
              >
                <Info aria-hidden="true" size={14} /> {message}
              </p>
            ) : null}
          </section>
        ) : null}
      </div>
    </div>
  );
}
