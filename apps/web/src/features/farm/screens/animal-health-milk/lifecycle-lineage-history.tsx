import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  GitBranch,
  Heart,
  History,
  Info,
  Lock,
  PawPrint,
  Scale,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const tabs = ['All transitions', 'Birth & calving', 'Group & pen', 'Veterinary & breeding'];

type EventItem = { title: string; type: string; date: string; detail: string; category: string };

const events: EventItem[] = [
  {
    title: 'Calving event',
    type: 'Birth & calving',
    date: 'Sample date 5',
    category: 'birth',
    detail:
      'Illustrative calving record with a neutral offspring reference. No birth weight or clinical value is reproduced.',
  },
  {
    title: 'Dry period transition',
    type: 'Group & pen',
    date: 'Sample date 4',
    category: 'pen',
    detail: 'Illustrative pen relocation record. No lactation yield or therapy detail is shown.',
  },
  {
    title: 'Breeding confirmation',
    type: 'Veterinary & breeding',
    date: 'Sample date 3',
    category: 'vet',
    detail:
      'Illustrative breeding record. No sire code, semen lot or diagnostic value is reproduced.',
  },
  {
    title: 'Heifer group promotion',
    type: 'Group & pen',
    date: 'Sample date 2',
    category: 'pen',
    detail: 'Illustrative cohort promotion record. No weight benchmark or formula is applied.',
  },
  {
    title: 'Birth registration',
    type: 'Birth & calving',
    date: 'Sample date 1',
    category: 'birth',
    detail:
      'Illustrative registration record with neutral dam reference and generated internal identifier placeholder.',
  },
];

const grandparents = [
  ['Paternal grandsire', 'Sire G-01'],
  ['Paternal granddam', 'Dam G-02'],
  ['Maternal grandsire', 'Sire G-03'],
  ['Maternal granddam', 'Dam G-04'],
];

export function LifecycleLineageHistory() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const category = activeTab.startsWith('Birth')
    ? 'birth'
    : activeTab.startsWith('Group')
      ? 'pen'
      : activeTab.startsWith('Veterinary')
        ? 'vet'
        : null;
  const visible = category ? events.filter((event) => event.category === category) : events;

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Workspace WS-001</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Livestock records</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">TAG-A-01</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Lifecycle History
            </h1>
            <p className="mt-1 text-sm text-[#444840]">
              Lineage and event audit preview. All names, dates and counts are illustrative.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9e8c7] px-3 py-1 text-xs font-semibold text-[#2f4126]">
              <BadgeCheck aria-hidden="true" size={14} /> Sealed log (prototype label)
            </span>
            <p className="text-xs text-[#444840]">
              Export and lifecycle transitions are not available here.
            </p>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start gap-4">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-[#f0eee8] text-[#2f4126]">
              <PawPrint aria-hidden="true" size={36} />
            </div>
            <div className="min-w-[220px] flex-1">
              <h2 className="font-heading text-2xl font-bold text-[#1b1c18]">Animal A</h2>
              <p className="mt-1 font-mono text-xs text-[#444840]">TAG-A-01 · ID-0001</p>
              <p className="mt-2 text-sm text-[#444840]">
                Illustrative breed, sex and cohort summary. No real animal identity is used.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5 rounded-lg bg-[#f5f3ed] px-3 py-2">
                <Scale aria-hidden="true" size={15} className="text-[#2f4126]" /> 642 kg
                illustrative
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-[#f5f3ed] px-3 py-2">
                <Heart aria-hidden="true" size={15} className="text-[#2f4126]" /> Routine status
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#d9e8c7] px-3 py-1.5 text-sm font-semibold text-[#2f4126]">
              Active (lactating cohort)
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#444840]">
              <Info aria-hidden="true" size={14} />
              Sold, deceased, removed and archive transitions are excluded from this prototype.
            </span>
          </div>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-heading text-lg font-bold">
                Lineage pedigree & genetic succession
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Three illustrative generations with neutral identifiers only.
              </p>
            </div>
            <span className="rounded-full bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#2f4126]">
              Parent records verified (prototype label)
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {grandparents.map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#f5f3ed] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#444840]">
                  {label}
                </p>
                <p className="mt-1 font-heading text-sm font-bold text-[#1b1c18]">{value}</p>
                <p className="text-xs text-[#444840]">Neutral placeholder</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-[#f0eee8] p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#eae8e2] text-[#7a461c]">
                <Heart aria-hidden="true" size={18} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7a461c]">
                  Dam (mother)
                </p>
                <p className="font-heading text-base font-bold">Animal D-01</p>
                <p className="text-xs text-[#444840]">TAG-D-01 · illustrative</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#f0eee8] p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#eae8e2] text-[#7a461c]">
                <GitBranch aria-hidden="true" size={18} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7a461c]">
                  Sire (father)
                </p>
                <p className="font-heading text-base font-bold">Sire S-01</p>
                <p className="text-xs text-[#444840]">Neutral registered sire placeholder</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#46583b] p-5 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#2f4126] text-[#d9e8c7]">
                <PawPrint aria-hidden="true" size={24} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#d9e8c7]">
                  Selected specimen
                </p>
                <p className="font-heading text-xl font-bold">Animal A</p>
                <p className="font-mono text-xs text-[#d9e8c7]">TAG-A-01 · ID-0001</p>
              </div>
            </div>
            <p className="text-xs text-[#d9e8c7]">
              Current status: active producer (illustrative label)
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            {[
              ['Animal E', 'TAG-A-05 · active heifer'],
              ['Animal G', 'TAG-A-07 · sold (illustrative)'],
            ].map(([name, detail]) => (
              <div
                key={name}
                className="flex items-center justify-between gap-2 rounded-xl bg-[#f5f3ed] p-4"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#444840]">
                    Direct offspring
                  </p>
                  <p className="font-heading text-sm font-bold">{name}</p>
                  <p className="text-xs text-[#444840]">{detail}</p>
                </div>
                <ArrowRight aria-hidden="true" size={16} className="text-[#2f4126]" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-lg font-bold">
            Chronological lifecycle & transition audit log
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            Illustrative event records. Authorization names, hashes and clinical details are
            omitted.
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Lifecycle event filters"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors motion-reduce:transition-none ${activeTab === tab ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focus}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <ol className="relative mt-5 flex flex-col gap-4 border-l border-[#c4c8bd] pl-6">
            {visible.map((event) => (
              <li key={event.title} className="relative rounded-xl bg-[#f5f3ed] p-4">
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-4 h-3 w-3 rounded-full border-2 border-white bg-[#2f4126]"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-[11px] font-semibold text-[#2f4126]">
                      {event.type}
                    </span>
                    <h3 className="font-heading text-sm font-bold">{event.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-[#444840]">{event.date}</span>
                </div>
                <p className="mt-2 text-sm text-[#444840]">{event.detail}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-[#444840]">
                  <History aria-hidden="true" size={13} /> Illustrative audit entry · no signature
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Lock aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Workspace isolation</h2>
            <p className="mt-1 text-xs text-[#444840]">
              Lifecycle entries belong to a single farm workspace in production. Transition
              controls, checksums and signing workflows are intentionally not reproduced in this
              visual prototype.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
