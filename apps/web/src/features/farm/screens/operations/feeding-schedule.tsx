import { useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  Info,
  Plus,
  Printer,
  RotateCcw,
  Sun,
  Users,
} from 'lucide-react';
import {
  Badge,
  Card,
  EmptyState,
  Field,
  Notice,
  PageHeader,
  PreviewNotice,
  SelectField,
  TextField,
  containerButtonClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

type Shift = 'all' | 'morning' | 'midday' | 'evening';

const shifts: ReadonlyArray<{ id: Shift; label: string; detail: string }> = [
  { id: 'all', label: 'All shifts', detail: 'Illustrative' },
  { id: 'morning', label: 'Morning', detail: '05:00 – 08:30' },
  { id: 'midday', label: 'Custom / Midday', detail: 'Specialized' },
  { id: 'evening', label: 'Evening', detail: '16:00 – 19:30' },
];

const runs = [
  {
    id: 'Illustrative',
    shift: 'morning',
    title: 'Morning Feeding Shift',
    group: 'Group A',
    portion: 'Illustrative head count',
    plan: 'Illustrative plan',
    station: 'Station A',
    status: 'Completed',
  },
  {
    id: 'Illustrative',
    shift: 'midday',
    title: 'Custom / Midday Specialized Shift',
    group: 'Group B',
    portion: 'Illustrative head count',
    plan: 'Illustrative plan',
    station: 'Station B',
    status: 'In progress',
  },
  {
    id: 'Illustrative',
    shift: 'evening',
    title: 'Evening Feeding Shift',
    group: 'Group C',
    portion: 'Illustrative head count',
    plan: 'Illustrative plan',
    station: 'Station C',
    status: 'Scheduled',
  },
] as const;

export function FeedingScheduleScreen() {
  const [shift, setShift] = useState<Shift>('all');
  const [group, setGroup] = useState('All groups');
  const [feed, setFeed] = useState('All rations');
  const [status, setStatus] = useState('All statuses');
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const visible = runs.filter((run) => {
    const matchesShift = shift === 'all' || run.shift === shift;
    const matchesStatus = status === 'All statuses' || run.status === status;
    return matchesShift && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Feeding Management / Feeding Schedule"
        title="Feeding Schedule"
        description="Default morning and evening windows, custom slots and the linked illustrative feeding plan for each run."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Printer size={16} aria-hidden="true" /> Print
            </button>
            <button type="button" className={secondaryButtonClass}>
              <CalendarDays size={16} aria-hidden="true" /> Day view
            </button>
            <button type="button" className={primaryButtonClass} onClick={() => setShowForm(true)}>
              <Plus size={16} aria-hidden="true" /> Add scheduled run
            </button>
          </>
        }
      />
      <PreviewNotice />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Scheduled runs">
          <p className="font-heading text-2xl font-bold text-[#2f4126]">Illustrative</p>
          <Badge tone="neutral">Morning · Evening · Custom</Badge>
        </Card>
        <Card title="Planned allocation">
          <p className="font-heading text-2xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">No quantity is derived.</p>
        </Card>
        <Card title="Assigned groups">
          <p className="font-heading text-2xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">Group assignments are illustrative.</p>
        </Card>
        <Card title="Completion">
          <p className="font-heading text-2xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">No real progress is tracked.</p>
        </Card>
      </div>

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Shift filter">
        {shifts.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={shift === item.id}
            onClick={() => setShift(item.id)}
            className={
              shift === item.id
                ? 'rounded-lg bg-[#2f4126] px-3 py-2 font-inter text-sm font-semibold text-white transition-colors duration-200 motion-reduce:transition-none'
                : 'rounded-lg bg-white px-3 py-2 font-inter text-sm text-[#444840] transition-colors duration-200 hover:bg-[#f0eee8] motion-reduce:transition-none'
            }
          >
            {item.label} <span className="ml-1 text-xs opacity-80">{item.detail}</span>
          </button>
        ))}
      </div>

      <Card
        title="Shift Roster"
        subtitle="Illustrative date navigation"
        actions={
          <div className="flex items-center gap-1">
            <button type="button" className={secondaryButtonClass} aria-label="Previous day">
              <ChevronLeft size={16} />
            </button>
            <span className="px-2 font-inter text-sm text-[#1b1c18]">
              <CalendarDays size={14} className="mr-1 inline" aria-hidden="true" />
              Illustrative date
            </span>
            <button type="button" className={secondaryButtonClass} aria-label="Next day">
              <ChevronRight size={16} />
            </button>
            <button type="button" className={secondaryButtonClass}>
              Today
            </button>
          </div>
        }
      >
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Animal / group" htmlFor="schedule-group">
            <select
              id="schedule-group"
              className={selectClass}
              value={group}
              onChange={(event) => setGroup(event.target.value)}
            >
              {['All groups', 'Group A', 'Group B', 'Group C'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Feed item" htmlFor="schedule-feed">
            <select
              id="schedule-feed"
              className={selectClass}
              value={feed}
              onChange={(event) => setFeed(event.target.value)}
            >
              {['All rations', 'Feed item A', 'Feed item B', 'Feed item C'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Status" htmlFor="schedule-status">
            <select
              id="schedule-status"
              className={selectClass}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {['All statuses', 'Completed', 'In progress', 'Scheduled'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <div className="flex items-end">
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setGroup('All groups');
                setFeed('All rations');
                setStatus('All statuses');
                setShift('all');
              }}
            >
              <RotateCcw size={16} aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        {visible.length === 0 ? (
          <EmptyState title="No feeding runs scheduled for this shift">
            No illustrative runs match the selected shift and status. Reset the filters or add a
            local scheduled run; nothing is persisted in this preview.
          </EmptyState>
        ) : (
          <ul className="grid gap-4 lg:grid-cols-2">
            {visible.map((run, index) => (
              <li
                key={`${run.id}-${index}`}
                className="rounded-xl border border-[#c4c8bd] bg-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="flex items-center gap-2 font-heading text-base font-bold text-[#1b1c18]">
                      {run.shift === 'morning' ? (
                        <Sun size={16} className="text-[#7a461c]" aria-hidden="true" />
                      ) : (
                        <Clock3 size={16} className="text-[#46583b]" aria-hidden="true" />
                      )}
                      {run.title}
                    </h3>
                    <p className="mt-1 font-inter text-xs text-[#444840]">
                      {run.id} · {run.plan}
                    </p>
                  </div>
                  <Badge
                    tone={
                      run.status === 'Completed'
                        ? 'secondary'
                        : run.status === 'Scheduled'
                          ? 'neutral'
                          : 'container'
                    }
                  >
                    {run.status}
                  </Badge>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={14} aria-hidden="true" /> {run.group}
                  </div>
                  <div>{run.portion}</div>
                  <div className="flex items-center gap-2">
                    <ClipboardList size={14} aria-hidden="true" /> {run.station}
                  </div>
                  <div>Illustrative quantity</div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={secondaryButtonClass}
                    onClick={() => setSelected(run.id)}
                  >
                    View details
                  </button>
                  <button type="button" className={secondaryButtonClass}>
                    <CheckCircle2 size={14} aria-hidden="true" /> Edit slot (local preview)
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {selected ? (
        <div className="mt-6">
          <Card
            title="Schedule Details"
            subtitle={`Illustrative run ${selected}`}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            }
          >
            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Shift</dt>
                <dd>Illustrative</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Status</dt>
                <dd>Illustrative</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Feed item</dt>
                <dd>Illustrative</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Quantity</dt>
                <dd>Illustrative</dd>
              </div>
            </dl>
            <p className="mt-4 font-inter text-xs text-[#444840]">
              <Info size={12} className="mr-1 inline" aria-hidden="true" /> No feeding plan linkage
              is saved in this preview.
            </p>
          </Card>
        </div>
      ) : null}

      {showForm ? (
        <div className="mt-6">
          <Card
            title="Add Scheduled Feeding Run"
            subtitle="Illustrative form — no run is created"
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
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <SelectField
                id="run-shift"
                label="Shift selection"
                value="Morning"
                onChange={() => undefined}
                options={['Morning', 'Custom / Midday', 'Evening']}
                required
              />
              <TextField
                id="run-time"
                label="Scheduled time"
                type="time"
                value=""
                onChange={() => undefined}
                required
              />
              <SelectField
                id="run-group"
                label="Target animal / pen group"
                value="Group A"
                onChange={() => undefined}
                options={['Group A', 'Group B', 'Group C']}
                required
              />
              <SelectField
                id="run-feed"
                label="Feed item"
                value="Feed item A"
                onChange={() => undefined}
                options={['Feed item A', 'Feed item B', 'Feed item C']}
                required
              />
              <TextField
                id="run-quantity"
                label="Planned quantity"
                type="number"
                value=""
                onChange={() => undefined}
                placeholder="Illustrative"
                required
              />
              <SelectField
                id="run-operator"
                label="Assigned feeder"
                value="Worker A"
                onChange={() => undefined}
                options={['Worker A', 'Worker B', 'Worker C']}
                required
              />
              <SelectField
                id="run-plan"
                label="Feeding plan association"
                value="Illustrative plan"
                onChange={() => undefined}
                options={['Illustrative plan', 'Illustrative individual plan']}
                required
              />
              <div className="flex items-end gap-2 sm:col-span-2">
                <button type="submit" className={containerButtonClass}>
                  Save run (local preview)
                </button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
      <Notice title="Frontend-only scheduling" variant="restricted">
        Shift tabs, filters and the add-run form are local interactions. No run is dispatched and no
        schedule data is stored.
      </Notice>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — illustrations do not represent live feeding activity.
      </p>
    </div>
  );
}

export default FeedingScheduleScreen;
