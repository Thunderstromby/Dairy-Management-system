import {
  Banknote,
  ChevronRight,
  ClipboardList,
  Leaf,
  Info,
  Package,
  Save,
  ShieldCheck,
  Users,
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

function NumberField({
  id,
  label,
  value,
  onChange,
  unit,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-bold">
        {label}
      </label>
      <div className="flex items-center rounded-lg border border-[#c4c8bd] bg-white pr-3">
        <input
          id={id}
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full rounded-lg bg-transparent px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
        />
        {unit ? <span className="whitespace-nowrap text-xs text-[#444840]">{unit}</span> : null}
      </div>
      {hint ? <p className="mt-1 text-xs text-[#444840]">{hint}</p> : null}
    </div>
  );
}

export function ModuleConfiguration1Screen() {
  const [mode, setMode] = useState<'standard' | 'validation'>('standard');
  const [price, setPrice] = useState('0.58');
  const [temp, setTemp] = useState('4.0');
  const [scc, setScc] = useState('400000');
  const [earTag, setEarTag] = useState('#ET-042-');
  const [dmi, setDmi] = useState('23.5');
  const [buffer, setBuffer] = useState('5');
  const [expiry, setExpiry] = useState('14');
  const [shift, setShift] = useState('8.0');
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 py-6 md:p-6">
        <section
          aria-label="Illustrative state selector"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#eae8e2] p-3 shadow-sm"
        >
          <span className="text-xs font-bold uppercase tracking-wide text-[#444840]">
            Preview state selector
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={mode === 'standard'}
              onClick={() => {
                setMode('standard');
                setNotice('Standard illustrative view selected.');
              }}
              className={`rounded px-3 py-1 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                mode === 'standard' ? 'bg-[#46583b] text-white' : 'bg-white text-[#1b1c18]'
              }`}
            >
              Standard view
            </button>
            <button
              type="button"
              aria-pressed={mode === 'validation'}
              onClick={() => {
                setMode('validation');
                setNotice('Illustrative validation state selected — no value was rejected.');
              }}
              className={`rounded px-3 py-1 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                mode === 'validation' ? 'bg-[#7a461c] text-white' : 'bg-white text-[#1b1c18]'
              }`}
            >
              Validation note (illustrative)
            </button>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#444840]">
            <span>Settings &amp; Configuration</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-bold text-[#2f4126]">Module Configuration</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="danger">
              <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin sole
              authority
            </Badge>
            <Badge>Alternative layout — illustrative</Badge>
          </div>
        </div>

        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              Module Configuration &amp; Operational Parameters
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Alternative operational parameter layout. All figures are illustrative; no automated
              pricing, hardware control, or immutable ledger entry is represented.
            </p>
          </div>
          <div className="flex gap-3 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setNotice('Local draft reset.')}
              className="rounded-lg bg-[#eae8e2] px-4 py-2.5 text-sm font-semibold text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#dcdad4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <X size={14} className="mr-1 inline" aria-hidden="true" /> Discard changes
            </button>
            <button
              type="button"
              onClick={() => setNotice('Local preview only — no configuration was saved.')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save configuration (local)
            </button>
          </div>
        </header>

        <section className="flex flex-col gap-3 rounded-xl border border-[#c4c8bd] bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-[#f0eee8] p-2.5 text-[#46583b]">
              <ClipboardList size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-heading text-sm font-bold">Farm admin policy reference</h2>
              <p className="mt-1 max-w-3xl text-sm text-[#444840]">
                Parameters shown here are illustrative defaults. Exact pricing rules, quality
                thresholds, and shift constraints require approval before they can be applied.
              </p>
            </div>
          </div>
          <Badge>Preview only</Badge>
        </section>

        {mode === 'validation' ? (
          <section
            role="status"
            className="flex items-start gap-3 rounded-xl bg-[#eae8e2] p-4 text-[#7a461c] shadow-sm"
          >
            <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm">
              Illustrative validation notice: a configured quality threshold may exceed a buyer
              specification. No value has been rejected and no external rule is asserted.
            </p>
          </section>
        ) : null}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <section
              aria-labelledby="milk-config"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                    <Banknote size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 id="milk-config" className="font-heading text-lg font-semibold">
                      Milk management configuration
                    </h2>
                    <p className="text-xs text-[#444840]">
                      Illustrative pricing, quality references and shift windows
                    </p>
                  </div>
                </div>
                <Badge tone="primary">Primary commercial reference</Badge>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <NumberField
                  id="alt-price"
                  label="Commercial milk base price per litre (example)"
                  value={price}
                  onChange={setPrice}
                  unit="farm-configured currency"
                />
                <NumberField
                  id="alt-temp"
                  label="Bulk vat temperature ceiling (example)"
                  value={temp}
                  onChange={setTemp}
                  unit="°C"
                  hint="No automatic valve or hardware action is represented."
                />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
                <div className="md:col-span-5">
                  <NumberField
                    id="alt-scc"
                    label="SCC advisory reference (example)"
                    value={scc}
                    onChange={setScc}
                    unit="cells/mL"
                    hint="Threshold rules remain unresolved; this is not an approved limit."
                  />
                </div>
                <div className="md:col-span-7">
                  <p className="mb-2 text-xs font-bold">Milking shift windows (illustrative)</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-2">
                      <p className="text-xs font-semibold">Morning</p>
                      <div className="mt-1 flex items-center gap-1 text-xs">
                        <input
                          type="time"
                          defaultValue="04:00"
                          aria-label="Illustrative morning start"
                          className="w-full rounded border border-[#c4c8bd] bg-white p-1"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          defaultValue="08:30"
                          aria-label="Illustrative morning end"
                          className="w-full rounded border border-[#c4c8bd] bg-white p-1"
                        />
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-2">
                      <p className="text-xs font-semibold">Evening</p>
                      <div className="mt-1 flex items-center gap-1 text-xs">
                        <input
                          type="time"
                          defaultValue="16:00"
                          aria-label="Illustrative evening start"
                          className="w-full rounded border border-[#c4c8bd] bg-white p-1"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          defaultValue="19:30"
                          aria-label="Illustrative evening end"
                          className="w-full rounded border border-[#c4c8bd] bg-white p-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              aria-labelledby="herd-config"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                  <Users size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="herd-config" className="font-heading text-lg font-semibold">
                    Herd management configuration
                  </h2>
                  <p className="text-xs text-[#444840]">
                    Identification prefix and grouping references
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="ear-tag" className="mb-1 block text-xs font-bold">
                    Illustrative ear-tag prefix
                  </label>
                  <input
                    id="ear-tag"
                    type="text"
                    value={earTag}
                    onChange={(event) => setEarTag(event.target.value)}
                    className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 font-mono text-sm"
                  />
                  <p className="mt-1 text-xs text-[#444840]">
                    Uniqueness rules are enforced per workspace; no sequential ID is issued here.
                  </p>
                </div>
                <div>
                  <label htmlFor="isolation-ward" className="mb-1 block text-xs font-bold">
                    Illustrative isolation ward reference
                  </label>
                  <select
                    id="isolation-ward"
                    className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <option>Example isolation pen</option>
                    <option>Example observation pen</option>
                  </select>
                  <p className="mt-1 text-xs text-[#444840]">
                    No automated routing or hardware linkage.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-xs font-bold">Standard grouping categories</p>
                <div className="flex flex-wrap gap-2">
                  {['Fresh cows', 'High yield', 'Mid-late lactation', 'Dry cows'].map((group) => (
                    <span
                      key={group}
                      className="rounded-full border border-[#c4c8bd] bg-[#f5f3ed] px-3 py-1 text-xs"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <section
              aria-labelledby="feeding-config"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                  <Leaf size={20} aria-hidden="true" />
                </span>
                <h2 id="feeding-config" className="font-heading text-base font-semibold">
                  Feeding configuration
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="mb-2 text-xs font-bold">Ration reference mode</p>
                  <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#f0eee8] p-1">
                    {['Scheduled', 'Manual'].map((modeLabel, index) => (
                      <button
                        key={modeLabel}
                        type="button"
                        aria-pressed={index === 0}
                        className={`rounded-md px-2 py-1.5 text-xs font-semibold ${
                          index === 0 ? 'bg-white text-[#2f4126] shadow-sm' : 'text-[#444840]'
                        }`}
                      >
                        {modeLabel}
                      </button>
                    ))}
                  </div>
                </div>
                <NumberField
                  id="alt-dmi"
                  label="Illustrative DMI target"
                  value={dmi}
                  onChange={setDmi}
                  unit="kg / cow / day"
                  hint="No nutritional formula is applied."
                />
              </div>
            </section>

            <section
              aria-labelledby="inventory-config"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                  <Package size={20} aria-hidden="true" />
                </span>
                <h2 id="inventory-config" className="font-heading text-base font-semibold">
                  Inventory &amp; warehousing
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                <NumberField
                  id="alt-buffer"
                  label="Low-stock buffer"
                  value={buffer}
                  onChange={setBuffer}
                  unit="units"
                />
                <NumberField
                  id="alt-expiry"
                  label="Expiry alert lead"
                  value={expiry}
                  onChange={setExpiry}
                  unit="days"
                />
                <p className="rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                  No automatic purchase order, stock deduction, or expiry disposal is performed.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="workforce-config"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                  <Users size={20} aria-hidden="true" />
                </span>
                <h2 id="workforce-config" className="font-heading text-base font-semibold">
                  Workforce &amp; shift timing
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                <NumberField
                  id="alt-shift"
                  label="Standard shift length"
                  value={shift}
                  onChange={setShift}
                  unit="hours"
                />
                <div className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-3 text-sm">
                  <span>Payroll period</span>
                  <Badge>Bi-weekly (example)</Badge>
                </div>
                <p className="text-xs text-[#444840]">
                  Payroll formulas and overtime rules remain unresolved.
                </p>
              </div>
            </section>
          </div>
        </div>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no configuration was saved.'}
        </p>
      </div>
    </div>
  );
}
