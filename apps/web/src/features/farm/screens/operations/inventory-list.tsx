import { useState } from 'react';
import {
  Boxes,
  CircleAlert,
  Download,
  Eye,
  LockKeyhole,
  PackagePlus,
  Pencil,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Field,
  FilterBar,
  LocalOnlyNote,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  SelectField,
  Stat,
  TextField,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

type Dialog = 'none' | 'register' | 'quick-add';

const rows = [
  {
    name: 'Feed item A',
    detail: 'Bulk forage · storage zone A',
    category: 'Feed',
    unit: 'kg',
    status: 'Adequate',
    expiry: '—',
  },
  {
    name: 'Feed item B',
    detail: 'Protein supplement · storage zone A',
    category: 'Feed',
    unit: 'kg',
    status: 'Low Stock',
    expiry: 'Illustrative',
  },
  {
    name: 'Medicine item A',
    detail: 'Veterinary supply · chilled store',
    category: 'Medicines',
    unit: 'vials',
    status: 'Adequate',
    expiry: 'Illustrative',
  },
  {
    name: 'Other supply A',
    detail: 'Parlor consumable · supply room',
    category: 'Other supplies',
    unit: 'box',
    status: 'Low Stock',
    expiry: '—',
  },
] as const;

export function InventoryListScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Statuses');
  const [location, setLocation] = useState('All Storage Locations');
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<Dialog>('none');

  const visible = rows.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === 'All Categories' || row.category === category;
    const matchesStatus = status === 'All Statuses' || row.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const reset = () => {
    setSearch('');
    setCategory('All Categories');
    setStatus('All Statuses');
    setLocation('All Storage Locations');
  };

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Operations & Assets / Inventory / Inventory List"
        title="Inventory List"
        description="Centralized illustrative records for livestock feed, veterinary medicines and consumable parlor supplies. Farm Admin access only."
        badge="Farm Admin Access"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export Ledger (CSV)
            </button>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setDialog('quick-add')}
            >
              <PackagePlus size={16} aria-hidden="true" /> Quick Stock Addition
            </button>
            <button
              type="button"
              className={primaryButtonClass}
              onClick={() => setDialog('register')}
            >
              <Boxes size={16} aria-hidden="true" /> Add Inventory Item
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Illustrative stock indicators" variant="warning">
        Low-stock and expiry indicators below are illustrative examples. No threshold rule, stock
        deduction or expiry calculation is evaluated in this preview.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Total Tracked Items"
          value="Illustrative"
          icon={<Boxes size={20} />}
          hint="Feed / Medicines / Other — illustrative split"
        />
        <Stat
          label="Low-Stock Alerts"
          value="Illustrative"
          tone="error"
          icon={<CircleAlert size={20} />}
          hint="No live minimum-level comparison"
        />
        <Stat
          label="Expiry Notice"
          value="Illustrative"
          tone="tertiary"
          icon={<ShieldCheck size={20} />}
          hint="Dates are illustrative, not live"
        />
        <Stat
          label="Inventory Valuation"
          value="Illustrative"
          icon={<ShoppingCart size={20} />}
          hint="Farm-configured currency; no totals computed"
        />
      </div>

      <FilterBar>
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="inventory-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search inventory
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="inventory-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search item name, SKU, batch or category"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Field label="Category" htmlFor="inventory-category">
            <select
              id="inventory-category"
              className={selectClass}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {['All Categories', 'Feed', 'Medicines', 'Other supplies'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="w-full sm:w-48">
          <Field label="Status" htmlFor="inventory-status">
            <select
              id="inventory-status"
              className={selectClass}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {['All Statuses', 'Adequate', 'Low Stock'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="w-full sm:w-52">
          <Field label="Storage location" htmlFor="inventory-location">
            <select
              id="inventory-location"
              className={selectClass}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {['All Storage Locations', 'Storage zone A', 'Chilled store', 'Supply room'].map(
                (option) => (
                  <option key={option}>{option}</option>
                ),
              )}
            </select>
          </Field>
        </div>
        <button type="button" className={secondaryButtonClass} onClick={reset}>
          <RotateCcw size={16} aria-hidden="true" /> Reset
        </button>
      </FilterBar>

      <DataTable
        caption="Illustrative inventory records — sample values only, no live stock data"
        headers={[
          'Item Name & Description',
          'Category',
          'Current Quantity',
          'Unit',
          'Minimum Stock Level',
          'Expiry',
          'Threshold Status',
          'Actions',
        ]}
      >
        {visible.length === 0 ? (
          <tr>
            <td colSpan={8} className="px-4 py-10 text-center text-[#444840]">
              No matching inventory records. Adjust the illustrative filters above.
            </td>
          </tr>
        ) : (
          visible.map((row) => (
            <tr
              key={row.name}
              className="transition-colors duration-200 hover:bg-[#f0eee8]/60 motion-reduce:transition-none"
            >
              <td className="px-4 py-3">
                <span className="font-heading font-semibold text-[#1b1c18]">{row.name}</span>
                <span className="mt-0.5 block text-xs text-[#444840]">{row.detail}</span>
              </td>
              <td className="px-4 py-3">
                <Badge tone={row.category === 'Medicines' ? 'tertiary' : 'neutral'}>
                  {row.category}
                </Badge>
              </td>
              <td className="px-4 py-3 font-semibold text-[#2f4126]">Illustrative</td>
              <td className="px-4 py-3">{row.unit}</td>
              <td className="px-4 py-3 text-[#444840]">Illustrative</td>
              <td className="px-4 py-3 text-[#444840]">{row.expiry}</td>
              <td className="px-4 py-3">
                <Badge tone={row.status === 'Adequate' ? 'secondary' : 'error'}>{row.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#46583b]"
                    aria-label={`View details for ${row.name}`}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#46583b]"
                    aria-label={`Edit ${row.name} (local preview)`}
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>
      <Pagination page={page} pageCount={3} onChange={setPage} />
      <Notice title="Role boundary" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Stock corrections are Farm Admin-only and remain local preview actions here. Supervisors do
        not receive correction controls in this screen.
      </Notice>
      <LocalOnlyNote />

      {dialog === 'register' ? (
        <Card
          title="Register New Inventory Item"
          subtitle="Illustrative form — no record is created"
          actions={
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setDialog('none')}
            >
              Close
            </button>
          }
        >
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <TextField
              id="new-item-name"
              label="Item name"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative item name"
              required
            />
            <SelectField
              id="new-item-category"
              label="Category"
              value="Feed"
              onChange={() => undefined}
              options={['Feed', 'Medicines', 'Other supplies']}
              required
            />
            <SelectField
              id="new-item-unit"
              label="Configured unit"
              value="kg"
              onChange={() => undefined}
              options={['kg', 'Litres', 'vials', 'Bags']}
              required
            />
            <TextField
              id="new-item-stock"
              label="Current stock quantity"
              type="number"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative"
              required
            />
            <TextField
              id="new-item-min"
              label="Minimum stock level"
              type="number"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative"
              required
            />
            <TextField
              id="new-item-location"
              label="Storage location notes"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative location"
            />
            <TextField
              id="new-item-expiry"
              label="Optional expiry date"
              type="date"
              value=""
              onChange={() => undefined}
            />
            <div className="flex items-end gap-2 sm:col-span-2">
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setDialog('none')}
              >
                Cancel
              </button>
              <button type="submit" className={primaryButtonClass}>
                Save Item (local preview)
              </button>
            </div>
          </form>
        </Card>
      ) : null}

      {dialog === 'quick-add' ? (
        <Card
          title="Quick Stock Addition"
          subtitle="Illustrative form — no stock balance is changed"
          actions={
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setDialog('none')}
            >
              Close
            </button>
          }
        >
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <SelectField
              id="quick-add-item"
              label="Target inventory item"
              value="Feed item A"
              onChange={() => undefined}
              options={['Feed item A', 'Feed item B', 'Medicine item A', 'Other supply A']}
              required
            />
            <TextField
              id="quick-add-qty"
              label="Quantity to add"
              type="number"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative"
              required
            />
            <TextField
              id="quick-add-reference"
              label="Receiving batch / reference note"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative reference"
            />
            <div className="flex items-end gap-2 sm:col-span-2">
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setDialog('none')}
              >
                Cancel
              </button>
              <button type="submit" className={primaryButtonClass}>
                Confirm Inbound Addition (local preview)
              </button>
            </div>
          </form>
        </Card>
      ) : null}
    </div>
  );
}

export default InventoryListScreen;
