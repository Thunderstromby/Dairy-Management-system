import { ClipboardCheck, FolderKanban, ShieldCheck } from 'lucide-react';
import { NeutralVisual, SectionHeading, StitchCTASection, StitchPageHero } from './StitchPageParts';

const STAGES = [
  {
    number: '01',
    title: 'Set Up Your Workspace',
    body: 'A Super Admin provisions the customer, workspace and Farm Admin account through the approved manual process.',
    detail: 'No public registration, checkout or automated provisioning is offered.',
    icon: FolderKanban,
  },
  {
    number: '02',
    title: 'Organize Farm Operations',
    body: 'Farm Admin enters animal, milk, feeding, inventory, attendance and equipment information into the isolated workspace.',
    detail: 'Workers are records in the system, not login accounts.',
    icon: ClipboardCheck,
  },
  {
    number: '03',
    title: 'Manage with Greater Clarity',
    body: 'Farm Admin reviews approved reports while Supervisor sees the operational subset defined by the access matrix.',
    detail: 'Sensitive payroll, finance and corrective actions stay outside the Supervisor view.',
    icon: ShieldCheck,
  },
] as const;

const WORKSPACE_AREAS = [
  'Animal Records',
  'Health Information',
  'Milk Production',
  'Inventory & Feeding',
  'Worker Attendance',
  'Equipment Records',
  'Financial Ledgers',
] as const;

const ROLE_HIGHLIGHTS = [
  {
    title: 'Work with the information your team needs.',
    body: 'Navigation visibility is never the authorization boundary. Server-side checks and row-level security define what each role can do.',
  },
  {
    title: 'Super Admin',
    body: 'A Super Admin provisions the customer, workspace and Farm Admin account through the approved manual process.',
  },
  {
    title: 'Farm Worker',
    body: 'Workers are records in the system, not login accounts.',
  },
] as const;

export function StitchHowItWorksPage() {
  return (
    <>
      <StitchPageHero
        eyebrow="How it works"
        title="A clearer way to manage your farm"
        body="From farm setup to everyday management, SmartFarm brings your dairy farm's management activities into one organized platform."
        primaryLabel="Explore the Process"
        primaryHref="#process"
        secondaryLabel="Contact SmartFarm"
        secondaryHref="#/public/contact"
      />

      <section id="process" className="bg-warm-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="The process"
            title="From farm setup to everyday management."
            body="Each stage is deliberately explicit. The platform does not assume unapproved automation, hardware or simulated live views."
          />
          <div className="relative grid gap-8 lg:grid-cols-3">
            <div
              className="absolute left-0 right-0 top-8 hidden h-px bg-border-subtle lg:block"
              aria-hidden="true"
            />
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.number} className="relative rounded-3xl bg-warm-ivory p-1">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border-subtle bg-white text-sm font-extrabold text-deep-forest shadow-sm">
                    {stage.number}
                  </div>
                  <div className="rounded-3xl border border-border-subtle bg-white p-7 shadow-sm">
                    <Icon size={22} className="text-pasture-green" aria-hidden="true" />
                    <h3 className="mt-4 font-heading text-xl font-bold text-deep-forest">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-secondary-text">{stage.body}</p>
                    <p className="mt-4 border-t border-border-subtle pt-4 text-xs text-muted-text">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                Turn organized records into clearer visibility.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                Each stage is deliberately explicit. The platform does not assume unapproved
                automation, hardware or simulated live views.
              </p>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                See the platform in action.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                From farm setup to everyday management, SmartFarm brings your dairy farm's
                management activities into one organized platform.
              </p>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                A straightforward path to connected farm management.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                Each stage is deliberately explicit. The platform does not assume unapproved
                automation, hardware or simulated live views.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-border-subtle bg-white p-7">
            <p className="text-sm leading-relaxed text-secondary-text">
              Farm Admin enters animal, milk, feeding, inventory, attendance and equipment
              information into the isolated workspace.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {WORKSPACE_AREAS.map((area) => (
                <div
                  key={area}
                  className="rounded-xl border border-border-subtle bg-warm-ivory p-4"
                >
                  <h3 className="font-heading text-sm font-bold text-deep-forest">{area}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sage-mist/40 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Stage 01 — onboarding"
              title="Start with your farm workspace"
              body="Every dairy operation has different boundaries, herd structure and daily routines. The setup is handled through a named manual process."
            />
            <div className="rounded-3xl border border-border-subtle bg-white p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">
                Bring your farm information together.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                The workspace is handed over for record entry and review.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <NeutralVisual title="Provisioning steps">
              <ol className="space-y-3 text-sm text-deep-forest">
                {[
                  'Contact the SmartFarm team to outline the farm structure.',
                  'A Super Admin provisions the customer and isolated workspace.',
                  'A Farm Admin account is created with approved credentials.',
                  'The workspace is handed over for record entry and review.',
                ].map((step, index) => (
                  <li key={step} className="flex gap-3 rounded-xl bg-warm-ivory p-4">
                    <span className="font-bold text-pasture-green">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </NeutralVisual>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Who does what"
            title="The right access for each responsibility."
            body="Navigation visibility is never the authorization boundary. Server-side checks and row-level security define what each role can do."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border-subtle bg-warm-ivory p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">Farm Admin</h3>
              <p className="mt-3 text-sm text-secondary-text">
                Manages workspace records, approvals, finance areas and reports.
              </p>
            </div>
            <div className="rounded-3xl border border-border-subtle bg-warm-ivory p-7">
              <h3 className="font-heading text-lg font-bold text-deep-forest">Farm Supervisor</h3>
              <p className="mt-3 text-sm text-secondary-text">
                Records daily operations and views only the approved operational subset.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ROLE_HIGHLIGHTS.map(({ title, body }) => (
              <div key={title} className="rounded-3xl border border-border-subtle bg-white p-7">
                <h3 className="font-heading text-lg font-bold text-deep-forest">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-text">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StitchCTASection
        title="Let's discuss your farm management needs."
        body="We will map the manual provisioning steps and role responsibilities before any workspace is created."
      />
    </>
  );
}
