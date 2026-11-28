import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Info,
  Mail,
  Phone,
  Users,
} from 'lucide-react';

const CARD = 'rounded-xl bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';

const STEPS = [
  { number: '01', label: 'Step 01 • Completed', title: 'Register Customer', state: 'done' },
  { number: '02', label: 'Step 02 • Immediate', title: 'Create Farm Workspace', state: 'next' },
  { number: '03', label: 'Step 03 • Queued', title: 'Provision Farm Admin', state: 'pending' },
] as const;

const FIELDS = [
  {
    label: 'Primary Contact',
    value: 'Liaison 01',
    note: 'Illustrative authorized representative',
    icon: BadgeCheck,
  },
  {
    label: 'Registration Date',
    value: 'Example date',
    note: 'Illustrative state preview',
    icon: Info,
  },
  {
    label: 'Contact Email',
    value: 'contact-01@example.invalid',
    note: 'Illustrative notice address',
    icon: Mail,
  },
  {
    label: 'Contact Phone',
    value: '+00 000 000 0000',
    note: 'Illustrative direct line',
    icon: Phone,
  },
] as const;

export function CustomerRegisteredSuccessfully() {
  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-inter text-xs text-[#444840]"
        >
          <span className="flex items-center gap-1 text-[#556249]">
            <Users size={15} aria-hidden="true" /> Customers
          </span>
          <span className="text-[#c4c8bd]">/</span>
          <span>Register Customer</span>
          <span className="text-[#c4c8bd]">/</span>
          <span className="font-semibold text-[#46583b]">Illustrative state</span>
        </nav>
        <span className="rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
          Illustrative state preview — no record created
        </span>
      </header>

      <section
        className={`${CARD} flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between`}
      >
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#d9e8c7] text-[#46583b] shadow-sm sm:h-16 sm:w-16">
            <Check size={32} aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <p className="font-inter text-[11px] font-semibold uppercase tracking-wider text-[#556249]">
              Customer record staged — illustrative only
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
              Customer Registered Successfully
            </h1>
            <p className="max-w-2xl font-inter text-sm text-[#444840]">
              This is an illustrative confirmation state from the visual reference. No customer was
              created, no identifier was issued, and nothing was saved by this prototype.
            </p>
          </div>
        </div>
      </section>

      <section className={`${CARD} p-5 sm:p-6`}>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
          <div>
            <span className={LABEL}>Provisioning Sequence</span>
            <h2 className="font-heading text-base font-semibold text-[#191d18]">
              Workspace Provisioning Pipeline
            </h2>
          </div>
          <span className="rounded bg-[#f2f5ed] px-3 py-1 font-inter text-[11px] text-[#556249]">
            Illustrative stage 1 of 3
          </span>
        </div>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className={`flex items-center gap-3 rounded-lg p-3 ${
                step.state === 'done'
                  ? 'bg-[#f2f5ed]'
                  : step.state === 'next'
                    ? 'bg-[#46583b]/10'
                    : 'bg-[#fff] opacity-70'
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold ${
                  step.state === 'pending'
                    ? 'bg-[#ecefe7] text-[#75786f]'
                    : 'bg-[#46583b] text-white'
                }`}
              >
                {step.state === 'done' ? <Check size={18} aria-hidden="true" /> : step.number}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className={LABEL}>{step.label}</span>
                <span className="truncate font-heading text-sm font-semibold text-[#191d18]">
                  {step.title}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <section className={`${CARD} overflow-hidden lg:col-span-8`}>
          <div className="flex items-center justify-between gap-2 bg-[#f2f5ed] px-5 py-4">
            <div className="flex items-center gap-2">
              <Building2 size={22} aria-hidden="true" className="text-[#556249]" />
              <h2 className="font-heading text-base font-semibold text-[#191d18]">
                Registered Customer Summary
              </h2>
            </div>
            <span className="font-inter text-[11px] text-[#75786f]">Illustrative preview</span>
          </div>
          <div className="flex flex-col gap-6 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className={LABEL}>Enterprise Organization</span>
                <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-[#191d18]">
                  Customer 01
                </h3>
                <p className="font-inter text-xs text-[#556249]">
                  Illustrative commercial dairy organization
                </p>
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-lg bg-[#d9e8c7]/50 px-3 py-1.5 text-[#5b694e] sm:self-center">
                <span className="h-2 w-2 rounded-full bg-[#556249]" aria-hidden="true" />
                <span className="font-inter text-[11px] font-semibold uppercase tracking-wider">
                  Active · awaiting workspace setup
                </span>
              </span>
            </div>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FIELDS.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.label} className="space-y-1 rounded-lg bg-[#f2f5ed] p-4">
                    <dt className={`${LABEL} flex items-center gap-1`}>
                      <Icon size={15} aria-hidden="true" /> {field.label}
                    </dt>
                    <dd className="font-heading text-sm font-semibold text-[#191d18]">
                      {field.value}
                    </dd>
                    <dd className="font-inter text-xs text-[#444840]">{field.note}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        <aside className="flex flex-col gap-4 lg:col-span-4">
          <section className="space-y-3 rounded-xl bg-[#fff] p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-inter text-[11px] font-bold uppercase tracking-wider text-[#7a461c]">
              <Info size={18} aria-hidden="true" /> Super Admin Notice
            </h2>
            <h3 className="font-heading text-sm font-semibold text-[#191d18]">
              Manual Workspace Binding Required
            </h3>
            <p className="font-inter text-xs leading-relaxed text-[#444840]">
              SmartFarm does not automatically create workspaces or provision administrator accounts
              in this prototype. The next steps below are illustrative and perform no action.
            </p>
            <p className="rounded bg-[#f2f5ed] px-3 py-2 font-inter text-[11px] text-[#75786f]">
              No auto-generated passwords are sent.
            </p>
          </section>

          <section className="space-y-3 rounded-xl bg-[#fff] p-5 shadow-sm">
            <h2 className={LABEL}>Recommended Actions</h2>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#46583b] font-inter text-xs font-semibold text-white transition-colors duration-200 motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
            >
              <Building2 size={18} aria-hidden="true" /> Create Farm Workspace
            </button>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#c4c8bd] bg-[#fff] font-inter text-xs font-medium text-[#191d18] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#f2f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <ArrowLeft size={18} aria-hidden="true" /> Back to Customers
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#556249] hover:text-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              View Customer Details <ArrowRight size={15} aria-hidden="true" />
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}
