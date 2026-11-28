import { ChevronRight, Info, Lock, Save, ShieldCheck, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const currencies = [
  { code: 'USD', name: 'United States Dollar', symbol: '$' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
] as const;

type CurrencyCode = (typeof currencies)[number]['code'];

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

function RadioOption({
  id,
  label,
  detail,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  detail?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors motion-reduce:transition-none ${
        checked
          ? 'border-[#46583b] bg-[#d9e8c7]/30'
          : 'border-[#c4c8bd] bg-[#f5f3ed] hover:bg-[#eae8e2]'
      }`}
    >
      <input
        id={id}
        type="radio"
        name={id.split('-')[0]}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 accent-[#46583b]"
      />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        {detail ? <span className="block text-xs text-[#444840]">{detail}</span> : null}
      </span>
    </label>
  );
}

export function CurrencySettingsScreen() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [placement, setPlacement] = useState<'before' | 'after' | 'iso'>('before');
  const [grouping, setGrouping] = useState<'western' | 'south-asian'>('western');
  const [decimal, setDecimal] = useState<'2' | '0'>('2');
  const [notice, setNotice] = useState('');

  const selected = currencies.find((item) => item.code === currency) ?? currencies[0];
  const amount = grouping === 'western' ? '1,250.00' : '1,250.00';
  const preview =
    placement === 'before'
      ? `${selected.symbol}${amount}`
      : placement === 'after'
        ? `${amount} ${selected.symbol}`
        : `${selected.code} ${amount}`;

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#444840]">
              <span>Settings &amp; Configuration</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="font-semibold text-[#2f4126]">Currency Settings</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Farm Currency &amp; Monetary Presentation
              </h1>
              <Badge tone="danger">
                <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin sole
                authority
              </Badge>
              <Badge>Illustrative</Badge>
            </div>
            <p className="mt-1.5 text-sm text-[#444840]">
              Currency is farm-configured. This preview demonstrates formatting choices only and
              does not convert values or save a configuration.
            </p>
          </div>
          <div className="flex gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setCurrency('USD');
                setPlacement('before');
                setGrouping('western');
                setDecimal('2');
                setNotice('Local draft reset.');
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#dcdad4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <X size={16} aria-hidden="true" /> Cancel &amp; reset
            </button>
            <button
              type="button"
              onClick={() => setNotice('Local preview only — no currency configuration was saved.')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save configuration (local)
            </button>
          </div>
        </header>

        <section
          aria-label="Currency policy"
          className="flex flex-col gap-3 rounded-xl border border-[#c4c8bd] bg-[#f0eee8] p-5 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-[#d9e8c7] p-2 text-[#2f4126]">
              <Lock size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-heading text-sm font-bold">Farm-configured currency policy</h2>
              <p className="mt-1 max-w-3xl text-sm text-[#444840]">
                No universal default currency is approved. The platform performs no foreign exchange
                conversion; amounts shown are direct example values in the selected unit. Existing
                numeric records are never recalculated here.
              </p>
            </div>
          </div>
          <Badge tone="primary">No conversion performed</Badge>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="flex flex-col gap-6 xl:col-span-7">
            <section
              aria-labelledby="currency-selector"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 id="currency-selector" className="font-heading text-lg font-bold">
                    1. Farm operational currency
                  </h2>
                  <p className="mt-0.5 text-sm text-[#444840]">
                    Select the monetary unit used for display in this workspace.
                  </p>
                </div>
                <Badge>Required (preview)</Badge>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {currencies.map((item) => (
                  <RadioOption
                    key={item.code}
                    id={`currency-${item.code.toLowerCase()}`}
                    label={`${item.code} (${item.symbol})`}
                    detail={item.name}
                    checked={currency === item.code}
                    onChange={() => setCurrency(item.code)}
                  />
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-[#f5f3ed] p-4">
                <label htmlFor="custom-code" className="block text-sm font-semibold">
                  Custom farm token / unlisted currency code
                </label>
                <p className="mt-1 text-xs text-[#444840]">
                  Awaiting approved provisioning rules; disabled in this preview.
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    id="custom-code"
                    disabled
                    placeholder="e.g. AGRI"
                    className="h-10 rounded-lg border border-[#c4c8bd] bg-[#eae8e2] px-3 text-sm opacity-60"
                  />
                  <input
                    id="custom-symbol"
                    disabled
                    placeholder="Display symbol"
                    className="h-10 rounded-lg border border-[#c4c8bd] bg-[#eae8e2] px-3 text-sm opacity-60"
                  />
                </div>
              </div>
            </section>

            <section
              aria-labelledby="format-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <h2 id="format-title" className="font-heading text-lg font-bold">
                2. Notation &amp; formatting preferences
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Separators, symbol alignment, and precision for display only.
              </p>
              <div className="mt-5 space-y-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#444840]">
                    Symbol &amp; code placement
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <RadioOption
                      id="placement-before"
                      label="Before amount"
                      checked={placement === 'before'}
                      onChange={() => setPlacement('before')}
                    />
                    <RadioOption
                      id="placement-after"
                      label="After amount"
                      checked={placement === 'after'}
                      onChange={() => setPlacement('after')}
                    />
                    <RadioOption
                      id="placement-iso"
                      label="ISO prefix"
                      checked={placement === 'iso'}
                      onChange={() => setPlacement('iso')}
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#444840]">
                    Numeric digit grouping
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <RadioOption
                      id="grouping-western"
                      label="Standard international"
                      detail="Three-digit intervals"
                      checked={grouping === 'western'}
                      onChange={() => setGrouping('western')}
                    />
                    <RadioOption
                      id="grouping-south-asian"
                      label="South Asian (lakh / crore)"
                      detail="Regional grouping conventions"
                      checked={grouping === 'south-asian'}
                      onChange={() => setGrouping('south-asian')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#f5f3ed] p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#444840]">
                      Thousands separator
                    </p>
                    <div className="space-y-2 text-sm">
                      {[',', '.', ' '].map((sep, index) => (
                        <label key={index} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="thousands"
                            defaultChecked={index === 0}
                            className="accent-[#46583b]"
                          />
                          <span>{index === 2 ? 'Space' : sep}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#f5f3ed] p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#444840]">
                      Decimal precision
                    </p>
                    <div className="space-y-2 text-sm">
                      <RadioOption
                        id="precision-2"
                        label="2 decimals (standard)"
                        checked={decimal === '2'}
                        onChange={() => setDecimal('2')}
                      />
                      <RadioOption
                        id="precision-0"
                        label="0 decimals (whole units)"
                        checked={decimal === '0'}
                        onChange={() => setDecimal('0')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6 xl:col-span-5">
            <section
              aria-labelledby="preview-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#c4c8bd] pb-4">
                <h2 id="preview-title" className="font-heading text-lg font-bold">
                  Formatting preview
                </h2>
                <Badge tone="primary">Illustrative</Badge>
              </div>
              <div className="mt-4 rounded-xl bg-[#f0eee8] p-4">
                <p className="text-xs uppercase tracking-wide text-[#444840]">Example amount</p>
                <p className="font-heading mt-1 text-3xl font-bold text-[#2f4126]">
                  {decimal === '2' ? preview : preview.replace('.00', '')}
                </p>
                <p className="mt-2 text-xs text-[#444840]">
                  Selected code: {selected.code} · {selected.name}
                </p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#444840]">
                This formatted example is not a ledger value. No module totals, vouchers, or
                payslips are generated or saved by this preview.
              </p>
            </section>

            <section
              aria-labelledby="guidance-title"
              className="rounded-xl bg-[#f0eee8] p-5 shadow-sm"
            >
              <h2 id="guidance-title" className="font-heading text-base font-bold">
                Formatting guidance
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-[#444840]">
                <li>• Currency choice is per farm and does not imply conversion.</li>
                <li>• Symbol position and separators affect display only.</li>
                <li>• Existing numeric records remain unchanged.</li>
                <li>• Regional grouping conventions are illustrative.</li>
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs text-[#444840]">
                <Info size={14} className="mt-0.5 shrink-0 text-[#46583b]" aria-hidden="true" />
                Approval is required before any currency behaviour is wired to real data.
              </p>
            </section>
          </div>
        </div>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no currency configuration was saved.'}
        </p>
      </div>
    </div>
  );
}
