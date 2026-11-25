import { useState, type ReactNode } from 'react';
import { PublicHomeHero } from './PublicHomeHero';
import { InquiryForm } from './InquiryForm';
import { scrollToSection } from './scrollToSection';
import { STITCH_ASSETS } from './stitchAssets';

function Tick() {
  return (
    <svg className="h-5 w-5 text-pasture-green" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type FeatureTab = {
  id: string;
  label: string;
  badge: string;
  title: string;
  body: string;
  bullets: readonly string[];
  panel: ReactNode;
};

const FEATURE_TABS: readonly FeatureTab[] = [
  {
    id: 'tab-0',
    label: '01. Animal Management',
    badge: 'Feature 01 · Livestock Care',
    title: 'Animal Records, Profiles & Health History',
    body: 'Track individual cattle identity, lactation stages, veterinary treatments, vaccination timelines, and breeding pedigrees in a single clean ledger.',
    bullets: [
      'Animal records and identification',
      'Health profiles, treatments and vaccination records',
      'Calving timeline and lactation cycle history',
    ],
    panel: (
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center rounded-full bg-sage-mist px-3 py-1 text-xs font-bold tracking-wide text-deep-forest">
            Feature 01 · Livestock Care
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-deep-forest sm:text-3xl">
            Animal Records, Profiles &amp; Health History
          </h3>
          <p className="text-base leading-relaxed text-secondary-text">
            Track individual cattle identity, lactation stages, veterinary treatments, vaccination
            timelines, and breeding pedigrees in a single clean ledger.
          </p>
          <ul className="space-y-3 pt-2 text-sm font-medium text-deep-charcoal">
            <li className="flex items-center gap-3">
              <Tick />
              Animal records and identification
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Health profiles, treatments and vaccination records
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Calving timeline and lactation cycle history
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-warm-ivory p-5 shadow-inner sm:p-6 lg:col-span-7">
          <div className="mb-4 flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#E57373]" />
              <span className="h-3 w-3 rounded-full bg-[#FFD54F]" />
              <span className="h-3 w-3 rounded-full bg-[#81C784]" />
              <span className="ml-2 font-mono text-xs text-muted-text">
                smartfarm.app / livestock / herd-04
              </span>
            </div>
            <span className="rounded border border-border-subtle bg-white px-2.5 py-1 text-xs font-medium text-deep-forest">
              Illustrative herd
            </span>
          </div>
          <div className="space-y-3">
            {['Animal record A', 'Animal record B', 'Animal record C'].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-white p-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage-mist text-xs font-bold text-deep-forest">
                    —
                  </div>
                  <div>
                    <div className="text-sm font-bold text-deep-forest">{name}</div>
                    <div className="text-xs text-muted-text">Identity and lifecycle record</div>
                  </div>
                </div>
                <span className="rounded border border-pasture-green/20 bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-pasture-green">
                  Illustrative
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tab-1',
    label: '02. Milk Production',
    badge: 'Feature 02 · Yield & Quality',
    title: 'Milk Production Records & Bulk Tank Tracking',
    body: 'Log morning and evening parlor sessions, milk temperature, fat & protein percentages, and somatic cell counts in structured dairy records.',
    bullets: [
      'Morning and afternoon collection session tracking',
      'Vat temperature, butterfat and protein analysis logs',
      'Delivery batch receipts and quality certificates',
    ],
    panel: (
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center rounded-full bg-sage-mist px-3 py-1 text-xs font-bold tracking-wide text-deep-forest">
            Feature 02 · Yield &amp; Quality
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-deep-forest sm:text-3xl">
            Milk Production Records &amp; Bulk Tank Tracking
          </h3>
          <p className="text-base leading-relaxed text-secondary-text">
            Log morning and evening parlor sessions, milk temperature, fat &amp; protein
            percentages, and somatic cell counts in structured dairy records.
          </p>
          <ul className="space-y-3 pt-2 text-sm font-medium text-deep-charcoal">
            <li className="flex items-center gap-3">
              <Tick />
              Morning and afternoon collection session tracking
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Vat temperature, butterfat and protein analysis logs
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Delivery batch receipts and quality certificates
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-warm-ivory p-5 shadow-inner sm:p-6 lg:col-span-7">
          <div className="mb-4 flex items-center justify-between border-b border-border-subtle pb-4">
            <span className="font-heading text-sm font-bold text-deep-forest">
              Bulk Tank 1 · Illustrative capacity
            </span>
            <span className="rounded border border-border-subtle bg-white px-2 py-0.5 text-xs font-semibold text-pasture-green">
              Pending values
            </span>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3">
            {["Today's Total", 'Butterfat', 'Protein'].map((label) => (
              <div
                key={label}
                className="rounded-xl border border-border-subtle bg-white p-3 text-center"
              >
                <div className="text-xs font-semibold uppercase text-muted-text">{label}</div>
                <div className="mt-1 text-xl font-bold text-deep-forest">—</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border-subtle bg-white p-4">
            <div className="mb-2 flex justify-between text-xs text-secondary-text">
              <span>Illustrative delivery target</span>
              <span className="font-bold text-deep-forest">—</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-warm-ivory">
              <div className="h-2.5 w-3/5 rounded-full bg-pasture-green" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tab-2',
    label: '03. Farm Operations',
    badge: 'Feature 03 · Ground Operations',
    title: 'Feed Rations, Pasture Rotations & Equipment',
    body: 'Coordinate daily feed mix batches, track silage pit reserves, log tractor maintenance, and allocate paddock grazing intervals seamlessly.',
    bullets: [
      'TMR (Total Mixed Ration) feed recipe formulations',
      'Paddock grazing rotation and rest calendar',
      'Machinery service logs and parlor wash cycles',
    ],
    panel: (
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center rounded-full bg-sage-mist px-3 py-1 text-xs font-bold tracking-wide text-deep-forest">
            Feature 03 · Ground Operations
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-deep-forest sm:text-3xl">
            Feed Rations, Pasture Rotations &amp; Equipment
          </h3>
          <p className="text-base leading-relaxed text-secondary-text">
            Coordinate daily feed mix batches, track silage pit reserves, log tractor maintenance,
            and allocate paddock grazing intervals seamlessly.
          </p>
          <ul className="space-y-3 pt-2 text-sm font-medium text-deep-charcoal">
            <li className="flex items-center gap-3">
              <Tick />
              TMR (Total Mixed Ration) feed recipe formulations
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Paddock grazing rotation and rest calendar
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Machinery service logs and parlor wash cycles
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-warm-ivory p-5 shadow-inner sm:p-6 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="font-heading text-sm font-bold text-deep-forest">
              Active Paddock Management
            </span>
            <span className="text-xs text-secondary-text">Illustrative cycle</span>
          </div>
          <div className="space-y-3">
            {['Paddock record A', 'Paddock record B', 'Equipment service record'].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-white p-3"
              >
                <div>
                  <div className="text-sm font-semibold text-deep-forest">{name}</div>
                  <div className="text-xs text-muted-text">Approved record type</div>
                </div>
                <span className="rounded bg-green-50 px-2.5 py-1 text-xs font-semibold text-pasture-green">
                  Illustrative
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tab-3',
    label: '04. People Management',
    badge: 'Feature 04 · Farm Team',
    title: 'Worker Rosters, Milking Shifts & Safety',
    body: 'Keep the farm crew aligned with clear shift assignments, livestock task completions, and agricultural safety compliance records.',
    bullets: [
      'Morning & evening milking team rosters',
      'Chemical handling, machinery certs, and safety logs',
      'Clear task delegation and handover notes',
    ],
    panel: (
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center rounded-full bg-sage-mist px-3 py-1 text-xs font-bold tracking-wide text-deep-forest">
            Feature 04 · Farm Team
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-deep-forest sm:text-3xl">
            Worker Rosters, Milking Shifts &amp; Safety
          </h3>
          <p className="text-base leading-relaxed text-secondary-text">
            Keep the farm crew aligned with clear shift assignments, livestock task completions, and
            agricultural safety compliance records.
          </p>
          <ul className="space-y-3 pt-2 text-sm font-medium text-deep-charcoal">
            <li className="flex items-center gap-3">
              <Tick />
              Morning &amp; evening milking team rosters
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Chemical handling, machinery certs, and safety logs
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Clear task delegation and handover notes
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-warm-ivory p-5 shadow-inner sm:p-6 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="font-heading text-sm font-bold text-deep-forest">
              Daily Staff Duty Roster
            </span>
            <span className="rounded border border-border-subtle bg-white px-2 py-0.5 text-xs text-secondary-text">
              Illustrative roster
            </span>
          </div>
          <div className="space-y-3">
            {['Worker record A', 'Worker record B'].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-white p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-forest text-xs font-bold text-white">
                    —
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-deep-forest">{name}</div>
                    <div className="text-xs text-muted-text">Attendance record</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-pasture-green">Illustrative</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'tab-4',
    label: '05. Farm Intelligence',
    badge: 'Feature 05 · Decision Support',
    title: 'Operational Reports, Margins & Compliance',
    body: 'Connect milk records, feed costs, veterinary expenses and reporting into structured, auditable farm summaries.',
    bullets: [
      'Approved operational reports',
      'Role-aware summaries and exports',
      'Structured record history',
    ],
    panel: (
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center rounded-full bg-sage-mist px-3 py-1 text-xs font-bold tracking-wide text-deep-forest">
            Feature 05 · Decision Support
          </div>
          <h3 className="font-heading text-2xl font-extrabold text-deep-forest sm:text-3xl">
            Operational Reports, Margins &amp; Compliance
          </h3>
          <p className="text-base leading-relaxed text-secondary-text">
            Connect milk records, feed costs, veterinary expenses and reporting into structured,
            auditable farm summaries.
          </p>
          <ul className="space-y-3 pt-2 text-sm font-medium text-deep-charcoal">
            <li className="flex items-center gap-3">
              <Tick />
              Approved operational reports
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Role-aware summaries and exports
            </li>
            <li className="flex items-center gap-3">
              <Tick />
              Structured record history
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-warm-ivory p-5 shadow-inner sm:p-6 lg:col-span-7">
          <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="font-heading text-sm font-bold text-deep-forest">
              Quarterly Performance Ledger
            </span>
            <span className="rounded border border-border-subtle bg-white px-2 py-0.5 text-xs font-medium text-deep-forest">
              Illustrative
            </span>
          </div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            {['Feed cost', 'Milk margin'].map((label) => (
              <div key={label} className="rounded-xl border border-border-subtle bg-white p-3">
                <div className="text-xs text-muted-text">{label}</div>
                <div className="mt-1 text-lg font-bold text-deep-forest">—</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border-subtle bg-white p-3 text-xs text-secondary-text">
            <div className="mb-1 flex items-center justify-between">
              <span>Compliance summary</span>
              <span className="font-bold text-pasture-green">Approved values pending</span>
            </div>
            <p className="text-[11px] text-muted-text">Awaiting approved reporting values.</p>
          </div>
        </div>
      </div>
    ),
  },
];

function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-b border-border-subtle bg-warm-ivory py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-5">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
              <span className="h-2 w-2 rounded-full bg-pasture-green" />
              The Connected Dairy
            </div>
            <h2 className="mb-6 font-heading text-3xl font-extrabold leading-tight tracking-tight text-deep-forest sm:text-4xl lg:text-5xl">
              Better farm management starts with better-connected information.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-secondary-text sm:text-lg">
              From animal records and milk production to people and daily operations, SmartFarm
              brings essential dairy-farm management activities together in one organized platform.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-border-subtle pt-6">
              <div>
                <div className="font-heading text-2xl font-bold text-deep-forest sm:text-3xl">
                  Unified
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-text">
                  Single Farm Data Source
                </div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-deep-forest sm:text-3xl">
                  Organized
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-text">
                  Operational Records
                </div>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-xl">
              <img
                src={STITCH_ASSETS.aboutPasture}
                alt="Healthy dairy cows walking out to pasture past modern agricultural barn"
                className="h-[420px] w-full object-cover object-center sm:h-[500px]"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border-subtle/80 bg-white/95 p-4 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-pasture-green">
                    Daily Field Context
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-deep-charcoal">
                    Morning herd movement recorded and integrated directly with milking schedules.
                  </p>
                </div>
                <div className="hidden border-l border-border-subtle pl-4 text-right sm:block">
                  <span className="text-xs font-bold text-deep-forest">Illustrative</span>
                  <span className="block text-[11px] text-muted-text">Design preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="relative bg-sage-mist/40 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 max-w-3xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
            Platform Capability
          </span>
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-deep-forest sm:text-4xl lg:text-5xl">
            Every part of your farm. Better connected.
          </h2>
          <p className="font-inter text-lg text-secondary-text">
            Explore the tools that support the everyday work of managing a dairy farm.
          </p>
        </div>

        <div
          className="no-scrollbar mb-8 flex items-center gap-2 overflow-x-auto pb-4 sm:gap-3"
          role="tablist"
          aria-label="Platform capabilities"
        >
          {FEATURE_TABS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={item.id}
              id={`${item.id}-button`}
              onClick={() => setActive(index)}
              className={`tab-btn whitespace-nowrap rounded-xl border border-border-subtle px-5 py-3 font-manrope text-sm font-semibold shadow-sm hover:border-pasture-green ${
                active === index
                  ? 'active bg-white text-deep-forest'
                  : 'bg-white text-secondary-text'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-border-subtle bg-white p-6 shadow-xl sm:p-10 lg:p-12">
          {FEATURE_TABS.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              role="tabpanel"
              aria-labelledby={`${item.id}-button`}
              className={`tab-pane ${active === index ? 'active' : ''}`}
            >
              {index === active ? item.panel : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRevealSection() {
  return (
    <section className="relative border-b border-border-subtle bg-warm-ivory py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
            The Platform Interface
          </span>
          <h2 className="mb-5 font-heading text-3xl font-extrabold tracking-tight text-deep-forest sm:text-4xl lg:text-5xl">
            Meet the platform behind smarter dairy management.
          </h2>
          <p className="font-inter text-base leading-relaxed text-secondary-text sm:text-lg">
            One organized workspace for managing the information and everyday responsibilities of a
            dairy farm.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-2xl lg:rounded-3xl">
          <div className="flex items-center justify-between border-b border-deep-forest/40 bg-deep-forest px-6 py-4 text-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
              </div>
              <div className="ml-1 h-4 w-px bg-white/20" />
              <span className="flex items-center gap-2 font-heading text-sm font-bold tracking-wide">
                <span className="h-2 w-2 rounded-full bg-pasture-green" />
                SmartFarm Operations Hub
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="hidden sm:inline">Illustrative workspace</span>
              <span className="rounded bg-white/10 px-2.5 py-1 font-medium text-white">
                Sample interface
              </span>
            </div>
          </div>

          <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-between border-r border-border-subtle bg-warm-ivory/60 p-5 lg:col-span-3">
              <div className="space-y-1">
                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-text">
                  Management
                </div>
                <a
                  href="#features"
                  onClick={(event) => scrollToSection(event, 'features')}
                  className="flex items-center justify-between rounded-lg bg-deep-forest px-3 py-2 text-xs font-semibold text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <svg
                      className="h-4 w-4 text-pasture-green"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Daily Overview
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-harvest-gold" />
                </a>
                {[
                  'Animal Records',
                  'Milk Production',
                  'Paddock & Feed',
                  'Quality & Vet Reports',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center rounded-lg px-3 py-2 text-xs text-secondary-text transition-colors hover:bg-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="h-4 w-4 rounded border border-border-subtle bg-warm-ivory" />
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border-subtle bg-white p-3 text-[11px] text-secondary-text">
                <span className="mb-0.5 block font-bold text-deep-forest">Sample Interface</span>
                Displaying illustrative management dashboard layout.
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 lg:col-span-9">
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {['Daily Production', 'Bulk Tank Temp', 'Pending Health Checks'].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border-subtle bg-warm-ivory/40 p-4"
                  >
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-text">
                      {label}
                    </div>
                    <div className="mt-1 font-heading text-2xl font-bold text-deep-forest">—</div>
                    <div className="mt-1 text-[11px] font-medium text-muted-text">
                      Illustrative value
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-xl border border-border-subtle">
                <div className="flex items-center justify-between border-b border-border-subtle bg-sage-mist/40 px-5 py-3.5">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-deep-forest">
                    Illustrative Herd Health &amp; Yield Log
                  </span>
                  <span className="text-xs text-secondary-text">Sample layout</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-deep-charcoal">
                    <thead className="border-b border-border-subtle bg-warm-ivory/60 font-semibold uppercase text-muted-text">
                      <tr>
                        <th className="px-4 py-3">Tag ID</th>
                        <th className="px-4 py-3">Animal</th>
                        <th className="px-4 py-3">Yield (kg)</th>
                        <th className="px-4 py-3">Butterfat</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {['Animal record A', 'Animal record B', 'Animal record C'].map((name) => (
                        <tr key={name} className="transition-colors hover:bg-warm-ivory/30">
                          <td className="px-4 py-3.5 font-mono font-medium text-deep-forest">—</td>
                          <td className="px-4 py-3.5 font-medium">{name}</td>
                          <td className="px-4 py-3.5">—</td>
                          <td className="px-4 py-3.5">—</td>
                          <td className="px-4 py-3.5">
                            <span className="rounded bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-pasture-green">
                              Illustrative
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HOW_STEPS = [
  {
    title: 'Set up your farm',
    body: 'The farm workspace is prepared and provisioned by the SmartFarm team. Herd structures and user access are configured for the customer workspace.',
  },
  {
    title: 'Organize your operations',
    body: 'Farm information and daily operational records are managed through the platform. Milk collections, feeding, health checks and worker shifts are recorded by authorized users.',
  },
  {
    title: 'Manage with greater clarity',
    body: 'Connected records and reporting help farm management understand operations and review approved operational summaries.',
  },
] as const;

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-sage-mist/20 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 max-w-2xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
            Simple Implementation
          </span>
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-deep-forest sm:text-4xl lg:text-5xl">
            A clearer way to manage your farm.
          </h2>
          <p className="text-base text-secondary-text sm:text-lg">
            A dependable onboarding structure adapted directly to your dairy facilities.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-12 right-12 top-12 z-0 hidden h-[2px] bg-border-subtle md:block">
            <div className="h-full w-2/3 bg-pasture-green" />
          </div>
          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
            {HOW_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-border-subtle bg-white p-8 shadow-sm"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full font-heading text-xl font-bold text-white shadow-md ${
                    index === 0
                      ? 'bg-deep-forest'
                      : index === 1
                        ? 'bg-pasture-green'
                        : 'bg-harvest-gold text-deep-forest'
                  }`}
                >
                  0{index + 1}
                </div>
                <h3 className="mb-3 font-heading text-xl font-extrabold text-deep-forest">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary-text">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="relative border-b border-border-subtle bg-warm-ivory py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 max-w-3xl">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
            Real Operational Value
          </span>
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-deep-forest sm:text-4xl lg:text-5xl">
            Built for the realities of dairy-farm management.
          </h2>
          <p className="text-base text-secondary-text sm:text-lg">
            Practical digital organization designed for the physical demands of dairy farming.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-3xl bg-deep-forest p-8 text-white shadow-xl sm:p-12 lg:col-span-7">
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-harvest-gold">
                Benefit 01
              </div>
              <h3 className="mb-6 font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Organized farm information.
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Keep important livestock records, milking logs, and operational documents securely
                organized in one accessible location rather than scattered across paper whiteboards
                and disparate clipboards.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/15 pt-10">
              <div>
                <span className="block text-sm font-semibold text-white">Record history</span>
                <span className="text-xs text-white/60">
                  Historical herd records preserved in the workspace.
                </span>
              </div>
              <div>
                <span className="block text-sm font-semibold text-white">Role-aware access</span>
                <span className="text-xs text-white/60">
                  Appropriate visibility for Farm Admin and Supervisor.
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-1 flex-col justify-center rounded-3xl border border-border-subtle bg-white p-8 shadow-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
                Benefit 02
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-deep-forest sm:text-2xl">
                Connected daily operations.
              </h3>
              <p className="text-sm leading-relaxed text-secondary-text sm:text-base">
                Bring animal care, milking sessions, feed ration adjustments, and team assignments
                into one organized workflow that simplifies daily farm routines.
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center rounded-3xl border border-border-subtle bg-sage-mist/60 p-8 shadow-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-deep-forest">
                Benefit 03
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-deep-forest sm:text-2xl">
                Clearer operational visibility.
              </h3>
              <p className="text-sm leading-relaxed text-secondary-text sm:text-base">
                Understand herd activity, milk production records, and organized operational
                reporting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border-subtle bg-warm-ivory py-28 text-deep-charcoal lg:py-36"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-pasture-green/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-pasture-green">
              Direct Farm Consultation
            </span>
            <h2 className="mb-6 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-deep-forest sm:text-5xl lg:text-6xl">
              Ready to bring more clarity to your dairy operation?
            </h2>
            <p className="mb-10 max-w-xl font-inter text-lg leading-relaxed text-secondary-text">
              Talk with the SmartFarm team to learn how the platform can support your
              farm-management needs.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#inquiry-form"
                onClick={(event) => scrollToSection(event, 'inquiry-form')}
                className="inline-flex items-center justify-center rounded-lg bg-pasture-green px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-pasture-green/20 transition-all duration-200 hover:scale-[1.02] hover:bg-[#2c6346] focus:ring-2 focus:ring-pasture-green"
              >
                Contact SmartFarm
              </a>
              <a
                href="#features"
                onClick={(event) => scrollToSection(event, 'features')}
                className="inline-flex items-center justify-center rounded-lg border border-deep-forest bg-white px-8 py-3.5 text-base font-semibold text-deep-forest shadow-sm transition-all duration-200 hover:bg-sage-mist/40"
              >
                Explore the Platform
              </a>
            </div>
          </div>
          <div
            id="inquiry-form"
            className="rounded-3xl border border-border-subtle bg-white p-8 text-deep-charcoal shadow-xl sm:p-10 lg:col-span-5"
          >
            <h3 className="mb-2 font-heading text-xl font-bold text-deep-forest">
              Speak With a Specialist
            </h3>
            <p className="mb-6 text-xs text-secondary-text">
              We will contact you to discuss your herd structure and operations.
            </p>
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandStrip() {
  const items = [
    'SMART FARM',
    'SMART FARM',
    'SMART FARM',
    'SMART FARM',
    'SMART FARM',
    'SMART FARM',
  ];

  return (
    <div className="sf-stitch-brand-strip overflow-hidden border-t border-border-subtle/80 bg-white py-6">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-8 font-heading text-xs font-extrabold uppercase tracking-[0.28em] text-[#245C45] sm:text-sm"
          >
            {item}
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                index % 2 === 0 ? 'bg-harvest-gold' : 'bg-pasture-green'
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function StitchHomePage() {
  return (
    <>
      <PublicHomeHero />
      <AboutSection />
      <FeaturesSection />
      <ProductRevealSection />
      <HowItWorksSection />
      <BenefitsSection />
      <ContactSection />
      <BrandStrip />
    </>
  );
}
