import { useState } from 'react';
import { Download, Filter, LockKeyhole, Scale, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  SelectField,
  TextField,
  primaryButtonClass,
  secondaryButtonClass,
} from './OperationsPrimitives';

const ledger = [
  {
    id: 'Illustrative',
    when: 'Illustrative',
    item: 'Feed item A',
    previous: 'Illustrative',
    corrected: 'Illustrative',
    variance: 'Not computed',
    reason: 'Illustrative audit discrepancy',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    when: 'Illustrative',
    item: 'Feed item B',
    previous: 'Illustrative',
    corrected: 'Illustrative',
    variance: 'Not computed',
    reason: 'Illustrative spoilage note',
    by: 'Farm Admin',
  },
  {
    id: 'Illustrative',
    when: 'Illustrative',
    item: 'Other supply A',
    previous: 'Illustrative',
    corrected: 'Illustrative',
    variance: 'Not computed',
    reason: 'Illustrative data entry correction',
    by: 'Farm Admin',
  },
] as const;

export function StockAdjustmentsScreen() {
  const [item, setItem] = useState('Feed item A');
  const [count, setCount] = useState('');
  const [classification, setClassification] = useState('Physical inventory audit discrepancy');
  const [justification, setJustification] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState(false);

  const visible = ledger.filter((row) =>
    row.item.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Operations & Assets / Inventory / Stock Adjustments"
        title="Stock Adjustments"
        description="Historical stock adjustment ledger and Farm Admin correction form. Every adjustment requires a reason."
        badge="Farm Admin only"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Filter size={16} aria-hidden="true" /> Filter ledger
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export ledger
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Supervisors cannot correct stock" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        This screen is Farm Admin-only. No supervisor-facing correction control is rendered, and the
        form below is a local preview that does not change any recorded physical count.
      </Notice>

      <Card
        title="Correct Physical Stock"
        subtitle="Illustrative form — no variance or balance is computed"
      >
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge tone="container">
            <SlidersHorizontal size={12} aria-hidden="true" /> Form: illustrative adjustment
          </Badge>
          <Badge tone="secondary">
            <ShieldAlert size={12} aria-hidden="true" /> Mandatory justification
          </Badge>
        </div>
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            setFeedback(true);
          }}
        >
          <SelectField
            id="adjustment-item"
            label="Select inventory item / batch"
            value={item}
            onChange={setItem}
            options={['Feed item A', 'Feed item B', 'Medicine item A', 'Other supply A']}
            required
          />
          <TextField
            id="adjustment-count"
            label="Physical verified count"
            type="number"
            value={count}
            onChange={setCount}
            placeholder="Illustrative"
            required
            hint="No adjusted quantity is stored or derived."
          />
          <SelectField
            id="adjustment-classification"
            label="Variance classification tag"
            value={classification}
            onChange={setClassification}
            options={[
              'Physical inventory audit discrepancy',
              'Moisture / spoilage loss',
              'Damaged packaging',
              'Data entry error correction',
            ]}
            required
          />
          <TextField
            id="adjustment-authorizer"
            label="Authorizing administrator"
            value="Farm Admin (local preview)"
            onChange={() => undefined}
            hint="Read-only in this preview."
          />
          <div className="sm:col-span-2">
            <TextField
              id="adjustment-reason"
              label="Mandatory operational justification"
              value={justification}
              onChange={setJustification}
              placeholder="Illustrative justification"
              required
            />
          </div>
          {feedback ? (
            <p
              role="status"
              className="sm:col-span-2 rounded-lg bg-[#d9e8c7]/60 p-3 font-inter text-sm text-[#2f4126]"
            >
              Local preview only — the adjustment was not applied and no variance was calculated.
            </p>
          ) : null}
          <div className="flex items-end gap-2 sm:col-span-2">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setFeedback(false)}
            >
              Reset form
            </button>
            <button type="submit" className={primaryButtonClass}>
              Save adjustment (local preview)
            </button>
          </div>
        </form>
      </Card>

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
            Historical Stock Adjustments Ledger
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="adjustment-filter" className="font-inter text-xs text-[#444840]">
              Filter ledger
            </label>
            <input
              id="adjustment-filter"
              type="search"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Illustrative search"
              className="h-9 w-52 rounded-lg border border-[#c4c8bd] bg-white px-3 font-inter text-sm"
            />
          </div>
        </div>
        <DataTable
          headers={[
            'Adjustment ID',
            'Date & Time',
            'Item',
            'Previous',
            'Corrected',
            'Net Variance',
            'Justification',
            'Authorized By',
          ]}
          caption="Illustrative adjustments — variance and checksum fields are intentionally omitted"
        >
          {visible.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-[#444840]">
                No illustrative adjustments match this filter.
              </td>
            </tr>
          ) : (
            visible.map((row, index) => (
              <tr key={`${row.id}-${index}`}>
                <td className="px-4 py-3 font-semibold text-[#2f4126]">{row.id}</td>
                <td className="px-4 py-3">{row.when}</td>
                <td className="px-4 py-3">{row.item}</td>
                <td className="px-4 py-3">{row.previous}</td>
                <td className="px-4 py-3">{row.corrected}</td>
                <td className="px-4 py-3">
                  <Badge tone="outline">{row.variance}</Badge>
                </td>
                <td className="px-4 py-3">{row.reason}</td>
                <td className="px-4 py-3">{row.by}</td>
              </tr>
            ))
          )}
        </DataTable>
        <Pagination page={page} pageCount={3} onChange={setPage} />
      </div>
      <p className="mt-4 flex items-center gap-1 font-inter text-xs text-[#444840]">
        <Scale size={12} aria-hidden="true" /> Local preview only — adjustments are not stored and
        no cryptographic seal is generated.
      </p>
    </div>
  );
}

export default StockAdjustmentsScreen;
