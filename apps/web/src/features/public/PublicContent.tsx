import {
  Activity,
  ArrowRight,
  ClipboardList,
  Droplets,
  HeartPulse,
  Package,
  PawPrint,
  Sprout,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react';
import { IllustrativeChartPanel } from '../../components/IllustrativeChartPanel';
import { HoverLiftCard } from '../../motion/HoverLiftCard';
import { Reveal } from '../../motion/Reveal';
import { InquiryForm } from './InquiryForm';
import { StitchHomePage } from './StitchHome';

const FEATURES = [
  {
    icon: PawPrint,
    title: 'Animal management',
    body: 'Keep animal identity, grouping and lifecycle records together.',
  },
  {
    icon: HeartPulse,
    title: 'Animal health',
    body: 'Record health events, treatments and vaccination information.',
  },
  {
    icon: Droplets,
    title: 'Milk production',
    body: 'Organize session entries, daily totals and production reports.',
  },
  {
    icon: Package,
    title: 'Inventory and feeding',
    body: 'Track stock, usage, feeding plans and actual feeding records.',
  },
  {
    icon: Users,
    title: 'Workers and attendance',
    body: 'Maintain worker records, attendance and leave information.',
  },
  {
    icon: Wallet,
    title: 'Payroll and finance',
    body: 'Keep approved salary, income and expense records in one place.',
  },
  {
    icon: Wrench,
    title: 'Equipment',
    body: 'Record equipment condition, maintenance and usage history.',
  },
  {
    icon: ClipboardList,
    title: 'Reports and data',
    body: 'Review approved operational reports and data exports.',
  },
] as const;

const BENEFITS = [
  {
    icon: ClipboardList,
    title: 'Centralized farm records',
    body: 'Animal, worker, inventory and production records share one workspace.',
  },
  {
    icon: Activity,
    title: 'Better operational visibility',
    body: 'See the information that matters to daily farm management.',
  },
  {
    icon: Droplets,
    title: 'Organized milk production records',
    body: 'Keep session entries, daily totals and reports consistently structured.',
  },
  {
    icon: HeartPulse,
    title: 'Health and feeding oversight',
    body: 'Track health events and feeding information alongside production.',
  },
  {
    icon: Wallet,
    title: 'Worker and financial management',
    body: 'Manage approved attendance, payroll and finance records.',
  },
] as const;

const STEPS = [
  {
    title: 'Organize the workspace',
    body: 'A Super Admin provisions the customer workspace and Farm Admin account.',
  },
  {
    title: 'Record daily operations',
    body: 'Authorized users enter animal, health, milk, feeding, inventory and attendance records.',
  },
  {
    title: 'Review and report',
    body: 'Farm Admin reviews approved summaries and exports; Supervisor sees only operational information.',
  },
] as const;

export function AboutSection() {
  return (
    <section className="sf-section" aria-labelledby="about-heading">
      <div className="sf-grid sf-grid--2">
        <div className="sf-placeholder-visual">
          <div>
            <Sprout size={42} aria-hidden="true" />
            <strong>Agricultural line illustration</strong>
            <span>Pending approved asset</span>
          </div>
        </div>
        <Reveal>
          <p className="sf-eyebrow">About SmartFarm</p>
          <h2 id="about-heading">A clearer way to run a dairy farm</h2>
          <p className="sf-card__body">
            SmartFarm brings animal records, milk production, inventory, feeding, workers and
            finance into one structured farm workspace. It is built for serious dairy operations
            that need dependable information, not scattered notes.
          </p>
          <p className="sf-card__body" style={{ marginTop: 14 }}>
            Each customer gets an isolated workspace with role-aware access for Farm Admin and Farm
            Supervisor. Workers are records in the system, not login accounts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section
      className="sf-section"
      aria-labelledby="features-heading"
      style={{ background: 'var(--color-surface-alt)' }}
    >
      <div className="sf-section__heading">
        <p className="sf-eyebrow">Platform capabilities</p>
        <h2 id="features-heading">Everything your dairy operation needs, in one place</h2>
        <p>Eight approved areas cover daily records, operational oversight and reporting.</p>
      </div>

      <div className="sf-grid sf-grid--4">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delayMs={index * 40}>
              <HoverLiftCard className="sf-card">
                <span className="sf-icon-tile">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="sf-card__title">{feature.title}</h3>
                <p className="sf-card__body">{feature.body}</p>
              </HoverLiftCard>
            </Reveal>
          );
        })}
      </div>

      <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a className="sf-button sf-button--primary" href="#/public/contact">
          Contact Us <ArrowRight size={16} aria-hidden="true" />
        </a>
        <a className="sf-button sf-button--secondary" href="#/public/how-it-works">
          See How It Works
        </a>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="sf-section" aria-labelledby="how-heading">
      <div className="sf-section__heading">
        <p className="sf-eyebrow">How it works</p>
        <h2 id="how-heading">A simple structure for everyday farm management</h2>
        <p>
          The platform organizes authorized work without adding hardware, offline sync or
          simulation.
        </p>
      </div>

      <div className="sf-grid sf-grid--3">
        {STEPS.map((step, index) => (
          <Reveal key={step.title} delayMs={index * 60}>
            <div className="sf-step">
              <span className="sf-step__number">{index + 1}</span>
              <h3 className="sf-card__title">{step.title}</h3>
              <p className="sf-card__body">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section
      className="sf-section"
      aria-labelledby="benefits-heading"
      style={{ background: 'var(--color-surface-alt)' }}
    >
      <div className="sf-grid sf-grid--2">
        <div>
          <p className="sf-eyebrow">Benefits</p>
          <h2 id="benefits-heading">Practical value for daily decisions</h2>
          <p className="sf-card__body">
            SmartFarm keeps records organized and access appropriate to each role.
          </p>
          <div className="sf-placeholder-visual" style={{ minHeight: 220, marginTop: 24 }}>
            <div>
              <Sprout size={36} aria-hidden="true" />
              <strong>Supporting imagery</strong>
              <span>Pending approved asset</span>
            </div>
          </div>
        </div>

        <div>
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div className="sf-benefit" key={benefit.title}>
                <span className="sf-icon-tile" style={{ marginBottom: 0 }}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="sf-card__title" style={{ marginBottom: 4 }}>
                    {benefit.title}
                  </h3>
                  <p className="sf-card__body">{benefit.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DashboardPreviewSection() {
  return (
    <section className="sf-section" aria-labelledby="preview-heading">
      <div className="sf-section__heading">
        <p className="sf-eyebrow">Dashboard preview</p>
        <h2 id="preview-heading">See how farm information comes together</h2>
        <p>Design preview only — the values below are illustrative and are not live farm data.</p>
      </div>

      <Reveal>
        <div className="sf-dashboard-preview">
          <div className="sf-dashboard-preview__bar" aria-hidden="true">
            <span className="sf-dashboard-preview__dot" />
            <span className="sf-dashboard-preview__dot" />
            <span className="sf-dashboard-preview__dot" />
            <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--color-muted)' }}>
              SmartFarm preview
            </span>
          </div>
          <div className="sf-dashboard-preview__body">
            <div className="sf-grid sf-grid--4" style={{ marginBottom: 20 }}>
              {[
                { icon: PawPrint, label: 'Animals' },
                { icon: Droplets, label: 'Milk' },
                { icon: HeartPulse, label: 'Health' },
                { icon: Package, label: 'Inventory' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div className="sf-kpi" key={item.label}>
                    <div className="sf-kpi__label">
                      <Icon size={16} aria-hidden="true" /> {item.label}
                    </div>
                    <div className="sf-kpi__value">—</div>
                    <span className="sf-kpi__unit">awaiting approved data</span>
                  </div>
                );
              })}
            </div>
            <IllustrativeChartPanel />
          </div>
        </div>
      </Reveal>

      <div style={{ marginTop: 28 }}>
        <a className="sf-button sf-button--primary" href="#/public/contact">
          Contact Us <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="sf-section" aria-labelledby="contact-heading">
      <div className="sf-grid sf-grid--2">
        <div>
          <p className="sf-eyebrow">Contact inquiry</p>
          <h2 id="contact-heading">Talk with the SmartFarm team</h2>
          <p className="sf-card__body">
            Tell us about your farm and we will follow up through the configured contact process. No
            account is created and no payment is taken from this form.
          </p>
          <p className="sf-card__body" style={{ marginTop: 14 }}>
            Approved contact details are pending owner content.
          </p>
        </div>

        <div className="sf-card">
          <h3 className="sf-card__title">Inquiry form</h3>
          <p className="sf-panel__hint">Prototype behaviour: local draft only; nothing is sent.</p>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

export function PublicHomeContent() {
  return <StitchHomePage />;
}

export function PublicInnerContent({ screenId }: { screenId: string }) {
  switch (screenId) {
    case 'public.about':
      return <AboutSection />;
    case 'public.features':
      return <FeaturesSection />;
    case 'public.how-it-works':
      return <HowItWorksSection />;
    case 'public.benefits':
      return <BenefitsSection />;
    case 'public.dashboard-preview':
      return <DashboardPreviewSection />;
    case 'public.contact':
      return <ContactSection />;
    default:
      return <PublicHomeContent />;
  }
}
