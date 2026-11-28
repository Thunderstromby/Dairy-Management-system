import { useState } from 'react';
import {
  ChevronRight,
  ClipboardList,
  Download,
  Eye,
  Info,
  Plus,
  Printer,
  Search,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const collections = [
  {
    id: 'COL-0001',
    date: 'Sample date',
    time: 'Sample time',
    session: 'Evening shift',
    quantity: '5,850.00 L',
    source: 'Rotary parlor (illustrative)',
    quality: 'Good',
    by: 'Staff role',
  },
  {
    id: 'COL-0002',
    date: 'Sample date',
    time: 'Sample time',
    session: 'Evening shift',
    quantity: '5,600.00 L',
    source: 'Milking parlor 01 (illustrative)',
    quality: 'Good',
    by: 'Staff role',
  },
  {
    id: 'COL-0003',
    date: 'Sample date',
    time: 'Sample time',
    session: 'Morning shift',
    quantity: '6,720.00 L',
    source: 'Rotary parlor (illustrative)',
    quality: 'Good',
    by: 'Staff role',
  },
  {
    id: 'COL-0004',
    date: 'Sample date',
    time: 'Sample time',
    session: 'Morning shift',
    quantity: '6,480.00 L',
    source: 'Milking parlor 01 (illustrative)',
    quality: 'Good',
    by: 'Staff role',
  },
  {
    id: 'COL-0005',
    date: 'Sample date',
    time: 'Sample time',
    session: 'Other',
    quantity: '1,200.00 L',
    source: 'Parlor 02 (illustrative)',
    quality: 'Average',
    by: 'Staff role',
  },
] as const;

const qualityTone: Record<(typeof collections)[number]['quality'], string> = {
  Good: 'bg-[#d9e8c7] text-[#2f4126]',
  Average: 'bg-[#ffdcc6] text-[#7a461c]',
};

export function MilkCollectionIntakeLog() {
  const [query, setQuery] = useState('');
  const [session, setSession] = useState('all');
  const [quality, setQuality] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [detail, setDetail] = useState<(typeof collections)[number] | null>(null);
  const [notice, setNotice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [formSession, setFormSession] = useState('evening');
  const [formQuality, setFormQuality] = useState('good');

  const visible = collections.filter((item) => {
    const matchesQuery = `${item.id} ${item.source}`.toLowerCase().includes(query.toLowerCase());
    const matchesSession = session === 'all' || item.session.toLowerCase().includes(session);
    const matchesQuality = quality === 'all' || item.quality === quality;
    return matchesQuery && matchesSession && matchesQuality;
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Milk management</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Collection & intake log</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-[#2f4126] sm:text-3xl">
              Milk Collection & Intake Log
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Manual batch ledger preview. All quantities and batches are illustrative; no
              collection record is saved and no stock balance changes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotice('Print is not wired in this prototype.')}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold shadow-sm ${focus}`}
            >
              <Printer aria-hidden="true" size={14} /> Print shift sheet
            </button>
            <button
              type="button"
              onClick={() => setNotice('Export is not wired in this prototype.')}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold shadow-sm ${focus}`}
            >
              <Download aria-hidden="true" size={14} /> Export CSV
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#46583b] px-4 py-2 text-sm font-semibold text-white ${focus}`}
            >
              <Plus aria-hidden="true" size={14} /> Record milk collection
            </button>
          </div>
        </header>

        <section
          aria-label="Collection summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: "Today's recorded collection",
              value: '24,650.0 L',
              note: 'Illustrative total',
            },
            { label: 'Morning shift total', value: '13,200.0 L', note: 'Illustrative shift value' },
            { label: 'Evening shift total', value: '11,450.0 L', note: 'Illustrative shift value' },
            { label: 'Batches recorded', value: '5', note: 'Illustrative batch count' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {item.label}
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <Search
                aria-hidden="true"
                size={16}
                className="absolute left-3 top-2.5 text-[#444840]"
              />
              <label htmlFor="collection-search" className="sr-only">
                Search collections
              </label>
              <input
                id="collection-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search collection ID or parlor"
                className={`w-full rounded-lg bg-[#f0eee8] py-2 pl-9 pr-3 text-sm ${focus}`}
              />
            </div>
            <div>
              <label
                htmlFor="collection-session"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Milking session
              </label>
              <select
                id="collection-session"
                value={session}
                onChange={(event) => setSession(event.target.value)}
                className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All sessions</option>
                <option value="morning">Morning shift</option>
                <option value="evening">Evening shift</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="collection-quality"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Quality grade
              </label>
              <select
                id="collection-quality"
                value={quality}
                onChange={(event) => setQuality(event.target.value)}
                className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All grades</option>
                <option>Good</option>
                <option>Average</option>
              </select>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-[#444840]">
            <ClipboardList aria-hidden="true" size={13} /> Showing {visible.length} illustrative
            batches
          </p>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Collection ID',
                    'Date & time',
                    'Session',
                    'Quantity (L)',
                    'Source / parlor',
                    'Quality',
                    'Recorded by',
                    'Action',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-[#2f4126]">
                      {item.id}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-medium">{item.date}</p>
                      <p className="text-xs text-[#444840]">{item.time}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.session === 'Evening shift' ? 'bg-[#ffdcc6] text-[#7a461c]' : item.session === 'Morning shift' ? 'bg-[#d4e9c3] text-[#3a4c30]' : 'bg-[#f0eee8] text-[#444840]'}`}
                      >
                        {item.session}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-heading text-sm font-bold text-[#2f4126]">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm">{item.source}</p>
                      <p className="text-xs text-[#444840]">Illustrative note</p>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${qualityTone[item.quality]}`}
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />{' '}
                        {item.quality}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.by}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setDetail(item)}
                        aria-label={`View details for ${item.id}`}
                        className={`rounded-lg bg-[#f0eee8] px-2.5 py-1 text-xs font-semibold text-[#2f4126] ${focus}`}
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <ClipboardList aria-hidden="true" size={30} className="text-[#444840]" />
                <h2 className="font-heading text-base font-bold">No milk collections recorded</h2>
                <p className="max-w-md text-sm text-[#444840]">
                  No illustrative batch matches the selected session or quality filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSession('all');
                    setQuality('all');
                  }}
                  className={`rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Clear filters
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>
              Showing {visible.length} of {collections.length} illustrative batches
            </span>
            <div className="flex gap-1">
              <button type="button" disabled className="rounded bg-[#eae8e2] px-2 py-1 opacity-60">
                Previous
              </button>
              <button
                type="button"
                aria-current="page"
                className={`rounded bg-[#46583b] px-2 py-1 font-semibold text-white ${focus}`}
              >
                1
              </button>
              <button type="button" disabled className="rounded bg-[#eae8e2] px-2 py-1 opacity-60">
                Next
              </button>
            </div>
          </div>
        </section>

        {detail ? (
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${qualityTone[detail.quality]}`}
                >
                  {detail.quality}
                </span>
                <h2 className="mt-2 font-heading text-lg font-bold">Collection record details</h2>
                <p className="text-xs text-[#444840]">{detail.id} · illustrative voucher</p>
              </div>
              <button
                type="button"
                onClick={() => setDetail(null)}
                className={`rounded-lg bg-[#f0eee8] px-3 py-2 text-sm font-semibold ${focus}`}
              >
                Close
              </button>
            </div>
            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                ['Recorded quantity', detail.quantity],
                ['Milking session', detail.session],
                ['Receipt timestamp', `${detail.date} · ${detail.time}`],
                ['Quality grade', detail.quality],
                ['Source / parlor', detail.source],
                ['Recorded by', detail.by],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#f5f3ed] p-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-[#444840]">
                    {label}
                  </dt>
                  <dd className="mt-0.5 font-heading text-sm font-bold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-[#444840]">
              <Eye aria-hidden="true" size={13} className="mr-1 inline" /> Printing receipts and
              download links are not wired.
            </p>
          </section>
        ) : null}

        {formOpen ? (
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-bold">Record milk collection</h2>
            <p className="mt-1 text-xs text-[#444840]">Manual intake draft · nothing is saved.</p>
            <form
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (!quantity.trim() || Number.isNaN(Number(quantity)) || Number(quantity) <= 0) {
                  setError('Collection quantity must be a positive number in litres.');
                  return;
                }
                setError('');
                setNotice(
                  'Local entry validated. No collection is recorded and no stock is changed.',
                );
              }}
            >
              {['Collection date', 'Collection time', 'Source / parlor', 'Operator'].map(
                (label) => (
                  <div key={label}>
                    <label
                      htmlFor={`col-${label}`}
                      className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                    >
                      {label} <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      id={`col-${label}`}
                      className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                      placeholder="Illustrative value"
                    />
                  </div>
                ),
              )}
              <div>
                <label
                  htmlFor="col-quantity"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                >
                  Quantity (L) <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="col-quantity"
                  value={quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                    setError('');
                  }}
                  inputMode="decimal"
                  className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                  placeholder="0.00"
                />
              </div>
              <fieldset>
                <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#444840]">
                  Milking session
                </legend>
                <div className="flex flex-wrap gap-2">
                  {['morning', 'evening', 'other'].map((value) => (
                    <label
                      key={value}
                      className={`flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold capitalize ${formSession === value ? 'bg-[#d9e8c7] text-[#2f4126]' : 'bg-[#f0eee8] text-[#444840]'}`}
                    >
                      <input
                        type="radio"
                        name="collection-session-form"
                        value={value}
                        checked={formSession === value}
                        onChange={() => setFormSession(value)}
                        className="sr-only"
                      />{' '}
                      {value}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#444840]">
                  Quality grade
                </legend>
                <div className="flex flex-wrap gap-2">
                  {['good', 'average', 'poor'].map((value) => (
                    <label
                      key={value}
                      className={`flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold capitalize ${formQuality === value ? 'bg-[#d9e8c7] text-[#2f4126]' : 'bg-[#f0eee8] text-[#444840]'}`}
                    >
                      <input
                        type="radio"
                        name="collection-quality-form"
                        value={value}
                        checked={formQuality === value}
                        onChange={() => setFormQuality(value)}
                        className="sr-only"
                      />{' '}
                      {value}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label
                  htmlFor="col-notes"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                >
                  Collection notes
                </label>
                <textarea
                  id="col-notes"
                  rows={2}
                  className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] p-3 text-sm ${focus}`}
                  placeholder="Local notes only"
                />
              </div>
              {error ? (
                <p
                  role="alert"
                  className="sm:col-span-2 rounded-lg bg-[#ffdad6] p-3 text-sm font-semibold text-[#ba1a1a]"
                >
                  {error}
                </p>
              ) : null}
              <div className="flex gap-2 sm:col-span-2">
                <button
                  type="submit"
                  className={`rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  Save collection locally
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false);
                    setError('');
                  }}
                  className={`rounded-lg bg-[#f0eee8] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Cancel
                </button>
              </div>
            </form>
            {notice ? (
              <p
                role="status"
                className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]"
              >
                <Info aria-hidden="true" size={14} /> {notice}
              </p>
            ) : null}
          </section>
        ) : null}

        <footer className="flex flex-wrap gap-2 text-[11px] text-[#444840]">
          <span>SmartFarm dairy management · visual prototype</span>
          <span>·</span>
          <span>Illustrative records only · no production data</span>
        </footer>
      </div>
    </div>
  );
}
