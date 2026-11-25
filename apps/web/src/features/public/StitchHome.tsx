import { Check } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { PublicHomeHero } from './PublicHomeHero';
import { InquiryForm } from './InquiryForm';
import { scrollToSection } from './scrollToSection';
import './stitch-home.css';

type FeatureTab = {
  id: string;
  label: string;
  badge: string;
  title: string;
  body: string;
  bullets: readonly string[];
  preview: () => ReactNode;
};

const ANIMAL_TAB: FeatureTab = {
  id: 'animals',
  label: '01. Animal Management',
  badge: 'Feature 01 · Livestock Care',
  title: 'Animal Records, Profiles & Health History',
  body: 'Track individual cattle identity, lactation stages, veterinary treatments, vaccination timelines, and breeding pedigrees in a single clean ledger.',
  bullets: [
    'Animal records and visual identification',
    'Health profiles, treatments and vaccination records',
    'Lifecycle and lactation history',
  ],
  preview: () => (
    <div className="sh-preview">
      <div className="sh-preview__bar">
        <div className="sh-preview__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>smartfarm.app / livestock / herd-04</span>
        <span className="sh-preview__chip">Illustrative herd</span>
      </div>
      <div className="sh-preview__rows">
        {['Animal record A', 'Animal record B', 'Animal record C'].map((name, index) => (
          <div className="sh-preview__row" key={name}>
            <span className="sh-preview__avatar">{`A-${index + 1}`}</span>
            <div>
              <strong>{name}</strong>
              <span>Identity and lifecycle record — illustrative</span>
            </div>
            <span className="sh-preview__status">Illustrative</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

const MILK_TAB: FeatureTab = {
  id: 'milk',
  label: '02. Milk Production',
  badge: 'Feature 02 · Yield & Quality',
  title: 'Milk Production Records & Bulk Tank Tracking',
  body: 'Log morning and evening parlor sessions, daily totals and milk storage records in one structured workflow.',
  bullets: [
    'Morning and evening session entries',
    'Daily totals and animal production history',
    'Storage and production reports',
  ],
  preview: () => (
    <div className="sh-preview">
      <div className="sh-preview__bar">
        <strong>Bulk Tank 1 · Illustrative capacity</strong>
        <span className="sh-preview__chip">Design preview</span>
      </div>
      <div className="sh-preview__tiles">
        {["Today's Total", 'Butterfat', 'Protein'].map((label) => (
          <div key={label}>
            <span>{label}</span>
            <strong>—</strong>
          </div>
        ))}
      </div>
      <div className="sh-preview__meter">
        <div>
          <span>Illustrative progress</span>
          <strong>—</strong>
        </div>
        <div className="sh-preview__meter-track">
          <span />
        </div>
      </div>
    </div>
  ),
};

const OPERATIONS_TAB: FeatureTab = {
  id: 'operations',
  label: '03. Farm Operations',
  badge: 'Feature 03 · Ground Operations',
  title: 'Feed Rations, Pasture Rotations & Equipment',
  body: 'Coordinate feeding plans, inventory records and equipment maintenance in one operational view.',
  bullets: [
    'Feeding plans and actual feeding records',
    'Inventory and stock records',
    'Equipment condition and maintenance history',
  ],
  preview: () => (
    <div className="sh-preview">
      <div className="sh-preview__bar">
        <strong>Operational task overview</strong>
        <span className="sh-preview__chip">Illustrative</span>
      </div>
      <div className="sh-preview__rows">
        {['Feeding plan', 'Inventory item', 'Equipment service'].map((name) => (
          <div className="sh-preview__row" key={name}>
            <div>
              <strong>{name}</strong>
              <span>Approved record type — illustrative</span>
            </div>
            <span className="sh-preview__status">—</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

const PEOPLE_TAB: FeatureTab = {
  id: 'people',
  label: '04. People Management',
  badge: 'Feature 04 · Farm Team',
  title: 'Worker Rosters, Milking Shifts & Safety',
  body: 'Keep worker records, attendance and leave information organized for the farm team.',
  bullets: ['Worker records and directory', 'Attendance and shift records', 'Leave information'],
  preview: () => (
    <div className="sh-preview">
      <div className="sh-preview__bar">
        <strong>Daily staff duty roster</strong>
        <span className="sh-preview__chip">Illustrative</span>
      </div>
      <div className="sh-preview__rows">
        {['Worker record A', 'Worker record B'].map((name) => (
          <div className="sh-preview__row" key={name}>
            <span className="sh-preview__avatar">—</span>
            <div>
              <strong>{name}</strong>
              <span>Attendance record — illustrative</span>
            </div>
            <span className="sh-preview__status">—</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

const INTELLIGENCE_TAB: FeatureTab = {
  id: 'intelligence',
  label: '05. Farm Intelligence',
  badge: 'Feature 05 · Decision Support',
  title: 'Operational Reports, Margins & Compliance',
  body: 'Review approved operational reports and export-ready records with role-aware access.',
  bullets: [
    'Approved operational reports',
    'Role-aware summaries and exports',
    'Structured record history',
  ],
  preview: () => (
    <div className="sh-preview">
      <div className="sh-preview__bar">
        <strong>Quarterly performance ledger</strong>
        <span className="sh-preview__chip">Illustrative</span>
      </div>
      <div className="sh-preview__tiles">
        {['Feed cost', 'Milk margin'].map((label) => (
          <div key={label}>
            <span>{label}</span>
            <strong>—</strong>
          </div>
        ))}
      </div>
      <div className="sh-preview__rows">
        <div className="sh-preview__row">
          <div>
            <strong>Operational reporting</strong>
            <span>Awaiting approved values</span>
          </div>
          <span className="sh-preview__status">—</span>
        </div>
      </div>
    </div>
  ),
};

const FEATURE_TABS = [ANIMAL_TAB, MILK_TAB, OPERATIONS_TAB, PEOPLE_TAB, INTELLIGENCE_TAB] as const;

function StitchAboutSection() {
  return (
    <section id="about" className="sh-section sh-section--ivory sh-about">
      <div className="sh-container sh-about__grid">
        <div className="sh-about__copy">
          <p className="sh-kicker">
            <span aria-hidden="true" /> The Connected Dairy
          </p>
          <h2>Better farm management starts with better-connected information.</h2>
          <p>
            From animal records and milk production to people and daily operations, SmartFarm brings
            essential dairy-farm management activities together in one organized platform.
          </p>
          <div className="sh-about__facts">
            <div>
              <strong>Unified</strong>
              <span>Single Farm Data Source</span>
            </div>
            <div>
              <strong>Organized</strong>
              <span>Operational Records</span>
            </div>
          </div>
        </div>
        <div className="sh-about__media">
          <div
            className="sh-about__frame"
            role="img"
            aria-label="Illustrative dairy pasture visual. Licensed photography pending."
          >
            <span className="sh-about__frame-mark">SmartFarm</span>
          </div>
          <div className="sh-about__caption">
            <div>
              <span>Daily Field Context</span>
              <p>Morning herd movement recorded and integrated directly with milking schedules.</p>
            </div>
            <div className="sh-about__caption-tag">
              <strong>Illustrative</strong>
              <span>Design preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StitchFeaturesSection() {
  const [active, setActive] = useState(0);
  const tab = FEATURE_TABS[active];
  const preview = tab.preview();

  return (
    <section id="features" className="sh-section sh-section--mist sh-features">
      <div className="sh-container">
        <div className="sh-section-heading">
          <p className="sh-kicker sh-kicker--block">Platform Capability</p>
          <h2>Every part of your farm. Better connected.</h2>
          <p>Explore the tools that support the everyday work of managing a dairy farm.</p>
        </div>

        <div className="sh-tabs" role="tablist" aria-label="Platform capabilities">
          {FEATURE_TABS.map((item, index) => (
            <button
              type="button"
              role="tab"
              id={`feature-tab-${item.id}`}
              aria-selected={active === index}
              aria-controls={`feature-panel-${item.id}`}
              className={active === index ? 'sh-tab sh-tab--active' : 'sh-tab'}
              key={item.id}
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="sh-feature-card">
          <div
            className="sh-feature-panel"
            role="tabpanel"
            id={`feature-panel-${tab.id}`}
            aria-labelledby={`feature-tab-${tab.id}`}
          >
            <div className="sh-feature-panel__copy">
              <span className="sh-badge">{tab.badge}</span>
              <h3>{tab.title}</h3>
              <p>{tab.body}</p>
              <ul>
                {tab.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Check size={18} aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sh-feature-panel__visual">{preview}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StitchProductRevealSection() {
  return (
    <section id="dashboard-preview" className="sh-section sh-section--ivory sh-product">
      <div className="sh-container">
        <div className="sh-section-heading sh-section-heading--center">
          <p className="sh-kicker">The Platform Interface</p>
          <h2>Meet the platform behind smarter dairy management.</h2>
          <p>
            One organized workspace for managing the information and everyday responsibilities of a
            dairy farm.
          </p>
        </div>

        <div className="sh-product-frame">
          <div className="sh-product-frame__bar">
            <span className="sh-product-frame__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <strong>
              <span aria-hidden="true" /> SmartFarm Operations Hub
            </strong>
            <span className="sh-product-frame__chip">Illustrative workspace</span>
          </div>
          <div className="sh-product-frame__body">
            <aside className="sh-product-sidebar">
              <span className="sh-product-sidebar__label">Management</span>
              {[
                'Daily Overview',
                'Animal Records',
                'Milk Production',
                'Paddock & Feed',
                'Quality & Vet Reports',
              ].map((item, index) => (
                <span
                  className={
                    index === 0
                      ? 'sh-product-sidebar__item sh-product-sidebar__item--active'
                      : 'sh-product-sidebar__item'
                  }
                  key={item}
                >
                  {item}
                </span>
              ))}
              <div className="sh-product-sidebar__note">
                <strong>Sample Interface</strong>
                Displaying illustrative management dashboard layout.
              </div>
            </aside>
            <div className="sh-product-main">
              <div className="sh-product-stats">
                {['Daily Production', 'Bulk Tank Temp', 'Pending Health Checks'].map((label) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>—</strong>
                    <em>Illustrative value</em>
                  </div>
                ))}
              </div>
              <div className="sh-product-table">
                <div className="sh-product-table__bar">
                  <strong>Illustrative herd health & yield log</strong>
                  <span>Sample layout — not live farm data</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Tag ID</th>
                      <th>Animal</th>
                      <th>Yield (kg)</th>
                      <th>Butterfat</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Animal record A', 'Animal record B', 'Animal record C'].map((name) => (
                      <tr key={name}>
                        <td>—</td>
                        <td>{name}</td>
                        <td>—</td>
                        <td>—</td>
                        <td>Illustrative</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

function StitchHowItWorksSection() {
  return (
    <section id="how-it-works" className="sh-section sh-section--mist sh-how">
      <div className="sh-container">
        <div className="sh-section-heading">
          <p className="sh-kicker sh-kicker--block">Simple Implementation</p>
          <h2>A clearer way to manage your farm.</h2>
          <p>A dependable onboarding structure adapted directly to your dairy facilities.</p>
        </div>
        <div className="sh-steps">
          {HOW_STEPS.map((step, index) => (
            <article className="sh-step" key={step.title}>
              <span
                className={`sh-step__number sh-step__number--${index + 1}`}
              >{`0${index + 1}`}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StitchBenefitsSection() {
  return (
    <section id="benefits" className="sh-section sh-section--ivory sh-benefits">
      <div className="sh-container">
        <div className="sh-section-heading">
          <p className="sh-kicker sh-kicker--block">Real Operational Value</p>
          <h2>Built for the realities of dairy-farm management.</h2>
          <p>Practical digital organization designed for the physical demands of dairy farming.</p>
        </div>
        <div className="sh-benefit-grid">
          <article className="sh-benefit sh-benefit--feature">
            <p className="sh-benefit__label">Benefit 01</p>
            <h3>Organized farm information.</h3>
            <p>
              Keep important livestock records, milking logs, and operational documents securely
              organized in one accessible location rather than scattered across paper whiteboards
              and disparate clipboards.
            </p>
            <div className="sh-benefit__facts">
              <div>
                <strong>Record history</strong>
                <span>Historical herd records preserved in the workspace.</span>
              </div>
              <div>
                <strong>Role-aware access</strong>
                <span>Appropriate visibility for Farm Admin and Supervisor.</span>
              </div>
            </div>
          </article>
          <div className="sh-benefit-stack">
            <article className="sh-benefit sh-benefit--white">
              <p className="sh-benefit__label">Benefit 02</p>
              <h3>Connected daily operations.</h3>
              <p>
                Bring animal care, milking sessions, feed ration adjustments, and team assignments
                into one organized workflow that simplifies daily farm routines.
              </p>
            </article>
            <article className="sh-benefit sh-benefit--mist">
              <p className="sh-benefit__label">Benefit 03</p>
              <h3>Clearer operational visibility.</h3>
              <p>
                Understand herd activity, milk production records, and organized operational
                reporting.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function StitchContactSection() {
  return (
    <section id="contact" className="sh-section sh-section--ivory sh-contact">
      <div className="sh-contact__glow" aria-hidden="true" />
      <div className="sh-container sh-contact__grid">
        <div className="sh-contact__intro">
          <p className="sh-kicker">Direct Farm Consultation</p>
          <h2>Ready to bring more clarity to your dairy operation?</h2>
          <p>
            Talk with the SmartFarm team to learn how the platform can support your farm-management
            needs.
          </p>
          <div className="sh-contact__actions">
            <a
              className="sf-button sf-button--primary"
              href="#inquiry-form"
              onClick={(event) => scrollToSection(event, 'inquiry-form')}
            >
              Contact SmartFarm
            </a>
            <a
              className="sh-button-outline"
              href="#features"
              onClick={(event) => scrollToSection(event, 'features')}
            >
              Explore the Platform
            </a>
          </div>
        </div>
        <div className="sh-contact__form" id="inquiry-form">
          <h3>Speak With a Specialist</h3>
          <p>We will contact you to discuss your herd structure and operations.</p>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

function StitchBrandStrip() {
  const items = ['SMART FARM', 'SMART FARM', 'SMART FARM', 'SMART FARM', 'SMART FARM'];
  return (
    <div className="sh-brand-strip" aria-hidden="true">
      {items.map((item, index) => (
        <span key={`${item}-${index}`}>
          {item}
          <i />
        </span>
      ))}
    </div>
  );
}

export function StitchHomePage() {
  return (
    <>
      <PublicHomeHero />
      <StitchAboutSection />
      <StitchFeaturesSection />
      <StitchProductRevealSection />
      <StitchHowItWorksSection />
      <StitchBenefitsSection />
      <StitchContactSection />
      <StitchBrandStrip />
    </>
  );
}
