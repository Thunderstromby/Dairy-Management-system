import { ClipboardList, Droplets, HeartPulse, Layers3, Package, Users } from 'lucide-react';
import { AppLink } from '../../app/AppLink';
import { NeutralVisual, SectionHeading, StitchCTASection, StitchPageHero } from './StitchPageParts';

const UNIFIED_AREAS = [
  {
    icon: HeartPulse,
    title: 'Animal Management',
    body: 'Identity, lifecycle and health records.',
  },
  { icon: Droplets, title: 'Milk Production', body: 'Session entries, daily totals and reports.' },
  { icon: Package, title: 'Farm Operations', body: 'Stock, usage and feeding records.' },
  {
    icon: Users,
    title: 'People Management',
    body: 'Worker records, attendance and role-aware access.',
  },
  {
    icon: ClipboardList,
    title: 'Farm Intelligence',
    body: 'Approved operational summaries and exports.',
  },
] as const;

const AUDIENCES = [
  {
    title: 'Farm owners and managers',
    body: 'Keep an organized view of the records that support daily decisions.',
  },
  {
    title: 'Farm administrators',
    body: 'Maintain the workspace, records and approved operational reports.',
  },
  {
    title: 'Supervisors',
    body: 'See the approved operational subset without privileged financial access.',
  },
] as const;

export function StitchAboutPage() {
  return (
    <>
      <StitchPageHero
        eyebrow="About SmartFarm"
        title="Better understanding. Better connected dairy farming."
        body="SmartFarm brings the essential parts of dairy farm management into one connected platform—helping farms organize information, understand daily operations, and manage with greater clarity."
        primaryLabel="Explore Features"
        primaryHref="#/public/features"
        secondaryLabel="Contact SmartFarm"
        secondaryHref="#/public/contact"
      />

      <section className="bg-warm-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="The operating reality"
            title="One farm. Many moving parts. One connected view."
            body="Animal records, milk sessions, feed stores, equipment logs and duty rosters constantly change. SmartFarm reduces the gap between what happens across the farm and what operators can review in one place."
          />
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-2xl border border-border-subtle bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-pasture-green">
                  Unified records
                </p>
                <p className="mt-2 text-sm text-secondary-text">
                  Information is structured around one isolated farm workspace.
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-pasture-green">
                  Clear ownership
                </p>
                <p className="mt-2 text-sm text-secondary-text">
                  Access follows approved Farm Admin and Supervisor responsibilities.
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-pasture-green">
                  Preserved history
                </p>
                <p className="mt-2 text-sm text-secondary-text">
                  Records remain available for operational review rather than being overwritten.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <NeutralVisual title="Connected workspace overview">
                <div className="grid gap-3 sm:grid-cols-2">
                  {UNIFIED_AREAS.map(({ icon: Icon, title, body }) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 rounded-xl border border-border-subtle bg-warm-ivory/60 p-4"
                    >
                      <Icon size={18} className="mt-0.5 text-pasture-green" aria-hidden="true" />
                      <div>
                        <h3 className="text-sm font-semibold text-deep-forest">{title}</h3>
                        <p className="text-xs text-secondary-text">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </NeutralVisual>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sage-mist/40 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Our approach"
            title="Connected information for everyday farm management."
            body="SmartFarm is organized around the records and responsibilities that dairy farms already manage. We do not add hardware, automation or invented predictions."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {AUDIENCES.map((audience, index) => (
              <div
                key={audience.title}
                className="rounded-3xl border border-border-subtle bg-white p-7 shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-harvest-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-deep-forest">
                  {audience.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-text">{audience.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Design philosophy"
            title="Technology should work with the way farms operate."
            body="The interface keeps the work visible without turning farm activity into simulated telemetry."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Practical by design',
                body: 'Information is structured around one isolated farm workspace.',
              },
              {
                title: 'Connected by purpose',
                body: 'Navigation, records and reports arranged around approved farm areas.',
              },
              {
                title: 'Clarity for management',
                body: 'Records remain available for operational review rather than being overwritten.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border-subtle bg-warm-ivory p-6"
              >
                <h3 className="font-heading text-lg font-bold text-deep-forest">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-text">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sage-mist/40 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Agricultural roles"
            title="Designed around the people managing the farm."
            body="SmartFarm is organized around the records and responsibilities that dairy farms already manage. We do not add hardware, automation or invented predictions."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border-subtle bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                Farm Owners & Administrators
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                Keep an organized view of the records that support daily decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Platform reveal"
              title="See the bigger picture of your farm."
              body="The interface keeps the work visible without turning farm activity into simulated telemetry."
            />
            <AppLink
              href="#/public/dashboard-preview"
              className="inline-flex items-center justify-center rounded-lg border border-deep-forest bg-white px-6 py-3 text-sm font-semibold text-deep-forest transition-colors hover:bg-sage-mist/40"
            >
              View the preview
            </AppLink>
          </div>
          <div className="lg:col-span-7">
            <NeutralVisual title="Workspace structure preview">
              <div className="flex items-center gap-3 rounded-2xl bg-warm-ivory p-5">
                <Layers3 size={20} className="text-pasture-green" aria-hidden="true" />
                <p className="text-sm text-secondary-text">
                  Navigation, records and reports arranged around approved farm areas.
                </p>
              </div>
            </NeutralVisual>
          </div>
        </div>
      </section>

      <section className="bg-sage-mist/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Operational clarity"
            title="Bring your farm management into better focus."
            body="Talk with the SmartFarm team to learn how the platform can support your farm-management needs."
          />
        </div>
      </section>

      <StitchCTASection
        title="Ready to bring more clarity to your dairy operation?"
        body="Talk with the SmartFarm team to learn how the platform can support your farm-management needs."
      />
    </>
  );
}
