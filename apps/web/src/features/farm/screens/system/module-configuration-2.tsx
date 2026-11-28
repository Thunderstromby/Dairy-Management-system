import {
  Bell,
  Banknote,
  Check,
  ChevronRight,
  Info,
  Ruler,
  Save,
  ShieldCheck,
  Sunrise,
  Sunset,
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

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-5 shrink-0 rounded border border-[#c4c8bd] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
        checked ? 'border-[#46583b] bg-[#46583b] text-white' : 'bg-white'
      }`}
    >
      {checked ? <Check size={13} className="m-0.5" aria-hidden="true" /> : null}
    </button>
  );
}

export function ModuleConfiguration2Screen() {
  const [massUnit, setMassUnit] = useState('kg');
  const [areaUnit, setAreaUnit] = useState('ha');
  const [price, setPrice] = useState('0.58');
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(true);
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 py-6 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#444840]">
            <span>Settings &amp; Configuration</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-bold text-[#2f4126]">Module Configuration</span>
          </div>
          <Badge tone="primary">Illustrative workspace</Badge>
        </div>

        <section className="flex flex-col gap-4 border-b border-[#c4c8bd] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Module Configuration
              </h1>
              <Badge tone="danger">
                <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
              </Badge>
            </div>
            <p className="mt-1 text-sm text-[#444840]">
              Operational defaults and module preferences for the example workspace. Values are
              illustrative and no configuration is saved by this preview.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setMassUnit('kg');
                setAreaUnit('ha');
                setPrice('0.58');
                setInApp(true);
                setEmail(true);
                setNotice('Local draft reset.');
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-4 py-2.5 text-sm font-semibold text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#f0eee8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <X size={16} aria-hidden="true" /> Cancel changes
            </button>
            <button
              type="button"
              onClick={() => setNotice('Local preview only — no configuration was saved.')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save configuration (local)
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <section
              aria-labelledby="measurements-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                  <Ruler size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="measurements-title" className="font-heading text-lg font-semibold">
                    Farm-specific measurement preferences
                  </h2>
                  <p className="text-xs text-[#444840]">
                    Standardized units applied across production, herd, and pasture records
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                  <p className="text-xs font-semibold text-[#444840]">Milk production</p>
                  <p className="font-heading mt-1 text-base font-bold">Litres (L)</p>
                  <p className="mt-1 text-xs text-[#444840]">Fixed reference</p>
                </div>
                <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                  <label
                    htmlFor="config-mass"
                    className="mb-1 block text-xs font-semibold text-[#444840]"
                  >
                    Animal weight &amp; feed
                  </label>
                  <select
                    id="config-mass"
                    value={massUnit}
                    onChange={(event) => setMassUnit(event.target.value)}
                    className="h-9 w-full rounded-md border border-[#c4c8bd] bg-white px-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                  </select>
                </div>
                <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                  <label
                    htmlFor="config-area"
                    className="mb-1 block text-xs font-semibold text-[#444840]"
                  >
                    Pasture area
                  </label>
                  <select
                    id="config-area"
                    value={areaUnit}
                    onChange={(event) => setAreaUnit(event.target.value)}
                    className="h-9 w-full rounded-md border border-[#c4c8bd] bg-white px-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <option value="ha">Hectares (ha)</option>
                    <option value="ac">Acres (ac)</option>
                  </select>
                </div>
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                <Info size={14} className="mt-0.5 shrink-0 text-[#7a461c]" aria-hidden="true" />
                No silent conversion is performed. Changing display units does not retroactively
                recalculate historical records.
              </p>
            </section>

            <section
              aria-labelledby="pricing-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                    <Banknote size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 id="pricing-title" className="font-heading text-lg font-semibold">
                      Milk sales &amp; pricing defaults
                    </h2>
                    <p className="text-xs text-[#444840]">
                      Default valuation reference when recording milk sales
                    </p>
                  </div>
                </div>
                <Badge>Farm-configured currency</Badge>
              </div>
              <div className="mt-4 rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                <label htmlFor="config-price" className="mb-1 block text-sm font-bold">
                  Default milk sale price per litre (illustrative)
                </label>
                <div className="mt-2 flex max-w-sm items-center rounded-lg border border-[#c4c8bd] bg-white pr-3">
                  <input
                    id="config-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="h-11 w-full rounded-lg bg-transparent px-3 text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  />
                  <span className="whitespace-nowrap rounded bg-[#eae8e2] px-2 py-1 text-xs text-[#444840]">
                    per litre
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#444840]">
                  Currency symbol and precision come from the farm currency setting; no universal
                  currency is assumed. Farm Admin may override individual sale prices.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="herd-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                  <Users size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="herd-title" className="font-heading text-lg font-semibold">
                    Herd &amp; workforce operational settings
                  </h2>
                  <p className="text-xs text-[#444840]">
                    Groupings, milking sessions and payroll cycle reference
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                  <p className="mb-2 text-xs font-bold">Standard animal grouping categories</p>
                  <div className="flex flex-wrap gap-2">
                    {['Lactating cows', 'Dry cows', 'Heifers', 'Calves', 'Bulls'].map((group) => (
                      <span
                        key={group}
                        className="rounded-full border border-[#c4c8bd] bg-white px-3 py-1 text-xs font-medium"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                    <p className="mb-2 text-xs font-bold">Milking session labels</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md border border-[#c4c8bd] bg-white px-3 py-2 text-sm">
                        <span className="flex items-center gap-2">
                          <Sunrise size={14} className="text-[#7a461c]" aria-hidden="true" />{' '}
                          Morning
                        </span>
                        <span className="text-xs text-[#444840]">Session 1</span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border border-[#c4c8bd] bg-white px-3 py-2 text-sm">
                        <span className="flex items-center gap-2">
                          <Sunset size={14} className="text-[#46583b]" aria-hidden="true" /> Evening
                        </span>
                        <span className="text-xs text-[#444840]">Session 2</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-4">
                    <p className="text-xs font-bold">Standard shift &amp; payroll cycle</p>
                    <p className="mt-1 text-xs text-[#444840]">
                      Reference only; formulas remain unresolved.
                    </p>
                    <div className="mt-3 flex items-center justify-between rounded-md border border-[#c4c8bd] bg-white px-3 py-2 text-sm">
                      <span className="font-bold text-[#2f4126]">Bi-weekly</span>
                      <span className="text-xs text-[#444840]">14-day cycle (example)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <section
              aria-labelledby="notif-summary-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#46583b]">
                  <Bell size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="notif-summary-title" className="font-heading text-lg font-semibold">
                    Supported notification preferences
                  </h2>
                  <p className="text-xs text-[#444840]">Alert channels and threshold references</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  {
                    label: 'In-app notifications',
                    detail: 'Alerts in notification center',
                    value: inApp,
                    set: setInApp,
                  },
                  {
                    label: 'Email notifications',
                    detail: 'Where supported and approved',
                    value: email,
                    set: setEmail,
                  },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-3"
                  >
                    <span>
                      <span className="block text-sm font-bold">{item.label}</span>
                      <span className="block text-xs text-[#444840]">{item.detail}</span>
                    </span>
                    <Toggle checked={item.value} onChange={item.set} label={item.label} />
                  </label>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-[#c4c8bd] pt-4">
                <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Production variance reference</span>
                    <Badge tone="danger">Pending approval</Badge>
                  </div>
                  <p className="mt-1 text-xs text-[#444840]">
                    The comparison threshold is unresolved; no confirmed formula is displayed.
                  </p>
                </div>
                <div className="rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Inventory low-stock reference</span>
                    <Badge tone="primary">Illustrative</Badge>
                  </div>
                  <p className="mt-1 text-xs text-[#444840]">
                    Trigger reference: current stock at or below configured minimum.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-right text-xs font-semibold text-[#46583b]">
                Notification settings are managed on their dedicated screen.
              </p>
            </section>
          </div>
        </div>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no module configuration was saved.'}
        </p>
      </div>
    </div>
  );
}
