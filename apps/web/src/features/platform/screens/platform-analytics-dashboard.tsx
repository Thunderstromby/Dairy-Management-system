import {
  ArrowRight,
  Building2,
  ChevronRight,
  FolderPlus,
  Info,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';

const SURFACE = 'bg-[#fff] rounded-xl shadow-sm';
const LABEL = 'font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]';
const VALUE = 'font-heading text-3xl font-bold tabular-nums text-[#191d18]';

const METRICS = [
  {
    label: 'Total Customers',
    value: '48',
    note: 'Illustrative enterprise organization count',
    icon: Users,
    tint: 'bg-[#d9e8c7] text-[#5b694e]',
  },
  {
    label: 'Total Workspaces',
    value: '136',
    note: 'Illustrative allocated dairy units',
    icon: Building2,
    tint: 'bg-[#46583b] text-white',
  },
  {
    label: 'Active Workspaces',
    value: '124',
    note: 'Illustrative operational status count',
    icon: TrendingUp,
    tint: 'bg-[#d9e8c7] text-[#5b694e]',
  },
  {
    label: 'Farm Admin Accounts',
    value: '89',
    note: 'Illustrative administrator count',
    icon: ShieldCheck,
    tint: 'bg-[#7a461c] text-white',
  },
] as const;

const REGISTRATIONS = [
  { quarter: 'Q1', value: '10', height: 54, fill: '#bdcbac' },
  { quarter: 'Q2', value: '14', height: 75, fill: '#556249' },
  { quarter: 'Q3', value: '12', height: 65, fill: '#556249' },
  { quarter: 'Q4', value: '12', height: 65, fill: '#46583b' },
] as const;

const STATUS = [
  { label: 'Active', value: '124', share: '91.2%', color: 'bg-[#46583b]' },
  { label: 'Under Setup', value: '8', share: '5.9%', color: 'bg-[#7a461c]' },
  { label: 'Inactive', value: '4', share: '2.9%', color: 'bg-[#bdcbac]' },
] as const;

const FACILITIES = [
  {
    label: 'Milking Parlor Units',
    value: '54',
    share: '39.7%',
    width: '39.7%',
    color: 'bg-[#46583b]',
  },
  {
    label: 'Automated Robotic Milking',
    value: '46',
    share: '33.8%',
    width: '33.8%',
    color: 'bg-[#556249]',
  },
  {
    label: 'Pasture & Grazing Facilities',
    value: '24',
    share: '17.6%',
    width: '17.6%',
    color: 'bg-[#bdcbac]',
  },
  {
    label: 'Calf & Heifer Units',
    value: '12',
    share: '8.9%',
    width: '8.9%',
    color: 'bg-[#7a461c]',
  },
] as const;

function CardHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-1">
      <span className={LABEL}>{eyebrow}</span>
      <h2 className="font-heading text-base font-semibold text-[#191d18]">{title}</h2>
    </div>
  );
}

