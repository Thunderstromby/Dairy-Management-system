import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Info,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

const CARD = 'rounded-xl bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';

const STAGES = [
  { label: 'Stage 01 • Completed', title: 'Register Customer', note: 'Customer 01 · illustrative' },
  {
    label: 'Stage 02 • Completed',
    title: 'Create Farm Workspace',
    note: 'Workspace 01 · illustrative',
  },
  {
    label: 'Stage 03 • Completed',
    title: 'Provision Farm Admin',
    note: 'Farm Admin 01 · illustrative',
  },
] as const;

const PROFILE = [
  { label: 'Assigned System Role', value: 'Farm Admin (workspace-scoped)', icon: ShieldCheck },
  { label: 'Login Identifier / Work Email', value: 'contact@example.invalid', icon: Mail },
  {
    label: 'MFA Requirement Policy',
    value: 'Approval-gated — no policy claimed',
    icon: LockKeyhole,
  },
  { label: 'Workspace Scope', value: 'Single workspace (illustrative)', icon: Building2 },
] as const;

export function FarmAdminAccountProvisionedSuccessfully() {
  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]"
      >
        <span className="text-[#556249]">Farm Admin Accounts</span>
        <span aria-hidden="true">/</span>
        <span>Provision Farm Admin</span>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-[#46583b]">Illustrative state</span>
        <span className="ml-auto rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
          No record created
        </span>
      </nav>

      <section className={`${CARD} p-5 sm:p-6`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#46583b] text-white shadow-sm">
              <CheckCircle2 size={32} aria-hidden="true" />
            </span>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#46583b]/10 px-2 py-0.5 font-inter text-[11px] font-bold uppercase tracking-wide text-[#46583b]">
                  Provisioning complete · illustrative
                </span>
                <span className="rounded-full bg-[#d9e8c7]/50 px-2 py-0.5 font-inter text-[11px] text-[#556249]">
                  Stage 03 verified in preview
                </span>
              </div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#191d18]">
                Farm Admin Account Provisioned Successfully
              </h1>
              <p className="max-w-3xl font-inter text-sm text-[#444840]">
                Illustrative confirmation state from the visual reference. No account was prepared,
                no credentials were bound, and no authority was delegated by this prototype.
              </p>
              <p className="flex items-center gap-1.5 font-inter text-xs text-[#7a461c]">
                <Info size={15} aria-hidden="true" /> Prototype confirmation only — no
                session-staged record exists.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={LABEL}>Timestamp</span>
            <p className="font-inter text-sm font-semibold tabular-nums text-[#191d18]">
              No timestamp
            </p>
            <p className="mt-1 rounded-lg bg-[#f2f5ed] px-2 py-1 font-inter text-[11px] text-[#556249]">
              Illustrative state only
            </p>
          </div>
        </div>
      </section>

      <section className={`${CARD} p-5`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-heading text-sm font-semibold text-[#191d18]">
            <UserRound size={18} aria-hidden="true" className="text-[#46583b]" /> 3-Stage Manual
            Onboarding Workflow
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#46583b] px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-wider text-white">
            <Check size={15} aria-hidden="true" /> Illustrative pipeline 3 of 3
          </span>
        </div>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {STAGES.map((stage) => (
            <li key={stage.label} className="flex items-start gap-3 rounded-lg bg-[#f2f5ed] p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#46583b] text-white">
                <Check size={18} aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className={LABEL}>{stage.label}</span>
                <span className="truncate font-heading text-sm font-semibold text-[#191d18]">
                  {stage.title}
                </span>
                <span className="font-inter text-xs text-[#444840]">{stage.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <section className={`${CARD} overflow-hidden lg:col-span-7`}>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
            <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
              <UserRound size={20} aria-hidden="true" className="text-[#46583b]" /> Confirmed Farm
              Admin Identity
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#d9e8c7]/40 px-2 py-0.5 font-inter text-[11px] font-semibold text-[#5b694e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#46583b]" aria-hidden="true" /> Pending
              initial sign-in (illustrative)
            </span>
          </div>
          <div className="space-y-5 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#ecefe7] font-heading text-lg font-bold text-[#46583b]">
                  FA
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-semibold text-[#191d18]">
                      Farm Admin 01
                    </span>
                    <CheckCircle2 size={18} aria-hidden="true" className="text-[#46583b]" />
                  </div>
                  <p className="font-inter text-sm text-[#444840]">Farm Operations Lead</p>
                  <p className="font-inter text-[11px] text-[#75786f]">
                    Assigned to rotary systems &amp; milking parlors (illustrative)
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-[#f2f5ed] p-3">
                <span className={LABEL}>Account ID</span>
                <p className="font-inter text-sm font-bold tabular-nums text-[#191d18]">FA-0001</p>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PROFILE.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="space-y-1 rounded-lg bg-[#f2f5ed] p-4">
                    <dt className={`${LABEL} flex items-center gap-1`}>
                      <Icon size={15} aria-hidden="true" /> {item.label}
                    </dt>
                    <dd className="font-heading text-sm font-medium text-[#191d18]">
                      {item.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <div className="space-y-2 rounded-lg bg-[#ecefe7] p-4">
              <h3 className={LABEL}>Account provisioning state checklist (illustrative)</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {['Organization record', 'Workspace assignment', 'Audit note'].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 font-inter text-xs text-[#191d18]"
                  >
                    <CheckCircle2 size={16} aria-hidden="true" className="text-[#46583b]" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6 lg:col-span-5">
          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Building2 size={20} aria-hidden="true" className="text-[#556249]" /> Bound Customer
                Organization
              </h2>
              <span className="font-inter text-[11px] font-semibold tabular-nums text-[#75786f]">
                CUST-0001
              </span>
            </div>
            <div className="space-y-3 p-5">
              <div>
                <h3 className="font-heading text-base font-semibold text-[#191d18]">Customer 01</h3>
                <p className="font-inter text-xs text-[#444840]">
                  Illustrative regional enterprise
                </p>
              </div>
              <dl className="space-y-2 font-inter text-xs">
                {[
                  ['Primary Liaison', 'Liaison 01'],
                  ['Liaison Contact', 'contact@example.invalid'],
                  ['Account Manager', 'Not attributed'],
                ].map(([term, value]) => (
                  <div key={term} className="flex justify-between gap-3 py-1">
                    <dt className="text-[#75786f]">{term}:</dt>
                    <dd className="text-right font-medium text-[#191d18]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center justify-between bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Building2 size={20} aria-hidden="true" className="text-[#556249]" /> Assigned
                Operational Workspace
              </h2>
              <span className="font-inter text-[11px] font-semibold tabular-nums text-[#75786f]">
                WS-0001
              </span>
            </div>
            <div className="space-y-3 p-5">
              <div>
                <h3 className="font-heading text-base font-semibold text-[#191d18]">
                  Workspace 01
                </h3>
                <p className="font-inter text-xs text-[#444840]">
                  72-Stall Rotary Milking Parlor · illustrative
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-[#f2f5ed] p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ecefe7] text-[#46583b]">
                  <Building2 size={20} aria-hidden="true" />
                </span>
                <div>
                  <span className={LABEL}>Physical Location</span>
                  <p className="font-inter text-sm font-semibold text-[#191d18]">
                    Illustrative building descriptor
                  </p>
                  <p className="font-inter text-[11px] text-[#75786f]">
                    No telemetry is represented
                  </p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section
        className={`${CARD} flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between`}
      >
        <p className="flex items-center gap-2 font-inter text-sm text-[#191d18]">
          <ShieldCheck size={20} aria-hidden="true" className="text-[#46583b]" />
          Illustrative configuration complete. No administrative governance action has occurred.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#ecefe7] px-3 py-2 font-inter text-xs font-medium text-[#191d18] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to Farm Admin Accounts
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#f2f5ed] px-3 py-2 font-inter text-xs font-medium text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <Building2 size={16} aria-hidden="true" /> View Associated Workspace
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-3 py-2 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
          >
            View Farm Admin Account <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <aside className="flex items-start gap-3 rounded-xl bg-[#f2f5ed] p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecefe7] text-[#7a461c]">
          <LockKeyhole size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-sm font-semibold text-[#191d18]">
            Super Admin Security &amp; Privacy Advisory
          </h2>
          <p className="mt-1 font-inter text-xs leading-relaxed text-[#444840]">
            Access credentials and login instructions must follow approved organizational security
            protocols in the real product. Farm worker records and daily herd management belong
            inside the workspace application, not the platform console.
          </p>
          <p className="mt-1 font-inter text-[11px] text-[#75786f]">
            Reference: illustrative state only — no protocol or audit claim is made.
          </p>
        </div>
      </aside>
    </div>
  );
}
