import { CalendarDays, Check, Clock3, Info, Save, ShieldCheck, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const zones = [
  '(UTC+05:00) Asia/Karachi',
  '(UTC+00:00) UTC / GMT',
  '(UTC+01:00) Europe/Berlin',
  '(UTC+03:00) Africa/Nairobi',
] as const;

const shifts = [
  {
    name: 'Morning milking window',
    window: 'Example 04:00 – 08:30',
    status: 'Illustrative window',
  },
  { name: 'Morning feed delivery', window: 'Example 05:30 – 07:45', status: 'Illustrative window' },
  { name: 'Midday health rounds', window: 'Example 11:00 – 13:00', status: 'Illustrative window' },
  {
    name: 'Evening milking window',
    window: 'Example 16:00 – 19:30',
    status: 'Illustrative window',
  },
  { name: 'Daily roster cut-off', window: 'Example 23:59', status: 'Illustrative window' },
] as const;

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    neutral: 'bg-[#eae8e2] text-[#444840]',
    primary: 'bg-[#d9e8c7] text-[#2f4126]',
    danger: 'bg-[#7a461c] text-white',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone] ?? tones.neutral}`}
    >
      {children}
    </span>
  );
}

export function TimezoneSettingsScreen() {
  const [zone, setZone] = useState<string>(zones[0]);
  const [dst, setDst] = useState(true);
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="danger">
                <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
              </Badge>
              <Badge tone="primary">Canonical operational clock</Badge>
              <Badge>Illustrative</Badge>
            </div>
            <h1 className="font-heading mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Timezone Settings &amp; Operational Clock
            </h1>
            <p className="mt-1 text-sm text-[#444840]">
              Example workspace context — farm-configured timezone selection layout. No live clock,
              synchronization, or telemetry is shown.
            </p>
          </div>
          <div className="flex gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setZone(zones[0]);
                setDst(true);
                setNotice('Local draft reset.');
              }}
              className="rounded-lg bg-[#f0eee8] px-4 py-2.5 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <X size={14} className="mr-1 inline" aria-hidden="true" /> Cancel changes
            </button>
            <button
              type="button"
              onClick={() =>
                setNotice('Local preview only — no timezone was saved or synchronized.')
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save timezone settings (local)
            </button>
          </div>
        </header>

        <section
          aria-labelledby="policy-title"
          className="rounded-xl border-l-4 border-[#46583b] bg-[#f0eee8] p-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <Info size={20} aria-hidden="true" className="mt-0.5 text-[#2f4126]" />
            <div>
              <h2 id="policy-title" className="font-heading text-sm font-bold">
                Canonical farm timezone reference
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                The configured timezone governs how recorded sessions, treatments, movements, and
                check-ins are presented. Changing it does not retroactively rewrite historical
                recorded timestamps; no automatic device or hardware update is performed.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="preview-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-[#c4c8bd] pb-3">
            <div className="flex items-center gap-2">
              <Clock3 size={18} aria-hidden="true" className="text-[#2f4126]" />
              <h2 id="preview-title" className="font-heading text-base font-bold">
                Date / time display preview
              </h2>
            </div>
            <Badge>Static example — not a live clock</Badge>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-wide text-[#444840]">
                Example operational time
              </p>
              <p className="font-heading mt-1 text-4xl font-bold tracking-tight">11:51</p>
              <p className="mt-1 text-sm text-[#444840]">
                Example date · 24 October (illustrative)
              </p>
            </div>
            <div className="rounded-xl bg-[#f5f3ed] p-4 md:col-span-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#444840]">Selected zone</span>
                <span className="font-semibold">{zone}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[#444840]">ISO example</span>
                <code className="rounded bg-[#eae8e2] px-1.5 py-0.5 font-mono text-xs">
                  2026-11-28T11:51:00 (example)
                </code>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#c4c8bd] pt-3 text-sm">
                <span className="text-[#444840]">UTC offset reference</span>
                <Badge tone="primary">From selected zone (illustrative)</Badge>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="configuration-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <h2 id="configuration-title" className="font-heading text-base font-bold">
            Timezone configuration &amp; adjustments
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-12">
              <div>
                <label htmlFor="timezone-select" className="mb-1.5 block text-sm font-semibold">
                  Primary farm operational timezone
                </label>
                <select
                  id="timezone-select"
                  value={zone}
                  onChange={(event) => setZone(event.target.value)}
                  className="h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  {zones.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-[#444840]">
                  Defines the display reference for farm records and schedules.
                </p>
              </div>
              <div className="rounded-xl bg-[#f5f3ed] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Automatic daylight saving adjustment</p>
                    <p className="mt-0.5 text-xs text-[#444840]">
                      Whether DST is applied is approval-gated; the control below is illustrative.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={dst}
                    aria-label="Illustrative daylight saving preference"
                    onClick={() => setDst(!dst)}
                    className={`relative h-6 w-11 rounded-full border border-[#c4c8bd] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
                      dst ? 'bg-[#46583b]' : 'bg-[#eae8e2]'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform motion-reduce:transition-none ${
                        dst ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-[#c4c8bd] pt-3 text-xs text-[#444840]">
                  <CalendarDays size={14} aria-hidden="true" />
                  No transition schedule is asserted in this preview.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="shifts-title"
          className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-[#c4c8bd] bg-[#f5f3ed] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="shifts-title" className="font-heading text-base font-bold">
                Operational windows reference
              </h2>
              <p className="mt-0.5 text-xs text-[#444840]">
                Illustrative schedule windows; no connectivity or device status is displayed.
              </p>
            </div>
            <Badge>{shifts.length} example windows</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-xs uppercase tracking-wide text-[#444840]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Operational event
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Example local window
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Reference
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    State
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {shifts.map((shift) => (
                  <tr key={shift.name}>
                    <td className="px-4 py-3 font-medium">{shift.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#2f4126]">{shift.window}</td>
                    <td className="px-4 py-3 text-xs text-[#444840]">Illustrative schedule</td>
                    <td className="px-4 py-3 text-right">
                      <Badge tone="primary">
                        <Check size={12} className="mr-1" aria-hidden="true" /> {shift.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no timezone setting was saved or synchronized.'}
        </p>
      </div>
    </div>
  );
}
