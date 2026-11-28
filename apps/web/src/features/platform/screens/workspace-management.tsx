import { useMemo, useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Factory,
  Info,
  MapPin,
  Plus,
  Search,
  TriangleAlert,
  Users,
} from 'lucide-react';

type WorkspaceRow = {
  code: string;
  name: string;
  location: string;
  facility: string;
  capacity: string;
  customer: string;
  customerRef: string;
  admin: string;
  initials: string;
  status: 'Active' | 'Pending Setup';
  icon: typeof Factory;
};

const WORKSPACES: readonly WorkspaceRow[] = [
  {
    code: 'WS-0001',
    name: 'Workspace 01',
    location: 'North Pastures Sector',
    facility: 'Rotary Milking Parlor',
    capacity: 'Illustrative herd capacity',
    customer: 'Customer 01',
    customerRef: 'CUST-0001',
    admin: 'Farm Admin 01',
    initials: 'FA',
    status: 'Active',
    icon: Factory,
  },
  {
    code: 'WS-0002',
    name: 'Workspace 02',
    location: 'Valley South Barn',
    facility: 'Automated Milking Facility',
    capacity: 'Illustrative robotic units',
    customer: 'Customer 01',
    customerRef: 'CUST-0001',
    admin: 'Farm Admin 02',
    initials: 'FA',
    status: 'Active',
    icon: Building2,
  },
  {
    code: 'WS-0003',
    name: 'Workspace 03',
    location: 'West Plains Compound',
    facility: 'Parallel Milking Parlor',
    capacity: 'Illustrative herd capacity',
    customer: 'Customer 02',
    customerRef: 'CUST-0002',
    admin: 'Farm Admin 03',
    initials: 'FA',
    status: 'Active',
    icon: Factory,
  },
  {
    code: 'WS-0004',
    name: 'Workspace 04',
    location: 'Pasture Tract 3',
    facility: 'Rotational Milking Unit',
    capacity: 'Illustrative rotation',
    customer: 'Customer 03',
    customerRef: 'CUST-0003',
    admin: '',
    initials: '',
    status: 'Pending Setup',
    icon: TriangleAlert,
  },
  {
    code: 'WS-0005',
    name: 'Workspace 05',
    location: 'Cedar Valley Facility',
    facility: 'Calf & Replacement Nursery',
    capacity: 'Illustrative calf count',
    customer: 'Customer 04',
    customerRef: 'CUST-0004',
    admin: 'Farm Admin 04',
    initials: 'FA',
    status: 'Active',
    icon: Building2,
  },
  {
    code: 'WS-0006',
    name: 'Workspace 06',
    location: 'Ridge Barn Complex',
    facility: 'Automated Feeding Barn',
    capacity: 'Illustrative herd capacity',
    customer: 'Customer 05',
    customerRef: 'CUST-0005',
    admin: '',
    initials: '',
    status: 'Pending Setup',
    icon: TriangleAlert,
  },
] as const;

const METRICS = [
  {
    label: 'Total Workspaces',
    value: '136',
    note: 'Illustrative operational units',
    icon: Building2,
    bar: '100%',
    color: 'bg-[#46583b]',
  },
  {
    label: 'Active Workspaces',
    value: '124',
    note: 'Illustrative operating status',
    icon: CheckCircle2,
    bar: '91.2%',
    color: 'bg-[#556249]',
  },
  {
    label: 'Unassigned Workspaces',
    value: '12',
    note: 'Illustrative awaiting Farm Admin',
    icon: TriangleAlert,
    bar: '32%',
    color: 'bg-[#7a461c]',
  },
  {
    label: 'Associated Customers',
    value: '48',
    note: 'Illustrative organizations',
    icon: Users,
    bar: '80%',
    color: 'bg-[#46583b]',
  },
] as const;

const SELECT_CLASS =
  'w-full appearance-none rounded-lg bg-[#f2f5ed] py-2 pl-3 pr-8 font-inter text-xs text-[#191d18] outline-none transition-colors duration-200 motion-reduce:transition-none focus:bg-[#fff] focus:ring-2 focus:ring-[#46583b]';

