import { useState } from 'react';
import {
  Check,
  ChevronRight,
  ClipboardList,
  Droplets,
  Info,
  Search,
  Sun,
  Moon,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const recent = [
  {
    time: 'Sample time',
    animal: 'Animal A',
    tag: 'TAG-A-01',
    session: 'Morning',
    quantity: '14.85 L',
    quality: 'Good',
  },
  {
    time: 'Sample time',
    animal: 'Animal B',
    tag: 'TAG-A-02',
    session: 'Morning',
    quantity: '12.40 L',
    quality: 'Good',
  },
  {
    time: 'Sample time',
    animal: 'Animal D',
    tag: 'TAG-A-04',
    session: 'Morning',
    quantity: '15.10 L',
    quality: 'Average',
  },
  {
    time: 'Sample time',
    animal: 'Animal F',
    tag: 'TAG-A-06',
    session: 'Morning',
    quantity: '11.25 L',
    quality: 'Good',
  },
  {
    time: 'Sample time',
    animal: 'Animal C',
    tag: 'TAG-A-03',
    session: 'Morning',
    quantity: '0.00 L',
    quality: 'Poor',
  },
] as const;

const qualityTone: Record<(typeof recent)[number]['quality'], string> = {
  Good: 'bg-[#d9e8c7] text-[#2f4126]',
  Average: 'bg-[#ffdcc6] text-[#7a461c]',
  Poor: 'bg-[#ffdad6] text-[#ba1a1a]',
};

export function ProductionEntry() {
  const [date, setDate] = useState('');
  const [session, setSession] = useState<'morning' | 'evening'>('morning');
  const [animal, setAnimal] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quality, setQuality] = useState('good');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const submit = () => {
    if (!date.trim() || !animal.trim() || !quantity.trim()) {
      setError('Production date, animal and quantity are required. This is local validation only.');
      setStatus('');
      return;
    }
    if (Number.isNaN(Number(quantity)) || Number(quantity) < 0) {
      setError('Quantity must be a non-negative number in litres.');
      setStatus('');
      return;
    }
    setError('');
    setStatus('Local entry validated. No production record is saved and no total is recalculated.');
  };

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#c4c8bd] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Dashboard</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Milk production</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Production entry</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#2f4126] sm:text-3xl">
                Milk Production Entry
              </h1>
              <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-[11px] font-bold uppercase text-[#2f4126]">
                Illustrative
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Manual per-animal session intake form. All values are illustrative; no entry is saved
              and no production total is computed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus('Session history is not wired in this prototype.')}
            className={`rounded-lg bg-[#f0eee8] px-3.5 py-2 text-sm font-semibold ${focus}`}
          >
            Session log history
          </button>
        </header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3">
              <div>
                <h2 className="font-heading text-base font-bold">Record session milk production</h2>
                <p className="mt-0.5 text-xs text-[#444840]">
                  Manual entry · date, session, animal, quantity and quality.
                </p>
              </div>
              <span className="rounded bg-[#eae8e2] px-2 py-0.5 text-[11px] font-semibold text-[#444840]">
                Local draft
              </span>
            </div>
            <form
              className="flex flex-col gap-4 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
              noValidate
            >
              <div>
                <label htmlFor="production-date" className="mb-1 block text-sm font-semibold">
                  Production date <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="production-date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  placeholder="Sample date"
                  className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2.5 text-sm ${focus}`}
                />
                <p className="mt-1 text-xs text-[#444840]">
                  Select the date for the illustrative intake log.
                </p>
              </div>

              <fieldset>
                <legend className="mb-1 text-sm font-semibold">
                  Session selection <span className="text-[#ba1a1a]">*</span>
                </legend>
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#f0eee8] p-1">
                  {[
                    ['morning', 'Morning session', <Sun key="sun" aria-hidden="true" size={15} />],
                    [
                      'evening',
                      'Evening session',
                      <Moon key="moon" aria-hidden="true" size={15} />,
                    ],
                  ].map(([value, label, icon]) => (
                    <label
                      key={value as string}
                      className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold ${session === value ? 'bg-white text-[#2f4126] shadow-sm' : 'text-[#444840]'}`}
                    >
                      <input
                        type="radio"
                        name="session"
                        value={value as string}
                        checked={session === value}
                        onChange={() => setSession(value as 'morning' | 'evening')}
                        className="sr-only"
                      />
                      {icon} {label as string}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="production-animal" className="mb-1 block text-sm font-semibold">
                  Search / select animal <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <Search
                    aria-hidden="true"
                    size={16}
                    className="absolute left-3 top-2.5 text-[#444840]"
                  />
                  <input
                    id="production-animal"
                    value={animal}
                    onChange={(event) => setAnimal(event.target.value)}
                    placeholder="Search by tag, name or pen"
                    className={`w-full rounded-lg bg-[#f0eee8] py-2.5 pl-9 pr-3 text-sm ${focus}`}
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#f5f3ed] p-3">
                  <div>
                    <p className="font-heading text-sm font-bold">Animal A</p>
                    <p className="font-mono text-xs text-[#444840]">TAG-A-01 · Pen 04</p>
                    <p className="text-xs text-[#444840]">
                      Breed and lactation stage: illustrative
                    </p>
                  </div>
                  <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-[11px] font-semibold text-[#2f4126]">
                    Matched
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="production-quantity" className="mb-1 block text-sm font-semibold">
                  Milk quantity (litres) <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <input
                    id="production-quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    inputMode="decimal"
                    placeholder="0.00"
                    className={`w-full rounded-lg bg-[#f0eee8] px-4 py-3 pr-20 text-xl font-bold text-[#2f4126] ${focus}`}
                  />
                  <span className="absolute right-4 top-3 font-heading text-sm font-bold text-[#444840]">
                    Litres
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#444840]">
                  Volumetric yield in litres; no conversion or total is applied.
                </p>
              </div>

              <fieldset>
                <legend className="mb-1 text-sm font-semibold">
                  Milk quality <span className="text-[#ba1a1a]">*</span>
                </legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    ['good', 'Good', 'Normal visual check', 'bg-[#d9e8c7] text-[#2f4126]'],
                    ['average', 'Average', 'Routine review', 'bg-[#ffdcc6] text-[#7a461c]'],
                    ['poor', 'Poor', 'Flagged / withheld', 'bg-[#ffdad6] text-[#ba1a1a]'],
                  ].map(([value, label, detail, colour]) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer flex-col rounded-xl border-2 p-3 ${quality === value ? 'border-[#46583b]' : 'border-transparent'} bg-[#f5f3ed]`}
                    >
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <input
                          type="radio"
                          name="quality"
                          value={value}
                          checked={quality === value}
                          onChange={() => setQuality(value)}
                          className={`h-4 w-4 accent-[#2f4126] ${focus}`}
                        />
                        {label}
                      </span>
                      <span className="mt-1 text-xs text-[#444840]">{detail}</span>
                      <span
                        className={`mt-2 w-fit rounded px-2 py-0.5 text-[10px] font-bold uppercase ${colour}`}
                      >
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="production-notes" className="mb-1 block text-sm font-semibold">
                  Session observational notes (optional)
                </label>
                <textarea
                  id="production-notes"
                  maxLength={250}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  className={`w-full rounded-lg bg-[#f0eee8] p-3 text-sm ${focus}`}
                  placeholder="Local draft notes"
                />
                <p className="mt-1 text-xs text-[#444840]">
                  Max 250 characters · {notes.length}/250
                </p>
              </div>

              {error ? (
                <p
                  role="alert"
                  className="rounded-lg bg-[#ffdad6] p-3 text-sm font-semibold text-[#ba1a1a]"
                >
                  {error}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2 border-t border-[#c4c8bd] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setDate('');
                    setAnimal('');
                    setQuantity('');
                    setNotes('');
                    setError('');
                    setStatus('Draft cleared locally.');
                  }}
                  className={`flex-1 rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-semibold ${focus}`}
                >
                  Cancel / clear
                </button>
                <button
                  type="submit"
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#46583b] px-4 py-2.5 text-sm font-bold text-white ${focus}`}
                >
                  <Check aria-hidden="true" size={15} /> Save production entry locally
                </button>
              </div>
              {status ? (
                <p
                  role="status"
                  className="flex items-center gap-1.5 rounded-lg bg-[#d9e8c7] p-3 text-sm text-[#2f4126]"
                >
                  <Info aria-hidden="true" size={14} /> {status}
                </p>
              ) : null}
            </form>
          </section>

          <aside className="flex flex-col gap-4">
            <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-sm font-bold">Animal identification summary</h2>
                <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-[10px] font-bold uppercase text-[#2f4126]">
                  Peak lactation
                </span>
              </div>
              <p className="mt-3 font-heading text-base font-bold">Animal A</p>
              <p className="font-mono text-xs text-[#444840]">TAG-A-01</p>
              <dl className="mt-3 flex flex-col gap-1 text-xs">
                {[
                  ['Breed', 'Illustrative breed'],
                  ['Housing pen', 'Pen 04'],
                  ['Lactation state', 'Peak (illustrative)'],
                  ['Days in milk', 'Illustrative value'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-[#eae8e2] py-1.5"
                  >
                    <dt className="text-[#444840]">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4 shadow-sm">
              <h2 className="flex items-center gap-1.5 font-heading text-sm font-bold text-[#2f4126]">
                <ClipboardList aria-hidden="true" size={16} /> Intake protocol instructions
              </h2>
              <p className="mt-2 text-xs text-[#444840]">
                Verify the animal tag before entering litres. Select the active session and visual
                quality grade. No value is saved as financial truth.
              </p>
              <p className="mt-2 text-[11px] text-[#444840]">
                Manual entry protocol · illustrative
              </p>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] p-3">
                <h2 className="font-heading text-sm font-bold">Recent production entries</h2>
                <span className="text-xs text-[#444840]">Operator: illustrative</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left text-xs">
                  <thead className="bg-[#f0eee8] text-[10px] font-semibold uppercase tracking-wider text-[#444840]">
                    <tr>
                      {['Time', 'Animal', 'Session', 'Quantity', 'Quality'].map((heading) => (
                        <th key={heading} scope="col" className="px-3 py-2">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eae8e2]">
                    {recent.map((item) => (
                      <tr key={item.tag}>
                        <td className="px-3 py-2 font-mono text-[11px] text-[#444840]">
                          {item.time}
                        </td>
                        <td className="px-3 py-2">
                          <p className="font-semibold">{item.animal}</p>
                          <p className="font-mono text-[10px] text-[#444840]">{item.tag}</p>
                        </td>
                        <td className="flex items-center gap-1 px-3 py-2">
                          <Droplets aria-hidden="true" size={12} /> {item.session}
                        </td>
                        <td
                          className={`px-3 py-2 font-semibold ${item.quantity === '0.00 L' ? 'text-[#ba1a1a]' : 'text-[#2f4126]'}`}
                        >
                          {item.quantity}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded-full px-2 py-0.5 font-semibold ${qualityTone[item.quality]}`}
                          >
                            {item.quality}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between bg-[#f5f3ed] px-3 py-2 text-[11px] text-[#444840]">
                <span>Showing {recent.length} illustrative entries</span>
                <span>Workspace WS-001</span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
