import { useState } from 'react';
import {
  ChevronRight,
  Container,
  FileDown,
  Info,
  Lock,
  Plus,
  Printer,
  Warehouse,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const unitViews = ['All units', 'Primary silos', 'Reserve & nursery', 'Mobile units'];

const tanks = [
  {
    id: 'T-01',
    name: 'Bulk silo #01',
    type: 'Primary receiving silo',
    quantity: '18,200.0 L',
    capacity: '25,000.0 L',
    percent: 73,
    status: 'Active storage',
    view: 'Primary silos',
  },
  {
    id: 'T-02',
    name: 'Bulk tank #02',
    type: 'Parlor intake vessel',
    quantity: '11,440.0 L',
    capacity: '15,000.0 L',
    percent: 76,
    status: 'Secondary tank',
    view: 'Primary silos',
  },
  {
    id: 'T-03',
    name: 'Buffer tank #03',
    type: 'Nursery reserve',
    quantity: '3,200.0 L',
    capacity: '6,000.0 L',
    percent: 53,
    status: 'Reserve line',
    view: 'Reserve & nursery',
  },
  {
    id: 'C-04',
    name: 'Mobile tank #04',
    type: 'Calibrated skid',
    quantity: '0.0 L',
    capacity: '4,000.0 L',
    percent: 0,
    status: 'Empty / sanitized',
    view: 'Mobile units',
  },
] as const;

const movements = [
  {
    id: 'MOV-0001',
    date: 'Sample date',
    tank: 'T-01',
    type: 'Addition / intake',
    delta: '+7,120.0 L',
    balance: '18,200.0 L',
    by: 'Shift lead (illustrative)',
    note: 'Evening parlor intake',
  },
  {
    id: 'MOV-0002',
    date: 'Sample date',
    tank: 'T-03',
    type: 'Removal / feeding',
    delta: '-450.0 L',
    balance: '3,200.0 L',
    by: 'Nursery lead (illustrative)',
    note: 'Calf feeding allocation',
  },
  {
    id: 'MOV-0003',
    date: 'Sample date',
    tank: 'T-02',
    type: 'Addition / intake',
    delta: '+5,440.0 L',
    balance: '11,440.0 L',
    by: 'Parlor lead (illustrative)',
    note: 'Morning parlor collection',
  },
  {
    id: 'MOV-0004',
    date: 'Sample date',
    tank: 'T-01',
    type: 'Commercial dispatch',
    delta: '-18,200.0 L',
    balance: '11,080.0 L',
    by: 'Farm Admin (illustrative)',
    note: 'Tanker pickup (illustrative)',
  },
] as const;

export function BulkTankContainerStorage() {
  const [view, setView] = useState(unitViews[0]);
  const [notice, setNotice] = useState('');

  const visibleTanks = tanks.filter((tank) => view === 'All units' || tank.view === view);

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Operations</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span>Milk management</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Milk storage</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Milk Storage & Bulk Containers
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Manual custody and volume ledger preview. Quantities, capacities and movements are all
              illustrative; no stock value is changed.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setNotice('Print is not wired in this prototype.')}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm ${focus}`}
            >
              <Printer aria-hidden="true" size={14} /> Print summary
            </button>
            <button
              type="button"
              onClick={() => setNotice('Export is not wired in this prototype.')}
              className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm ${focus}`}
            >
              <FileDown aria-hidden="true" size={14} /> Export log
            </button>
            <button
              type="button"
              onClick={() =>
                setNotice(
                  'Stock movement recording is not wired in this prototype; no balance is changed.',
                )
              }
              className={`inline-flex items-center gap-1.5 rounded-lg bg-[#2f4126] px-3.5 py-2 text-sm font-semibold text-white ${focus}`}
            >
              <Plus aria-hidden="true" size={14} /> Record stock movement
            </button>
          </div>
        </header>

        <div className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Warehouse aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-[#2f4126]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Bulk milk custody & volume ledger</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Collections, withdrawals and dispatch events are logged manually in production. This
              preview shows illustrative records only and performs no stock correction.
            </p>
          </div>
          <Lock aria-hidden="true" size={15} className="ml-auto text-[#444840]" />
        </div>
        {notice ? (
          <p role="status" className="rounded-lg bg-[#f5f3ed] p-3 text-sm text-[#444840]">
            {notice}
          </p>
        ) : null}

        <section
          aria-label="Storage summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Total recorded stock',
              value: '32,840.0 L',
              note: '65.7% of sample capacity',
              icon: <Container aria-hidden="true" size={18} />,
            },
            {
              label: 'Active storage units',
              value: '4 units',
              note: '3 fixed · 1 mobile',
              icon: <Warehouse aria-hidden="true" size={18} />,
            },
            {
              label: 'Total storage capacity',
              value: '50,000.0 L',
              note: 'Illustrative headroom 17,160.0 L',
              icon: <Container aria-hidden="true" size={18} />,
            },
            {
              label: 'Last recorded entry',
              value: 'Sample date',
              note: 'Operator: staff role (illustrative)',
              icon: <Info aria-hidden="true" size={18} />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {item.label}
                </span>
                <span className="text-[#2f4126]">{item.icon}</span>
              </div>
              <p className="mt-2 font-heading text-lg font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Storage unit views">
            {unitViews.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={view === item}
                onClick={() => setView(item)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${view === item ? 'bg-[#2f4126] text-white' : 'bg-white text-[#444840] shadow-sm'} ${focus}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-[#444840]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2f4126]" /> Active storage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#556249]" /> Reserve line
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#c4c8bd]" /> Empty / ready
            </span>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {visibleTanks.map((tank) => (
            <article
              key={tank.id}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-[11px] font-semibold text-[#2f4126]">
                  {tank.id}
                </span>
                <span className="rounded-full bg-[#f0eee8] px-2.5 py-1 text-[11px] font-semibold text-[#444840]">
                  {tank.status}
                </span>
              </div>
              <h2 className="mt-2 font-heading text-base font-bold">{tank.name}</h2>
              <p className="text-xs text-[#444840]">{tank.type}</p>
              <div className="mt-3 rounded-lg bg-[#f5f3ed] p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#444840]">
                    Recorded current quantity
                  </span>
                  <span className="font-heading text-lg font-bold text-[#2f4126]">
                    {tank.quantity}
                  </span>
                </div>
                <p className="text-xs text-[#444840]">/ {tank.capacity} · illustrative</p>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#eae8e2] p-0.5">
                  <div
                    className={`h-full rounded-full ${tank.percent === 0 ? 'bg-[#c4c8bd]' : 'bg-[#2f4126]'}`}
                    style={{ width: `${tank.percent}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-[#444840]">{tank.percent}% illustrative fill</p>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-[#f0eee8] p-2">
                  <dt className="text-[#444840]">Storage type</dt>
                  <dd className="font-semibold">{tank.type}</dd>
                </div>
                <div className="rounded bg-[#f0eee8] p-2">
                  <dt className="text-[#444840]">Calibration ref</dt>
                  <dd className="font-mono font-semibold">Illustrative</dd>
                </div>
              </dl>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setNotice('Intake recording is not wired; no balance changes.')}
                  className={`rounded-lg bg-[#eae8e2] px-3 py-1.5 text-xs font-semibold ${focus}`}
                >
                  Record intake
                </button>
                <button
                  type="button"
                  onClick={() => setNotice('Removal recording is not wired; no balance changes.')}
                  className={`rounded-lg bg-[#eae8e2] px-3 py-1.5 text-xs font-semibold ${focus}`}
                >
                  Record removal
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <h2 className="font-heading text-base font-bold">
            Bulk storage standards & verification procedures
          </h2>
          <p className="mt-1 text-xs text-[#444840]">
            Illustrative procedural notes; no regulatory claim.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              ['Intake & harvest logging', 'Record parlor inflows promptly in production.'],
              [
                'Dispatch reconciliation',
                'Confirm recorded outgoing volume before manifest sign-off.',
              ],
              ['Sanitization logging', 'Mark tanks empty and sanitized before new intake.'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-lg bg-[#f5f3ed] p-3">
                <p className="font-heading text-sm font-bold">{title}</p>
                <p className="mt-1 text-xs text-[#444840]">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] p-4">
            <h2 className="font-heading text-base font-bold">Storage event & movement ledger</h2>
            <span className="text-xs text-[#444840]">Illustrative movement records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1020px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Movement ID',
                    'Date',
                    'Tank',
                    'Type',
                    'Delta',
                    'Ending balance',
                    'Authorized by',
                    'Notes',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {movements.map((row) => (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-[#2f4126]">
                      {row.id}
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.date}</td>
                    <td className="px-3 py-3 text-xs">{row.tank}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.type.includes('Removal') ? 'bg-[#ffdcc6] text-[#7a461c]' : 'bg-[#d9e8c7] text-[#2f4126]'}`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td
                      className={`px-3 py-3 font-heading text-sm font-bold ${row.delta.startsWith('-') ? 'text-[#7a461c]' : 'text-[#2f4126]'}`}
                    >
                      {row.delta}
                    </td>
                    <td className="px-3 py-3 text-sm font-semibold">{row.balance}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.by}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {movements.length} illustrative custody events</span>
            <span>No stock correction or reconciliation is performed.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
