import { useState } from 'react';
import {
  ArrowUpRight,
  Beef,
  CalendarCheck,
  CalendarClock,
  ChartColumn,
  ChartNoAxesCombined,
  ClipboardCheck,
  ClipboardList,
  FileCheck2,
  LayoutDashboard,
  ListChecks,
  Milk,
  Package,
  Route,
  Shield,
  Stethoscope,
  Tractor,
  Users,
  UsersRound,
  Wallet,
  Warehouse,
  Wheat,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
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
  { title: 'Farm Daily Summary', icon: LayoutDashboard },
  { title: 'Animal Ledger & Registrations', icon: Beef },
  { title: 'Clinical Ledger & Withholdings', icon: Stethoscope },
  { title: 'Vat & Harvest Monitoring', icon: Milk },
  { title: 'On-Farm Supplies & Feed Reserves', icon: Package },
  { title: 'Feed Allocation & Grazing Breaks', icon: Wheat },
  { title: 'Staff Rostering & Qualifications', icon: Users },
  { title: 'Shift Logs & Paddock Presence', icon: CalendarCheck },
  { title: 'Payroll Export Verification', icon: Wallet },
  { title: 'Operational Cost Centers & Margins', icon: ChartNoAxesCombined },
  { title: 'Farm Operational Statements', icon: ChartColumn },
  { title: 'Platform Dispatch & Logs', icon: ClipboardList },
  { title: 'Animal record overview', icon: ListChecks },
  { title: 'Equipment service records', icon: Wrench },
  { title: 'Equipment records', icon: Tractor },
  { title: 'Operational records', icon: ClipboardList },
  { title: 'Feed and milk records', icon: Package },
] as const;

const STARTING_POINT = [
  { title: 'Herd Register Snapshot', icon: Beef },
  { title: 'Operational Checklist', icon: ClipboardCheck },
  { title: 'Audited Event Log', icon: FileCheck2 },
] as const;

const PRODUCTION_AREAS = [
  { title: 'Milk Production', icon: Milk },
  { title: 'Inventory & Silos', icon: Warehouse },
  { title: 'Pasture Allocation', icon: Wheat },
] as const;

const PEOPLE_AREAS = [
  { title: 'Rostering & Shift Logs', icon: CalendarClock },
  { title: 'Cost Center Breakdown & Margin', icon: ChartNoAxesCombined },
] as const;

const REVIEW_AREAS = [
  { title: 'Clinical Ledger & Withholding Safeguards', icon: Stethoscope },
  { title: 'Monthly Milk Quality Audit', icon: ClipboardCheck },
  { title: 'Withholding Compliance Log', icon: FileCheck2 },
] as const;

const ACCESS_AREAS = [
  { title: 'Farm Admin Workspace', icon: Shield },
  { title: 'Farm Supervisor Console', icon: UsersRound },
  { title: 'Navigation', icon: Route },
] as const;

function PremiumAreaCard({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <div
      data-sf-item
      className="group relative flex min-h-[104px] items-center gap-4 overflow-hidden rounded-[22px] border border-[#E2E8DC] bg-white px-5 py-5 shadow-[0_8px_26px_-18px_rgba(24,63,48,0.35)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-pasture-green/40 hover:shadow-[0_18px_36px_-18px_rgba(24,63,48,0.35)] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-mist text-deep-forest">
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="relative z-10 min-w-0 flex-1 font-inter text-base font-semibold leading-snug tracking-[-0.01em] text-deep-forest sm:text-[17px]">
        {title}
      </h3>
      <span
        className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-mist text-deep-forest transition-colors duration-300 group-hover:bg-pasture-green group-hover:text-white motion-reduce:transition-none"
        aria-hidden="true"
      >
        <ArrowUpRight size={18} strokeWidth={1.75} />
      </span>
      <svg
        className="pointer-events-none absolute -bottom-6 right-0 h-16 w-40 opacity-40"
        viewBox="0 0 160 64"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 48 C 40 18, 92 58, 160 26 L160 64 L0 64 Z" fill="#E9EFE5" />
      </svg>
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

          <div
            data-sf-depth="product"
            className="mt-10 rounded-3xl border border-border-subtle bg-white p-7"
          >
            <h3 className="font-heading text-xl font-bold text-deep-forest">
              Explore the platform's management areas.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">
              This preview shows structure, not operational truth. No values are connected to a
              farm, and no calculation formula is implied.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MANAGEMENT_AREAS.map((area) => (
                <PremiumAreaCard key={area.title} title={area.title} icon={area.icon} />
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
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {STARTING_POINT.map((area) => (
                  <PremiumAreaCard key={area.title} title={area.title} icon={area.icon} />
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
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {PRODUCTION_AREAS.map((area) => (
                <PremiumAreaCard key={area.title} title={area.title} icon={area.icon} />
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
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {PEOPLE_AREAS.map((area) => (
                  <PremiumAreaCard key={area.title} title={area.title} icon={area.icon} />
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
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {REVIEW_AREAS.map((area) => (
                  <PremiumAreaCard key={area.title} title={area.title} icon={area.icon} />
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
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {ACCESS_AREAS.map((area) => (
                <PremiumAreaCard key={area.title} title={area.title} icon={area.icon} />
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
