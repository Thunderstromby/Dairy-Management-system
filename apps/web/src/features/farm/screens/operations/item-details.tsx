import { useState } from 'react';
import {
  CalendarClock,
  CircleAlert,
  Download,
  FileText,
  FlaskConical,
  LockKeyhole,
  Package,
  Pencil,
  Plus,
  Printer,
  SlidersHorizontal,
  Warehouse,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Notice,
  PageHeader,
  PreviewNotice,
  SectionTitle,
  secondaryButtonClass,
} from './OperationsPrimitives';

type LedgerTab = 'purchases' | 'adjustments' | 'feeding';

const tabs: ReadonlyArray<{ id: LedgerTab; label: string; count: string }> = [
  { id: 'purchases', label: 'Purchase & Addition History', count: '2' },
  { id: 'adjustments', label: 'Adjustment History', count: '1' },
  { id: 'feeding', label: 'Feeding Reference', count: 'Reference' },
];

export function ItemDetailsScreen() {
  const [tab, setTab] = useState<LedgerTab>('purchases');

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Operations & Assets / Inventory / Item Details"
        title="Feed item B"
        description="Item overview, purchase and addition history, stock adjustments and feeding reference for an illustrative inventory record."
        badge="Farm Admin Access"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Plus size={16} aria-hidden="true" /> Add Stock (local preview)
            </button>
            <button type="button" className={secondaryButtonClass}>
              <SlidersHorizontal size={16} aria-hidden="true" /> Adjust Stock (local preview)
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Pencil size={16} aria-hidden="true" /> Edit Item
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Stock deductions are not automated" variant="warning">
        <FlaskConical size={12} className="mr-1 inline" aria-hidden="true" />
        Feeding allocations and manual usage records are logged independently. No stock deduction,
        variance result or calculated balance is produced in this preview; feeding-to-stock rules
        remain unresolved.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Item identity">
          <div className="flex flex-wrap gap-2">
            <Badge tone="secondary">Feed commodity</Badge>
            <Badge tone="neutral">Raw ingredient</Badge>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Reference</dt>
              <dd className="font-semibold text-[#2f4126]">Illustrative</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Category</dt>
              <dd>Feed</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#444840]">Unit</dt>
              <dd>kg</dd>
            </div>
          </dl>
        </Card>
        <Card title="Current stock">
          <p className="font-heading text-2xl font-bold text-[#ba1a1a]">Illustrative</p>
          <p className="mt-1 font-inter text-xs text-[#444840]">
            No live quantity is connected to this preview.
          </p>
          <div
            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#f0eee8]"
            aria-hidden="true"
          >
            <div className="h-full w-[20%] rounded-full bg-[#ba1a1a]" />
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-[#ba1a1a]">
            <CircleAlert size={12} /> Illustrative low-stock indication
          </p>
        </Card>
        <Card title="Expiry & quality note">
          <p className="flex items-center gap-2 text-sm text-[#1b1c18]">
            <CalendarClock size={16} className="text-[#7a461c]" aria-hidden="true" /> Illustrative
            expiry date
          </p>
          <p className="mt-3 font-inter text-xs leading-relaxed text-[#444840]">
            Quality reference values shown in the source design are treated as illustrative and are
            not used for calculations.
          </p>
        </Card>
        <Card title="Storage & configuration">
          <p className="flex items-center gap-2 text-sm text-[#1b1c18]">
            <Warehouse size={16} className="text-[#46583b]" aria-hidden="true" /> Illustrative
            storage location
          </p>
          <p className="mt-3 font-inter text-xs leading-relaxed text-[#444840]">
            The configured unit is displayed from the master item definition. No automatic unit
            conversion is performed.
          </p>
        </Card>
      </div>

      <Card
        title="Ledger inspector"
        subtitle="Tabs switch illustrative record sets only — nothing is saved"
      >
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Item ledger sections">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={
                tab === item.id
                  ? 'rounded-lg bg-[#46583b] px-3 py-2 font-inter text-sm font-semibold text-white transition-colors duration-200 motion-reduce:transition-none'
                  : 'rounded-lg bg-[#f0eee8] px-3 py-2 font-inter text-sm text-[#444840] transition-colors duration-200 hover:bg-[#eae8e2] motion-reduce:transition-none'
              }
            >
              {item.label}{' '}
              <span className="ml-1 rounded-full bg-white/70 px-1.5 py-0.5 text-xs">
                {item.count}
              </span>
            </button>
          ))}
          <button
            type="button"
            className={secondaryButtonClass}
            aria-label="Export ledger (local preview)"
          >
            <Download size={16} />
          </button>
        </div>

        {tab === 'purchases' ? (
          <div role="tabpanel">
            <SectionTitle note="Illustrative records">Purchase & Addition History</SectionTitle>
            <DataTable
              headers={[
                'Date',
                'PO / Invoice Ref',
                'Supplier',
                'Quantity Added',
                'Unit Cost',
                'Received By',
                'Storage',
              ]}
            >
              <tr>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Supplier A</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Farm Admin</td>
                <td className="px-4 py-3">Storage A</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Supplier B</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Farm Admin</td>
                <td className="px-4 py-3">Storage A</td>
              </tr>
            </DataTable>
          </div>
        ) : null}

        {tab === 'adjustments' ? (
          <div role="tabpanel">
            <SectionTitle note="Farm Admin only · illustrative">Adjustment History</SectionTitle>
            <Notice title="Corrections are local preview only" variant="restricted">
              <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
              <FileText size={12} className="mr-1 inline" aria-hidden="true" />
              Physical stock corrections require Farm Admin authority. Variance figures and
              cryptographic stamps from the source design are omitted because no calculation or
              ledger seal is implemented here.
            </Notice>
            <DataTable
              headers={[
                'Timestamp',
                'Adjustment ID',
                'Prior Stock',
                'Corrected',
                'Net Variance',
                'Justification',
                'Authorized By',
              ]}
            >
              <tr>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3 text-[#ba1a1a]">Not computed</td>
                <td className="px-4 py-3">Illustrative reason</td>
                <td className="px-4 py-3">Farm Admin</td>
              </tr>
            </DataTable>
          </div>
        ) : null}

        {tab === 'feeding' ? (
          <div role="tabpanel">
            <SectionTitle note="Illustrative reference only">Feeding Reference</SectionTitle>
            <DataTable
              headers={[
                'Daily Schedule',
                'Target Group',
                'Ration Reference',
                'Planned Allocation',
                'Station',
                'Accounting State',
              ]}
            >
              <tr>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Group A</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Station A</td>
                <td className="px-4 py-3">
                  <Badge tone="neutral">No deduction applied</Badge>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Group B</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Illustrative</td>
                <td className="px-4 py-3">Station B</td>
                <td className="px-4 py-3">
                  <Badge tone="neutral">No deduction applied</Badge>
                </td>
              </tr>
            </DataTable>
          </div>
        ) : null}
      </Card>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        <Package size={12} className="mr-1 inline" aria-hidden="true" />
        Local preview only — viewing, filtering and form controls do not alter inventory records.
      </p>
    </div>
  );
}

export default ItemDetailsScreen;
