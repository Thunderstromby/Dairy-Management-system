import { useState, type ReactNode } from 'react';
import {
  Activity,
  BadgeCheck,
  Bell,
  CalendarDays,
  ClipboardList,
  Droplets,
  Plus,
  Search,
  Sprout,
  Wrench,
} from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const KPIS = [
  {
    label: 'Milk production (illustrative)',
    value: '4,820',
    unit: 'L',
    caption: 'Morning + evening sessions',
  },
  {
    label: 'Crew attendance (illustrative)',
    value: '14',
    unit: '/ 16',
    caption: 'On duty for this shift',
  },
  {
    label: 'Feeding runs (illustrative)',
    value: '2',
    unit: 'of 3',
    caption: 'Runs recorded today',
  },
  {
    label: 'Stations active (illustrative)',
    value: '8',
    unit: 'stations',
    caption: 'Routine roster',
  },
] as const;

const WEEK = [
  { day: 'Mon', value: 72 },
  { day: 'Tue', value: 76 },
  { day: 'Wed', value: 70 },
  { day: 'Thu', value: 68 },
  { day: 'Fri', value: 74 },
  { day: 'Sat', value: 78 },
  { day: 'Sun', value: 80 },
] as const;

const CREW = [
  { id: 'W-01', role: 'Milking lead', station: 'Milking parlor', time: '05:00', status: 'On duty' },
  { id: 'W-02', role: 'Calf care', station: 'Calf nursery', time: '05:15', status: 'On duty' },
  { id: 'W-03', role: 'Feed operator', station: 'Feed alley', time: '05:30', status: 'On shift' },
] as const;

const FEED = [
  { code: 'PLAN-A', group: 'Lactating group', status: 'Recorded', amount: '2,400 kg' },
  { code: 'PLAN-B', group: 'Dry group', status: 'Recorded', amount: '850 kg' },
  { code: 'PLAN-C', group: 'Young stock', status: 'Scheduled', amount: '220 kg' },
] as const;

const ROUTINE_HEALTH = [
  {
    code: 'H-01',
    title: 'Hoof care round',
    detail: 'Routine preventive check',
    status: 'Scheduled',
  },
  {
    code: 'H-02',
    title: 'Fresh cow observation',
    detail: 'Daily vitality check',
    status: 'Recorded',
  },
  {
    code: 'H-03',
    title: 'Herd screening',
    detail: 'Routine observation round',
    status: 'Recorded',
  },
] as const;

const NOTICES = [
  { id: 'N-01', category: 'Shift notice', text: 'Afternoon handover reminder.', time: '08:00' },
  {
    id: 'N-02',
    category: 'Feeding',
    text: 'Evening ration entry is ready to record.',
    time: '08:45',
  },
  {
    id: 'N-03',
    category: 'Equipment',
    text: 'Routine service interval is approaching.',
    time: '09:15',
  },
] as const;

