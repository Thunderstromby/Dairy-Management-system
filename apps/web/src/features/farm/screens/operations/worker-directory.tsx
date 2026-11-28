import { useState } from 'react';
import {
  BadgeCheck,
  Download,
  FileText,
  LockKeyhole,
  Pencil,
  PersonStanding,
  Printer,
  Search,
  UserPlus,
  UsersRound,
} from 'lucide-react';
import {
  Badge,
  DataTable,
  EmptyState,
  Field,
  FilterBar,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  Stat,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

const workers = [
  {
    id: 'Illustrative',
    name: 'Worker A',
    role: 'Parlor operations',
    department: 'Milking parlor',
    employment: 'Permanent',
    compliance: 'Verified',
    status: 'Active',
  },
  {
    id: 'Illustrative',
    name: 'Worker B',
    role: 'Feeding & nutrition',
    department: 'Nutrition unit',
    employment: 'Permanent',
    compliance: 'Verified',
    status: 'Active',
  },
  {
    id: 'Illustrative',
    name: 'Worker C',
    role: 'Herd health assistant',
    department: 'Health unit',
    employment: 'Contract',
    compliance: 'Pending',
    status: 'Active',
  },
] as const;

export function WorkerDirectoryScreen() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All departments');
  const [employment, setEmployment] = useState('All employment statuses');
  const [page, setPage] = useState(1);

  const visible = workers.filter((worker) => {
    const matches = worker.name.toLowerCase().includes(search.trim().toLowerCase());
    return (
      matches && (employment === 'All employment statuses' || worker.employment === employment)
    );
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workers / Worker Directory"
        title="Farm Workforce Directory & Records"
        description="Illustrative personnel registry with employment status, redacted identification and document compliance."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export
            </button>
            <button type="button" className={primaryButtonClass}>
              <UserPlus size={16} aria-hidden="true" /> Add worker (local preview)
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Workers are records, not login accounts" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        No worker credentials, self-service access or authentication are created. National identity
        numbers are deliberately redacted; no realistic CNIC value appears in this preview.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Registered workers"
          value="Illustrative"
          icon={<UsersRound size={20} />}
          hint="Illustrative roster count"
        />
        <Stat
          label="Active on duty"
          value="Illustrative"
          icon={<PersonStanding size={20} />}
          hint="No live attendance feed"
        />
        <Stat
          label="Documents verified"
          value="Illustrative"
          icon={<BadgeCheck size={20} />}
          hint="Illustrative compliance state"
        />
        <Stat
          label="On leave"
          value="Illustrative"
          tone="tertiary"
          icon={<FileText size={20} />}
          hint="Illustrative status count"
        />
      </div>

      <FilterBar>
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="worker-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search workers
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="worker-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, role or department"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-52">
          <Field label="Department" htmlFor="worker-department">
            <select
              id="worker-department"
              className={selectClass}
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              {['All departments', 'Milking parlor', 'Nutrition unit', 'Health unit'].map(
                (option) => (
                  <option key={option}>{option}</option>
                ),
              )}
            </select>
          </Field>
        </div>
        <div className="w-full sm:w-52">
          <Field label="Employment status" htmlFor="worker-employment">
            <select
              id="worker-employment"
              className={selectClass}
              value={employment}
              onChange={(event) => setEmployment(event.target.value)}
            >
              {['All employment statuses', 'Permanent', 'Contract', 'Seasonal'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
      </FilterBar>

      {visible.length === 0 ? (
        <EmptyState title="No worker records found">
          No illustrative worker records match these filters. Reset the search to view the sample
          roster; no real personnel data is included.
        </EmptyState>
      ) : (
        <DataTable
          headers={[
            'Worker & Role',
            'National ID',
            'Department',
            'Employment',
            'Contact',
            'Compliance',
            'Status',
            'Actions',
          ]}
          caption="Illustrative worker records — identity fields redacted"
        >
          {visible.map((worker, index) => (
            <tr key={`${worker.name}-${index}`}>
              <td className="px-4 py-3">
                <span className="font-semibold text-[#1b1c18]">{worker.name}</span>
                <span className="mt-0.5 block text-xs text-[#444840]">
                  {worker.role} · {worker.id}
                </span>
              </td>
              <td className="px-4 py-3 text-[#444840]">Redacted</td>
              <td className="px-4 py-3">{worker.department}</td>
              <td className="px-4 py-3">
                <Badge tone="neutral">{worker.employment}</Badge>
              </td>
              <td className="px-4 py-3 text-[#444840]">Not shown in preview</td>
              <td className="px-4 py-3">
                <Badge tone={worker.compliance === 'Verified' ? 'secondary' : 'tertiary'}>
                  {worker.compliance}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <Badge tone="secondary">{worker.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label={`View ${worker.name} profile (local preview)`}
                  >
                    <UserPlus size={16} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label={`Manage documents for ${worker.name} (local preview)`}
                  >
                    <FileText size={16} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label={`Edit ${worker.name} (local preview)`}
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
      <Pagination page={page} pageCount={7} onChange={setPage} />
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no worker record, document or credential is created.
      </p>
    </div>
  );
}

export default WorkerDirectoryScreen;
