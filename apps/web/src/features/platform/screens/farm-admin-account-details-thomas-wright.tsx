import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  History,
  Info,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';

const CARD = 'rounded-xl bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';

const FACTS = [
  {
    label: 'Assigned Workspace',
    value: 'Workspace 01',
    note: 'WS-0001 · illustrative',
    icon: Building2,
  },
  {
    label: 'Customer Organization',
    value: 'Customer 01',
    note: 'CUST-0001 · illustrative',
    icon: UserRound,
  },
  {
    label: 'Role Authority',
    value: 'Workspace-scoped admin',
    note: 'No cross-workspace authority',
    icon: ShieldCheck,
  },
  {
    label: 'Provisioning Event',
    value: 'Example date',
    note: 'No author attributed',
    icon: History,
  },
] as const;

const INFO = [
  { label: 'Full Legal Name', value: 'Farm Admin 01', icon: null },
  { label: 'Login Identifier', value: 'contact@example.invalid', icon: Mail },
  { label: 'Direct Mobile', value: '+00 000 000 0000', icon: Phone },
  { label: 'Designation', value: 'Farm Operations Lead', icon: null },
] as const;

const LOG = [
  {
    title: 'Account provisioned & bound',
    time: 'Example time',
    body: 'Illustrative account reference FA-0001 bound to WS-0001.',
  },
  {
    title: 'Customer tenant binding',
    time: 'Example time',
    body: 'Illustrative association with Customer 01 (CUST-0001).',
  },
] as const;

