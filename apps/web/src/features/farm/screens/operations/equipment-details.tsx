import { useState } from 'react';
import {
  CalendarClock,
  CircleAlert,
  ClipboardList,
  Gauge,
  Pencil,
  Printer,
  Wrench,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Notice,
  PageHeader,
  PreviewNotice,
  SelectField,
  TextField,
  primaryButtonClass,
  secondaryButtonClass,
} from './OperationsPrimitives';

const maintenance = [
  {
    date: 'Illustrative',
    title: 'Illustrative periodic service',
    note: 'Illustrative technician note',
    condition: 'Good',
  },
  {
    date: 'Illustrative',
    title: 'Illustrative seal replacement',
    note: 'Illustrative technician note',
    condition: 'Good',
  },
  {
    date: 'Illustrative',
    title: 'Illustrative alignment adjustment',
    note: 'Illustrative technician note',
    condition: 'Needs maintenance',
  },
] as const;

export function EquipmentDetailsScreen() {
  const [showEntry, setShowEntry] = useState(false);
  const [condition, setCondition] = useState('Good');
  const [feedback, setFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Assets / Equipment / Equipment Details"
        title="Equipment A"
        description="Illustrative equipment profile with factory specifications, maintenance and usage summaries."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Pencil size={16} aria-hidden="true" /> Edit (local preview)
            </button>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Condition and usage references are illustrative" variant="warning">
        <CircleAlert size={12} className="mr-1 inline" aria-hidden="true" />
        No depreciation, runtime total or automated condition change is calculated. Supervisors may
        record maintenance and usage; master edits remain Farm Admin-only.
      </Notice>

      <Card title="Equipment overview" subtitle="Illustrative master record">
        <div className="flex flex-wrap gap-2">
          <Badge tone="secondary">Operational</Badge>
          <Badge tone="neutral">Illustrative category</Badge>
          <Badge tone="tertiary">Condition: Good</Badge>
        </div>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Asset reference', 'Illustrative'],
            ['Model year', 'Illustrative'],
            ['Serial reference', 'Illustrative'],
            ['Deployed units', 'Illustrative'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-[#fbf9f3] p-3">
              <dt className="font-inter text-xs uppercase tracking-wider text-[#444840]">
                {label}
              </dt>
              <dd className="mt-1 font-heading text-sm font-bold text-[#1b1c18]">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Factory Specifications & Engineering Ratings">
          <p className="font-inter text-sm text-[#444840]">
            Illustrative specifications only. No rating, tolerance or engineering value is asserted.
          </p>
          <div className="mt-4 flex items-center gap-2 font-inter text-xs text-[#444840]">
            <Gauge size={14} aria-hidden="true" /> Reference data: illustrative
          </div>
        </Card>
        <Card title="Maintenance Summary" subtitle="Illustrative recent logs">
          <p className="font-heading text-xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 font-inter text-xs text-[#444840]">
            Showing illustrative recent entries; no schedule is derived.
          </p>
          <button
            type="button"
            className={secondaryButtonClass + ' mt-4'}
            onClick={() => setShowEntry((value) => !value)}
          >
            <Wrench size={14} aria-hidden="true" /> Quick maintenance entry
          </button>
        </Card>
      </div>

      {showEntry ? (
        <div className="mt-6">
          <Card
            title="Quick Maintenance Entry"
            subtitle="Illustrative form — no maintenance log is created"
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setShowEntry(false)}
              >
                Cancel
              </button>
            }
          >
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setFeedback(true);
              }}
            >
              <TextField
                id="maintenance-date"
                label="Maintenance date"
                type="date"
                value=""
                onChange={() => undefined}
                required
              />
              <SelectField
                id="maintenance-condition"
                label="Condition after service"
                value={condition}
                onChange={setCondition}
                options={['Good', 'Needs maintenance', 'Under repair']}
                required
              />
              <div className="sm:col-span-2">
                <TextField
                  id="maintenance-description"
                  label="Work performed"
                  value=""
                  onChange={() => undefined}
                  placeholder="Illustrative description"
                  required
                />
              </div>
              {feedback ? (
                <p
                  role="status"
                  className="sm:col-span-2 rounded-lg bg-[#d9e8c7]/50 p-3 font-inter text-sm text-[#2f4126]"
                >
                  Local preview only — no maintenance record or equipment status was saved.
                </p>
              ) : null}
              <div className="flex items-end gap-2 sm:col-span-2">
                <button type="submit" className={primaryButtonClass}>
                  Save entry (local preview)
                </button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-heading text-lg font-bold text-[#1b1c18]">Maintenance history</h2>
          <Badge tone="outline">Illustrative</Badge>
        </div>
        <DataTable headers={['Date', 'Service', 'Technician note', 'Condition after']}>
          {maintenance.map((row, index) => (
            <tr key={`${row.date}-${index}`}>
              <td className="px-4 py-3">{row.date}</td>
              <td className="px-4 py-3">{row.title}</td>
              <td className="px-4 py-3">{row.note}</td>
              <td className="px-4 py-3">
                <Badge tone={row.condition === 'Good' ? 'secondary' : 'tertiary'}>
                  {row.condition}
                </Badge>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>

      <div className="mt-6">
        <Card title="Usage Summary">
          <p className="font-heading text-xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 font-inter text-xs text-[#444840]">
            <CalendarClock size={12} className="mr-1 inline" aria-hidden="true" />
            <ClipboardList size={12} className="mr-1 inline" aria-hidden="true" />
            Recorded usage is illustrative; no hour or cost total is derived.
          </p>
        </Card>
      </div>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — equipment details are not persisted.
      </p>
    </div>
  );
}

export default EquipmentDetailsScreen;
