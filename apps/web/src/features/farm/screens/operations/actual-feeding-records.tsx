import { useState } from 'react';
import {
  ClipboardCheck,
  Download,
  FileBarChart,
  Info,
  Plus,
  Scale,
  Search,
  ShieldCheck,
} from 'lucide-react';
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
  containerButtonClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

type Scope = 'single' | 'group';
type Session = 'Morning' | 'Evening' | 'Custom';

const entries = [
  {
    id: 'Illustrative',
    when: 'Illustrative',
    target: 'Animal A',
    scope: 'Individual',
    session: 'Morning',
    item: 'Feed item A',
    planned: 'Illustrative',
    actual: 'Illustrative',
    variance: 'Not computed',
    note: 'Illustrative observation',
  },
  {
    id: 'Illustrative',
    when: 'Illustrative',
    target: 'Group A',
    scope: 'Group',
    session: 'Morning',
    item: 'Feed item B',
    planned: 'Illustrative',
    actual: 'Illustrative',
    variance: 'Not computed',
    note: 'Illustrative observation',
  },
  {
    id: 'Illustrative',
    when: 'Illustrative',
    target: 'Animal B',
    scope: 'Individual',
    session: 'Evening',
    item: 'Feed item C',
    planned: 'Illustrative',
    actual: 'Illustrative',
    variance: 'Not computed',
    note: 'Illustrative observation',
  },
] as const;