export function PlatformAnalyticsDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={LABEL}>Super Admin Overview</span>
            <span className="text-[#75786f]">•</span>
            <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
              Illustrative data
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
            Dashboard
          </h1>
          <p className="max-w-3xl font-inter text-sm text-[#444840]">
            Illustrative overview of registered customers, dairy workspaces, and farm administrator
            accounts. No figures shown here are live records.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-[#fff] px-3 py-2 font-inter text-xs font-medium text-[#191d18] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <FolderPlus size={16} aria-hidden="true" className="text-[#556249]" /> Create Workspace
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#7a461c] px-3 py-2 font-inter text-xs font-semibold text-white transition-colors duration-200 motion-reduce:transition-none hover:bg-[#5e3007] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a461c]/40"
          >
            <ShieldCheck size={16} aria-hidden="true" /> Provision Farm Admin
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-3 py-2 font-inter text-xs font-semibold text-white transition-colors duration-200 motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
          >
            <UserPlus size={16} aria-hidden="true" /> Register Customer
          </button>
        </div>
      </header>

      <section
        aria-label="Illustrative platform totals"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className={`${SURFACE} flex flex-col gap-4 p-4`}>
              <div className="flex items-center justify-between gap-2">
                <span className={LABEL}>{metric.label}</span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${metric.tint}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
              </div>
              <div className="space-y-1">
                <p className={VALUE}>{metric.value}</p>
                <p className="font-inter text-xs text-[#444840]">{metric.note}</p>
              </div>
            </article>
          );
        })}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <figure className={`${SURFACE} flex flex-col gap-4 p-5 lg:col-span-7`}>
          <CardHeading eyebrow="Tier Segmentation" title="Customer Registrations by Quarter" />
          <div className="flex h-56 items-end">
            <svg viewBox="0 0 540 180" className="h-full w-full" fill="none" aria-hidden="true">
              <line x1="0" x2="540" y1="160" y2="160" stroke="#e0e4dc" strokeWidth="1" />
              <line x1="0" x2="540" y1="105" y2="105" stroke="#ecefe7" strokeDasharray="3 3" />
              <line x1="0" x2="540" y1="50" y2="50" stroke="#ecefe7" strokeDasharray="3 3" />
              {REGISTRATIONS.map((item, index) => {
                const x = 45 + index * 130;
                return (
                  <g key={item.quarter}>
                    <rect
                      x={x}
                      y={160 - item.height}
                      width="55"
                      height={item.height}
                      rx="3"
                      fill={item.fill}
                    />
                    <text
                      x={x + 27}
                      y={154 - item.height}
                      textAnchor="middle"
                      fill="#191d18"
                      fontSize="13"
                      fontWeight="600"
                    >
                      {item.value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {REGISTRATIONS.map((item) => (
              <div key={item.quarter} className="flex flex-col">
                <span className="font-heading text-sm font-semibold text-[#191d18]">
                  {item.quarter}
                </span>
                <span className="font-inter text-[11px] text-[#75786f]">
                  {item.value} Customers
                </span>
              </div>
            ))}
          </div>
          <figcaption className="flex items-center gap-2 rounded-lg bg-[#f2f5ed] px-3 py-2 font-inter text-xs text-[#444840]">
            <Info size={14} aria-hidden="true" className="text-[#46583b]" />
            Illustrative quarterly registration counts — not live data.
          </figcaption>
        </figure>

        <figure className={`${SURFACE} flex flex-col gap-4 p-5 lg:col-span-5`}>
          <div className="flex items-start justify-between gap-2">
            <CardHeading eyebrow="Status Breakdown" title="Workspace Operational Status" />
            <span className="rounded bg-[#f2f5ed] px-2 py-1 font-inter text-[11px] text-[#556249]">
              Illustrative
            </span>
          </div>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <div className="relative h-44 w-44 shrink-0">
              <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90" aria-hidden="true">
                <circle cx="80" cy="80" r="62" fill="none" stroke="#f2f5ed" strokeWidth="20" />
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="#46583b"
                  strokeWidth="20"
                  strokeDasharray="355.2"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="#7a461c"
                  strokeWidth="20"
                  strokeDasharray="21 355.2"
                  strokeDashoffset="-324"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="#bdcbac"
                  strokeWidth="20"
                  strokeDasharray="10.5 355.2"
                  strokeDashoffset="-345"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-3xl font-bold tabular-nums text-[#191d18]">
                  136
                </span>
                <span className={LABEL}>Illustrative units</span>
              </div>
            </div>
            <div className="w-full max-w-[200px] space-y-2">
              {STATUS.map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded p-1.5">
                  <span className="flex items-center gap-2 font-inter text-xs text-[#191d18]">
                    <span className={`h-3 w-3 rounded-full ${row.color}`} aria-hidden="true" />
                    {row.label}
                  </span>
                  <span className="text-right">
                    <span className="block font-inter text-sm font-semibold tabular-nums text-[#191d18]">
                      {row.value}
                    </span>
                    <span className="block font-inter text-[11px] text-[#75786f]">{row.share}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <figcaption className="text-center font-inter text-[11px] text-[#75786f]">
            Illustrative distribution of operational workspaces.
          </figcaption>
        </figure>

        <figure className={`${SURFACE} flex flex-col gap-4 p-5 lg:col-span-7`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardHeading eyebrow="Tenant Scalability" title="Workspace and Customer Growth" />
            <div className="flex gap-4">
              <span className="flex items-center gap-2 font-inter text-[11px] text-[#191d18]">
                <span className="inline-block h-0.5 w-3 bg-[#46583b]" /> Workspaces
              </span>
              <span className="flex items-center gap-2 font-inter text-[11px] text-[#191d18]">
                <span className="inline-block h-0.5 w-3 bg-[#7a461c]" /> Customers
              </span>
            </div>
          </div>
          <div className="h-56 w-full">
            <svg viewBox="0 0 600 200" className="h-full w-full" fill="none" aria-hidden="true">
              <line x1="0" x2="600" y1="180" y2="180" stroke="#e0e4dc" />
              <line x1="0" x2="600" y1="120" y2="120" stroke="#f2f5ed" strokeDasharray="2 4" />
              <line x1="0" x2="600" y1="60" y2="60" stroke="#f2f5ed" strokeDasharray="2 4" />
              <path
                d="M50 148 L210 115 L390 70 L550 32 L550 180 L50 180 Z"
                fill="#d9e8c7"
                fillOpacity="0.35"
              />
              <path
                d="M50 165 L210 152 L390 136 L550 112 L550 180 L50 180 Z"
                fill="#ffdcc6"
                fillOpacity="0.25"
              />
              <path
                d="M50 148 L210 115 L390 70 L550 32"
                stroke="#46583b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M50 165 L210 152 L390 136 L550 112"
                stroke="#7a461c"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {[148, 115, 70, 32].map((y, index) => (
                <circle
                  key={`ws-${y}`}
                  cx={50 + index * 160 - (index === 3 ? 10 : 0)}
                  cy={y}
                  r="4"
                  fill="#fff"
                  stroke="#46583b"
                  strokeWidth="2"
                />
              ))}
              {[165, 152, 136, 112].map((y, index) => (
                <circle
                  key={`c-${y}`}
                  cx={50 + index * 160 - (index === 3 ? 10 : 0)}
                  cy={y}
                  r="3.5"
                  fill="#fff"
                  stroke="#7a461c"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-4 gap-2 border-t border-[#ecefe7] pt-2 text-center">
            {['Q1 · 58 WS / 24 C', 'Q2 · 82 / 32', 'Q3 · 108 / 40', 'Q4 · 136 / 48'].map((item) => (
              <span key={item} className="font-inter text-[11px] text-[#75786f]">
                {item}
              </span>
            ))}
          </div>
          <figcaption className="font-inter text-[11px] text-[#75786f]">
            Illustrative quarterly workspace (WS) and customer (C) counts; no formula or forecast is
            implied.
          </figcaption>
        </figure>

        <figure className={`${SURFACE} flex flex-col gap-4 p-5 lg:col-span-5`}>
          <CardHeading eyebrow="Typology Breakdown" title="Workspace Dairy Facility Types" />
          <div className="space-y-3">
            {FACILITIES.map((row) => (
              <div key={row.label} className="space-y-1">
                <div className="flex items-center justify-between font-inter text-xs">
                  <span className="text-[#191d18]">{row.label}</span>
                  <span className="font-semibold tabular-nums text-[#191d18]">
                    {row.value} <span className="font-normal text-[#75786f]">({row.share})</span>
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#f2f5ed]">
                  <div
                    className={`h-full rounded-full ${row.color}`}
                    style={{ width: row.width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <figcaption className="rounded-lg bg-[#f2f5ed] px-3 py-2 font-inter text-[11px] text-[#444840]">
            Illustrative total: 136 facility units.
          </figcaption>
        </figure>
      </div>

      <section
        className={`${SURFACE} flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ecefe7] text-[#46583b]">
            <Info size={20} aria-hidden="true" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={LABEL}>Recent Provisioning Log</span>
              <span className="font-inter text-[11px] text-[#556249]">Illustrative timeline</span>
            </div>
            <p className="font-inter text-sm text-[#191d18]">
              Quarterly historical registration counts • Illustrative data
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-inter text-xs font-medium text-[#46583b] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#f2f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            Inspect Workspaces <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-inter text-xs font-medium text-[#556249] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#f2f5ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            Manage Customers <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
