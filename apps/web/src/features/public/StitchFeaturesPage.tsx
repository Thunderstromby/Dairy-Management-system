import { useState } from 'react';
import innerHeroFeatures from '../../assets/inner-hero-features.png';
import { NeutralVisual, SectionHeading, StitchCTASection, StitchPageHero } from './StitchPageParts';

const MODULES = [
  {
    title: 'Animal Management',
    body: 'Organize identity, lifecycle groups and individual animal records in one registry.',
    detail: 'Record structure for animal identities, groups and lifecycle history.',
  },
  {
    title: 'Health Management',
    body: 'Keep health events and treatment records associated with the correct animal.',
    detail: 'Operational health records with restricted sensitive details.',
  },
  {
    title: 'Milk Production',
    body: 'Record milking sessions, daily totals and approved production reports.',
    detail: 'Session-level entries that roll into reviewed summaries.',
  },
  {
    title: 'Inventory Management',
    body: 'Track stock items, movements and current quantities in the farm workspace.',
    detail: 'Item records and usage history for daily stock decisions.',
  },
  {
    title: 'Feeding Management',
    body: 'Plan feeding allocations and record what was actually provided.',
    detail: 'Plans and actual feeding records kept side by side.',
  },
  {
    title: 'Worker Management',
    body: 'Maintain worker records as farm data, not login accounts.',
    detail: 'Role-aware worker records with sensitive fields protected.',
  },
  {
    title: 'Attendance Management',
    body: 'Keep attendance and leave information organized for the farm team.',
    detail: 'Attendance records with Farm Admin-only approval actions.',
  },
  {
    title: 'Payroll Management',
    body: 'Maintain approved salary and deduction records with restricted access.',
    detail: 'Privileged financial records visible only to Farm Admin.',
  },
  {
    title: 'Financial Management',
    body: 'Record approved income, expenses and financial reports.',
    detail: 'Finance records kept separate from Supervisor operations.',
  },
  {
    title: 'Equipment Management',
    body: 'Track equipment condition, service history and usage records.',
    detail: 'Maintenance and usage history for farm equipment.',
  },
  {
    title: 'Reports & Analytics',
    body: 'Review approved operational summaries and exports.',
    detail: 'Bounded reports built from records already entered in the workspace.',
  },
  {
    title: 'Notifications',
    body: 'Surface role-appropriate operational notices without simulated live status.',
    detail: 'Notifications constrained by the approved alert matrix.',
  },
] as const;

export function StitchFeaturesPage() {
  const [active, setActive] = useState(0);
  const module = MODULES[active];

  return (
    <>
      <StitchPageHero
        eyebrow="SmartFarm capabilities"
        title="Everything your dairy farm needs to stay connected."
        body="Bring animal information, milk production, daily operations, people management and farm reporting together in one organized platform."
        image={innerHeroFeatures}
        primaryLabel="Explore the Platform"
        primaryHref="#modules"
        secondaryLabel="Contact SmartFarm"
        secondaryHref="#/public/contact"
      />

      <section id="modules" className="bg-warm-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Modular operating suite"
            title="Explore All 12 Functional Modules"
            body="Select an area to review the record structure and the access boundaries that apply to it."
          />

          <div className="no-scrollbar -mx-6 mb-8 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
            {MODULES.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                className={`tab-btn shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${
                  active === index
                    ? 'active border-deep-forest bg-deep-forest text-white'
                    : 'border-border-subtle bg-white text-deep-forest hover:border-pasture-green'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <NeutralVisual title={`Module ${String(active + 1).padStart(2, '0')} — ${module.title}`}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <h3 className="font-heading text-2xl font-extrabold text-deep-forest">
                  {module.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-secondary-text">{module.body}</p>
                <p className="mt-4 text-sm font-medium text-pasture-green">{module.detail}</p>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-3 rounded-2xl bg-warm-ivory p-5">
                  {['Recorded entry A', 'Recorded entry B', 'Recorded entry C'].map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-border-subtle bg-white px-4 py-3"
                    >
                      <span className="text-sm text-deep-forest">{label}</span>
                      <span className="text-[11px] uppercase tracking-wider text-muted-text">
                        Neutral sample
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </NeutralVisual>
        </div>
      </section>

      <section className="bg-sage-mist/40 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Core herd intelligence"
              title="Know your herd, record by record."
              body="Comprehensive traceability across the lifespan starts with consistent individual records and careful permissions."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {[
              'Individual identity and grouping',
              'Lifecycle and history records',
              'Health event documentation',
              'Role-aware record visibility',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border-subtle bg-white p-5">
                <p className="text-sm font-semibold text-deep-forest">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Across the platform"
            title="One connected platform for dairy farm management."
            body="Bring animal information, milk production, daily operations, people management and farm reporting together in one organized platform."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                level: 'h3',
                title: 'Animal Registration & Paddock Roster',
                body: 'Organize identity, lifecycle groups and individual animal records in one registry.',
              },
              {
                level: 'h2',
                title: 'Keep animal health information organized.',
                body: 'Keep health events and treatment records associated with the correct animal.',
              },
              {
                level: 'h2',
                title: 'Bring milk production records together.',
                body: 'Record milking sessions, daily totals and approved production reports.',
              },
              {
                level: 'h2',
                title: 'Manage the details behind daily farm operations.',
                body: 'Track stock items, movements and current quantities in the farm workspace.',
              },
              {
                level: 'h3',
                title: 'Inventory Management',
                body: 'Item records and usage history for daily stock decisions.',
              },
              {
                level: 'h3',
                title: 'Feeding Management',
                body: 'Plans and actual feeding records kept side by side.',
              },
              {
                level: 'h3',
                title: 'Equipment Management',
                body: 'Maintenance and usage history for farm equipment.',
              },
              {
                level: 'h2',
                title: 'Organize the people and work behind your farm.',
                body: 'Maintain worker records as farm data, not login accounts.',
              },
              {
                level: 'h2',
                title: 'Keep farm financial information organized.',
                body: 'Record approved income, expenses and financial reports.',
              },
              {
                level: 'h3',
                title: 'Farm management workspace',
                body: 'Record structure for animal identities, groups and lifecycle history.',
              },
              {
                level: 'h3',
                title: 'Income and feed records',
                body: 'Record approved income, expenses and financial reports.',
              },
              {
                level: 'h2',
                title: 'See organized information. Stay informed.',
                body: 'Surface role-appropriate operational notices without simulated live status.',
              },
            ].map((item) => {
              const Heading = item.level === 'h2' ? 'h2' : 'h3';
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border-subtle bg-warm-ivory p-6"
                >
                  <Heading className="font-heading text-lg font-bold leading-snug text-deep-forest">
                    {item.title}
                  </Heading>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-text">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <StitchCTASection
        title="Ready to explore SmartFarm?"
        body="Review the illustrative workspace preview, then contact the team to discuss the right setup for your farm."
      />
    </>
  );
}
