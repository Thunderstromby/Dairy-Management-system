import { useState } from 'react';
import { ClipboardList, Download, Info, LockKeyhole, Search, Timer, Tractor } from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  EmptyState,
  Field,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  SelectField,
  TextField,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

const logs = [
  {
    id: 'Illustrative',
    date: 'Illustrative',
    equipment: 'Equipment A',
    operator: 'Worker A',
    hours: 'Illustrative',
    purpose: 'Illustrative purpose',
    zone: 'Illustrative zone',
    condition: 'Good',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    equipment: 'Equipment B',
    operator: 'Worker B',
    hours: 'Illustrative',
    purpose: 'Illustrative purpose',
    zone: 'Illustrative zone',
    condition: 'Good',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    equipment: 'Equipment C',
    operator: 'Worker C',
    hours: 'Illustrative',
    purpose: 'Illustrative purpose',
    zone: 'Illustrative zone',
    condition: 'Needs maintenance',
  },
] as const;

export function UsageRecordsScreen() {
  const [search, setSearch] = useState('');
  const [equipment, setEquipment] = useState('All equipment');
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const visible = logs.filter((row) => {
    const matches = row.equipment.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (equipment === 'All equipment' || row.equipment === equipment);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Assets / Equipment / Usage Records"
        title="Farm Equipment Usage & Operational Activity Records"
        description="Illustrative manual shift records. No telemetry, hour-meter sync or automated cost apportionment."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export
            </button>
            <button
              type="button"
              className={primaryButtonClass}
              onClick={() => setShowForm((value) => !value)}
            >
              <ClipboardList size={16} aria-hidden="true" /> Log machine usage
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Operational boundary" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Live GPS, electronic tachograph sync, automated hour meters and IoT engine diagnostics are
        excluded. Farm Admin and Supervisor may log manual usage; no running cost is apportioned.
      </Notice>

      {showForm ? (
        <Card
          title="Log Farm Machine Usage Record"
          subtitle="Illustrative form — no usage log is stored"
          actions={
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          }
        >
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <SelectField
              id="usage-equipment"
              label="Equipment reference & asset tag"
              value="Equipment A"
              onChange={() => undefined}
              options={['Equipment A', 'Equipment B', 'Equipment C']}
              required
            />
            <TextField
              id="usage-date"
              label="Usage date"
              type="date"
              value=""
              onChange={() => undefined}
              required
            />
            <SelectField
              id="usage-shift"
              label="Shift"
              value="Morning"
              onChange={() => undefined}
              options={['Morning', 'Evening', 'Custom']}
              required
            />
            <SelectField
              id="usage-operator"
              label="Operator"
              value="Worker A"
              onChange={() => undefined}
              options={['Worker A', 'Worker B', 'Worker C']}
              required
            />
            <TextField
              id="usage-hours"
              label="Recorded hours"
              type="number"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative"
              required
            />
            <TextField
              id="usage-zone"
              label="Location / zone"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative zone"
            />
            <div className="sm:col-span-2">
              <TextField
                id="usage-purpose"
                label="Operational purpose & scope"
                value=""
                onChange={() => undefined}
                placeholder="Illustrative purpose"
              />
            </div>
            <div className="flex items-end gap-2 sm:col-span-2">
              <button type="submit" className={primaryButtonClass}>
                Save usage record (local preview)
              </button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="usage-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search usage logs
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="usage-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search equipment or operator"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-52">
          <Field label="Equipment" htmlFor="usage-filter">
            <select
              id="usage-filter"
              className={selectClass}
              value={equipment}
              onChange={(event) => setEquipment(event.target.value)}
            >
              {['All equipment', 'Equipment A', 'Equipment B', 'Equipment C'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-5">
        {visible.length === 0 ? (
          <EmptyState title="No equipment usage records found">
            No illustrative operating runs match this filter. Create a local log entry using the
            form above; nothing is saved.
          </EmptyState>
        ) : (
          <DataTable
            headers={[
              'Log ID',
              'Date & shift',
              'Equipment & tag',
              'Operator',
              'Hours',
              'Purpose',
              'Zone',
              'Condition',
              'Actions',
            ]}
            caption="Illustrative manual usage records — no telemetry"
          >
            {visible.map((row, index) => (
              <tr key={`${row.id}-${index}`}>
                <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
                <td className="px-4 py-3">{row.date} · Illustrative shift</td>
                <td className="px-4 py-3">
                  <Tractor size={14} className="mr-1 inline" aria-hidden="true" />
                  {row.equipment}
                </td>
                <td className="px-4 py-3">{row.operator}</td>
                <td className="px-4 py-3">
                  <Timer size={12} className="mr-1 inline" aria-hidden="true" />
                  {row.hours}
                </td>
                <td className="px-4 py-3">{row.purpose}</td>
                <td className="px-4 py-3">{row.zone}</td>
                <td className="px-4 py-3">
                  <Badge tone={row.condition === 'Good' ? 'secondary' : 'tertiary'}>
                    {row.condition}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className={secondaryButtonClass}
                    aria-label="Inspect usage record (local preview)"
                  >
                    <ClipboardList size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
        <Pagination page={page} pageCount={6} onChange={setPage} />
      </div>

      <div className="mt-6">
        <Card title="Cross-module notes">
          <p className="flex items-center gap-2 font-inter text-sm text-[#444840]">
            <Info size={16} aria-hidden="true" />
            The source export correlates usage with milk volume and fuel cost. Those automatic
            allocations are not implemented; all values here are illustrative.
          </p>
        </Card>
      </div>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no usage record is persisted.
      </p>
    </div>
  );
}

export default UsageRecordsScreen;
