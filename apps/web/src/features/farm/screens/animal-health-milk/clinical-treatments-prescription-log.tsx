import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  ClipboardList,
  Eye,
  FileText,
  Info,
  Lock,
  Plus,
  Search,
  ShieldAlert,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm sm:p-5">
      {title ? (
        <h2 className="mb-3 font-heading text-base font-bold text-[#1b1c18]">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

const summary = [
  { label: 'Active regimens', value: '07', note: 'Illustrative count · monitored' },
  { label: 'Completed (30d)', value: '34', note: 'Illustrative count' },
  { label: 'Records in ledger', value: '41', note: 'Illustrative total' },
];

const treatments = [
  {
    id: 'TX-0001',
    animal: 'Animal C',
    tag: 'TAG-A-03',
    pen: 'Pen H-1',
    diagnosis: 'Clinical note (illustrative)',
    therapy: 'Therapy details omitted',
    window: 'Sample dates',
    status: 'Restricted',
  },
  {
    id: 'TX-0002',
    animal: 'Animal A',
    tag: 'TAG-A-01',
    pen: 'Pen 04',
    diagnosis: 'Monitoring note (illustrative)',
    therapy: 'Therapy details omitted',
    window: 'Sample dates',
    status: 'Under observation',
  },
  {
    id: 'TX-0003',
    animal: 'Animal D',
    tag: 'TAG-A-04',
    pen: 'Pen 04',
    diagnosis: 'Routine note (illustrative)',
    therapy: 'Therapy details omitted',
    window: 'Sample dates',
    status: 'Cleared',
  },
  {
    id: 'TX-0004',
    animal: 'Animal B',
    tag: 'TAG-A-02',
    pen: 'Pen 02',
    diagnosis: 'Follow-up note (illustrative)',
    therapy: 'Therapy details omitted',
    window: 'Sample dates',
    status: 'Cleared',
  },
] as const;

export function ClinicalTreatmentsPrescriptionLog() {
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const visible = treatments.filter((item) =>
    `${item.id} ${item.animal} ${item.tag}`.toLowerCase().includes(query.toLowerCase()),
  );

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
              <span className="text-[#2f4126]">Treatments & prescriptions</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Clinical Treatments & Prescription Log
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Treatment record shell. Medication names, dosages, withdrawal formulas and veterinary
              instructions are intentionally omitted.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setNotice(
                  'Withholding details and clinical orders are restricted in this prototype.',
                )
              }
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#ffdad6] px-3.5 py-2 text-sm font-semibold text-[#ba1a1a] ${focus}`}
            >
              <ShieldAlert aria-hidden="true" size={15} /> Active withholding orders
            </button>
            <button
              type="button"
              aria-expanded={formOpen}
              onClick={() => setFormOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
            >
              <Plus aria-hidden="true" size={15} /> Add treatment record
            </button>
          </div>
        </header>

        <div className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Info aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#2f4126]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Veterinary record protocol</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Treatment records require authorized veterinary sign-off in production. No automatic
              medicine stock deduction, treatment algorithm or regulatory claim is applied in this
              visual prototype. Export and export-side countersignature controls are unwired.
            </p>
          </div>
        </div>

        <section aria-label="Treatment summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {summary.map((item) => (
            <Card key={item.label}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {item.label}
                </span>
                <ClipboardList aria-hidden="true" size={17} className="text-[#2f4126]" />
              </div>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </Card>
          ))}
          <Card>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                Withholding status
              </span>
              <AlertTriangle aria-hidden="true" size={17} className="text-[#ba1a1a]" />
            </div>
            <p className="mt-2 font-heading text-sm font-bold text-[#ba1a1a]">Restricted</p>
            <p className="mt-1 text-xs text-[#444840]">
              Clearance dates, diversion instructions and associated costs are not shown.
            </p>
          </Card>
        </section>

        {formOpen ? (
          <Card title="Clinical treatment entry form">
            <form
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice('Local draft validated. No treatment record is saved.');
              }}
            >
              {[
                ['Animal identification', 'Neutral tag lookup'],
                ['Clinical diagnosis', 'Illustrative note only'],
                ['Symptoms / presentation', 'No clinical values'],
                ['Medication & formulation', 'Medication details omitted'],
                ['Dosage & frequency', 'No dosage formula'],
                ['Administration route', 'Select route (not reproduced)'],
                ['Start date', 'Sample date'],
                ['Expected completion', 'Sample date'],
                ['Attending veterinarian', 'Neutral role placeholder'],
              ].map(([label, placeholder]) => (
                <div key={label}>
                  <label
                    htmlFor={`tx-${label}`}
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                  >
                    {label}
                  </label>
                  <input
                    id={`tx-${label}`}
                    placeholder={placeholder}
                    className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <p className="rounded-lg bg-[#f0eee8] p-3 text-xs text-[#444840]">
                  Milk and meat clearance fields, treatment cost and authorized sign-off are
                  omitted. No financial figures are shown.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <button
                  type="submit"
                  className={`rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  Validate locally
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className={`rounded-lg bg-[#f0eee8] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Close form
                </button>
              </div>
            </form>
            {notice ? (
              <p
                role="status"
                className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]"
              >
                <Info aria-hidden="true" size={14} /> {notice}
              </p>
            ) : null}
          </Card>
        ) : null}

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative min-w-[240px] flex-1">
              <Search
                aria-hidden="true"
                size={16}
                className="absolute left-3 top-2.5 text-[#444840]"
              />
              <label htmlFor="tx-search" className="sr-only">
                Search treatments
              </label>
              <input
                id="tx-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search treatment ID or animal"
                className={`w-full rounded-lg bg-[#f5f3ed] py-2 pl-9 pr-3 text-sm ${focus}`}
              />
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <select
                aria-label="Regimen status filter"
                className={`rounded-lg bg-[#f5f3ed] px-3 py-2 ${focus}`}
              >
                <option>All statuses</option>
              </select>
              <select
                aria-label="Withholding status filter"
                className={`rounded-lg bg-[#f5f3ed] px-3 py-2 ${focus}`}
              >
                <option>All withholding states</option>
              </select>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Treatment ID',
                    'Animal & pen',
                    'Diagnosis note',
                    'Therapy',
                    'Schedule',
                    'Safety / withholding',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-3">
                      <p className="font-mono text-xs font-semibold text-[#2f4126]">{item.id}</p>
                      <p className="text-[11px] text-[#444840]">Illustrative record</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-semibold">{item.animal}</p>
                      <p className="font-mono text-xs text-[#444840]">
                        {item.tag} · {item.pen}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.diagnosis}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.therapy}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.window}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Restricted' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#d9e8c7] text-[#2f4126]'}`}
                      >
                        <Lock aria-hidden="true" size={12} /> {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        aria-label={`View ${item.id}`}
                        className={`rounded-lg p-1.5 text-[#444840] ${focus}`}
                      >
                        <Eye aria-hidden="true" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {visible.length} illustrative records</span>
            <span className="flex items-center gap-1">
              <FileText aria-hidden="true" size={13} /> No financial values shown
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
