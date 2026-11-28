import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Activity,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Droplets,
  Gauge,
  HeartPulse,
  Info,
  LayoutGrid,
  PawPrint,
  Scale,
  Sprout,
  Stethoscope,
  Warehouse,
} from 'lucide-react';

type Tone = 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'error';
const toneClass: Record<Tone, string> = {
  neutral: 'bg-[#f0eee8] text-[#444840]',
  primary: 'bg-[#d9e8c7] text-[#2f4126]',
  secondary: 'bg-[#eae8e2] text-[#1b1c18]',
  tertiary: 'bg-[#ffdcc6] text-[#7a461c]',
  error: 'bg-[#ffdad6] text-[#ba1a1a]',
};
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-inter text-[11px] font-semibold ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm sm:p-5">
      {title ? (
        <h2 className="mb-3 font-heading text-base font-bold text-[#1b1c18]">{title}</h2>
      ) : null}
      {children}
    </section>
  );
}

function Metric({
  label,
  value,
  unit,
  detail,
}: {
  label: string;
  value: string;
  unit?: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="font-inter text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
          {label}
        </span>
        <span className="rounded bg-[#f0eee8] px-1.5 py-0.5 font-inter text-[10px] font-bold uppercase text-[#444840]">
          Illustrative
        </span>
      </div>
      <p className="mt-3 font-heading text-2xl font-bold text-[#2f4126]">
        {value}{' '}
        {unit ? <span className="text-base font-semibold text-[#444840]">{unit}</span> : null}
      </p>
      <p className="mt-1 font-inter text-xs text-[#444840]">{detail}</p>
    </div>
  );
}

const metrics: Array<{ label: string; value: string; unit: string; detail: string }> = [
  {
    label: 'Total Herd Strength',
    value: '1,280',
    unit: 'head',
    detail: 'Capacity use: 91.4% (illustrative)',
  },
  {
    label: 'Active Milking',
    value: '890',
    unit: 'head',
    detail: 'Average yield: 27.7 L/day (illustrative)',
  },
  {
    label: 'Dry / Gestation',
    value: '210',
    unit: 'head',
    detail: 'Pre-calving transition: 34 (illustrative)',
  },
  {
    label: 'Calves & Heifers',
    value: '180',
    unit: 'head',
    detail: 'Nursery pens 1–4 (illustrative)',
  },
];

const production = [
  { label: 'Daily Total Yield', value: '24,650', unit: 'L', detail: 'Sample total; no live feed' },
  { label: 'Morning Shift Total', value: '13,200', unit: 'L', detail: 'Sample shift value' },
  { label: 'Evening Shift Total', value: '11,450', unit: 'L', detail: 'Sample shift value' },
];

const feedingPlans = [
  {
    name: 'Lactating herd ration',
    detail: 'Illustrative allocation notes only; ration formula not approved.',
  },
  {
    name: 'Dry cow forage',
    detail: 'Illustrative allocation notes only; ration formula not approved.',
  },
  {
    name: 'Calf starter',
    detail: 'Illustrative allocation notes only; ration formula not approved.',
  },
];

const stockNotes = [
  { name: 'Silage — primary store', value: '78,000 kg', status: 'Normal (illustrative)' },
  { name: 'Haylage — bunker store', value: '42,000 kg', status: 'Normal (illustrative)' },
  {
    name: 'Concentrate — bin store',
    value: '1,400 kg',
    status: 'Below configured minimum (illustrative)',
  },
];

const activity = [
  { label: 'Intake record signed', detail: 'Illustrative ledger entry', time: '14:12' },
  { label: 'Veterinary record added', detail: 'Illustrative ledger entry', time: '11:30' },
  { label: 'Stock addition entered', detail: 'Illustrative ledger entry', time: '09:40' },
  { label: 'Attendance correction', detail: 'Illustrative ledger entry', time: '08:15' },
];

