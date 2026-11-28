import { useState } from 'react';
import {
  BookOpen,
  CircleAlert,
  ClipboardList,
  Copy,
  Download,
  Edit,
  UsersRound,
  Info,
  Plus,
  Scale,
  Search,
  Sprout,
  X,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Field,
  FilterBar,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  SectionTitle,
  SelectField,
  TextField,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

const plans = [
  {
    id: 'Illustrative',
    name: 'Illustrative lactation plan',
    target: 'Group A',
    items: ['Feed item A', 'Feed item B'],
    qty: 'Illustrative',
    times: 'Split AM / PM',
    term: 'Illustrative',
    status: 'Active',
  },
  {
    id: 'Illustrative',
    name: 'Illustrative individual plan',
    target: 'Animal A',
    items: ['Feed item B'],
    qty: 'Illustrative',
    times: 'Morning',
    term: 'Illustrative',
    status: 'Admin override',
  },
  {
    id: 'Illustrative',
    name: 'Illustrative youngstock plan',
    target: 'Group B',
    items: ['Feed item A', 'Feed item C'],
    qty: 'Illustrative',
    times: 'Midday',
    term: 'Illustrative',
    status: 'Active',
  },
] as const;

export function FeedingPlansScreen() {
  const [search, setSearch] = useState('');
  const [target, setTarget] = useState('All targets');
  const [feedItem, setFeedItem] = useState('All feed items');
  const [window, setWindow] = useState('All feeding times');
  const [status, setStatus] = useState('Active only');
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const visible = plans.filter((plan) =>
    plan.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Feeding Management / Feeding Plans"
        title="Feeding Plans"
        description="Existing feeding plans, assigned animals and groups, feed items and effective dates. Illustrative records only."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export
            </button>
            <button type="button" className={secondaryButtonClass}>
              <UsersRound size={16} aria-hidden="true" /> Assign group
            </button>
            <button type="button" className={primaryButtonClass} onClick={() => setShowForm(true)}>
              <Plus size={16} aria-hidden="true" /> New plan
            </button>
          </>
        }
      />
      <PreviewNotice />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Plan overview">
          <p className="font-heading text-2xl font-bold text-[#2f4126]">Illustrative</p>
          <p className="mt-1 text-xs text-[#444840]">Plan count from source is illustrative</p>
        </Card>
        <Card title="Nutritional guidelines">
          <p className="flex items-center gap-2 text-sm text-[#1b1c18]">
            <BookOpen size={16} aria-hidden="true" /> Illustrative reference
          </p>
          <p className="mt-2 text-xs text-[#444840]">No nutritional formula is implied.</p>
        </Card>
        <Card title="Feed item reference">
          <p className="flex items-center gap-2 text-sm text-[#1b1c18]">
            <Sprout size={16} aria-hidden="true" /> Illustrative items
          </p>
          <p className="mt-2 text-xs text-[#444840]">Allocation rules remain unresolved.</p>
        </Card>
        <Card title="Plan status">
          <p className="flex items-center gap-2 text-sm text-[#1b1c18]">
            <Scale size={16} aria-hidden="true" /> Illustrative status
          </p>
          <Badge tone="secondary">Active</Badge>
        </Card>
      </div>

      <FilterBar>
        <div className="min-w-[220px] flex-1">
          <label
            htmlFor="plan-search"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
          >
            Search plans
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-[#444840]" aria-hidden="true" />
            <input
              id="plan-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search plan, animal or feed item"
              className={inputClass + ' pl-9'}
            />
          </div>
        </div>
        <div className="w-full sm:w-44">
          <Field label="Target" htmlFor="plan-target">
            <select
              id="plan-target"
              className={selectClass}
              value={target}
              onChange={(event) => setTarget(event.target.value)}
            >
              {['All targets', 'Groups / pens', 'Individual animals'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="w-full sm:w-44">
          <Field label="Feed item" htmlFor="plan-feed">
            <select
              id="plan-feed"
              className={selectClass}
              value={feedItem}
              onChange={(event) => setFeedItem(event.target.value)}
            >
              {['All feed items', 'Feed item A', 'Feed item B', 'Feed item C'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="w-full sm:w-44">
          <Field label="Feeding time" htmlFor="plan-window">
            <select
              id="plan-window"
              className={selectClass}
              value={window}
              onChange={(event) => setWindow(event.target.value)}
            >
              {['All feeding times', 'Morning', 'Evening', 'Split AM / PM', 'Custom'].map(
                (option) => (
                  <option key={option}>{option}</option>
                ),
              )}
            </select>
          </Field>
        </div>
        <div className="w-full sm:w-40">
          <Field label="Status" htmlFor="plan-status">
            <select
              id="plan-status"
              className={selectClass}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {['Active only', 'All statuses', 'Draft'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>
      </FilterBar>

      <Notice title="Illustrative allocation conflict example" variant="warning">
        <CircleAlert size={12} className="mr-1 inline" aria-hidden="true" />
        The source export shows an overlapping target example. Here it uses neutral placeholders: a
        plan could be assigned to both a group and an individual. No override precedence or
        dry-matter total is calculated in this preview.
      </Notice>

      <DataTable
        headers={[
          'Plan ID & Name',
          'Assigned Target',
          'Feed Items',
          'Quantities',
          'Feeding Times',
          'Effective Term',
          'Authorization',
          'Actions',
        ]}
        caption="Illustrative feeding plans — no nutritional formula is applied"
      >
        {visible.length === 0 ? (
          <tr>
            <td colSpan={8} className="px-4 py-10 text-center text-[#444840]">
              No feeding plans match these illustrative filters. Reset the filters or create a local
              draft.
            </td>
          </tr>
        ) : (
          visible.map((plan, index) => (
            <tr key={`${plan.name}-${index}`}>
              <td className="px-4 py-3">
                <span className="font-semibold text-[#2f4126]">{plan.name}</span>
                <span className="mt-0.5 block text-xs text-[#444840]">{plan.id}</span>
              </td>
              <td className="px-4 py-3">
                <Badge tone="neutral">
                  <UsersRound size={12} aria-hidden="true" /> {plan.target}
                </Badge>
              </td>
              <td className="px-4 py-3">{plan.items.join(' · ')}</td>
              <td className="px-4 py-3">{plan.qty}</td>
              <td className="px-4 py-3">
                <Badge tone="secondary">{plan.times}</Badge>
              </td>
              <td className="px-4 py-3">{plan.term}</td>
              <td className="px-4 py-3">
                <Badge tone={plan.status === 'Active' ? 'secondary' : 'tertiary'}>
                  {plan.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label="Edit plan (local preview)"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label="Duplicate plan (local preview)"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    type="button"
                    className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                    aria-label="View plan details (local preview)"
                  >
                    <ClipboardList size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>
      <Pagination page={page} pageCount={3} onChange={setPage} />

      {showForm ? (
        <div className="mt-8">
          <Card
            title="Feeding Plan Details"
            subtitle="Illustrative configuration — no plan is saved"
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setShowForm(false)}
              >
                <X size={16} aria-hidden="true" /> Close
              </button>
            }
          >
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <TextField
                id="plan-name"
                label="Plan name"
                value="Illustrative plan"
                onChange={() => undefined}
                required
              />
              <SelectField
                id="plan-target-type"
                label="Target category"
                value="Animal group / pen"
                onChange={() => undefined}
                options={['Animal group / pen', 'Individual animal']}
                required
              />
              <div className="sm:col-span-2">
                <SectionTitle>Feed items & formulation</SectionTitle>
                <DataTable
                  headers={['Feed item', 'Reference', 'Ratio', 'Planned quantity', 'Action']}
                >
                  <tr>
                    <td className="px-4 py-3">Feed item A</td>
                    <td className="px-4 py-3">Illustrative</td>
                    <td className="px-4 py-3">Illustrative</td>
                    <td className="px-4 py-3">Illustrative</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-[#ba1a1a]"
                        aria-label="Remove illustrative feed item"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </DataTable>
              </div>
              <TextField
                id="plan-times"
                label="Feeding times / windows"
                value="Illustrative"
                onChange={() => undefined}
              />
              <div className="grid grid-cols-2 gap-2">
                <TextField
                  id="plan-start"
                  label="Effective start"
                  type="date"
                  value=""
                  onChange={() => undefined}
                />
                <TextField
                  id="plan-end"
                  label="Effective end"
                  type="date"
                  value=""
                  onChange={() => undefined}
                />
              </div>
              <div className="sm:col-span-2">
                <TextField
                  id="plan-notes"
                  label="Rationale & dispensary instructions"
                  value="Illustrative note"
                  onChange={() => undefined}
                />
              </div>
              <div className="flex items-end gap-2 sm:col-span-2">
                <button
                  type="button"
                  className={secondaryButtonClass}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={primaryButtonClass}>
                  Save plan (local preview)
                </button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 flex items-center gap-1 font-inter text-xs text-[#444840]">
        <Info size={12} aria-hidden="true" /> Local preview only — plan creation, override and
        duplication are not performed.
      </p>
    </div>
  );
}

export default FeedingPlansScreen;
