import { useState } from 'react';
import { ClipboardList, Download, Eye, Info, Search, Wrench } from 'lucide-react';
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
    description: 'Illustrative service note',
    condition: 'Good',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    equipment: 'Equipment B',
    description: 'Illustrative service note',
    condition: 'Needs maintenance',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    date: 'Illustrative',
    equipment: 'Equipment C',
    description: 'Illustrative service note',
    condition: 'Good',
    by: 'Farm Admin',
  },
] as const;

export function MaintenanceHistoryScreen() {
  const [search, setSearch] = useState('');
  const [equipment, setEquipment] = useState('All equipment');
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const visible = logs.filter((row) => {
    const matches = row.equipment.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (equipment === 'All equipment' || row.equipment === equipment);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Assets / Equipment / Maintenance History"
        title="Farm Equipment Maintenance History"
        description="Illustrative service log with equipment identification, work performed and condition after service."
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
              <Wrench size={16} aria-hidden="true" /> Record maintenance
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Maintenance protocol" variant="warning">
        <Info size={12} className="mr-1 inline" aria-hidden="true" />
        Supervisors may record maintenance and update condition; master equipment edits remain Farm
        Admin-only. No automatic condition transition or service schedule is derived here.
      </Notice>

      {showForm ? (
        <Card
          title="Record Maintenance Intervention"
          subtitle="Illustrative form — no maintenance log is stored"
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
              id="maintenance-equipment"
              label="Equipment"
              value="Equipment A"
              onChange={() => undefined}
              options={['Equipment A', 'Equipment B', 'Equipment C']}
              required
            />
            <TextField
              id="maintenance-log-date"
              label="Maintenance date"
              type="date"
              value=""
              onChange={() => undefined}
              required
            />
            <div className="sm:col-span-2">
              <TextField
                id="maintenance-log-description"
                label="Maintenance description & work performed"
                value=""
                onChange={() => undefined}
                placeholder="Illustrative description"
                required
              />
            </div>
            <SelectField
              id="maintenance-log-condition"
              label="Condition after repair"
              value="Good"
              onChange={() => undefined}
              options={['Good', 'Needs maintenance', 'Under repair']}
              required
            />
            <TextField
              id="maintenance-log-by"
              label="Serviced / certified by"
              value="Farm Admin"
              onChange={() => undefined}
            />
            <div className="flex items-end gap-2 sm:col-span-2">
              <button type="submit" className={primaryButtonClass}>
                Save log (local preview)
              </button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="maintenance-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search logs
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="maintenance-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search equipment"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-52">
          <Field label="Equipment" htmlFor="maintenance-filter">
            <select
              id="maintenance-filter"
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
          <EmptyState title="No maintenance logs found">
            No illustrative maintenance entries match these filters. Add a local log entry to see
            the form state; nothing is persisted.
          </EmptyState>
        ) : (
          <DataTable
            headers={[
              'Date',
              'Equipment',
              'Maintenance description',
              'Condition after',
              'Recorded by',
              'Actions',
            ]}
            caption="Illustrative maintenance history — reverse chronological sample"
          >
            {visible.map((row, index) => (
              <tr key={`${row.id}-${index}`}>
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.equipment}</td>
                <td className="px-4 py-3">{row.description}</td>
                <td className="px-4 py-3">
                  <Badge tone={row.condition === 'Good' ? 'secondary' : 'tertiary'}>
                    {row.condition}
                  </Badge>
                </td>
                <td className="px-4 py-3">{row.by}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className={secondaryButtonClass}
                    onClick={() => setDetail(row.description)}
                  >
                    <Eye size={14} aria-hidden="true" /> Details
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
        <Pagination page={page} pageCount={4} onChange={setPage} />
      </div>

      {detail ? (
        <div className="mt-6">
          <Card
            title="Maintenance Record Details"
            subtitle={detail}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setDetail(null)}
              >
                Close
              </button>
            }
          >
            <p className="flex items-center gap-2 font-inter text-sm text-[#444840]">
              <ClipboardList size={16} aria-hidden="true" /> Illustrative technician notes only. No
              attachment or certification is available.
            </p>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — maintenance logs are not persisted.
      </p>
    </div>
  );
}

export default MaintenanceHistoryScreen;
