import { useState, type FormEvent } from 'react';
import { CheckCircle2, ClipboardList, Info, Minus, Plus, Search } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const SESSIONS = ['Morning run', 'Midday top-up', 'Evening delivery'] as const;
const COHORTS = [
  { code: 'PLAN-A', name: 'Milking groups', target: '2,200 kg' },
  { code: 'PLAN-B', name: 'Dry group', target: '850 kg' },
  { code: 'PLAN-C', name: 'Young stock', target: '220 kg' },
] as const;
const LEDGER = [
  {
    time: 'Sample time',
    run: 'Midday top-up',
    cohort: 'Milking groups',
    planned: '850.0',
    actual: '850.0',
    score: '1.0',
  },
  {
    time: 'Sample time',
    run: 'Morning run',
    cohort: 'Dry group',
    planned: '850.0',
    actual: '845.0',
    score: '0.5',
  },
  {
    time: 'Sample time',
    run: 'Morning run',
    cohort: 'Young stock',
    planned: '220.0',
    actual: '220.0',
    score: '0.0',
  },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/actual_feeding_records_entry */
export function ActualFeedingRecordsEntryScreen() {
  const [session, setSession] = useState<string>('Evening delivery');
  const [cohort, setCohort] = useState<string>('PLAN-A');
  const [actual, setActual] = useState('');
  const [bunk, setBunk] = useState('1.0');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const adjust = (delta: number) => {
    const current = Number.parseFloat(actual);
    const next = Number.isFinite(current) ? Math.max(0, current + delta) : Math.max(0, delta);
    setActual(next.toFixed(1));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    const value = Number.parseFloat(actual);
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter a positive delivered quantity in kilograms.');
      return;
    }
    setMessage('Draft validated locally. No feeding record was saved and no stock was changed.');
  };

  const visible = LEDGER.filter((row) =>
    `${row.run} ${row.cohort} ${row.time}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Feeding</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Record actual feeding</span>
        </nav>

        <header>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
            Record Actual Feeding Delivery
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#444840]">
            Record delivered ration quantities and bunk observations. This is an entry preview; no
            equipment telemetry, formula calculation or stock deduction is implemented.
          </p>
        </header>

        <section className="rounded-xl border-l-4 border-[#7a461c] bg-[#f0eee8] p-4">
          <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
            Operational boundary and deduction directive
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            Actual feeding entries capture physical delivery only. Inventory usage is recorded
            separately; do not assume automatic stock deduction. Plan formulations remain locked to
            Farm Admin.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          <form
            onSubmit={submit}
            noValidate
            className="space-y-5 rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-7"
          >
            <div>
              <p className="text-sm font-semibold">Feeding session</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {SESSIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={session === item}
                    onClick={() => setSession(item)}
                    className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold ${session === item ? 'bg-[#46583b] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold">Assigned cohort</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {COHORTS.map((item) => (
                  <label
                    key={item.code}
                    className={`cursor-pointer rounded-lg p-3 ${cohort === item.code ? 'bg-[#d9e8c7]' : 'bg-[#f0eee8]'}`}
                  >
                    <input
                      type="radio"
                      name="cohort"
                      value={item.code}
                      checked={cohort === item.code}
                      onChange={() => setCohort(item.code)}
                      className={`sr-only ${focusRing}`}
                    />
                    <span className="font-mono text-xs font-bold text-[#46583b]">{item.code}</span>
                    <span className="mt-1 block text-sm font-semibold text-[#1b1c18]">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-xs text-[#444840]">Target {item.target}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-[#f0eee8] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  Planned reference
                </p>
                <p className="mt-2 font-heading text-2xl font-bold text-[#1b1c18]">2,200.0 kg</p>
                <p className="mt-1 text-xs text-[#444840]">Illustrative plan target</p>
              </div>
              <div className="rounded-lg bg-[#f0eee8] p-4">
                <label
                  htmlFor="actual-qty"
                  className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]"
                >
                  Actual delivered (kg)
                </label>
                <input
                  id="actual-qty"
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  value={actual}
                  onChange={(event) => setActual(event.target.value)}
                  placeholder="0.0"
                  aria-describedby={error ? 'feeding-error' : undefined}
                  className={`mt-2 h-12 w-full rounded-lg border border-[#c4c8bd] bg-white px-3 font-heading text-xl font-bold text-[#2f4126] ${focusRing}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[-50, -10, 10, 50].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={() => adjust(delta)}
                  className={`h-11 rounded-lg bg-[#f0eee8] text-sm font-semibold ${focusRing}`}
                >
                  {delta > 0 ? (
                    <Plus size={13} aria-hidden="true" className="inline" />
                  ) : (
                    <Minus size={13} aria-hidden="true" className="inline" />
                  )}
                  {Math.abs(delta)} kg
                </button>
              ))}
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold">Observed bunk condition</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { value: '0.0', label: 'Clean bunk' },
                  { value: '0.5', label: 'Light residue' },
                  { value: '1.0', label: 'Thin layer' },
                  { value: '2.0', label: 'Residual feed' },
                ].map((item) => (
                  <label
                    key={item.value}
                    className={`cursor-pointer rounded-lg p-3 text-sm ${bunk === item.value ? 'bg-[#d9e8c7]' : 'bg-[#f0eee8]'}`}
                  >
                    <input
                      type="radio"
                      name="bunk"
                      value={item.value}
                      checked={bunk === item.value}
                      onChange={() => setBunk(item.value)}
                      className={`sr-only ${focusRing}`}
                    />
                    <strong className="block text-[#1b1c18]">{item.value}</strong>
                    <span className="text-xs text-[#444840]">{item.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-[#444840]">
                Observation descriptors only; no approved scoring formula is applied.
              </p>
            </fieldset>

            <div className="space-y-1.5">
              <label htmlFor="feeding-notes" className="text-sm font-semibold">
                Bunk observation notes (optional)
              </label>
              <input
                id="feeding-notes"
                type="text"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Record visible condition only"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>

            {error ? (
              <p id="feeding-error" role="alert" className="text-sm font-semibold text-[#ba1a1a]">
                {error}
              </p>
            ) : null}
            {message ? (
              <p role="status" className="rounded-lg bg-[#d9e8c7] px-3 py-2 text-sm text-[#46583b]">
                {message}
              </p>
            ) : null}

            <div className="flex flex-wrap justify-end gap-2 border-t border-[#f0eee8] pt-4">
              <button
                type="button"
                onClick={() => {
                  setActual('');
                  setNotes('');
                  setMessage('');
                  setError('');
                }}
                className={`h-11 rounded-lg border border-[#c4c8bd] px-5 text-sm font-semibold ${focusRing}`}
              >
                Clear
              </button>
              <button
                type="submit"
                className={`inline-flex h-11 items-center gap-2 rounded-lg bg-[#46583b] px-5 text-sm font-semibold text-white ${focusRing}`}
              >
                <CheckCircle2 size={17} aria-hidden="true" /> Validate Feeding Entry
              </button>
            </div>
          </form>

          <aside className="space-y-4 lg:col-span-5">
            <section className="rounded-xl border border-[#c4c8bd] bg-white p-5">
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                Shift feeding progress
              </h2>
              <p className="mt-1 text-sm text-[#444840]">Illustrative snapshot for this shift.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Runs recorded', value: '2 / 3' },
                  { label: 'Delivered', value: '4,105 kg' },
                  { label: 'Bunk condition', value: 'Observed' },
                  { label: 'Net variance', value: 'Not calculated' },
                ].map((card) => (
                  <div key={card.label} className="rounded-lg bg-[#f0eee8] p-3">
                    <p className="text-[11px] font-semibold uppercase text-[#444840]">
                      {card.label}
                    </p>
                    <p className="mt-1 font-heading text-lg font-bold text-[#2f4126]">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-5">
              <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
              <p className="text-sm text-[#444840]">
                Scale telemetry, tolerance thresholds, compliance percentages and export actions are
                intentionally absent.
              </p>
            </section>
          </aside>
        </div>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList size={18} aria-hidden="true" className="text-[#46583b]" />
              <div>
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Shift feeding ledger
                </h2>
                <p className="mt-1 text-sm text-[#444840]">Sample entries · illustrative</p>
              </div>
            </div>
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Filter feeding ledger</span>
              <Search
                size={15}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by run or cohort"
                className={`h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
              />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Run
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Cohort
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Planned (kg)
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Actual (kg)
                  </th>
                  <th scope="col" className="px-3 py-3 text-center">
                    Bunk
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {visible.map((row, index) => (
                  <tr key={`${row.run}-${index}`}>
                    <td className="px-3 py-3">{row.time}</td>
                    <td className="px-3 py-3">{row.run}</td>
                    <td className="px-3 py-3">{row.cohort}</td>
                    <td className="px-3 py-3 text-right font-mono">{row.planned}</td>
                    <td className="px-3 py-3 text-right font-mono font-bold">{row.actual}</td>
                    <td className="px-3 py-3 text-center font-mono">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#444840]">
                No feeding record matches this filter.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
