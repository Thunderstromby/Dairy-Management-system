import { useState } from 'react';
import { NeutralVisual, SectionHeading, StitchCTASection, StitchPageHero } from './StitchPageParts';

const PREVIEW_TABS = [
  {
    label: 'Overview',
    title: 'Farm daily summary',
    body: 'A single place to review the approved operational picture without simulated live activity.',
    rows: ['Milking session status', 'Bulk tank record', 'Duty roster', 'Pending reviews'],
  },
  {
    label: 'Animals',
    title: 'Animal ledger and registrations',
    body: 'Individual records keep identity, grouping and lifecycle history together.',
    rows: ['Animal record A', 'Animal record B', 'Animal record C'],
  },
  {
    label: 'Health',
    title: 'Health event records',
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

export function StitchDashboardPreviewPage() {
  const [active, setActive] = useState(0);
  const tab = PREVIEW_TABS[active];

  return (
    <>
      <StitchPageHero
        eyebrow="Illustrative product preview"
        title="A clearer view of your dairy farm management."
        body="Take a closer look at how SmartFarm organizes animal information, milk production, daily operations, people management and reports. All values shown here are neutral placeholders."
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
        </div>
      </section>

      <StitchCTASection
        title="Discuss a real workspace setup"
        body="The production workspace uses actual records entered by authorized farm users. Contact the team to learn how provisioning works."
      />
    </>
  );
}
