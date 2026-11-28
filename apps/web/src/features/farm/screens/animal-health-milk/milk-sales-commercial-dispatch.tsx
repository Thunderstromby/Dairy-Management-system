import { useState } from 'react';
import { ChevronRight, Download, Info, Lock, Plus, ReceiptText, Truck } from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const sales = [
  {
    id: 'SLS-0001',
    date: 'Sample date',
    customer: 'Customer A',
    quantity: '18,200 L',
    status: 'Ledger note',
  },
  {
    id: 'SLS-0002',
    date: 'Sample date',
    customer: 'Customer B',
    quantity: '8,500 L',
    status: 'Ledger note',
  },
  {
    id: 'SLS-0003',
    date: 'Sample date',
    customer: 'Customer C',
    quantity: '6,200 L',
    status: 'Ledger note',
  },
  {
    id: 'SLS-0004',
    date: 'Sample date',
    customer: 'Customer A',
    quantity: '24,100 L',
    status: 'Ledger note',
  },
] as const;

export function MilkSalesCommercialDispatch() {
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const visible = sales.filter((item) =>
    `${item.id} ${item.customer}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Operations</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Milk management</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Milk sales & commercial dispatch</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Milk Sales & Commercial Orders
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Dispatch ledger preview. Prices, amounts, payment status and stock-deduction
              automation are not reproduced in this visual prototype.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotice('Export is not wired in this prototype.')}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#f0eee8] px-3.5 py-2 text-sm font-semibold ${focus}`}
            >
              <Download aria-hidden="true" size={14} /> Export register
            </button>
            <button
              type="button"
              aria-expanded={formOpen}
              onClick={() => setFormOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
            >
              <Plus aria-hidden="true" size={14} /> Record milk sale
            </button>
          </div>
        </header>

        <div className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Lock aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Financial details restricted</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Sales value, unit price, payment method, paid/unpaid status and invoice figures are
              financial information. They are omitted here even though the underlying screen is a
              Farm Admin surface; no automatic stock deduction is applied.
            </p>
          </div>
        </div>
        {notice ? (
          <p role="status" className="rounded-lg bg-[#f5f3ed] p-3 text-sm text-[#444840]">
            {notice}
          </p>
        ) : null}

        <section
          aria-label="Sales summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <div className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              Total volume sold (illustrative)
            </p>
            <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">126,500 L</p>
            <p className="mt-1 text-xs text-[#444840]">Sample dispatch volume</p>
            <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
              Illustrative
            </span>
          </div>
          {[
            ['Sales value', 'Not shown', 'Financial data omitted'],
            ['Configured default price', 'Not shown', 'Currency is farm-configured'],
            ['Payment status summary', 'Not shown', 'Payment controls omitted'],
          ].map(([label, value, note]) => (
            <div
              key={label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {label}
              </p>
              <p className="mt-2 font-heading text-lg font-bold text-[#444840]">{value}</p>
              <p className="mt-1 text-xs text-[#444840]">{note}</p>
            </div>
          ))}
        </section>

        {formOpen ? (
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Record milk sale</h2>
            <p className="mt-1 text-xs text-[#444840]">
              Local form preview; nothing is saved or deducted.
            </p>
            <form
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice('Local draft validated. No sale is recorded and no stock is changed.');
              }}
            >
              {[
                'Sale date',
                'Milk quantity (litres)',
                'Customer / processor',
                'Order reference',
              ].map((label) => (
                <div key={label}>
                  <label
                    htmlFor={`sale-${label}`}
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                  >
                    {label} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    id={`sale-${label}`}
                    className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                    placeholder="Illustrative value"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label
                  htmlFor="sale-notes"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                >
                  Notes
                </label>
                <textarea
                  id="sale-notes"
                  rows={2}
                  className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] p-3 text-sm ${focus}`}
                  placeholder="Local notes only"
                />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <button
                  type="submit"
                  className={`rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  Validate locally
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className={`rounded-lg bg-[#f0eee8] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Close
                </button>
              </div>
            </form>
            {notice ? (
              <p role="status" className="mt-3 rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]">
                {notice}
              </p>
            ) : null}
          </section>
        ) : null}

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-base font-bold">Milk sales ledger</h2>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#444840]">
                Sample period
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <label htmlFor="sales-search" className="sr-only">
                Search sales
              </label>
              <input
                id="sales-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sale ID or customer"
                className={`rounded-lg bg-white px-3 py-2 text-sm ${focus}`}
              />
              <select
                aria-label="Status filter"
                className={`rounded-lg bg-white px-3 py-2 text-sm ${focus}`}
              >
                <option>All records</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Sale ID',
                    'Sale date',
                    'Customer',
                    'Quantity',
                    'Price / amount',
                    'Payment',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((row) => (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-[#2f4126]">
                      {row.id}
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.date}</td>
                    <td className="px-3 py-3 font-semibold">{row.customer}</td>
                    <td className="px-3 py-3 font-heading text-sm font-bold text-[#2f4126]">
                      {row.quantity}
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">Financial details omitted</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#eae8e2] px-2.5 py-1 text-xs font-semibold text-[#444840]">
                        <Info aria-hidden="true" size={12} /> {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <ReceiptText aria-hidden="true" size={28} className="mx-auto text-[#444840]" />
                <p className="mt-2 font-heading text-sm font-bold">No sales match the search</p>
                <p className="mt-1 text-xs text-[#444840]">
                  Adjust the search to see illustrative entries.
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {visible.length} illustrative dispatch records</span>
            <span className="flex items-center gap-1">
              <Truck aria-hidden="true" size={13} /> No stock deduction performed
            </span>
          </div>
        </section>

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Lock aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Sale record details — restricted</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Sale detail panels containing unit price, invoice totals, payment state and storage
              deduction audit trails are omitted. No certification or traceability claim is made.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
