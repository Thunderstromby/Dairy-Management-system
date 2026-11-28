import { useState } from 'react';
import {
  Activity,
  ChevronRight,
  ClipboardList,
  Eye,
  Info,
  Search,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const tabs = ['Health records', 'Disease ledger', 'Treatments', 'Vaccinations', 'Vet visits'];

const cases = [
  {
    date: 'Sample date',
    animal: 'Animal A',
    tag: 'TAG-A-01',
    condition: 'Clinical note (illustrative)',
    etiology: 'Etiology omitted',
    pen: 'Pen 04',
    severity: 'Moderate',
    related: 'Related ledger note',
    vet: 'Veterinary role',
  },
  {
    date: 'Sample date',
    animal: 'Animal B',
    tag: 'TAG-A-02',
    condition: 'Screening note (illustrative)',
    etiology: 'Etiology omitted',
    pen: 'Pen 02',
    severity: 'Low',
    related: 'Related ledger note',
    vet: 'Veterinary role',
  },
  {
    date: 'Sample date',
    animal: 'Animal D',
    tag: 'TAG-A-04',
    condition: 'Follow-up note (illustrative)',
    etiology: 'Etiology omitted',
    pen: 'Pen 04',
    severity: 'Low',
    related: 'Related ledger note',
    vet: 'Veterinary role',
  },
] as const;

export function DiseaseHistoryPathologicalSurveillance() {
  const [tab, setTab] = useState(tabs[1]);
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const [notice, setNotice] = useState('');

  const visible = cases.filter((item) => {
    const matchesQuery = `${item.tag} ${item.animal} ${item.condition}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesSeverity = severity === 'all' || item.severity === severity;
    return matchesQuery && matchesSeverity;
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Herd & livestock</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Animal health</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Pathological surveillance</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Disease History & Pathological Surveillance
              </h1>
              <span className="rounded-full bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#2f4126]">
                Surveillance active (prototype label)
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Illustrative disease records. Pathogen names, clinical values, therapies and
              High/Critical case details are omitted.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNotice('Disease record logging is not wired in this prototype.')}
            className={`rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
          >
            Log disease record
          </button>
        </header>

        <div
          className="flex flex-wrap gap-2 rounded-lg bg-[#f0eee8] p-1"
          role="tablist"
          aria-label="Health record sections"
        >
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors motion-reduce:transition-none ${tab === item ? 'bg-white text-[#2f4126] shadow-sm' : 'text-[#444840]'} ${focus}`}
            >
              {item}
            </button>
          ))}
        </div>
        {tab !== 'Disease ledger' ? (
          <p className="rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
            This prototype implements the Disease ledger tab. Other tabs are navigation previews
            only.
          </p>
        ) : null}

        <section
          aria-label="Disease summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <div className="rounded-xl border border-[#ba1a1a]/30 bg-[#ffdad6] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ba1a1a]">
                Active clinical cases
              </span>
              <ShieldAlert aria-hidden="true" size={17} className="text-[#ba1a1a]" />
            </div>
            <p className="mt-3 font-heading text-sm font-bold text-[#ba1a1a]">Restricted</p>
            <p className="mt-1 text-xs text-[#444840]">High/Critical case details are not shown.</p>
          </div>
          {[
            { label: 'Resolved cases (illustrative)', value: '34', note: 'Sample count' },
            { label: 'Monitored isolation', value: 'Pen H-1', note: 'Neutral pen label only' },
            { label: 'Diagnostic inspection', value: 'Current', note: 'Prototype status label' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {item.label}
                </span>
                <ClipboardList aria-hidden="true" size={17} className="text-[#2f4126]" />
              </div>
              <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-heading text-base font-bold">Pathological surveillance ledger</h2>
            <span className="rounded-full bg-[#f0eee8] px-2.5 py-1 text-[11px] font-semibold text-[#444840]">
              {visible.length} illustrative cases
            </span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="relative lg:col-span-4">
              <Search
                aria-hidden="true"
                size={16}
                className="absolute left-3 top-2.5 text-[#444840]"
              />
              <label htmlFor="disease-search" className="sr-only">
                Search disease records
              </label>
              <input
                id="disease-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tag or animal"
                className={`w-full rounded-lg bg-[#f5f3ed] py-2 pl-9 pr-3 text-sm ${focus}`}
              />
            </div>
            <div className="lg:col-span-2">
              <label
                htmlFor="disease-range"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Date range
              </label>
              <select
                id="disease-range"
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option>Illustrative period</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label
                htmlFor="disease-condition"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Condition
              </label>
              <select
                id="disease-condition"
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option>All conditions</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label
                htmlFor="disease-severity"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Severity
              </label>
              <select
                id="disease-severity"
                value={severity}
                onChange={(event) => setSeverity(event.target.value)}
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All severities</option>
                <option>Low</option>
                <option>Moderate</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label
                htmlFor="disease-pen"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Housing pen
              </label>
              <select
                id="disease-pen"
                className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
              >
                <option>All pens</option>
                <option>Pen 04</option>
                <option>Pen 02</option>
              </select>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Recorded date',
                    'Animal identity',
                    'Disease information',
                    'Housing pen',
                    'Severity',
                    'Related records',
                    'Attending vet',
                    'Action',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((item) => (
                  <tr key={item.tag}>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs">{item.date}</td>
                    <td className="px-3 py-3">
                      <p className="font-heading text-sm font-bold">{item.animal}</p>
                      <p className="font-mono text-xs text-[#444840]">{item.tag}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm font-semibold">{item.condition}</p>
                      <p className="text-xs text-[#444840]">{item.etiology}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.pen}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.severity === 'Moderate' ? 'bg-[#ffdcc6] text-[#7a461c]' : 'bg-[#f0eee8] text-[#444840]'}`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.related}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.vet}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        aria-label={`View record for ${item.animal}`}
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
              <div className="px-4 py-12 text-center">
                <Stethoscope aria-hidden="true" size={28} className="mx-auto text-[#444840]" />
                <p className="mt-2 font-heading text-sm font-bold">
                  No disease records match the current filters
                </p>
                <p className="mt-1 text-xs text-[#444840]">
                  Adjust the search or severity filter to continue.
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <h2 className="font-heading text-base font-bold">Ledger view states (local preview)</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ['Populated state', 'The table above shows illustrative records.'],
              ['Empty state', 'No records match the selected filters.'],
              ['Connection state', 'No live sync or telemetry indicator is reproduced.'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-lg bg-[#f5f3ed] p-3">
                <p className="font-heading text-sm font-bold">{title}</p>
                <p className="mt-1 text-xs text-[#444840]">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#ba1a1a]/30 bg-[#ffdad6] p-4">
          <div className="flex items-start gap-3">
            <Info aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#ba1a1a]" />
            <div>
              <h2 className="font-heading text-sm font-bold text-[#ba1a1a]">
                Monitored case dossier — restricted
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                High and Critical case dossiers, isolation directives, treatment references and
                chronological clinical notes are limited to Farm Admin and are not reproduced here.
              </p>
              <button
                type="button"
                onClick={() => setNotice('Clinical note entry is not wired in this prototype.')}
                className={`mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold ${focus}`}
              >
                Append clinical note
              </button>
              {notice ? (
                <p role="status" className="mt-2 text-xs text-[#444840]">
                  {notice}
                </p>
              ) : null}
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-[#444840]">
            <Activity aria-hidden="true" size={13} /> Severity is never conveyed by colour alone.
          </p>
        </section>
      </div>
    </div>
  );
}
