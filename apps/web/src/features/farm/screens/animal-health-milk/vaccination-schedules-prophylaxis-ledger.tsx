import { useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Filter,
  Info,
  Plus,
  Search,
  ShieldCheck,
  Syringe,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const presets = ['Due soon', 'Zero state', 'Record preview'];

const records = [
  {
    id: 'VAC-0001',
    subject: 'Animal A',
    tag: 'TAG-A-01',
    vaccine: 'Vaccination record (illustrative)',
    administered: 'Sample date',
    due: 'Sample date',
    status: 'Valid',
  },
  {
    id: 'VAC-0002',
    subject: 'Cohort Pen 02',
    tag: 'Group record',
    vaccine: 'Cohort vaccination (illustrative)',
    administered: 'Sample date',
    due: 'Sample date',
    status: 'Due soon',
  },
  {
    id: 'VAC-0003',
    subject: 'Animal C',
    tag: 'TAG-A-03',
    vaccine: 'Vaccination record (illustrative)',
    administered: 'Sample date',
    due: 'Sample date',
    status: 'Valid',
  },
] as const;

export function VaccinationSchedulesProphylaxisLedger() {
  const [preset, setPreset] = useState(presets[0]);
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const visible = records.filter((item) => {
    if (preset === 'Zero state') return false;
    if (preset === 'Due soon' && item.status !== 'Due soon') return false;
    return `${item.id} ${item.subject} ${item.tag}`.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Herd & livestock</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Animal health</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Vaccinations & prophylaxis</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Vaccinations & Prophylaxis Ledger
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Recorded immunizations and next due dates. Vaccine products, batch lots, dosages and
              regulatory identifiers are not reproduced.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotice('Export is not wired in this prototype.')}
              className={`rounded-lg bg-[#f0eee8] px-3.5 py-2.5 text-sm font-semibold ${focus}`}
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setNotice('Campaign planning is not available in this prototype.')}
              className={`rounded-lg bg-[#f0eee8] px-3.5 py-2.5 text-sm font-semibold ${focus}`}
            >
              Plan campaign
            </button>
            <button
              type="button"
              aria-expanded={formOpen}
              onClick={() => setFormOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white ${focus}`}
            >
              <Plus aria-hidden="true" size={15} /> Add vaccination record
            </button>
          </div>
        </header>

        <section
          aria-label="Vaccination summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Overdue immunizations',
              value: '0',
              note: 'Illustrative count',
              icon: <ShieldCheck aria-hidden="true" size={18} />,
            },
            {
              label: 'Due within 7 days',
              value: '124',
              note: 'Illustrative head count',
              icon: <CalendarDays aria-hidden="true" size={18} />,
            },
            {
              label: 'Due within 30 days',
              value: '310',
              note: 'Illustrative head count',
              icon: <ClipboardCheck aria-hidden="true" size={18} />,
            },
            {
              label: 'Immunity coverage',
              value: '97.4%',
              note: 'Illustrative ratio; no formula applied',
              icon: <Syringe aria-hidden="true" size={18} />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {item.label}
                </span>
                <span className="text-[#2f4126]">{item.icon}</span>
              </div>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4 shadow-sm">
          <div className="flex flex-wrap items-start gap-3">
            <Syringe aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-[#7a461c]" />
            <div className="flex-1">
              <h2 className="font-heading text-sm font-bold text-[#7a461c]">
                Upcoming herd immunization event
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                A sample cohort due date is shown as an illustrative record. Notification lead times
                and reminder repetition are farm-configured; no automatic dispatch occurs.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setNotice('Checklist preparation is not wired.')}
                  className={`rounded-lg bg-[#eae8e2] px-3.5 py-2 text-sm font-semibold ${focus}`}
                >
                  Prepare checklist
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className={`rounded-lg bg-[#2f4126] px-3.5 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  Initiate batch record
                </button>
              </div>
            </div>
          </div>
        </section>

        <div
          className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#f0eee8] p-2"
          role="tablist"
          aria-label="Vaccination preset views"
        >
          <div className="flex flex-wrap gap-1">
            {presets.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={preset === item}
                onClick={() => setPreset(item)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${preset === item ? 'bg-white text-[#2f4126] shadow-sm' : 'text-[#444840]'} ${focus}`}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="px-2 text-xs text-[#444840]">Local view switch only</span>
        </div>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative sm:col-span-2">
              <Search
                aria-hidden="true"
                size={16}
                className="absolute left-3 top-2.5 text-[#444840]"
              />
              <label htmlFor="vac-search" className="sr-only">
                Search vaccination records
              </label>
              <input
                id="vac-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search record ID or cohort"
                className={`w-full rounded-lg bg-[#f5f3ed] py-2 pl-9 pr-3 text-sm ${focus}`}
              />
            </div>
            {['Antigen type', 'Pen / cohort', 'Compliance status', 'Administering staff'].map(
              (label) => (
                <div key={label}>
                  <label
                    htmlFor={`vac-${label}`}
                    className="mb-1 block text-xs font-semibold text-[#444840]"
                  >
                    {label}
                  </label>
                  <select
                    id={`vac-${label}`}
                    className={`w-full rounded-lg bg-[#f5f3ed] px-3 py-2 text-sm ${focus}`}
                  >
                    <option>All</option>
                  </select>
                </div>
              ),
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setPreset(presets[0]);
            }}
            className={`mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#f0eee8] px-3 py-2 text-xs font-semibold ${focus}`}
          >
            <Filter aria-hidden="true" size={14} /> Clear filters
          </button>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f0eee8] px-4 py-3">
            <h2 className="font-heading text-sm font-bold">Master vaccination ledger</h2>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#444840]">
              {visible.length} illustrative records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead className="bg-[#f5f3ed] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Record ID',
                    'Animal / cohort',
                    'Vaccination',
                    'Administered',
                    'Next due',
                    'Route & dose',
                    'Administered by',
                    'Reminder status',
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
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-[#2f4126]">
                      {item.id}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-semibold">{item.subject}</p>
                      <p className="text-xs text-[#444840]">{item.tag}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.vaccine}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.administered}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.due}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">Details omitted</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">Authorized staff role</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Due soon' ? 'bg-[#ffdcc6] text-[#7a461c]' : 'bg-[#d9e8c7] text-[#2f4126]'}`}
                      >
                        {item.status === 'Valid' ? (
                          <Check aria-hidden="true" size={12} />
                        ) : (
                          <CalendarDays aria-hidden="true" size={12} />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">View</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <Syringe aria-hidden="true" size={28} className="mx-auto text-[#444840]" />
                <h3 className="mt-2 font-heading text-sm font-bold">
                  No vaccination records found
                </h3>
                <p className="mt-1 text-xs text-[#444840]">
                  No illustrative records match the current view or filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPreset(presets[0]);
                    setQuery('');
                  }}
                  className={`mt-3 rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Clear filters
                </button>
              </div>
            ) : null}
          </div>
        </section>

        {formOpen ? (
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Log vaccination event</h2>
            <p className="mt-1 text-xs text-[#444840]">Local form preview; no record is stored.</p>
            <form
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice('Local draft validated. No record saved.');
              }}
            >
              {[
                'Target animal / cohort',
                'Vaccination name',
                'Manufacturer / lot',
                'Administered date',
                'Next due date',
                'Route',
                'Dose',
                'Administering clinician',
              ].map((label) => (
                <div key={label}>
                  <label
                    htmlFor={`form-${label}`}
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                  >
                    {label} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    id={`form-${label}`}
                    className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                    placeholder="Illustrative value"
                  />
                </div>
              ))}
              <div className="flex gap-2 sm:col-span-2">
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
                  Close
                </button>
              </div>
            </form>
            {notice ? (
              <p role="status" className="mt-3 rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]">
                {notice}
              </p>
            ) : null}
          </section>
        ) : null}

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ['Attending veterinary protocol', 'Neutral staff role; no licence identifiers.'],
            ['Configured reminder policy', 'Lead time is farm-configured; no value is invented.'],
            ['Regulatory dossier', 'Record metadata only; no state or accreditation identifiers.'],
          ].map(([title, detail]) => (
            <div
              key={title}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <p className="font-heading text-sm font-bold">{title}</p>
              <p className="mt-1 text-xs text-[#444840]">{detail}</p>
            </div>
          ))}
        </section>
        <p className="flex items-center gap-1.5 text-xs text-[#444840]">
          <Info aria-hidden="true" size={13} /> All figures and dates above are illustrative and are
          not live data.
        </p>
      </div>
    </div>
  );
}
