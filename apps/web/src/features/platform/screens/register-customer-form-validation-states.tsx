import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  Info,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react';

type FormState = {
  organization: string;
  notes: string;
  contact: string;
  phone: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { organization: '', notes: '', contact: '', phone: '', email: '' };

const INPUT_CLASS =
  'w-full rounded-lg border border-[#c4c8bd] bg-[#fff] px-3 py-2.5 font-inter text-sm text-[#191d18] placeholder:text-[#75786f] outline-none transition-colors duration-200 motion-reduce:transition-none focus:border-[#46583b] focus:ring-2 focus:ring-[#46583b]/20';

const LABEL_CLASS = 'block font-heading text-sm font-semibold text-[#191d18]';

function Step({
  number,
  title,
  note,
  active,
}: {
  number: number;
  title: string;
  note: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold ${
          active ? 'bg-[#46583b] text-white' : 'bg-[#ecefe7] text-[#444840]'
        }`}
      >
        {active ? <Check size={15} aria-hidden="true" /> : number}
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-sm font-semibold text-[#191d18]">{title}</span>
        <span className={`font-inter text-xs ${active ? 'text-[#46583b]' : 'text-[#75786f]'}`}>
          {note}
        </span>
      </span>
    </div>
  );
}

export function RegisterCustomerFormValidationStates() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string>();

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(undefined);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FormErrors = {};
    if (!form.organization.trim()) next.organization = 'Customer / Organization Name is required.';
    if (!form.contact.trim()) next.contact = 'Primary Contact Name is required.';
    if (!form.email.trim()) next.email = 'Contact Email Address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid business email address (example@domain.invalid).';
    }
    setErrors(next);
    setStatus(
      Object.keys(next).length === 0
        ? 'Local draft validation passed. No customer record was created and nothing was saved.'
        : 'Correct the highlighted fields to continue. This is local draft validation only.',
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-inter text-xs text-[#75786f]"
          >
            <span>Customers</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[#46583b]">Register Customer</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
            Register Customer
          </h1>
          <p className="max-w-xl font-inter text-sm text-[#444840]">
            Create a customer record before setting up their farm workspace. This form is a local
            draft preview; it does not create or persist a record.
          </p>
        </div>
        <span className="self-start rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
          Illustrative form state
        </span>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <section className="lg:col-span-8 overflow-hidden rounded-xl bg-[#fff] shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#ecefe7] bg-[#f2f5ed] px-5 py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecefe7] text-[#46583b]">
              <Building2 size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-heading text-base font-semibold text-[#191d18]">
                Customer Details
              </h2>
              <p className="font-inter text-xs text-[#444840]">
                Enter the organization and primary liaison information
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-7 p-5 sm:p-6" onSubmit={handleSubmit} noValidate>
            <fieldset className="space-y-4">
              <legend className="flex w-full items-center gap-3 pb-1">
                <span className="font-inter text-[11px] font-bold uppercase tracking-widest text-[#46583b]">
                  Organization Details
                </span>
                <span className="h-px flex-1 bg-[#ecefe7]" />
              </legend>

              <div className="space-y-1.5">
                <label htmlFor="org-name" className={LABEL_CLASS}>
                  Customer / Organization Name <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="org-name"
                  type="text"
                  value={form.organization}
                  onChange={(event) => update('organization', event.target.value)}
                  aria-invalid={Boolean(errors.organization)}
                  aria-describedby={errors.organization ? 'org-name-error' : undefined}
                  placeholder="Illustrative organization name"
                  className={INPUT_CLASS}
                />
                {errors.organization ? (
                  <p
                    id="org-name-error"
                    className="flex items-center gap-1 font-inter text-xs text-[#ba1a1a]"
                  >
                    <AlertCircle size={14} aria-hidden="true" /> {errors.organization}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="org-notes" className={LABEL_CLASS}>
                  Notes / Operational Focus{' '}
                  <span className="font-normal text-[#75786f]">(Optional)</span>
                </label>
                <textarea
                  id="org-notes"
                  rows={3}
                  maxLength={500}
                  value={form.notes}
                  onChange={(event) => update('notes', event.target.value)}
                  placeholder="Brief operational context or primary facility notes..."
                  className={`${INPUT_CLASS} resize-y`}
                />
                <p className="text-right font-inter text-[11px] tabular-nums text-[#75786f]">
                  {form.notes.length} / 500
                </p>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="flex w-full items-center gap-3 pb-1">
                <span className="font-inter text-[11px] font-bold uppercase tracking-widest text-[#46583b]">
                  Primary Liaison
                </span>
                <span className="h-px flex-1 bg-[#ecefe7]" />
              </legend>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className={LABEL_CLASS}>
                    Primary Contact Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <UserRound
                      size={18}
                      aria-hidden="true"
                      className="absolute left-3 top-3 text-[#75786f]"
                    />
                    <input
                      id="contact-name"
                      type="text"
                      value={form.contact}
                      onChange={(event) => update('contact', event.target.value)}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? 'contact-name-error' : undefined}
                      placeholder="Illustrative contact name"
                      className={`${INPUT_CLASS} pl-10`}
                    />
                  </div>
                  {errors.contact ? (
                    <p
                      id="contact-name-error"
                      className="flex items-center gap-1 font-inter text-xs text-[#ba1a1a]"
                    >
                      <AlertCircle size={14} aria-hidden="true" /> {errors.contact}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className={LABEL_CLASS}>
                    Contact Phone Number{' '}
                    <span className="font-normal text-[#75786f]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      aria-hidden="true"
                      className="absolute left-3 top-3 text-[#75786f]"
                    />
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) => update('phone', event.target.value)}
                      placeholder="Illustrative contact number"
                      className={`${INPUT_CLASS} pl-10`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className={LABEL_CLASS}>
                  Contact Email Address <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    aria-hidden="true"
                    className="absolute left-3 top-3 text-[#75786f]"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => update('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    placeholder="contact@example.invalid"
                    className={`${INPUT_CLASS} pl-10`}
                  />
                </div>
                {errors.email ? (
                  <p
                    id="contact-email-error"
                    className="flex items-center gap-1 font-inter text-xs text-[#ba1a1a]"
                  >
                    <AlertCircle size={14} aria-hidden="true" /> {errors.email}
                  </p>
                ) : null}
              </div>
            </fieldset>

            <div className="flex flex-col gap-3 border-t border-[#ecefe7] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="reset"
                onClick={() => {
                  setForm(EMPTY_FORM);
                  setErrors({});
                  setStatus(undefined);
                }}
                className="w-full rounded-lg bg-[#ecefe7] px-5 py-2.5 font-inter text-sm font-medium text-[#191d18] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#46583b] px-5 py-2.5 font-inter text-sm font-semibold text-white transition-colors duration-200 motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40 sm:w-auto"
              >
                <UserRound size={18} aria-hidden="true" /> Register Customer
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
          </form>
        </section>

        <aside className="flex flex-col gap-4 lg:col-span-4">
          <section className="space-y-4 rounded-xl bg-[#fff] p-4 shadow-sm">
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#75786f]">
              Onboarding Workflow
            </h2>
            <div className="space-y-3">
              <Step number={1} title="Register Customer" note="Currently active record" active />
              <span className="ml-3.5 block h-5 w-0.5 bg-[#e0e4dc]" aria-hidden="true" />
              <Step
                number={2}
                title="Create Farm Workspace"
                note="Assign physical dairies & facilities"
              />
              <span className="ml-3.5 block h-5 w-0.5 bg-[#e0e4dc]" aria-hidden="true" />
              <Step
                number={3}
                title="Provision Farm Admin"
                note="Issue authentication credentials"
              />
            </div>
          </section>

          <section className="space-y-2 rounded-xl bg-[#fff] p-4 shadow-sm">
            <h2 className="flex items-center gap-2 font-inter text-[11px] font-bold uppercase tracking-wider text-[#556249]">
              <Info size={18} aria-hidden="true" /> Guidance Note
            </h2>
            <p className="font-inter text-xs leading-relaxed text-[#444840]">
              Customer registration establishes the primary organization record. Farm workspaces and
              Farm Administrator accounts are configured in subsequent steps. Nothing submitted here
              is saved.
            </p>
          </section>
        </aside>
      </div>

      <p className="flex items-center gap-2 font-inter text-[11px] text-[#75786f]">
        <ArrowRight size={14} aria-hidden="true" /> Fields marked * are required for local
        validation display only.
      </p>
    </div>
  );
}
