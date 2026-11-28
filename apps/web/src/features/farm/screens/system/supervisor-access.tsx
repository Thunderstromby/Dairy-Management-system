import {
  BadgeCheck,
  Ban,
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileLock2,
  LockKeyhole,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
  Wrench,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

type Supervisor = {
  name: string;
  id: string;
  focus: string;
  status: 'Active' | 'Draft';
};

const supervisors: readonly Supervisor[] = [
  {
    name: 'Example Supervisor A',
    id: 'SUP-042-01 (illustrative)',
    focus: 'Milking parlor & storage',
    status: 'Active',
  },
  {
    name: 'Example Supervisor B',
    id: 'SUP-042-02 (illustrative)',
    focus: 'Equipment & feed yard',
    status: 'Active',
  },
  {
    name: 'Example Supervisor C',
    id: 'SUP-042-03 (illustrative)',
    focus: 'Feeding & silo complex',
    status: 'Draft',
  },
];

const permitted = [
  {
    icon: Wrench,
    label: 'Equipment & maintenance logging',
    detail: 'Record permitted equipment condition and usage.',
  },
  {
    icon: BadgeCheck,
    label: 'Herd directory & routine observations',
    detail: 'Access permitted animal information and daily observations.',
  },
  {
    icon: ClipboardCheck,
    label: 'Milk production entry',
    detail: 'Record morning and evening production entries.',
  },
  {
    icon: CalendarCheck,
    label: 'Attendance & feeding records',
    detail: 'Record shift attendance and actual feeding entries.',
  },
];

const restricted = [
  'Financial ledgers and invoices',
  'Payroll, wages and payslips',
  'Leave approval or rejection',
  'Stock corrections and adjustments',
  'Farm settings and configuration',
  'Animal archive actions',
  'High / Critical health alerts',
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

export function SupervisorAccessScreen() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Supervisor | null>(null);
  const [provisionOpen, setProvisionOpen] = useState(false);
  const [worker, setWorker] = useState('example-worker-a');
  const [focus, setFocus] = useState('feeding');
  const [notice, setNotice] = useState('');

  const visible = supervisors.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesQuery =
      query.trim().length === 0 ||
      `${item.name} ${item.id} ${item.focus}`.toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#444840]">
              <span>Settings &amp; Configuration</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="font-semibold text-[#2f4126]">Supervisor Access</span>
              <Badge tone="danger">Farm Admin authority</Badge>
              <Badge>Illustrative</Badge>
            </div>
            <h1 className="font-heading mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Supervisor Access Management
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Administrative delegation layout for an example workspace. All entries are
              illustrative; no account is created, edited, or revoked by this preview.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white px-4 py-2.5 text-sm font-medium text-[#444840] opacity-60"
            >
              <Download size={16} aria-hidden="true" /> Export matrix — unwired
            </button>
            <button
              type="button"
              onClick={() => setProvisionOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <UserPlus size={16} aria-hidden="true" /> Provision supervisor (local draft)
            </button>
          </div>
        </header>

        <section className="rounded-xl bg-[#f0eee8] p-5 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-white p-2.5 text-[#2f4126] shadow-sm">
                <ShieldCheck size={20} aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-[#2f4126]">
                    Farm Admin authority notice
                  </h2>
                  <Badge tone="primary">Workspace boundary</Badge>
                </div>
                <p className="mt-1 max-w-3xl text-sm text-[#444840]">
                  Farm Admin may provision Supervisor access only inside its assigned workspace.
                  Role escalation, worker self-registration, and cross-workspace access are not
                  permitted. Worker records are not login accounts.
                </p>
              </div>
            </div>
            <Badge>Scope: example workspace GF-042</Badge>
          </div>
        </section>

        <section
          aria-label="Supervisor summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'Active supervisors', value: '2', hint: 'illustrative entries', icon: Users },
            {
              label: 'Workspace scope',
              value: 'GF-042',
              hint: 'example workspace',
              icon: LockKeyhole,
            },
            {
              label: 'Delegated role',
              value: 'Farm Supervisor',
              hint: 'operational subset only',
              icon: BadgeCheck,
            },
            { label: 'Restricted domains', value: '7', hint: 'never delegated', icon: FileLock2 },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#444840]">
                  {card.label}
                </span>
                <card.icon size={18} aria-hidden="true" className="text-[#46583b]" />
              </div>
              <p className="font-heading mt-2 text-xl font-bold">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.hint}</p>
            </div>
          ))}
        </section>

        <section
          aria-labelledby="matrix-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="matrix-title" className="font-heading text-lg font-bold text-[#2f4126]">
                Supervisor permission boundary matrix
              </h2>
              <p className="mt-0.5 text-xs text-[#444840]">
                Illustrative capability boundaries. Server authorization must enforce each row.
              </p>
            </div>
            <Badge>Tenant-enforced (not by navigation)</Badge>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-[#c4c8bd] bg-[#f5f3ed] p-4">
              <h3 className="font-heading mb-3 flex items-center gap-2 text-sm font-bold text-[#2f4126]">
                <BadgeCheck size={18} aria-hidden="true" /> Permitted operational scope
              </h3>
              <ul className="space-y-2">
                {permitted.map((item) => (
                  <li key={item.label} className="rounded-lg border border-[#c4c8bd] bg-white p-3">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <item.icon size={15} className="text-[#46583b]" aria-hidden="true" />{' '}
                      {item.label}
                    </span>
                    <p className="mt-1 text-xs text-[#444840]">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#c4c8bd] bg-[#f5f3ed] p-4">
              <h3 className="font-heading mb-3 flex items-center gap-2 text-sm font-bold text-[#7a461c]">
                <Ban size={18} aria-hidden="true" /> Strictly restricted domains
              </h3>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {restricted.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-white p-3 text-xs"
                  >
                    <LockKeyhole size={14} className="shrink-0 text-[#7a461c]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-lg bg-[#eae8e2] p-3 text-xs text-[#7a461c]">
                High and Critical health alerts are delivered to Farm Admin recipients only.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="registry-title"
          className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm"
        >
          <div className="flex flex-col gap-3 border-b border-[#c4c8bd] bg-[#f5f3ed] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 id="registry-title" className="font-heading text-lg font-bold text-[#2f4126]">
                Authorized supervisor registry
              </h2>
              <p className="text-xs text-[#444840]">Illustrative entries — no real accounts.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="relative">
                <Search
                  size={16}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444840]"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search illustrative records"
                  className="h-9 w-full rounded-lg border border-[#c4c8bd] bg-white pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] lg:w-64"
                />
              </label>
              <label>
                <span className="sr-only">Account status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-9 rounded-lg border border-[#c4c8bd] bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  <option value="all">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-xs uppercase tracking-wide text-[#444840]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Supervisor identity
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Approved role
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Assigned focus
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f5f3ed]">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#46583b] text-xs font-bold text-white">
                          {item.name.slice(-1)}
                        </span>
                        <span>
                          <span className="block font-semibold">{item.name}</span>
                          <span className="block font-mono text-xs text-[#444840]">{item.id}</span>
                        </span>
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone="primary">Farm Supervisor</Badge>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{item.focus}</td>
                    <td className="px-3 py-3">
                      <Badge tone={item.status === 'Active' ? 'primary' : 'neutral'}>
                        {item.status} (example)
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="rounded-lg bg-[#f0eee8] px-2.5 py-1.5 text-xs font-semibold text-[#2f4126] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                      >
                        Inspect dossier
                      </button>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-[#444840]">
                      No illustrative supervisor matches this filter.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[#c4c8bd] bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            Delegation audit and boundary rules are illustrative; no activity log entry is written.
          </div>
        </section>

        {selected ? (
          <section
            aria-labelledby="dossier-title"
            className="rounded-xl border border-[#46583b] bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="dossier-title" className="font-heading text-lg font-bold text-[#2f4126]">
                  Supervisor dossier (illustrative)
                </h2>
                <p className="mt-1 text-sm text-[#444840]">
                  {selected.name} · {selected.id} · {selected.focus}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-[#f5f3ed] p-3">
                <h3 className="font-heading text-xs font-bold uppercase tracking-wide text-[#2f4126]">
                  Permitted
                </h3>
                <p className="mt-1 text-sm text-[#444840]">
                  Operational entry within the assigned workspace only.
                </p>
              </div>
              <div className="rounded-lg bg-[#f5f3ed] p-3">
                <h3 className="font-heading text-xs font-bold uppercase tracking-wide text-[#7a461c]">
                  Prohibited
                </h3>
                <p className="mt-1 text-sm text-[#444840]">
                  Finance, payroll, leave approval, stock correction, animal archive, High /
                  Critical alerts.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {provisionOpen ? (
          <section
            aria-labelledby="provision-title"
            className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="provision-title" className="font-heading text-lg font-bold text-[#2f4126]">
                  Provision supervisor access (local draft)
                </h2>
                <p className="mt-1 text-sm text-[#444840]">
                  Exact provisioning fields and activation behavior await approved requirements.
                  This records intent only.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setProvisionOpen(false)}
                className="rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <label htmlFor="worker-select" className="mb-1.5 block text-xs font-semibold">
                  Associate worker record (illustrative)
                </label>
                <select
                  id="worker-select"
                  value={worker}
                  onChange={(event) => setWorker(event.target.value)}
                  className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  <option value="example-worker-a">Example worker A (illustrative)</option>
                  <option value="example-worker-b">Example worker B (illustrative)</option>
                </select>
                <p className="mt-1 text-xs text-[#444840]">
                  Linking a worker record to a login account is an unconfirmed assumption.
                </p>
              </div>
              <div>
                <label htmlFor="focus-select" className="mb-1.5 block text-xs font-semibold">
                  Operational focus
                </label>
                <select
                  id="focus-select"
                  value={focus}
                  onChange={(event) => setFocus(event.target.value)}
                  className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  <option value="feeding">Feeding &amp; silos</option>
                  <option value="parlor">Milking parlor</option>
                  <option value="equipment">Equipment</option>
                </select>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-[#eae8e2] p-3 text-sm">
                <span className="block text-xs text-[#444840]">Target workspace (locked)</span>
                <strong>Example workspace GF-042</strong>
              </div>
              <div className="rounded-lg bg-[#eae8e2] p-3 text-sm">
                <span className="block text-xs text-[#444840]">Delegated role (fixed)</span>
                <strong>Farm Supervisor</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setProvisionOpen(false);
                setNotice('Draft intent recorded locally — no account was created.');
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Plus size={16} aria-hidden="true" /> Save draft intent (local)
            </button>
          </section>
        ) : null}

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no supervisor account was created, changed, or revoked.'}
        </p>
      </div>
    </div>
  );
}
