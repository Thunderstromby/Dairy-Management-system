import { useState } from 'react';
import innerHeroDashboardPreview from '../../assets/inner-hero-dashboard-preview.png';
import { NeutralVisual, SectionHeading, StitchCTASection, StitchPageHero } from './StitchPageParts';

const PREVIEW_TABS = [
  {
    label: 'Overview',
    title: 'Farm Daily Summary',
    body: 'A single place to review the approved operational picture without simulated live activity.',
    rows: ['Milking session status', 'Bulk tank record', 'Duty roster', 'Pending reviews'],
  },
  {
    label: 'Animals',
    title: 'Animal Ledger & Registrations',
    body: 'Individual records keep identity, grouping and lifecycle history together.',
    rows: ['Animal record A', 'Animal record B', 'Animal record C'],
  },
  {
    label: 'Health',
    title: 'Clinical Ledger & Withholdings',
    body: 'Sensitive health details stay within the approved role boundaries.',
    rows: ['Recorded event A', 'Recorded event B', 'Recorded event C'],
  },
  {
    label: 'Milk Production',
    title: 'Milk session entries',
    body: 'Session entries and daily totals stay structured for later review.',
    rows: ['Morning session', 'Evening session', 'Daily total'],
  },
  {
    label: 'Reports',
    title: 'Approved reports and exports',
    body: 'Reporting stays bounded by the access matrix and never presents simulated live views.',
    rows: ['Operational summary', 'Milk report', 'Inventory usage'],
  },
] as const;

const MANAGEMENT_AREAS = [
  'Farm Daily Summary',
  'Animal Ledger & Registrations',
  'Clinical Ledger & Withholdings',
  'Vat & Harvest Monitoring',
  'On-Farm Supplies & Feed Reserves',
  'Feed Allocation & Grazing Breaks',
  'Staff Rostering & Qualifications',
  'Shift Logs & Paddock Presence',
  'Payroll Export Verification',
  'Operational Cost Centers & Margins',
  'Farm Operational Statements',
  'Platform Dispatch & Logs',
  'Animal record overview',
  'Equipment service records',
  'Equipment records',
  'Operational records',
  'Feed and milk records',
] as const;

const STARTING_POINT = [
  'Herd Register Snapshot',
  'Operational Checklist',
  'Audited Event Log',
] as const;

const PRODUCTION_AREAS = ['Milk Production', 'Inventory & Silos', 'Pasture Allocation'] as const;

const PEOPLE_AREAS = ['Rostering & Shift Logs', 'Cost Center Breakdown & Margin'] as const;

const REVIEW_AREAS = [
  'Clinical Ledger & Withholding Safeguards',
  'Monthly Milk Quality Audit',
  'Withholding Compliance Log',
] as const;

function AreaCard({ title }: { title: string }) {
  return (
    <div className="cursor-default rounded-xl border border-border-subtle bg-warm-ivory px-4 py-3 transition-colors duration-200 hover:border-pasture-green/50 hover:bg-sage-mist motion-reduce:transition-none">
      <h3 className="font-heading text-sm font-bold text-deep-forest">{title}</h3>
    </div>
  );
}

export function StitchDashboardPreviewPage() {
  const [active, setActive] = useState(0);
  const tab = PREVIEW_TABS[active];

  return (
    <>
      <StitchPageHero
        eyebrow="Illustrative product preview"
        title="A clearer view of your dairy farm management."
        body="Take a closer look at how SmartFarm organizes animal information, milk production, daily operations, people management and reports. All values shown here are neutral placeholders."
        image={innerHeroDashboardPreview}
        primaryLabel="Explore Features"
        primaryHref="#/public/features"
        secondaryLabel="Contact SmartFarm"
        secondaryHref="#/public/contact"
      />

      <section className="bg-warm-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Preview notice"
            title="Demonstration interface only"
            body="This preview shows structure, not operational truth. No values are connected to a farm, and no calculation formula is implied."
          />

          <div className="overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-xl">
            <div className="flex items-center gap-2 border-b border-border-subtle bg-sage-mist/40 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border-subtle" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-subtle" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-subtle" aria-hidden="true" />
              <span className="ml-3 text-xs text-muted-text">Illustrative SmartFarm workspace</span>
            </div>

            <div className="grid gap-0 lg:grid-cols-12">
              <nav
                className="no-scrollbar flex gap-2 overflow-x-auto border-b border-border-subtle bg-warm-ivory/60 p-4 lg:col-span-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
                aria-label="Preview sections"
              >
                {PREVIEW_TABS.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={active === index}
                    onClick={() => setActive(index)}
                    className={`tab-btn shrink-0 rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                      active === index
                        ? 'active bg-deep-forest text-white'
                        : 'text-deep-forest hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="p-6 sm:p-8 lg:col-span-9">
                <NeutralVisual title={tab.title}>
                  <p className="mb-6 text-sm text-secondary-text">{tab.body}</p>
                  <div className="space-y-3">
                    {tab.rows.map((row) => (
                      <div
                        key={row}
                        className="flex items-center justify-between rounded-xl border border-border-subtle bg-warm-ivory px-4 py-3"
                      >
                        <span className="text-sm text-deep-forest">{row}</span>
                        <span className="text-xs font-semibold text-muted-text">—</span>
                      </div>
                    ))}
                  </div>
                </NeutralVisual>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-border-subtle bg-white p-7">
            <h3 className="font-heading text-xl font-bold text-deep-forest">
              Explore the platform's management areas.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">
              This preview shows structure, not operational truth. No values are connected to a
              farm, and no calculation formula is implied.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {MANAGEMENT_AREAS.map((area) => (
                <AreaCard key={area} title={area} />
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                An organized starting point for farm management.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                A single place to review the approved operational picture without simulated live
                activity.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {STARTING_POINT.map((area) => (
                  <AreaCard key={area} title={area} />
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                Animal information at a glance.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                Individual records keep identity, grouping and lifecycle history together.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-border-subtle bg-white p-7">
            <h3 className="font-heading text-lg font-bold text-deep-forest">
              Production and operations in one place.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">
              Session entries and daily totals stay structured for later review.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {PRODUCTION_AREAS.map((area) => (
                <AreaCard key={area} title={area} />
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                Organized information for people and management.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                Take a closer look at how SmartFarm organizes animal information, milk production,
                daily operations, people management and reports. All values shown here are neutral
                placeholders.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {PEOPLE_AREAS.map((area) => (
                  <AreaCard key={area} title={area} />
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                Review organized farm information.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                Reporting stays bounded by the access matrix and never presents simulated live
                views.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {REVIEW_AREAS.map((area) => (
                  <AreaCard key={area} title={area} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-border-subtle bg-white p-7">
            <h3 className="font-heading text-lg font-bold text-deep-forest">
              Access shaped around responsibility.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">
              This preview shows structure, not operational truth. No values are connected to a
              farm, and no calculation formula is implied.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {['Farm Admin Workspace', 'Farm Supervisor Console', 'Navigation'].map((area) => (
                <div
                  key={area}
                  className="cursor-default rounded-xl border border-border-subtle bg-warm-ivory p-4 transition-colors duration-200 hover:border-pasture-green/50 hover:bg-sage-mist motion-reduce:transition-none"
                >
                  <h3 className="font-heading text-sm font-bold text-deep-forest">{area}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StitchCTASection
        title="Want to see how SmartFarm fits your farm?"
        body="The production workspace uses actual records entered by authorized farm users. Contact the team to learn how provisioning works."
      />
    </>
  );
}
