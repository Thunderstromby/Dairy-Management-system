import { useState, type FormEvent } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Droplets,
  Info,
  LockKeyhole,
  Minus,
  Plus,
  Search,
} from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const ANIMALS = [
  { id: 'ET-A1042', label: 'Animal A-1042', group: 'Milking group 02' },
  { id: 'ET-C3088', label: 'Animal C-3088', group: 'Milking group 01' },
  { id: 'ET-D4119', label: 'Animal D-4119', group: 'Young stock' },
] as const;

const LEDGER = [
  {
    animal: 'Animal A-1042',
    session: 'Evening',
    yield: '16.5 L',
    quality: 'Good',
    time: 'Sample time',
  },
  {
    animal: 'Animal C-3088',
    session: 'Evening',
    yield: '15.0 L',
    quality: 'Good',
    time: 'Sample time',
  },
  {
    animal: 'Animal D-4119',
    session: 'Evening',
    yield: '11.8 L',
    quality: 'Average',
    time: 'Sample time',
  },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/milk_production_entry_session_recording */
export function MilkProductionEntrySessionRecordingScreen() {
  const [session, setSession] = useState<'Morning' | 'Evening'>('Evening');
  const [animal, setAnimal] = useState('');
  const [litres, setLitres] = useState('');
  const [quality, setQuality] = useState('Good');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const adjust = (delta: number) => {
    const current = Number.parseFloat(litres);
    const next = Number.isFinite(current) ? Math.max(0, current + delta) : Math.max(0, delta);
    setLitres(next.toFixed(1));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    const value = Number.parseFloat(litres);
    if (!animal.trim()) {
      setError('Select an animal before recording a session.');
      return;
    }
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter a positive milk quantity in litres.');
      return;
    }
    setMessage('Draft validated locally. No production record was saved in this prototype.');
  };

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Milk production</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Production entry</span>
        </nav>

        <header className="rounded-xl bg-[#f0eee8] p-6">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
            Milk Production Entry
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[#444840]">
            Session recording for individual animals. Bulk sales, dispatch, payments and stock
            corrections are excluded from this role.
          </p>
        </header>

        <section className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <LockKeyhole size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <div>
            <h2 className="font-heading text-sm font-bold text-[#1b1c18]">Operational boundary</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Supervisors may record raw yield and quality classification. Financial and enterprise
              functions are not available, and no automatic stock deduction or variance alert is
              implemented.
            </p>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Session date', value: 'Sample date' },
            { label: 'Recorded tally', value: '142 / 184' },
            { label: 'Session volume', value: '2,180.5 L' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <CalendarDays size={14} aria-hidden="true" /> {item.label}
              </p>
              <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">Illustrative</p>
            </div>
          ))}
        </section>

        <form
          onSubmit={submit}
          noValidate
          className="space-y-5 rounded-xl border border-[#c4c8bd] bg-white p-6"
        >
          <div>
            <p className="text-sm font-semibold">Session</p>
            <div className="mt-2 flex gap-2" role="group" aria-label="Milking session">
              {(['Morning', 'Evening'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={session === item}
                  onClick={() => setSession(item)}
                  className={`h-11 rounded-xl px-4 text-sm font-semibold ${session === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
                >
                  {item} session
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="production-animal" className="text-sm font-semibold">
              Animal selection
            </label>
            <div className="relative">
              <Search
                size={17}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                id="production-animal"
                type="text"
                list="animal-options"
                value={animal}
                onChange={(event) => setAnimal(event.target.value)}
                placeholder="Search by ear tag or animal ID"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-10 pr-3 text-sm ${focusRing}`}
              />
              <datalist id="animal-options">
                {ANIMALS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label} · {item.group}
                  </option>
                ))}
              </datalist>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-7">
              <label htmlFor="litres" className="block text-sm font-semibold">
                Milk quantity (litres)
              </label>
              <input
                id="litres"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={litres}
                onChange={(event) => setLitres(event.target.value)}
                placeholder="0.0"
                aria-describedby={error ? 'production-error' : undefined}
                className={`h-14 w-full rounded-xl border border-[#c4c8bd] bg-[#f0eee8] px-4 text-center font-heading text-3xl font-bold text-[#2f4126] ${focusRing}`}
              />
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => adjust(-0.5)}
                  className={`h-11 rounded-lg bg-[#f0eee8] text-sm font-semibold ${focusRing}`}
                >
                  <Minus size={14} aria-hidden="true" className="mr-1 inline" />
                  0.5 L
                </button>
                <button
                  type="button"
                  onClick={() => adjust(0.5)}
                  className={`h-11 rounded-lg bg-[#f0eee8] text-sm font-semibold ${focusRing}`}
                >
                  <Plus size={14} aria-hidden="true" className="mr-1 inline" />
                  0.5 L
                </button>
                <button
                  type="button"
                  onClick={() => adjust(1)}
                  className={`h-11 rounded-lg bg-[#f0eee8] text-sm font-semibold ${focusRing}`}
                >
                  <Plus size={14} aria-hidden="true" className="mr-1 inline" />
                  1.0 L
                </button>
              </div>
            </div>

            <fieldset className="space-y-2 lg:col-span-5">
              <legend className="text-sm font-semibold">Milk quality category</legend>
              {['Good', 'Average', 'Poor'].map((item) => (
                <label key={item} className="flex items-start gap-3 rounded-lg bg-[#f0eee8] p-3">
                  <input
                    type="radio"
                    name="quality"
                    value={item}
                    checked={quality === item}
                    onChange={() => setQuality(item)}
                    className={`mt-1 accent-[#2f4126] ${focusRing}`}
                  />
                  <span>
                    <strong className="block text-sm text-[#1b1c18]">{item}</strong>
                    <span className="text-xs text-[#444840]">Recorded observation category</span>
                  </span>
                </label>
              ))}
            </fieldset>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="production-notes" className="text-sm font-semibold">
              Session notes (optional)
            </label>
            <input
              id="production-notes"
              type="text"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Routine observation about this session"
              className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
            />
          </div>

          {error ? (
            <p id="production-error" role="alert" className="text-sm font-semibold text-[#ba1a1a]">
              {error}
            </p>
          ) : null}
          {message ? (
            <p role="status" className="text-sm text-[#46583b]">
              {message}
            </p>
          ) : null}

          <div className="flex flex-wrap justify-end gap-2 border-t border-[#f0eee8] pt-4">
            <button
              type="button"
              onClick={() => {
                setAnimal('');
                setLitres('');
                setNotes('');
                setQuality('Good');
                setError('');
                setMessage('');
              }}
              className={`h-11 rounded-lg border border-[#c4c8bd] px-5 text-sm font-semibold ${focusRing}`}
            >
              Clear
            </button>
            <button
              type="submit"
              className={`inline-flex h-11 items-center gap-2 rounded-lg bg-[#46583b] px-5 text-sm font-semibold text-white ${focusRing}`}
            >
              <CheckCircle2 size={17} aria-hidden="true" /> Validate Production Entry
            </button>
          </div>
        </form>

        <section className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm leading-relaxed text-[#444840]">
            Variance and drop-detection rules are pending approval. This prototype does not
            calculate a three-day average, a percentage drop or an automatic alert.
          </p>
        </section>

        <section className="space-y-3 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                Recent session ledger
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Sample entries for this shift · illustrative
              </p>
            </div>
            <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-xs text-[#444840]">
              No export available
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Animal
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Session
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Yield
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Quality
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {LEDGER.map((row, index) => (
                  <tr key={`${row.animal}-${index}`}>
                    <td className="px-3 py-3 font-semibold text-[#1b1c18]">{row.animal}</td>
                    <td className="flex items-center gap-2 px-3 py-3">
                      <Droplets size={14} aria-hidden="true" className="text-[#46583b]" />{' '}
                      {row.session}
                    </td>
                    <td className="px-3 py-3 font-mono font-semibold">{row.yield}</td>
                    <td className="px-3 py-3">{row.quality}</td>
                    <td className="px-3 py-3 text-[#444840]">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
