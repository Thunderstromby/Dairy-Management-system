import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  FileText,
  Info,
  Lock,
  Paperclip,
  PawPrint,
  Scale,
  Tag,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

type FieldName = 'earTag' | 'name' | 'breed' | 'birthDate' | 'pen' | 'status' | 'weight' | 'dam';

type FormState = Record<FieldName, string>;

const emptyForm: FormState = {
  earTag: '',
  name: '',
  breed: '',
  birthDate: '',
  pen: '',
  status: '',
  weight: '',
  dam: '',
};

function Section({
  step,
  title,
  note,
  children,
}: {
  step: number;
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f0eee8] px-4 py-3">
        <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
          Section {step}: {title}
        </h2>
        <span className="text-xs text-[#444840]">{note}</span>
      </div>
      <div className="flex flex-col gap-3 p-4">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: FieldName;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-[#1b1c18]">
        {label} {required ? <span className="text-[#ba1a1a]">*</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-[#444840]">{hint}</p> : null}
      {error ? (
        <p
          role="alert"
          className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#ba1a1a]"
        >
          <AlertTriangle aria-hidden="true" size={12} /> {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = `w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2.5 text-sm text-[#1b1c18] ${focus}`;

export function AddAnimalFormValidation() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState('');
  const [sex, setSex] = useState('female');
  const [origin, setOrigin] = useState('born-on-farm');
  const [unit, setUnit] = useState('kg');

  const setField = (name: FieldName, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!form.earTag.trim()) next.earTag = 'Ear-tag is required.';
    if (!form.name.trim()) next.name = 'Animal name is required.';
    if (!form.breed) next.breed = 'Select a breed.';
    if (!form.birthDate.trim()) next.birthDate = 'Birth date or age is required.';
    if (!form.pen) next.pen = 'Select a pen or group.';
    if (!form.status) next.status = 'Select an initial lifecycle status.';
    if (!form.weight.trim()) next.weight = 'Initial entry weight is required.';
    if (!form.dam.trim()) next.dam = 'Dam reference is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) {
      setStatus('Complete the required fields before saving. This is local validation only.');
      return;
    }
    setStatus('Local draft validated. No record is saved and no backend request is made.');
  };

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Herd management</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Animals</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Register new head</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Add Animal
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Form shell for the approved registration sections. All values are illustrative and no
              submission is persisted.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#eae8e2] px-3 py-2 text-xs font-semibold text-[#444840]">
            <Lock aria-hidden="true" size={14} /> Draft only · no save
          </span>
        </header>

        {Object.values(errors).some(Boolean) ? (
          <div role="alert" className="rounded-xl border border-[#ba1a1a]/30 bg-[#ffdad6] p-4">
            <p className="flex items-center gap-2 font-heading text-sm font-bold text-[#ba1a1a]">
              <AlertTriangle aria-hidden="true" size={16} /> Incomplete form fields
            </p>
            <p className="mt-1 text-sm text-[#444840]">
              The highlighted fields must be completed. Ear-tag uniqueness and lineage integrity are
              enforced by the server in the real product; this prototype only shows local
              validation.
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
            noValidate
          >
            <Section step={1} title="Identification & Registration" note="Mandatory fields">
              <Field
                id="earTag"
                label="Ear-tag number"
                required
                error={errors.earTag}
                hint="Unique within the workspace. Uniqueness is checked server-side in production."
              >
                <div className="relative">
                  <Tag
                    aria-hidden="true"
                    size={16}
                    className="absolute left-3 top-3 text-[#444840]"
                  />
                  <input
                    id="earTag"
                    value={form.earTag}
                    onChange={(event) => setField('earTag', event.target.value)}
                    className={`${inputClass} pl-9`}
                    placeholder="e.g. TAG-A-07"
                  />
                </div>
              </Field>
              <div className="rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                Cryptographic internal ID: system-generated in production; not user editable.
              </div>
              <Field id="name" label="Official animal name" required error={errors.name}>
                <input
                  id="name"
                  value={form.name}
                  onChange={(event) => setField('name', event.target.value)}
                  className={inputClass}
                  placeholder="Neutral placeholder name"
                />
              </Field>
            </Section>

            <Section step={2} title="Animal Core Details" note="Biological attributes">
              <Field id="breed" label="Breed" required error={errors.breed}>
                <select
                  id="breed"
                  value={form.breed}
                  onChange={(event) => setField('breed', event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select breed</option>
                  <option>Holstein Friesian</option>
                  <option>Jersey</option>
                  <option>Brown Swiss cross</option>
                  <option>Ayrshire</option>
                </select>
              </Field>
              <fieldset>
                <legend className="mb-1 text-sm font-semibold">Sex / physiological class</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    ['female', 'Female / cow'],
                    ['male', 'Male / bull'],
                    ['steer', 'Steer'],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className={`flex items-center gap-2 rounded-lg border border-[#c4c8bd] px-3 py-2 text-sm ${sex === value ? 'bg-[#d9e8c7]' : 'bg-[#fbf9f3]'}`}
                    >
                      <input
                        type="radio"
                        name="sex"
                        value={value}
                        checked={sex === value}
                        onChange={() => setSex(value)}
                        className="accent-[#2f4126]"
                      />{' '}
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field id="birthDate" label="Date of birth / age" required error={errors.birthDate}>
                <div className="relative">
                  <CalendarDays
                    aria-hidden="true"
                    size={16}
                    className="absolute left-3 top-3 text-[#444840]"
                  />
                  <input
                    id="birthDate"
                    value={form.birthDate}
                    onChange={(event) => setField('birthDate', event.target.value)}
                    className={`${inputClass} pl-9`}
                    placeholder="Sample date or age"
                  />
                </div>
              </Field>
              <Field id="pen" label="Assigned pen / group" required error={errors.pen}>
                <select
                  id="pen"
                  value={form.pen}
                  onChange={(event) => setField('pen', event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select pen or group</option>
                  <option>Lactating herd · Pen 04</option>
                  <option>Replacement heifers · Pen 03</option>
                  <option>Nursery · Pen 01</option>
                </select>
              </Field>
              <p className="rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]">
                <Info aria-hidden="true" size={13} className="mr-1 inline" />
                Placement suggestions are illustrative; Farm Admin retains the confirmed override.
                No maturity or growth formula is applied.
              </p>
            </Section>

            <Section step={3} title="Parent & Lineage Information" note="Pedigree records">
              <Field id="dam" label="Mother (dam) reference" required error={errors.dam}>
                <input
                  id="dam"
                  value={form.dam}
                  onChange={(event) => setField('dam', event.target.value)}
                  className={inputClass}
                  placeholder="Neutral dam tag"
                />
              </Field>
              <p className="rounded-lg bg-[#f0eee8] p-3 text-xs text-[#444840]">
                Known sire reference may be entered here. Lineage integrity is validated
                server-side; no automatic calf protocol is generated in this prototype.
              </p>
            </Section>

            <Section step={4} title="Purchase & Initial Lifecycle Status" note="Acquisition ledger">
              <Field id="status" label="Initial lifecycle status" required error={errors.status}>
                <select
                  id="status"
                  value={form.status}
                  onChange={(event) => setField('status', event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select status</option>
                  <option>Active · in rearing</option>
                  <option>Active · lactating herd</option>
                  <option>Dry period</option>
                </select>
              </Field>
              <fieldset>
                <legend className="mb-1 text-sm font-semibold">Origin</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    ['born-on-farm', 'Born on farm'],
                    ['purchased', 'Purchased externally'],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className={`flex items-center gap-2 rounded-lg border border-[#c4c8bd] px-3 py-2 text-sm ${origin === value ? 'bg-[#d9e8c7]' : 'bg-[#fbf9f3]'}`}
                    >
                      <input
                        type="radio"
                        name="origin"
                        value={value}
                        checked={origin === value}
                        onChange={() => setOrigin(value)}
                        className="accent-[#2f4126]"
                      />{' '}
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
              {origin === 'purchased' ? (
                <p className="rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                  Purchase details and price are captured in the Farm Admin-only acquisition
                  records; no currency value is shown here.
                </p>
              ) : null}
              <Field id="weight" label="Initial entry weight" required error={errors.weight}>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Scale
                      aria-hidden="true"
                      size={16}
                      className="absolute left-3 top-3 text-[#444840]"
                    />
                    <input
                      id="weight"
                      value={form.weight}
                      onChange={(event) => setField('weight', event.target.value)}
                      className={`${inputClass} pl-9`}
                      inputMode="decimal"
                      placeholder="0.0"
                    />
                  </div>
                  <div className="flex rounded-lg bg-[#f0eee8] p-1">
                    {['kg', 'lb'].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setUnit(value)}
                        aria-pressed={unit === value}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold ${unit === value ? 'bg-white text-[#2f4126] shadow-sm' : 'text-[#444840]'} ${focus}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </Field>
            </Section>

            <Section
              step={5}
              title="Photos & Biological Attachments"
              note="Identification documents"
            >
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#c4c8bd] bg-[#f5f3ed] p-6 text-center">
                <Paperclip aria-hidden="true" size={24} className="text-[#444840]" />
                <p className="text-sm font-semibold">Attach identification photos and documents</p>
                <p className="text-xs text-[#444840]">
                  Upload controls are preview-only; no files are stored in this prototype.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('File selection is not wired in this prototype.')}
                  className={`rounded-lg bg-[#46583b] px-4 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  Browse files
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {['Pedigree certificate', 'Flank identification photo'].map((file) => (
                  <li
                    key={file}
                    className="flex items-center justify-between rounded-lg bg-[#f0eee8] p-3 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <FileText aria-hidden="true" size={16} /> {file}
                    </span>
                    <span className="text-xs text-[#444840]">Illustrative metadata</span>
                  </li>
                ))}
              </ul>
            </Section>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setErrors({});
                  setStatus('Local draft cleared.');
                }}
                className={`inline-flex items-center gap-1.5 rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-semibold ${focus}`}
              >
                <ArrowLeft aria-hidden="true" size={15} /> Cancel & clear
              </button>
              <button
                type="button"
                onClick={() => setStatus('Local draft only — no data saved.')}
                className={`rounded-lg bg-[#eae8e2] px-4 py-2.5 text-sm font-semibold ${focus}`}
              >
                Save draft locally
              </button>
              <button
                type="submit"
                className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-5 py-2.5 text-sm font-semibold text-white ${focus}`}
              >
                <Check aria-hidden="true" size={15} /> Save & register animal
              </button>
            </div>
            {status ? (
              <p role="status" className="rounded-lg bg-[#d9e8c7] p-3 text-sm text-[#2f4126]">
                {status}
              </p>
            ) : null}
          </form>

          <aside aria-label="Draft summary" className="flex flex-col gap-4">
            <div className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-sm font-bold">Live tag summary</h2>
                <span className="rounded-full bg-[#d9e8c7] px-2 py-0.5 text-[10px] font-bold uppercase text-[#2f4126]">
                  Draft
                </span>
              </div>
              <div className="mt-3 grid h-32 place-items-center rounded-lg bg-[#f0eee8] text-[#444840]">
                <PawPrint aria-hidden="true" size={32} />
              </div>
              <p className="mt-3 font-heading text-base font-bold">
                {form.name || 'Unnamed animal'}
              </p>
              <p className="font-mono text-xs text-[#444840]">{form.earTag || 'TAG-—'}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-[#f5f3ed] p-2">
                  <dt className="text-[#444840]">Pen</dt>
                  <dd className="font-semibold">{form.pen || '—'}</dd>
                </div>
                <div className="rounded bg-[#f5f3ed] p-2">
                  <dt className="text-[#444840]">Weight</dt>
                  <dd className="font-semibold">{form.weight ? `${form.weight} ${unit}` : '—'}</dd>
                </div>
                <div className="rounded bg-[#f5f3ed] p-2">
                  <dt className="text-[#444840]">Breed</dt>
                  <dd className="font-semibold">{form.breed || '—'}</dd>
                </div>
                <div className="rounded bg-[#f5f3ed] p-2">
                  <dt className="text-[#444840]">Status</dt>
                  <dd className="font-semibold">{form.status || '—'}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
              <h2 className="font-heading text-sm font-bold">Statutory checkpoints</h2>
              <ul className="mt-2 flex flex-col gap-2 text-xs text-[#444840]">
                {[
                  'Workspace ear-tag uniqueness is server-enforced',
                  'Dam and sire lineage verified by the server',
                  'Entry weight recorded in configured units',
                  'Attachments stored in private storage in production',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      aria-hidden="true"
                      size={14}
                      className="mt-0.5 shrink-0 text-[#2f4126]"
                    />{' '}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
