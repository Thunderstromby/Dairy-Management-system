import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  FileText,
  HelpCircle,
  Info,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

const CARD = 'rounded-xl bg-[#fff] shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';
const INPUT =
  'w-full rounded-lg border border-[#c4c8bd] bg-[#fff] py-2 pl-9 pr-3 font-inter text-sm text-[#191d18] placeholder:text-[#75786f] outline-none transition-colors duration-200 motion-reduce:transition-none focus:border-[#46583b] focus:ring-2 focus:ring-[#46583b]/20';

type Draft = { name: string; title: string; email: string };

export function ProvisionFarmAdminAccount() {
  const [draft, setDraft] = useState<Draft>({ name: '', title: '', email: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [status, setStatus] = useState<string>();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function update(field: keyof Draft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Draft, string>> = {};
    if (!draft.name.trim()) next.name = 'Full Legal Name is required.';
    if (!draft.title.trim()) next.title = 'Operational Title / Designation is required.';
    if (!draft.email.trim()) next.email = 'Direct Work / Login Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
      next.email = 'Enter a valid email address (example@domain.invalid).';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate())
      setStatus(
        'Local draft validated. No account was created and no credentials were dispatched.',
      );
    else setStatus('Correct the highlighted fields. This is local draft validation only.');
  }

  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center justify-between gap-3 font-inter text-xs text-[#444840]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#556249]">Farm Admin Accounts</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#191d18]">Provision Farm Admin</span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#ecefe7] px-3 py-1 font-inter text-[11px] uppercase tracking-wider text-[#444840]">
          <span className="h-2 w-2 rounded-full bg-[#7a461c]" aria-hidden="true" /> Onboarding step
          3 of 3 · local draft
        </span>
      </nav>

      <header className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#46583b] text-white">
          <UserRound size={24} aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#46583b]">
            Provision Farm Admin
          </h1>
          <p className="font-inter text-sm text-[#444840]">
            Draft assignment of an authorized Farm Administrator to an illustrative isolated
            workspace. No account is created, no password is generated, and no email is dispatched.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 items-start">
        <div className="flex flex-col gap-6 xl:col-span-8">
          <section className={`${CARD} p-5`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
              <span className={LABEL}>Tenant Provisioning Sequence</span>
              <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-semibold text-[#5b694e]">
                Final phase
              </span>
            </div>
            <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                {
                  label: 'Step 01 • Customer',
                  title: 'Customer 01',
                  note: 'CUST-0001 · illustrative',
                },
                {
                  label: 'Step 02 • Workspace',
                  title: 'Workspace 01',
                  note: 'WS-0001 · illustrative',
                },
                { label: 'Step 03 • Current', title: 'Provision Farm Admin', note: 'Draft only' },
              ].map((step, index) => (
                <li
                  key={step.label}
                  className={`flex items-start gap-3 rounded-lg p-3 ${index === 2 ? 'bg-[#46583b] text-white' : 'bg-[#f2f5ed]'}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-heading text-[11px] font-bold ${index === 2 ? 'bg-[#d9e8c7] text-[#46583b]' : 'bg-[#46583b] text-white'}`}
                  >
                    {index === 2 ? '03' : <Check size={15} aria-hidden="true" />}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span
                      className={`font-inter text-[11px] uppercase ${index === 2 ? 'text-[#d9e8c7]' : 'text-[#75786f]'}`}
                    >
                      {step.label}
                    </span>
                    <span className="truncate font-heading text-sm font-semibold">
                      {step.title}
                    </span>
                    <span
                      className={`font-inter text-[11px] ${index === 2 ? 'text-[#d9e8c7]' : 'text-[#444840]'}`}
                    >
                      {step.note}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <form
            className={`${CARD} flex flex-col gap-6 p-5 sm:p-6`}
            onSubmit={handleSubmit}
            noValidate
          >
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ecefe7] pb-3">
                <h2 className="font-heading text-base font-semibold text-[#191d18]">
                  Administrator Identity &amp; Account Information
                </h2>
                <span className={LABEL}>Local validation only</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="admin-name"
                    className="block font-heading text-sm font-semibold text-[#191d18]"
                  >
                    Full Legal Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <UserRound
                      size={18}
                      aria-hidden="true"
                      className="absolute left-3 top-2.5 text-[#75786f]"
                    />
                    <input
                      id="admin-name"
                      type="text"
                      value={draft.name}
                      onChange={(event) => update('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      placeholder="Illustrative name"
                      className={`${INPUT} pl-10`}
                    />
                  </div>
                  {errors.name ? (
                    <p className="font-inter text-xs text-[#ba1a1a]">{errors.name}</p>
                  ) : null}
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="admin-title"
                    className="block font-heading text-sm font-semibold text-[#191d18]"
                  >
                    Operational Title / Designation <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    id="admin-title"
                    type="text"
                    value={draft.title}
                    onChange={(event) => update('title', event.target.value)}
                    aria-invalid={Boolean(errors.title)}
                    placeholder="Illustrative designation"
                    className={`${INPUT} pl-3`}
                  />
                  {errors.title ? (
                    <p className="font-inter text-xs text-[#ba1a1a]">{errors.title}</p>
                  ) : null}
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label
                    htmlFor="admin-email"
                    className="block font-heading text-sm font-semibold text-[#191d18]"
                  >
                    Direct Work / Login Email <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      aria-hidden="true"
                      className="absolute left-3 top-2.5 text-[#75786f]"
                    />
                    <input
                      id="admin-email"
                      type="email"
                      value={draft.email}
                      onChange={(event) => update('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      placeholder="contact@example.invalid"
                      className={`${INPUT} pl-10`}
                    />
                  </div>
                  {errors.email ? (
                    <p className="font-inter text-xs text-[#ba1a1a]">{errors.email}</p>
                  ) : null}
                  <p className="flex items-center gap-1.5 font-inter text-xs text-[#444840]">
                    <Info size={14} aria-hidden="true" className="text-[#556249]" /> In the real
                    product this would be the login identifier; the authentication method remains
                    approval-gated.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-[#f2f5ed] p-4">
                <KeyRound size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a461c]" />
                <div>
                  <h3 className="font-heading text-sm font-semibold text-[#191d18]">
                    Initial Credential Setup Notice
                  </h3>
                  <p className="font-inter text-xs leading-relaxed text-[#444840]">
                    Account access setup is pending confirmation of the approved credential
                    provisioning method. No token is generated or delivered by this prototype.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ecefe7] pb-3">
                <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                  <Building2 size={18} aria-hidden="true" className="text-[#46583b]" /> Customer
                  Association
                </h2>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-[#46583b] hover:text-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  Change Customer
                </button>
              </div>
              <div className="relative flex items-center">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="absolute left-3 text-[#75786f]"
                />
                <input
                  readOnly
                  aria-label="Selected customer"
                  value="Customer 01 (CUST-0001)"
                  className={`${INPUT} cursor-default pl-10 font-heading text-sm`}
                />
              </div>
              <div className="space-y-3 rounded-lg bg-[#f2f5ed] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecefe7] text-[#46583b]">
                      <Building2 size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-[#191d18]">
                        Customer 01
                      </h3>
                      <p className="font-inter text-[11px] tabular-nums text-[#75786f]">
                        CUST-0001 · illustrative active record
                      </p>
                    </div>
                  </div>
                </div>
                <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-lg bg-[#fff] p-3">
                    <dt className={LABEL}>Primary Customer Liaison</dt>
                    <dd className="font-heading text-sm text-[#191d18]">Liaison 01</dd>
                    <dd className="font-inter text-[11px] text-[#444840]">
                      Illustrative representative
                    </dd>
                  </div>
                  <div className="rounded-lg bg-[#fff] p-3">
                    <dt className={LABEL}>Direct Contact</dt>
                    <dd className="font-inter text-sm text-[#46583b]">contact@example.invalid</dd>
                    <dd className="font-inter text-[11px] tabular-nums text-[#444840]">
                      +00 000 000 0000
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ecefe7] pb-3">
                <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                  <Building2 size={18} aria-hidden="true" className="text-[#46583b]" /> Workspace
                  Association
                </h2>
                <span className="font-inter text-[11px] font-semibold uppercase text-[#7a461c]">
                  Single scope binding
                </span>
              </div>
              <div className="relative flex items-center">
                <Building2
                  size={18}
                  aria-hidden="true"
                  className="absolute left-3 text-[#75786f]"
                />
                <input
                  readOnly
                  aria-label="Target workspace"
                  value="Workspace 01 (WS-0001) — 72-Stall Parlor"
                  className={`${INPUT} cursor-default pl-10 font-heading text-sm`}
                />
                <CheckCircle2
                  size={18}
                  aria-hidden="true"
                  className="absolute right-3 text-[#46583b]"
                />
              </div>
              <div className="space-y-3 rounded-lg bg-[#f2f5ed] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-[#191d18]">
                      Workspace 01
                    </h3>
                    <p className="font-inter text-xs text-[#444840]">
                      72-Stall Rotary Milking Parlor · illustrative facility
                    </p>
                  </div>
                  <span className="rounded-full bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-semibold text-[#5b694e]">
                    Currently unassigned (illustrative)
                  </span>
                </div>
                <dl className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  {[
                    ['Facility Type', '72-Stall Rotary Milking Parlor'],
                    ['Location', 'Illustrative building descriptor'],
                    ['Operating Status', 'Illustrative active'],
                  ].map(([term, value]) => (
                    <div key={term} className="rounded-lg bg-[#fff] p-2">
                      <dt className={LABEL}>{term}</dt>
                      <dd className="font-heading text-xs text-[#191d18]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-[#ecefe7] p-3">
                <ShieldCheck
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#7a461c]"
                />
                <p className="font-inter text-xs text-[#444840]">
                  Customer association changes would clear an incompatible workspace binding in the
                  real product. This draft preview changes nothing.
                </p>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ecefe7] pt-5">
              <button
                type="reset"
                onClick={() => {
                  setDraft({ name: '', title: '', email: '' });
                  setErrors({});
                  setStatus(undefined);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#f2f5ed] px-4 py-2.5 font-inter text-sm font-medium text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <ArrowLeft size={18} aria-hidden="true" /> Cancel &amp; Return
              </button>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setStatus('Local draft retained in component state only; nothing was saved.')
                  }
                  className="rounded-lg bg-[#ecefe7] px-4 py-2.5 font-inter text-sm font-medium text-[#444840] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  Save Draft Assignment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validate()) setConfirmOpen(true);
                    else
                      setStatus(
                        'Correct the highlighted fields before previewing the access change.',
                      );
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-5 py-2.5 font-inter text-sm font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
                >
                  <ShieldCheck size={18} aria-hidden="true" /> Provision Farm Admin
                </button>
              </div>
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
          </form>
        </div>

        <aside className="flex flex-col gap-4 xl:col-span-4">
          <section className={`${CARD} p-6`}>
            <div className="flex items-center justify-between border-b border-[#ecefe7] pb-3">
              <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-[#191d18]">
                <FileText size={18} aria-hidden="true" className="text-[#46583b]" /> Provisioning
                Summary Review
              </h2>
              <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-semibold uppercase text-[#5b694e]">
                Pre-flight
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-[#f2f5ed] p-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#46583b] font-heading text-base font-bold text-white">
                {(draft.name.trim() || 'FA').slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-semibold text-[#191d18]">
                  {draft.name || 'Farm Admin (draft)'}
                </p>
                <p className="truncate font-inter text-xs text-[#444840]">
                  {draft.title || 'Operational title'}
                </p>
                <p className="font-inter text-[11px] font-semibold text-[#7a461c]">Draft only</p>
              </div>
            </div>
            <dl className="mt-4 space-y-2">
              {[
                ['Farm Admin Identity', draft.name || 'Not entered'],
                ['Login Identifier', draft.email || 'Not entered'],
                ['RBAC Assignment', 'Farm Admin (workspace-scoped)'],
                ['Parent Customer', 'Customer 01 (CUST-0001)'],
                ['Target Workspace', 'Workspace 01 (WS-0001)'],
                ['Dairy Facility Scope', '72-Stall Rotary Parlor'],
              ].map(([term, value]) => (
                <div key={term} className="rounded-lg bg-[#f2f5ed] p-3">
                  <dt className={LABEL}>{term}</dt>
                  <dd className="truncate font-heading text-sm text-[#191d18]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-lg bg-[#ecefe7] p-3">
              <h3 className="flex items-center gap-1.5 font-heading text-xs font-semibold text-[#46583b]">
                <ShieldCheck size={16} aria-hidden="true" /> Tenant Isolation
              </h3>
              <p className="mt-1 font-inter text-xs text-[#444840]">
                The approved matrix scopes this account to one workspace. No cross-workspace
                authority is implied.
              </p>
            </div>
          </section>

          <section className={`${CARD} flex items-center justify-between p-4`}>
            <div className="flex items-center gap-3">
              <HelpCircle size={20} aria-hidden="true" className="text-[#75786f]" />
              <div>
                <p className="font-heading text-xs font-semibold text-[#191d18]">
                  Provisioning Governance Guide
                </p>
                <p className="font-inter text-[11px] text-[#75786f]">Visual reference only</p>
              </div>
            </div>
            <button
              type="button"
              className="font-inter text-[11px] font-semibold text-[#46583b] underline underline-offset-4 hover:text-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              View Policy
            </button>
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
            aria-labelledby="provision-preview-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-lg space-y-4 rounded-xl bg-[#fff] p-5 shadow-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#46583b] text-white">
              <LockKeyhole size={24} aria-hidden="true" />
            </span>
            <h2
              id="provision-preview-title"
              className="font-heading text-lg font-semibold text-[#191d18]"
            >
              Confirm Farm Admin provisioning preview
            </h2>
            <p className="font-inter text-sm text-[#444840]">
              Draft administrator: <strong className="text-[#191d18]">{draft.name}</strong> ·{' '}
              <strong className="text-[#191d18]">Workspace 01 (WS-0001)</strong> · Customer 01. This
              is a local access-change preview only: no account is created, no credentials are
              dispatched, and no permission is changed.
            </p>
            <dl className="space-y-2 rounded-lg bg-[#f2f5ed] p-3 font-inter text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-[#75786f]">Tenant</dt>
                <dd className="text-[#191d18]">Customer 01 (illustrative)</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#75786f]">Delivery route</dt>
                <dd className="text-[#191d18]">None — prototype only</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#75786f]">Facility</dt>
                <dd className="text-[#191d18]">72-Stall Rotary Parlor</dd>
              </div>
            </dl>
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
                  setStatus('Preview confirmed locally. No access change was applied.');
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
