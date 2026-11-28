import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ChevronRight,
  Download,
  History,
  Info,
  LockKeyhole,
  MapPin,
  Settings2,
  ShieldCheck,
  UserPlus,
  Users,
  Wrench,
} from 'lucide-react';

const CARD = 'rounded-xl bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';

const FACTS = [
  { label: 'Associated Customer', value: 'Customer 01', note: 'CUST-0001 · illustrative' },
  {
    label: 'Primary Facility',
    value: 'Rotary Milking Facility',
    note: 'Illustrative facility label',
  },
  { label: 'Assigned Farm Admin', value: 'Farm Admin 01', note: 'Illustrative assignment' },
  { label: 'Provisioned Date', value: 'Example date', note: 'No persisted record' },
  { label: 'Operational Status', value: 'Active', note: 'Illustrative status label' },
] as const;

const SPECS = [
  {
    label: 'Facility Type',
    value: '72-Stall Rotary Milking Parlor',
    note: 'Illustrative facility category',
    icon: Settings2,
  },
  {
    label: 'Physical Location',
    value: 'Building B, Sector 4',
    note: 'Illustrative location descriptor',
    icon: MapPin,
  },
  {
    label: 'Facility Scope',
    value: 'Rotational Dairy Production Parlor',
    note: 'Illustrative scope label',
    icon: Building2,
  },
  {
    label: 'Operational Focus',
    value: 'High-Throughput Lactating Herd',
    note: 'No throughput figure is claimed',
    icon: Users,
  },
] as const;

const HISTORY = [
  {
    time: 'Example date · illustrative',
    tag: 'ASSIGN',
    title: 'Farm Admin 01 assigned',
    body: 'Illustrative assignment to Workspace 01.',
  },
  {
    time: 'Example date · illustrative',
    tag: 'BIND',
    title: 'Bound to Customer 01',
    body: 'Illustrative customer association established.',
  },
  {
    time: 'Example date · illustrative',
    tag: 'INIT',
    title: 'Initial workspace record created',
    body: 'Illustrative workspace record in the visual reference.',
  },
] as const;

