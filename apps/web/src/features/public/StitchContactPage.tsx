import { ArrowRight, ClipboardCheck, LockKeyhole, Users } from 'lucide-react';
import { AppLink } from '../../app/AppLink';
import { InquiryForm } from './InquiryForm';
import { SectionHeading, StitchCTASection, StitchPageHero } from './StitchPageParts';

const EXPECTATIONS = [
  {
    icon: ClipboardCheck,
    title: 'Scoped conversation',
    body: 'We discuss farm structure and which approved modules are relevant.',
  },
  {
    icon: LockKeyhole,
    title: 'Controlled provisioning',
    body: 'Workspace creation is handled manually by Super Admin after approval.',
  },
  {
    icon: Users,
    title: 'Role clarity',
    body: 'We confirm who will hold Farm Admin and Supervisor responsibilities.',
  },
] as const;

export function StitchContactPage() {
  return (
    <>
      <StitchPageHero
        eyebrow="Contact SmartFarm"
        title="Let's talk about better-connected dairy farm management."
        body="Have questions about SmartFarm? Contact our team to discuss the platform, its capabilities and how workspace setup works."
        primaryLabel="Go to Inquiry Form"
        primaryHref="#inquiry-form"
        secondaryLabel="How It Works"
        secondaryHref="#/public/how-it-works"
      />

      <section id="inquiry-form" className="bg-warm-ivory py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Inquiry intake"
              title="Tell us what you need"
              body="Share a little about your farm and what you would like to learn. The form saves a local draft in this prototype; it does not send email or create an account."
            />
            <p className="text-xs text-muted-text">
              Approved contact details are pending owner content.
            </p>
          </div>
          <div className="rounded-3xl border border-border-subtle bg-white p-8 shadow-xl sm:p-10 lg:col-span-5">
            <h3 className="mb-2 font-heading text-xl font-bold text-deep-forest">
              Speak With a Specialist
            </h3>
            <p className="mb-6 text-xs text-secondary-text">
              We will contact you to discuss your farm structure and operations.
            </p>
            <InquiryForm />
          </div>
          <div className="space-y-4 lg:col-span-3">
            {EXPECTATIONS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border-subtle bg-white p-5">
                <Icon size={18} className="text-pasture-green" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-bold text-deep-forest">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-secondary-text">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeading
            eyebrow="Process transparency"
            title="What happens after you contact us?"
            body="We will contact you to discuss your farm structure and operations."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Share Your Inquiry',
                body: 'We discuss farm structure and which approved modules are relevant.',
              },
              {
                title: 'Team Review',
                body: 'Workspace creation is handled manually by Super Admin after approval.',
              },
              {
                title: 'Discuss Next Steps',
                body: 'We confirm who will hold Farm Admin and Supervisor responsibilities.',
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
            eyebrow="Workspace setup information"
            title="How SmartFarm access is arranged."
            body="Our specialists collaborate with operational leads to map farm structure, record ownership and role access before a workspace is provisioned."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              'Workspace boundaries and farm configuration',
              'Record areas and approval responsibilities',
              'Farm Admin and Supervisor access review',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border-subtle bg-white p-6">
                <p className="text-sm text-deep-forest">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border-subtle bg-warm-ivory p-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-deep-forest">
                Explore the platform before getting in touch.
              </h2>
              <p className="mt-2 text-sm text-secondary-text">
                Review the modules or the illustrative workspace preview.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AppLink
                href="#/public/features"
                className="inline-flex items-center gap-2 rounded-lg bg-pasture-green px-5 py-3 text-sm font-semibold text-white"
              >
                Features <ArrowRight size={15} aria-hidden="true" />
              </AppLink>
              <AppLink
                href="#/public/dashboard-preview"
                className="inline-flex items-center gap-2 rounded-lg border border-deep-forest px-5 py-3 text-sm font-semibold text-deep-forest"
              >
                Preview <ArrowRight size={15} aria-hidden="true" />
              </AppLink>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'About SmartFarm',
                body: 'Workspace boundaries and farm configuration',
              },
              {
                title: 'Explore Features',
                body: 'Record areas and approval responsibilities',
              },
              {
                title: 'Dashboard Preview',
                body: 'Farm Admin and Supervisor access review',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border-subtle bg-warm-ivory p-5"
              >
                <h3 className="font-heading text-base font-bold text-deep-forest">{item.title}</h3>
                <p className="mt-2 text-sm text-secondary-text">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StitchCTASection
        title="Start a conversation with SmartFarm."
        body="Send an inquiry and we will follow up through the configured contact process. No public registration or payment is taken."
      />
    </>
  );
}
