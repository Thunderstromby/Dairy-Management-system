import { useState } from 'react';
import {
  Download,
  Eye,
  FileSpreadsheet,
  LockKeyhole,
  Printer,
  ReceiptText,
  RotateCcw,
  Search,
  Wallet,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  EmptyState,
  Field,
  Notice,
  PageHeader,
  PreviewNotice,
  SelectField,
  TextField,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

const expenses = [
  {
    id: 'Illustrative',
    date: 'Illustrative',
    category: 'Feed',
    payee: 'Supplier A',
    purpose: 'Illustrative purpose',
    method: 'Illustrative',
    amount: 'Illustrative',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    category: 'Veterinary',
    payee: 'Supplier B',
    purpose: 'Illustrative purpose',
    method: 'Illustrative',
    amount: 'Illustrative',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    category: 'Utilities',
    payee: 'Supplier C',
    purpose: 'Illustrative purpose',
    method: 'Illustrative',
    amount: 'Illustrative',
    by: 'Farm Admin',
  },
] as const;

export function ExpenseRecordsScreen() {
  const [category, setCategory] = useState('Feed');
  const [amount, setAmount] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All categories');
  const [showCategories, setShowCategories] = useState(false);
  const [voucher, setVoucher] = useState<string | null>(null);

  const visible = expenses.filter((row) => {
    const matches = row.payee.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (filter === 'All categories' || row.category === filter);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Finance / Expense Records"
        title="Farm Expense Records & Outflow Ledger"
        description="Illustrative expenditure ledger with category allocation and direct receipt records."
        badge="Farm Admin only"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export CSV
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
            <button
              type="button"
              className={primaryButtonClass}
              onClick={() => setShowCategories((value) => !value)}
            >
              <FileSpreadsheet size={16} aria-hidden="true" /> Categories
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Direct verified receipts only" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Depreciation, amortization and stock-to-expense write-down timing are excluded. No amount is
        converted or totalled; editing and deletion remain unapproved.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card title="Monthly Expenditure Allocation">
          <div className="space-y-3">
            {[
              'Feed commodities',
              'Farm labor',
              'Veterinary supplies',
              'Machinery & fuel',
              'Utilities & other',
            ].map((label) => (
              <div key={label}>
                <div className="flex justify-between font-inter text-xs text-[#444840]">
                  <span>{label}</span>
                  <span>Illustrative</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-[#f0eee8]" aria-hidden="true">
                  <div className="h-full w-1/4 rounded-full bg-[#7a461c]" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 font-inter text-xs text-[#444840]">
            Allocation bars are illustrative; no share is computed.
          </p>
        </Card>
        <Card title="Ledger status">
          <p className="font-heading text-base font-bold text-[#2f4126]">
            Illustrative entries only
          </p>
          <p className="mt-2 font-inter text-xs leading-relaxed text-[#444840]">
            The source design states that records become immutable once verified. This preview
            implements no such state transition.
          </p>
        </Card>
      </div>

      {showCategories ? (
        <div className="mb-6">
          <Card
            title="Farm Expense Categories"
            subtitle="Illustrative category list — no categories are created"
          >
            <h3 className="font-heading text-sm font-bold text-[#1b1c18]">
              Standard predefined categories
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Feed', 'Labor', 'Veterinary', 'Machinery', 'Utilities'].map((item) => (
                <Badge key={item} tone="neutral">
                  {item}
                </Badge>
              ))}
            </div>
            <h3 className="mt-5 font-heading text-sm font-bold text-[#1b1c18]">
              Farm Admin custom categories
            </h3>
            <p className="mt-1 font-inter text-xs text-[#444840]">
              No custom category is added in this preview.
            </p>
            <button
              type="button"
              className={secondaryButtonClass + ' mt-4'}
              onClick={() => setShowCategories(false)}
            >
              Close category manager
            </button>
          </Card>
        </div>
      ) : null}

      <Card
        title="Admin Disbursement Desk"
        subtitle="Illustrative form — no disbursement is recorded"
      >
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <TextField
            id="expense-date"
            label="Expense date"
            type="date"
            value=""
            onChange={() => undefined}
            required
          />
          <SelectField
            id="expense-category"
            label="Expense category"
            value={category}
            onChange={setCategory}
            options={['Feed', 'Labor', 'Veterinary', 'Machinery', 'Utilities', 'Other']}
            required
          />
          <TextField
            id="expense-payee"
            label="Payee / recipient"
            value=""
            onChange={() => undefined}
            placeholder="Counterparty A"
            required
          />
          <TextField
            id="expense-amount"
            label="Amount"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="Illustrative"
            required
          />
          <SelectField
            id="expense-method"
            label="Payment method"
            value="Illustrative method"
            onChange={() => undefined}
            options={['Illustrative method', 'Illustrative transfer', 'Illustrative cash']}
            required
          />
          <div className="sm:col-span-2">
            <TextField
              id="expense-purpose"
              label="Purpose & justification"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative purpose"
            />
          </div>
          <div className="flex flex-wrap items-end gap-2 sm:col-span-2">
            <button type="button" className={secondaryButtonClass} onClick={() => setAmount('')}>
              <RotateCcw size={16} aria-hidden="true" /> Reset form
            </button>
            <button type="submit" className={primaryButtonClass}>
              Save expense (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label
              htmlFor="expense-search"
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
                id="expense-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search payee or purpose"
                className={inputClass + ' pl-9'}
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Field label="Category" htmlFor="expense-filter">
              <select
                id="expense-filter"
                className={selectClass}
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                {['All categories', 'Feed', 'Veterinary', 'Utilities', 'Labor', 'Machinery'].map(
                  (option) => (
                    <option key={option}>{option}</option>
                  ),
                )}
              </select>
            </Field>
          </div>
        </div>
        {visible.length === 0 ? (
          <EmptyState title="No operational expenses found">
            No illustrative disbursements match this period and filter. Reset the filters to view
            the sample ledger.
          </EmptyState>
        ) : (
          <DataTable
            headers={[
              'Date',
              'Expense ID',
              'Category',
              'Payee',
              'Purpose',
              'Method',
              'Amount',
              'Recorded By',
              'Receipt',
            ]}
            caption="Illustrative expenses — amounts intentionally not reproduced"
          >
            {visible.map((row, index) => (
              <tr key={`${row.id}-${index}`}>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
                <td className="px-4 py-3">
                  <Badge tone="tertiary">{row.category}</Badge>
                </td>
                <td className="px-4 py-3">{row.payee}</td>
                <td className="px-4 py-3">{row.purpose}</td>
                <td className="px-4 py-3">{row.method}</td>
                <td className="px-4 py-3">{row.amount}</td>
                <td className="px-4 py-3">{row.by}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label="Inspect expense receipt (local preview)"
                    onClick={() => setVoucher(row.category)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </div>

      {voucher ? (
        <div className="mt-6">
          <Card
            title="Audited Expense Receipt Voucher"
            subtitle={`Illustrative · ${voucher}`}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setVoucher(null)}
              >
                Dismiss
              </button>
            }
          >
            <p className="flex items-center gap-2 font-inter text-sm text-[#444840]">
              <ReceiptText size={16} aria-hidden="true" /> Illustrative metadata only — no receipt
              file or checksum is produced.
            </p>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        <Wallet size={12} className="mr-1 inline" aria-hidden="true" />
        Local preview only — no expense is persisted.
      </p>
    </div>
  );
}

export default ExpenseRecordsScreen;
