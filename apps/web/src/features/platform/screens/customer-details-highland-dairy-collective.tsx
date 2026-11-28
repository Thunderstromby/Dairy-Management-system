import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ChevronRight,
  History,
  ShieldCheck,
  Users,
} from 'lucide-react';

const CARD = 'rounded-lg bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';

const FACTS = [
  { label: 'Organization Name', value: 'Customer 01', note: 'Illustrative organization record' },
  {
    label: 'Primary Contact Person',
    value: 'Liaison 01',
    note: 'Illustrative authorized representative',
  },
  {
    label: 'Contact Email',
    value: 'contact-01@example.invalid',
    note: 'Illustrative notice address',
  },
  { label: 'Contact Phone', value: '+00 000 000 0000', note: 'Illustrative direct line' },
  { label: 'Registered Date', value: 'Example date', note: 'No persisted registration' },
  {
    label: 'Dairy Focus',
    value: 'Commercial Dairy Operations',
    note: 'Illustrative operational context',
  },
] as const;

const WORKSPACES = [
  {
    code: 'WS-0001',
    name: 'Workspace 01',
    facility: 'Rotary Milking Facility',
    admin: 'Farm Admin 01',
    initials: 'FA',
    role: 'Lead Operator',
    bound: 'Example date',
  },
  {
    code: 'WS-0002',
    name: 'Workspace 02',
    facility: 'Automated Milking Facility',
    admin: 'Farm Admin 02',
    initials: 'FA',
    role: 'Dairy Technologist',
    bound: 'Example date',
  },
] as const;

const ADMINS = [
  {
    initials: 'FA',
    name: 'Farm Admin 01',
    role: 'Farm Operations Lead',
    workspace: 'Workspace 01',
    code: 'WS-0001',
  },
  {
    initials: 'FA',
    name: 'Farm Admin 02',
    role: 'Senior Dairy Technologist',
    workspace: 'Workspace 02',
    code: 'WS-0002',
  },
] as const;

const EVENTS = [
  {
    title: 'Workspace WS-0001 created',
    time: 'Example date · illustrative',
    body: 'Workspace 01 created and assigned to Farm Admin 01 in this illustrative record.',
  },
  {
    title: 'Primary contact verified',
    time: 'Example date · illustrative',
    body: 'Illustrative contact confirmation for Liaison 01.',
  },
  {
    title: 'Customer record created',
    time: 'Example date · illustrative',
    body: 'Initial illustrative customer record and reference assigned.',
  },
] as const;