export function FarmOperationsDashboard() {
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [widgets, setWidgets] = useState({
    herd: true,
    milk: true,
    health: true,
    feeding: true,
    workforce: true,
  });

  return (
    <div className="min-h-screen w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
        <header className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 font-inter text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
            <span>Farm workspace</span>
            <ChevronRight aria-hidden="true" size={14} />
            <span className="text-[#2f4126]">Operations dashboard</span>
            <Badge tone="primary">Illustrative</Badge>
          </div>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#2f4126] sm:text-3xl">
                Farm Operations Dashboard
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-[#444840]">
                Visual prototype of the approved dashboard sections. All figures below are
                illustrative and are not live farm data.
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-[#444840]">
                <CalendarDays aria-hidden="true" size={14} /> Sample date and shift context
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-expanded={widgetsOpen}
                onClick={() => setWidgetsOpen((open) => !open)}
                className={`rounded-lg bg-[#f0eee8] px-3.5 py-2 text-sm font-semibold text-[#1b1c18] transition-colors motion-reduce:transition-none ${focus}`}
              >
                Customize widgets
              </button>
              <p className="self-center text-xs text-[#444840]">
                Report export is unwired in this prototype.
              </p>
            </div>
          </div>
          {widgetsOpen ? (
            <div className="mt-4 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
              <h2 className="font-heading text-sm font-bold text-[#1b1c18]">Widget manager</h2>
              <p className="mt-1 text-xs text-[#444840]">
                Local display preference only; nothing is saved.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    ['herd', 'Herd overview'],
                    ['milk', 'Milk yield'],
                    ['health', 'Animal health'],
                    ['feeding', 'Feeding & stock'],
                    ['workforce', 'Workforce'],
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={widgets[key]}
                      onChange={(event) =>
                        setWidgets((current) => ({ ...current, [key]: event.target.checked }))
                      }
                      className={`h-4 w-4 accent-[#2f4126] ${focus}`}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          ) : null}
        </header>

        {widgets.herd ? (
          <Card title="Operational Metrics">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((item) => (
                <Metric key={item.label} {...item} />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                [
                  'Housing pens',
                  '12 pens occupied',
                  <LayoutGrid key="a" aria-hidden="true" size={16} />,
                ],
                [
                  'Milking shifts',
                  'Morning complete · Evening active',
                  <Droplets key="b" aria-hidden="true" size={16} />,
                ],
                [
                  'Veterinary visits',
                  '2 visits recorded',
                  <Stethoscope key="c" aria-hidden="true" size={16} />,
                ],
              ].map(([label, value, icon]) => (
                <div
                  key={label as string}
                  className="flex items-center gap-3 rounded-lg border border-[#c4c8bd]/50 bg-[#f5f3ed] p-3"
                >
                  <span className="text-[#2f4126]">{icon}</span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#444840]">
                      {label as string}
                    </p>
                    <p className="text-sm font-semibold text-[#1b1c18]">{value as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        {widgets.milk ? (
          <Card title="Milk Production & Shift Yield">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {production.map((item) => (
                <Metric key={item.label} {...item} />
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-[#f5f3ed] p-4">
              <div className="flex flex-wrap gap-4 text-xs text-[#444840]">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-[#2f4126]" /> Morning (illustrative)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-[#d9e8c7]" /> Evening (illustrative)
                </span>
              </div>
              <div
                role="img"
                aria-label="Illustrative bar preview: morning shift larger than evening shift; no live telemetry."
                className="mt-3 flex h-32 items-end gap-2"
              >
                {[42, 58, 66, 74, 70, 62, 48].map((height, index) => (
                  <div key={index} className="flex flex-1 items-end gap-0.5">
                    <div
                      className="w-1/2 rounded-t bg-[#2f4126]"
                      style={{ height: `${height}%` }}
                    />
                    <div
                      className="w-1/2 rounded-t bg-[#d9e8c7]"
                      style={{ height: `${Math.round(height * 0.82)}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-[#444840]">
                Text summary: illustrative shift volumes only. No approved calculation or target is
                applied.
              </p>
            </div>
          </Card>
        ) : null}

        {widgets.health ? (
          <Card title="Animal Health & Active Clinical Alerts">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Metric
                label="Low severity"
                value="11"
                unit="records"
                detail="Routine observations"
              />
              <Metric label="Moderate" value="5" unit="records" detail="Under routine monitoring" />
              <div className="rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  High severity
                </p>
                <Badge tone="error">
                  <Info aria-hidden="true" size={12} /> Restricted
                </Badge>
                <p className="mt-3 text-xs text-[#444840]">
                  High and Critical health details are limited to Farm Admin views and are not shown
                  in this prototype.
                </p>
              </div>
              <div className="rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  Critical severity
                </p>
                <Badge tone="error">Restricted</Badge>
                <p className="mt-3 text-xs text-[#444840]">
                  Critical alert content, isolation directives and animal identities are omitted.
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#444840]">
              Individual clinical cases and medication directives are intentionally not reproduced.
            </p>
          </Card>
        ) : null}

        {widgets.feeding ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card title="Feeding Plans & Shift Allocations">
              <div className="flex flex-col gap-3">
                {feedingPlans.map((plan) => (
                  <div key={plan.name} className="rounded-lg bg-[#f0eee8] p-3">
                    <p className="font-heading text-sm font-bold text-[#1b1c18]">{plan.name}</p>
                    <p className="mt-1 text-xs text-[#444840]">{plan.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Feed Stock & Critical Reminders">
              <div className="flex flex-col gap-3">
                {stockNotes.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[#f0eee8] p-3"
                  >
                    <div>
                      <p className="font-heading text-sm font-bold text-[#1b1c18]">{item.name}</p>
                      <p className="text-xs text-[#444840]">{item.status}</p>
                    </div>
                    <span className="font-heading text-sm font-bold text-[#2f4126]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : null}

        {widgets.workforce ? (
          <Card title="Workers & Shift Attendance Summary">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <Metric label="Total roster" value="38" unit="staff" detail="All active units" />
              <Metric label="Checked in" value="22" unit="staff" detail="Present on shift" />
              <Metric label="Approved leave" value="2" unit="staff" detail="Illustrative count" />
              <Metric label="Late arrivals" value="1" unit="staff" detail="Illustrative count" />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {['Milking crew', 'Feeding and herd care'].map((team) => (
                <div key={team} className="rounded-lg bg-[#f0eee8] p-3">
                  <p className="font-heading text-sm font-bold text-[#1b1c18]">{team}</p>
                  <p className="mt-1 text-xs text-[#444840]">
                    Illustrative deployment summary. Worker names and payroll data are not shown.
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        <Card title="Financial Summary">
          <p className="text-sm text-[#444840]">
            Financial figures, currency samples and unpaid balances are omitted from this visual
            prototype. Detailed financial records remain in the Farm Admin-only financial surfaces.
          </p>
        </Card>

        <Card title="Recent Farm Activities & Event Log">
          <ol className="relative flex flex-col gap-3 border-l border-[#c4c8bd] pl-5">
            {activity.map((item) => (
              <li key={item.label} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#46583b]"
                />
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#f5f3ed] p-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList aria-hidden="true" size={16} className="text-[#2f4126]" />
                    <div>
                      <p className="font-heading text-sm font-bold text-[#1b1c18]">{item.label}</p>
                      <p className="text-xs text-[#444840]">{item.detail}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#444840]">{item.time}</span>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#556249]">
                  Nutritional Management
                </p>
                <h3 className="font-heading text-base font-bold text-[#2f4126]">
                  Feeding Plans &amp; Shift Allocations
                </h3>
              </div>
              <span className="rounded-lg bg-[#f5f3ed] p-2 text-[#556249]">
                <Sprout size={20} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                'High Lactation Ration',
                'Dry Cow Forage Maintenance',
                'Calf Starter & Replacer',
              ].map((plan) => (
                <div key={plan} className="rounded-xl bg-[#f5f3ed]/70 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-inter text-sm font-bold text-[#1b1c18]">{plan}</p>
                    <span className="font-inter text-xs font-semibold text-[#2f4126]">
                      Illustrative allocation
                    </span>
                  </div>
                  <p className="mt-1 font-inter text-xs text-[#444840]">
                    Ration details are not calculated in this preview.
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-[#c4c8bd]/40 pt-3 font-inter text-[11px] text-[#444840]">
              No feeding formula or stock deduction is applied.
            </p>
          </section>

          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#556249]">
                  Inventory Reserves
                </p>
                <h3 className="font-heading text-base font-bold text-[#2f4126]">
                  Feed Stock &amp; Critical Reminders
                </h3>
              </div>
              <span className="rounded-lg bg-[#f5f3ed] p-2 text-[#2f4126]">
                <Warehouse size={20} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {['Corn Silage', 'Alfalfa Haylage'].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg bg-[#f5f3ed]/70 p-3"
                >
                  <div className="flex items-center gap-2">
                    <Warehouse size={16} aria-hidden="true" className="text-[#2f4126]" />
                    <p className="font-inter text-sm font-bold text-[#1b1c18]">{item}</p>
                  </div>
                  <span className="font-inter text-xs font-semibold text-[#2f4126]">
                    Illustrative reserve
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-[#c4c8bd]/40 pt-3 font-inter text-[11px] text-[#444840]">
              No stock correction or expiry calculation is performed in this preview.
            </p>
          </section>
        </div>

        <footer className="flex flex-wrap gap-4 font-inter text-[11px] text-[#444840]">
          <span className="flex items-center gap-1">
            <Activity aria-hidden="true" size={12} /> Illustrative prototype only
          </span>
          <span className="flex items-center gap-1">
            <Gauge aria-hidden="true" size={12} /> No live telemetry
          </span>
          <span className="flex items-center gap-1">
            <PawPrint aria-hidden="true" size={12} /> No animal identities
          </span>
          <span className="flex items-center gap-1">
            <Scale aria-hidden="true" size={12} /> No production formulas
          </span>
          <span className="flex items-center gap-1">
            <HeartPulse aria-hidden="true" size={12} /> Alert details restricted
          </span>
          <span className="flex items-center gap-1">
            <Sprout aria-hidden="true" size={12} /> No feeding formulas
          </span>
          <span className="flex items-center gap-1">
            <Warehouse aria-hidden="true" size={12} /> No stock corrections
          </span>
        </footer>
      </div>
    </div>
  );
}
