import { useState } from 'react';
import { BadgeCheck, Info, LockKeyhole, Search, Users } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

type Attendance = {
  id: string;
  role: string;
  station: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Late' | 'Absent' | 'Leave';
  hours: string;
};

const ROWS: readonly Attendance[] = [
  {
    id: 'W-01',
    role: 'Milking lead',
    station: 'Parlor',
    checkIn: '05:15',
    checkOut: 'Active',
    status: 'Present',
    hours: '—',
  },
  {
    id: 'W-02',
    role: 'Feed operator',
    station: 'Feed alley',
    checkIn: '05:30',
    checkOut: '13:30',
    status: 'Present',
    hours: '0.75',
  },
  {
    id: 'W-03',
    role: 'Calf carer',
    station: 'Nursery',
    checkIn: '05:45',
    checkOut: 'Active',
    status: 'Late',
    hours: '—',
  },
  {
    id: 'W-04',
    role: 'Sanitation',
    station: 'Parlor',
    checkIn: '—',
    checkOut: '—',
    status: 'Absent',
    hours: '—',
  },
  {
    id: 'W-05',
    role: 'Nursery specialist',
    station: 'Nursery',
    checkIn: '—',
    checkOut: '—',
    status: 'Leave',
    hours: '—',
  },
];

const STATUSES = ['all', 'Present', 'Late', 'Absent', 'Leave'] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/worker_attendance_records_shift_log */
export function WorkerAttendanceRecordsShiftLogScreen() {
  const [status, setStatus] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Attendance | null>(null);
  const [message, setMessage] = useState('');

  const visible = ROWS.filter((row) => {
    const matchesStatus = status === 'all' || row.status === status;
    const haystack = `${row.id} ${row.role} ${row.station}`.toLowerCase();
    return matchesStatus && haystack.includes(query.trim().toLowerCase());
  });

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
              <span>Farm Workspace</span>
              <span aria-hidden="true">/</span>
              <span>Workers &amp; attendance</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#1b1c18]">Attendance records</span>
            </nav>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
              Worker Attendance Records &amp; Daily Shift Roster
            </h1>
            <p className="max-w-3xl text-sm text-[#444840]">
              Daily presence, check-in and check-out recording. Wage calculation, pay rates,
              overtime compensation approval and leave approval are excluded from this role.
            </p>
          </div>
          <span className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#e4e2dd] px-4 text-sm font-semibold text-[#75786f]">
            <LockKeyhole size={16} aria-hidden="true" /> Print unavailable
          </span>
        </header>

        <section className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a461c]" />
          <p className="text-sm text-[#444840]">
            <strong className="text-[#1b1c18]">Supervisor scope:</strong> daily attendance logging
            only. Leave records are read-only; corrections and approvals require Farm Admin.
          </p>
        </section>

        <section
          aria-label="Attendance overview"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'On duty', value: '14 / 16', note: 'Illustrative coverage' },
            { label: 'Present', value: '13', note: 'Illustrative count' },
            { label: 'Pending check-out', value: '12', note: 'Sample roster' },
            { label: 'Elapsed hours', value: '4.5', note: 'No pay calculation' },
          ].map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {card.label}
                </p>
                <Users size={16} aria-hidden="true" className="text-[#46583b]" />
              </div>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.note}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#444840]">
              <BadgeCheck size={16} aria-hidden="true" className="text-[#46583b]" />
              <span>Sample date</span>
              <span aria-hidden="true">·</span>
              <span>
                Showing {visible.length} of {ROWS.length} illustrative records
              </span>
            </div>
            <label className="relative w-full lg:max-w-xs">
              <span className="sr-only">Search roster</span>
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search worker, role or station"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Attendance status filter">
            {STATUSES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={status === item}
                onClick={() => setStatus(item)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${status === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
              >
                {item === 'all' ? 'All statuses' : item}
              </button>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="overflow-x-auto lg:col-span-8">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                    <th scope="col" className="px-3 py-3">
                      Worker / role
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Station
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Check-in
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Check-out
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0eee8]">
                  {visible.map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-3">
                        <span className="font-semibold text-[#1b1c18]">{row.id}</span>
                        <span className="block text-xs text-[#444840]">{row.role}</span>
                      </td>
                      <td className="px-3 py-3">{row.station}</td>
                      <td className="px-3 py-3 font-mono">{row.checkIn}</td>
                      <td className="px-3 py-3 font-mono">{row.checkOut}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-semibold ${
                            row.status === 'Leave'
                              ? 'bg-[#e4e2dd] text-[#444840]'
                              : row.status === 'Absent'
                                ? 'bg-[#ffdad6] text-[#93000a]'
                                : 'bg-[#d9e8c7] text-[#46583b]'
                          }`}
                        >
                          {row.status === 'Leave' ? 'Approved leave (read only)' : row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelected(row)}
                          className={`rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold ${focusRing}`}
                        >
                          View shift
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visible.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="font-heading text-base font-bold">No attendance records found</p>
                  <p className="mt-1 text-sm text-[#444840]">
                    No crew member matches this date or filter.
                  </p>
                </div>
              ) : null}
            </div>

            <aside className="rounded-xl bg-[#f0eee8] p-4 lg:col-span-4">
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                Shift audit inspector
              </h2>
              {selected ? (
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="font-mono text-sm font-bold text-[#2f4126]">{selected.id}</p>
                    <p className="mt-0.5 text-sm text-[#444840]">
                      {selected.role} · {selected.station}
                    </p>
                  </div>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-white p-3">
                      <dt className="text-xs text-[#444840]">Check-in</dt>
                      <dd className="font-mono font-semibold">{selected.checkIn}</dd>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                      <dt className="text-xs text-[#444840]">Check-out</dt>
                      <dd className="font-mono font-semibold">{selected.checkOut}</dd>
                    </div>
                  </dl>
                  <p className="rounded-lg bg-white p-3 text-xs text-[#444840]">
                    Elapsed hours: {selected.hours}. Rate and pay calculations are excluded.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setMessage(`${selected.id}: check-out preview opened. Nothing saved.`)
                    }
                    className={`h-10 w-full rounded-lg bg-[#46583b] text-sm font-semibold text-white ${focusRing}`}
                  >
                    Record check-out
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#444840]">
                  Select a worker row to inspect the shift.
                </p>
              )}
              {message ? (
                <p role="status" className="mt-3 text-xs font-semibold text-[#46583b]">
                  {message}
                </p>
              ) : null}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
