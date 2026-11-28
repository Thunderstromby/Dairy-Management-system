import { useState } from 'react';
import {
  Archive,
  Download,
  Filter,
  LockKeyhole,
  Plus,
  Search,
  Tractor,
  Wrench,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
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

const equipment = [
  {
    tag: 'Illustrative',
    name: 'Equipment A',
    category: 'Tractors & tillage',
    qty: 'Illustrative',
    condition: 'Good',
    serviced: 'Illustrative',
    station: 'Station A',
  },
  {
    tag: 'Illustrative',
    name: 'Equipment B',
    category: 'Milking systems',
    qty: 'Illustrative',
    condition: 'Needs maintenance',
    serviced: 'Illustrative',
    station: 'Station B',
  },
  {
    tag: 'Illustrative',
    name: 'Equipment C',
    category: 'Feeding & TMR',
    qty: 'Illustrative',
    condition: 'Good',
    serviced: 'Illustrative',
    station: 'Station C',
  },
] as const;

export function EquipmentListScreen() {
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('All conditions');
  const [showRegister, setShowRegister] = useState(false);
  const [archive, setArchive] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const visible = equipment.filter((row) => {
    const matches = row.name.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (condition === 'All conditions' || row.condition === condition);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Assets / Equipment / Equipment List"
        title="Farm Equipment & Machinery Inventory"
        description="Illustrative asset register with condition, service and station references."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Filter size={16} aria-hidden="true" /> Filter
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export
            </button>
            <button
              type="button"
              className={primaryButtonClass}
              onClick={() => setShowRegister((value) => !value)}
            >
              <Plus size={16} aria-hidden="true" /> Register equipment
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Equipment governance" variant="warning">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Farm Admin controls registration, editing and archiving. Supervisors may view equipment and
        record maintenance or usage only. Permanent deletion or disposal is not available here.
      </Notice>

      {showRegister ? (
        <Card
          title="Register Equipment Asset"
          subtitle="Illustrative form — no asset is created"
          actions={
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setShowRegister(false)}
            >
              Cancel
            </button>
          }
        >
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <TextField
              id="equipment-name"
              label="Equipment name & model"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative equipment"
              required
            />
            <SelectField
              id="equipment-type"
              label="Equipment type / category"
              value="Milking systems"
              onChange={() => undefined}
              options={[
                'Tractors & tillage',
                'Milking systems',
                'Feeding & TMR',
                'Storage & cooling',
                'Sanitation',
              ]}
              required
            />
            <TextField
              id="equipment-tag"
              label="Asset tag / serial prefix"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative tag"
              required
            />
            <TextField
              id="equipment-qty"
              label="Quantity (units)"
              type="number"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative"
              required
            />
            <SelectField
              id="equipment-condition"
              label="Initial operational condition"
              value="Good"
              onChange={() => undefined}
              options={['Good', 'Needs maintenance', 'Under repair']}
              required
            />
            <TextField
              id="equipment-vendor"
              label="Manufacturer / vendor"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative vendor"
            />
            <div className="flex items-end gap-2 sm:col-span-2">
              <button type="submit" className={primaryButtonClass}>
                Save &amp; commission (local preview)
              </button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Registered assets', icon: <Tractor size={20} /> },
          { label: 'Operational', icon: <Wrench size={20} /> },
          { label: 'Needs maintenance', icon: <Wrench size={20} /> },
          { label: 'Archived', icon: <Archive size={20} /> },
        ].map((item) => (
          <Card key={item.label} title={item.label}>
            <div className="flex items-center justify-between">
              <p className="font-heading text-2xl font-bold text-[#2f4126]">Illustrative</p>
              <span className="text-[#46583b]" aria-hidden="true">
                {item.icon}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="equipment-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search equipment
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="equipment-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search asset tag or name"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-52">
          <Field label="Condition" htmlFor="equipment-condition-filter">
            <select
              id="equipment-condition-filter"
              className={selectClass}
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            >
              {['All conditions', 'Good', 'Needs maintenance', 'Under repair'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div className="mt-5">
        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#c4c8bd] bg-white px-6 py-12 text-center">
            <p className="font-heading text-base font-bold text-[#1b1c18]">No equipment found</p>
            <p className="mt-2 font-inter text-sm text-[#444840]">
              No illustrative asset matches this filter.
            </p>
          </div>
        ) : (
          <DataTable
            headers={[
              'Asset tag',
              'Equipment name & model',
              'Category',
              'Quantity',
              'Condition',
              'Last serviced',
              'Station',
              'Actions',
            ]}
            caption="Illustrative equipment records — no live status"
          >
            {visible.map((row, index) => (
              <tr key={`${row.tag}-${index}`}>
                <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.tag}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">{row.qty}</td>
                <td className="px-4 py-3">
                  <Badge tone={row.condition === 'Good' ? 'secondary' : 'tertiary'}>
                    {row.condition}
                  </Badge>
                </td>
                <td className="px-4 py-3">{row.serviced}</td>
                <td className="px-4 py-3">{row.station}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    className={secondaryButtonClass}
                    onClick={() => setArchive(row.name)}
                  >
                    <Archive size={14} aria-hidden="true" /> Archive
                  </button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
        <Pagination page={page} pageCount={3} onChange={setPage} />
      </div>

      {archive ? (
        <div className="mt-6">
          <Card
            title="Archive Equipment Asset?"
            subtitle={`Illustrative · ${archive}`}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setArchive(null)}
              >
                Cancel
              </button>
            }
          >
            <p className="font-inter text-sm text-[#444840]">
              Archiving would move this asset to historic records and exclude it from active
              schedules. This preview performs no archive or disposal.
            </p>
            <div className="mt-4">
              <button type="button" className={primaryButtonClass} onClick={() => setArchive(null)}>
                Confirm &amp; archive (local preview)
              </button>
            </div>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no equipment record is created, edited or archived.
      </p>
    </div>
  );
}

export default EquipmentListScreen;
