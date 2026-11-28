import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  FileText,
  LockKeyhole,
  Pencil,
  Printer,
  UserRound,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Notice,
  PageHeader,
  PreviewNotice,
  SectionTitle,
  secondaryButtonClass,
} from './OperationsPrimitives';

const documents = [
  { title: 'Identity documentation', meta: 'Illustrative · metadata only', status: 'Verified' },
  { title: 'Employment agreement', meta: 'Illustrative · metadata only', status: 'Verified' },
  {
    title: 'Farm safety certificate',
    meta: 'Illustrative · metadata only',
    status: 'Illustrative',
  },
] as const;

const logs = [
  {
    date: 'Illustrative',
    status: 'Present',
    checkIn: 'Illustrative',
    checkOut: 'Illustrative',
    note: 'Illustrative shift note',
  },
  {
    date: 'Illustrative',
    status: 'Present',
    checkIn: 'Illustrative',
    checkOut: 'Illustrative',
    note: 'Illustrative shift note',
  },
  {
    date: 'Illustrative',
    status: 'Leave',
    checkIn: '—',
    checkOut: '—',
    note: 'Illustrative leave note',
  },
] as const;

export function WorkerProfileScreen() {
  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workers / Worker Profile"
        title="Worker A"
        description="Illustrative worker profile with personal, employment, document and attendance information."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <ArrowLeft size={16} aria-hidden="true" /> Back to directory
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Pencil size={16} aria-hidden="true" /> Edit profile (local preview)
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Confidential — Farm Admin view only" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Worker A is a record, not an authenticated user. No worker self-service or payslip access
        exists. Identity numbers and contact details are redacted in this preview.
      </Notice>

      <Card title="Profile overview" subtitle="Illustrative status and assignment">
        <div className="flex flex-wrap gap-2">
          <Badge tone="secondary">Active</Badge>
          <Badge tone="neutral">Permanent employment</Badge>
          <Badge tone="container">Illustrative role</Badge>
        </div>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Primary station', 'Illustrative station'],
            ['Shift', 'Illustrative shift'],
            ['Reference ID', 'Illustrative'],
            ['Joined', 'Illustrative date'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-[#fbf9f3] p-3">
              <dt className="font-inter text-xs uppercase tracking-wider text-[#444840]">
                {label}
              </dt>
              <dd className="mt-1 font-heading text-sm font-bold text-[#1b1c18]">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Personal & Legal Identity">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Contact</dt>
              <dd>Redacted</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">National identity</dt>
              <dd>Redacted</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Address</dt>
              <dd>Redacted</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Emergency contact</dt>
              <dd>Redacted</dd>
            </div>
          </dl>
        </Card>
        <Card title="Employment & Stationing">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Department</dt>
              <dd>Illustrative</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Employment type</dt>
              <dd>Permanent</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Reporting lead</dt>
              <dd>Supervisor A</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Status</dt>
              <dd>
                <Badge tone="secondary">Active</Badge>
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      <div className="mt-6">
        <Card title="Cross-Module Activity" subtitle="Illustrative references — no live linkages">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['Attendance records', 'Document records', 'Equipment usage', 'Payroll reference'].map(
              (label) => (
                <div key={label} className="rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] p-3">
                  <p className="font-heading text-sm font-bold text-[#1b1c18]">{label}</p>
                  <p className="mt-1 font-inter text-xs text-[#444840]">
                    Illustrative link — not navigable in this preview
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <SectionTitle>Approved Worker Documents</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div key={doc.title} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <FileText size={20} className="text-[#46583b]" aria-hidden="true" />
              <h3 className="mt-2 font-heading text-sm font-bold text-[#1b1c18]">{doc.title}</h3>
              <p className="mt-1 font-inter text-xs text-[#444840]">{doc.meta}</p>
              <Badge tone={doc.status === 'Verified' ? 'secondary' : 'neutral'}>
                <BadgeCheck size={12} aria-hidden="true" /> {doc.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <SectionTitle note="Illustrative records">Recent Shift & Attendance Logs</SectionTitle>
        <DataTable headers={['Date', 'Status', 'Check-in', 'Check-out', 'Note']}>
          {logs.map((log, index) => (
            <tr key={`${log.date}-${index}`}>
              <td className="px-4 py-3">{log.date}</td>
              <td className="px-4 py-3">
                <Badge tone={log.status === 'Present' ? 'secondary' : 'tertiary'}>
                  {log.status}
                </Badge>
              </td>
              <td className="px-4 py-3">{log.checkIn}</td>
              <td className="px-4 py-3">{log.checkOut}</td>
              <td className="px-4 py-3">{log.note}</td>
            </tr>
          ))}
        </DataTable>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-[#c4c8bd] bg-white p-4">
        <UserRound size={18} className="text-[#2f4126]" aria-hidden="true" />
        <p className="font-inter text-sm text-[#444840]">
          No login account or payslip self-service is associated with this record.
        </p>
        <CalendarCheck size={16} className="ml-auto text-[#444840]" aria-hidden="true" />
      </div>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — profile edits are not persisted.
      </p>
    </div>
  );
}

export default WorkerProfileScreen;
