// Source-owned visual primitives for the Farm Admin operations screen ports.
// Stitch material-symbol glyphs are replaced with Lucide icons; all colour
// values below are the literal Stitch farm-panel palette from the source HTML.
import { AlertTriangle, Info, LockKeyhole } from 'lucide-react';
import type { ReactNode } from 'react';

export const inputClass =
  'h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 font-inter text-sm text-[#1b1c18] placeholder:text-[#444840]/70 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] motion-reduce:transition-none';

export const selectClass =
  'h-10 w-full appearance-none rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 pr-8 font-inter text-sm text-[#1b1c18] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] motion-reduce:transition-none';

export const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-4 py-2 font-inter text-sm font-semibold text-[#1b1c18] transition-colors duration-200 hover:bg-[#f0eee8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b] motion-reduce:transition-none';

export const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#46583b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b] motion-reduce:transition-none';

export const containerButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-[#46583b] px-4 py-2 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#2f4126] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b] motion-reduce:transition-none';

export type BadgeTone =
  'primary' | 'container' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'outline';

const badgeTones: Record<BadgeTone, string> = {
  primary: 'bg-[#2f4126] text-white',
  container: 'bg-[#46583b] text-white',
  secondary: 'bg-[#d9e8c7] text-[#2f4126]',
  tertiary: 'bg-[#7a461c] text-white',
  error: 'bg-[#ba1a1a] text-white',
  neutral: 'bg-[#f0eee8] text-[#444840]',
  outline: 'border border-[#c4c8bd] bg-white text-[#444840]',
};

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-inter text-xs font-semibold ${badgeTones[tone]}`}
    >
      {children}
    </span>
  );
}

export function IllustrativeBadge({ text = 'Illustrative' }: { text?: string }) {
  return <Badge tone="tertiary">{text}</Badge>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  badge = 'Farm Admin',
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-wider text-[#444840]">
          {eyebrow}
        </p>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[#2f4126] sm:text-3xl">
            {title}
          </h1>
          <Badge tone="secondary">{badge}</Badge>
        </div>
        <p className="mt-2 max-w-3xl font-inter text-sm leading-relaxed text-[#444840]">
          {description}
        </p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Notice({
  variant = 'info',
  title,
  children,
}: {
  variant?: 'info' | 'warning' | 'restricted';
  title: string;
  children: ReactNode;
}) {
  const Icon = variant === 'info' ? Info : variant === 'warning' ? AlertTriangle : LockKeyhole;
  const style =
    variant === 'warning'
      ? 'border-[#7a461c] bg-[#7a461c]/10 text-[#1b1c18]'
      : variant === 'restricted'
        ? 'border-[#ba1a1a] bg-[#ba1a1a]/10 text-[#1b1c18]'
        : 'border-[#c4c8bd] bg-[#d9e8c7]/40 text-[#1b1c18]';
  return (
    <div className={`mb-6 flex gap-3 rounded-xl border p-4 ${style}`} role="note">
      <Icon size={18} className="mt-0.5 shrink-0 text-[#2f4126]" aria-hidden="true" />
      <div>
        <h2 className="font-heading text-sm font-bold text-[#2f4126]">{title}</h2>
        <div className="mt-1 font-inter text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function PreviewNotice() {
  return (
    <Notice title="Illustrative local preview — no data is saved">
      All figures, references and records shown here are illustrative examples, not live farm data.
      Filters, tabs and forms run in the browser only; no entry is stored or submitted.
    </Notice>
  );
}

export function Card({
  title,
  subtitle,
  actions,
  children,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#c4c8bd] bg-white shadow-sm">
      {title ? (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#c4c8bd] px-5 py-4">
          <div>
            <h2 className="font-heading text-base font-bold text-[#1b1c18]">{title}</h2>
            {subtitle ? <p className="mt-1 font-inter text-xs text-[#444840]">{subtitle}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function SectionTitle({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-3">
      <h2 className="font-heading text-lg font-bold text-[#1b1c18]">{children}</h2>
      {note ? <span className="font-inter text-xs text-[#444840]">{note}</span> : null}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon,
  tone = 'primary',
}: {
  label: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  tone?: BadgeTone;
}) {
  const valueTone =
    tone === 'error' ? 'text-[#ba1a1a]' : tone === 'tertiary' ? 'text-[#7a461c]' : 'text-[#2f4126]';
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#444840]">
            {label}
          </p>
          <p className={`mt-1 font-heading text-2xl font-bold ${valueTone}`}>{value}</p>
        </div>
        <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]" aria-hidden="true">
          {icon}
        </span>
      </div>
      <p className="mt-3 font-inter text-xs text-[#444840]">{hint ?? 'Illustrative'}</p>
    </div>
  );
}

export function DataTable({
  headers,
  children,
  caption,
}: {
  headers: readonly string[];
  children: ReactNode;
  caption?: string;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#c4c8bd] bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left font-inter">
        {caption ? (
          <caption className="px-4 py-2 text-left text-xs text-[#444840]">{caption}</caption>
        ) : null}
        <thead className="bg-[#f0eee8] text-xs uppercase tracking-wider text-[#444840]">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#c4c8bd]/70 text-sm text-[#1b1c18]">{children}</tbody>
      </table>
    </div>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-[#c4c8bd] bg-white p-4">
      {children}
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  required = false,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-inter text-xs font-semibold uppercase tracking-wider text-[#444840]"
      >
        {label}
        {required ? (
          <>
            <span className="ml-1 text-[#ba1a1a]" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {children}
      {hint ? <p className="font-inter text-xs leading-relaxed text-[#444840]">{hint}</p> : null}
    </div>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'time' | 'number' | 'tel';
  required?: boolean;
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={id} required={required} hint={hint}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </Field>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={id} required={required} hint={hint}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-[#c4c8bd] bg-white px-6 py-12 text-center">
      <p className="font-heading text-base font-bold text-[#1b1c18]">{title}</p>
      <p className="mx-auto mt-2 max-w-lg font-inter text-sm text-[#444840]">{children}</p>
    </div>
  );
}

export function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav
      className="mt-5 flex flex-wrap items-center justify-between gap-3 font-inter text-sm"
      aria-label="Illustrative pagination"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={secondaryButtonClass + ' disabled:cursor-not-allowed disabled:opacity-50'}
      >
        Previous
      </button>
      <span className="text-[#444840]">
        Illustrative page {page} of {pageCount}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className={secondaryButtonClass + ' disabled:cursor-not-allowed disabled:opacity-50'}
      >
        Next
      </button>
    </nav>
  );
}

export function LocalOnlyNote() {
  return (
    <p className="mt-4 font-inter text-xs text-[#444840]">
      <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
      Local preview only — privileged actions are not performed and no values are persisted.
    </p>
  );
}
