import { useState } from 'react';
import { Info, LockKeyhole, Search, Wrench } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const EQUIPMENT = [
  {
    tag: 'EQ-01',
    name: 'Utility tractor',
    type: 'Tractors',
    location: 'Machinery store',
    condition: 'Good',
    usage: 'Recorded run',
  },
  {
    tag: 'EQ-02',
    name: 'Feed mixer',
    type: 'Feeding',
    location: 'Feed prep area',
    condition: 'Monitored',
    usage: 'Recorded run',
  },
  {
    tag: 'EQ-03',
    name: 'Milking station set',
    type: 'Parlor',
    location: 'Parlor',
    condition: 'Good',
    usage: 'Routine use',
  },
  {
    tag: 'EQ-04',
    name: 'Utility cart',
    type: 'Utilities',
    location: 'Barn store',
    condition: 'Service noted',
    usage: 'Paused',
  },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/equipment_inventory_condition_management */
export function EquipmentInventoryConditionManagementScreen() {
  const [query, setQuery] = useState('');
  const [condition, setCondition] = useState('all');
  const [type, setType] = useState('all');
  const [selected, setSelected] = useState<(typeof EQUIPMENT)[number] | null>(null);
  const [newCondition, setNewCondition] = useState('Good');
  const [status, setStatus] = useState('');

  const visible = EQUIPMENT.filter((row) => {
    const matchesCondition = condition === 'all' || row.condition === condition;
    const matchesType = type === 'all' || row.type === type;
    const haystack = `${row.tag} ${row.name} ${row.location}`.toLowerCase();
    return matchesCondition && matchesType && haystack.includes(query.trim().toLowerCase());
  });

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Equipment</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Equipment directory</span>
        </nav>

        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wrench size={24} aria-hidden="true" className="text-[#2f4126]" />
              <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
                Equipment Inventory &amp; Condition Management
              </h1>
            </div>
            <p className="max-w-3xl text-sm text-[#444840]">
              Operational tracking of barn machinery, parlor hardware and utility equipment.
              Supervisors may update operational condition and log service; master records remain
              Farm Admin controlled.
            </p>
          </div>
          <span className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#e4e2dd] px-4 text-sm font-semibold text-[#75786f]">
            <LockKeyhole size={16} aria-hidden="true" /> Print unavailable
          </span>
        </header>

        <section className="rounded-xl border-l-4 border-[#7a461c] bg-[#f0eee8] p-4">
          <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
            Supervisor scope: read and operational condition update only
          </h2>
          <p className="mt-1 text-sm text-[#444840]">
            Registration, specification edits, asset disposal, depreciation, vendor contracts and
            invoice costs are restricted to Farm Admin. No device telemetry is shown.
          </p>
        </section>

        <section
          aria-label="Equipment overview"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'Active equipment', value: '24', note: 'Illustrative count' },
            { label: 'Good condition', value: '20', note: 'Illustrative count' },
            { label: 'In use today', value: '9', note: 'Sample shift' },
            { label: 'Services this month', value: '14', note: 'Illustrative count' },
          ].map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {card.label}
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.note}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative w-full max-w-md">
              <span className="sr-only">Search equipment</span>
              <Search
                size={17}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by tag, name or location"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-10 pr-3 text-sm ${focusRing}`}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <label htmlFor="equipment-type" className="sr-only">
                Filter by type
              </label>
              <select
                id="equipment-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className={`h-11 rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option value="all">All types</option>
                <option value="Tractors">Tractors</option>
                <option value="Feeding">Feeding</option>
                <option value="Parlor">Parlor</option>
                <option value="Utilities">Utilities</option>
              </select>
              <label htmlFor="equipment-condition" className="sr-only">
                Filter by condition
              </label>
              <select
                id="equipment-condition"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
                className={`h-11 rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option value="all">All conditions</option>
                <option value="Good">Good</option>
                <option value="Monitored">Monitored</option>
                <option value="Service noted">Service noted</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setType('all');
                  setCondition('all');
                }}
                className={`h-11 rounded-lg border border-[#c4c8bd] px-3 text-sm font-semibold ${focusRing}`}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Asset tag
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Condition
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Recent usage
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {visible.map((row) => (
                  <tr key={row.tag}>
                    <td className="px-3 py-3 font-mono font-bold text-[#2f4126]">{row.tag}</td>
                    <td className="px-3 py-3 font-semibold text-[#1b1c18]">{row.name}</td>
                    <td className="px-3 py-3">{row.type}</td>
                    <td className="px-3 py-3 text-[#444840]">{row.location}</td>
                    <td className="px-3 py-3">
                      <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                        {row.condition}
                      </span>
                    </td>
                    <td className="px-3 py-3">{row.usage}</td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(row)}
                        className={`rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold ${focusRing}`}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#444840]">
                No equipment matches the selected filters.
              </p>
            ) : null}
          </div>
        </section>

        {selected ? (
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-[#c4c8bd] bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#1b1c18]">
                    {selected.tag} · {selected.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#444840]">
                    {selected.type} · {selected.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className={`rounded-lg border border-[#c4c8bd] px-3 py-1.5 text-sm ${focusRing}`}
                >
                  Close
                </button>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-[#f0eee8] p-3">
                  <dt className="text-xs text-[#444840]">Current condition</dt>
                  <dd className="font-semibold text-[#1b1c18]">{selected.condition}</dd>
                </div>
                <div className="rounded-lg bg-[#f0eee8] p-3">
                  <dt className="text-xs text-[#444840]">Usage</dt>
                  <dd className="font-semibold text-[#1b1c18]">{selected.usage}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-[#444840]">
                Asset decommissioning, replacement requests and external repair invoices require
                Farm Admin credentials.
              </p>
            </div>
            <div className="rounded-xl border border-[#c4c8bd] bg-white p-5">
              <h3 className="font-heading text-base font-bold text-[#1b1c18]">
                Update operational condition
              </h3>
              <label htmlFor="new-condition" className="mt-3 block text-sm font-semibold">
                Condition value
              </label>
              <select
                id="new-condition"
                value={newCondition}
                onChange={(event) => setNewCondition(event.target.value)}
                className={`mt-1 h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option>Optimal</option>
                <option>Good</option>
                <option>Monitored</option>
                <option>Service noted</option>
              </select>
              <button
                type="button"
                onClick={() =>
                  setStatus(
                    `${selected.tag}: condition preview set to ${newCondition}. Nothing saved.`,
                  )
                }
                className={`mt-4 h-11 w-full rounded-lg bg-[#46583b] text-sm font-semibold text-white ${focusRing}`}
              >
                Validate Condition Update
              </button>
              {status ? (
                <p role="status" className="mt-3 text-xs text-[#46583b]">
                  {status}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            Sample values are illustrative. RFID tags, hardware status and live telemetry are
            intentionally omitted.
          </p>
        </div>
      </div>
    </main>
  );
}
