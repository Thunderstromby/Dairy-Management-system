import { useState } from 'react';
import {
  CalendarDays,
  ClipboardPen,
  Download,
  LockKeyhole,
  RotateCcw,
  Search,
  ShieldCheck,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  EmptyState,
  Field,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  TextField,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

type Status = 'All' | 'Present' | 'Late' | 'Absent' | 'Leave';

const records = [
  {
    worker: 'Worker A',
    date: 'Illustrative',
    status: 'Present',
    checkIn: 'Illustrative',
    checkOut: 'Illustrative',
    hours: 'Illustrative',
  },
  {
    worker: 'Worker B',
    date: 'Illustrative',
    status: 'Late',
    checkIn: 'Illustrative',
    checkOut: 'Illustrative',
    hours: 'Illustrative',
  },
  {
    worker: 'Worker C',
    date: 'Illustrative',
    status: 'Leave',
    checkIn: '—',
    checkOut: '—',
    hours: '—',
  },
  {
    worker: 'Worker D',
    date: 'Illustrative',
    status: 'Absent',
    checkIn: '—',
    checkOut: '—',
    hours: '—',
  },
] as const;

export function AttendanceRecordsScreen() {
  const [status, setStatus] = useState<Status>('All');
  const [search, setSearch] = useState('');
  const [correcting, setCorrecting] = useState<string | null>(null);
  const [justification, setJustification] = useState('');
  const [feedback, setFeedback] = useState(false);
  const [page, setPage] = useState(1);

  const visible = records.filter((record) => {
    const matches = record.worker.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (status === 'All' || record.status === status);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Attendance Records"
        title="Farm Workforce Attendance Records & Corrections"
        description="Daily attendance entries and illustrative correction review. No deduction or late penalty is evaluated."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <CalendarDays size={16} aria-hidden="true" /> Date
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Corrections are local preview only" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Farm Admin may review and correct attendance. The correction drawer below does not change
        any record, and no late-arrival penalty, overtime result or payroll deduction is calculated.
      </Notice>

      <Card title="Attendance Overview" subtitle="Illustrative summary values">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(['All', 'Present', 'Late', 'Absent', 'Leave'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              aria-pressed={status === item}
              className={
                status === item
                  ? 'rounded-lg bg-[#46583b] px-3 py-2 text-left font-inter text-sm font-semibold text-white transition-colors duration-200 motion-reduce:transition-none'
                  : 'rounded-lg bg-[#fbf9f3] px-3 py-2 text-left font-inter text-sm text-[#444840] transition-colors duration-200 hover:bg-[#f0eee8] motion-reduce:transition-none'
              }
            >
              <span className="block font-heading text-lg font-bold">Illustrative</span>
              {item}
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="attendance-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search worker
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="attendance-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by worker name"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Field label="Status filter" htmlFor="attendance-status">
            <select
              id="attendance-status"
              className={selectClass}
              value={status}
              onChange={(event) => setStatus(event.target.value as Status)}
            >
              {(['All', 'Present', 'Late', 'Absent', 'Leave'] as const).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
        </div>
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={() => {
            setSearch('');
            setStatus('All');
          }}
        >
          <RotateCcw size={16} aria-hidden="true" /> Reset
        </button>
      </div>

      <div className="mt-5">
        {visible.length === 0 ? (
          <EmptyState title="No attendance records found">
            No illustrative entries match the selected date and filters. Reset the filters to view
            the sample roster.
          </EmptyState>
        ) : (
          <DataTable
            headers={['Worker', 'Date', 'Status', 'Check-in', 'Check-out', 'Hours', 'Actions']}
            caption="Illustrative attendance entries — no derived hours are calculated"
          >
            {visible.map((record, index) => (
              <tr key={`${record.worker}-${index}`}>
                <td className="px-4 py-3 font-semibold text-[#1b1c18]">{record.worker}</td>
                <td className="px-4 py-3">{record.date}</td>
                <td className="px-4 py-3">
                  <Badge
                    tone={
                      record.status === 'Present'
                        ? 'secondary'
                        : record.status === 'Leave'
                          ? 'tertiary'
                          : 'neutral'
                    }
                  >
                    {record.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">{record.checkIn}</td>
                <td className="px-4 py-3">{record.checkOut}</td>
                <td className="px-4 py-3 text-[#444840]">{record.hours}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className={secondaryButtonClass}
                    onClick={() => {
                      setCorrecting(record.worker);
                      setFeedback(false);
                    }}
                  >
                    <ClipboardPen size={14} aria-hidden="true" /> Review correction
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
        <Pagination page={page} pageCount={7} onChange={setPage} />
      </div>

      {correcting ? (
        <div className="mt-6">
          <Card
            title="Attendance Record Audit"
            subtitle={`Illustrative correction for ${correcting}`}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setCorrecting(null)}
              >
                Cancel
              </button>
            }
          >
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setFeedback(true);
              }}
            >
              <TextField
                id="audit-worker"
                label="Worker"
                value={correcting}
                onChange={() => undefined}
                hint="Read-only in this preview."
              />
              <TextField
                id="audit-date"
                label="Attendance date"
                value="Illustrative"
                onChange={() => undefined}
              />
              <div className="sm:col-span-2">
                <TextField
                  id="audit-reason"
                  label="Administrative justification"
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
                  <ShieldCheck size={12} className="mr-1 inline" aria-hidden="true" />
                  Local preview only — no adjustment was applied and no audit log entry was written.
                </p>
              ) : null}
              <div className="flex items-end gap-2 sm:col-span-2">
                <button type="submit" className={primaryButtonClass}>
                  Apply correction (local preview)
                </button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — attendance entries and corrections are not persisted.
      </p>
    </div>
  );
}

export default AttendanceRecordsScreen;