export function FarmAdminAccountDetails() {
  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]">
          <button
            type="button"
            className="inline-flex items-center gap-1 font-medium text-[#556249] hover:text-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Farm Admin Accounts
          </button>
          <span className="text-[#c4c8bd]">/</span>
          <span>Account Details</span>
          <span className="text-[#c4c8bd]">/</span>
          <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-semibold tabular-nums">
            FA-0001
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#ecefe7] px-3 py-1 font-inter text-[11px] uppercase tracking-wider text-[#444840]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#46583b]" aria-hidden="true" />{' '}
          Workspace-scoped role · illustrative
        </span>
      </nav>

      <header
        className={`${CARD} flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between`}
      >
        <div className="flex items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#46583b] font-heading text-lg font-bold tracking-tight text-white">
            FA
          </span>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
                Farm Admin details
              </h1>
              <span className="inline-flex items-center gap-1 rounded bg-[#46583b] px-2 py-0.5 font-inter text-[11px] font-semibold text-white">
                <ShieldCheck size={14} aria-hidden="true" /> Farm Admin
              </span>
              <span className="inline-flex items-center gap-1.5 rounded bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-semibold text-[#5b694e]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#46583b]" aria-hidden="true" /> Active
                (illustrative)
              </span>
            </div>
            <p className="max-w-2xl font-inter text-sm text-[#444840]">
              Illustrative administrator record provisioned for Workspace 01. No login or credential
              is represented.
            </p>
            <span className="inline-flex w-fit rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
              Illustrative record
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg bg-[#ecefe7] px-3 py-2 font-inter text-xs font-medium text-[#191d18] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            Edit Account
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#ecefe7] px-3 py-2 font-inter text-xs font-medium text-[#191d18] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            Reassign Workspace
          </button>
          <button
            type="button"
            className="rounded-lg border border-[#ba1a1a]/30 bg-[#ffdad6] px-3 py-2 font-inter text-xs font-semibold text-[#93000a] hover:bg-[#ba1a1a]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ba1a1a]"
          >
            Suspend Account (draft preview)
          </button>
        </div>
      </header>

      <section
        aria-label="Illustrative account facts"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {FACTS.map((fact) => {
          const Icon = fact.icon;
          return (
            <article key={fact.label} className={`${CARD} flex flex-col gap-2 p-4`}>
              <div className="flex items-center justify-between gap-2">
                <span className={LABEL}>{fact.label}</span>
                <Icon size={18} aria-hidden="true" className="text-[#75786f]" />
              </div>
              <span className="truncate font-heading text-sm font-semibold text-[#191d18]">
                {fact.value}
              </span>
              <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                {fact.note}
              </span>
            </article>
          );
        })}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <UserRound size={20} aria-hidden="true" className="text-[#46583b]" /> Account
                Information
              </h2>
              <span className={LABEL}>Identity profile</span>
            </div>
            <dl className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              {INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="space-y-1">
                    <dt className={LABEL}>{item.label}</dt>
                    <dd className="flex items-center gap-1.5 font-inter text-sm font-medium text-[#191d18]">
                      {Icon ? (
                        <Icon size={16} aria-hidden="true" className="text-[#75786f]" />
                      ) : null}
                      {item.value}
                    </dd>
                  </div>
                );
              })}
              <div className="space-y-1 sm:col-span-2">
                <dt className={LABEL}>Access Scope &amp; Operational Purpose</dt>
                <dd className="rounded-lg bg-[#f2f5ed] p-3 font-inter text-xs leading-relaxed text-[#444840]">
                  Authorized for administrative operations within the assigned workspace only. No
                  elevated access to platform configuration, finance, or other customer workspaces
                  is claimed here.
                </dd>
              </div>
            </dl>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Building2 size={20} aria-hidden="true" className="text-[#46583b]" /> Associated
                Customer Organization
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#46583b] hover:text-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                View Full Customer Details <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-4 p-5 sm:flex-row">
              <div className="flex h-28 w-full shrink-0 flex-col items-center justify-center gap-2 rounded-lg bg-[#f2f5ed] sm:w-36">
                <Building2 size={28} aria-hidden="true" className="text-[#556249]" />
                <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                  CUST-0001
                </span>
              </div>
              <dl className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <dt className={LABEL}>Organization Entity</dt>
                  <dd className="font-heading text-sm font-bold text-[#191d18]">Customer 01</dd>
                  <dd className="font-inter text-[11px] text-[#75786f]">
                    Illustrative enterprise record
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Primary Contact</dt>
                  <dd className="font-inter text-sm font-semibold text-[#191d18]">Liaison 01</dd>
                  <dd className="font-inter text-[11px] text-[#75786f]">
                    Illustrative representative
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className={LABEL}>Corporate Office</dt>
                  <dd className="mt-1 flex items-center gap-1.5 font-inter text-xs text-[#444840]">
                    <Building2 size={15} aria-hidden="true" /> Illustrative address descriptor
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Building2 size={20} aria-hidden="true" className="text-[#46583b]" /> Assigned Farm
                Workspace
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#46583b] hover:text-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                View Workspace Details <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex flex-col gap-3 rounded-xl bg-[#f2f5ed] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#46583b] text-white">
                    <Building2 size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-[#191d18]">Workspace 01</p>
                    <p className="font-inter text-[11px] tabular-nums text-[#75786f]">
                      WS-0001 · illustrative
                    </p>
                  </div>
                </div>
                <span className="w-fit rounded-lg bg-[#fff] px-2 py-1 font-inter text-[11px] font-semibold text-[#191d18] shadow-sm">
                  72-Stall Rotary Parlor
                </span>
              </div>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-[#f2f5ed] p-3">
                  <dt className={LABEL}>Physical Location</dt>
                  <dd className="font-inter text-sm text-[#191d18]">
                    Illustrative building descriptor
                  </dd>
                </div>
                <div className="rounded-lg bg-[#f2f5ed] p-3">
                  <dt className={LABEL}>Telemetry</dt>
                  <dd className="font-inter text-sm text-[#556249]">
                    Not represented in this prototype
                  </dd>
                </div>
              </dl>
              <div className="flex items-start gap-3 rounded-xl bg-[#ecefe7] p-4">
                <LockKeyhole
                  size={20}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#46583b]"
                />
                <div>
                  <h3 className="font-heading text-sm font-bold text-[#191d18]">
                    Tenancy Isolation Boundary
                  </h3>
                  <p className="mt-1 font-inter text-xs leading-relaxed text-[#444840]">
                    Access is described as scoped to WS-0001. Private operational herd, health, and
                    pay data are outside the Super Admin platform view under the approved permission
                    matrix.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-5">
          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <ShieldCheck size={20} aria-hidden="true" className="text-[#46583b]" /> Super Admin
                Actions
              </h2>
              <span className="h-2 w-2 rounded-full bg-[#46583b]" aria-hidden="true" />
            </div>
            <div className="space-y-2 p-5">
              <p className="rounded-lg bg-[#f2f5ed] px-3 py-2 font-inter text-[11px] text-[#444840]">
                Access-changing actions below are labelled as local draft previews; none is applied.
              </p>
              {[
                {
                  title: 'Reset Access Token / Credentials',
                  note: 'Approval-gated in the real product',
                  icon: KeyRound,
                },
                {
                  title: 'Update Operational Scope',
                  note: 'Scope changes require confirmation',
                  icon: SlidersHorizontal,
                },
                {
                  title: 'Audit Activity Trail',
                  note: 'Illustrative log entries only',
                  icon: History,
                },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.title}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl bg-[#f2f5ed] p-3 text-left transition-colors duration-200 motion-reduce:transition-none hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e0e4dc] text-[#191d18]">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-heading text-sm font-semibold text-[#191d18]">
                          {action.title}
                        </span>
                        <span className="font-inter text-[11px] text-[#75786f]">{action.note}</span>
                      </span>
                    </span>
                    <ChevronRight size={20} aria-hidden="true" className="text-[#75786f]" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <ShieldCheck size={20} aria-hidden="true" className="text-[#46583b]" /> Role
                Boundaries &amp; SRS Matrix
              </h2>
              <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#556249]">
                Scoped
              </span>
            </div>
            <div className="space-y-3 p-5">
              <div className="space-y-1 rounded-xl bg-[#d9e8c7]/30 p-3">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-[#46583b]">
                  <CheckCircle2 size={18} aria-hidden="true" /> Farm Admin Authorized Purview
                </h3>
                <p className="font-inter text-xs leading-relaxed text-[#444840]">
                  Administrative actions are limited to the assigned workspace. No approval of
                  leave, stock correction, or access to payroll or finance is implied for this role
                  beyond the matrix.
                </p>
              </div>
              <div className="space-y-1 rounded-xl bg-[#ecefe7] p-3">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-[#191d18]">
                  <Info size={18} aria-hidden="true" /> Super Admin Architectural Boundary
                </h3>
                <p className="font-inter text-xs leading-relaxed text-[#444840]">
                  Platform administration does not include routine access to private farm
                  operational records, health logs, or yield data. This screen shows workspace
                  metadata only.
                </p>
              </div>
              <div className="flex flex-wrap justify-between gap-2 font-inter text-[11px] text-[#75786f]">
                <span>Scope: workspace metadata only</span>
                <span className="flex items-center gap-1 text-[#46583b]">
                  <span className="h-2 w-2 rounded-full bg-[#46583b]" aria-hidden="true" />{' '}
                  Illustrative
                </span>
              </div>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <History size={20} aria-hidden="true" className="text-[#46583b]" /> Administrative
                Provisioning Log
              </h2>
              <span className="font-inter text-[11px] font-semibold uppercase tabular-nums text-[#75786f]">
                2 illustrative records
              </span>
            </div>
            <ol className="space-y-4 p-5">
              {LOG.map((entry) => (
                <li key={entry.title} className="relative border-l-2 border-[#e0e4dc] pl-5">
                  <span
                    className="absolute -left-[0.4rem] top-1 h-3.5 w-3.5 rounded-full bg-[#46583b]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-heading text-sm font-semibold text-[#191d18]">
                      {entry.title}
                    </span>
                    <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                      {entry.time}
                    </span>
                  </div>
                  <p className="mt-1 font-inter text-xs text-[#444840]">{entry.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
