import {
  Archive,
  BellRing,
  Check,
  CheckCheck,
  ChevronRight,
  HeartPulse,
  Info,
  Mail,
  PackageMinus,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  TriangleAlert,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

type Category = 'all' | 'critical' | 'health' | 'milk' | 'inventory';

type Notice = {
  id: string;
  category: Exclude<Category, 'all'>;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  context: string;
  source: string;
  stamp: string;
};

const notices: readonly Notice[] = [
  {
    id: 'N-001',
    category: 'critical',
    severity: 'critical',
    title: 'High health alert — animal #ET-042-884 (illustrative)',
    message:
      'An illustrative clinical mastitis event with elevated temperature. Farm Admin-only triage; no health prediction is performed.',
    context: 'Animal record #ET-042-884 · health event #HR-042-098 (illustrative references)',
    source: 'Animal health record',
    stamp: 'Example stamp 06:14',
  },
  {
    id: 'N-002',
    category: 'critical',
    severity: 'critical',
    title: 'High health alert — animal #ET-042-912 (illustrative)',
    message:
      'An illustrative isolation event. High and Critical health notifications are visible to Farm Admin only.',
    context: 'Diagnostic record #LAB-042-118 (illustrative reference)',
    source: 'Diagnostic record',
    stamp: 'Example stamp 05:40',
  },
  {
    id: 'N-003',
    category: 'milk',
    severity: 'warning',
    title: 'Production variance notice (illustrative)',
    message:
      'An illustrative yield variance above a configured threshold. The comparison formula remains approval-gated; no value is treated as a saved financial or production truth.',
    context: 'Milk session #MP-042-1022 (illustrative reference)',
    source: 'Milk production session',
    stamp: 'Example stamp 04:55',
  },
  {
    id: 'N-004',
    category: 'health',
    severity: 'info',
    title: 'Vaccination due reminder (illustrative)',
    message:
      'An illustrative scheduled vaccination reminder. Lead times and repetition rules are not confirmed.',
    context: 'Vaccination schedule #VAC-042-080 (illustrative reference)',
    source: 'Vaccination schedule',
    stamp: 'Example stamp 17:30',
  },
  {
    id: 'N-005',
    category: 'inventory',
    severity: 'warning',
    title: 'Inventory low-stock notice (illustrative)',
    message:
      'An illustrative item at or below its configured minimum level. Stock calculations are not performed in this preview.',
    context: 'Item stock #INV-FEED-089 (illustrative reference)',
    source: 'Inventory item',
    stamp: 'Example stamp 14:15',
  },
  {
    id: 'N-006',
    category: 'inventory',
    severity: 'info',
    title: 'Inventory expiry reminder (illustrative)',
    message:
      'An illustrative batch approaching its recorded expiry date. No retention or disposal action is implied.',
    context: 'Batch #LOT-042-982 (illustrative reference)',
    source: 'Inventory batch',
    stamp: 'Example stamp 11:20',
  },
];

const categoryLabels: Record<Category, string> = {
  all: 'All notifications',
  critical: 'High / Critical (Admin)',
  health: 'Animal health & vaccination',
  milk: 'Milk production',
  inventory: 'Inventory & expiry',
};

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    neutral: 'bg-[#eae8e2] text-[#444840]',
    primary: 'bg-[#d9e8c7] text-[#2f4126]',
    danger: 'bg-[#7a461c] text-white',
    warn: 'bg-[#eae8e2] text-[#7a461c]',
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
        className={`absolute top-0.5 rounded-full bg-white transition-transform motion-reduce:transition-none ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
        style={{ height: 18, width: 18 }}
      />
    </button>
  );
}

export function NotificationCenterScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [readIds, setReadIds] = useState<readonly string[]>([]);
  const [selectedId, setSelectedId] = useState('N-001');

  const visible = notices.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesRead = !unreadOnly || !readIds.includes(item.id);
    const matchesQuery =
      query.trim().length === 0 ||
      `${item.title} ${item.message} ${item.context}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesRead && matchesQuery;
  });

  const selected = notices.find((item) => item.id === selectedId) ?? notices[0];

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[#556249]">
            <span>Operations &amp; Assets</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span>System &amp; Alerts</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-[#2f4126]">Notification Center</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              Farm Notification Center &amp; Active Alert Hub
            </h1>
            <Badge tone="primary">Illustrative</Badge>
          </div>
          <p className="max-w-4xl text-sm text-[#444840]">
            Operational alert triage and notification review layout. All entries below are
            illustrative sample records; no live status, delivery receipt, or telemetry is shown.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setReadIds(notices.map((item) => item.id))}
              className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-3 py-2 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#f0eee8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <CheckCheck size={16} aria-hidden="true" /> Mark all as read (local)
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-3 py-2 text-sm font-medium text-[#444840] opacity-60"
            >
              <SlidersHorizontal size={16} aria-hidden="true" /> Configure preferences — unwired
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-3 py-2 text-sm font-semibold text-white opacity-60"
            >
              <Archive size={16} aria-hidden="true" /> History archive — unwired
            </button>
          </div>
        </header>

        <section
          aria-labelledby="guard-title"
          className="relative overflow-hidden rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
        >
          <span className="absolute inset-y-0 left-0 w-1.5 bg-[#7a461c]" aria-hidden="true" />
          <div className="flex flex-col gap-3 pl-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-[#eae8e2] p-2.5 text-[#7a461c]">
                <ShieldAlert size={20} aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    id="guard-title"
                    className="font-heading text-sm font-bold uppercase tracking-wide text-[#7a461c]"
                  >
                    Farm Admin governance boundary
                  </h2>
                  <Badge tone="danger">High / Critical health restriction</Badge>
                </div>
                <p className="mt-1 text-sm text-[#444840]">
                  High and Critical animal health notifications are restricted to authorized Farm
                  Admin recipients and are excluded from Supervisor views, APIs, and exports. This
                  is a layout review only; server enforcement is required in the real system.
                </p>
              </div>
            </div>
            <Badge>Role guard: server-enforced (not in this preview)</Badge>
          </div>
        </section>

        <section aria-label="Notification summary" className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-base font-semibold">Notification summary</h2>
            <Badge>Illustrative values</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: 'Unread alerts',
                value: '5',
                hint: 'of 18 illustrative inbox items',
                icon: BellRing,
              },
              {
                label: 'High / Critical (Admin only)',
                value: '2',
                hint: 'illustrative triage items',
                icon: TriangleAlert,
              },
              {
                label: 'Production variance notices',
                value: '1',
                hint: 'formula approval pending',
                icon: HeartPulse,
              },
              {
                label: 'Inventory & expiry notices',
                value: '2',
                hint: 'illustrative stock items',
                icon: PackageMinus,
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#444840]">
                    {card.label}
                  </span>
                  <card.icon size={18} aria-hidden="true" className="text-[#46583b]" />
                </div>
                <div className="font-heading mt-2 text-2xl font-bold">{card.value}</div>
                <p className="mt-1 text-xs text-[#444840]">{card.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <section
              aria-labelledby="filters-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
            >
              <h2 id="filters-title" className="font-heading mb-3 text-base font-semibold">
                Search and filters
              </h2>
              <label className="relative block">
                <Search
                  size={16}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444840]"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search illustrative alerts by keyword or reference"
                  className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] pl-9 pr-3 text-sm text-[#1b1c18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                />
              </label>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {(Object.keys(categoryLabels) as Category[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    aria-pressed={category === key}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
                      category === key
                        ? 'bg-[#46583b] text-white'
                        : 'bg-[#f0eee8] text-[#1b1c18] hover:bg-[#eae8e2]'
                    }`}
                  >
                    {categoryLabels[key]}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#c4c8bd] pt-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#444840]">
                  <span>Configured channels:</span>
                  <Badge tone="primary">
                    <BellRing size={12} className="mr-1" aria-hidden="true" /> In-app
                  </Badge>
                  <Badge>
                    <Mail size={12} className="mr-1" aria-hidden="true" /> Email where approved
                  </Badge>
                </div>
                <label className="flex items-center gap-2 text-xs text-[#444840]">
                  Read state
                  <select
                    value={unreadOnly ? 'unread' : 'all'}
                    onChange={(event) => setUnreadOnly(event.target.value === 'unread')}
                    className="h-8 rounded border border-[#c4c8bd] bg-white px-2 text-xs text-[#1b1c18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  >
                    <option value="all">All states</option>
                    <option value="unread">Unread (local)</option>
                  </select>
                </label>
              </div>
            </section>

            <section aria-label="Illustrative notification feed" className="flex flex-col gap-3">
              {visible.length === 0 ? (
                <div className="rounded-xl border border-[#c4c8bd] bg-white p-8 text-center">
                  <h3 className="font-heading text-base font-semibold">
                    No matching notifications
                  </h3>
                  <p className="mt-1 text-sm text-[#444840]">
                    No illustrative row matches this local filter.
                  </p>
                </div>
              ) : (
                visible.map((item) => {
                  const isRead = readIds.includes(item.id);
                  const accent =
                    item.severity === 'critical'
                      ? 'bg-[#7a461c]'
                      : item.severity === 'warning'
                        ? 'bg-[#c4c8bd]'
                        : 'bg-[#556249]';
                  return (
                    <article
                      key={item.id}
                      className={`relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm ${
                        selectedId === item.id ? 'border-[#46583b]' : 'border-[#c4c8bd]'
                      }`}
                    >
                      <span
                        className={`absolute inset-y-0 left-0 w-1.5 ${accent}`}
                        aria-hidden="true"
                      />
                      <div className="flex items-start gap-3 pl-1">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.category === 'critical' ? (
                              <Badge tone="danger">Farm Admin only</Badge>
                            ) : (
                              <Badge tone="primary">{categoryLabels[item.category]}</Badge>
                            )}
                            <Badge>{isRead ? 'Read (local)' : 'Unread (local)'}</Badge>
                            <span className="text-xs text-[#444840]">{item.stamp}</span>
                          </div>
                          <h2 className="font-heading mt-2 text-base font-bold leading-snug">
                            {item.title}
                          </h2>
                          <p className="mt-1 text-sm text-[#444840]">{item.message}</p>
                          <p className="mt-2 text-xs text-[#556249]">{item.context}</p>
                          <div className="mt-3 flex flex-wrap gap-2 border-t border-[#c4c8bd] pt-3">
                            <button
                              type="button"
                              onClick={() =>
                                setReadIds((current) =>
                                  isRead
                                    ? current.filter((id) => id !== item.id)
                                    : [...current, item.id],
                                )
                              }
                              className="rounded-lg bg-[#f0eee8] px-2.5 py-1 text-xs font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                            >
                              {isRead ? 'Mark unread' : 'Mark read'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedId(item.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#46583b] px-2.5 py-1 text-xs font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                            >
                              Inspect in panel <ChevronRight size={12} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </section>
          </div>

          <aside
            aria-labelledby="dossier-title"
            className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm lg:col-span-5"
          >
            <div className="flex items-center justify-between border-b border-[#c4c8bd] pb-3">
              <div className="flex items-center gap-2">
                <Info size={18} aria-hidden="true" className="text-[#46583b]" />
                <div>
                  <h2
                    id="dossier-title"
                    className="font-heading text-sm font-bold uppercase tracking-wide"
                  >
                    Notification inspection panel
                  </h2>
                  <p className="font-mono text-xs text-[#444840]">Reference: {selected.id}</p>
                </div>
              </div>
              <Badge tone={selected.category === 'critical' ? 'danger' : 'primary'}>
                {selected.category === 'critical' ? 'Admin only' : 'Operational'}
              </Badge>
            </div>
            <h3 className="font-heading mt-4 text-base font-bold leading-snug">{selected.title}</h3>
            <p className="mt-2 text-sm text-[#444840]">{selected.message}</p>
            <div className="mt-4 rounded-lg bg-[#f0eee8] p-3">
              <h4 className="font-heading text-xs font-bold uppercase tracking-wide text-[#556249]">
                Source context
              </h4>
              <p className="mt-1 text-sm text-[#1b1c18]">{selected.context}</p>
              <p className="mt-1 text-xs text-[#444840]">
                Related record type: {selected.source}. References are illustrative only.
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="font-heading text-xs font-bold uppercase tracking-wide text-[#556249]">
                Configured channels
              </h4>
              <div className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-2 text-sm">
                <span className="flex items-center gap-2">
                  <BellRing size={16} aria-hidden="true" /> In-app notification
                </span>
                <span className="text-xs text-[#556249]">Preference only</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-2 text-sm">
                <span className="flex items-center gap-2">
                  <Mail size={16} aria-hidden="true" /> Email where supported
                </span>
                <span className="text-xs text-[#556249]">Unwired in preview</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-[#c4c8bd] pt-3">
              <Toggle
                checked={readIds.includes(selected.id)}
                onChange={(next) =>
                  setReadIds((current) =>
                    next ? [...current, selected.id] : current.filter((id) => id !== selected.id),
                  )
                }
                label="Mark selected notification as read in this preview"
              />
              <span className="text-xs text-[#444840]">Read state (local preview only)</span>
              <Check size={14} aria-hidden="true" className="ml-auto text-[#46583b]" />
            </div>
          </aside>
        </div>

        <footer className="rounded-xl border border-[#c4c8bd] bg-white p-4 text-xs text-[#444840]">
          <p>
            <strong className="font-semibold text-[#1b1c18]">Illustrative sample data.</strong> This
            layout excludes fake live status, sync indicators, quotas, telemetry, delivery receipts,
            and unapproved health predictions. Notification visibility and severity are enforced by
            server policy in the real application, not by this screen.
          </p>
        </footer>
      </div>
    </div>
  );
}
