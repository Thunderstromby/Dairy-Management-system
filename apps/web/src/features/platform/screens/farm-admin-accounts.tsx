import { useMemo, useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
  MoreHorizontal,
  RotateCcw,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';

type AdminRow = {
  initials: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  customer: string;
  customerRef: string;
  workspace: string;
  workspaceCode: string;
  lastActive: string;
  status: 'Active' | 'Pending Initial Access';
};

const ADMINS: readonly AdminRow[] = [
  {
    initials: 'FA',
    name: 'Farm Admin 01',
    role: 'Operations Lead',
    email: 'contact-01@example.invalid',
    phone: '+00 000 000 0001',
    customer: 'Customer 01',
    customerRef: 'CUST-0001',
    workspace: 'Workspace 01',
    workspaceCode: 'WS-0001',
    lastActive: 'Example activity',
    status: 'Active',
  },
  {
    initials: 'FA',
    name: 'Farm Admin 02',
    role: 'Senior Dairy Technologist',
    email: 'contact-02@example.invalid',
    phone: '+00 000 000 0002',
    customer: 'Customer 01',
    customerRef: 'CUST-0001',
    workspace: 'Workspace 02',
    workspaceCode: 'WS-0002',
    lastActive: 'Example activity',
    status: 'Active',
  },
  {
    initials: 'FA',
    name: 'Farm Admin 03',
    role: 'Dairy Operations Manager',
    email: 'contact-03@example.invalid',
    phone: '+00 000 000 0003',
    customer: 'Customer 02',
    customerRef: 'CUST-0002',
    workspace: 'Workspace 03',
    workspaceCode: 'WS-0003',
    lastActive: 'Example activity',
    status: 'Active',
  },
  {
    initials: 'FA',
    name: 'Farm Admin 04',
    role: 'Herd Production Lead',
    email: 'contact-04@example.invalid',
    phone: '+00 000 000 0004',
    customer: 'Customer 02',
    customerRef: 'CUST-0002',
    workspace: 'Workspace 04',
    workspaceCode: 'WS-0004',
    lastActive: 'Example activity',
    status: 'Active',
  },
  {
    initials: 'FA',
    name: 'Farm Admin 05',
    role: 'Parlor Supervisor & Admin',
    email: 'contact-05@example.invalid',
    phone: '+00 000 000 0005',
    customer: 'Customer 03',
    customerRef: 'CUST-0003',
    workspace: 'Workspace 05',
    workspaceCode: 'WS-0005',
    lastActive: 'Example activity',
    status: 'Active',
  },
  {
    initials: 'FA',
    name: 'Farm Admin 06',
    role: 'Dairy Systems Lead',
    email: 'contact-06@example.invalid',
    phone: '+00 000 000 0006',
    customer: 'Customer 04',
    customerRef: 'CUST-0004',
    workspace: 'Workspace 06',
    workspaceCode: 'WS-0006',
    lastActive: 'Example activity',
    status: 'Pending Initial Access',
  },
] as const;

const METRICS = [
  {
    label: 'Total Farm Admins',
    value: '89',
    note: 'Illustrative account count',
    icon: Users,
    bar: '100%',
    color: 'bg-[#46583b]',
  },
  {
    label: 'Assigned to Workspaces',
    value: '86',
    note: 'Illustrative direct tenancy',
    icon: Building2,
    bar: '96.6%',
    color: 'bg-[#556249]',
  },
  {
    label: 'Unassigned / Pending',
    value: '3',
    note: 'Illustrative awaiting binding',
    icon: UserPlus,
    bar: '3.4%',
    color: 'bg-[#7a461c]',
  },
  {
    label: 'Provisioned This Month',
    value: '6',
    note: 'Illustrative manual provisioning',
    icon: ShieldCheck,
    bar: '65%',
    color: 'bg-[#46583b]',
  },
] as const;

const DISTRIBUTION = [
  { unit: 'Workspace 01', count: '14', customer: 'Customer 01' },
  { unit: 'Workspace 02', count: '8', customer: 'Customer 01' },
  { unit: 'Workspace 03', count: '19', customer: 'Customer 02' },
  { unit: 'Workspace 04', count: '11', customer: 'Customer 02' },
  { unit: 'Workspace 05', count: '6', customer: 'Customer 03' },
  { unit: 'Workspace 06', count: '12', customer: 'Customer 04' },
] as const;

const SELECT_CLASS =
  'w-full appearance-none rounded-lg bg-[#f2f5ed] py-2 pl-3 pr-8 font-inter text-xs text-[#191d18] outline-none transition-colors duration-200 motion-reduce:transition-none focus:bg-[#fff] focus:ring-2 focus:ring-[#46583b]';

export function FarmAdminAccounts() {
  const [query, setQuery] = useState('');
  const [customer, setCustomer] = useState('all');
  const [status, setStatus] = useState('all');

  const rows = useMemo(
    () =>
      ADMINS.filter((admin) => {
        const normalized = query.trim().toLowerCase();
        const matchesQuery =
          normalized.length === 0 ||
          `${admin.name} ${admin.email} ${admin.workspace}`.toLowerCase().includes(normalized);
        const matchesCustomer = customer === 'all' || admin.customerRef === customer;
        const matchesStatus = status === 'all' || admin.status.toLowerCase() === status;
        return matchesQuery && matchesCustomer && matchesStatus;
      }),
    [query, customer, status],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 font-inter text-xs text-[#444840]"
      >
        <span className="flex items-center gap-1 font-semibold text-[#556249]">
          <ShieldCheck size={15} aria-hidden="true" /> Farm Admin Accounts
        </span>
        <span className="text-[#c4c8bd]">/</span>
        <span className="font-semibold text-[#191d18]">Account Directory</span>
        <span className="ml-auto rounded bg-[#d9e8c7] px-2 py-1 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
          Illustrative data
        </span>
      </nav>

      <header className="flex flex-col gap-4 overflow-hidden rounded-xl bg-[#fff] p-5 shadow-sm xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#ecefe7] px-2 py-0.5 font-inter text-[11px] font-semibold uppercase text-[#7a461c]">
              Tenant Delegation
            </span>
            <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
              Illustrative snapshot
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
            Farm Admin Accounts
          </h1>
          <p className="max-w-2xl font-inter text-sm text-[#444840]">
            Illustrative administrator accounts provisioned for dedicated dairy farm workspaces. No
            account below is a real login.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 rounded-xl bg-[#f2f5ed] px-4 py-3">
            <div>
              <span className="font-inter text-[11px] uppercase text-[#75786f]">
                Active Accounts
              </span>
              <p className="font-heading text-lg font-bold tabular-nums text-[#191d18]">
                86 <span className="font-inter text-xs font-normal text-[#556249]">/ 89</span>
              </p>
            </div>
            <span className="h-8 w-px bg-[#e0e4dc]" aria-hidden="true" />
            <div>
              <span className="font-inter text-[11px] uppercase text-[#75786f]">
                Assigned Status
              </span>
              <p className="font-heading text-lg font-bold tabular-nums text-[#46583b]">96.6%</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-4 py-2.5 font-inter text-xs font-semibold text-white hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
          >
            <UserPlus size={18} aria-hidden="true" /> Provision Farm Admin
          </button>
        </div>
      </header>

      <section
        aria-label="Illustrative Farm Admin totals"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.label}
              className="flex flex-col gap-3 rounded-xl bg-[#fff] p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-inter text-xs font-medium text-[#444840]">
                  {metric.label}
                </span>
                <span className="rounded bg-[#f2f5ed] p-1 text-[#556249]">
                  <Icon size={18} aria-hidden="true" />
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-2xl font-semibold tabular-nums text-[#191d18]">
                  {metric.value}
                </span>
                <span className="font-inter text-[11px] text-[#556249]">{metric.note}</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-[#e0e4dc]">
                <div
                  className={`h-full rounded-full ${metric.color}`}
                  style={{ width: metric.bar }}
                />
              </div>
            </article>
          );
        })}
      </section>

      <section
        aria-label="Farm Admin filters"
        className="space-y-3 rounded-xl bg-[#fff] p-4 shadow-sm"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-[280px] flex-1">
            <label htmlFor="admin-search" className="sr-only">
              Search Farm Admin accounts
            </label>
            <Search
              size={18}
              aria-hidden="true"
              className="absolute left-3 top-2.5 text-[#75786f]"
            />
            <input
              id="admin-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search administrator name, email, workspace..."
              className="h-10 w-full rounded-lg bg-[#f2f5ed] pl-10 pr-3 font-inter text-xs text-[#191d18] placeholder:text-[#75786f] outline-none transition-colors duration-200 motion-reduce:transition-none focus:bg-[#fff] focus:ring-2 focus:ring-[#46583b]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <span className="sr-only">Filter by customer organization</span>
              <select
                aria-label="Filter by customer organization"
                value={customer}
                onChange={(event) => setCustomer(event.target.value)}
                className={`${SELECT_CLASS} w-auto min-w-[180px]`}
              >
                <option value="all">Customer Organization: All</option>
                <option value="CUST-0001">Customer 01</option>
                <option value="CUST-0002">Customer 02</option>
                <option value="CUST-0003">Customer 03</option>
                <option value="CUST-0004">Customer 04</option>
              </select>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-2.5 text-[#75786f]"
              />
            </label>
            <label className="relative">
              <span className="sr-only">Filter by status</span>
              <select
                aria-label="Filter by status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className={`${SELECT_CLASS} w-auto min-w-[140px]`}
              >
                <option value="all">Status: All Statuses</option>
                <option value="active">Active</option>
                <option value="pending initial access">Pending Initial Access</option>
              </select>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-2.5 text-[#75786f]"
              />
            </label>
            <button
              type="button"
              aria-label="Clear filters"
              onClick={() => {
                setQuery('');
                setCustomer('all');
                setStatus('all');
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2f5ed] text-[#75786f] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <RotateCcw size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 font-inter text-xs">
          <span className="font-semibold text-[#191d18]">
            Showing {rows.length} illustrative Farm Admins
          </span>
          <span className="text-[#75786f]">Sort by: Last Active (illustrative)</span>
        </div>
      </section>

      <section
        aria-label="Farm Admin records"
        className="overflow-hidden rounded-xl bg-[#fff] shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left">
            <thead className="bg-[#f2f5ed] font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Administrator
                </th>
                <th scope="col" className="px-4 py-3">
                  Email &amp; Contact
                </th>
                <th scope="col" className="px-4 py-3">
                  Customer Organization
                </th>
                <th scope="col" className="px-4 py-3">
                  Assigned Workspaces
                </th>
                <th scope="col" className="px-4 py-3">
                  Last Active
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
              {rows.map((admin) => (
                <tr
                  key={admin.email}
                  className="border-t border-[#ecefe7] transition-colors duration-150 motion-reduce:transition-none hover:bg-[#f2f5ed]/70"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d9e8c7] font-heading text-xs font-bold text-[#5b694e]">
                        {admin.initials}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate font-heading text-sm font-semibold text-[#191d18]">
                          {admin.name}
                        </span>
                        <span className="truncate font-inter text-[11px] text-[#556249]">
                          {admin.role}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex flex-col">
                      <span className="font-inter text-xs text-[#191d18]">{admin.email}</span>
                      <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                        {admin.phone}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-2">
                      <Building2 size={16} aria-hidden="true" className="text-[#75786f]" />
                      <span className="flex flex-col">
                        <span className="font-inter text-xs text-[#191d18]">{admin.customer}</span>
                        <span className="font-inter text-[10px] tabular-nums text-[#75786f]">
                          {admin.customerRef}
                        </span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded bg-[#f2f5ed] px-2 py-1 font-inter text-[11px] text-[#444840]">
                      {admin.workspace}{' '}
                      <span className="tabular-nums text-[#75786f]">({admin.workspaceCode})</span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-inter text-xs tabular-nums text-[#444840]">
                    {admin.lastActive}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-inter text-[11px] font-semibold ${
                        admin.status === 'Active'
                          ? 'bg-[#d9e8c7] text-[#5b694e]'
                          : 'bg-[#ffdcc6] text-[#6c3a11]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${admin.status === 'Active' ? 'bg-[#46583b]' : 'bg-[#7a461c]'}`}
                        aria-hidden="true"
                      />
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="rounded px-2 py-1 font-inter text-[11px] font-medium text-[#556249] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                      >
                        View Account
                      </button>
                      <button
                        type="button"
                        className="rounded px-2 py-1 font-inter text-[11px] font-medium text-[#556249] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        aria-label={`More actions for ${admin.name}`}
                        className="rounded p-1 text-[#75786f] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                      >
                        <MoreHorizontal size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? (
          <p
            role="status"
            className="border-t border-[#ecefe7] px-4 py-10 text-center font-inter text-sm text-[#444840]"
          >
            No illustrative Farm Admin accounts match the current filters.
          </p>
        ) : null}
        <div className="flex flex-col gap-3 bg-[#f2f5ed]/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 font-inter text-xs text-[#75786f]">
            <span className="tabular-nums">
              Showing 1–{rows.length} of 89 illustrative administrators
            </span>
            <label className="flex items-center gap-1">
              <span>Rows per page:</span>
              <select
                aria-label="Rows per page"
                className="rounded border border-[#c4c8bd] bg-[#fff] px-1.5 py-0.5 font-inter text-xs tabular-nums text-[#191d18] outline-none focus:ring-2 focus:ring-[#46583b]"
              >
                <option>6</option>
                <option>15</option>
                <option>30</option>
                <option>50</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              aria-label="First page"
              className="rounded p-1 text-[#75786f] opacity-50"
            >
              <ChevronsLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="rounded p-1 text-[#75786f] opacity-50"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-current="page"
              className="rounded bg-[#46583b] px-2 py-0.5 font-inter text-xs font-bold tabular-nums text-white"
            >
              1
            </button>
            <button
              type="button"
              className="rounded px-2 py-0.5 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              2
            </button>
            <button
              type="button"
              className="rounded px-2 py-0.5 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              3
            </button>
            <span className="px-1 text-[#75786f]">…</span>
            <button
              type="button"
              className="rounded px-2 py-0.5 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              15
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="rounded p-1 text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Last page"
              className="rounded p-1 text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <ChevronsRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <aside className="flex items-start gap-3 rounded-xl bg-[#f2f5ed] p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e0e4dc] text-[#46583b]">
          <ShieldCheck size={24} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-sm font-semibold text-[#191d18]">
            Farm Administrator Role &amp; Access Scope
          </h2>
          <p className="mt-1 font-inter text-xs leading-relaxed text-[#444840]">
            Farm Administrators are scoped to their assigned workspace within their customer
            organization. Cross-workspace access and Super Admin platform controls are not granted
            by this role.
          </p>
        </div>
      </aside>

      <section
        aria-label="Illustrative admin distribution"
        className="rounded-xl bg-[#fff] p-4 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-heading text-sm font-semibold text-[#191d18]">
            <Building2 size={20} aria-hidden="true" className="text-[#556249]" /> Admin Distribution
            Across Workspaces
          </h2>
          <span className="font-inter text-[11px] text-[#75786f]">
            Illustrative distribution — not live data
          </span>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {DISTRIBUTION.map((item) => (
            <div key={item.unit} className="rounded-lg bg-[#f2f5ed] p-3">
              <dt className="truncate font-inter text-[11px] uppercase text-[#75786f]">
                {item.unit}
              </dt>
              <dd className="font-heading text-base font-bold text-[#191d18]">
                {item.count}{' '}
                <span className="font-inter text-[11px] font-normal text-[#444840]">admins</span>
              </dd>
              <dd className="font-inter text-[11px] text-[#556249]">{item.customer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="flex items-center gap-2 font-inter text-[11px] text-[#75786f]">
        <Info size={14} aria-hidden="true" /> All identifiers, contacts and counts above are
        illustrative and no login is represented.
      </p>
    </div>
  );
}
