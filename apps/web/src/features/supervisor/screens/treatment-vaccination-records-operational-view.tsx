import { useState } from 'react';
import {
  CalendarDays,
  ClipboardList,
  HeartPulse,
  Info,
  LockKeyhole,
  Search,
  Syringe,
} from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const TABS = [
  'Accessible treatments',
  'Vaccination records',
  'Veterinary appointments',
  'Permitted disease history',
] as const;

const TREATMENTS = [
  {
    code: 'T-01',
    animal: 'Animal B-2071',
    pen: 'Observation group 04',
    condition: 'Veterinary-managed condition',
    phase: 'Monitoring stage',
    note: 'Supervisor may record observable behaviour and routine care actions only.',
  },
  {
    code: 'T-02',
    animal: 'Animal C-3088',
    pen: 'Milking group 01',
    condition: 'Veterinary-managed condition',
    phase: 'Follow-up stage',
    note: 'Medication, dosage and cost details are restricted to Farm Admin and veterinary staff.',
  },
] as const;

const VACCINES = [
  {
    animal: 'Animal B-2071',
    plan: 'Vaccination plan A',
    pen: 'Observation group 04',
    stage: 'Due (illustrative)',
  },
  { animal: 'Animal E-5120', plan: 'Vaccination plan B', pen: 'Dry group', stage: 'Recorded' },
  { animal: 'Animal D-4119', plan: 'Vaccination plan C', pen: 'Young stock', stage: 'Recorded' },
] as const;

const HISTORY = [
  {
    animal: 'Animal A-1042',
    item: 'Resolved routine case',
    note: 'Historical record · illustrative',
  },
  {
    animal: 'Animal C-3088',
    item: 'Resolved routine case',
    note: 'Historical record · illustrative',
  },
] as const;

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof HeartPulse;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#2f4126]" />
      <div>
        <h2 className="font-heading text-lg font-bold text-[#1b1c18]">{title}</h2>
        <p className="mt-1 text-sm text-[#444840]">{subtitle}</p>
      </div>
    </div>
  );
}

