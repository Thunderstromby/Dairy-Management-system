import { useState } from 'react';
import {
  CircleAlert,
  Download,
  FileLock2,
  LockKeyhole,
  Printer,
  Search,
  Wallet,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Field,
  Notice,
  PageHeader,
  Pagination,
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
    worker: 'Worker A',
    wage: 'Illustrative structure',
    attendance: 'Illustrative',
    base: 'Illustrative',
    adjustments: 'Illustrative',
    net: 'Not computed',
    method: 'Illustrative',
    status: 'Paid',
  },
  {
    id: 'Illustrative',
    worker: 'Worker B',
    wage: 'Illustrative structure',
    attendance: 'Illustrative',
    base: 'Illustrative',
    adjustments: 'Illustrative',
    net: 'Not computed',
    method: 'Illustrative',
    status: 'Pending',
  },
  {
    id: 'Illustrative',
    worker: 'Worker C',
    wage: 'Illustrative structure',
    attendance: 'Illustrative',
    base: 'Illustrative',
    adjustments: 'Illustrative',
    net: 'Not computed',
    method: 'Illustrative',
    status: 'Paid',
  },
] as const;

export function PayrollRecordsScreen() {
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('Illustrative period');
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [page, setPage] = useState(1);

  const visible = records.filter((record) => {
    const matches = record.worker.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (status === 'All' || record.status === status);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Payroll Records"
        title="Payroll Records"
        description="Farm Admin-only confidential payroll ledger. Illustrative entries only; no pay is calculated."
        badge="Farm Admin only"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
            <button
              type="button"
              className={primaryButtonClass}
              onClick={() => setShowAdjustment((value) => !value)}
            >
              Record adjustment (local preview)
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Payroll calculations are blocked" variant="restricted">
        <FileLock2 size={12} className="mr-1 inline" aria-hidden="true" />
        Exact salary formulas, partial-day rules, advance recovery and statutory treatments are
        unresolved. Net payable, deductions and balances are shown as &ldquo;Not computed&rdquo;; no
        amount is invented and no payment is initiated.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Recorded base', 'Permitted adjustments', 'Net payable', 'Advance recovery'].map(
          (label) => (
            <Card key={label} title={label}>
              <p className="font-heading text-2xl font-bold text-[#2f4126]">Not computed</p>
              <p className="mt-1 font-inter text-xs text-[#444840]">
                Illustrative period · no value derived
              </p>
            </Card>
          ),
        )}
      </div>

      <div className="mb-5 flex flex-wrap items-end gap-3">
        <div className="w-full sm:w-56">
          <Field label="Payroll period" htmlFor="payroll-period">
            <select
              id="payroll-period"
              className={selectClass}
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
            >
              {['Illustrative period', 'Illustrative prior period'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="payroll-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search records
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="payroll-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search worker"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-40">
          <Field label="Status" htmlFor="payroll-status">
            <select
              id="payroll-status"
              className={selectClass}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {['All', 'Paid', 'Pending'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <DataTable
        headers={[
          'Worker',
          'Wage structure',
          'Attendance',
          'Recorded base',
          'Adjustments',
          'Net payable',
          'Method',
          'Payment status',
          'Actions',
        ]}
        caption="Illustrative payroll entries — no calculation result is stored"
      >
        {visible.length === 0 ? (
          <tr>
            <td colSpan={9} className="px-4 py-10 text-center text-[#444840]">
              No illustrative payroll records match this period and filter.
            </td>
          </tr>
        ) : (
          visible.map((record, index) => (
            <tr key={`${record.worker}-${index}`}>
              <td className="px-4 py-3 font-semibold text-[#1b1c18]">{record.worker}</td>
              <td className="px-4 py-3">{record.wage}</td>
              <td className="px-4 py-3">{record.attendance}</td>
              <td className="px-4 py-3">{record.base}</td>
              <td className="px-4 py-3">{record.adjustments}</td>
              <td className="px-4 py-3">
                <Badge tone="outline">{record.net}</Badge>
              </td>
              <td className="px-4 py-3">{record.method}</td>
              <td className="px-4 py-3">
                <Badge tone={record.status === 'Paid' ? 'secondary' : 'tertiary'}>
                  {record.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  className={secondaryButtonClass}
                  onClick={() => setShowAdjustment(true)}
                >
                  Adjust (local preview)
                </button>
              </td>
            </tr>
          ))
        )}
      </DataTable>
      <Pagination page={page} pageCount={4} onChange={setPage} />

      {showAdjustment ? (
        <div className="mt-6">
          <Card
            title="Manual Payroll Adjustment"
            subtitle="Illustrative form — no adjustment is applied"
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setShowAdjustment(false)}
              >
                Close
              </button>
            }
          >
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <SelectField
                id="adjustment-worker"
                label="Select worker"
                value="Worker A"
                onChange={() => undefined}
                options={['Worker A', 'Worker B', 'Worker C']}
                required
              />
              <SelectField
                id="adjustment-type"
                label="Adjustment type"
                value="Manual permitted adjustment"
                onChange={() => undefined}
                options={[
                  'Manual permitted adjustment',
                  'Advance recovery allocation',
                  'Correction notation',
                ]}
                required
              />
              <TextField
                id="adjustment-amount"
                label="Amount"
                value=""
                onChange={() => undefined}
                placeholder="Illustrative"
                required
              />
              <SelectField
                id="adjustment-cycle"
                label="Applicable payroll cycle"
                value={period}
                onChange={() => undefined}
                options={['Illustrative period', 'Illustrative prior period']}
                required
              />
              <div className="sm:col-span-2">
                <TextField
                  id="adjustment-justification"
                  label="Operational justification"
                  value=""
                  onChange={() => undefined}
                  placeholder="Illustrative justification"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <p className="flex items-center gap-1 font-inter text-xs text-[#ba1a1a]">
                  <CircleAlert size={12} aria-hidden="true" /> No recalculation or payment occurs in
                  this preview.
                </p>
              </div>
              <div className="flex items-end gap-2 sm:col-span-2">
                <button type="submit" className={primaryButtonClass}>
                  Save adjustment (local preview)
                </button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 flex items-center gap-1 font-inter text-xs text-[#444840]">
        <Wallet size={12} aria-hidden="true" />
        <LockKeyhole size={12} aria-hidden="true" /> Local preview only — no payroll value is
        persisted.
      </p>
    </div>
  );
}

export default PayrollRecordsScreen;
