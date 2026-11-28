import {
  Banknote,
  Check,
  ChevronRight,
  ClipboardList,
  FileSpreadsheet,
  History,
  Info,
  LockKeyhole,
  ShieldCheck,
  Users,
  Droplets,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

const datasets = [
  {
    id: 'herd',
    label: 'Herd registry & lineage',
    detail: 'Illustrative animal directory and lifecycle references',
    icon: ClipboardList,
  },
  {
    id: 'milk',
    label: 'Milk production logs',
    detail: 'Illustrative session yields and collection records',
    icon: Droplets,
  },
  {
    id: 'health',
    label: 'Animal health & treatments',
    detail: 'Illustrative health, treatment and vaccination records',
    icon: ShieldCheck,
  },
  {
    id: 'inventory',
    label: 'Inventory & stock adjustments',
    detail: 'Illustrative item, purchase and adjustment records',
    icon: FileSpreadsheet,
  },
  {
    id: 'attendance',
    label: 'Workforce attendance',
    detail: 'Illustrative attendance and overtime records',
    icon: Users,
  },
  {
    id: 'finance',
    label: 'Farm finance (Admin only)',
    detail: 'Illustrative income and expense records',
    icon: Banknote,
  },
] as const;

const log = [
  {
    id: 'EXP-EXAMPLE-01',
    name: 'Milk production shift logs (example)',
    format: '.xlsx',
    state: 'Illustrative',
  },
  {
    id: 'EXP-EXAMPLE-02',
    name: 'Herd lineage records (example)',
    format: '.csv',
    state: 'Illustrative',
  },
  {
    id: 'EXP-EXAMPLE-03',
    name: 'Health & treatment records (example)',
    format: '.xlsx',
    state: 'Illustrative',
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

export function AvailableDataExportsScreen() {
  const [dataset, setDataset] = useState<string>('milk');
  const [range, setRange] = useState('current-month');
  const [shifts, setShifts] = useState(true);
  const [format, setFormat] = useState<'xlsx' | 'csv'>('xlsx');
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#444840]">
              <span>Reports &amp; Analytics</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="font-bold text-[#2f4126]">Available Data Exports</span>
            </div>
            <h1 className="font-heading mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Farm Workspace Data Export Center
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Export configuration layout for an example workspace. No file is generated, stored, or
              downloaded by this preview.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="danger">
              <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
            </Badge>
            <Badge>Illustrative</Badge>
          </div>
        </header>

        <section className="rounded-xl bg-[#f0eee8] p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-white p-2.5 text-[#7a461c] shadow-sm">
              <LockKeyhole size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-heading text-sm font-bold">Workspace scope boundary</h2>
              <p className="mt-1 text-sm text-[#444840]">
                Exports are confined to the authenticated workspace. Cross-workspace aggregation,
                bulk supervisor exports, and third-party dispatch are not available. Supported
                tabular formats in this preview are Excel (.xlsx) and CSV (.csv).
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="capabilities-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <h2 id="capabilities-title" className="font-heading text-lg font-bold">
            Format capability reference
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            Illustrative capability categories, not enabled exports.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              {
                label: 'Operations & biological',
                detail: 'Herd, milk, health, inventory and attendance datasets.',
                formats: ['.XLSX', '.CSV'],
              },
              {
                label: 'Finance (Admin only)',
                detail: 'Illustrative income and expense reports; formulas unresolved.',
                formats: ['PDF', '.XLSX', 'Print'],
              },
              {
                label: 'Workforce payslips',
                detail: 'Confidential documents; tabular export not offered here.',
                formats: ['PDF', 'Print'],
              },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#46583b]">
                  {item.label}
                </p>
                <p className="font-heading mt-1 text-base font-bold">{item.label}</p>
                <p className="mt-1 text-xs text-[#444840]">{item.detail}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.formats.map((formatLabel) => (
                    <span
                      key={formatLabel}
                      className="rounded bg-white px-2 py-1 font-mono text-xs text-[#444840] shadow-sm"
                    >
                      {formatLabel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
            <Info size={14} className="mt-0.5 shrink-0 text-[#7a461c]" aria-hidden="true" />
            Custom report designer, scheduled email dispatch, and third-party webhooks are excluded.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <section aria-labelledby="datasets-title" className="flex flex-col gap-3 xl:col-span-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 id="datasets-title" className="font-heading text-lg font-bold text-[#2f4126]">
                  Approved exportable datasets
                </h2>
                <p className="text-xs text-[#444840]">
                  Illustrative streams; selection is local only.
                </p>
              </div>
              <Badge>{datasets.length} examples</Badge>
            </div>
            {datasets.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={dataset === item.id}
                onClick={() => setDataset(item.id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
                  dataset === item.id
                    ? 'border-[#46583b] bg-white shadow-md'
                    : 'border-[#c4c8bd] bg-white hover:bg-[#f5f3ed]'
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    dataset === item.id ? 'bg-[#46583b] text-white' : 'bg-[#f0eee8] text-[#46583b]'
                  }`}
                >
                  <item.icon size={22} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-base font-bold">{item.label}</span>
                    {dataset === item.id ? <Badge tone="primary">Selected</Badge> : null}
                  </span>
                  <span className="mt-1 block text-xs text-[#444840]">{item.detail}</span>
                  <span className="mt-2 block font-mono text-xs text-[#556249]">.XLSX, .CSV</span>
                </span>
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                  className="mt-3 shrink-0 text-[#c4c8bd]"
                />
              </button>
            ))}
          </section>

          <aside
            aria-labelledby="config-title"
            className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm xl:col-span-5"
          >
            <div className="flex items-center justify-between border-b border-[#c4c8bd] pb-3">
              <h2 id="config-title" className="font-heading text-lg font-bold text-[#2f4126]">
                Export configuration
              </h2>
              <Badge>Illustrative</Badge>
            </div>
            <div className="mt-4 rounded-xl bg-[#f5f3ed] p-3 text-sm">
              <span className="block text-xs uppercase tracking-wide text-[#444840]">
                Selected dataset
              </span>
              <strong>{datasets.find((item) => item.id === dataset)?.label}</strong>
            </div>

            <fieldset className="mt-4">
              <legend className="mb-2 text-sm font-bold">Temporal date scope</legend>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'current-month', label: 'Current month' },
                  { id: '90-days', label: 'Past 90 days' },
                  { id: 'ytd', label: 'Current year' },
                  { id: 'custom', label: 'Custom range' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={range === option.id}
                    onClick={() => setRange(option.id)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors motion-reduce:transition-none ${
                      range === option.id
                        ? 'bg-[#46583b] text-white'
                        : 'bg-[#f0eee8] text-[#1b1c18] hover:bg-[#eae8e2]'
                    }`}
                  >
                    {option.label}
                    {range === option.id ? <Check size={14} aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-4 rounded-xl bg-[#f5f3ed] p-3">
              <legend className="text-xs font-bold uppercase tracking-wide text-[#444840]">
                Operational parameters
              </legend>
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={shifts}
                  onChange={(event) => setShifts(event.target.checked)}
                  className="h-4 w-4 accent-[#46583b]"
                />
                Include all recorded shifts (illustrative)
              </label>
              <p className="mt-2 text-xs text-[#444840]">
                No sensor metadata or device diagnostics are available in this preview.
              </p>
            </fieldset>

            <fieldset className="mt-4">
              <legend className="mb-2 text-sm font-bold">Target format</legend>
              <div className="space-y-2">
                {[
                  {
                    id: 'xlsx' as const,
                    label: 'Microsoft Excel (.xlsx)',
                    detail: 'Illustrative spreadsheet layout',
                  },
                  {
                    id: 'csv' as const,
                    label: 'Comma-separated values (.csv)',
                    detail: 'Illustrative raw tabular layout',
                  },
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${
                      format === option.id
                        ? 'border-[#46583b] bg-[#d9e8c7]/30'
                        : 'border-[#c4c8bd] bg-[#f5f3ed]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="export-format"
                      checked={format === option.id}
                      onChange={() => setFormat(option.id)}
                      className="mt-1 h-4 w-4 accent-[#46583b]"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span className="block text-xs text-[#444840]">{option.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() =>
                setNotice('No file was generated or downloaded — this is a local preview.')
              }
              className="mt-5 w-full rounded-xl bg-[#2f4126] px-4 py-3 text-sm font-bold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              Generate export (preview only)
            </button>
            <p className="mt-3 text-right text-xs text-[#444840]">
              No quota, checksum, processing state, or download is claimed.
            </p>
          </aside>
        </div>

        <section
          aria-labelledby="log-title"
          className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-[#c4c8bd] bg-[#f5f3ed] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <History size={18} aria-hidden="true" className="text-[#46583b]" />
              <div>
                <h2 id="log-title" className="font-heading text-lg font-bold">
                  Workspace export reference log
                </h2>
                <p className="text-xs text-[#444840]">
                  Illustrative rows only — no archive exists.
                </p>
              </div>
            </div>
            <Badge>{log.length} examples</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-xs uppercase tracking-wide text-[#444840]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Export ID
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Dataset
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Format
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {log.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-mono text-xs font-semibold">{row.id}</td>
                    <td className="px-3 py-3 text-xs">{row.name}</td>
                    <td className="px-3 py-3 font-mono text-xs">{row.format}</td>
                    <td className="px-4 py-3 text-right">
                      <Badge>{row.state}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no export file was created, stored, or downloaded.'}
        </p>
      </div>
    </div>
  );
}