function Panel({
  id,
  title,
  subtitle,
  action,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="rounded-xl border border-[#c4c8bd] bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-3 border-b border-[#f0eee8] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id={id} className="font-heading text-lg font-bold text-[#1b1c18]">
            {title}
          </h2>
          {subtitle ? <p className="mt-1 text-sm text-[#444840]">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#46583b]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2f4126]" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Source: stitch_smartfarm_supervisor_interface_shell/farm_supervisor_dashboard */
export function FarmSupervisorDashboardScreen() {
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [readIds, setReadIds] = useState<readonly string[]>([]);

  const matchingCrew = CREW.filter((member) =>
    `${member.id} ${member.role} ${member.station}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-xl bg-[#f0eee8] p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#556249]">
              <span>Farm Workspace</span>
              <span aria-hidden="true">/</span>
              <span>Supervisor Overview</span>
            </div>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
              Farm Supervisor Dashboard
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#444840]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} aria-hidden="true" /> Shift: morning and evening
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck size={15} aria-hidden="true" /> Supervisor: on duty
              </span>
              <span className="rounded bg-white px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                Illustrative
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#444840]">
              Operational overview for the supervisor role. Example figures are illustrative and no
              live telemetry, financial summary or high-severity health alert is shown.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotice('Production entry preview opened. No data was saved.')}
              className={`inline-flex h-11 items-center gap-2 rounded-xl bg-[#46583b] px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#2f4126] motion-reduce:transition-none ${focusRing}`}
            >
              <Droplets size={17} aria-hidden="true" /> Record Milk Production
            </button>
            <button
              type="button"
              onClick={() => setNotice('Attendance entry preview opened. No data was saved.')}
              className={`inline-flex h-11 items-center gap-2 rounded-xl border border-[#c4c8bd] bg-white px-4 text-sm font-semibold text-[#1b1c18] transition-colors duration-150 hover:bg-[#f0eee8] motion-reduce:transition-none ${focusRing}`}
            >
              <BadgeCheck size={17} aria-hidden="true" /> Record Attendance
            </button>
            <button
              type="button"
              onClick={() => setNotice('Feeding entry preview opened. No data was saved.')}
              className={`inline-flex h-11 items-center gap-2 rounded-xl border border-[#c4c8bd] bg-white px-4 text-sm font-semibold text-[#1b1c18] transition-colors duration-150 hover:bg-[#f0eee8] motion-reduce:transition-none ${focusRing}`}
            >
              <Sprout size={17} aria-hidden="true" /> Record Feeding
            </button>
          </div>
        </header>

        {notice ? (
          <p
            role="status"
            className="rounded-lg border border-[#d9e8c7] bg-[#eef4e6] px-4 py-3 text-sm text-[#46583b]"
          >
            {notice}
          </p>
        ) : null}

        <section aria-labelledby="dashboard-kpis">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="dashboard-kpis" className="font-heading text-base font-bold text-[#1b1c18]">
              Daily Operational Overview
            </h2>
            <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-xs text-[#444840]">
              Illustrative
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((kpi) => (
              <article key={kpi.label} className="rounded-xl border border-[#c4c8bd] bg-white p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {kpi.label}
                </p>
                <p className="mt-2 flex items-baseline gap-2 font-heading text-3xl font-bold text-[#2f4126]">
                  {kpi.value} <span className="text-sm font-medium text-[#444840]">{kpi.unit}</span>
                </p>
                <p className="mt-2 text-xs text-[#444840]">{kpi.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <Panel
          id="production-heading"
          title="Milk Production"
          subtitle="Morning and evening session overview · illustrative values"
          action={
            <button
              type="button"
              onClick={() => setNotice('Production entry preview opened. No data was saved.')}
              className={`inline-flex h-10 items-center gap-2 rounded-lg bg-[#2f4126] px-4 text-sm font-semibold text-white ${focusRing}`}
            >
              <Plus size={16} aria-hidden="true" /> Record Yield
            </button>
          }
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
              {[
                { title: 'Morning session', state: 'Recorded', value: '2,640 L' },
                { title: 'Evening session', state: 'Pending', value: '2,180 L' },
              ].map((session) => (
                <div key={session.title} className="rounded-xl bg-[#f0eee8] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-sm font-bold text-[#1b1c18]">
                      {session.title}
                    </h3>
                    <Badge>{session.state}</Badge>
                  </div>
                  <p className="mt-3 font-heading text-xl font-bold text-[#2f4126]">
                    {session.value}
                  </p>
                  <p className="mt-1 text-xs text-[#444840]">Illustrative volume · litres</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-[#f0eee8] p-4 lg:col-span-7">
              <h3 className="font-heading text-sm font-bold text-[#1b1c18]">
                Seven-day production overview
              </h3>
              <p className="mt-1 text-xs text-[#444840]">
                Illustrative bars only. No target formula, prediction or telemetry source is
                implied.
              </p>
              <div
                className="mt-4 flex h-40 items-end gap-2"
                role="img"
                aria-label="Illustrative seven-day production overview"
              >
                {WEEK.map((bar) => (
                  <div
                    key={bar.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className="w-full rounded-sm bg-[#556249] transition-colors duration-150 hover:bg-[#2f4126] motion-reduce:transition-none"
                      style={{ height: `${bar.value}%` }}
                    />
                    <span className="text-[10px] text-[#444840]">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          id="attendance-heading"
          title="Worker Attendance & Shift Log"
          subtitle="Daily operational presence only"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4 text-sm text-[#444840]">
              <span>
                Illustrative: <strong className="text-[#1b1c18]">14 present</strong>
              </span>
              <span>
                <strong className="text-[#1b1c18]">2</strong> scheduled
              </span>
            </div>
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Filter crew</span>
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Filter worker, role or station"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-white pl-9 pr-3 text-sm ${focusRing}`}
              />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Worker / Role
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Station
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Check-in
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {matchingCrew.map((member) => (
                  <tr key={member.id}>
                    <td className="px-3 py-3">
                      <span className="font-semibold text-[#1b1c18]">{member.id}</span>
                      <span className="block text-xs text-[#444840]">{member.role}</span>
                    </td>
                    <td className="px-3 py-3">{member.station}</td>
                    <td className="px-3 py-3">{member.time}</td>
                    <td className="px-3 py-3">
                      <Badge>{member.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {matchingCrew.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#444840]">
                No crew member matches this filter.
              </p>
            ) : null}
          </div>
          <p className="mt-3 text-xs text-[#444840]">
            Payroll, wage rates and leave approval are excluded from the supervisor view.
          </p>
        </Panel>

        <Panel
          id="feeding-heading"
          title="Daily Feeding Schedule"
          subtitle="Assigned ration plans and recorded runs · illustrative"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {FEED.map((plan) => (
              <div key={plan.code} className="rounded-xl border border-[#c4c8bd] bg-[#f0eee8] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#46583b]">{plan.code}</span>
                  <Badge>{plan.status}</Badge>
                </div>
                <h3 className="mt-2 font-heading text-sm font-bold text-[#1b1c18]">{plan.group}</h3>
                <p className="mt-1 text-xs text-[#444840]">{plan.amount} · illustrative</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel id="animal-heading" title="Animal Operations" subtitle="Permitted herd overview">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Milking group', value: '184' },
              { label: 'Dry group', value: '32' },
              { label: 'Young stock', value: '28' },
              { label: 'Separate observation group', value: '4' },
            ].map((group) => (
              <div key={group.label} className="rounded-xl bg-[#f0eee8] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {group.label}
                </p>
                <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{group.value}</p>
                <p className="mt-1 text-xs text-[#444840]">Illustrative head count</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#444840]">
            Animal registration, archive actions and lifecycle transfers require Farm Admin.
          </p>
        </Panel>

        <Panel
          id="health-heading"
          title="Permitted Health & Routine Monitoring"
          subtitle="Routine observations only; high and critical alerts are not displayed"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {ROUTINE_HEALTH.map((item) => (
              <div key={item.code} className="rounded-xl bg-[#f0eee8] p-4">
                <span className="font-mono text-xs font-bold text-[#46583b]">{item.code}</span>
                <h3 className="mt-2 font-heading text-sm font-bold text-[#1b1c18]">{item.title}</h3>
                <p className="mt-1 text-xs text-[#444840]">{item.detail}</p>
                <p className="mt-3">
                  <Badge>{item.status}</Badge>
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          id="equipment-heading"
          title="Equipment Condition & Maintenance"
          subtitle="Recorded condition and routine service"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { code: 'EQ-A', label: 'Milking station set', state: 'Operational' },
              { code: 'EQ-B', label: 'Feed mixer', state: 'Operational' },
              { code: 'EQ-C', label: 'Utility cart', state: 'Service noted' },
            ].map((item) => (
              <div
                key={item.code}
                className="flex items-start gap-3 rounded-xl border border-[#c4c8bd] p-4"
              >
                <Wrench size={18} aria-hidden="true" className="mt-0.5 text-[#46583b]" />
                <div>
                  <p className="font-mono text-xs font-bold text-[#46583b]">{item.code}</p>
                  <p className="mt-1 font-heading text-sm font-bold text-[#1b1c18]">{item.label}</p>
                  <p className="mt-1 text-xs text-[#444840]">{item.state}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          id="notifications-heading"
          title="Operational Notifications"
          subtitle="Routine notices only"
          action={
            <button
              type="button"
              onClick={() => setReadIds(NOTICES.map((item) => item.id))}
              className={`rounded-lg border border-[#c4c8bd] bg-white px-3 py-2 text-xs font-semibold text-[#1b1c18] ${focusRing}`}
            >
              Mark all read
            </button>
          }
        >
          <ul className="space-y-2">
            {NOTICES.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#f0eee8] px-4 py-3"
              >
                <span className="flex items-center gap-3">
                  <Bell size={16} aria-hidden="true" className="text-[#46583b]" />
                  <span>
                    <strong className="block text-sm text-[#1b1c18]">{item.category}</strong>
                    <span className="text-xs text-[#444840]">{item.text}</span>
                  </span>
                </span>
                <span className="text-xs text-[#444840]">
                  {item.time} · {readIds.includes(item.id) ? 'Read' : 'Unread'}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-xs text-[#444840]">
            <Activity size={14} aria-hidden="true" /> No simulated live status or telemetry is
            shown.
          </p>
        </Panel>

        <p className="pb-4 text-center text-xs text-[#75786f]">
          <ClipboardList size={14} aria-hidden="true" className="mr-1 inline" />
          Supervisor operational preview · actual records are provided by the approved data source.
        </p>
      </div>
    </main>
  );
}
