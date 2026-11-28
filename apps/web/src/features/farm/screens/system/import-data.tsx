import {
  Check,
  ChevronRight,
  ClipboardList,
  Droplets,
  FileSpreadsheet,
  Info,
  Package,
  ShieldCheck,
  Trash2,
  UploadCloud,
  Users,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

const categories = [
  {
    id: 'herd',
    label: 'Herd registry & animals',
    detail: 'Illustrative animal identifiers and group references',
    icon: ClipboardList,
  },
  {
    id: 'milk',
    label: 'Milk production records',
    detail: 'Illustrative session yields and quality notes',
    icon: Droplets,
  },
  {
    id: 'inventory',
    label: 'Inventory & feed items',
    detail: 'Illustrative stock quantities and batches',
    icon: Package,
  },
  {
    id: 'workers',
    label: 'Workforce records',
    detail: 'Illustrative roster entries (not login accounts)',
    icon: Users,
  },
] as const;

const flagged = [
  {
    row: '#47',
    severity: 'Error',
    field: 'Animal ID',
    message: 'Illustrative missing required value.',
    state: 'Excluded',
  },
  {
    row: '#12',
    severity: 'Warning',
    field: 'Breed',
    message: 'Illustrative unrecognized abbreviation.',
    state: 'Flagged',
  },
  {
    row: '#89',
    severity: 'Warning',
    field: 'Group',
    message: 'Illustrative group differs from default.',
    state: 'Flagged',
  },
  {
    row: '#104',
    severity: 'Warning',
    field: 'Birth date',
    message: 'Illustrative date format normalized.',
    state: 'Flagged',
  },
] as const;

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    neutral: 'bg-[#eae8e2] text-[#444840]',
    primary: 'bg-[#d9e8c7] text-[#2f4126]',
    danger: 'bg-[#7a461c] text-white',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone] ?? tones.neutral}`}
    >
      {children}
    </span>
  );
}

export function ImportDataScreen() {
  const [category, setCategory] = useState<string>('herd');
  const [fileName, setFileName] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 py-6 md:p-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#444840]">
              <span>Data Management</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="text-[#2f4126]">Import Data</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Import Data
              </h1>
              <Badge tone="danger">
                <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
              </Badge>
              <Badge>Illustrative</Badge>
            </div>
            <p className="mt-1 text-sm text-[#444840]">
              Example workspace. This is a local preview: no file is uploaded, parsed, or imported,
              and no record is saved.
            </p>
          </div>
          <div className="rounded-xl border border-[#c4c8bd] bg-white px-4 py-2.5 shadow-sm">
            <p className="text-sm font-semibold">Farm Administrator (illustrative)</p>
            <p className="text-xs text-[#444840]">Example workspace GF-042</p>
          </div>
        </header>

        <section className="flex items-start gap-3 rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm">
          <Info size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Administrative review notice</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Importable modules, column mapping, duplicate handling, and partial-import behavior
              remain subject to approval. The validation figures below are illustrative examples,
              not results of a parsed file.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="category-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 id="category-title" className="font-heading text-lg font-bold text-[#2f4126]">
                1. Approved data category
              </h2>
              <p className="text-sm text-[#444840]">Illustrative categories only.</p>
            </div>
            <Badge tone="primary">4 example categories</Badge>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
                className={`flex flex-col justify-between gap-3 rounded-xl border-2 p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
                  category === item.id
                    ? 'border-[#46583b] bg-[#d9e8c7]/30'
                    : 'border-[#c4c8bd] bg-white hover:bg-[#f5f3ed]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-lg bg-[#f0eee8] p-2 text-[#46583b]">
                    <item.icon size={20} aria-hidden="true" />
                  </span>
                  {category === item.id ? (
                    <Badge tone="primary">Selected</Badge>
                  ) : (
                    <Badge>Available</Badge>
                  )}
                </div>
                <span>
                  <span className="font-heading block text-base font-bold">{item.label}</span>
                  <span className="mt-1 block text-xs text-[#444840]">{item.detail}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="upload-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <h2 id="upload-title" className="font-heading text-lg font-bold text-[#2f4126]">
            2. File upload &amp; preview
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            Local file selection only. Accepted extensions are shown for illustration; the file is
            not uploaded or parsed.
          </p>

          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#c4c8bd] bg-[#f5f3ed] p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#46583b] text-white">
                <FileSpreadsheet size={24} aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading font-bold">
                  {fileName ?? 'No file selected (illustrative preview)'}
                </p>
                <p className="text-xs text-[#444840]">
                  Selected category: {categories.find((item) => item.id === category)?.label}
                </p>
              </div>
            </div>
            {fileName ? (
              <button
                type="button"
                onClick={() => setFileName(null)}
                className="inline-flex items-center gap-1 rounded-lg bg-[#eae8e2] px-3 py-1.5 text-xs font-semibold text-[#7a461c] transition-colors motion-reduce:transition-none hover:bg-[#dcdad4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <Trash2 size={14} aria-hidden="true" /> Clear local selection
              </button>
            ) : null}
          </div>

          <label className="mt-3 block cursor-pointer rounded-xl border-2 border-dashed border-[#c4c8bd] bg-white p-8 text-center transition-colors motion-reduce:transition-none hover:bg-[#f5f3ed]">
            <UploadCloud size={28} aria-hidden="true" className="mx-auto text-[#46583b]" />
            <span className="mt-2 block text-sm font-semibold">
              Choose a spreadsheet locally (nothing is uploaded)
            </span>
            <span className="mt-1 block text-xs text-[#444840]">
              Accepted formats shown: .xlsx, .xls, .csv
            </span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
            />
          </label>
        </section>

        <section
          aria-labelledby="validation-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 id="validation-title" className="font-heading text-lg font-bold text-[#2f4126]">
                3. Validation &amp; import review
              </h2>
              <p className="text-sm text-[#444840]">Illustrative summary and flagged items.</p>
            </div>
            <Badge>Illustrative values</Badge>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Parsed rows', value: '142', tone: 'neutral' },
              { label: 'Ready records', value: '138', tone: 'primary' },
              { label: 'Warnings', value: '3', tone: 'danger' },
              { label: 'Errors', value: '1', tone: 'danger' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#444840]">
                  {item.label}
                </span>
                <p className="font-heading mt-2 text-2xl font-bold">{item.value}</p>
                <p className="mt-1 text-xs text-[#444840]">Example figure</p>
              </div>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-[#c4c8bd]">
            <div className="bg-[#eae8e2] px-4 py-2 text-xs font-bold uppercase tracking-wide">
              Flagged validation items (illustrative)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="bg-[#f0eee8] text-xs uppercase tracking-wide text-[#444840]">
                    <th scope="col" className="px-4 py-2 font-semibold">
                      Row
                    </th>
                    <th scope="col" className="px-3 py-2 font-semibold">
                      Severity
                    </th>
                    <th scope="col" className="px-3 py-2 font-semibold">
                      Field
                    </th>
                    <th scope="col" className="px-3 py-2 font-semibold">
                      Message
                    </th>
                    <th scope="col" className="px-4 py-2 text-right font-semibold">
                      State
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eae8e2]">
                  {flagged.map((item) => (
                    <tr key={item.row}>
                      <td className="px-4 py-3 font-mono text-xs">{item.row}</td>
                      <td className="px-3 py-3">
                        <Badge tone={item.severity === 'Error' ? 'danger' : 'neutral'}>
                          {item.severity}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-xs">{item.field}</td>
                      <td className="px-3 py-3 text-xs text-[#444840]">{item.message}</td>
                      <td className="px-4 py-3 text-right text-xs">{item.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="confirm-title"
          className="flex flex-col gap-4 rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2 id="confirm-title" className="font-heading text-lg font-bold text-[#2f4126]">
              4. Confirm import
            </h2>
            <p className="mt-1 text-sm text-[#444840]">
              Preview confirmation cannot import records into any workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setFileName(null);
                setNotice('Local preview reset.');
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <X size={16} aria-hidden="true" /> Cancel
            </button>
            <button
              type="button"
              onClick={() => setNotice('No records were imported — this is a local preview only.')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Check size={16} aria-hidden="true" /> Confirm import (preview only)
            </button>
          </div>
        </section>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no file was uploaded, no record was imported or saved.'}
        </p>
      </div>
    </div>
  );
}
