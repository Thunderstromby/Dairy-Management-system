import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  ClipboardList,
  Eye,
  Filter,
  Info,
  Search,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

type Severity = 'Low' | 'Moderate' | 'High' | 'Critical';

const severityClass: Record<Severity, string> = {
  Low: 'bg-[#f0eee8] text-[#444840]',
  Moderate: 'bg-[#ffdcc6] text-[#7a461c]',
  High: 'bg-[#ffdad6] text-[#ba1a1a]',
  Critical: 'bg-[#ba1a1a] text-white',
};

type RecordRow = {
  tag: string;
  animal: string;
  presentation: string;
  category: string;
  severity: Severity;
  pen: string;
  status: string;
};

const rows: RecordRow[] = [
  {
    tag: 'TAG-A-03',
    animal: 'Animal C',
    presentation: 'Routine observation (illustrative)',
    category: 'Locomotion / hoof',
    severity: 'Low',
    pen: 'Pen H-1',
    status: 'Monitoring',
  },
  {
    tag: 'TAG-A-01',
    animal: 'Animal A',
    presentation: 'Clinical watch note (illustrative)',
    category: 'Metabolic',
    severity: 'Moderate',
    pen: 'Pen 04',
    status: 'Under review',
  },
  {
    tag: 'TAG-A-02',
    animal: 'Animal B',
    presentation: 'Minor abrasion (illustrative)',
    category: 'Udder',
    severity: 'Low',
    pen: 'Pen 02',
    status: 'Cleared',
  },
  {
    tag: 'TAG-A-04',
    animal: 'Animal D',
    presentation: 'Follow-up note (illustrative)',
    category: 'Respiratory',
    severity: 'Moderate',
    pen: 'Pen 04',
    status: 'Monitoring',
  },
];

function Metric({
  label,
  value,
  note,
  icon,
}: {
  label: string;
  value: string;
  note: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
          {label}
        </span>
        <span className="text-[#2f4126]">{icon}</span>
      </div>
      <p className="mt-3 font-heading text-2xl font-bold text-[#2f4126]">{value}</p>
      <p className="mt-1 text-xs text-[#444840]">{note}</p>
      <span className="mt-2 inline-block w-fit rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
        Illustrative
      </span>
    </div>
  );
}

export function HealthRecordsSeverityTriage() {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const [category, setCategory] = useState('all');
  const [pen, setPen] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visible = rows.filter((row) => {
    const matchesQuery = `${row.tag} ${row.animal} ${row.presentation}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesSeverity = severity === 'all' || row.severity === severity;
    const matchesCategory = category === 'all' || row.category === category;
    const matchesPen = pen === 'all' || row.pen === pen;
    return matchesQuery && matchesSeverity && matchesCategory && matchesPen;
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Herd & livestock</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Animal health</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Health Records & Severity Triage
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Illustrative clinical observations and severity labels. No diagnoses, medications,
              dosages or real animal identities are reproduced.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#f0eee8] px-3.5 py-2 text-sm font-semibold ${focus}`}
            >
              <Filter aria-hidden="true" size={15} /> Filter by pen / isolation
            </button>
            <p className="text-xs text-[#444840]">Export and incident logging are unwired here.</p>
          </div>
        </header>

        <section
          aria-label="Severity summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5"
        >
          <Metric
            label="Normal / cleared"
            value="1,262"
            note="Illustrative baseline"
            icon={<ClipboardList aria-hidden="true" size={18} />}
          />
          <Metric
            label="Low severity"
            value="11"
            note="Routine observations"
            icon={<Stethoscope aria-hidden="true" size={18} />}
          />
          <Metric
            label="Moderate"
            value="5"
            note="Under clinical watch"
            icon={<Info aria-hidden="true" size={18} />}
          />
          <div className="rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                High severity
              </span>
              <ShieldAlert aria-hidden="true" size={18} className="text-[#ba1a1a]" />
            </div>
            <p className="mt-3 font-heading text-sm font-bold text-[#ba1a1a]">Restricted</p>
            <p className="mt-1 text-xs text-[#444840]">
              Counts, identities and intervention details are limited to Farm Admin and are omitted.
            </p>
          </div>
          <div className="rounded-xl border border-[#ba1a1a]/30 bg-[#ffdad6] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ba1a1a]">
                Critical / quarantine
              </span>
              <AlertTriangle aria-hidden="true" size={18} className="text-[#ba1a1a]" />
            </div>
            <p className="mt-3 font-heading text-sm font-bold text-[#ba1a1a]">Restricted</p>
            <p className="mt-1 text-xs text-[#444840]">
              Isolation directives and quarantine records are not reproduced in this prototype.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="relative md:col-span-4">
              <Search
                aria-hidden="true"
                size={16}
                className="absolute left-3 top-2.5 text-[#444840]"
              />
              <label htmlFor="health-search" className="sr-only">
                Search health records
              </label>
              <input
                id="health-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tag, animal or observation"
                className={`w-full rounded-lg bg-[#f5f3ed] py-2 pl-9 pr-3 text-sm text-[#1b1c18] ${focus}`}
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="health-severity"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Severity
              </label>
              <select
                id="health-severity"
                value={severity}
                onChange={(event) => setSeverity(event.target.value)}
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All severities</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="health-category"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Category
              </label>
              <select
                id="health-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All categories</option>
                <option>Udder</option>
                <option>Metabolic</option>
                <option>Locomotion / hoof</option>
                <option>Respiratory</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="health-pen"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Housing pen
              </label>
              <select
                id="health-pen"
                value={pen}
                onChange={(event) => setPen(event.target.value)}
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All pens</option>
                <option>Pen 04</option>
                <option>Pen 02</option>
                <option>Pen H-1</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="health-range"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Period
              </label>
              <select
                id="health-range"
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option>Illustrative period</option>
              </select>
            </div>
          </div>
          {filtersOpen ? (
            <p className="mt-3 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
              Pen and isolation filters operate on the illustrative records only; no server query is
              made.
            </p>
          ) : null}
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f0eee8] px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-sm font-bold">Surveillance ledger records</h2>
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#444840]">
                {visible.length} illustrative rows
              </span>
            </div>
            <p className="text-xs text-[#444840]">Column controls and printing are not wired.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-[#f5f3ed] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Record & tag',
                    'Clinical presentation',
                    'Severity',
                    'Category',
                    'Housing pen',
                    'Status',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-4 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((row) => (
                  <tr key={row.tag} className="hover:bg-[#f5f3ed]">
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs font-semibold text-[#2f4126]">{row.tag}</p>
                      <p className="text-xs text-[#444840]">{row.animal}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{row.presentation}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${severityClass[row.severity]}`}
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />{' '}
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#444840]">{row.category}</td>
                    <td className="px-4 py-3 text-xs text-[#444840]">{row.pen}</td>
                    <td className="px-4 py-3 text-xs font-semibold">{row.status}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        aria-label={`View record for ${row.animal}`}
                        className={`rounded-lg p-1.5 text-[#444840] ${focus}`}
                      >
                        <Eye aria-hidden="true" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <Stethoscope aria-hidden="true" size={30} className="text-[#444840]" />
                <h3 className="font-heading text-base font-bold">No health incidents found</h3>
                <p className="max-w-md text-sm text-[#444840]">
                  No illustrative record matches the current filters. Adjust your search or filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSeverity('all');
                    setCategory('all');
                    setPen('all');
                  }}
                  className={`rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Reset filters
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
