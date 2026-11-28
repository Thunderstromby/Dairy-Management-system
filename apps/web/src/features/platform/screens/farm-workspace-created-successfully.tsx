import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Info,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';

const CARD = 'rounded-xl bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';

const STEPS = [
  { label: 'Step 01 • Completed', title: 'Register Customer', note: 'Customer 01 · illustrative' },
  {
    label: 'Step 02 • Completed',
    title: 'Create Farm Workspace',
    note: 'Workspace 01 · illustrative',
  },
  { label: 'Step 03 • Next', title: 'Provision Farm Admin', note: 'Assign operations authority' },
] as const;

const DETAILS = [
  { label: 'Workspace Name', value: 'Workspace 01' },
  { label: 'Workspace Identifier', value: 'WS-0001 · draft reference' },
  { label: 'Facility & Operational Type', value: '72-Stall Rotary Milking Parlor' },
  { label: 'Current Operational Status', value: 'Active (pending admin assignment)' },
  { label: 'Physical Location', value: 'Illustrative building and parcel descriptor' },
  { label: 'Provisioned Timestamp', value: 'No timestamp — illustrative state' },
  { label: 'Super Admin Author', value: 'Not attributed in this prototype' },
] as const;

export function FarmWorkspaceCreatedSuccessfully() {
  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#fff] px-4 py-3 shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]">
          <span>Workspaces</span>
          <span className="text-[#c4c8bd]">/</span>
          <span>Create Workspace</span>
          <span className="text-[#c4c8bd]">/</span>
          <span className="font-semibold text-[#46583b]">Confirmation</span>
        </div>
        <span className="rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
          Illustrative state preview
        </span>
      </nav>

      <section className={`${CARD} p-5 sm:p-6`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#46583b] text-white shadow-sm">
              <CheckCircle2 size={32} aria-hidden="true" />
            </span>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-bold tracking-tight text-[#191d18]">
                  Farm Workspace Created Successfully
                </h1>
                <span className="rounded-lg bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#5b694e]">
                  RECORD REF: illustrative
                </span>
              </div>
              <p className="max-w-3xl font-inter text-sm text-[#444840]">
                Illustrative confirmation state from the visual reference. No workspace was created,
                no identifier was reserved, and no operational boundary was established by this
                prototype.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#f2f5ed] px-4 py-3">
            <Check size={20} aria-hidden="true" className="text-[#46583b]" />
            <div>
              <span className={LABEL}>Illustrative entity state</span>
              <p className="font-heading text-sm font-semibold text-[#191d18]">
                Draft preview only
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${CARD} flex flex-col gap-4 p-5`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-heading text-sm font-semibold text-[#191d18]">
            <Building2 size={18} aria-hidden="true" className="text-[#46583b]" /> Onboarding
            Pipeline Progression
          </h2>
          <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-semibold">
            Illustrative stage 2 of 3
          </span>
        </div>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className={`flex items-start gap-3 rounded-lg p-3 ${index === 2 ? 'bg-[#fff]' : 'bg-[#f2f5ed]'}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${index === 2 ? 'bg-[#ffdcc6] text-[#6c3a11]' : 'bg-[#46583b] text-white'}`}
              >
                {index === 2 ? (
                  <ArrowRight size={18} aria-hidden="true" />
                ) : (
                  <Check size={18} aria-hidden="true" />
                )}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className={LABEL}>{step.label}</span>
                <span className="truncate font-heading text-sm font-semibold text-[#191d18]">
                  {step.title}
                </span>
                <span className="font-inter text-xs text-[#444840]">{step.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Building2 size={20} aria-hidden="true" className="text-[#46583b]" /> Confirmed Farm
                Workspace Details
              </h2>
              <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-semibold tabular-nums">
                WS-0001
              </span>
            </div>
            <dl className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
              {DETAILS.map((detail) => (
                <div key={detail.label} className="space-y-1">
                  <dt className={LABEL}>{detail.label}</dt>
                  <dd className="font-heading text-sm font-medium text-[#191d18]">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <Building2 size={20} aria-hidden="true" className="text-[#46583b]" /> Associated
                Customer Organization
              </h2>
              <span className="font-inter text-[11px] font-semibold text-[#46583b]">
                Illustrative association
              </span>
            </div>
            <div className="space-y-4 p-5">
              <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <dt className={LABEL}>Customer Organization</dt>
                  <dd className="font-heading text-sm font-semibold text-[#191d18]">Customer 01</dd>
                </div>
                <div>
                  <dt className={LABEL}>Customer ID</dt>
                  <dd className="font-inter text-sm tabular-nums text-[#191d18]">CUST-0001</dd>
                </div>
                <div>
                  <dt className={LABEL}>Primary Liaison</dt>
                  <dd className="font-inter text-sm text-[#191d18]">
                    Liaison 01 · illustrative role
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Contact Email</dt>
                  <dd className="flex items-center gap-1.5 font-inter text-sm text-[#46583b]">
                    <Mail size={15} aria-hidden="true" /> contact@example.invalid
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Contact Telephone</dt>
                  <dd className="flex items-center gap-1.5 font-inter text-sm tabular-nums text-[#191d18]">
                    <Phone size={15} aria-hidden="true" /> +00 000 000 0000
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Corporate Status</dt>
                  <dd className="font-inter text-sm text-[#191d18]">
                    Illustrative verified record
                  </dd>
                </div>
              </dl>
              <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl bg-[#f2f5ed] text-center">
                <MapPin size={26} aria-hidden="true" className="text-[#556249]" />
                <span className="font-heading text-sm font-semibold text-[#191d18]">
                  Illustrative location reference
                </span>
                <span className="font-inter text-xs text-[#444840]">
                  No map image or external asset is loaded.
                </span>
              </div>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <ShieldCheck size={20} aria-hidden="true" className="text-[#46583b]" /> Assigned
                Farm Administrator Status
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#ffdad6] px-2 py-0.5 font-inter text-[11px] font-semibold text-[#93000a]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ba1a1a]" aria-hidden="true" />{' '}
                Unassigned
              </span>
            </div>
            <div className="flex flex-col items-center gap-3 bg-[#fff] px-5 py-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ecefe7] text-[#75786f]">
                <UserPlus size={28} aria-hidden="true" />
              </span>
              <h3 className="font-heading text-base font-semibold text-[#191d18]">
                No Farm Admin Account Bound Yet
              </h3>
              <p className="max-w-lg font-inter text-sm text-[#444840]">
                In the illustrative workflow, an authorized Farm Administrator would be provisioned
                next. No account or credential is created here.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-4 py-2 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
              >
                <UserPlus size={18} aria-hidden="true" /> Provision Farm Admin (draft preview only)
              </button>
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-4">
          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center gap-2 bg-[#f2f5ed] px-5 py-4">
              <ArrowRight size={18} aria-hidden="true" className="text-[#46583b]" />
              <h2 className="font-heading text-base font-semibold text-[#191d18]">
                Immediate Next Actions
              </h2>
            </div>
            <div className="space-y-2 p-5">
              <p className="font-inter text-xs text-[#444840]">
                Illustrative next steps in the three-stage onboarding sequence.
              </p>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#46583b] px-4 py-3 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
              >
                <UserPlus size={18} aria-hidden="true" /> Provision Farm Admin
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#f2f5ed] px-4 py-2.5 font-inter text-xs font-medium text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                View Workspace Details
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 font-inter text-xs font-medium text-[#556249] hover:bg-[#f2f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <ArrowLeft size={15} aria-hidden="true" /> Back to Workspaces
              </button>
            </div>
          </section>

          <section className={`${CARD} overflow-hidden`}>
            <div className="flex items-center gap-2 bg-[#f2f5ed] px-5 py-4">
              <Info size={18} aria-hidden="true" className="text-[#7a461c]" />
              <h2 className="font-heading text-base font-semibold text-[#191d18]">
                Super Admin Advisory
              </h2>
            </div>
            <div className="space-y-3 p-5">
              <div>
                <h3 className="font-heading text-sm font-semibold text-[#191d18]">
                  Manual Admin Binding Required
                </h3>
                <p className="mt-1 font-inter text-xs leading-relaxed text-[#444840]">
                  No administrator credentials or invitations are generated by this prototype.
                  Provisioning remains a separate, approval-gated operation.
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-[#f2f5ed] p-3">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#46583b]"
                />
                <div>
                  <span className={LABEL}>Security Note</span>
                  <p className="font-inter text-xs text-[#444840]">
                    Access control is enforced by the server in the real product; this screen is a
                    visual reference only.
                  </p>
                </div>
              </div>
              <div className="flex justify-between font-inter text-[11px] tabular-nums text-[#75786f]">
                <span>Audit trail: illustrative</span>
                <span>Policy: not claimed</span>
              </div>
            </div>
          </section>

          <section className={`${CARD} p-5`}>
            <h2 className={LABEL}>Workspace Lifecycle Status</h2>
            <dl className="mt-3 space-y-2 font-inter text-xs">
              {[
                ['Linked Customer', 'Customer 01 · illustrative'],
                ['Workspace State', 'Illustrative active draft'],
                ['Next Required Step', 'Step 03 (Farm Admin)'],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="flex justify-between gap-3 border-b border-[#ecefe7] py-1.5 last:border-0"
                >
                  <dt className="text-[#75786f]">{term}</dt>
                  <dd className="text-right font-medium text-[#191d18]">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 flex items-center gap-2 font-inter text-[11px] text-[#75786f]">
              <CheckCircle2 size={14} aria-hidden="true" /> Illustrative state only — no record is
              active.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
