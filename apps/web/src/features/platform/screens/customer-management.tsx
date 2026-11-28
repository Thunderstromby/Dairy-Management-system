import { useMemo, useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  History,
  Info,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from 'lucide-react';

type Status = 'Active' | 'Pending Setup' | 'Inactive';
type CustomerRow = {
  initials: string;
  name: string;
  reference: string;
  type: string;
  contact: string;
  email: string;
  used: number;
  allowance: number;
  date: string;
  status: Status;
};

const CUSTOMERS: readonly CustomerRow[] = [
  {
    initials: 'C1',
    name: 'Customer 01',
    reference: 'CUST-0001',
    type: 'Corporate Dairy',
    contact: 'Liaison 01',
    email: 'contact-01@example.invalid',
    used: 14,
    allowance: 16,
    date: 'Sep 12, 2024',
    status: 'Active',
  },
  {
    initials: 'C2',
    name: 'Customer 02',
    reference: 'CUST-0002',
    type: 'Dairy Cooperative',
    contact: 'Liaison 02',
    email: 'contact-02@example.invalid',
    used: 8,
    allowance: 10,
    date: 'Oct 14, 2024',
    status: 'Active',
  },
  {
    initials: 'C3',
    name: 'Customer 03',
    reference: 'CUST-0003',
    type: 'Commercial Dairy',
    contact: 'Liaison 03',
    email: 'contact-03@example.invalid',
    used: 12,
    allowance: 12,
    date: 'Nov 03, 2024',
    status: 'Active',
  },
  {
    initials: 'C4',
    name: 'Customer 04',
    reference: 'CUST-0004',
    type: 'Dairy Cooperative',
    contact: 'Liaison 04',
    email: 'contact-04@example.invalid',
    used: 5,
    allowance: 8,
    date: 'Dec 01, 2024',
    status: 'Active',
  },
  {
    initials: 'C5',
    name: 'Customer 05',
    reference: 'CUST-0005',
    type: 'Dairy Farm',
    contact: 'Liaison 05',
    email: 'contact-05@example.invalid',
    used: 2,
    allowance: 5,
    date: 'Jan 18, 2025',
    status: 'Pending Setup',
  },
  {
    initials: 'C6',
    name: 'Customer 06',
    reference: 'CUST-0006',
    type: 'Commercial Dairy',
    contact: 'Liaison 06',
    email: 'contact-06@example.invalid',
    used: 6,
    allowance: 10,
    date: 'Feb 02, 2025',
    status: 'Inactive',
  },
] as const;

const METRICS = [
  { label: 'Total Customer Orgs', value: '48', note: 'Illustrative count', icon: Building2 },
  { label: 'Allocated Workspaces', value: '312', note: 'Illustrative / 420 capacity', icon: Users },
  {
    label: 'Active Customer Accounts',
    value: '45',
    note: 'Illustrative active count',
    icon: ShieldCheck,
  },
  { label: 'Pending Onboarding', value: '3', note: 'Illustrative awaiting setup', icon: UserPlus },
] as const;

const SELECT_CLASS =
  'w-full appearance-none rounded-lg bg-[#f2f5ed] py-2 pl-3 pr-8 font-inter text-xs text-[#191d18] outline-none transition-colors duration-200 motion-reduce:transition-none focus:bg-[#fff] focus:ring-2 focus:ring-[#46583b]';

export function CustomerManagement() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('recent');

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = CUSTOMERS.filter((customer) => {
      const matchesQuery =
        normalized.length === 0 ||
        `${customer.name} ${customer.reference} ${customer.contact} ${customer.email}`
          .toLowerCase()
          .includes(normalized);
      const matchesStatus = status === 'all' || customer.status.toLowerCase() === status;
      const matchesType = type === 'all' || customer.type.toLowerCase() === type;
      return matchesQuery && matchesStatus && matchesType;
    });
    if (sort === 'alpha') return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'workspaces') return [...filtered].sort((a, b) => b.used - a.used);
    return filtered;
  }, [query, status, type, sort]);

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-inter text-[11px] font-semibold uppercase tracking-widest text-[#556249]">
              Customer Directory • Super Admin
            </span>
            <span className="rounded bg-[#d9e8c7] px-2 py-0.5 font-inter text-[11px] font-medium uppercase tracking-wider text-[#5b694e]">
              Illustrative data
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#191d18]">
            Customer Management
          </h1>
          <p className="max-w-3xl font-inter text-sm text-[#444840]">
            Illustrative directory of customer organizations, primary contacts, and allocated
            workspaces. No row below represents a real customer record.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#c4c8bd] bg-[#fff] px-3 py-2 font-inter text-xs font-medium text-[#191d18] transition-colors duration-200 motion-reduce:transition-none hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <Download size={16} aria-hidden="true" className="text-[#556249]" /> Export CSV
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-3 py-2 font-inter text-xs font-semibold text-white transition-colors duration-200 motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]/40"
          >
            <Plus size={18} aria-hidden="true" /> Register Customer
          </button>
        </div>
      </header>

      <section
        aria-label="Illustrative customer synopsis"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.label}
              className="flex items-center justify-between rounded-xl bg-[#fff] p-4 shadow-sm"
            >
              <div className="space-y-1">
                <span className="font-inter text-[11px] font-semibold uppercase tracking-wider text-[#75786f]">
                  {metric.label}
                </span>
                <p className="font-heading text-3xl font-bold tabular-nums text-[#191d18]">
                  {metric.value}
                </p>
                <p className="font-inter text-[11px] text-[#556249]">{metric.note}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ecefe7] text-[#46583b]">
                <Icon size={22} aria-hidden="true" />
              </span>
            </article>
          );
        })}
      </section>

      <section
        aria-label="Customer filters"
        className="flex flex-col gap-3 rounded-xl bg-[#fff] p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between"
      >
        <div className="relative min-w-[260px] flex-1 xl:max-w-xl">
          <label htmlFor="customer-search" className="sr-only">
            Search customers
          </label>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#75786f]">
            <Search size={18} aria-hidden="true" />
          </span>
          <input
            id="customer-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customer name, reference, or contact..."
            className="h-10 w-full rounded-lg bg-[#f2f5ed] pl-10 pr-3 font-inter text-xs text-[#191d18] placeholder:text-[#75786f] outline-none transition-colors duration-200 motion-reduce:transition-none focus:bg-[#fff] focus:ring-2 focus:ring-[#46583b]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-lg bg-[#f2f5ed] px-2 py-1.5">
            <span className="font-inter text-[11px] font-semibold uppercase text-[#75786f]">
              Status:
            </span>
            <select
              aria-label="Filter by status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className={`${SELECT_CLASS} w-auto min-w-[140px]`}
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="pending setup">Pending Setup</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-lg bg-[#f2f5ed] px-2 py-1.5">
            <span className="font-inter text-[11px] font-semibold uppercase text-[#75786f]">
              Type:
            </span>
            <select
              aria-label="Filter by organization type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className={`${SELECT_CLASS} w-auto min-w-[160px]`}
            >
              <option value="all">All types</option>
              <option value="corporate dairy">Corporate Dairy</option>
              <option value="dairy cooperative">Dairy Cooperative</option>
              <option value="dairy farm">Dairy Farm</option>
              <option value="commercial dairy">Commercial Dairy</option>
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-lg bg-[#f2f5ed] px-2 py-1.5">
            <span className="font-inter text-[11px] font-semibold uppercase text-[#75786f]">
              Sort:
            </span>
            <span className="relative">
              <select
                aria-label="Sort customers"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className={`${SELECT_CLASS} w-auto min-w-[150px]`}
              >
                <option value="recent">Most Recent</option>
                <option value="workspaces">Workspaces (High–Low)</option>
                <option value="alpha">Entity Name (A–Z)</option>
              </select>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-2.5 text-[#75786f]"
              />
            </span>
          </label>
          <span className="whitespace-nowrap pl-1 font-inter text-xs tabular-nums text-[#556249]">
            Showing <strong className="text-[#191d18]">{rows.length}</strong> of 48 illustrative
            customers
          </span>
        </div>
      </section>

      <section
        aria-label="Customer records"
        className="overflow-hidden rounded-xl bg-[#fff] shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead className="bg-[#f2f5ed] font-inter text-[11px] font-semibold uppercase tracking-wider text-[#556249]">
              <tr>
                <th scope="col" className="py-3 pl-4 pr-3">
                  Customer / Organization
                </th>
                <th scope="col" className="px-3 py-3">
                  Primary Contact &amp; Email
                </th>
                <th scope="col" className="min-w-[200px] px-3 py-3">
                  Workspace Allowance
                </th>
                <th scope="col" className="px-3 py-3">
                  Registration Date
                </th>
                <th scope="col" className="px-3 py-3">
                  Status
                </th>
                <th scope="col" className="py-3 pl-3 pr-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((customer) => {
                const percent = Math.round((customer.used / customer.allowance) * 100);
                return (
                  <tr
                    key={customer.reference}
                    className="border-t border-[#ecefe7] transition-colors duration-150 motion-reduce:transition-none hover:bg-[#f2f5ed]/60"
                  >
                    <td className="py-4 pl-4 pr-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ecefe7] font-heading text-xs font-bold text-[#46583b]">
                          {customer.initials}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-heading text-sm font-semibold text-[#191d18]">
                            {customer.name}
                          </span>
                          <span className="font-inter text-[11px] tabular-nums text-[#75786f]">
                            {customer.reference} • {customer.type}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="flex flex-col">
                        <span className="font-inter text-sm font-medium text-[#191d18]">
                          {customer.contact}
                        </span>
                        <span className="font-inter text-xs text-[#75786f]">{customer.email}</span>
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="flex flex-col gap-1.5">
                        <span className="flex justify-between font-inter text-xs tabular-nums">
                          <span className="font-semibold text-[#191d18]">
                            {customer.used} / {customer.allowance} workspaces
                          </span>
                          <span className="text-[#75786f]">{percent}%</span>
                        </span>
                        <span className="h-1.5 w-full overflow-hidden rounded-full bg-[#ecefe7]">
                          <span
                            className="block h-full rounded-full bg-[#46583b]"
                            style={{ width: `${percent}%` }}
                          />
                        </span>
                      </span>
                    </td>
                    <td className="px-3 py-4 font-inter text-xs tabular-nums text-[#444840]">
                      {customer.date}
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9e8c7] px-2.5 py-1 font-inter text-[11px] font-semibold text-[#5b694e]">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#2f4126]"
                          aria-hidden="true"
                        />
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 pl-3 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="rounded px-2 py-1 font-inter text-xs font-semibold text-[#46583b] transition-colors duration-150 motion-reduce:transition-none hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                        >
                          Manage Workspaces
                        </button>
                        <button
                          type="button"
                          className="rounded px-2 py-1 font-inter text-xs font-semibold text-[#556249] transition-colors duration-150 motion-reduce:transition-none hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                        >
                          View Details
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
            No illustrative customers match the current search or filters.
          </p>
        ) : null}
        <div className="flex flex-col gap-3 bg-[#f2f5ed]/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-inter text-xs text-[#556249] transition-colors duration-150 motion-reduce:transition-none hover:text-[#191d18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <History size={15} aria-hidden="true" /> Customer Audit Trail
            </button>
            <span className="text-[#c4c8bd]">·</span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-inter text-xs text-[#556249] transition-colors duration-150 motion-reduce:transition-none hover:text-[#191d18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <ShieldCheck size={15} aria-hidden="true" /> Quota Enforcement Policies
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-inter text-xs tabular-nums text-[#75786f]">
              Illustrative page 1 of 8
            </span>
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
                className="rounded bg-[#46583b] px-2.5 py-0.5 font-inter text-xs font-semibold tabular-nums text-white"
              >
                1
              </button>
              <button
                type="button"
                className="rounded px-2.5 py-0.5 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                2
              </button>
              <button
                type="button"
                className="rounded px-2.5 py-0.5 font-inter text-xs tabular-nums text-[#191d18] hover:bg-[#ecefe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                3
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
        </div>
      </section>

      <aside className="flex flex-col gap-3 rounded-xl bg-[#f2f5ed] p-4 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff] text-[#46583b] shadow-sm">
          <Info size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-sm font-semibold text-[#191d18]">
            Customer &amp; Workspace Policy Notice
          </h2>
          <p className="mt-1 font-inter text-xs leading-relaxed text-[#444840]">
            Each illustrative customer organization may provision workspaces up to its shown
            allowance. Capacity figures in this prototype are illustrative and no change is
            persisted.
          </p>
        </div>
      </aside>
    </div>
  );
}
