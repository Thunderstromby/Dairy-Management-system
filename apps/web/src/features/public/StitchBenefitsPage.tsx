import { useState } from 'react';
import { ClipboardList, Layers3, Users } from 'lucide-react';
import { NeutralVisual, SectionHeading, StitchCTASection, StitchPageHero } from './StitchPageParts';

const BENEFITS = [
  {
    icon: ClipboardList,
    title: 'Organized farm information',
    body: 'Keep animal, health, milking and operational documents structured in one workspace.',
  },
  {
    icon: Layers3,
    title: 'Connected daily operations',
    body: 'Bring feeding, inventory, equipment and attendance records into the same review flow.',
  },
  {
    icon: Users,
    title: 'Clear people management',
    body: 'Maintain worker records and duty information with role-appropriate visibility.',
  },
] as const;

const ROLE_VIEWS = [
  {
    role: 'Farm Admin',
    summary: 'Full workspace administration with privileged finance and approval areas.',
    items: ['Workspace records', 'Payroll and finance', 'Reports and exports', 'Approval actions'],
  },
  {
    role: 'Farm Supervisor',
    summary: 'Operational records and permitted daily views only.',
    items: [
      'Animal operations',
      'Milk entries',
      'Feeding and inventory usage',
      'Attendance records',
    ],
  },
] as const;

export function StitchBenefitsPage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const role = ROLE_VIEWS[roleIndex];

  return (
    <>
      <StitchPageHero
        eyebrow="Benefits"
        title="More clarity across the work that keeps your farm moving."
        body="SmartFarm brings essential dairy farm information and management activities together, helping your team work with organized records and a clearer view of operations."
        primaryLabel="Explore Features"
        primaryHref="#/public/features"
        secondaryLabel="Contact SmartFarm"
        secondaryHref="#/public/contact"
      />

      <section className="bg-warm-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="The challenge"
            title="Farm management involves more than one daily task"
            body="When information is spread across disconnected records, whiteboards, paper logs and separate spreadsheets, it becomes harder to maintain an organized view."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border-subtle bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-text">
                Fragmented records
              </p>
              <ul className="mt-5 space-y-3 text-sm text-secondary-text">
                {[
                  'Whiteboard milking tallies',
                  'Paper health and treatment notes',
                  'Separate feed and stock spreadsheets',
                  'Unlinked equipment logs',
                ].map((item) => (
                  <li key={item} className="border-b border-border-subtle pb-3 last:border-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-deep-forest p-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-harvest-gold">
                Unified SmartFarm workspace
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/80">
                {[
                  'Animal care',
                  'Milk records',
                  'Feed inventory',
                  'Duty rosters',
                  'Equipment logs',
                  'Cost records',
                ].map((item) => (
                  <div key={item} className="rounded-xl bg-white/10 px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sage-mist/40 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Operational value"
            title="Practical benefits for the daily farm team"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-3xl border border-border-subtle bg-white p-7">
                <Icon size={22} className="text-pasture-green" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-xl font-bold text-deep-forest">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-text">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Benefit by role"
              title="One workspace, two appropriate views"
              body="The interface reflects the approved access matrix rather than granting shared permissions."
            />
            <div className="flex gap-2">
              {ROLE_VIEWS.map((item, index) => (
                <button
                  key={item.role}
                  type="button"
                  aria-pressed={roleIndex === index}
                  onClick={() => setRoleIndex(index)}
                  className={`tab-btn rounded-full border px-4 py-2 text-xs font-semibold ${
                    roleIndex === index
                      ? 'active border-deep-forest bg-deep-forest text-white'
                      : 'border-border-subtle bg-white text-deep-forest'
                  }`}
                >
                  {item.role}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <NeutralVisual title={`${role.role} view`}>
              <p className="mb-5 text-sm text-secondary-text">{role.summary}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {role.items.map((item) => (
                  <div key={item} className="rounded-xl bg-warm-ivory p-4 text-sm text-deep-forest">
                    {item}
                  </div>
                ))}
              </div>
            </NeutralVisual>
          </div>
        </div>
      </section>

      <StitchCTASection
        title="See the value in your own operation"
        body="Contact the team to discuss how the approved modules and role boundaries fit your farm."
      />
    </>
  );
}
