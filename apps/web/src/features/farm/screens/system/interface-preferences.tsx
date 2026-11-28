import {
  CalendarDays,
  Check,
  ChevronRight,
  Eye,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
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

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border border-[#c4c8bd] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
        checked ? 'bg-[#46583b]' : 'bg-[#eae8e2]'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform motion-reduce:transition-none ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export function InterfacePreferencesScreen() {
  const [grouping, setGrouping] = useState<'western' | 'south-asian'>('western');
  const [suffix, setSuffix] = useState(true);
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [weekStart, setWeekStart] = useState('monday');
  const [milkPrecision, setMilkPrecision] = useState('1');
  const [feedPrecision, setFeedPrecision] = useState('0');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [contrast, setContrast] = useState(false);
  const [notice, setNotice] = useState('');

  const representative =
    grouping === 'western'
      ? '1,280,000 L · 1,250.00 · 142,500 kg'
      : '12,80,000 L · 12,50,000 · 1,42,500 kg';
  const exampleDate =
    dateFormat === 'DD/MM/YYYY'
      ? '24/10/2026'
      : dateFormat === 'YYYY-MM-DD'
        ? '2026-10-24'
        : '24-Oct-2026';
  const exampleTime = timeFormat === '12h' ? '09:42 AM' : '09:42';

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#444840]">
            <span>Settings &amp; Configuration</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-[#2f4126]">Interface Preferences</span>
            <span aria-hidden="true">•</span>
            <Badge tone="danger">
              <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
            </Badge>
            <Badge>Illustrative</Badge>
          </div>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Interface Preferences &amp; Regional Numerics
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-[#444840]">
                Regional numeric conventions, date and time formats, and display preferences. All
                preview values are illustrative and no device or theme state is changed.
              </p>
            </div>
            <div className="flex gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setGrouping('western');
                  setSuffix(true);
                  setDateFormat('DD/MM/YYYY');
                  setTimeFormat('12h');
                  setWeekStart('monday');
                  setMilkPrecision('1');
                  setFeedPrecision('0');
                  setTheme('light');
                  setContrast(false);
                  setNotice('Local draft reset.');
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <X size={16} aria-hidden="true" /> Cancel changes
              </button>
              <button
                type="button"
                onClick={() =>
                  setNotice('Local preview only — no preference was saved or applied.')
                }
                className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <Save size={16} aria-hidden="true" /> Save preferences (local)
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <section
              aria-labelledby="numeric-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]">
                    <SlidersHorizontal size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 id="numeric-title" className="font-heading text-base font-semibold">
                      Regional numeric grouping
                    </h2>
                    <p className="text-xs text-[#444840]">Illustrative notation systems</p>
                  </div>
                </div>
                <Badge>Agronomic locale</Badge>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {[
                  {
                    id: 'numeric-western',
                    value: 'western' as const,
                    label: 'Standard Western',
                    detail: 'Three-digit grouping',
                  },
                  {
                    id: 'numeric-south-asian',
                    value: 'south-asian' as const,
                    label: 'South Asian',
                    detail: 'Lakh / crore grouping',
                  },
                ].map((option) => (
                  <label
                    key={option.id}
                    htmlFor={option.id}
                    className={`cursor-pointer rounded-xl border p-4 transition-colors motion-reduce:transition-none ${
                      grouping === option.value
                        ? 'border-[#46583b] bg-[#d9e8c7]/30'
                        : 'border-[#c4c8bd] bg-[#f5f3ed] hover:bg-[#eae8e2]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <input
                          id={option.id}
                          type="radio"
                          name="numeric-grouping"
                          checked={grouping === option.value}
                          onChange={() => setGrouping(option.value)}
                          className="h-4 w-4 accent-[#46583b]"
                        />
                        {option.label}
                      </span>
                      <Badge>{option.detail}</Badge>
                    </div>
                    <p className="mt-3 rounded-lg bg-white p-2 font-mono text-xs text-[#2f4126]">
                      {option.value === 'western'
                        ? '1,280,000 L · 1,250.00'
                        : '12,80,000 L · 12,50,000'}
                    </p>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f5f3ed] p-4">
                <div>
                  <p className="text-sm font-semibold">Show verbal lakh / crore suffix</p>
                  <p className="text-xs text-[#444840]">Illustrative field label preference</p>
                </div>
                <Switch checked={suffix} onChange={setSuffix} label="Verbal suffix preference" />
              </div>
            </section>

            <section
              aria-labelledby="date-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]">
                  <CalendarDays size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="date-title" className="font-heading text-base font-semibold">
                    Date &amp; time conventions
                  </h2>
                  <p className="text-xs text-[#444840]">ISO and regional display formats</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <label htmlFor="date-format" className="text-xs font-semibold">
                    Date format
                  </label>
                  <select
                    id="date-format"
                    value={dateFormat}
                    onChange={(event) => setDateFormat(event.target.value)}
                    className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  </select>
                  <p className="text-xs text-[#444840]">Example: {exampleDate}</p>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="time-format" className="text-xs font-semibold">
                    Time display
                  </label>
                  <select
                    id="time-format"
                    value={timeFormat}
                    onChange={(event) => setTimeFormat(event.target.value)}
                    className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <option value="12h">12-hour AM/PM</option>
                    <option value="24h">24-hour</option>
                  </select>
                  <p className="text-xs text-[#444840]">Example: {exampleTime}</p>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="week-start" className="text-xs font-semibold">
                    First day of week
                  </label>
                  <select
                    id="week-start"
                    value={weekStart}
                    onChange={(event) => setWeekStart(event.target.value)}
                    className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <option value="monday">Monday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                  <p className="text-xs text-[#444840]">Affects illustration calendars only.</p>
                </div>
              </div>
            </section>

            <section
              aria-labelledby="precision-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <h2 id="precision-title" className="font-heading text-base font-semibold">
                Numeric precision display
              </h2>
              <p className="mt-1 text-xs text-[#444840]">
                Rounding applies to display previews only; stored values are unchanged.
              </p>
              <div className="mt-4 space-y-3">
                {[
                  {
                    id: 'milk',
                    label: 'Milk yield precision',
                    value: milkPrecision,
                    set: setMilkPrecision,
                    choices: ['1', '2'],
                  },
                  {
                    id: 'feed',
                    label: 'Feed &amp; silage precision',
                    value: feedPrecision,
                    set: setFeedPrecision,
                    choices: ['0', '1'],
                  },
                ].map((row) => (
                  <div
                    key={row.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#f5f3ed] p-3"
                  >
                    <span className="text-sm font-medium">{row.label.replace('&amp;', '&')}</span>
                    <span className="flex gap-1">
                      {row.choices.map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          aria-pressed={row.value === choice}
                          onClick={() => row.set(choice)}
                          className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                            row.value === choice
                              ? 'bg-[#46583b] text-white'
                              : 'bg-[#eae8e2] text-[#444840]'
                          }`}
                        >
                          {choice} dec
                        </button>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="appearance-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#f0eee8] p-2 text-[#2f4126]">
                  <Palette size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="appearance-title" className="font-heading text-base font-semibold">
                    Visual appearance
                  </h2>
                  <p className="text-xs text-[#444840]">Local selection preview only</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  { id: 'light' as const, label: 'Light', icon: Sun, swatch: 'bg-[#fbf9f3]' },
                  { id: 'dark' as const, label: 'Dark', icon: Moon, swatch: 'bg-[#1b1c18]' },
                  {
                    id: 'system' as const,
                    label: 'System',
                    icon: Eye,
                    swatch: 'bg-gradient-to-r from-[#fbf9f3] to-[#1b1c18]',
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={theme === option.id}
                    onClick={() => setTheme(option.id)}
                    className={`rounded-xl border p-4 text-left transition-colors motion-reduce:transition-none ${
                      theme === option.id
                        ? 'border-[#46583b] bg-[#d9e8c7]/30'
                        : 'border-[#c4c8bd] bg-[#f5f3ed] hover:bg-[#eae8e2]'
                    }`}
                  >
                    <span
                      className={`mb-3 block h-16 w-full rounded-lg border border-[#c4c8bd] ${option.swatch}`}
                    />
                    <span className="flex items-center justify-between text-sm font-semibold">
                      {option.label}
                      <option.icon size={16} aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f5f3ed] p-4">
                <div>
                  <p className="text-sm font-semibold">High-contrast boost</p>
                  <p className="text-xs text-[#444840]">
                    Illustrative preference; no rendering change is applied.
                  </p>
                </div>
                <Switch
                  checked={contrast}
                  onChange={setContrast}
                  label="High-contrast preference"
                />
              </div>
            </section>
          </div>

          <aside aria-labelledby="preview-panel" className="flex flex-col gap-4 lg:col-span-4">
            <section className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#c4c8bd] pb-3">
                <div className="flex items-center gap-2">
                  <Eye size={18} aria-hidden="true" className="text-[#2f4126]" />
                  <h2 id="preview-panel" className="font-heading text-base font-bold">
                    Formatting preview
                  </h2>
                </div>
                <Badge tone="primary">Illustrative</Badge>
              </div>
              <div className="mt-4 rounded-xl bg-[#f0eee8] p-4">
                <p className="text-xs uppercase tracking-wide text-[#444840]">
                  Example numeric representation
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-[#2f4126]">
                  {representative}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide text-[#444840]">
                  Example timestamp
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-[#2f4126]">
                  {exampleDate} {exampleTime}
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-[#f5f3ed] p-3">
                  <p className="text-xs text-[#444840]">Milk precision</p>
                  <p className="font-semibold">{milkPrecision} dec</p>
                </div>
                <div className="rounded-lg bg-[#f5f3ed] p-3">
                  <p className="text-xs text-[#444840]">Feed precision</p>
                  <p className="font-semibold">{feedPrecision} dec</p>
                </div>
              </div>
              <p className="mt-4 flex items-start gap-2 text-xs text-[#444840]">
                <Check size={14} className="mt-0.5 shrink-0 text-[#46583b]" aria-hidden="true" />
                Static example values only — no live data, synchronization, or device state.
              </p>
            </section>
            <p className="rounded-xl bg-[#f0eee8] p-4 text-xs text-[#444840]">
              Theme and contrast choices are preview-only. Actual theme handling belongs to the
              shared theme provider and is not changed by this screen.
            </p>
          </aside>
        </div>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no preference was saved or applied.'}
        </p>
      </div>
    </div>
  );
}
