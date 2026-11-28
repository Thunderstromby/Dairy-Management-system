import { useState } from 'react';
import { ClipboardCheck, FileLock2, LockKeyhole, RotateCcw, ShieldCheck } from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Notice,
  PageHeader,
  PreviewNotice,
  SelectField,
  TextField,
  primaryButtonClass,
  secondaryButtonClass,
} from './OperationsPrimitives';

const deductions = [
  {
    id: 'Illustrative',
    date: 'Illustrative',
    worker: 'Worker A',
    category: 'Manual adjustment',
    amount: 'Illustrative',
    cycle: 'Illustrative',
    reason: 'Illustrative justification',
    by: 'Farm Admin',
    status: 'Recorded',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    worker: 'Worker B',
    category: 'Advance recovery',
    amount: 'Illustrative',
    cycle: 'Illustrative',
    reason: 'Illustrative justification',
    by: 'Farm Admin',
    status: 'Recorded',
  },
] as const;

export function PayrollDeductionsScreen() {
  const [worker, setWorker] = useState('Worker A');
  const [category, setCategory] = useState('Manual permitted adjustment');
  const [amount, setAmount] = useState('');
  const [justification, setJustification] = useState('');
  const [feedback, setFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Payroll / Deductions"
        title="Farm Workforce Payroll Deductions Ledger"
        description="Farm Admin-only ledger of manually permitted deductions. No statutory deduction is automated."
        badge="Farm Admin only"
      />
      <PreviewNotice />
      <Notice title="Only manual, permitted adjustments are shown" variant="restricted">
        <FileLock2 size={12} className="mr-1 inline" aria-hidden="true" />
        Automated tax, pension, statutory insurance and lateness penalties are excluded by the
        project rules. Amounts below are illustrative; no payroll total is recalculated.
      </Notice>

      <Card
        title="Record Permitted Payroll Deduction"
        subtitle="Illustrative form — no deduction is applied"
      >
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            setFeedback(true);
          }}
        >
          <SelectField
            id="deduction-worker"
            label="Worker"
            value={worker}
            onChange={setWorker}
            options={['Worker A', 'Worker B', 'Worker C']}
            required
          />
          <TextField
            id="deduction-amount"
            label="Deduction amount"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="Illustrative"
            required
          />
          <SelectField
            id="deduction-cycle"
            label="Applicable payroll cycle"
            value="Illustrative cycle"
            onChange={() => undefined}
            options={['Illustrative cycle', 'Illustrative prior cycle']}
            required
          />
          <SelectField
            id="deduction-category"
            label="Permitted deduction category"
            value={category}
            onChange={setCategory}
            options={[
              'Manual permitted adjustment',
              'Advance recovery allocation',
              'Confirmed equipment loss',
              'Housing utility split',
            ]}
            required
          />
          <div className="sm:col-span-2">
            <TextField
              id="deduction-reason"
              label="Operational justification & incident particulars"
              value={justification}
              onChange={setJustification}
              placeholder="Illustrative justification"
              required
            />
          </div>
          {feedback ? (
            <p
              role="status"
              className="sm:col-span-2 rounded-lg bg-[#d9e8c7]/50 p-3 font-inter text-sm text-[#2f4126]"
            >
              Local preview only — no deduction was recorded and no balance changed.
            </p>
          ) : null}
          <div className="flex flex-wrap items-end gap-2 sm:col-span-2">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setAmount('');
                setJustification('');
              }}
            >
              <RotateCcw size={16} aria-hidden="true" /> Reset
            </button>
            <button type="submit" className={primaryButtonClass}>
              Save deduction (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-6">
        <Card
          title="Administrative Compliance Checklist"
          subtitle="Illustrative review steps — no approval is granted here"
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              'Confirm worker and payroll period',
              'Confirm permitted category',
              'Verify justification',
              'Record authorizing Farm Admin',
            ].map((step) => (
              <li
                key={step}
                className="flex items-center gap-2 rounded-lg bg-[#fbf9f3] p-3 font-inter text-sm text-[#1b1c18]"
              >
                <ClipboardCheck size={16} className="text-[#46583b]" aria-hidden="true" /> {step}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-heading text-lg font-bold text-[#1b1c18]">
          Master Deductions History Ledger
        </h2>
        <DataTable
          headers={[
            'Deduction ID',
            'Date',
            'Worker',
            'Category',
            'Amount',
            'Target cycle',
            'Justification',
            'Recorded by',
            'Status',
          ]}
          caption="Illustrative deduction records — no checksum or total is generated"
        >
          {deductions.map((row, index) => (
            <tr key={`${row.id}-${index}`}>
              <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
              <td className="px-4 py-3">{row.date}</td>
              <td className="px-4 py-3">{row.worker}</td>
              <td className="px-4 py-3">
                <Badge tone="neutral">{row.category}</Badge>
              </td>
              <td className="px-4 py-3">{row.amount}</td>
              <td className="px-4 py-3">{row.cycle}</td>
              <td className="px-4 py-3">{row.reason}</td>
              <td className="px-4 py-3">{row.by}</td>
              <td className="px-4 py-3">
                <Badge tone="secondary">
                  <ShieldCheck size={12} aria-hidden="true" /> {row.status}
                </Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>

      <Notice title="Empty state" variant="info">
        No pending deductions are shown for the illustrative target cycle. When filters exclude all
        records, the ledger displays an explicit no-results message rather than a silent blank
        table.
      </Notice>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Local preview only — deductions are not persisted.
      </p>
    </div>
  );
}

export default PayrollDeductionsScreen;
