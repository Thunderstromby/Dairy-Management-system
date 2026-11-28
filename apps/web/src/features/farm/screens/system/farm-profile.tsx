import {
  Building2,
  Check,
  ChevronRight,
  Contact,
  Landmark,
  Lock,
  Save,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    neutral: 'bg-[#eae8e2] text-[#444840]',
    primary: 'bg-[#d9e8c7] text-[#2f4126]',
    danger: 'bg-[#7a461c] text-white',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone] ?? tones.neutral}`}
    >
      {children}
    </span>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  hint,
  type = 'text',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center justify-between text-xs font-semibold">
        <span>{label}</span>
        {hint ? <span className="font-normal text-[#556249]">{hint}</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm text-[#1b1c18] transition-colors motion-reduce:transition-none focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
      />
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  icon,
  reference,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  reference: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 pb-3">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]">{icon}</span>
          <div>
            <h2 className="font-heading text-base font-semibold">{title}</h2>
            <p className="text-xs text-[#444840]">{subtitle}</p>
          </div>
        </div>
        <span className="rounded bg-[#f0eee8] px-2 py-1 font-mono text-[11px] text-[#444840]">
          {reference}
        </span>
      </div>
      {children}
    </section>
  );
}

export function FarmProfileScreen() {
  const [farmName, setFarmName] = useState('Greenfield Dairy Estate (illustrative)');
  const [legalEntity, setLegalEntity] = useState('Example Agricultural Enterprises');
  const [established, setEstablished] = useState('2016');
  const [email, setEmail] = useState('admin@example.invalid');
  const [phone, setPhone] = useState('+00 000 000 000 (example)');
  const [postal, setPostal] = useState('00000');
  const [address, setAddress] = useState('Example district, example region');
  const [waybill, setWaybill] = useState('Example chilled milk dispatch endorsement');
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-[#444840]">
            <span>Settings &amp; Configuration</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-[#2f4126]">Farm Profile</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              Farm Profile &amp; Operational Identity
            </h1>
            <Badge tone="danger">
              <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin sole
              authority
            </Badge>
            <Badge>Illustrative</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-[#444840]">
            Authorized farm profile fields pending owner confirmation. All values below are neutral
            examples; no live synchronization or cryptographic status is represented.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setFarmName('Greenfield Dairy Estate (illustrative)');
                setLegalEntity('Example Agricultural Enterprises');
                setEstablished('2016');
                setEmail('admin@example.invalid');
                setPhone('+00 000 000 000 (example)');
                setPostal('00000');
                setAddress('Example district, example region');
                setWaybill('Example chilled milk dispatch endorsement');
                setNotice('Local draft reset.');
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-semibold text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <X size={16} aria-hidden="true" /> Cancel changes
            </button>
            <button
              type="button"
              onClick={() => setNotice('Local preview only — no profile data was saved.')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save farm profile (local)
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <SectionCard
              title="Farm identity"
              subtitle="Official workspace identity and registered agricultural entity"
              icon={<Building2 size={18} aria-hidden="true" />}
              reference="SECTION 01"
            >
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <Field
                  id="farm-name"
                  label="Farm name"
                  value={farmName}
                  onChange={setFarmName}
                  hint="Public display"
                />
                <div className="space-y-1.5">
                  <span className="flex items-center justify-between text-xs font-semibold">
                    Workspace identifier
                    <span className="inline-flex items-center gap-1 font-normal text-[#7a461c]">
                      <Lock size={11} aria-hidden="true" /> system locked
                    </span>
                  </span>
                  <div className="flex h-10 items-center justify-between rounded-lg bg-[#eae8e2] px-3 font-mono text-sm">
                    <span>GF-042 (example)</span>
                    <Lock size={14} aria-hidden="true" className="text-[#444840]" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Field
                    id="legal-entity"
                    label="Registered farm legal entity"
                    value={legalEntity}
                    onChange={setLegalEntity}
                  />
                </div>
                <Field
                  id="established"
                  label="Establishment year"
                  type="number"
                  value={established}
                  onChange={setEstablished}
                />
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold">Operational classification</span>
                  <div className="flex h-10 items-center rounded-lg bg-[#f5f3ed] px-3 text-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-[#46583b]" aria-hidden="true" />
                    Example commercial dairy classification
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Approved farm profile & contact information"
              subtitle="Operational liaison details — example values only"
              icon={<Contact size={18} aria-hidden="true" />}
              reference="SECTION 02"
            >
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold">Designated Farm Administrator</span>
                  <div className="flex h-10 items-center justify-between rounded-lg bg-[#eae8e2] px-3 text-sm">
                    <span>Farm Admin (illustrative account)</span>
                    <Badge tone="primary">Active example</Badge>
                  </div>
                </div>
                <Field
                  id="contact-email"
                  label="Official dispatch / billing email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
                <Field
                  id="contact-phone"
                  label="Primary emergency phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                />
                <Field
                  id="postal"
                  label="Operational postal / ZIP code"
                  value={postal}
                  onChange={setPostal}
                />
                <div className="sm:col-span-2">
                  <Field
                    id="address"
                    label="Operational address / sector area"
                    value={address}
                    onChange={setAddress}
                  />
                </div>
              </div>
              <p className="mt-4 rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                Physical address coordinates and statutory tax fields are optional references and
                are not confirmed by the approved requirements.
              </p>
            </SectionCard>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <SectionCard
              title="Operational settings & capacity"
              subtitle="Illustrative carrying thresholds and facilities"
              icon={<Landmark size={18} aria-hidden="true" />}
              reference="SECTION 03"
            >
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <div className="rounded-xl bg-[#f5f3ed] p-3">
                  <p className="text-xs text-[#444840]">Total land / pasture</p>
                  <p className="font-heading mt-1 text-lg font-bold">120 ha (example)</p>
                  <p className="text-xs text-[#444840]">Unit based on farm configuration</p>
                </div>
                <div className="rounded-xl bg-[#f5f3ed] p-3">
                  <p className="text-xs text-[#444840]">Milking facility setup</p>
                  <p className="font-heading mt-1 text-lg font-bold">Example rotary parlor</p>
                  <p className="text-xs text-[#444840]">Descriptive example only</p>
                </div>
                <div className="rounded-xl bg-[#f5f3ed] p-3 sm:col-span-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#444840]">Herd carrying capacity</span>
                    <span className="font-semibold text-[#2f4126]">Illustrative utilization</span>
                  </div>
                  <p className="font-heading mt-1 text-lg font-bold">1,280 / 1,500 head</p>
                  <div
                    className="mt-2 h-2 w-full rounded-full bg-[#eae8e2]"
                    role="img"
                    aria-label="Illustrative occupancy approximately eighty-five percent"
                  >
                    <div className="h-2 w-[85%] rounded-full bg-[#46583b]" />
                  </div>
                </div>
                <div className="rounded-xl bg-[#f5f3ed] p-3 sm:col-span-2">
                  <p className="text-xs text-[#444840]">Bulk storage capacity</p>
                  <p className="font-heading mt-1 text-lg font-bold">
                    Example chilled tank capacity
                  </p>
                  <p className="text-xs text-[#444840]">No live measurement is shown.</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold">
                  Primary certified breeds (illustrative)
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Holstein Friesian', 'Jersey', 'Sahiwal cross'].map((breed) => (
                    <span
                      key={breed}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#c4c8bd] bg-white px-3 py-1.5 text-xs"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#46583b]" aria-hidden="true" />
                      {breed}
                    </span>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Farm seal & letterhead branding"
              subtitle="Illustrative dispatch document header"
              icon={<Truck size={18} aria-hidden="true" />}
              reference="SECTION 04"
            >
              <div className="rounded-xl bg-[#f5f3ed] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#2f4126] shadow-sm">
                    <Check size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading font-bold tracking-tight text-[#2f4126]">
                      EXAMPLE FARM DISPATCH SEAL
                    </p>
                    <p className="text-xs uppercase tracking-wide text-[#444840]">
                      Illustrative letterhead preview
                    </p>
                  </div>
                </div>
                <p className="mt-3 rounded-lg bg-white p-3 font-mono text-[11px] leading-relaxed text-[#444840]">
                  Example waybill header · workspace GF-042 · chilled bulk milk transit
                </p>
                <div className="mt-3 space-y-1.5">
                  <label htmlFor="waybill" className="block text-xs font-semibold">
                    Waybill header endorsement
                  </label>
                  <input
                    id="waybill"
                    type="text"
                    value={waybill}
                    onChange={(event) => setWaybill(event.target.value)}
                    className="h-9 w-full rounded-lg border border-[#c4c8bd] bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-[#444840]">
                No seal is embedded into any document by this preview.
              </p>
            </SectionCard>
          </div>
        </div>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no profile data was saved or synchronized.'}
        </p>
      </div>
    </div>
  );
}