/** Source: stitch_smartfarm_supervisor_interface_shell/treatment_vaccination_records_operational_view */
export function TreatmentVaccinationRecordsOperationalViewScreen() {
  const [tab, setTab] = useState<string>('Accessible treatments');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const filteredVaccines = VACCINES.filter((row) =>
    `${row.animal} ${row.plan} ${row.pen}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Animal health</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Treatments &amp; vaccinations</span>
        </nav>

        <header className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
              Treatments, Vaccinations &amp; Veterinary Care
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#444840]">
              Operational view of permitted care records. Supervisors record observations and field
              administration notes; diagnoses, prescriptions, dosage instructions and costs are not
              exposed.
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-[#46583b] bg-[#f0eee8] p-4 lg:col-span-5">
            <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
              Field compliance boundary
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[#444840]">
              Treatment costs and financial invoices are restricted enterprise data and omitted from
              supervisor views. Treatment closure and prescription changes require veterinary or
              Farm Admin authorization.
            </p>
          </div>
        </header>

        <div
          role="tablist"
          aria-label="Permitted health record views"
          className="flex gap-1 overflow-x-auto rounded-xl bg-[#f0eee8] p-1.5"
        >
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150 motion-reduce:transition-none ${tab === item ? 'bg-[#2f4126] text-white' : 'text-[#444840] hover:bg-white'} ${focusRing}`}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === 'Accessible treatments' ? (
          <section className="space-y-4">
            <SectionTitle
              icon={HeartPulse}
              title="Accessible in-pen treatment records"
              subtitle="Care stages and permitted observation notes only · sample records"
            />
            {TREATMENTS.map((item) => (
              <article key={item.code} className="rounded-xl border border-[#c4c8bd] bg-white p-5">
                <div className="grid gap-4 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-base font-bold text-[#1b1c18]">
                        {item.animal}
                      </span>
                      <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-mono text-xs text-[#46583b]">
                        {item.pen}
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-xs text-[#556249]">{item.code}</p>
                    <p className="mt-1 text-sm font-semibold text-[#2f4126]">{item.condition}</p>
                    <p className="mt-1 text-xs text-[#444840]">Veterinary-managed record</p>
                  </div>
                  <div className="rounded-lg bg-[#f0eee8] p-4 lg:col-span-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                      Current stage
                    </p>
                    <p className="mt-1 font-heading text-base font-bold text-[#1b1c18]">
                      {item.phase}
                    </p>
                    <p className="mt-2 text-sm text-[#444840]">{item.note}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-3 lg:col-span-3">
                    <div className="rounded-lg bg-[#f0eee8] p-4 text-sm text-[#444840]">
                      <LockKeyhole size={16} aria-hidden="true" className="mb-2 text-[#46583b]" />
                      No medication, dose, invoice or diversion instruction is displayed.
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus(`${item.code}: protocol summary previewed.`)}
                      className={`h-10 rounded-lg border border-[#c4c8bd] text-sm font-semibold ${focusRing}`}
                    >
                      View protocol summary
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : null}

        {tab === 'Vaccination records' ? (
          <section className="space-y-4">
            <SectionTitle
              icon={Syringe}
              title="Vaccination log and due-date schedule"
              subtitle="Schedules follow approved herd protocols; supervisors record field notes only."
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Cycle coverage', value: '96%' },
                { label: 'Boosters due', value: '12' },
                { label: 'Completed cycles', value: '236' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                    {item.label}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-[#444840]">Illustrative</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-[#c4c8bd] bg-white p-5">
              <label className="relative block max-w-sm">
                <span className="sr-only">Search vaccination records</span>
                <Search
                  size={16}
                  aria-hidden="true"
                  className="absolute left-3 top-3 text-[#75786f]"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter by animal or plan"
                  className={`h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
                />
              </label>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                      <th scope="col" className="px-3 py-3">
                        Animal
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Plan
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Group
                      </th>
                      <th scope="col" className="px-3 py-3">
                        Stage
                      </th>
                      <th scope="col" className="px-3 py-3 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eee8]">
                    {filteredVaccines.map((row, index) => (
                      <tr key={`${row.animal}-${index}`}>
                        <td className="px-3 py-3 font-semibold text-[#1b1c18]">{row.animal}</td>
                        <td className="px-3 py-3">{row.plan}</td>
                        <td className="px-3 py-3">{row.pen}</td>
                        <td className="px-3 py-3">
                          <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                            {row.stage}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setStatus('Routine field observation entry previewed.')}
                            className={`rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold ${focusRing}`}
                          >
                            Record observation
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredVaccines.length === 0 ? (
                  <p className="py-8 text-center text-sm text-[#444840]">
                    No vaccination record matches this filter.
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {tab === 'Veterinary appointments' ? (
          <section className="space-y-3">
            <SectionTitle
              icon={CalendarDays}
              title="Veterinary appointments"
              subtitle="Read-only schedule established by Farm Admin and attending veterinary staff."
            />
            <div className="rounded-xl border border-[#c4c8bd] bg-white p-5">
              <span className="rounded bg-[#f0eee8] px-2 py-0.5 font-mono text-xs text-[#444840]">
                READ-ONLY
              </span>
              <h3 className="mt-3 font-heading text-base font-bold text-[#1b1c18]">
                Upcoming routine visit · sample schedule
              </h3>
              <p className="mt-1 text-sm text-[#444840]">
                Routine herd check and follow-up review. Appointment management is restricted to
                Farm Admin.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {['Animal A-1042', 'Animal B-2071', 'Animal C-3088', 'Animal E-5120'].map(
                  (item) => (
                    <li key={item} className="rounded-lg bg-[#f0eee8] p-3 text-sm">
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>
        ) : null}

        {tab === 'Permitted disease history' ? (
          <section className="space-y-3">
            <SectionTitle
              icon={ClipboardList}
              title="Permitted disease history"
              subtitle="Resolved historical records only. No high or critical alert content is present."
            />
            <div className="space-y-2">
              {HISTORY.map((item) => (
                <div
                  key={item.animal}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#c4c8bd] bg-white p-4"
                >
                  <div>
                    <p className="font-mono text-sm font-bold text-[#1b1c18]">{item.animal}</p>
                    <p className="mt-1 font-heading text-sm font-bold text-[#2f4126]">
                      {item.item}
                    </p>
                    <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
                  </div>
                  <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                    Resolved
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="flex flex-col gap-3 rounded-xl bg-[#f0eee8] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm text-[#444840]">
            <Info size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
            Permitted operational records are read-only here. No print, export or clinical
            escalation action is available to this role.
          </p>
          {status ? (
            <p role="status" className="shrink-0 text-xs font-semibold text-[#46583b]">
              {status}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
