import { useState } from 'react';
import { Info, LockKeyhole, Search, Sprout } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const COHORTS = [
  'All cohorts',
  'Milking groups',
  'Dry group',
  'Young stock',
  'Separate group',
] as const;

const PLANS = [
  {
    code: 'PLAN-A',
    cohort: 'Milking groups',
    name: 'Lactating group ration',
    group: 'Milking groups 01–03',
    note: 'Formulation maintained by Farm Admin',
    window: 'Morning / evening',
  },
  {
    code: 'PLAN-B',
    cohort: 'Dry group',
    name: 'Dry group ration',
    group: 'Dry group',
    note: 'Formulation maintained by Farm Admin',
    window: 'Morning',
  },
  {
    code: 'PLAN-C',
    cohort: 'Young stock',
    name: 'Young stock ration',
    group: 'Young stock',
    note: 'Formulation maintained by Farm Admin',
    window: 'Morning / afternoon',
  },
  {
    code: 'PLAN-D',
    cohort: 'Separate group',
    name: 'Separate group ration',
    group: 'Observation group 04',
    note: 'Formulation maintained by Farm Admin',
    window: 'Morning / evening',
  },
] as const;

const RUNS = [
  {
    time: '06:00',
    cohort: 'Milking groups',
    plan: 'PLAN-A',
    target: '2,400 kg',
    state: 'Recorded',
  },
  { time: '07:00', cohort: 'Young stock', plan: 'PLAN-C', target: '220 kg', state: 'Recorded' },
  { time: '08:30', cohort: 'Dry group', plan: 'PLAN-B', target: '850 kg', state: 'Recorded' },
  {
    time: '16:30',
    cohort: 'Milking groups',
    plan: 'PLAN-A',
    target: '2,200 kg',
    state: 'Scheduled',
  },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/assigned_feeding_plans_daily_schedule */
export function AssignedFeedingPlansDailyScheduleScreen() {
  const [cohort, setCohort] = useState<string>('All cohorts');
  const [query, setQuery] = useState('');
  const [window, setWindow] = useState('all');
  const [message, setMessage] = useState('');

  const plans = PLANS.filter((plan) => {
    const matchesCohort = cohort === 'All cohorts' || plan.cohort === cohort;
    const haystack = `${plan.code} ${plan.name} ${plan.group}`.toLowerCase();
    return matchesCohort && haystack.includes(query.trim().toLowerCase());
  });

  const runs = RUNS.filter((run) => window === 'all' || run.time === window);

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Feeding</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Assigned plans &amp; daily schedule</span>
        </nav>

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <LockKeyhole size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a461c]" />
          <p className="text-sm text-[#444840]">
            <strong className="text-[#1b1c18]">Supervisor view only.</strong> Plan formulation,
            nutrient overrides and target changes require Farm Admin authorization. Print and export
            actions are not available to this role.
          </p>
        </div>

        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#556249]">
              Feeding overview
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
              Assigned Feeding Plans &amp; Daily Schedule
            </h1>
            <p className="max-w-3xl text-sm text-[#444840]">
              Operational view of assigned plans, delivery windows and recorded runs. Composition
              details are reference-only and illustrative.
            </p>
          </div>
          <a
            href="#/farm/feeding/actual"
            className={`inline-flex h-11 items-center gap-2 rounded-lg bg-[#46583b] px-4 text-sm font-semibold text-white ${focusRing}`}
          >
            <Sprout size={17} aria-hidden="true" /> Record Actual Feeding
          </a>
        </header>

        <section
          aria-label="Feeding plan metrics"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'Active plans', value: '4', note: 'Reference count' },
            { label: 'Planned ration', value: '6,240 kg', note: 'Illustrative total' },
            { label: 'Assigned head', value: '128', note: 'Illustrative count' },
            { label: 'Runs recorded', value: '3 of 4', note: 'Sample shift' },
          ].map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {card.label}
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.note} · illustrative</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Cohort filter">
              {COHORTS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={cohort === item}
                  onClick={() => setCohort(item)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${cohort === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="relative w-full lg:max-w-xs">
              <span className="sr-only">Search feeding plans</span>
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search plan or group"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-[#f0eee8] pt-3">
            <label htmlFor="run-window" className="text-xs font-semibold uppercase text-[#444840]">
              Run window
            </label>
            <select
              id="run-window"
              value={window}
              onChange={(event) => setWindow(event.target.value)}
              className={`h-10 rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
            >
              <option value="all">All windows</option>
              <option value="06:00">06:00</option>
              <option value="07:00">07:00</option>
              <option value="08:30">08:30</option>
              <option value="16:30">16:30</option>
            </select>
            <button
              type="button"
              onClick={() => {
                setCohort('All cohorts');
                setQuery('');
                setWindow('all');
              }}
              className={`rounded-lg border border-[#c4c8bd] px-3 py-2 text-sm font-semibold ${focusRing}`}
            >
              Reset
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.code} className="rounded-xl border border-[#c4c8bd] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#2f4126] px-2 py-0.5 font-mono text-xs text-white">
                      {plan.code}
                    </span>
                    <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                      Active reference
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#556249]">{plan.window}</span>
                </div>
                <h3 className="mt-3 font-heading text-base font-bold text-[#1b1c18]">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-[#444840]">{plan.group}</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#f0eee8]">
                  <div className="h-full w-2/3 bg-[#556249]" aria-hidden="true" />
                </div>
                <p className="mt-2 text-xs text-[#444840]">
                  Illustrative composition bar · {plan.note}
                </p>
                <button
                  type="button"
                  onClick={() => setMessage(`${plan.code} opened as a read-only reference.`)}
                  className={`mt-4 h-10 w-full rounded-lg bg-[#f0eee8] text-sm font-semibold ${focusRing}`}
                >
                  View plan reference
                </button>
              </article>
            ))}
          </div>
          {plans.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-heading text-base font-bold">No matching feeding plans</p>
              <p className="mt-1 text-sm text-[#444840]">
                Adjust the cohort, search or run window.
              </p>
            </div>
          ) : null}
        </section>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                Daily feeding schedule
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Bunk delivery windows and sample run states · illustrative
              </p>
            </div>
            <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-xs text-[#444840]">
              Sample day
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Run time
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Cohort
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Plan
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Target
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    State
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {runs.map((run) => (
                  <tr key={`${run.time}-${run.cohort}`}>
                    <td className="px-3 py-3 font-mono font-semibold">{run.time}</td>
                    <td className="px-3 py-3">{run.cohort}</td>
                    <td className="px-3 py-3 font-mono text-[#46583b]">{run.plan}</td>
                    <td className="px-3 py-3 font-mono">{run.target}</td>
                    <td className="px-3 py-3 text-right">
                      <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                        {run.state}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {message ? (
            <p role="status" className="rounded-lg bg-[#d9e8c7] px-3 py-2 text-sm text-[#46583b]">
              {message}
            </p>
          ) : null}
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: 'Bunk observation',
              body: 'Record visible bunk condition in the actual feeding screen; no scoring formula is defined here.',
            },
            {
              title: 'Water points',
              body: 'Check availability and cleanliness as part of the routine shift walk.',
            },
            {
              title: 'Feed stores',
              body: 'Usage is recorded in the inventory usage screen. No automatic stock deduction is assumed.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <h3 className="font-heading text-sm font-bold text-[#1b1c18]">{item.title}</h3>
              <p className="mt-1 text-sm text-[#444840]">{item.body}</p>
            </div>
          ))}
        </section>

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            Nutritional formulas, residual scoring thresholds and weather-compensation rules are
            unresolved business rules and are not implemented in this prototype.
          </p>
        </div>
      </div>
    </main>
  );
}
