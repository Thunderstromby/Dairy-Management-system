import { useState } from 'react';
import {
  CalendarRange,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  RotateCcw,
  Search,
  XCircle,
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
  containerButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

const requests = [
  {
    id: 'Illustrative',
    worker: 'Worker A',
    type: 'Paid leave',
    from: 'Illustrative',
    to: 'Illustrative',
    reason: 'Illustrative reason',
    status: 'Pending',
  },
  {
    id: 'Illustrative',
    worker: 'Worker B',
    type: 'Paid leave',
    from: 'Illustrative',
    to: 'Illustrative',
    reason: 'Illustrative reason',
    status: 'Pending',
  },
  {
    id: 'Illustrative',
    worker: 'Worker C',
    type: 'Unpaid leave',
    from: 'Illustrative',
    to: 'Illustrative',
    reason: 'Illustrative reason',
    status: 'Approved',
  },
  {
    id: 'Illustrative',
    worker: 'Worker D',
    type: 'Unpaid leave',
    from: 'Illustrative',
    to: 'Illustrative',
    reason: 'Illustrative reason',
    status: 'Rejected',
  },
] as const;

export function LeaveManagementScreen() {
  const [status, setStatus] = useState('All statuses');
  const [search, setSearch] = useState('');
  const [review, setReview] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const visible = requests.filter((request) => {
    const matches = request.worker.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (status === 'All statuses' || request.status === status);
  });

  const decide = (decision: 'Approve' | 'Reject') => {
    setFeedback(`Local preview only — ${decision.toLowerCase()} was not recorded.`);
    setReview(null);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Leave Management"
        title="Farm Workforce Leave Management & Absence Approvals"
        description="Illustrative leave requests, working-day coverage context and Farm Admin approval review."
        badge="Farm Admin"
        actions={
          <button type="button" className={secondaryButtonClass}>
            <CalendarRange size={16} aria-hidden="true" /> Coverage calendar (local preview)
          </button>
        }
      />
      <PreviewNotice />
      <Notice title="Approval is Farm Admin-only and local preview only" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Supervisors cannot approve or reject leave. The decision controls below only update a local
        message; no request status, balance or roster is changed.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          ['Pending review', 'Illustrative'],
          ['Approved', 'Illustrative'],
          ['Rejected', 'Illustrative'],
        ].map(([label, value]) => (
          <Card key={label} title={label}>
            <p className="font-heading text-2xl font-bold text-[#2f4126]">{value}</p>
            <p className="mt-1 font-inter text-xs text-[#444840]">
              Illustrative working-day coverage context
            </p>
          </Card>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="leave-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search requests
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="leave-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search worker"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Field label="Leave status" htmlFor="leave-status">
            <select
              id="leave-status"
              className={selectClass}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {['All statuses', 'Pending', 'Approved', 'Rejected'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
        <button
          type="button"
          className={secondaryButtonClass}
          onClick={() => {
            setSearch('');
            setStatus('All statuses');
          }}
        >
          <RotateCcw size={16} aria-hidden="true" /> Clear filters
        </button>
      </div>

      {feedback ? (
        <div
          role="status"
          className="mb-5 rounded-xl border border-[#d9e8c7] bg-[#d9e8c7]/50 p-4 font-inter text-sm text-[#2f4126]"
        >
          {feedback}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <EmptyState title="No leave requests found">
          No illustrative requests match these filters. Approvals shown here never change stored
          request status in this preview.
        </EmptyState>
      ) : (
        <DataTable
          headers={[
            'Request ID',
            'Worker',
            'Leave type',
            'From',
            'To',
            'Reason',
            'Status',
            'Actions',
          ]}
          caption="Illustrative leave requests — no balance or coverage calculation"
        >
          {visible.map((request, index) => (
            <tr key={`${request.id}-${index}`}>
              <td className="px-4 py-3 font-semibold text-[#2f4126]">{request.id}</td>
              <td className="px-4 py-3">{request.worker}</td>
              <td className="px-4 py-3">
                <Badge tone="neutral">{request.type}</Badge>
              </td>
              <td className="px-4 py-3">{request.from}</td>
              <td className="px-4 py-3">{request.to}</td>
              <td className="px-4 py-3">{request.reason}</td>
              <td className="px-4 py-3">
                <Badge
                  tone={
                    request.status === 'Approved'
                      ? 'secondary'
                      : request.status === 'Rejected'
                        ? 'error'
                        : 'tertiary'
                  }
                >
                  {request.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  className={secondaryButtonClass}
                  onClick={() => {
                    setReview(request.worker);
                    setFeedback(null);
                  }}
                >
                  <ClipboardCheck size={14} aria-hidden="true" />{' '}
                  {request.status === 'Pending' ? 'Review' : 'Details'}
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
      <Pagination page={page} pageCount={4} onChange={setPage} />

      {review ? (
        <div className="mt-6">
          <Card
            title="Farm Admin Leave Request Review"
            subtitle={`Illustrative request for ${review}`}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setReview(null)}
              >
                Cancel &amp; close
              </button>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#444840]">
                  Reason on file
                </p>
                <p className="mt-1 font-inter text-sm text-[#1b1c18]">
                  Illustrative reason — no personal details shown.
                </p>
              </div>
              <TextField
                id="leave-decision-notes"
                label="Admin decision notes"
                value={notes}
                onChange={setNotes}
                placeholder="Illustrative decision note"
                required
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                className={containerButtonClass}
                onClick={() => decide('Approve')}
              >
                <CheckCircle2 size={16} aria-hidden="true" /> Approve (local preview)
              </button>
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => decide('Reject')}
              >
                <XCircle size={16} aria-hidden="true" /> Reject (local preview)
              </button>
              <button type="button" className={secondaryButtonClass}>
                <FileText size={14} aria-hidden="true" /> View details
              </button>
            </div>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — leave approval, rejection and coverage are not persisted.
      </p>
    </div>
  );
}

export default LeaveManagementScreen;
