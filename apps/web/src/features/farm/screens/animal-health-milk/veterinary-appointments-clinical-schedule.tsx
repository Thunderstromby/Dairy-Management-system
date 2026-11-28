import { useState } from 'react';
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Eye,
  Info,
  Lock,
  Plus,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const appointments = [
  {
    id: 'APT-0001',
    date: 'Sample date',
    shift: 'Morning window',
    purpose: 'Routine herd check (illustrative)',
    vet: 'Veterinary role',
    targets: 'Pen 04',
    status: 'Scheduled',
    notes: 'Preparation notes omitted',
  },
  {
    id: 'APT-0002',
    date: 'Sample date',
    shift: 'Afternoon window',
    purpose: 'Herd prophylaxis (illustrative)',
    vet: 'Veterinary role',
    targets: 'Cohort Pen 02',
    status: 'Scheduled',
    notes: 'Preparation notes omitted',
  },
  {
    id: 'APT-0003',
    date: 'Sample date',
    shift: 'Triage window',
    purpose: 'Clinical evaluation (illustrative)',
    vet: 'Veterinary role',
    targets: 'Pen H-1',
    status: 'Restricted',
    notes: 'Clinical details omitted',
  },
  {
    id: 'APT-0004',
    date: 'Sample date',
    shift: 'Morning window',
    purpose: 'Reproductive check (illustrative)',
    vet: 'Veterinary role',
    targets: 'Pen 03',
    status: 'Completed',
    notes: 'Findings omitted',
  },
] as const;

export function VeterinaryAppointmentsClinicalSchedule() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const visible = appointments.filter((item) => {
    const matchesQuery = `${item.id} ${item.purpose} ${item.targets}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesStatus = status === 'all' || item.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Herd & livestock</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Animal health</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Veterinary appointments</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Veterinary Appointments & Clinical Schedule
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Appointments are shown as illustrative records. Clinical findings, prescriptions,
              consultation fees and sign-off workflows are not reproduced.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotice('Calendar sync and export are not wired in this prototype.')}
              className={`rounded-lg bg-[#f0eee8] px-3.5 py-2.5 text-sm font-semibold ${focus}`}
            >
              Sync calendar
            </button>
            <button
              type="button"
              onClick={() =>
                setNotice('Emergency callout workflow is not available in this prototype.')
              }
              className={`rounded-lg bg-[#eae8e2] px-3.5 py-2.5 text-sm font-semibold text-[#7a461c] ${focus}`}
            >
              Emergency callout
            </button>
            <button
              type="button"
              aria-expanded={formOpen}
              onClick={() => setFormOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white ${focus}`}
            >
              <Plus aria-hidden="true" size={15} /> Schedule appointment
            </button>
          </div>
        </header>

        <section
          aria-label="Appointment summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Upcoming visits',
              value: '3',
              note: 'Illustrative scheduled count',
              icon: <CalendarDays aria-hidden="true" size={18} />,
            },
            {
              label: 'Check cadence',
              value: 'Farm-configured',
              note: 'No interval invented',
              icon: <ClipboardList aria-hidden="true" size={18} />,
            },
            {
              label: 'Primary practice',
              value: 'Veterinary practice',
              note: 'Neutral placeholder',
              icon: <Stethoscope aria-hidden="true" size={18} />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {item.label}
                </span>
                <span className="text-[#2f4126]">{item.icon}</span>
              </div>
              <p className="mt-2 font-heading text-lg font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
          <div className="rounded-xl border border-[#ba1a1a]/30 bg-[#ffdad6] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ba1a1a]">
                Awaiting examination
              </span>
              <ShieldAlert aria-hidden="true" size={17} className="text-[#ba1a1a]" />
            </div>
            <p className="mt-2 font-heading text-sm font-bold text-[#ba1a1a]">Restricted</p>
            <p className="mt-1 text-xs text-[#444840]">
              Triage queues and High/Critical health details are limited to Farm Admin views.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <label htmlFor="apt-search" className="sr-only">
                Search appointments
              </label>
              <input
                id="apt-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search appointment ID or purpose"
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              />
            </div>
            <div>
              <label
                htmlFor="apt-status"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Status
              </label>
              <select
                id="apt-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All visits</option>
                <option>Scheduled</option>
                <option>Completed</option>
              </select>
            </div>
            {['Type', 'Veterinarian', 'Date range'].map((label) => (
              <div key={label}>
                <label
                  htmlFor={`apt-${label}`}
                  className="mb-1 block text-xs font-semibold text-[#444840]"
                >
                  {label}
                </label>
                <select
                  id={`apt-${label}`}
                  className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
                >
                  <option>All</option>
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f0eee8] px-4 py-3">
            <h2 className="font-heading text-sm font-bold">
              Master clinical schedule & consult log
            </h2>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#444840]">
              {visible.length} illustrative records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
              <thead className="bg-[#f5f3ed] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Appointment ID',
                    'Date & shift',
                    'Clinical purpose',
                    'Attending vet',
                    'Target animals / pens',
                    'Status',
                    'Notes',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-3 py-3">
                      <p className="font-mono text-xs font-semibold text-[#2f4126]">{item.id}</p>
                      <p className="text-[11px] text-[#444840]">Illustrative</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-semibold">{item.date}</p>
                      <p className="text-xs text-[#444840]">{item.shift}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm">{item.purpose}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.vet}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.targets}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Restricted' ? 'bg-[#ffdad6] text-[#ba1a1a]' : item.status === 'Completed' ? 'bg-[#d4e9c3] text-[#3a4c30]' : 'bg-[#d9e8c7] text-[#2f4126]'}`}
                      >
                        {item.status === 'Restricted' ? (
                          <Lock aria-hidden="true" size={12} />
                        ) : (
                          <CalendarDays aria-hidden="true" size={12} />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.notes}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        aria-label={`View ${item.id}`}
                        className={`rounded-lg p-1.5 text-[#444840] ${focus}`}
                      >
                        <Eye aria-hidden="true" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <Stethoscope aria-hidden="true" size={28} className="mx-auto text-[#444840]" />
                <p className="mt-2 font-heading text-sm font-bold">
                  No appointments match the current filters
                </p>
                <p className="mt-1 text-xs text-[#444840]">
                  Adjust the filters to see more illustrative entries.
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {visible.length} illustrative records</span>
            <span>No consultation fees or invoices are shown.</span>
          </div>
        </section>

        {formOpen ? (
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Schedule clinical visit</h2>
            <p className="mt-1 text-xs text-[#444840]">
              Local form preview; no appointment is created.
            </p>
            <form
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice('Local draft validated. No appointment created.');
              }}
            >
              {[
                'Clinical purpose',
                'Classification',
                'Attending veterinarian',
                'Scheduled date',
                'Shift window',
                'Target animals / pens',
                'Barn sector',
                'Preparation instructions',
              ].map((label) => (
                <div key={label}>
                  <label
                    htmlFor={`apt-form-${label}`}
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                  >
                    {label} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    id={`apt-form-${label}`}
                    className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                    placeholder="Illustrative value"
                  />
                </div>
              ))}
              <div className="flex gap-2 sm:col-span-2">
                <button
                  type="submit"
                  className={`rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  Validate locally
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className={`rounded-lg bg-[#f0eee8] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Close
                </button>
              </div>
            </form>
            {notice ? (
              <p role="status" className="mt-3 rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]">
                {notice}
              </p>
            ) : null}
          </section>
        ) : null}

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Info aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Consultation audit log</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Electronic signatures, linked prescriptions, invoice values and clinical findings are
              approval-controlled and are not reproduced in this visual prototype.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
