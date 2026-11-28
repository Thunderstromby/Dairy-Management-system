import { useState } from 'react';
import {
  CalendarClock,
  CircleAlert,
  ClipboardList,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
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

const registry = [
  {
    id: 'Illustrative',
    worker: 'Worker A',
    role: 'Illustrative role',
    structure: 'Monthly salary',
    amount: 'Illustrative',
    frequency: 'Illustrative',
    effective: 'Illustrative',
    status: 'Active',
  },
  {
    id: 'Illustrative',
    worker: 'Worker B',
    role: 'Illustrative role',
    structure: 'Daily wage',
    amount: 'Illustrative',
    frequency: 'Illustrative',
    effective: 'Illustrative',
    status: 'Active',
  },
  {
    id: 'Illustrative',
    worker: 'Worker C',
    role: 'Illustrative role',
    structure: 'Monthly salary',
    amount: 'Illustrative',
    frequency: 'Illustrative',
    effective: 'Illustrative',
    status: 'Active',
  },
] as const;

export function SalaryManagementScreen() {
  const [worker, setWorker] = useState('Worker A');
  const [structure, setStructure] = useState('Monthly salary');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [effective, setEffective] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [filter, setFilter] = useState('All structures');

  const visible = registry.filter((row) => filter === 'All structures' || row.structure === filter);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Payroll / Salary Management"
        title="Farm Workforce Salary & Wage Structure Management"
        description="Illustrative baseline wage structures and payment frequency records. Farm Admin only."
        badge="Farm Admin only"
      />
      <PreviewNotice />
      <Notice title="Salary calculations are not implemented" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Monthly versus daily conversion, partial months, absence deductions and overtime payroll
        implications are unresolved. Only baseline structure fields are shown; no wage result is
        computed and no worker can access this data.
      </Notice>

      <Card
        title="Worker Salary Profile Configuration"
        subtitle="Illustrative editor — no structure is saved"
      >
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <SelectField
            id="salary-worker"
            label="Select worker record"
            value={worker}
            onChange={setWorker}
            options={['Worker A', 'Worker B', 'Worker C']}
            required
          />
          <SelectField
            id="salary-structure"
            label="Baseline wage structure"
            value={structure}
            onChange={setStructure}
            options={['Monthly salary', 'Daily wage']}
            required
          />
          <TextField
            id="salary-amount"
            label="Baseline amount"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="Illustrative"
            required
            hint="Entered in the farm-configured currency; no conversion is performed."
          />
          <SelectField
            id="salary-frequency"
            label="Payment frequency"
            value={frequency}
            onChange={setFrequency}
            options={['Monthly', 'Biweekly', 'Weekly']}
            required
          />
          <TextField
            id="salary-effective"
            label="Structure effective date"
            type="date"
            value={effective}
            onChange={setEffective}
            required
          />
          <SelectField
            id="salary-term"
            label="Contract term / review"
            value="Illustrative term"
            onChange={() => undefined}
            options={['Illustrative term', 'Illustrative review']}
          />
          <div className="flex flex-wrap items-end gap-2 sm:col-span-2">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setAmount('');
                setEffective('');
              }}
            >
              <RotateCcw size={16} aria-hidden="true" /> Reset edits
            </button>
            <button type="button" className={secondaryButtonClass}>
              Audit trail (local preview)
            </button>
            <button type="button" className={primaryButtonClass} onClick={() => setConfirm(true)}>
              <ShieldCheck size={16} aria-hidden="true" /> Authorize update (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-6">
        <Card
          title="Attendance Context Reference"
          subtitle="Read-only illustrative context — not a calculation input in this preview"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {['Shift A (morning)', 'Shift B (evening)', 'Leave reference'].map((label) => (
              <div key={label} className="rounded-lg bg-[#fbf9f3] p-3">
                <p className="font-inter text-xs uppercase tracking-wider text-[#444840]">
                  {label}
                </p>
                <p className="mt-1 font-heading text-sm font-bold text-[#1b1c18]">Illustrative</p>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-1 font-inter text-xs text-[#444840]">
            <CalendarClock size={12} aria-hidden="true" />
            Attendance metrics are shown for context only; no absence docking or overtime value is
            derived.
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
            Master Farm Workforce Salary Registry
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="salary-filter" className="font-inter text-xs text-[#444840]">
              Structure
            </label>
            <select
              id="salary-filter"
              className="h-9 rounded-lg border border-[#c4c8bd] bg-white px-2 font-inter text-sm"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              {['All structures', 'Monthly salary', 'Daily wage'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <DataTable
          headers={[
            'Worker',
            'Role',
            'Salary structure',
            'Baseline amount',
            'Payment frequency',
            'Effective date',
            'Status',
            'Actions',
          ]}
          caption="Illustrative salary structures — no monetary result is computed"
        >
          {visible.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-[#444840]">
                No active baseline wage structures match this filter.
              </td>
            </tr>
          ) : (
            visible.map((row, index) => (
              <tr key={`${row.id}-${index}`}>
                <td className="px-4 py-3 font-semibold text-[#1b1c18]">{row.worker}</td>
                <td className="px-4 py-3">{row.role}</td>
                <td className="px-4 py-3">
                  <Badge tone="neutral">{row.structure}</Badge>
                </td>
                <td className="px-4 py-3">{row.amount}</td>
                <td className="px-4 py-3">{row.frequency}</td>
                <td className="px-4 py-3">{row.effective}</td>
                <td className="px-4 py-3">
                  <Badge tone="secondary">{row.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <button type="button" className={secondaryButtonClass}>
                    <ClipboardList size={14} aria-hidden="true" /> Edit (local preview)
                  </button>
                </td>
              </tr>
            ))
          )}
        </DataTable>
      </div>

      {confirm ? (
        <div className="mt-6">
          <Card
            title="Confirm Salary Structure Update"
            subtitle="Illustrative confirmation — nothing is committed"
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setConfirm(false)}
              >
                Cancel
              </button>
            }
          >
            <p className="flex items-center gap-1 font-inter text-sm text-[#444840]">
              <CircleAlert size={14} aria-hidden="true" /> By confirming, this baseline reference
              would become binding in the real system. This preview does not store it.
            </p>
            <div className="mt-4">
              <button
                type="button"
                className={primaryButtonClass}
                onClick={() => setConfirm(false)}
              >
                Authorize &amp; update (local preview)
              </button>
            </div>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        <Wallet size={12} className="mr-1 inline" aria-hidden="true" />
        Local preview only — salary structures are not persisted.
      </p>
    </div>
  );
}

export default SalaryManagementScreen;
