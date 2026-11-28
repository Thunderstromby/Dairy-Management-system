import { useState } from 'react';
import {
  Download,
  Eye,
  FileCheck2,
  LockKeyhole,
  Printer,
  Receipt,
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
  FilterBar,
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

const records = [
  {
    id: 'Illustrative',
    date: 'Illustrative',
    source: 'Milk sales',
    buyer: 'Counterparty A',
    reference: 'Illustrative',
    method: 'Illustrative',
    amount: 'Illustrative',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    source: 'Livestock sale',
    buyer: 'Counterparty B',
    reference: 'Illustrative',
    method: 'Illustrative',
    amount: 'Illustrative',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    source: 'Other income',
    buyer: 'Counterparty C',
    reference: 'Illustrative',
    method: 'Illustrative',
    amount: 'Illustrative',
    by: 'Farm Admin',
  },
] as const;

export function IncomeRecordsScreen() {
  const [source, setSource] = useState('Milk sales');
  const [amount, setAmount] = useState('');
  const [counterparty, setCounterparty] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All sources');
  const [voucher, setVoucher] = useState<string | null>(null);

  const visible = records.filter((record) => {
    const matches = record.buyer.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (category === 'All sources' || record.source === category);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Finance / Income Records"
        title="Farm Income Records & Revenue Streams"
        description="Illustrative income ledger. All amounts are labelled Illustrative; no reconciliation or accrual is performed."
        badge="Farm Admin only"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export CSV
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print summary
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Direct record capture only" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Unpaid sales, outstanding credits and receipt timing are not accrued. Suppliers, buyers and
        amounts are neutral placeholders; no farm-configured currency value is invented.
      </Notice>

      <Card
        title="New Authorized Income Record Entry"
        subtitle="Illustrative form — no transaction is recorded"
      >
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <SelectField
            id="income-source"
            label="Confirmed income source"
            value={source}
            onChange={setSource}
            options={['Milk sales', 'Livestock sale', 'Other income']}
            required
          />
          <TextField
            id="income-date"
            label="Transaction date & time"
            type="date"
            value=""
            onChange={() => undefined}
            required
          />
          <TextField
            id="income-amount"
            label="Income amount"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="Illustrative"
            required
          />
          <SelectField
            id="income-method"
            label="Payment method"
            value="Illustrative method"
            onChange={() => undefined}
            options={['Illustrative method', 'Illustrative transfer', 'Illustrative cash']}
            required
          />
          <TextField
            id="income-counterparty"
            label="Counterparty / buyer"
            value={counterparty}
            onChange={setCounterparty}
            placeholder="Counterparty A"
            required
          />
          <TextField
            id="income-reference"
            label="Reference document"
            value=""
            onChange={() => undefined}
            placeholder="Illustrative reference"
          />
          <div className="sm:col-span-2">
            <TextField
              id="income-notes"
              label="Operational notes"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative note"
            />
          </div>
          <div className="flex flex-wrap items-end gap-2 sm:col-span-2">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setAmount('');
                setCounterparty('');
              }}
            >
              <RotateCcw size={16} aria-hidden="true" /> Reset form
            </button>
            <button type="submit" className={primaryButtonClass}>
              Save income record (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card title="Income allocation by confirmed source">
          <div className="space-y-3">
            {['Milk sales', 'Livestock sale', 'Other income'].map((label) => (
              <div key={label}>
                <div className="flex justify-between font-inter text-xs text-[#444840]">
                  <span>{label}</span>
                  <span>Illustrative</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-[#f0eee8]" aria-hidden="true">
                  <div className="h-full w-1/3 rounded-full bg-[#46583b]" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 font-inter text-xs text-[#444840]">
            Bars are illustrative; no percentage is computed.
          </p>
        </Card>
        <Card title="Ledger status">
          <p className="flex items-center gap-2 font-heading text-base font-bold text-[#2f4126]">
            <FileCheck2 size={18} aria-hidden="true" /> Illustrative · no integrity hash
          </p>
          <p className="mt-2 font-inter text-xs leading-relaxed text-[#444840]">
            Transaction editing and deletion remain unapproved. The source design shows checksums
            and immutable seals, which are intentionally omitted here.
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <FilterBar>
          <div className="min-w-[220px] flex-1">
            <label
              htmlFor="income-search"
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
                id="income-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search counterparty or reference"
                className={inputClass + ' pl-9'}
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Field label="Source category" htmlFor="income-category">
              <select
                id="income-category"
                className={selectClass}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {['All sources', 'Milk sales', 'Livestock sale', 'Other income'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>
        </FilterBar>
        {visible.length === 0 ? (
          <EmptyState title="No income records found">
            No illustrative income entries match these filters. Reset the search to view the sample
            ledger.
          </EmptyState>
        ) : (
          <DataTable
            headers={[
              'Record ID',
              'Date',
              'Source',
              'Counterparty',
              'Reference',
              'Method',
              'Amount',
              'Recorded by',
              'Receipt',
            ]}
            caption="Illustrative income records — amounts intentionally not reproduced"
          >
            {visible.map((record, index) => (
              <tr key={`${record.id}-${index}`}>
                <td className="px-4 py-3 font-semibold text-[#2f4126]">{record.id}</td>
                <td className="px-4 py-3">{record.date}</td>
                <td className="px-4 py-3">
                  <Badge tone="secondary">{record.source}</Badge>
                </td>
                <td className="px-4 py-3">{record.buyer}</td>
                <td className="px-4 py-3">{record.reference}</td>
                <td className="px-4 py-3">{record.method}</td>
                <td className="px-4 py-3">{record.amount}</td>
                <td className="px-4 py-3">{record.by}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label="Inspect income voucher (local preview)"
                    onClick={() => setVoucher(record.source)}
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
            title="Income Transaction Voucher"
            subtitle={`Illustrative · ${voucher}`}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setVoucher(null)}
              >
                Close inspection
              </button>
            }
          >
            <p className="flex items-center gap-2 font-inter text-sm text-[#444840]">
              <Receipt size={16} aria-hidden="true" /> Illustrative voucher metadata only. No file,
              hash or payment receipt is produced.
            </p>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        <Wallet size={12} className="mr-1 inline" aria-hidden="true" />
        Local preview only — no transaction is persisted.
      </p>
    </div>
  );
}

export default IncomeRecordsScreen;
