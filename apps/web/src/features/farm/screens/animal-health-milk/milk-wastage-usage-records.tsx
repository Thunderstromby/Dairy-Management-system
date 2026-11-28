import { useState } from 'react';
import { ChevronRight, ClipboardList, Droplets, Info, Lock, ShieldCheck } from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const records = [
  {
    id: 'WST-0001',
    time: 'Sample time',
    type: 'Wastage / discard',
    reason: 'Clinical withholding note (illustrative)',
    delta: '-145.0 L',
    source: 'Parlor diverter (illustrative)',
    status: 'Recorded',
  },
  {
    id: 'USG-0001',
    time: 'Sample time',
    type: 'Internal usage',
    reason: 'Calf nursery feeding (illustrative)',
    delta: '-450.0 L',
    source: 'Buffer tank (illustrative)',
    status: 'Recorded',
  },
  {
    id: 'WST-0002',
    time: 'Sample time',
    type: 'Wastage / discard',
    reason: 'Line flush note (illustrative)',
    delta: '-210.0 L',
    source: 'Line rinse (illustrative)',
    status: 'Recorded',
  },
  {
    id: 'USG-0002',
    time: 'Sample time',
    type: 'Internal usage',
    reason: 'Colostrum bank note (illustrative)',
    delta: '-80.0 L',
    source: 'Chiller (illustrative)',
    status: 'Recorded',
  },
] as const;

export function MilkWastageUsageRecords() {
  const [tab, setTab] = useState('All records');
  const [form, setForm] = useState<'wastage' | 'usage' | null>(null);
  const [notice, setNotice] = useState('');

  const visible = records.filter(
    (item) =>
      tab === 'All records' ||
      (tab === 'Wastage / discards'
        ? item.type.startsWith('Wastage')
        : item.type === 'Internal usage'),
  );

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
              <span className="text-[#2f4126]">Wastage & usage records</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Milk Wastage & Usage Records
              </h1>
              <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-[11px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Disposal and internal allocation preview. No stock is reduced, no financial valuation
              is calculated and no health-alert detail is shown.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setForm('usage')}
              className={`rounded-lg bg-[#eae8e2] px-3.5 py-2.5 text-sm font-semibold ${focus}`}
            >
              Log internal usage
            </button>
            <button
              type="button"
              onClick={() => setForm('wastage')}
              className={`rounded-lg bg-[#2f4126] px-3.5 py-2.5 text-sm font-semibold text-white ${focus}`}
            >
              Record milk wastage
            </button>
          </div>
        </header>

        <div className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Lock aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Admin-only module</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Wastage and usage controls are restricted to Farm Admin. No approval signature,
              regulatory permit, disposal directive, incident identity or irreversible stock action
              is reproduced here.
            </p>
          </div>
        </div>
        {notice ? (
          <p role="status" className="rounded-lg bg-[#f5f3ed] p-3 text-sm text-[#444840]">
            {notice}
          </p>
        ) : null}

        <section
          aria-label="Wastage summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Available bulk stock',
              value: '32,840.0 L',
              note: 'Illustrative stock label',
              icon: <Droplets aria-hidden="true" size={18} />,
            },
            {
              label: 'Monthly wastage',
              value: '1,420.0 L',
              note: 'Illustrative volume',
              icon: <ClipboardList aria-hidden="true" size={18} />,
            },
            {
              label: 'Discard incidents',
              value: '7 events',
              note: 'Illustrative count',
              icon: <ShieldCheck aria-hidden="true" size={18} />,
            },
            {
              label: 'Internal usage',
              value: '9,850.0 L',
              note: 'Illustrative volume',
              icon: <Droplets aria-hidden="true" size={18} />,
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
              <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        {form ? (
          <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">
              {form === 'wastage'
                ? 'Record milk wastage / sanitary disposal'
                : 'Log internal milk usage allocation'}
            </h2>
            <p className="mt-1 text-xs text-[#444840]">
              Local form preview. No stock reduction, signature or disposal directive is produced.
            </p>
            <form
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setNotice('Local draft validated. No movement is recorded and stock is unchanged.');
              }}
            >
              {(form === 'wastage'
                ? [
                    'Incident timestamp',
                    'Source tank / diverter',
                    'Discarded quantity (L)',
                    'Wastage category',
                    'Disposal note',
                  ]
                : [
                    'Usage timestamp',
                    'Usage purpose',
                    'Allocated volume (L)',
                    'Source tank',
                    'Receiving destination',
                  ]
              ).map((label) => (
                <div key={label}>
                  <label
                    htmlFor={`waste-${label}`}
                    className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#444840]"
                  >
                    {label} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    id={`waste-${label}`}
                    className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm ${focus}`}
                    placeholder="Illustrative value"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <p className="rounded-lg bg-[#f0eee8] p-3 text-xs text-[#444840]">
                  Estimated financial valuation is pending approval and is intentionally not shown.
                  No clinical identity or animal tag is linked to this draft.
                </p>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <button
                  type="submit"
                  className={`rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
                >
                  Validate locally
                </button>
                <button
                  type="button"
                  onClick={() => setForm(null)}
                  className={`rounded-lg bg-[#f0eee8] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Close
                </button>
              </div>
            </form>
            {notice ? (
              <p role="status" className="mt-3 rounded-lg bg-[#d9e8c7] p-3 text-xs text-[#2f4126]">
                {notice}
              </p>
            ) : null}
          </section>
        ) : null}

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div
            className="flex flex-wrap items-center justify-between gap-2"
            role="tablist"
            aria-label="Record type"
          >
            <div className="flex flex-wrap gap-1 rounded-lg bg-[#f0eee8] p-1">
              {['All records', 'Wastage / discards', 'Internal usage'].map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={tab === item}
                  onClick={() => setTab(item)}
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold ${tab === item ? 'bg-white text-[#2f4126] shadow-sm' : 'text-[#444840]'} ${focus}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="text-xs text-[#444840]">Illustrative period · local filters</span>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[1020px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Record ID',
                    'Timestamp',
                    'Record type',
                    'Reason / purpose',
                    'Volume delta',
                    'Deducted from',
                    'Status',
                    'Operator',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((row) => (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-semibold text-[#2f4126]">
                      {row.id}
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.time}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.type.startsWith('Wastage') ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#d9e8c7] text-[#2f4126]'}`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.reason}</td>
                    <td className="px-3 py-3 font-heading text-sm font-bold text-[#7a461c]">
                      {row.delta}
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.source}</td>
                    <td className="px-3 py-3 text-xs font-semibold">{row.status}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">Staff role (illustrative)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>Showing {visible.length} illustrative movements</span>
            <span>No stock balance is recalculated.</span>
          </div>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <h2 className="font-heading text-sm font-bold">Stock movement reconciliation matrix</h2>
          <p className="mt-1 text-xs text-[#444840]">
            Opening balance, collections, sales, usage and discard rows are shown as labels only. No
            calculated current stock is derived from them.
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {[
              'Opening balance',
              'Gross parlor collection',
              'Commercial dispatch',
              'Internal usage allocations',
              'Recorded discards',
            ].map((label) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-2.5 text-sm"
              >
                <span>{label}</span>
                <span className="text-xs text-[#444840]">Illustrative label</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-lg bg-[#f0eee8] p-3 text-xs text-[#444840]">
            Calculated current available stock: not computed. No checksum, signature or compliance
            certification is produced.
          </p>
        </section>

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <Info aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Compliance & bio-sanitation</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Disposal channels, permit identifiers and irreversible stock locks are outside this
              visual prototype. All records shown are illustrative and carry no audit claim.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
