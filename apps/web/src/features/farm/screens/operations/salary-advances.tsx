import { useState } from 'react';
import {
  Banknote,
  CircleAlert,
  Landmark,
  LockKeyhole,
  Receipt,
  RotateCcw,
  WalletCards,
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

const advances = [
  {
    id: 'Illustrative',
    date: 'Illustrative',
    worker: 'Worker A',
    amount: 'Illustrative',
    method: 'Illustrative',
    reason: 'Illustrative reason',
    recovery: 'Manual',
    recovered: 'Not computed',
    balance: 'Not computed',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    worker: 'Worker B',
    amount: 'Illustrative',
    method: 'Illustrative',
    reason: 'Illustrative reason',
    recovery: 'Manual',
    recovered: 'Not computed',
    balance: 'Not computed',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    worker: 'Worker C',
    amount: 'Illustrative',
    method: 'Illustrative',
    reason: 'Illustrative reason',
    recovery: 'Manual',
    recovered: 'Not computed',
    balance: 'Not computed',
  },
] as const;

export function SalaryAdvancesScreen() {
  const [worker, setWorker] = useState('Worker A');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [method, setMethod] = useState('Cash');
  const [reason, setReason] = useState('');
  const [recovery, setRecovery] = useState('Manual entry');
  const [feedback, setFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Payroll / Salary Advances"
        title="Farm Workforce Salary Advances Ledger & Recovery"
        description="Farm Admin-only advance records and manual recovery notes. Illustrative values only."
        badge="Farm Admin only"
      />
      <PreviewNotice />
      <Notice title="Recovery scheduling is unresolved" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Advance recovery scheduling, instalment algorithms and balances require approved formulas.
        No recovered amount or outstanding balance is calculated here, and no supervisor
        authorization is available.
      </Notice>

      <Card title="Disburse Salary Advance" subtitle="Illustrative form — no advance is recorded">
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            setFeedback(true);
          }}
        >
          <SelectField
            id="advance-worker"
            label="Select farm worker"
            value={worker}
            onChange={setWorker}
            options={['Worker A', 'Worker B', 'Worker C']}
            required
          />
          <TextField
            id="advance-amount"
            label="Advance amount"
            type="number"
            value={amount}
            onChange={setAmount}
            placeholder="Illustrative"
            required
          />
          <TextField
            id="advance-date"
            label="Disbursement date"
            type="date"
            value={date}
            onChange={setDate}
          />
          <fieldset>
            <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#444840]">
              Confirmed payment method
            </legend>
            <div className="flex flex-wrap gap-2">
              {['Cash', 'Bank transfer', 'Cheque'].map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={method === option}
                  onClick={() => setMethod(option)}
                  className={
                    method === option
                      ? 'rounded-lg bg-[#46583b] px-3 py-2 font-inter text-sm font-semibold text-white transition-colors duration-200 motion-reduce:transition-none'
                      : secondaryButtonClass
                  }
                >
                  {option === 'Cash' ? (
                    <Banknote size={14} aria-hidden="true" />
                  ) : option === 'Bank transfer' ? (
                    <Landmark size={14} aria-hidden="true" />
                  ) : (
                    <Receipt size={14} aria-hidden="true" />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <SelectField
            id="advance-recovery"
            label="Recovery strategy"
            value={recovery}
            onChange={setRecovery}
            options={[
              'Manual entry',
              'Agreed instalments (unresolved)',
              'Next payroll (unresolved)',
            ]}
          />
          <div className="sm:col-span-2">
            <TextField
              id="advance-reason"
              label="Operational justification & purpose"
              value={reason}
              onChange={setReason}
              placeholder="Illustrative justification"
              required
            />
          </div>
          {feedback ? (
            <p
              role="status"
              className="sm:col-span-2 rounded-lg bg-[#d9e8c7]/50 p-3 font-inter text-sm text-[#2f4126]"
            >
              Local preview only — no advance was disbursed and no balance was derived.
            </p>
          ) : null}
          <div className="flex flex-wrap items-end gap-2 sm:col-span-2">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setAmount('');
                setReason('');
              }}
            >
              <RotateCcw size={16} aria-hidden="true" /> Clear form
            </button>
            <button type="submit" className={primaryButtonClass}>
              Save advance (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
            Master Salary Advances Ledger
          </h2>
          <Badge tone="outline">
            <WalletCards size={12} aria-hidden="true" /> Illustrative
          </Badge>
        </div>
        <DataTable
          headers={[
            'Advance ID',
            'Date',
            'Worker',
            'Amount',
            'Disbursed via',
            'Reason',
            'Recovery',
            'Recovered',
            'Balance',
            'Actions',
          ]}
          caption="Illustrative advances — recovery amounts are intentionally not computed"
        >
          {advances.map((row, index) => (
            <tr key={`${row.id}-${index}`}>
              <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
              <td className="px-4 py-3">{row.date}</td>
              <td className="px-4 py-3">{row.worker}</td>
              <td className="px-4 py-3">{row.amount}</td>
              <td className="px-4 py-3">{row.method}</td>
              <td className="px-4 py-3">{row.reason}</td>
              <td className="px-4 py-3">
                <Badge tone="neutral">{row.recovery}</Badge>
              </td>
              <td className="px-4 py-3">{row.recovered}</td>
              <td className="px-4 py-3">{row.balance}</td>
              <td className="px-4 py-3">
                <button type="button" className={secondaryButtonClass}>
                  Record recovery (local preview)
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>

      <Notice title="Recovery entry" variant="warning">
        <CircleAlert size={12} className="mr-1 inline" aria-hidden="true" />
        The source export offers a recovery form with amount and channel. It is omitted here because
        applying a recovery would require an approved calculation and balance update.
      </Notice>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no advance or recovery is persisted.
      </p>
    </div>
  );
}

export default SalaryAdvancesScreen;
