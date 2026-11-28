import { useState } from 'react';
import {
  BarChart3,
  ChevronRight,
  Download,
  FileText,
  Info,
  Printer,
  ShieldCheck,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

const tabs = ['Daily view', 'Monthly aggregate', 'Custom range'];
const presets = ['Today', 'Yesterday', 'Last 7 days', 'Month-to-date'];

const ledger = [
  {
    date: 'Sample date · morning',
    animal: 'Animal A',
    tag: 'TAG-A-01',
    pen: 'Pen 04',
    am: '18.4 L',
    pm: '14.1 L',
    total: '32.5 L',
    status: 'Tank intake',
  },
  {
    date: 'Sample date · morning',
    animal: 'Animal B',
    tag: 'TAG-A-02',
    pen: 'Pen 02',
    am: '12.6 L',
    pm: '10.2 L',
    total: '22.8 L',
    status: 'Tank intake',
  },
  {
    date: 'Sample date · morning',
    animal: 'Animal C',
    tag: 'TAG-A-03',
    pen: 'Pen H-1',
    am: '14.0 L',
    pm: '0.0 L',
    total: '14.0 L',
    status: 'Withheld',
  },
  {
    date: 'Sample date · evening',
    animal: 'Animal D',
    tag: 'TAG-A-04',
    pen: 'Pen 04',
    am: '15.2 L',
    pm: '12.8 L',
    total: '28.0 L',
    status: 'Tank intake',
  },
] as const;

export function MilkReports() {
  const [tab, setTab] = useState(tabs[1]);
  const [preset, setPreset] = useState(presets[3]);
  const [session, setSession] = useState('all');
  const [notice, setNotice] = useState('');

  const visible = ledger.filter((row) => {
    if (session === 'morning') return row.date.includes('morning');
    if (session === 'evening') return row.date.includes('evening');
    return true;
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Reports & analytics</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Milk reports</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Farm Milk Production Reports & Shift Analytics
              </h1>
              <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-[11px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm text-[#444840]">
              Audited-layout preview only. No certification, export simulation or live status is
              reproduced.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['PDF statement', <FileText key="pdf" aria-hidden="true" size={14} />],
              ['Excel export', <Download key="xls" aria-hidden="true" size={14} />],
              ['Print summary', <Printer key="pr" aria-hidden="true" size={14} />],
            ].map(([label, icon]) => (
              <button
                key={label as string}
                type="button"
                onClick={() => setNotice(`${label} is not wired in this prototype.`)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold ${label === 'Print summary' ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#1b1c18]'} ${focus}`}
              >
                {icon} {label as string}
              </button>
            ))}
          </div>
        </header>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div
              className="flex flex-wrap gap-1 rounded-lg bg-[#f0eee8] p-1"
              role="tablist"
              aria-label="Reporting period"
            >
              {tabs.map((item) => (
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
            <span className="text-xs text-[#444840]">Local view switch only</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={preset === item}
                onClick={() => setPreset(item)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${preset === item ? 'bg-[#46583b] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focus}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label
                htmlFor="report-session"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Milking session filter
              </label>
              <select
                id="report-session"
                value={session}
                onChange={(event) => setSession(event.target.value)}
                className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option value="all">All sessions</option>
                <option value="morning">Morning only</option>
                <option value="evening">Evening only</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="report-pen"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Pen / lactation group
              </label>
              <select
                id="report-pen"
                className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option>All pens</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="report-intake"
                className="mb-1 block text-xs font-semibold text-[#444840]"
              >
                Tank intake classification
              </label>
              <select
                id="report-intake"
                className={`w-full rounded-lg bg-[#f0eee8] px-3 py-2 text-sm ${focus}`}
              >
                <option>All classifications</option>
              </select>
            </div>
          </div>
          {notice ? (
            <p role="status" className="mt-3 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
              {notice}
            </p>
          ) : null}
        </section>

        <section
          aria-label="Milk report summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5"
        >
          {[
            {
              label: 'Total period (illustrative)',
              value: '78,420 L',
              note: 'No run-rate calculated',
            },
            { label: 'Morning shift', value: '45,210 L', note: 'Illustrative shift total' },
            { label: 'Evening shift', value: '33,210 L', note: 'Illustrative shift total' },
            { label: 'Herd average yield', value: '23.0 L/cow/day', note: 'Illustrative average' },
            {
              label: 'Tank purity & intake',
              value: '98.2% Grade A',
              note: 'Illustrative quality split',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {item.label}
              </p>
              <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">{item.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{item.note}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-base font-bold">Daily milk yield trajectory</h2>
          <p className="mt-1 text-xs text-[#444840]">
            Illustrative shift bars with no tank-limit or target calculation.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#444840]">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-[#46583b]" /> Morning
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded bg-[#d9e8c7]" /> Evening
            </span>
          </div>
          <div
            role="img"
            aria-label="Illustrative daily yield bars by shift."
            className="mt-4 flex h-44 items-end gap-2 border-b border-[#c4c8bd] pb-1"
          >
            {[48, 62, 55, 70, 64, 58, 72, 66, 60, 74, 68, 56].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col justify-end gap-0.5">
                <div
                  className="w-full rounded-t bg-[#d9e8c7]"
                  style={{ height: `${height * 0.7}%` }}
                />
                <div className="w-full bg-[#46583b]" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-[#444840]">
            <span>Sample start</span>
            <span>Mid-period</span>
            <span>Sample end</span>
          </div>
          <p className="mt-2 text-xs text-[#444840]">
            Text summary: sample volumes only; no live telemetry.
          </p>
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <h2 className="font-heading text-base font-bold">Herd group breakdown</h2>
          <p className="mt-1 text-xs text-[#444840]">Illustrative lactation share by pen.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              ['Pen 01 · high yield', '37,641 L', '48%'],
              ['Pen 03 · mid-lactation', '25,094 L', '32%'],
              ['Pen 02 · fresh cows', '15,685 L', '20%'],
            ].map(([name, value, share]) => (
              <div key={name} className="rounded-lg bg-[#f5f3ed] p-3">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#46583b]" /> {name}
                </p>
                <p className="mt-1 font-heading text-lg font-bold text-[#2f4126]">{value}</p>
                <p className="text-xs text-[#444840]">{share} illustrative share</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-[#f0eee8]">
            <div className="h-full w-[48%] bg-[#46583b]" />
            <div className="h-full w-[32%] bg-[#556249]" />
            <div className="h-full w-[20%] bg-[#d9e8c7]" />
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f5f3ed] p-4">
            <h2 className="font-heading text-base font-bold">Animal & batch collection ledger</h2>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#444840]">
              {visible.length} illustrative entries
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1020px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  {[
                    'Date & shift',
                    'Animal & tag',
                    'Pen',
                    'Morning',
                    'Evening',
                    'Daily total',
                    'Intake / quality',
                    'Recorded by',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((row) => (
                  <tr key={`${row.tag}-${row.date}`}>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.date}</td>
                    <td className="px-3 py-3">
                      <p className="font-semibold">{row.animal}</p>
                      <p className="font-mono text-[11px] text-[#444840]">{row.tag}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.pen}</td>
                    <td className="px-3 py-3 text-sm">{row.am}</td>
                    <td className="px-3 py-3 text-sm">{row.pm}</td>
                    <td className="px-3 py-3 font-heading text-sm font-bold text-[#2f4126]">
                      {row.total}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === 'Withheld' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#d9e8c7] text-[#2f4126]'}`}
                      >
                        {row.status === 'Withheld' ? 'Withheld — details restricted' : row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">Staff role (illustrative)</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <BarChart3 aria-hidden="true" size={28} className="mx-auto text-[#444840]" />
                <p className="mt-2 font-heading text-sm font-bold">
                  No records for this session filter
                </p>
                <p className="mt-1 text-xs text-[#444840]">
                  Choose another session to see illustrative entries.
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="flex flex-wrap items-start gap-3 rounded-xl border border-[#c4c8bd]/50 bg-[#f5f3ed] p-4">
          <ShieldCheck aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#2f4126]" />
          <div>
            <h2 className="font-heading text-sm font-bold">SRS scope boundary notice</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Milk reports reflect manually recorded collection entries only. Hardware sensors, RFID
              readers and automated diversion are outside scope; no such status is displayed.
            </p>
          </div>
          <Info aria-hidden="true" size={16} className="ml-auto text-[#444840]" />
        </section>
      </div>
    </div>
  );
}