export function CustomerDetails() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <header className="space-y-4 bg-[#fff] px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]"
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 font-medium text-[#556249] hover:text-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <ArrowLeft size={15} aria-hidden="true" /> Back to Customer Management
            </button>
            <span className="text-[#c4c8bd]">/</span>
            <span>Customers</span>
            <span className="text-[#c4c8bd]">/</span>
            <span className="font-semibold text-[#191d18]">Customer details</span>
          </nav>
          <span className="inline-flex items-center gap-2 font-inter text-[11px] tabular-nums text-[#75786f]">
            <span className="h-2 w-2 rounded-full bg-[#46583b]" aria-hidden="true" /> RECORD REF:
            CUST-0001
          </span>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
                Customer details
              </h1>
              <span className="rounded-lg bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#191d18]">
                CUST-0001
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-semibold text-[#5b694e]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2f4126]" aria-hidden="true" /> Active
                (illustrative)
              </span>
              <span className="rounded-lg bg-[#f2f5ed] px-2 py-0.5 font-inter text-[11px] text-[#556249]">
                Organization Record
              </span>
            </div>
            <p className="max-w-3xl font-inter text-sm text-[#444840]">
              Illustrative organization profile and workspace assignments for a regional dairy
              operation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded-lg bg-[#f2f5ed] px-3 py-2 font-inter text-xs font-medium text-[#191d18] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              Edit Record
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-3 py-2 font-inter text-xs font-semibold text-white transition-colors duration-200 motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
            >
              <Building2 size={16} aria-hidden="true" /> Create Farm Workspace
            </button>
          </div>
        </div>
      </header>

      <section
        aria-label="Illustrative customer overview"
        className="grid grid-cols-2 gap-4 bg-[#f2f5ed] px-4 py-4 md:grid-cols-4"
      >
        {[
          { label: 'Active Workspaces', value: '2', note: 'Illustrative provisioned count' },
          { label: 'Assigned Farm Admins', value: '2', note: 'Illustrative active accounts' },
          { label: 'Organization Status', value: 'Active', note: 'Illustrative status label' },
          { label: 'Customer Reference', value: 'CUST-0001', note: 'Illustrative identifier' },
        ].map((stat) => (
          <article
            key={stat.label}
            className={`${CARD} flex min-h-[92px] flex-col justify-between p-4`}
          >
            <span className={LABEL}>{stat.label}</span>
            <div className="flex items-baseline justify-between gap-2 pt-2">
              <span className="font-heading text-2xl font-bold tabular-nums text-[#191d18]">
                {stat.value}
              </span>
              <span className="font-inter text-[11px] text-[#556249]">{stat.note}</span>
            </div>
          </article>
        ))}
      </section>

      <div className="flex flex-col gap-6 px-4 pb-6 sm:px-6 lg:px-8">
        <section className={`${CARD} overflow-hidden`}>
          <div className="flex items-center gap-3 bg-[#f2f5ed] px-5 py-4">
            <Users size={20} aria-hidden="true" className="text-[#556249]" />
            <div>
              <h2 className="font-heading text-base font-semibold text-[#191d18]">
                Customer Identity &amp; Contact Information
              </h2>
              <p className="font-inter text-xs text-[#444840]">
                Illustrative primary organization profile
              </p>
            </div>
            <span className="ml-auto font-inter text-[11px] font-semibold uppercase text-[#75786f]">
              Illustrative record
            </span>
          </div>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 md:grid-cols-2 lg:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.label} className="space-y-1">
                <dt className={LABEL}>{fact.label}</dt>
                <dd className="font-heading text-sm font-medium text-[#191d18]">{fact.value}</dd>
                <dd className="font-inter text-xs text-[#556249]">{fact.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Building2 size={22} aria-hidden="true" className="text-[#556249]" />
              <h2 className="font-heading text-lg font-semibold text-[#191d18]">
                Associated Farm Workspaces
              </h2>
              <span className="rounded-lg bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-semibold text-[#191d18]">
                2 Bound Units
              </span>
            </div>
            <p className="font-inter text-xs text-[#556249]">Illustrative workspace associations</p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {WORKSPACES.map((workspace) => (
              <article
                key={workspace.code}
                className="flex flex-col gap-4 rounded-lg bg-[#fff] p-4 shadow-sm transition-colors duration-200 motion-reduce:transition-none hover:bg-[#f2f5ed]"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={LABEL}>Workspace {workspace.code}</span>
                      <h3 className="mt-1 font-heading text-base font-semibold text-[#191d18]">
                        {workspace.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-semibold text-[#5b694e]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2f4126]" aria-hidden="true" />{' '}
                      Active
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#f2f5ed] px-3 py-2">
                    <span className={LABEL}>Physical Facility</span>
                    <p className="font-inter text-sm font-medium text-[#191d18]">
                      {workspace.facility}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 rounded-lg border border-[#ecefe7] p-3">
                  <div className="flex items-center justify-between font-inter text-[11px]">
                    <span className={LABEL}>Assigned Admin</span>
                    <span className="text-[#556249]">{workspace.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ecefe7] font-heading text-[11px] font-bold text-[#46583b]">
                      {workspace.initials}
                    </span>
                    <span className="font-inter text-sm text-[#191d18]">{workspace.admin}</span>
                  </div>
                  <span className="block truncate font-inter text-xs text-[#75786f]">
                    contact@example.invalid
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-[#ecefe7] pt-3">
                  <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                    Bound: {workspace.bound}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#46583b] hover:text-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    View Workspace <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
            <article className="flex flex-col items-center justify-center gap-3 rounded-lg bg-[#f2f5ed] p-5 text-center shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff] text-[#75786f]">
                <Building2 size={24} aria-hidden="true" />
              </span>
              <h3 className="font-heading text-base font-semibold text-[#191d18]">
                Provision New Unit
              </h3>
              <p className="max-w-xs font-inter text-xs text-[#444840]">
                Use “Create Farm Workspace” to bind another illustrative dairy unit to this
                customer.
              </p>
              <button
                type="button"
                className="rounded-lg bg-[#fff] px-3 py-1.5 font-inter text-xs font-semibold text-[#46583b] shadow-sm transition-colors duration-200 motion-reduce:transition-none hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                Bind New Workspace
              </button>
            </article>
          </div>
        </section>

        <section className={`${CARD} overflow-hidden`}>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} aria-hidden="true" className="text-[#556249]" />
              <div>
                <h2 className="font-heading text-base font-semibold text-[#191d18]">
                  Assigned Farm Administrators
                </h2>
                <p className="font-inter text-xs text-[#444840]">
                  Illustrative facility managers and assignments
                </p>
              </div>
            </div>
            <span className="font-inter text-[11px] font-semibold text-[#556249]">
              2 Assigned Administrators
            </span>
          </div>
          <div className="divide-y divide-[#ecefe7]">
            {ADMINS.map((admin) => (
              <div
                key={admin.code}
                className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#46583b] font-heading text-sm font-semibold text-white">
                    {admin.initials}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-sm font-semibold text-[#191d18]">
                        {admin.name}
                      </span>
                      <span className="rounded-lg bg-[#f2f5ed] px-2 py-0.5 font-inter text-[11px] text-[#191d18]">
                        {admin.role}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]">
                      <span>contact@example.invalid</span>
                      <span className="text-[#c4c8bd]">•</span>
                      <span>Direct Mobile: +00 000 000 0000</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left md:text-right">
                    <span className={LABEL}>Workspace Assignment</span>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded bg-[#f2f5ed] px-2 py-0.5 font-inter text-[11px] font-semibold tabular-nums">
                        {admin.code}
                      </span>
                      <span className="font-inter text-sm text-[#191d18]">{admin.workspace}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`View account details for ${admin.name}`}
                    className="rounded p-2 text-[#444840] hover:bg-[#f2f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${CARD} p-5`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
            <div className="flex items-center gap-3">
              <History size={20} aria-hidden="true" className="text-[#556249]" />
              <div>
                <h2 className="font-heading text-base font-semibold text-[#191d18]">
                  Activity Log
                </h2>
                <p className="font-inter text-xs text-[#444840]">
                  Illustrative audit trail for this record
                </p>
              </div>
            </div>
            <span className="font-inter text-[11px] font-semibold uppercase tabular-nums text-[#75786f]">
              3 Events
            </span>
          </div>
          <ol className="space-y-3 border-l-2 border-[#e0e4dc] pl-5">
            {EVENTS.map((event) => (
              <li key={event.title} className="rounded-lg bg-[#f2f5ed] p-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-heading text-sm font-semibold text-[#191d18]">
                    {event.title}
                  </span>
                  <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                    {event.time}
                  </span>
                </div>
                <p className="mt-1 font-inter text-xs text-[#444840]">{event.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <p className="flex items-center gap-2 font-inter text-[11px] text-[#75786f]">
          <CalendarDays size={14} aria-hidden="true" /> All names, dates, and identifiers on this
          screen are illustrative.
        </p>
      </div>
    </div>
  );
}
