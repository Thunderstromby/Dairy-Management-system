import { useState, type FormEvent } from 'react';
import { Info, LockKeyhole, PackageOpen, Search, ShieldCheck } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const ITEMS = [
  { code: 'F-102', name: 'Feed item A', category: 'Feed', location: 'Feed store A', unit: 'kg' },
  { code: 'F-204', name: 'Feed item B', category: 'Feed', location: 'Feed store B', unit: 'kg' },
  {
    code: 'S-101',
    name: 'Parlor supply A',
    category: 'Supplies',
    location: 'Parlor store',
    unit: 'units',
  },
  {
    code: 'S-204',
    name: 'Parlor supply B',
    category: 'Supplies',
    location: 'Parlor store',
    unit: 'units',
  },
] as const;

const PURPOSES = [
  'Feeding run',
  'Parlor sanitation',
  'Routine health check',
  'Nursery care',
] as const;

const LEDGER = [
  { time: 'Sample time', item: 'Feed item A', purpose: 'Feeding run', qty: '850.0 kg' },
  { time: 'Sample time', item: 'Feed item B', purpose: 'Feeding run', qty: '220.0 kg' },
  { time: 'Sample time', item: 'Parlor supply A', purpose: 'Parlor sanitation', qty: '12 units' },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/permitted_inventory_daily_usage_logging */
export function PermittedInventoryDailyUsageLoggingScreen() {
  const [item, setItem] = useState('F-102');
  const [purpose, setPurpose] = useState<string>('Feeding run');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const visibleItems = ITEMS.filter(
    (row) =>
      (category === 'all' || row.category === category) &&
      `${row.code} ${row.name} ${row.location}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    const value = Number.parseFloat(quantity);
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter a positive consumed quantity.');
      return;
    }
    setMessage('Draft validated locally. No stock balance was changed and no cost was recorded.');
  };

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Inventory</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Permitted field usage</span>
        </nav>

        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#556249]">
              Barn consumables &amp; daily allocation
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
              Permitted Field Inventory &amp; Daily Usage Logging
            </h1>
            <p className="max-w-3xl text-sm text-[#444840]">
              Field tracking of approved barn consumables and usage entries. Physical count
              overrides, unit costs, minimum thresholds and procurement are Farm Admin functions.
            </p>
          </div>
          <span className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#e4e2dd] px-4 text-sm font-semibold text-[#75786f]">
            <LockKeyhole size={16} aria-hidden="true" /> Print unavailable
          </span>
        </header>

        <section className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <ShieldCheck size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            <strong className="text-[#1b1c18]">Supervisor field access:</strong> usage entries are
            permitted. No cost centre posting, supplier procurement, stock correction or automatic
            deduction is represented in this prototype.
          </p>
        </section>

        <section
          aria-label="Inventory overview"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'Approved barn items', value: '34', note: 'Illustrative item count' },
            { label: 'Usage entries today', value: '8', note: 'Illustrative count' },
            { label: 'Items for attention', value: '2', note: 'Informational only' },
            { label: 'Admin procurement', value: '3', note: 'Read-only reference' },
          ].map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {card.label}
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.note}</p>
            </article>
          ))}
        </section>

        <form
          onSubmit={submit}
          noValidate
          className="space-y-5 rounded-xl border border-[#c4c8bd] bg-white p-5"
        >
          <div className="flex items-center gap-2">
            <PackageOpen size={20} aria-hidden="true" className="text-[#46583b]" />
            <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
              Record Daily Permitted Inventory Usage
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="inventory-item" className="text-sm font-semibold">
                Approved item
              </label>
              <select
                id="inventory-item"
                value={item}
                onChange={(event) => setItem(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                {ITEMS.map((row) => (
                  <option key={row.code} value={row.code}>
                    {row.code} · {row.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="usage-purpose" className="text-sm font-semibold">
                Allocation purpose
              </label>
              <select
                id="usage-purpose"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                {PURPOSES.map((row) => (
                  <option key={row}>{row}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="usage-qty" className="text-sm font-semibold">
                Quantity consumed
              </label>
              <input
                id="usage-qty"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="0.0"
                aria-describedby={error ? 'usage-error' : undefined}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="usage-notes" className="text-sm font-semibold">
              Operational notes (optional)
            </label>
            <input
              id="usage-notes"
              type="text"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Describe the field use"
              className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
            />
          </div>
          {error ? (
            <p id="usage-error" role="alert" className="text-sm font-semibold text-[#ba1a1a]">
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
                setQuantity('');
                setNotes('');
                setError('');
                setMessage('');
              }}
              className={`h-11 rounded-lg border border-[#c4c8bd] px-5 text-sm font-semibold ${focusRing}`}
            >
              Clear Entry
            </button>
            <button
              type="submit"
              className={`h-11 rounded-lg bg-[#46583b] px-5 text-sm font-semibold text-white ${focusRing}`}
            >
              Validate Daily Usage
            </button>
          </div>
        </form>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {['all', 'Feed', 'Supplies'].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${category === value ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
                >
                  {value === 'all' ? 'All items' : value}
                </button>
              ))}
            </div>
            <label className="relative w-full lg:max-w-xs">
              <span className="sr-only">Search approved items</span>
              <Search
                size={15}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search item, code or bay"
                className={`h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
              />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[660px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    SKU
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Storage
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {visibleItems.map((row) => (
                  <tr key={row.code}>
                    <td className="px-3 py-3 font-mono font-semibold text-[#2f4126]">{row.code}</td>
                    <td className="px-3 py-3 font-semibold text-[#1b1c18]">{row.name}</td>
                    <td className="px-3 py-3">{row.category}</td>
                    <td className="px-3 py-3 text-[#444840]">{row.location}</td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setItem(row.code)}
                        className={`rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold ${focusRing}`}
                      >
                        Select for usage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visibleItems.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#444840]">
                No approved item matches this filter.
              </p>
            ) : null}
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <h2 className="font-heading text-base font-bold text-[#1b1c18]">
            Today&apos;s usage ledger
          </h2>
          <p className="text-sm text-[#444840]">Sample entries · illustrative</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Purpose
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {LEDGER.map((row, index) => (
                  <tr key={`${row.item}-${index}`}>
                    <td className="px-3 py-3">{row.time}</td>
                    <td className="px-3 py-3">{row.item}</td>
                    <td className="px-3 py-3">{row.purpose}</td>
                    <td className="px-3 py-3 text-right font-mono">{row.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#f0eee8] p-3">
            <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
            <p className="text-xs text-[#444840]">
              No live sync indicator, cost posting or master-stock edit is present in this view.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