export function ActualFeedingRecordsScreen() {
  const [showForm, setShowForm] = useState(true);
  const [scope, setScope] = useState<Scope>('single');
  const [session, setSession] = useState<Session>('Morning');
  const [search, setSearch] = useState('');
  const [sessionFilter, setSessionFilter] = useState('All sessions');
  const [page, setPage] = useState(1);

  const visible = entries.filter((entry) => {
    const matches = entry.target.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (sessionFilter === 'All sessions' || entry.session === sessionFilter);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Feeding Management / Actual Feeding Records"
        title="Actual Feeding Intake & Execution Records"
        description="Log physically delivered feed quantities and keep planned and recorded values distinct. Illustrative records only."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export records
            </button>
            <button type="button" className={secondaryButtonClass}>
              <FileBarChart size={16} aria-hidden="true" /> Variance report
            </button>
            <button
              type="button"
              className={primaryButtonClass}
              onClick={() => setShowForm((value) => !value)}
            >
              <Plus size={16} aria-hidden="true" /> Record feeding
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Feeding does not deduct stock" variant="warning">
        <ShieldCheck size={12} className="mr-1 inline" aria-hidden="true" />
        Actual feeding records are stored independently for nutritional tracking. No inventory stock
        is deducted, and no variance percentage is computed, because integration rules remain
        unresolved.
      </Notice>

      {showForm ? (
        <Card
          title="Record Actual Feeding Entry"
          subtitle="Illustrative form — no feeding record is stored"
        >
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <fieldset className="sm:col-span-2">
              <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#444840]">
                Target feeding scope
              </legend>
              <div className="flex gap-2">
                {(['single', 'group'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={scope === value}
                    onClick={() => setScope(value)}
                    className={
                      scope === value
                        ? 'rounded-lg bg-[#46583b] px-3 py-2 font-inter text-sm font-semibold text-white transition-colors duration-200 motion-reduce:transition-none'
                        : secondaryButtonClass
                    }
                  >
                    {value === 'single' ? 'Single animal' : 'Animal group / pen'}
                  </button>
                ))}
              </div>
            </fieldset>
            <SelectField
              id="feeding-target"
              label={scope === 'single' ? 'Animal selection' : 'Pen / group selection'}
              value={scope === 'single' ? 'Animal A' : 'Group A'}
              onChange={() => undefined}
              options={scope === 'single' ? ['Animal A', 'Animal B'] : ['Group A', 'Group B']}
              required
            />
            <TextField
              id="feeding-date"
              label="Feeding date"
              type="date"
              value=""
              onChange={() => undefined}
              required
            />
            <TextField
              id="feeding-time"
              label="Feeding time"
              type="time"
              value=""
              onChange={() => undefined}
              required
            />
            <fieldset>
              <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#444840]">
                Session
              </legend>
              <div className="flex gap-2">
                {(['Morning', 'Evening', 'Custom'] as const).map((value) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 font-inter text-sm text-[#1b1c18]"
                  >
                    <input
                      type="radio"
                      name="feeding-session"
                      value={value}
                      checked={session === value}
                      onChange={() => setSession(value)}
                      className="h-4 w-4 accent-[#2f4126]"
                    />
                    {value}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="rounded-lg bg-[#d9e8c7]/50 p-3">
              <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#444840]">
                Planned reference
              </p>
              <p className="mt-1 font-heading text-base font-bold text-[#2f4126]">Illustrative</p>
            </div>
            <SelectField
              id="feeding-item"
              label="Feed item"
              value="Feed item A"
              onChange={() => undefined}
              options={['Feed item A', 'Feed item B', 'Feed item C']}
              required
            />
            <TextField
              id="feeding-actual"
              label="Actual delivered"
              type="number"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative"
              required
            />
            <div className="rounded-lg bg-[#f0eee8] p-3">
              <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#444840]">
                Variance
              </p>
              <p className="mt-1 font-inter text-sm text-[#444840]">
                Not computed — no formula approved
              </p>
            </div>
            <SelectField
              id="feeding-operator"
              label="Recorded by"
              value="Farm Admin"
              onChange={() => undefined}
              options={['Farm Admin']}
            />
            <SelectField
              id="feeding-reason"
              label="Variance reason / observation"
              value="Illustrative reason"
              onChange={() => undefined}
              options={[
                'Illustrative reason',
                'Illustrative appetite note',
                'Illustrative bunk note',
              ]}
            />
            <div className="sm:col-span-2">
              <TextField
                id="feeding-notes"
                label="Field notes"
                value=""
                onChange={() => undefined}
                placeholder="Illustrative note"
              />
            </div>
            <div className="flex flex-wrap items-end gap-2 sm:col-span-2">
              <button type="button" className={secondaryButtonClass}>
                Cancel / reset
              </button>
              <button type="button" className={secondaryButtonClass}>
                Save &amp; log next (local preview)
              </button>
              <button type="submit" className={containerButtonClass}>
                Save feeding record (local preview)
              </button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="mt-8">
        <Card
          title="Actual Feeding Ledger"
          subtitle="Illustrative records — planned and actual values are stored separately"
        >
          <div className="mb-5 flex flex-wrap items-end gap-3">
            <div className="min-w-[200px] flex-1">
              <label
                htmlFor="feeding-search"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
              >
                Filter ledger
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-[#444840]"
                  aria-hidden="true"
                />
                <input
                  id="feeding-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Filter by animal, group or feed item"
                  className={inputClass + ' pl-9'}
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Field label="Session" htmlFor="feeding-filter-session">
                <select
                  id="feeding-filter-session"
                  className={selectClass}
                  value={sessionFilter}
                  onChange={(event) => setSessionFilter(event.target.value)}
                >
                  {['All sessions', 'Morning', 'Evening', 'Custom'].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Badge tone="outline">
              <Scale size={12} aria-hidden="true" /> No variance formula active
            </Badge>
          </div>
          {visible.length === 0 ? (
            <EmptyState title="No actual feeding records found">
              No illustrative feeding entries match this filter. Use the entry form above to create
              a local draft; nothing is persisted.
            </EmptyState>
          ) : (
            <DataTable
              headers={[
                'Record ID',
                'Date & Time',
                'Target',
                'Session',
                'Feed Item',
                'Planned',
                'Actual',
                'Variance',
                'Notes',
                'Actions',
              ]}
            >
              {visible.map((entry, index) => (
                <tr key={`${entry.id}-${index}`}>
                  <td className="px-4 py-3 font-semibold text-[#2f4126]">{entry.id}</td>
                  <td className="px-4 py-3">{entry.when}</td>
                  <td className="px-4 py-3">
                    {entry.target}
                    <Badge tone="neutral">{entry.scope}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone="secondary">{entry.session}</Badge>
                  </td>
                  <td className="px-4 py-3">{entry.item}</td>
                  <td className="px-4 py-3">{entry.planned}</td>
                  <td className="px-4 py-3">{entry.actual}</td>
                  <td className="px-4 py-3 text-[#444840]">{entry.variance}</td>
                  <td className="px-4 py-3">{entry.note}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                      aria-label="Inspect feeding record (local preview)"
                    >
                      <ClipboardCheck size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </DataTable>
          )}
          <Pagination page={page} pageCount={2} onChange={setPage} />
        </Card>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card title="Daily feeding execution">
          <p className="font-heading text-xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">No adherence percentage is computed.</p>
        </Card>
        <Card title="Monitored animals">
          <p className="font-heading text-xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">Neutral placeholders replace named animals.</p>
        </Card>
      </div>
      <p className="mt-4 flex items-center gap-1 font-inter text-xs text-[#444840]">
        <Info size={12} aria-hidden="true" /> Local preview only — no feeding record, telemetry or
        stock movement is produced.
      </p>
    </div>
  );
}

export default ActualFeedingRecordsScreen;
