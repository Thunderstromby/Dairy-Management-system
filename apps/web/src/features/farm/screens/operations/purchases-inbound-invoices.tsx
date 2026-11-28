import { useState } from 'react';
import {
  CalendarDays,
  Eye,
  FileDown,
  FileText,
  Filter,
  PackagePlus,
  ReceiptText,
  Search,
  TrendingUp,
  Wheat,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Field,
  FilterBar,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  Stat,
  TextField,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

const purchases = [
  {
    id: 'Illustrative',
    date: 'Illustrative',
    supplier: 'Supplier A',
    category: 'Feed',
    item: 'Feed item A',
    qty: 'Illustrative',
    cost: 'Illustrative',
    status: 'Paid',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    supplier: 'Supplier B',
    category: 'Medicines',
    item: 'Medicine item A',
    qty: 'Illustrative',
    cost: 'Illustrative',
    status: 'Pending',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    supplier: 'Supplier C',
    category: 'Other supplies',
    item: 'Other supply A',
    qty: 'Illustrative',
    cost: 'Illustrative',
    status: 'Paid',
  },
] as const;

export function PurchasesInboundInvoicesScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [payment, setPayment] = useState('All Payment Statuses');
  const [supplier, setSupplier] = useState('Supplier A');
  const [terms, setTerms] = useState('Paid');
  const [page, setPage] = useState(1);

  const visible = purchases.filter((row) => {
    const matches = row.supplier.toLowerCase().includes(search.trim().toLowerCase());
    return (
      matches &&
      (category === 'All Categories' || row.category === category) &&
      (payment === 'All Payment Statuses' || row.status === payment)
    );
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Operations & Assets / Inventory / Purchases & Inbound Invoices"
        title="Inventory Purchases & Inbound Invoices"
        description="Commercial supply acquisitions, supplier invoices and delivery receipt records. Illustrative entries only."
        badge="Farm Admin Access"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <CalendarDays size={16} aria-hidden="true" /> Purchase date
            </button>
            <button type="button" className={secondaryButtonClass}>
              <FileDown size={16} aria-hidden="true" /> Export ledger
            </button>
            <button type="button" className={primaryButtonClass}>
              <PackagePlus size={16} aria-hidden="true" /> Record purchase
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Farm-configured currency" variant="warning">
        Monetary values in the source export were fixed to one currency. This preview shows
        &ldquo;Illustrative&rdquo; instead of amounts; no conversion or invoice total is calculated.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Recorded purchases"
          value="Illustrative"
          icon={<ReceiptText size={20} />}
          hint="Illustrative count"
        />
        <Stat
          label="Feed share"
          value="Illustrative"
          icon={<Wheat size={20} />}
          hint="Illustrative allocation bar — no computation"
        />
        <Stat
          label="Medicine share"
          value="Illustrative"
          tone="tertiary"
          icon={<TrendingUp size={20} />}
          hint="Illustrative allocation bar"
        />
        <Stat
          label="Other supplies"
          value="Illustrative"
          icon={<Filter size={20} />}
          hint="Illustrative allocation bar"
        />
      </div>

      <Card
        title="Record New Inventory Purchase"
        subtitle="Illustrative entry form — nothing is submitted"
      >
        <form
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field label="Supplier / vendor" htmlFor="purchase-supplier" required>
            <select
              id="purchase-supplier"
              className={selectClass}
              value={supplier}
              onChange={(event) => setSupplier(event.target.value)}
            >
              {['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E'].map(
                (option) => (
                  <option key={option}>{option}</option>
                ),
              )}
            </select>
          </Field>
          <TextField
            id="purchase-date"
            label="Purchase / invoice date"
            type="date"
            value=""
            onChange={() => undefined}
            required
          />
          <TextField
            id="purchase-ref"
            label="Invoice reference"
            value=""
            onChange={() => undefined}
            placeholder="Illustrative reference"
            required
          />
          <Field label="Category" htmlFor="purchase-category" required>
            <select
              id="purchase-category"
              className={selectClass}
              value={category === 'All Categories' ? 'Feed' : category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {['Feed', 'Medicines', 'Other supplies'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <TextField
            id="purchase-item"
            label="Item selection"
            value="Feed item A"
            onChange={() => undefined}
            required
          />
          <div className="grid grid-cols-[1fr_6rem] gap-2">
            <TextField
              id="purchase-qty"
              label="Quantity"
              type="number"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative"
              required
            />
            <Field label="Unit" htmlFor="purchase-unit">
              <select id="purchase-unit" className={selectClass} defaultValue="kg">
                {['kg', 'T', 'Litres', 'vials', 'units'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>
          <TextField
            id="purchase-amount"
            label="Total invoice amount"
            value=""
            onChange={() => undefined}
            placeholder="Illustrative"
            required
          />
          <fieldset className="sm:col-span-2">
            <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#444840]">
              Payment & terms status
            </legend>
            <div className="flex gap-4">
              {['Paid', 'Unpaid'].map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 font-inter text-sm text-[#1b1c18]"
                >
                  <input
                    type="radio"
                    name="purchase-terms"
                    value={option}
                    checked={terms === option}
                    onChange={() => setTerms(option)}
                    className="h-4 w-4 accent-[#2f4126]"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
          <Field label="Receiving notes" htmlFor="purchase-notes">
            <textarea
              id="purchase-notes"
              rows={3}
              className={inputClass + ' h-auto py-2'}
              placeholder="Illustrative receiving note"
            />
          </Field>
          <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-3">
            <button type="button" className={secondaryButtonClass}>
              Clear fields
            </button>
            <button type="submit" className={primaryButtonClass}>
              Save purchase (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-8">
        <Card
          title="Purchases & Receiving Ledger"
          subtitle="Illustrative records — no invoice amounts are computed"
        >
          <FilterBar>
            <div className="min-w-[220px] flex-1">
              <label
                htmlFor="purchase-search"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
              >
                Search ledger
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-[#444840]"
                  aria-hidden="true"
                />
                <input
                  id="purchase-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search supplier or item"
                  className={inputClass + ' pl-9'}
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Field label="Category" htmlFor="purchase-filter-category">
                <select
                  id="purchase-filter-category"
                  className={selectClass}
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {['All Categories', 'Feed', 'Medicines', 'Other supplies'].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="w-full sm:w-48">
              <Field label="Payment status" htmlFor="purchase-filter-payment">
                <select
                  id="purchase-filter-payment"
                  className={selectClass}
                  value={payment}
                  onChange={(event) => setPayment(event.target.value)}
                >
                  {['All Payment Statuses', 'Paid', 'Pending'].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
            </div>
          </FilterBar>
          <DataTable
            headers={[
              'Purchase ID / Invoice',
              'Date',
              'Supplier',
              'Category',
              'Item',
              'Quantity',
              'Total Cost',
              'Payment Status',
              'Recorded By',
              'Actions',
            ]}
            caption="Illustrative purchase records; amounts intentionally not reproduced"
          >
            {visible.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-[#444840]">
                  No illustrative purchases match these filters.
                </td>
              </tr>
            ) : (
              visible.map((row, index) => (
                <tr
                  key={`${row.supplier}-${index}`}
                  className="transition-colors duration-200 hover:bg-[#f0eee8]/60 motion-reduce:transition-none"
                >
                  <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.supplier}</td>
                  <td className="px-4 py-3">
                    <Badge tone={row.category === 'Medicines' ? 'tertiary' : 'neutral'}>
                      {row.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{row.item}</td>
                  <td className="px-4 py-3">{row.qty}</td>
                  <td className="px-4 py-3">{row.cost}</td>
                  <td className="px-4 py-3">
                    <Badge tone={row.status === 'Paid' ? 'secondary' : 'neutral'}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">Farm Admin</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                      aria-label="View purchase detail (local preview)"
                    >
                      <Eye size={16} />
                      <FileText size={12} className="ml-1 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </DataTable>
          <Pagination page={page} pageCount={4} onChange={setPage} />
        </Card>
      </div>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no invoice, payment status or ledger entry is persisted.
      </p>
    </div>
  );
}

export default PurchasesInboundInvoicesScreen;
