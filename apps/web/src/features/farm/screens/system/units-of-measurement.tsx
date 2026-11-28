import {
  Check,
  Droplets,
  Info,
  Lock,
  Ruler,
  Save,
  Scale,
  ShieldCheck,
  Thermometer,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

const massOptions = [
  { id: 'kg', label: 'Kilograms (kg)', detail: 'Metric mass reference' },
  { id: 'lb', label: 'Pounds (lb)', detail: 'Imperial mass reference' },
  { id: 'mnd', label: 'Maunds (mnd)', detail: 'Regional agrarian reference' },
] as const;

const areaOptions = [
  { id: 'ha', label: 'Hectares (ha)', detail: 'Metric area reference' },
  { id: 'ac', label: 'Acres (ac)', detail: 'Imperial area reference' },
  { id: 'kanals', label: 'Kanals / Marlas', detail: 'Regional cadastral reference' },
] as const;

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

function OptionCard({
  id,
  label,
  detail,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  detail: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer flex-col rounded-xl border p-4 transition-colors motion-reduce:transition-none ${
        checked
          ? 'border-[#46583b] bg-[#d9e8c7]/30'
          : 'border-[#c4c8bd] bg-[#f5f3ed] hover:bg-[#eae8e2]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-heading font-semibold">{label}</span>
        <input
          id={id}
          type="radio"
          name={id.split('-')[0]}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 accent-[#46583b]"
        />
      </div>
      <p className="mt-2 flex-1 text-xs text-[#444840]">{detail}</p>
      {checked ? (
        <span className="mt-3 inline-flex w-fit items-center gap-1 rounded bg-[#d9e8c7] px-2 py-0.5 text-[11px] font-semibold text-[#2f4126]">
          <Check size={12} aria-hidden="true" /> Illustrative active choice
        </span>
      ) : null}
    </label>
  );
}

export function UnitsOfMeasurementScreen() {
  const [mass, setMass] = useState('kg');
  const [area, setArea] = useState('ha');
  const [temperature, setTemperature] = useState('c');
  const [milkPrecision, setMilkPrecision] = useState('1');
  const [feedPrecision, setFeedPrecision] = useState('0');
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-[#444840]">
            <span>Settings &amp; Configuration</span>
            <span aria-hidden="true">›</span>
            <span className="font-semibold text-[#2f4126]">Units of Measurement</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              Units of Measurement &amp; Dimension Standards
            </h1>
            <Badge tone="danger">
              <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
            </Badge>
            <Badge>Illustrative</Badge>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-[#444840]">
            Configured units govern display choices. Automatic silent conversion is not performed,
            and historical records retain their original unit stamp.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setMass('kg');
                setArea('ha');
                setTemperature('c');
                setMilkPrecision('1');
                setFeedPrecision('0');
                setNotice('Local draft reset.');
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-semibold text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <X size={16} aria-hidden="true" /> Reset to defaults (local)
            </button>
            <button
              type="button"
              onClick={() => setNotice('Local preview only — no measurement standard was saved.')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save measurement units (local)
            </button>
          </div>
        </header>

        <section
          aria-label="Measurement notice"
          className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-5 shadow-sm"
        >
          <span className="rounded-lg bg-[#2f4126] p-2 text-white">
            <Info size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-heading text-sm font-bold">System-wide measurement notice</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Measurement standards apply to new entries and display. No sensor, weighbridge, or IoT
              hardware integration is represented, and no existing record is recalculated.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <section
              aria-labelledby="milk-unit"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]">
                    <Droplets size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 id="milk-unit" className="font-heading text-base font-semibold">
                      1. Milk production &amp; yield unit
                    </h2>
                    <p className="text-xs text-[#444840]">Core commercial and herd ledger metric</p>
                  </div>
                </div>
                <Badge tone="primary">
                  <Lock size={12} className="mr-1" aria-hidden="true" /> Fixed standard
                </Badge>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f5f3ed] p-4">
                <div>
                  <p className="font-heading text-xl font-bold text-[#2f4126]">Litres (L)</p>
                  <p className="mt-1 text-sm text-[#444840]">
                    Locked volume unit for production records and sales.
                  </p>
                </div>
                <span className="rounded-lg bg-white px-3 py-2 text-sm font-mono text-[#444840] shadow-sm">
                  Litres (L)
                </span>
              </div>
            </section>

            <section
              aria-labelledby="mass-unit"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]">
                  <Scale size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="mass-unit" className="font-heading text-base font-semibold">
                    2. Animal weight &amp; forage feed mass
                  </h2>
                  <p className="text-xs text-[#444840]">Applied to herd and feed records</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                {massOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    id={`mass-${option.id}`}
                    label={option.label}
                    detail={option.detail}
                    checked={mass === option.id}
                    onChange={() => setMass(option.id)}
                  />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="area-unit"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]">
                  <Ruler size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="area-unit" className="font-heading text-base font-semibold">
                    3. Pasture, paddock &amp; facility area
                  </h2>
                  <p className="text-xs text-[#444840]">Area display reference for land records</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                {areaOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    id={`area-${option.id}`}
                    label={option.label}
                    detail={option.detail}
                    checked={area === option.id}
                    onChange={() => setArea(option.id)}
                  />
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section
                aria-labelledby="temperature-unit"
                className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Thermometer size={18} aria-hidden="true" className="text-[#2f4126]" />
                  <h2 id="temperature-unit" className="font-heading text-base font-semibold">
                    4. Temperature reference
                  </h2>
                </div>
                <p className="mt-1 text-xs text-[#444840]">
                  Display reference for recorded storage and health temperatures.
                </p>
                <div className="mt-4 space-y-2">
                  {[
                    { id: 'temp-c', label: 'Celsius (°C)', value: 'c' },
                    { id: 'temp-f', label: 'Fahrenheit (°F)', value: 'f' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      htmlFor={option.id}
                      className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-3 text-sm"
                    >
                      <span>{option.label}</span>
                      <input
                        id={option.id}
                        type="radio"
                        name="temperature"
                        checked={temperature === option.value}
                        onChange={() => setTemperature(option.value)}
                        className="h-4 w-4 accent-[#46583b]"
                      />
                    </label>
                  ))}
                </div>
              </section>

              <section
                aria-labelledby="precision-title"
                className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
              >
                <h2 id="precision-title" className="font-heading text-base font-semibold">
                  5. Numerical precision display
                </h2>
                <p className="mt-1 text-xs text-[#444840]">
                  Rounding shown for display only; stored values are not modified.
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-3">
                    <span>Milk yield precision</span>
                    <span className="flex gap-1">
                      {['1', '2'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={milkPrecision === value}
                          onClick={() => setMilkPrecision(value)}
                          className={`rounded px-2 py-1 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                            milkPrecision === value
                              ? 'bg-[#46583b] text-white'
                              : 'bg-[#eae8e2] text-[#444840]'
                          }`}
                        >
                          {value} dec
                        </button>
                      ))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-3">
                    <span>Feed &amp; silage precision</span>
                    <span className="flex gap-1">
                      {['0', '1'].map((value) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={feedPrecision === value}
                          onClick={() => setFeedPrecision(value)}
                          className={`rounded px-2 py-1 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                            feedPrecision === value
                              ? 'bg-[#46583b] text-white'
                              : 'bg-[#eae8e2] text-[#444840]'
                          }`}
                        >
                          {value} dec
                        </button>
                      ))}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <section
              aria-labelledby="integrity-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <h2 id="integrity-title" className="font-heading text-base font-semibold">
                Historical integrity
              </h2>
              <p className="mt-2 text-xs text-[#444840]">
                Illustrative record showing that changing display units never silently converts an
                existing stamped value.
              </p>
              <div className="mt-4 rounded-xl bg-[#f5f3ed] p-4 font-mono text-xs">
                <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                  <span className="font-bold text-[#1b1c18]">Example record #8491-FEED</span>
                  <span className="text-[#444840]">Example date</span>
                </div>
                <div className="mt-3 flex justify-between">
                  <span className="text-[#444840]">Forage weight:</span>
                  <span className="rounded bg-[#eae8e2] px-2 py-0.5 font-bold">6,420 kg</span>
                </div>
                <div className="mt-2 flex justify-between text-[#444840]">
                  <span>Unit stamped at entry:</span>
                  <span>KG</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#444840]">
                No hash, checksum, or cryptographic seal is claimed.
              </p>
            </section>

            <section
              aria-labelledby="summary-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <h2 id="summary-title" className="font-heading text-base font-semibold">
                Dimension summary
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ['Milk production', 'Litres (L) — fixed'],
                  ['Weight & feed', mass.toUpperCase()],
                  ['Pasture & facility area', area.toUpperCase()],
                  ['Temperature', temperature === 'c' ? 'Celsius (°C)' : 'Fahrenheit (°F)'],
                  ['Milk precision', `${milkPrecision} decimal place(s)`],
                  ['Feed precision', `${feedPrecision} decimal place(s)`],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-2.5"
                  >
                    <span className="text-[#444840]">{label}</span>
                    <span className="font-mono text-xs font-semibold text-[#2f4126]">{value}</span>
                  </li>
                ))}
              </ul>
            </section>

            <p className="rounded-xl bg-[#f0eee8] p-4 text-xs text-[#444840]">
              Confirmation is required before any unit change is applied. This preview does not save
              a standard or update any record.
            </p>
          </div>
        </div>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no measurement standard was saved.'}
        </p>
      </div>
    </div>
  );
}
