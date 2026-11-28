import { useState, type FormEvent } from 'react';
import { ClipboardList, Info, Search, Wrench } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const TABS = ['Maintenance history', 'Usage ledger'] as const;
const CATEGORIES = [
  'Routine lubrication',
  'Belt / chain check',
  'Wear inspection',
  'Filter change',
  'Unscheduled adjustment',
] as const;

const HISTORY = [
  {
    date: 'Sample date',
    asset: 'EQ-02 · Feed mixer',
    category: 'Belt / chain check',
    detail: 'Routine drive inspection',
    condition: 'Good',
    hours: '—',
  },
  {
    date: 'Sample date',
    asset: 'EQ-01 · Utility tractor',
    category: 'Routine lubrication',
    detail: 'Scheduled greasing completed',
    condition: 'Good',
    hours: '—',
  },
  {
    date: 'Sample date',
    asset: 'EQ-04 · Utility cart',
    category: 'Wear inspection',
    detail: 'Routine condition review',
    condition: 'Monitored',
    hours: '—',
  },
] as const;

const USAGE = [
  { date: 'Sample date', asset: 'EQ-02 · Feed mixer', purpose: 'Ration preparation', hours: '3.2' },
  { date: 'Sample date', asset: 'EQ-01 · Utility tractor', purpose: 'Feed delivery', hours: '4.5' },
  { date: 'Sample date', asset: 'EQ-03 · Parlor set', purpose: 'Routine milking', hours: '6.0' },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/equipment_maintenance_usage_records */
export function EquipmentMaintenanceUsageRecordsScreen() {
  const [tab, setTab] = useState<string>('Maintenance history');
  const [category, setCategory] = useState<string>('Belt / chain check');
  const [asset, setAsset] = useState('EQ-02');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Good');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!description.trim()) {
      setError('Describe the maintenance action before validating the entry.');
      return;
    }
    setMessage('Draft validated locally. No maintenance record was saved.');
  };

  const visibleHistory = HISTORY.filter((row) =>
    `${row.asset} ${row.category} ${row.detail}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-xl bg-[#f0eee8] p-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
            <span>Farm Workspace</span>
            <span aria-hidden="true">/</span>
            <span>Equipment</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[#1b1c18]">Maintenance &amp; usage records</span>
          </nav>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
                Equipment Maintenance &amp; Usage Records
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-[#444840]">
                Recording of servicing activities, condition updates and operating hours. All values
                shown are illustrative.
              </p>
            </div>
            <a
              href="#quick-service-form"
              className={`inline-flex h-11 items-center gap-2 rounded-lg bg-[#46583b] px-4 text-sm font-semibold text-white ${focusRing}`}
            >
              <Wrench size={17} aria-hidden="true" /> Record Maintenance Activity
            </a>
          </div>
        </header>

        <div
          role="tablist"
          aria-label="Equipment record views"
          className="flex gap-1 overflow-x-auto rounded-xl bg-[#f0eee8] p-1.5"
        >
          {TABS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold ${tab === item ? 'bg-white text-[#1b1c18] shadow-sm' : 'text-[#444840]'} ${focusRing}`}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="rounded-xl border-l-4 border-[#7a461c] bg-[#f0eee8] p-4">
          <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
            Supervisor recording scope: maintenance and run logs only
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            Predictive maintenance, IoT telemetry, GPS tracking, contractor work orders and invoice
            costs are restricted enterprise functions and are not displayed.
          </p>
        </section>

        <form
          id="quick-service-form"
          onSubmit={submit}
          noValidate
          className="space-y-5 rounded-xl border border-[#c4c8bd] bg-white p-5"
        >
          <div className="flex items-center gap-2">
            <ClipboardList size={19} aria-hidden="true" className="text-[#46583b]" />
            <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
              Record Maintenance Activity
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="maintenance-asset" className="text-sm font-semibold">
                Asset
              </label>
              <select
                id="maintenance-asset"
                value={asset}
                onChange={(event) => setAsset(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option value="EQ-01">EQ-01 · Utility tractor</option>
                <option value="EQ-02">EQ-02 · Feed mixer</option>
                <option value="EQ-03">EQ-03 · Parlor set</option>
                <option value="EQ-04">EQ-04 · Utility cart</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="maintenance-date" className="text-sm font-semibold">
                Service date
              </label>
              <input
                id="maintenance-date"
                type="date"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="meter-reading" className="text-sm font-semibold">
                Operating meter reading
              </label>
              <input
                id="meter-reading"
                type="text"
                inputMode="numeric"
                placeholder="Hours (optional)"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
          </div>
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">Maintenance category</legend>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${category === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="space-y-1.5">
            <label htmlFor="maintenance-description" className="text-sm font-semibold">
              Maintenance description
            </label>
            <textarea
              id="maintenance-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the mechanical action taken"
              className={`w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] p-3 text-sm ${focusRing}`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="condition-after" className="text-sm font-semibold">
                Condition after service
              </label>
              <select
                id="condition-after"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option>Optimal</option>
                <option>Good</option>
                <option>Monitored</option>
                <option>Needs external service</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="performed-by" className="text-sm font-semibold">
                Performed by
              </label>
              <input
                id="performed-by"
                type="text"
                placeholder="Operator or machinist"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
          </div>
          {error ? (
            <p role="alert" className="text-sm font-semibold text-[#ba1a1a]">
              {error}
            </p>
          ) : null}
          {message ? (
            <p role="status" className="rounded-lg bg-[#d9e8c7] px-3 py-2 text-sm text-[#46583b]">
              {message}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-end gap-2 border-t border-[#f0eee8] pt-4">
            <button
              type="button"
              onClick={() => {
                setDescription('');
                setError('');
                setMessage('');
              }}
              className={`h-11 rounded-lg border border-[#c4c8bd] px-5 text-sm font-semibold ${focusRing}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`h-11 rounded-lg bg-[#46583b] px-5 text-sm font-semibold text-white ${focusRing}`}
            >
              Validate Maintenance Record
            </button>
          </div>
        </form>

        {tab === 'Maintenance history' ? (
          <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Recorded service logs
                </h2>
                <p className="mt-1 text-sm text-[#444840]">Sample records · illustrative</p>
              </div>
              <label className="relative w-full sm:max-w-xs">
                <span className="sr-only">Filter service logs</span>
                <Search
                  size={15}
                  aria-hidden="true"
                  className="absolute left-3 top-3 text-[#75786f]"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter by asset or category"
                  className={`h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
                />
              </label>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead>
                  <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                    <th scope="col" className="px-3 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Asset
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Actions
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Condition
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0eee8]">
                  {visibleHistory.map((row, index) => (
                    <tr key={`${row.asset}-${index}`}>
                      <td className="px-3 py-3">{row.date}</td>
                      <td className="px-3 py-3 font-semibold">{row.asset}</td>
                      <td className="px-3 py-3">{row.category}</td>
                      <td className="px-3 py-3 text-[#444840]">{row.detail}</td>
                      <td className="px-3 py-3">
                        <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                          {row.condition}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visibleHistory.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#444840]">
                  No service record matches this filter.
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {tab === 'Usage ledger' ? (
          <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
            <h2 className="font-heading text-base font-bold text-[#1b1c18]">
              Equipment run-time ledger
            </h2>
            <p className="text-sm text-[#444840]">Sample operating hours · illustrative</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                    <th scope="col" className="px-3 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Asset
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Purpose
                    </th>
                    <th scope="col" className="px-3 py-3 text-right">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0eee8]">
                  {USAGE.map((row, index) => (
                    <tr key={`${row.asset}-${index}`}>
                      <td className="px-3 py-3">{row.date}</td>
                      <td className="px-3 py-3 font-semibold">{row.asset}</td>
                      <td className="px-3 py-3">{row.purpose}</td>
                      <td className="px-3 py-3 text-right font-mono">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            No digital signature, hash verification, telemetry console or export action is included.
          </p>
        </div>
      </div>
    </main>
  );
}
