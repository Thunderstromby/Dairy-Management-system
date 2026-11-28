import { useState, type FormEvent } from 'react';
import { ClipboardCheck, HeartPulse, Info, LockKeyhole, Search, ShieldCheck } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

type Observation = {
  id: string;
  time: string;
  animal: string;
  pen: string;
  detail: string;
  severity: 'Routine' | 'Monitored';
  status: string;
  loggedBy: string;
};

const OBSERVATIONS: readonly Observation[] = [
  {
    id: 'O-01',
    time: 'Sample time',
    animal: 'Animal A-1042',
    pen: 'Milking group 02',
    detail: 'Mild gait stiffness observed during routine return-lane check.',
    severity: 'Monitored',
    status: 'Active observation',
    loggedBy: 'Supervisor on duty',
  },
  {
    id: 'O-02',
    time: 'Sample time',
    animal: 'Animal C-3088',
    pen: 'Milking group 01',
    detail: 'Routine fresh-cow screening completed; no deviation recorded.',
    severity: 'Routine',
    status: 'Logged',
    loggedBy: 'Supervisor on duty',
  },
  {
    id: 'O-03',
    time: 'Sample time',
    animal: 'Animal D-4119',
    pen: 'Young stock',
    detail: 'Hoof check following scheduled care; normal gait recorded.',
    severity: 'Routine',
    status: 'Logged',
    loggedBy: 'Supervisor on duty',
  },
];