export function WorkspaceManagement() {
  const [query, setQuery] = useState('');
  const [customer, setCustomer] = useState('all');
  const [status, setStatus] = useState('all');
  const [assignment, setAssignment] = useState('all');

  const rows = useMemo(
    () =>
      WORKSPACES.filter((workspace) => {
        const normalized = query.trim().toLowerCase();
        const matchesQuery =
          normalized.length === 0 ||
          `${workspace.name} ${workspace.code} ${workspace.customer}`
            .toLowerCase()
            .includes(normalized);
        const matchesCustomer = customer === 'all' || workspace.customerRef === customer;
        const matchesStatus = status === 'all' || workspace.status.toLowerCase() === status;
        const matchesAssignment =
          assignment === 'all' ||
          (assignment === 'assigned' ? workspace.admin.length > 0 : workspace.admin.length === 0);
        return matchesQuery && matchesCustomer && matchesStatus && matchesAssignment;
      }),
    [query, customer, status, assignment],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section
        aria-label="Illustrative workspace totals"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.label}
              className="flex flex-col gap-3 rounded-xl bg-[#fff] p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]">
                  {metric.label}
                </span>
                <Icon size={20} aria-hidden="true" className="text-[#556249]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold tabular-nums text-[#191d18]">
                  {metric.value}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-[#ecefe7]">
                <div
                  className={`h-full rounded-full ${metric.color}`}
                  style={{ width: metric.bar }}
                />
              </div>
              <span className="font-inter text-[11px] text-[#75786f]">
                {metric.note} • Illustrative data
              </span>
            </article>
          );
        })}
      </section>

      <header className="flex flex-col gap-4 rounded-xl bg-[#fff] p-5 shadow-sm md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-widest text-[#556249]">
              Workspace Directory
            </span>
            <span className="text-[#75786f]">•</span>
            <span className="font-inter text-[11px] uppercase tracking-wider text-[#75786f]">
              Super Admin
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
            Workspace Management
          </h1>
          <p className="max-w-2xl font-inter text-sm text-[#444840]">
            Illustrative dairy workspaces, associated customers, and assigned Farm Administrators.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#ecefe7] px-3 py-2 font-inter text-xs font-medium text-[#191d18] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <Download size={16} aria-hidden="true" /> Export CSV
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-3 py-2 font-inter text-xs font-semibold text-white transition-colors duration-200 motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
          >
            <Plus size={18} aria-hidden="true" /> Create Workspace
          </button>
        </div>
      </header>

      <section
        aria-label="Workspace filters"
        className="space-y-3 rounded-xl bg-[#fff] p-4 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-4">
            <label htmlFor="workspace-search" className="sr-only">
              Search workspaces
            </label>
            <div className="flex items-center gap-2 rounded-lg bg-[#f2f5ed] px-3 py-2 focus-within:bg-[#fff] focus-within:ring-2 focus-within:ring-[#46583b]">
              <Search size={18} aria-hidden="true" className="text-[#75786f]" />
              <input
                id="workspace-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search workspace name, code, or customer..."
                className="w-full bg-transparent font-inter text-xs text-[#191d18] placeholder:text-[#75786f] outline-none"
              />
            </div>
          </div>
          <label className="relative md:col-span-3">
            <span className="sr-only">Filter by customer</span>
            <select
              aria-label="Filter by customer"
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
              className={SELECT_CLASS}
            >
              <option value="all">Customer: All Organizations</option>
              <option value="CUST-0001">Customer 01</option>
              <option value="CUST-0002">Customer 02</option>
              <option value="CUST-0003">Customer 03</option>
              <option value="CUST-0004">Customer 04</option>
              <option value="CUST-0005">Customer 05</option>
            </select>
            <ChevronDown
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-2.5 text-[#75786f]"
            />
          </label>
          <label className="relative md:col-span-2">
            <span className="sr-only">Filter by status</span>
            <select
              aria-label="Filter by status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className={SELECT_CLASS}
            >
              <option value="all">Status: All</option>
              <option value="active">Active</option>
              <option value="pending setup">Pending Setup</option>
            </select>
            <ChevronDown
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-2.5 text-[#75786f]"
            />
          </label>
          <label className="relative md:col-span-3">
            <span className="sr-only">Filter by admin assignment</span>
            <select
              aria-label="Filter by admin assignment"
              value={assignment}
              onChange={(event) => setAssignment(event.target.value)}
              className={SELECT_CLASS}
            >
              <option value="all">Admin Assignment: All</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
            <ChevronDown
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-2.5 text-[#75786f]"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#75786f]">
            <span className="font-semibold tabular-nums text-[#556249]">
              Showing {rows.length} illustrative workspaces
            </span>
            <span>•</span>
            <span>Sorted by provision date</span>
            <span className="rounded bg-[#ecefe7] px-1.5 py-0.5 text-[11px]">
              Illustrative data
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 font-inter text-xs text-[#556249] hover:text-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            Refresh Workspaces
          </button>
        </div>
      </section>

      <section
        aria-label="Workspace records"
        className="overflow-hidden rounded-xl bg-[#fff] shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead className="bg-[#ecefe7] font-inter text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Workspace Name &amp; Code
                </th>
                <th scope="col" className="px-4 py-3">
                  Dairy Facility
                </th>
                <th scope="col" className="px-4 py-3">
                  Associated Customer
                </th>
                <th scope="col" className="px-4 py-3">
                  Assigned Farm Admin
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((workspace) => {
                const Icon = workspace.icon;
                return (
                  <tr
                    key={workspace.code}
                    className="border-t border-[#ecefe7] transition-colors duration-150 motion-reduce:transition-none hover:bg-[#f2f5ed]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f2f5ed] text-[#46583b]">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="flex items-center gap-2">
                            <span className="truncate font-heading text-sm font-semibold text-[#191d18]">
                              {workspace.name}
                            </span>
                            <span className="rounded bg-[#f2f5ed] px-1.5 py-0.5 font-inter text-[11px] font-semibold tabular-nums text-[#75786f]">
                              {workspace.code}
                            </span>
                          </span>
                          <span className="mt-1 flex items-center gap-1 font-inter text-xs text-[#75786f]">
                            <MapPin size={13} aria-hidden="true" /> {workspace.location}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex flex-col">
                        <span className="font-inter text-sm font-medium text-[#191d18]">
                          {workspace.facility}
                        </span>
                        <span className="font-inter text-xs text-[#75786f]">
                          {workspace.capacity}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 rounded bg-[#f2f5ed] px-2 py-1">
                        <Building2 size={15} aria-hidden="true" className="text-[#556249]" />
                        <span className="flex flex-col">
                          <span className="font-inter text-xs font-medium text-[#191d18]">
                            {workspace.customer}
                          </span>
                          <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                            {workspace.customerRef}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {workspace.admin ? (
                        <span className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9e8c7] font-heading text-[11px] font-bold text-[#5b694e]">
                            {workspace.initials}
                          </span>
                          <span className="flex flex-col">
                            <span className="font-heading text-sm text-[#191d18]">
                              {workspace.admin}
                            </span>
                            <span className="font-inter text-[11px] text-[#556249]">
                              Assigned role
                            </span>
                          </span>
                        </span>
                      ) : (
                        <span className="font-inter text-xs font-semibold text-[#7a461c]">
                          Unassigned · Needs Admin
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-inter text-[11px] font-semibold ${
                          workspace.status === 'Active'
                            ? 'bg-[#d9e8c7] text-[#5b694e]'
                            : 'bg-[#f2f5ed] text-[#444840]'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${workspace.status === 'Active' ? 'bg-[#46583b]' : 'bg-[#75786f]'}`}
                          aria-hidden="true"
                        />
                        {workspace.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="rounded bg-[#ecefe7] px-2 py-1 font-inter text-[11px] font-semibold text-[#191d18] hover:bg-[#e0e4dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          className={`rounded px-2 py-1 font-inter text-[11px] font-semibold ${workspace.admin ? 'bg-[#f2f5ed] text-[#46583b] hover:bg-[#ecefe7]' : 'bg-[#7a461c] text-white hover:bg-[#5e3007]'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]`}
                        >
                          {workspace.admin ? 'Manage' : 'Provision Admin'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? (
          <p
            role="status"
            className="border-t border-[#ecefe7] px-4 py-10 text-center font-inter text-sm text-[#444840]"
          >
            No illustrative workspaces match the current filters.
          </p>
        ) : null}
        <div className="flex flex-col gap-3 bg-[#f2f5ed]/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 font-inter text-xs text-[#75786f]">
            <span className="tabular-nums">
              Showing 1–{rows.length} of 136 illustrative workspaces
            </span>
            <label className="flex items-center gap-1">
              <span>Rows:</span>
              <select
                aria-label="Rows per page"
                className="rounded border border-[#c4c8bd] bg-[#fff] px-1.5 py-0.5 font-inter text-xs tabular-nums text-[#191d18] outline-none focus:ring-2 focus:ring-[#46583b]"
              >
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              aria-label="First page"
              className="rounded p-1.5 text-[#75786f] opacity-40"
            >
              <ChevronsLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="rounded p-1.5 text-[#75786f] opacity-40"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-current="page"
              className="rounded bg-[#46583b] px-2 py-1 font-inter text-xs font-semibold tabular-nums text-white"
            >
              1
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              2
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              3
            </button>
            <span className="px-1 text-[#75786f]">…</span>
            <button
              type="button"
              className="rounded px-2 py-1 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              23
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="rounded p-1.5 text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Last page"
              className="rounded p-1.5 text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <ChevronsRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <aside className="flex items-start gap-3 rounded-xl bg-[#fff] p-4 shadow-sm">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f2f5ed] text-[#556249]">
          <Info size={18} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-sm font-semibold text-[#191d18]">
            Workspace Administration Guidelines
          </h2>
          <p className="mt-1 font-inter text-xs text-[#444840]">
            Workspaces represent distinct dairy operating units associated with a customer
            organization. Each illustrative workspace requires an assigned Farm Administrator for
            operational management.
          </p>
        </div>
      </aside>
    </div>
  );
}