export function WorkspaceDetails() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]"
      >
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[#556249] hover:text-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
        >
          <ArrowLeft size={15} aria-hidden="true" /> Workspaces
        </button>
        <span className="text-[#c4c8bd]">/</span>
        <span>Workspace Details</span>
        <span className="text-[#c4c8bd]">/</span>
        <span className="font-semibold text-[#191d18]">Workspace 01</span>
        <span className="rounded bg-[#ecefe7] px-1.5 py-0.5 font-inter text-[11px] font-semibold tabular-nums">
          WS-0001
        </span>
      </nav>

      <header
        className={`${CARD} flex flex-col gap-4 p-5 xl:flex-row xl:items-center xl:justify-between`}
      >
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#46583b]">
              Workspace 01
            </h1>
            <span className="rounded bg-[#ecefe7] px-2 py-1 font-inter text-[11px] font-semibold tabular-nums text-[#191d18]">
              WS-0001
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9e8c7]/40 px-2 py-1 font-inter text-[11px] font-semibold text-[#5b694e]">
              <span className="h-2 w-2 rounded-full bg-[#46583b]" aria-hidden="true" /> Active
              (illustrative)
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-[#f2f5ed] px-2 py-1 font-inter text-[11px] text-[#444840]">
              <Building2 size={15} aria-hidden="true" /> Rotary Milking Facility
            </span>
          </div>
          <p className="max-w-3xl font-inter text-sm text-[#444840]">
            Illustrative workspace detail view. Super Admin oversight shown here is limited to
            platform configuration and account assignment — no private farm data is displayed.
          </p>
          <span className="inline-flex w-fit rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
            Illustrative record
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#c4c8bd] bg-[#fff] px-3 py-2 font-inter text-xs font-medium text-[#191d18] hover:bg-[#f2f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <History size={16} aria-hidden="true" /> Audit Log
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#ecefe7] px-3 py-2 font-inter text-xs font-medium text-[#191d18] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <Users size={16} aria-hidden="true" /> Assign Farm Admin
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#46583b] px-3 py-2 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
          >
            <Wrench size={16} aria-hidden="true" /> Edit Workspace
          </button>
        </div>
      </header>

      <section
        aria-label="Illustrative workspace attributes"
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
      >
        {FACTS.map((fact) => (
          <article key={fact.label} className={`${CARD} flex flex-col gap-2 p-4`}>
            <span className={LABEL}>{fact.label}</span>
            <div className="flex flex-col">
              <span className="truncate font-heading text-sm font-semibold text-[#191d18]">
                {fact.value}
              </span>
              <span className="font-inter text-[11px] tabular-nums text-[#556249]">
                {fact.note}
              </span>
            </div>
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Building2 size={20} aria-hidden="true" className="text-[#46583b]" /> Associated
                Customer Organization
              </h2>
              <span className="font-inter text-[11px] font-semibold uppercase text-[#556249]">
                Parent entity
              </span>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ecefe7] font-heading text-sm font-bold text-[#46583b]">
                    C1
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-base font-bold text-[#191d18]">
                        Customer 01
                      </span>
                      <span className="rounded bg-[#f2f5ed] px-2 py-0.5 font-inter text-[11px] tabular-nums text-[#75786f]">
                        CUST-0001
                      </span>
                    </div>
                    <p className="font-inter text-xs text-[#444840]">
                      Illustrative commercial dairy organization
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#46583b] hover:text-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  View Customer Record <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
              <dl className="grid grid-cols-1 gap-4 rounded-xl bg-[#f2f5ed] p-4 sm:grid-cols-3">
                <div>
                  <dt className={LABEL}>Primary Contact</dt>
                  <dd className="mt-1 font-heading text-sm text-[#191d18]">Liaison 01</dd>
                  <dd className="font-inter text-xs text-[#444840]">Illustrative representative</dd>
                </div>
                <div>
                  <dt className={LABEL}>Direct Communication</dt>
                  <dd className="mt-1 font-inter text-sm text-[#46583b]">
                    contact@example.invalid
                  </dd>
                  <dd className="font-inter text-xs tabular-nums text-[#444840]">
                    +00 000 000 0000
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Other Bound Workspaces</dt>
                  <dd className="mt-1 flex items-center gap-1 font-heading text-sm text-[#191d18]">
                    <Building2 size={16} aria-hidden="true" /> Workspace 02
                  </dd>
                  <dd className="font-inter text-xs tabular-nums text-[#444840]">
                    WS-0002 · illustrative
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <ShieldCheck size={20} aria-hidden="true" className="text-[#46583b]" /> Assigned
                Farm Administrator
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9e8c7]/40 px-2 py-0.5 font-inter text-[11px] font-semibold text-[#5b694e]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#46583b]" aria-hidden="true" />{' '}
                Illustrative account
              </span>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#46583b] font-heading text-sm font-bold text-white">
                    FA
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-base font-bold text-[#191d18]">
                        Farm Admin 01
                      </span>
                      <ShieldCheck size={18} aria-hidden="true" className="text-[#46583b]" />
                    </div>
                    <span className="font-inter text-sm text-[#556249]">Farm Operations Lead</span>
                    <span className="block font-inter text-[11px] text-[#75786f]">
                      Assigned via illustrative provisioning flow
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-[#ecefe7] px-3 py-1.5 font-inter text-xs font-medium text-[#191d18] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    Reassign Farm Admin
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-[#46583b] px-3 py-1.5 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
                  >
                    View Admin Account <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['Assigned Email', 'contact@example.invalid'],
                  ['Direct Mobile', '+00 000 000 0000'],
                  ['Bound Date', 'Example date'],
                ].map(([term, value]) => (
                  <div key={term} className="rounded-lg bg-[#f2f5ed] p-3">
                    <dt className={LABEL}>{term}</dt>
                    <dd className="mt-1 font-inter text-sm font-medium text-[#191d18]">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#ecefe7] p-3">
                <span className="flex items-center gap-2 font-inter text-xs text-[#444840]">
                  <Info size={18} aria-hidden="true" className="text-[#7a461c]" />
                  Workspace assignment fallback shown for visual reference only.
                </span>
                <button
                  type="button"
                  className="rounded bg-[#fff] px-3 py-1 font-inter text-[11px] font-semibold text-[#46583b] shadow-sm hover:bg-[#f2f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  Provision Farm Admin
                </button>
              </div>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Settings2 size={20} aria-hidden="true" className="text-[#46583b]" /> Dairy Facility
                Specifications &amp; Scope
              </h2>
              <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                Illustrative specification
              </span>
            </div>
            <div className="space-y-5 p-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {SPECS.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="space-y-1 rounded-xl bg-[#f2f5ed] p-4">
                      <span className={`${LABEL} flex items-center gap-1`}>
                        <Icon size={16} aria-hidden="true" className="text-[#556249]" />{' '}
                        {spec.label}
                      </span>
                      <p className="font-heading text-sm font-bold text-[#191d18]">{spec.value}</p>
                      <p className="font-inter text-xs text-[#444840]">{spec.note}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex h-44 flex-col items-center justify-center gap-2 rounded-xl bg-[#f2f5ed] text-center">
                <Building2 size={28} aria-hidden="true" className="text-[#556249]" />
                <span className="font-heading text-sm font-semibold text-[#191d18]">
                  Illustrative facility reference
                </span>
                <span className="max-w-sm font-inter text-xs text-[#444840]">
                  A neutral placeholder replaces the exported photograph; no external image or
                  licensed asset is used.
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-[#ecefe7] p-4">
                <LockKeyhole
                  size={22}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#556249]"
                />
                <div>
                  <h3 className="font-heading text-sm font-semibold text-[#191d18]">
                    Customer Data Isolation
                  </h3>
                  <p className="mt-1 font-inter text-xs leading-relaxed text-[#444840]">
                    Per the approved role matrix, Super Admin access covers workspace metadata and
                    Farm Admin assignment only. Private operational herd or health records are not
                    part of this view.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-4">
          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <ShieldCheck size={20} aria-hidden="true" className="text-[#46583b]" />{' '}
                Administration Actions
              </h2>
              <span className={LABEL}>Controls</span>
            </div>
            <div className="space-y-3 p-5">
              <p className="rounded-lg bg-[#f2f5ed] px-3 py-2 font-inter text-[11px] text-[#444840]">
                All controls below are local draft previews; no access change is applied.
              </p>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#46583b] px-4 py-2.5 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
              >
                <UserPlus size={18} aria-hidden="true" /> Provision Another Farm Admin
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ecefe7] px-4 py-2.5 font-inter text-xs font-medium text-[#191d18] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <Download size={18} aria-hidden="true" /> Export Workspace Config
              </button>
              <div className="space-y-2 rounded-xl bg-[#f2f5ed] p-4">
                <span className="flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-wider text-[#7a461c]">
                  <Info size={16} aria-hidden="true" /> Lifecycle Maintenance Zone
                </span>
                <p className="font-inter text-xs text-[#444840]">
                  Suspension would revoke Farm Admin access to this workspace in the real product.
                </p>
                <button
                  type="button"
                  className="w-full rounded-lg border border-[#ba1a1a]/30 bg-[#ffdad6] px-4 py-2 font-inter text-xs font-semibold text-[#93000a] hover:bg-[#ba1a1a]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba1a1a]"
                >
                  Deactivate Workspace (draft preview only)
                </button>
              </div>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <LockKeyhole size={20} aria-hidden="true" className="text-[#46583b]" /> Tenant
                Isolation &amp; Privacy
              </h2>
              <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-semibold uppercase text-[#556249]">
                Scoped
              </span>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center gap-3 rounded-xl bg-[#f2f5ed] p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ecefe7] text-[#46583b]">
                  <ShieldCheck size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-[#191d18]">
                    Customer Data Isolation
                  </p>
                  <p className="font-inter text-[11px] text-[#556249]">
                    Workspace-scoped access only
                  </p>
                </div>
              </div>
              <p className="font-inter text-xs leading-relaxed text-[#444840]">
                Farm records within WS-0001 belong to the customer organization. Super Admin
                oversight is limited to workspace configuration and Farm Admin provisioning, as
                required by the permission matrix.
              </p>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <History size={20} aria-hidden="true" className="text-[#46583b]" /> Provisioning
                History
              </h2>
              <span className={LABEL}>3 illustrative records</span>
            </div>
            <ol className="space-y-5 p-5">
              {HISTORY.map((entry) => (
                <li key={entry.tag} className="relative border-l-2 border-[#e0e4dc] pl-5">
                  <span
                    className="absolute -left-[0.42rem] top-1 h-3.5 w-3.5 rounded-full bg-[#46583b]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-inter text-[11px] font-semibold tabular-nums text-[#556249]">
                      {entry.time}
                    </span>
                    <span className="rounded bg-[#f2f5ed] px-1.5 py-0.5 font-inter text-[11px] text-[#75786f]">
                      {entry.tag}
                    </span>
                  </div>
                  <p className="mt-1 font-heading text-sm font-semibold text-[#191d18]">
                    {entry.title}
                  </p>
                  <p className="font-inter text-xs text-[#444840]">{entry.body}</p>
                </li>
              ))}
              <li className="pt-2 text-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#556249] hover:text-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  View Full Audit Ledger <ChevronRight size={14} aria-hidden="true" />
                </button>
              </li>
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