const CHECKLIST = [
  'Fresh cow vitality and screening walk',
  'Morning parlor observation round',
  'Return-lane gait assessment',
  'Dry group routine inspection',
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/permitted_health_records_observation_entry */
export function PermittedHealthRecordsObservationEntryScreen() {
  const [query, setQuery] = useState('');
  const [severity, setSeverity] = useState('all');
  const [selected, setSelected] = useState<Observation | null>(null);
  const [animal, setAnimal] = useState('');
  const [category, setCategory] = useState('Locomotion / hoof observation');
  const [level, setLevel] = useState<'Routine' | 'Monitored'>('Routine');
  const [notes, setNotes] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [checked, setChecked] = useState<readonly number[]>([]);

  const visible = OBSERVATIONS.filter((row) => {
    const matchesSeverity = severity === 'all' || row.severity === severity;
    const haystack = `${row.id} ${row.animal} ${row.pen} ${row.detail}`.toLowerCase();
    return matchesSeverity && haystack.includes(query.trim().toLowerCase());
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!animal.trim()) {
      setFormMessage('Select or enter an animal before recording an observation.');
      return;
    }
    if (!notes.trim()) {
      setFormMessage('Add an observation note before recording the entry.');
      return;
    }
    if (notes.length > 500) {
      setFormMessage('Observation notes are limited to 500 characters.');
      return;
    }
    setFormMessage('Local draft validated. No record was saved in this prototype.');
  };

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
              <span>Farm Workspace</span>
              <span aria-hidden="true">/</span>
              <span>Animal health</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#1b1c18]">Permitted health records</span>
            </nav>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
              Permitted Animal Health Records
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[#444840]">
              Routine observation logging and preventive checks. High and critical clinical
              escalations are routed to Farm Admin and are never displayed in this view.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-4 text-sm font-semibold text-[#75786f]">
              <LockKeyhole size={16} aria-hidden="true" /> Export unavailable
            </span>
            <a
              href="#record-health-observation"
              className={`inline-flex h-11 items-center gap-2 rounded-lg bg-[#46583b] px-4 text-sm font-semibold text-white ${focusRing}`}
            >
              <ClipboardCheck size={17} aria-hidden="true" /> Log Health Observation
            </a>
          </div>
        </header>

        <section className="flex flex-col gap-3 rounded-xl bg-[#f0eee8] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
            <div>
              <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
                Supervisor scope: permitted health log
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Only routine and monitored observations are shown. Prescriptions, clinical
                escalation, treatment costs and retroactive medical edits require Farm Admin or
                veterinary authorization.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded bg-white px-3 py-1 font-mono text-xs text-[#46583b]">
            LOW / MODERATE ONLY
          </span>
        </section>

        <section aria-label="Health overview" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Active routine checks', value: '18', note: 'Illustrative completed / due' },
            { label: 'Monitored observations', value: '7', note: 'Routine watch only' },
            { label: 'Screenings pending', value: '4', note: 'Illustrative count' },
            { label: 'Routine follow-ups', value: '2', note: 'Informational' },
          ].map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {card.label}
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.note}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative w-full max-w-md">
              <span className="sr-only">Search health observations</span>
              <Search
                size={17}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search animal, pen or observation"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-10 pr-3 text-sm ${focusRing}`}
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <label
                htmlFor="severity-filter"
                className="text-xs font-semibold uppercase text-[#444840]"
              >
                Permitted severity
              </label>
              <select
                id="severity-filter"
                value={severity}
                onChange={(event) => setSeverity(event.target.value)}
                className={`h-11 rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option value="all">All permitted</option>
                <option value="Routine">Routine</option>
                <option value="Monitored">Monitored</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSeverity('all');
                }}
                className={`rounded-lg border border-[#c4c8bd] px-3 py-2 text-sm font-semibold text-[#444840] ${focusRing}`}
              >
                Reset
              </button>
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs text-[#444840]">
            <Info size={14} aria-hidden="true" /> Displaying permitted supervisor entries only.
            Clinical history and prescription logs are not part of this view.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Date / time
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Animal &amp; pen
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Observation
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Severity
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {visible.map((row) => (
                  <tr key={row.id}>
                    <td className="px-3 py-3">{row.time}</td>
                    <td className="px-3 py-3">
                      <span className="font-semibold text-[#1b1c18]">{row.animal}</span>
                      <span className="block text-xs text-[#444840]">{row.pen}</span>
                    </td>
                    <td className="max-w-xs px-3 py-3 text-[#444840]">{row.detail}</td>
                    <td className="px-3 py-3">
                      <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-3 py-3">{row.status}</td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(row)}
                        className={`rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold ${focusRing}`}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="py-10 text-center">
                <p className="font-heading text-base font-bold">No permitted observations found</p>
                <p className="mt-1 text-sm text-[#444840]">
                  No routine record matches the current filter.
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section
          id="record-health-observation"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6"
        >
          <div className="flex items-center gap-2">
            <HeartPulse size={20} aria-hidden="true" className="text-[#46583b]" />
            <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
              Record Health Observation
            </h2>
          </div>
          <p className="mt-1 text-sm text-[#444840]">
            Permitted operational scope · routine and monitored levels only.
          </p>

          <form onSubmit={submit} noValidate className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="health-animal" className="text-sm font-semibold">
                Animal
              </label>
              <input
                id="health-animal"
                type="text"
                value={animal}
                onChange={(event) => setAnimal(event.target.value)}
                placeholder="Enter animal ID or select from roster"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="health-category" className="text-sm font-semibold">
                Observation category
              </label>
              <select
                id="health-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option>Locomotion / hoof observation</option>
                <option>Routine udder check</option>
                <option>Appetite / bunk behavior</option>
                <option>Fresh cow recovery</option>
              </select>
            </div>
            <fieldset className="space-y-2 lg:col-span-2">
              <legend className="text-sm font-semibold">Permitted severity</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {(['Routine', 'Monitored'] as const).map((item) => (
                  <label key={item} className="flex items-start gap-3 rounded-lg bg-[#f0eee8] p-3">
                    <input
                      type="radio"
                      name="severity-entry"
                      value={item}
                      checked={level === item}
                      onChange={() => setLevel(item)}
                      className={`mt-1 accent-[#2f4126] ${focusRing}`}
                    />
                    <span>
                      <strong className="block text-sm text-[#1b1c18]">{item}</strong>
                      <span className="text-xs text-[#444840]">
                        {item === 'Routine' ? 'Standard daily check' : 'Requires daily follow-up'}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="flex items-center gap-2 rounded-lg bg-[#e4e2dd] px-3 py-2 text-xs text-[#444840]">
                <LockKeyhole size={14} aria-hidden="true" /> High / Critical severity tiers are
                restricted to veterinary or Farm Admin authorization.
              </p>
            </fieldset>
            <div className="space-y-1.5 lg:col-span-2">
              <label htmlFor="health-notes" className="text-sm font-semibold">
                Observation notes
              </label>
              <textarea
                id="health-notes"
                rows={4}
                maxLength={500}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Describe observable behavior only; no diagnosis or prescription."
                className={`w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] p-3 text-sm ${focusRing}`}
              />
              <div className="flex justify-between text-xs text-[#444840]">
                <span>{notes.length}/500 characters</span>
                <span>{category}</span>
              </div>
            </div>
            <div className="lg:col-span-2">
              {formMessage ? (
                <p
                  role="status"
                  className="mb-3 rounded-lg bg-[#d9e8c7] px-3 py-2 text-sm text-[#46583b]"
                >
                  {formMessage}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className={`h-11 rounded-lg bg-[#46583b] px-5 text-sm font-semibold text-white ${focusRing}`}
                >
                  Validate Observation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnimal('');
                    setNotes('');
                    setLevel('Routine');
                    setFormMessage('');
                  }}
                  className={`h-11 rounded-lg border border-[#c4c8bd] px-5 text-sm font-semibold ${focusRing}`}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-2">
            <h2 className="font-heading text-base font-bold text-[#1b1c18]">
              Daily supervisor health checklist
            </h2>
            <p className="mt-1 text-sm text-[#444840]">
              Local checklist state only; nothing is saved.
            </p>
            <ul className="mt-4 space-y-2">
              {CHECKLIST.map((item, index) => (
                <li key={item}>
                  <label className="flex items-center gap-3 rounded-lg bg-[#f0eee8] px-3 py-2">
                    <input
                      type="checkbox"
                      checked={checked.includes(index)}
                      onChange={() =>
                        setChecked((current) =>
                          current.includes(index)
                            ? current.filter((value) => value !== index)
                            : [...current, index],
                        )
                      }
                      className={`h-4 w-4 accent-[#2f4126] ${focusRing}`}
                    />
                    <span className="text-sm text-[#1b1c18]">{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#c4c8bd] bg-white p-5">
            <h2 className="font-heading text-base font-bold text-[#1b1c18]">Zone summary</h2>
            <p className="mt-1 text-sm text-[#444840]">Illustrative distribution.</p>
            <div className="mt-4 space-y-2 text-sm">
              {[
                ['Milking group 01', 'Routine checks complete'],
                ['Milking group 02', 'One monitored observation'],
                ['Young stock', 'Routine checks complete'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2 rounded-lg bg-[#f0eee8] p-3">
                  <span className="font-semibold text-[#1b1c18]">{label}</span>
                  <span className="text-right text-xs text-[#444840]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {selected ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Observation details"
            className="rounded-xl border border-[#c4c8bd] bg-white p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg font-bold">
                  Observation details · {selected.id}
                </h2>
                <p className="mt-1 text-sm text-[#444840]">
                  {selected.animal} · {selected.pen} · {selected.time}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className={`rounded-lg border border-[#c4c8bd] px-3 py-1.5 text-sm ${focusRing}`}
              >
                Close
              </button>
            </div>
            <p className="mt-4 rounded-lg bg-[#f0eee8] p-4 text-sm text-[#444840]">
              {selected.detail}
            </p>
            <p className="mt-3 text-xs text-[#444840]">
              Severity: {selected.severity} · Status: {selected.status} · Logged by:{' '}
              {selected.loggedBy}
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
