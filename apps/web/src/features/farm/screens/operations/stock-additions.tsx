import { useState } from 'react';
import {
  CircleAlert,
  ClipboardList,
  Download,
  LockKeyhole,
  ShieldCheck,
  Sprout,
  Warehouse,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  SectionTitle,
  SelectField,
  TextField,
  primaryButtonClass,
  secondaryButtonClass,
} from './OperationsPrimitives';

const history = [
  {
    id: 'Illustrative',
    when: 'Illustrative',
    item: 'Feed item A',
    qty: 'Illustrative',
    unit: 'kg',
    destination: 'Storage zone A',
    reason: 'Farm-grown harvest',
    operator: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    when: 'Illustrative',
    item: 'Feed item B',
    qty: 'Illustrative',
    unit: 'kg',
    destination: 'Storage zone A',
    reason: 'Farm-grown harvest',
    operator: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    when: 'Illustrative',
    item: 'Medicine item A',
    qty: 'Illustrative',
    unit: 'vials',
    destination: 'Chilled store',
    reason: 'Direct purchase top-up',
    operator: 'Farm Admin',
  },
] as const;

export function StockAdditionsScreen() {
  const [item, setItem] = useState('Feed item A');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('Farm-grown harvest');
  const [destination, setDestination] = useState('Storage zone A');
  const [lot, setLot] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Operations & Assets / Inventory / Stock Additions"
        title="Inventory Stock Additions"
        description="Authorized manual stock top-ups and un-invoiced inventory increments. Illustrative entries only."
        badge="Farm Admin Access"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <ClipboardList size={16} aria-hidden="true" /> Addition log
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export history
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="No projected balance is calculated" variant="warning">
        <CircleAlert size={12} className="mr-1 inline" aria-hidden="true" />
        The source design previews a projected stock total and threshold re-evaluation. Those are
        unapproved calculations; this screen records only illustrative entry fields.
      </Notice>

      <Card
        title="Quick Stock Addition"
        subtitle="Illustrative form — no inventory balance is changed"
      >
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <SelectField
            id="addition-item"
            label="Select inventory item"
            value={item}
            onChange={setItem}
            options={['Feed item A', 'Feed item B', 'Medicine item A', 'Other supply A']}
            required
          />
          <TextField
            id="addition-quantity"
            label="Addition quantity"
            type="number"
            value={quantity}
            onChange={setQuantity}
            placeholder="Illustrative"
            required
          />
          <SelectField
            id="addition-unit"
            label="Configured unit"
            value="kg"
            onChange={() => undefined}
            options={['kg', 'Litres', 'vials', 'box']}
            hint="Locked to the master item definition in the real system."
          />
          <SelectField
            id="addition-reason"
            label="Addition source / reason"
            value={reason}
            onChange={setReason}
            options={[
              'Farm-grown harvest',
              'Direct purchase top-up',
              'Supplier sample',
              'Internal re-allocation',
            ]}
            required
          />
          <SelectField
            id="addition-destination"
            label="Destination storage"
            value={destination}
            onChange={setDestination}
            options={['Storage zone A', 'Chilled store', 'Supply room']}
            required
          />
          <TextField
            id="addition-lot"
            label="Batch / lot identifier"
            value={lot}
            onChange={setLot}
            placeholder="Illustrative reference"
          />
          <div className="flex items-end gap-2 sm:col-span-2">
            <button type="button" className={secondaryButtonClass}>
              Cancel / reset
            </button>
            <button type="submit" className={primaryButtonClass}>
              Confirm addition (local preview)
            </button>
          </div>
        </form>
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#c4c8bd] pt-4">
          <Badge tone="secondary">
            <ShieldCheck size={12} aria-hidden="true" /> Illustrative healthy stock indication
          </Badge>
          <Badge tone="neutral">
            <Sprout size={12} aria-hidden="true" /> No automatic status change
          </Badge>
        </div>
      </Card>

      <Notice title="Automated re-evaluation is not implemented" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Stock additions do not automatically clear alerts, update balances or propagate to feeding
        modules in this preview.
      </Notice>

      <div className="mt-8">
        <SectionTitle note="Illustrative records">Stock Additions History</SectionTitle>
        <DataTable
          headers={[
            'Addition ID',
            'Timestamp',
            'Item & Category',
            'Quantity Added',
            'Destination',
            'Operator',
            'Source / Reason',
          ]}
          caption="Illustrative addition history — no checksums or balances are generated"
        >
          {history.map((row, index) => (
            <tr key={`${row.id}-${index}`}>
              <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
              <td className="px-4 py-3">{row.when}</td>
              <td className="px-4 py-3">{row.item}</td>
              <td className="px-4 py-3">
                {row.qty} {row.unit}
              </td>
              <td className="px-4 py-3">
                <Warehouse size={12} className="mr-1 inline" aria-hidden="true" />
                {row.destination}
              </td>
              <td className="px-4 py-3">{row.operator}</td>
              <td className="px-4 py-3">
                <Badge tone="neutral">{row.reason}</Badge>
              </td>
            </tr>
          ))}
        </DataTable>
        <Pagination page={page} pageCount={5} onChange={setPage} />
      </div>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no stock addition is persisted.
      </p>
    </div>
  );
}

export default StockAdditionsScreen;
