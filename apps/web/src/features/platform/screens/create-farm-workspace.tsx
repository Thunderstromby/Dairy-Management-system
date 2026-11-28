import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  FileText,
  Info,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

const CARD = 'rounded-xl bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';
const INPUT =
  'w-full rounded-lg border border-[#c4c8bd] bg-[#fff] px-3 py-2 font-inter text-sm text-[#191d18] placeholder:text-[#75786f] outline-none transition-colors duration-200 motion-reduce:transition-none focus:border-[#46583b] focus:ring-2 focus:ring-[#46583b]/20';

const CUSTOMER_OPTIONS = [
  {
    id: 'CUST-0001',
    name: 'Customer 01',
    contact: 'Liaison 01',
    workspaces: '2 illustrative workspaces',
  },
  {
    id: 'CUST-0002',
    name: 'Customer 02',
    contact: 'Liaison 02',
    workspaces: '5 illustrative workspaces',
  },
  {
    id: 'CUST-0003',
    name: 'Customer 03',
    contact: 'Liaison 03',
    workspaces: '1 illustrative workspace',
  },
] as const;

export function CreateFarmWorkspace() {
  const [name, setName] = useState('Workspace 01');
  const [code, setCode] = useState('WS-0001');
  const [facility, setFacility] = useState('rotary');
  const [address, setAddress] = useState('Illustrative facility address');
  const [notes, setNotes] = useState('Illustrative scope notes for this draft workspace.');
  const [customerIndex, setCustomerIndex] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; code?: string }>({});
  const [status, setStatus] = useState<string>();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const customer = CUSTOMER_OPTIONS[customerIndex];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: { name?: string; code?: string } = {};
    if (!name.trim()) next.name = 'Workspace / Dairy Facility Name is required.';
    if (!code.trim()) next.code = 'A draft workspace code is required.';
    setErrors(next);
    setStatus(
      Object.keys(next).length === 0
        ? 'Local draft validated. No workspace was created and no identifier was reserved.'
        : 'Correct the highlighted fields. This is local draft validation only.',
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-3">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]"
        >
          <span>Customers</span>
          <span className="text-[#c4c8bd]">/</span>
          <span>Workspaces</span>
          <span className="text-[#c4c8bd]">/</span>
          <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-semibold text-[#191d18]">
            Create Farm Workspace
          </span>
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#e6e9e1] px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#191d18]">
            <span className="h-2 w-2 rounded-full bg-[#7a461c]" aria-hidden="true" /> Step 2 of 3:
            Workspace Setup
          </span>
          <span className="rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
            Local draft • nothing saved
          </span>
        </div>
        <div className={`${CARD} p-6`}>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#5b694e]">
              Farm Setup Wizard
            </span>
            <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
              Workspace Management
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
            Create Farm Workspace
          </h1>
          <p className="mt-1 max-w-3xl font-inter text-sm text-[#444840]">
            Configure a distinct dairy operational unit for the selected customer organization. This
            screen is an illustrative form shell; no workspace, code, or boundary is created or
            reserved.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <section className={`${CARD} p-6`}>
            <div className="-mx-6 -mt-6 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-t-xl bg-[#f2f5ed] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#46583b] font-heading text-xs font-bold text-white">
                  1
                </span>
                <div>
                  <h2 className="font-heading text-base font-semibold text-[#191d18]">
                    Customer Association
                  </h2>
                  <p className="font-inter text-xs text-[#444840]">
                    Select the illustrative customer for this draft workspace.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-[#fff] px-2.5 py-1 font-inter text-[11px] font-semibold text-[#46583b] shadow-sm">
                <CheckCircle2 size={14} aria-hidden="true" /> Pre-Bound (illustrative)
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#f2f5ed] p-3.5">
              <span className="flex items-center gap-2 font-inter text-xs text-[#191d18]">
                <CheckCircle2 size={18} aria-hidden="true" className="text-[#46583b]" />
                Customer preselected from the illustrative registration workflow.
              </span>
              <button
                type="button"
                onClick={() => setPickerOpen((open) => !open)}
                aria-expanded={pickerOpen}
                className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#7a461c] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a461c]"
              >
                Change Customer
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <h3 className={LABEL}>Selected Parent Organization</h3>
              <div className="rounded-xl border border-[#ecefe7] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ecefe7] text-[#46583b]">
                      <Building2 size={24} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading text-base font-bold text-[#191d18]">
                          {customer.name}
                        </span>
                        <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-semibold tabular-nums text-[#75786f]">
                          {customer.id}
                        </span>
                        <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-bold uppercase text-[#5b694e]">
                          Active (illustrative)
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-4 font-inter text-xs text-[#444840]">
                        <span>{customer.workspaces}</span>
                        <span>
                          Primary Contact:{' '}
                          <strong className="font-medium text-[#191d18]">{customer.contact}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className={LABEL}>Customer ID</span>
                    <span className="font-inter text-sm font-bold tabular-nums text-[#46583b]">
                      {customer.id}
                    </span>
                  </div>
                </div>
              </div>

              {pickerOpen ? (
                <div className="space-y-2 rounded-lg border border-[#c4c8bd] p-3">
                  <label htmlFor="customer-picker" className="sr-only">
                    Search customer directory
                  </label>
                  <input
                    id="customer-picker"
                    type="search"
                    placeholder="Search illustrative customer directory..."
                    className={INPUT}
                  />
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {CUSTOMER_OPTIONS.map((option, index) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setCustomerIndex(index);
                          setPickerOpen(false);
                        }}
                        className={`rounded-lg p-2.5 text-left shadow-sm transition-colors duration-200 motion-reduce:transition-none hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
                          index === customerIndex
                            ? 'bg-[#fff] ring-1 ring-[#46583b]'
                            : 'bg-[#f2f5ed]'
                        }`}
                      >
                        <span className="block font-heading text-xs font-bold text-[#191d18]">
                          {option.name}
                        </span>
                        <span className="block font-inter text-[11px] tabular-nums text-[#75786f]">
                          {option.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <dl className="grid grid-cols-1 gap-3 rounded-lg bg-[#f2f5ed] p-3 sm:grid-cols-3">
                <div>
                  <dt className={LABEL}>Confirmed Contact Email</dt>
                  <dd className="font-inter text-xs text-[#191d18]">contact@example.invalid</dd>
                </div>
                <div>
                  <dt className={LABEL}>Account Phone / Contact</dt>
                  <dd className="font-inter text-xs tabular-nums text-[#191d18]">
                    +00 000 000 0000
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Customer Status</dt>
                  <dd className="font-inter text-xs font-bold text-[#46583b]">
                    Verified (illustrative)
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className={`${CARD} p-6`}>
            <div className="-mx-6 -mt-6 mb-5 flex flex-wrap items-center justify-between gap-3 rounded-t-xl bg-[#f2f5ed] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#46583b] font-heading text-xs font-bold text-white">
                  2
                </span>
                <div>
                  <h2 className="font-heading text-base font-semibold text-[#191d18]">
                    Farm Workspace Information
                  </h2>
                  <p className="font-inter text-xs text-[#444840]">
                    Draft facility scope and workspace identification.
                  </p>
                </div>
              </div>
              <span className="font-inter text-[11px] text-[#75786f]">* Local validation only</span>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                <div className="space-y-1.5 md:col-span-7">
                  <label
                    htmlFor="ws-name"
                    className="block font-heading text-sm font-semibold text-[#191d18]"
                  >
                    Workspace / Dairy Facility Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    id="ws-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setErrors((current) => ({ ...current, name: undefined }));
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'ws-name-error' : undefined}
                    className={INPUT}
                  />
                  {errors.name ? (
                    <p id="ws-name-error" className="font-inter text-xs text-[#ba1a1a]">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-1.5 md:col-span-5">
                  <label
                    htmlFor="ws-code"
                    className="flex items-center justify-between font-heading text-sm font-semibold text-[#191d18]"
                  >
                    <span>
                      Workspace Code <span className="text-[#ba1a1a]">*</span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setStatus(
                          'Draft code reset to the original illustrative value; no code was reserved.',
                        )
                      }
                      className="inline-flex items-center gap-1 font-inter text-[11px] text-[#7a461c] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a461c]"
                    >
                      <RefreshCw size={13} aria-hidden="true" /> Reset draft
                    </button>
                  </label>
                  <input
                    id="ws-code"
                    type="text"
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                      setErrors((current) => ({ ...current, code: undefined }));
                    }}
                    aria-invalid={Boolean(errors.code)}
                    aria-describedby={errors.code ? 'ws-code-error' : undefined}
                    className={`${INPUT} font-semibold uppercase tabular-nums tracking-wider`}
                  />
                  {errors.code ? (
                    <p id="ws-code-error" className="font-inter text-xs text-[#ba1a1a]">
                      {errors.code}
                    </p>
                  ) : null}
                  <p className="font-inter text-[11px] text-[#75786f]">
                    Draft identifier only; uniqueness is not checked.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ws-facility"
                  className="block font-heading text-sm font-semibold text-[#191d18]"
                >
                  Physical Dairy Facility Type <span className="text-[#ba1a1a]">*</span>
                </label>
                <select
                  id="ws-facility"
                  value={facility}
                  onChange={(event) => setFacility(event.target.value)}
                  className={INPUT}
                >
                  <option value="rotary">72-Stall Rotary Milking Parlor</option>
                  <option value="robotic">Automated Robotic Milking Facility (VMS)</option>
                  <option value="parallel">Double-24 Parallel Milking Parlor</option>
                  <option value="herringbone">Herringbone Milking Parlor</option>
                  <option value="pasture">Rotational Pasture Milking Parlor</option>
                </select>
                <p className="font-inter text-[11px] text-[#75786f]">
                  Illustrative facility categories only.
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ws-address"
                  className="block font-heading text-sm font-semibold text-[#191d18]"
                >
                  Facility Location / Physical Address
                </label>
                <input
                  id="ws-address"
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className={INPUT}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ws-notes"
                  className="block font-heading text-sm font-semibold text-[#191d18]"
                >
                  Operational Focus &amp; Facility Scope Notes
                </label>
                <textarea
                  id="ws-notes"
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className={`${INPUT} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#f2f5ed] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff] text-[#46583b] shadow-sm">
                    <Building2 size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-[#191d18]">
                      Illustrative Facility Configuration
                    </p>
                    <p className="font-inter text-xs text-[#444840]">
                      {facility === 'rotary'
                        ? '72-Stall Rotary Milking Configuration'
                        : 'Selected facility type — draft only'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 font-inter text-[11px] font-semibold text-[#191d18]">
                  <span className="rounded bg-[#fff] px-2.5 py-1 shadow-sm">Draft scope</span>
                  <span className="rounded bg-[#fff] px-2.5 py-1 shadow-sm">No capacity claim</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#ecefe7] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="reset"
                  onClick={() => {
                    setName('');
                    setCode('');
                    setAddress('');
                    setNotes('');
                    setErrors({});
                    setStatus(undefined);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fff] px-5 py-2.5 font-inter text-sm font-medium text-[#191d18] shadow-sm hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  <ArrowLeft size={18} aria-hidden="true" /> Cancel &amp; Return to Workspaces
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#46583b] px-6 py-2.5 font-inter text-sm font-semibold text-white shadow-md transition-colors duration-200 motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
                >
                  Validate Draft <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
              {status ? (
                <p
                  role="status"
                  aria-live="polite"
                  className="rounded-lg bg-[#f2f5ed] px-3 py-2 font-inter text-xs text-[#444840]"
                >
                  {status}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="font-inter text-xs font-semibold text-[#556249] underline underline-offset-4 hover:text-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                Open access-change preview (local draft only)
              </button>
            </form>
          </section>

          <aside className="flex flex-col gap-4 rounded-xl bg-[#fff] p-5 shadow-sm sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f2f5ed] text-[#46583b]">
              <FileText size={24} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-heading text-sm font-bold text-[#191d18]">
                Dairy Workspace Management Guidelines
              </h2>
              <p className="mt-1 font-inter text-xs text-[#444840]">
                Each illustrative workspace defines a dedicated operational boundary within the
                customer organization. No parlor equipment, tank capacity, or roster data is
                represented here.
              </p>
            </div>
          </aside>
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-4">
          <section className={`${CARD} p-6`}>
            <div className="-mx-6 -mt-6 mb-5 flex items-center justify-between rounded-t-xl bg-[#f2f5ed] p-6">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <CheckCircle2 size={20} aria-hidden="true" className="text-[#46583b]" /> Workflow
                Progression
              </h2>
              <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                Pipeline 2/3
              </span>
            </div>
            <ol className="ml-2 space-y-5 border-l-2 border-[#e0e4dc] pl-5">
              <li className="relative">
                <span className="absolute -left-[1.7rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#46583b] text-white">
                  <Check size={13} aria-hidden="true" />
                </span>
                <span className={LABEL}>Step 1 • Completed</span>
                <h3 className="font-heading text-sm font-semibold text-[#191d18]">
                  Register Customer
                </h3>
                <p className="font-inter text-xs text-[#444840]">
                  {customer.name} selected in this illustrative draft.
                </p>
              </li>
              <li className="relative">
                <span className="absolute -left-[1.7rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7a461c] font-heading text-[11px] font-bold text-white">
                  2
                </span>
                <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#7a461c]">
                  Step 2 • Active Draft
                </span>
                <h3 className="font-heading text-sm font-semibold text-[#191d18]">
                  Create Farm Workspace
                </h3>
                <p className="font-inter text-xs text-[#444840]">
                  Define the facility scope and draft workspace code.
                </p>
              </li>
              <li className="relative">
                <span className="absolute -left-[1.7rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ecefe7] font-heading text-[11px] font-bold text-[#75786f]">
                  3
                </span>
                <span className={LABEL}>Step 3 • Pending</span>
                <h3 className="font-heading text-sm font-semibold text-[#444840]">
                  Provision Farm Admin
                </h3>
                <p className="font-inter text-xs text-[#444840]">
                  Would follow workspace setup in a real workflow.
                </p>
              </li>
            </ol>
          </section>

          <section className={`${CARD} p-6`}>
            <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
              <ShieldCheck size={20} aria-hidden="true" className="text-[#46583b]" /> Workspace
              Policies &amp; Binding Rules
            </h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-[#f2f5ed] p-3.5">
                <h3 className="flex items-center gap-2 font-heading text-xs font-bold text-[#191d18]">
                  <Building2 size={16} aria-hidden="true" /> Workspace Operational Boundaries
                </h3>
                <p className="mt-1 font-inter text-xs text-[#444840]">
                  Every illustrative workspace is linked to its customer organization; no farm data
                  is shown here.
                </p>
              </div>
              <div className="rounded-lg bg-[#f2f5ed] p-3.5">
                <h3 className="flex items-center gap-2 font-heading text-xs font-bold text-[#7a461c]">
                  <LockKeyhole size={16} aria-hidden="true" /> Admin Provisioning Policy
                </h3>
                <p className="mt-1 font-inter text-xs text-[#444840]">
                  Farm Admin accounts are provisioned separately and only after explicit approval in
                  the real product.
                </p>
              </div>
              <div className="rounded-lg bg-[#ecefe7] p-3.5">
                <h3 className="flex items-center gap-2 font-heading text-xs font-semibold text-[#191d18]">
                  <Info size={16} aria-hidden="true" /> Unique Identifier Requirement
                </h3>
                <p className="mt-1 font-inter text-xs text-[#444840]">
                  Workspace codes must remain distinct within a customer portfolio; this draft does
                  not check uniqueness.
                </p>
              </div>
            </div>
          </section>

          <section className={`${CARD} p-6`}>
            <div className="flex items-center justify-between border-b border-[#ecefe7] pb-3">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <UserRound size={20} aria-hidden="true" className="text-[#46583b]" /> Customer
                Summary
              </h2>
              <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-bold tabular-nums">
                {customer.id}
              </span>
            </div>
            <dl className="mt-3 space-y-2 font-inter text-xs">
              {[
                ['Organization', customer.name],
                ['Customer ID', customer.id],
                ['Primary Contact', customer.contact],
                ['Phone', '+00 000 000 0000'],
                ['Email', 'contact@example.invalid'],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="flex justify-between gap-3 rounded-lg bg-[#f2f5ed] px-3 py-1.5"
                >
                  <dt className="text-[#75786f]">{term}</dt>
                  <dd className="text-right font-medium text-[#191d18]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-[#f2f5ed] p-2.5">
                <span className={LABEL}>Illustrative Workspaces</span>
                <p className="font-heading text-base font-bold text-[#191d18]">2</p>
              </div>
              <div className="rounded-lg bg-[#f2f5ed] p-2.5">
                <span className={LABEL}>Illustrative Herd</span>
                <p className="font-heading text-base font-bold text-[#191d18]">No data</p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d312c]/50 p-4"
          role="presentation"
          onMouseDown={() => setConfirmOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="draft-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-lg space-y-4 rounded-xl bg-[#fff] p-5 shadow-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#46583b] text-white">
              <LockKeyhole size={24} aria-hidden="true" />
            </span>
            <h2
              id="draft-dialog-title"
              className="font-heading text-lg font-semibold text-[#191d18]"
            >
              Confirm local draft preview
            </h2>
            <p className="font-inter text-sm text-[#444840]">
              Draft target: <strong className="text-[#191d18]">{customer.name}</strong> ·{' '}
              <strong className="text-[#191d18]">{name || 'unnamed workspace'}</strong> (
              {code || 'no code'}). This access-changing preview is local only — no workspace is
              created, no code is reserved, and no account is provisioned.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg bg-[#f2f5ed] px-4 py-2 font-inter text-xs font-medium text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                Modify
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmOpen(false);
                  setStatus('Local draft preview confirmed. No access change was applied.');
                }}
                className="rounded-lg bg-[#46583b] px-4 py-2 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
              >
                Confirm preview only
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
