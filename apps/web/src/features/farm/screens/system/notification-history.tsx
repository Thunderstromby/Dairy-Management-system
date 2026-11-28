import {
  Activity,
  ArrowLeft,
  CheckCheck,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

type Row = {
  id: string;
  date: string;
  category: string;
  target: string;
  summary: string;
  channel: string;
  read: 'Read' | 'Unread';
};

const rows: readonly Row[] = [
  {
    id: 'NTF-001',
    date: 'Example 24 Oct · 06:14',
    category: 'High / Critical [Admin]',
    target: 'Animal #ET-042-884',
    summary: 'Illustrative critical health alert.',
    channel: 'In-app / Email (where approved)',
    read: 'Read',
  },
  {
    id: 'NTF-002',
    date: 'Example 23 Oct · 16:30',
    category: 'Production variance',
    target: 'Animal #ET-042-701',
    summary: 'Illustrative yield variance; calculation rule pending approval.',
    channel: 'In-app',
    read: 'Read',
  },
  {
    id: 'NTF-003',
    date: 'Example 23 Oct · 09:15',
    category: 'Low stock',
    target: 'Item #INV-FEED-019',
    summary: 'Illustrative item below configured minimum.',
    channel: 'In-app',
    read: 'Read',
  },
  {
    id: 'NTF-004',
    date: 'Example 21 Oct · 11:30',
    category: 'Vaccination due',
    target: 'Group: replacement heifers',
    summary: 'Illustrative scheduled vaccination reminder.',
    channel: 'In-app / Email (where approved)',
    read: 'Read',
  },
  {
    id: 'NTF-005',
    date: 'Example 20 Oct · 08:45',
    category: 'Expiry reminder',
    target: 'Batch #INV-MED-042',
    summary: 'Illustrative batch approaching recorded expiry.',
    channel: 'In-app / Email (where approved)',
    read: 'Read',
  },
  {
    id: 'NTF-006',
    date: 'Example 19 Oct · 14:20',
    category: 'Animal health',
    target: 'Animal #ET-042-912',
    summary: 'Illustrative health observation requiring admin review.',
    channel: 'In-app / Email (where approved)',
    read: 'Unread',
  },
];

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

export function NotificationHistoryScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [selected, setSelected] = useState<Row>(rows[0]);

  const visible = rows.filter((row) => {
    const matchesCategory = category === 'all' || row.category === category;
    const matchesRead = readFilter === 'all' || row.read === readFilter;
    const matchesQuery =
      query.trim().length === 0 ||
      `${row.id} ${row.target} ${row.summary} ${row.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
    return matchesCategory && matchesRead && matchesQuery;
  });

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#556249]">
              <Badge tone="primary">Illustrative archive</Badge>
              <span aria-hidden="true">•</span>
              <span>Workspace: Greenfield Dairy Estate (GF-042) — example workspace</span>
              <span aria-hidden="true">•</span>
              <span>Admin ledger preview</span>
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
              Farm Notification History &amp; Delivery Archive
            </h1>
            <p className="max-w-3xl text-sm text-[#444840]">
              Historical repository layout for dispatched system alerts and operational notices.
              Records below are illustrative examples, not real delivery receipts.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-3 py-2 text-sm font-medium text-[#444840] opacity-60"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Notification center — unwired
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-3 py-2 text-sm font-medium text-[#444840] opacity-60"
            >
              <Download size={16} aria-hidden="true" /> Export log — unwired
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-3 py-2 text-sm font-semibold text-white opacity-60"
            >
              <FileText size={16} aria-hidden="true" /> Download report — unwired
            </button>
          </div>
        </header>

        <section
          aria-label="Policy notice"
          className="rounded-xl border-l-4 border-[#46583b] bg-[#f0eee8] p-4 shadow-sm"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} aria-hidden="true" className="mt-0.5 text-[#2f4126]" />
              <div>
                <h2 className="font-heading text-sm font-bold">Production variance notice</h2>
                <p className="mt-1 text-sm text-[#444840]">
                  The comparison threshold and missing-session reconciliation remain subject to
                  approval. No generated figure in this preview is treated as an approved
                  calculation or stored truth.
                </p>
              </div>
            </div>
            <Badge>Preview only — no retention claim</Badge>
          </div>
        </section>

        <section aria-label="Illustrative summary" className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-base font-semibold">Archive summary</h2>
            <Badge>Illustrative values</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Archived alerts', value: '6', hint: 'illustrative rows in this preview' },
              { label: 'High / Critical (Admin)', value: '1', hint: 'restricted example' },
              { label: 'Operational notices', value: '5', hint: 'illustrative examples' },
              { label: 'Read state', value: '5 / 6', hint: 'local example values' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#444840]">
                  {item.label}
                </p>
                <p className="font-heading mt-2 text-2xl font-bold">{item.value}</p>
                <p className="mt-1 text-xs text-[#444840]">{item.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="archive-filters"
          className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
        >
          <h2 id="archive-filters" className="font-heading mb-3 text-base font-semibold">
            Search and filters
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <label className="relative md:col-span-5">
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444840]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search illustrative archive records"
                className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              />
            </label>
            <label className="md:col-span-3">
              <span className="sr-only">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <option value="all">All categories</option>
                <option value="High / Critical [Admin]">High / Critical [Admin]</option>
                <option value="Production variance">Production variance</option>
                <option value="Low stock">Low stock</option>
                <option value="Vaccination due">Vaccination due</option>
                <option value="Expiry reminder">Expiry reminder</option>
                <option value="Animal health">Animal health</option>
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="sr-only">Read status</span>
              <select
                value={readFilter}
                onChange={(event) => setReadFilter(event.target.value)}
                className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <option value="all">All read states</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
              </select>
            </label>
            <div className="flex items-center text-xs text-[#444840] md:col-span-2">
              Showing {visible.length} illustrative records
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <section
            aria-label="Notification history ledger"
            className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm xl:col-span-8"
          >
            <div className="flex items-center justify-between border-b border-[#c4c8bd] bg-[#f5f3ed] px-4 py-3">
              <h2 className="font-heading text-base font-bold">Notification history ledger</h2>
              <Badge>Archive log (illustrative)</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="bg-[#f0eee8] text-xs uppercase tracking-wide text-[#444840]">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Date &amp; time
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Entity / target
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Channels
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Read state
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eae8e2]">
                  {visible.map((row) => (
                    <tr
                      key={row.id}
                      className="transition-colors motion-reduce:transition-none hover:bg-[#f5f3ed]"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-[#444840]">
                        {row.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <Badge tone={row.category.startsWith('High') ? 'danger' : 'primary'}>
                          {row.category}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-mono text-xs">
                        {row.target}
                      </td>
                      <td className="px-3 py-3">
                        <span className="font-medium">{row.summary}</span>
                        <span className="block text-xs text-[#444840]">Ref: {row.id}</span>
                      </td>
                      <td className="px-3 py-3 text-xs text-[#444840]">{row.channel}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-xs">{row.read}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelected(row)}
                          className="rounded bg-[#f0eee8] px-2 py-1 text-xs font-semibold text-[#2f4126] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                  {visible.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-[#444840]">
                        No illustrative rows match this filter.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#c4c8bd] bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
              <span>Illustrative pagination preview — no additional pages are loaded.</span>
              <div className="flex items-center gap-1" aria-label="Illustrative pagination">
                <button
                  type="button"
                  disabled
                  className="rounded bg-[#eae8e2] px-2 py-1 opacity-60"
                >
                  Prev
                </button>
                <span className="rounded bg-[#46583b] px-2 py-1 font-semibold text-white">1</span>
                <button
                  type="button"
                  disabled
                  className="rounded bg-[#eae8e2] px-2 py-1 opacity-60"
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          <aside
            aria-labelledby="dossier-heading"
            className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm xl:col-span-4"
          >
            <div className="flex items-center justify-between border-b border-[#c4c8bd] pb-3">
              <div className="flex items-center gap-2">
                <ClipboardList size={18} aria-hidden="true" className="text-[#46583b]" />
                <div>
                  <h2
                    id="dossier-heading"
                    className="font-heading text-sm font-bold uppercase tracking-wide"
                  >
                    Archived record dossier
                  </h2>
                  <p className="font-mono text-xs text-[#444840]">Ref: {selected.id}</p>
                </div>
              </div>
              <Badge tone={selected.read === 'Read' ? 'primary' : 'neutral'}>{selected.read}</Badge>
            </div>
            <h3 className="font-heading mt-4 text-base font-bold">{selected.summary}</h3>
            <p className="mt-1 text-xs text-[#444840]">
              {selected.date} · {selected.category}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between rounded-lg bg-[#f5f3ed] p-2">
                <dt className="text-[#444840]">Target</dt>
                <dd className="font-mono text-xs">{selected.target}</dd>
              </div>
              <div className="flex justify-between rounded-lg bg-[#f5f3ed] p-2">
                <dt className="text-[#444840]">Channels</dt>
                <dd className="text-right text-xs">{selected.channel}</dd>
              </div>
              <div className="flex justify-between rounded-lg bg-[#f5f3ed] p-2">
                <dt className="text-[#444840]">Read state</dt>
                <dd className="text-xs">{selected.read} (example)</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-[#444840]">
              <Activity size={12} className="mr-1 inline" aria-hidden="true" />
              No delivery receipt, read receipt, or chain-of-custody claim is made in this preview.
            </p>
            <ChevronRight size={16} aria-hidden="true" className="mt-2 text-[#c4c8bd]" />
          </aside>
        </div>

        <footer className="rounded-xl border border-[#c4c8bd] bg-white p-4 text-xs text-[#444840]">
          <p>
            <CheckCheck size={14} className="mr-1 inline" aria-hidden="true" />
            <strong className="font-semibold text-[#1b1c18]">
              Illustrative sample data only.
            </strong>{' '}
            Export, print, and history-retention actions remain unwired and are not evidence of a
            saved record.
          </p>
        </footer>
      </div>
    </div>
  );
}
