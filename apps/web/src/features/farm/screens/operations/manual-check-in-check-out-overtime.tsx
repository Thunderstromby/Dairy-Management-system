import { useState } from 'react';
import {
  ClipboardCheck,
  Clock3,
  Info,
  RotateCcw,
  ShieldCheck,
  Timer,
  UserRound,
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
  containerButtonClass,
  secondaryButtonClass,
} from './OperationsPrimitives';

const overtime = [
  {
    id: 'Illustrative',
    worker: 'Worker A',
    date: 'Illustrative',
    hours: 'Illustrative',
    status: 'Recorded',
  },
  {
    id: 'Illustrative',
    worker: 'Worker B',
    date: 'Illustrative',
    hours: 'Illustrative',
    status: 'Recorded',
  },
  {
    id: 'Illustrative',
    worker: 'Worker C',
    date: 'Illustrative',
    hours: 'Illustrative',
    status: 'Recorded',
  },
] as const;

export function ManualCheckInCheckOutOvertimeScreen() {
  const [worker, setWorker] = useState('Worker A');
  const [date, setDate] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [status, setStatus] = useState('Present');
  const [feedback, setFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Manual Check-in Check Out Overtime"
        title="Manual Attendance Entry & Overtime Ledger"
        description="Illustrative direct attendance entry and overtime record ledger for Farm Admin review."
        badge="Farm Admin"
      />
      <PreviewNotice />
      <Notice title="No overtime or pay result is computed" variant="warning">
        <Info size={12} className="mr-1 inline" aria-hidden="true" />
        Overtime rules, missing check-out handling and multiple daily entries remain unresolved.
        This preview records illustrative inputs only and never derives hours, wages or deductions.
      </Notice>

      <Card
        title="Farm Admin Direct Entry"
        subtitle="Illustrative form — no attendance entry is stored"
      >
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            setFeedback(true);
          }}
        >
          <SelectField
            id="manual-worker"
            label="Worker selection"
            value={worker}
            onChange={setWorker}
            options={['Worker A', 'Worker B', 'Worker C']}
            required
          />
          <TextField
            id="manual-date"
            label="Attendance date"
            type="date"
            value={date}
            onChange={setDate}
            required
          />
          <TextField
            id="manual-check-in"
            label="Check-in time"
            type="time"
            value={checkIn}
            onChange={setCheckIn}
            required
            hint="Set Current is available in the source design; no clock is simulated here."
          />
          <TextField
            id="manual-check-out"
            label="Check-out time"
            type="time"
            value={checkOut}
            onChange={setCheckOut}
          />
          <SelectField
            id="manual-status"
            label="Shift attendance status"
            value={status}
            onChange={setStatus}
            options={['Present', 'Absent', 'Late', 'Leave']}
            required
          />
          <div className="rounded-lg bg-[#d9e8c7]/50 p-3">
            <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#444840]">
              Shift result
            </p>
            <p className="mt-1 font-inter text-sm text-[#444840]">Illustrative — not calculated</p>
          </div>
          {feedback ? (
            <p
              role="status"
              className="sm:col-span-2 rounded-lg bg-[#d9e8c7]/50 p-3 font-inter text-sm text-[#2f4126]"
            >
              <ShieldCheck size={12} className="mr-1 inline" aria-hidden="true" />
              Local preview only — no check-in, check-out or overtime entry was saved.
            </p>
          ) : null}
          <div className="flex flex-wrap items-end gap-2 sm:col-span-2">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setWorker('Worker A');
                setDate('');
                setCheckIn('');
                setCheckOut('');
                setStatus('Present');
                setFeedback(false);
              }}
            >
              <RotateCcw size={16} aria-hidden="true" /> Reset form
            </button>
            <button type="submit" className={containerButtonClass}>
              Save entry (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card title="Overtime Shift Summary">
          <p className="font-heading text-xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">No total is derived.</p>
        </Card>
        <Card title="Verified entries">
          <p className="font-heading text-xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">Illustrative ledger count.</p>
        </Card>
        <Card title="Policy status">
          <p className="flex items-center gap-2 text-sm text-[#1b1c18]">
            <Clock3 size={16} aria-hidden="true" /> Rules pending approval
          </p>
        </Card>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
            Recent Verified Overtime Ledger
          </h2>
          <Badge tone="neutral">Illustrative</Badge>
        </div>
        <DataTable
          headers={['Record ID', 'Worker', 'Date', 'Overtime', 'Status', 'Actions']}
          caption="Illustrative overtime records — hours are not computed"
        >
          {overtime.map((row, index) => (
            <tr key={`${row.id}-${index}`}>
              <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
              <td className="px-4 py-3">
                <UserRound size={14} className="mr-1 inline" aria-hidden="true" />
                {row.worker}
              </td>
              <td className="px-4 py-3">{row.date}</td>
              <td className="px-4 py-3">{row.hours}</td>
              <td className="px-4 py-3">
                <Badge tone="secondary">{row.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  className={secondaryButtonClass}
                  aria-label="Inspect overtime record (local preview)"
                >
                  <ClipboardCheck size={14} />
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>

      <Notice title="Operational compliance" variant="restricted">
        <Timer size={12} className="mr-1 inline" aria-hidden="true" />
        Missing check-outs, overnight shifts and multiple daily entries need formal policy approval.
        Closed payroll cycles are never modified in this preview.
      </Notice>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no entry is persisted.
      </p>
    </div>
  );
}

export default ManualCheckInCheckOutOvertimeScreen;
