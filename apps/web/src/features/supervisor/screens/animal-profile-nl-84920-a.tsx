import { useState } from 'react';
import {
  ClipboardList,
  Droplets,
  HeartPulse,
  Info,
  LockKeyhole,
  Scale,
  Sprout,
} from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const PROFILE = [
  { label: 'Breed', value: 'Dairy breed', note: 'Recorded classification' },
  { label: 'Age', value: 'Adult', note: 'Illustrative age band' },
  { label: 'Group', value: 'Milking group 02', note: 'Current allocation' },
  { label: 'Lactation', value: 'Lactation record', note: 'Permitted summary' },
] as const;

const HEALTH = [
  {
    code: 'H-01',
    title: 'Routine hoof check',
    detail: 'Observation recorded',
    date: 'Sample date',
  },
  {
    code: 'H-02',
    title: 'Fresh cow observation',
    detail: 'Routine screening',
    date: 'Sample date',
  },
  {
    code: 'H-03',
    title: 'Vaccination record',
    detail: 'Recorded administration',
    date: 'Sample date',
  },
] as const;

const TIMELINE = [
  { label: 'Active herd status', date: 'Current', note: 'Confirmed in workspace' },
  { label: 'Calving event', date: 'Sample date', note: 'Confirmed record' },
  { label: 'Dry group transition', date: 'Sample date', note: 'Confirmed record' },
  { label: 'Registration', date: 'Sample date', note: 'Confirmed record' },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/animal_profile_nl_84920_a */
export function AnimalProfileNl84920AScreen() {
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1520px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#f0eee8] px-4 py-3 text-sm">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[#444840]">
            <span>Animals</span>
            <span aria-hidden="true">/</span>
            <span>Profiles</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[#1b1c18]">Animal A-1042</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded bg-white px-2 py-1 font-mono text-xs text-[#444840]">
            <LockKeyhole size={13} aria-hidden="true" /> Lifecycle edits: Farm Admin only
          </span>
        </div>

        <section className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white">
          <div className="h-1.5 w-full bg-[#46583b]" aria-hidden="true" />
          <div className="grid gap-6 p-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-[#f0eee8] text-[#556249]">
                <HeartPulse size={44} aria-hidden="true" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-[#556249]">
                Animal identifier
              </p>
              <h1 className="mt-1 font-heading text-2xl font-bold text-[#1b1c18]">ET-A1042</h1>
              <p className="text-sm text-[#444840]">Animal A-1042</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#46583b]">
                  <span className="h-2 w-2 rounded-full bg-[#2f4126]" aria-hidden="true" /> Active
                </span>
                <span className="rounded bg-[#f0eee8] px-2 py-1 font-mono text-xs text-[#444840]">
                  ID A-1042
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
              {PROFILE.map((item) => (
                <div key={item.label} className="rounded-lg bg-[#f0eee8] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                    {item.label}
                  </p>
                  <p className="mt-1 font-heading text-base font-bold text-[#1b1c18]">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-xs text-[#444840]">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 lg:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                Supervisor directives
              </p>
              <button
                type="button"
                onClick={() => setStatus('Health observation entry preview opened. No data saved.')}
                className={`flex w-full items-center justify-between rounded-lg bg-[#46583b] px-3 py-2.5 text-left text-sm font-semibold text-white ${focusRing}`}
              >
                <span className="flex items-center gap-2">
                  <HeartPulse size={16} aria-hidden="true" /> Log Health Observation
                </span>
                <span aria-hidden="true">+</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus('Weight history preview opened.')}
                className={`flex w-full items-center justify-between rounded-lg bg-[#f0eee8] px-3 py-2.5 text-left text-sm font-semibold text-[#1b1c18] ${focusRing}`}
              >
                <span className="flex items-center gap-2">
                  <Scale size={16} aria-hidden="true" /> Weight History
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>

        {status ? (
          <p role="status" className="rounded-lg bg-[#d9e8c7] px-4 py-3 text-sm text-[#46583b]">
            {status}
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <section className="rounded-xl border border-[#c4c8bd] bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Droplets size={20} aria-hidden="true" className="text-[#2f4126]" />
                  <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                    Milk Production Summary
                  </h2>
                </div>
                <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-xs text-[#444840]">
                  Illustrative
                </span>
              </div>
              <p className="mt-2 text-sm text-[#444840]">
                Recorded morning and evening session totals for permitted operational review.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Morning session', value: '18.4 L' },
                  { label: 'Evening session', value: '16.5 L' },
                  { label: 'Daily total', value: '34.9 L' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-[#f0eee8] p-4">
                    <p className="text-[11px] font-semibold uppercase text-[#444840]">
                      {item.label}
                    </p>
                    <p className="mt-2 font-heading text-xl font-bold text-[#2f4126]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#444840]">
                No predicted yield, telemetry stream, automated variance or commercial valuation is
                displayed.
              </p>
            </section>

            <section className="rounded-xl border border-[#c4c8bd] bg-white p-6">
              <div className="flex items-center gap-2">
                <HeartPulse size={20} aria-hidden="true" className="text-[#46583b]" />
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Permitted Health &amp; Preventive Log
                </h2>
              </div>
              <p className="mt-2 text-sm text-[#444840]">
                Routine observations only. High and critical clinical alerts are excluded from the
                supervisor view.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {HEALTH.map((item) => (
                  <div key={item.code} className="rounded-lg bg-[#f0eee8] p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#46583b]">
                        {item.code}
                      </span>
                      <span className="text-xs text-[#444840]">{item.date}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-sm font-bold text-[#1b1c18]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#444840]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-[#c4c8bd] bg-white p-6">
              <div className="flex items-center gap-2">
                <Scale size={20} aria-hidden="true" className="text-[#2f4126]" />
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Body Weight &amp; Condition Summary
                </h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Latest recorded weight', value: '642 kg' },
                  { label: 'Change since last entry', value: '+4 kg' },
                  { label: 'Condition score', value: '3.25 / 5' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-[#f0eee8] p-4">
                    <p className="text-[11px] font-semibold uppercase text-[#444840]">
                      {item.label}
                    </p>
                    <p className="mt-2 font-heading text-xl font-bold text-[#1b1c18]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-[#444840]">Illustrative</p>
                  </div>
                ))}
              </div>
              <a
                href="#/farm/animals/weight"
                className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2f4126] underline underline-offset-4 ${focusRing}`}
              >
                View full weight history <span aria-hidden="true">→</span>
              </a>
            </section>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <section className="rounded-xl border border-[#c4c8bd] bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Lifecycle History
                </h2>
                <span className="rounded bg-[#f0eee8] px-2 py-0.5 font-mono text-xs text-[#444840]">
                  Confirmed
                </span>
              </div>
              <ol className="mt-5 space-y-4 border-l border-[#d9e8c7] pl-5">
                {TIMELINE.map((item) => (
                  <li key={item.label} className="relative">
                    <span
                      className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full bg-[#46583b]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#1b1c18]">{item.label}</span>
                      <span className="font-mono text-xs text-[#444840]">{item.date}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#444840]">{item.note}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-lg bg-[#f0eee8] p-3 text-xs text-[#444840]">
                Lifecycle transitions, archive actions and workspace transfers require Farm Admin.
              </p>
            </section>

            <section className="rounded-xl border border-[#c4c8bd] bg-white p-6">
              <div className="flex items-center gap-2">
                <Sprout size={18} aria-hidden="true" className="text-[#46583b]" />
                <h2 className="font-heading text-base font-bold text-[#1b1c18]">
                  Ration &amp; Feeding Plan
                </h2>
              </div>
              <dl className="mt-4 space-y-2 rounded-lg bg-[#f0eee8] p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[#444840]">Assigned plan</dt>
                  <dd className="font-semibold text-[#1b1c18]">PLAN-A · reference only</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#444840]">Allocation</dt>
                  <dd className="font-semibold text-[#1b1c18]">Milking group 02</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#444840]">Formulation</dt>
                  <dd className="font-semibold text-[#1b1c18]">Admin managed</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-xl border border-[#c4c8bd] bg-white p-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#444840]">
                <ClipboardList size={15} aria-hidden="true" /> Shift shortcuts
              </p>
              <div className="mt-3 space-y-2">
                {[
                  'Milk production history',
                  'Supervisor shift notes',
                  'Parlor observation notes',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatus(`${item} preview opened.`)}
                    className={`flex w-full items-center justify-between rounded-lg bg-[#f0eee8] px-3 py-2.5 text-left text-sm font-semibold text-[#1b1c18] ${focusRing}`}
                  >
                    {item} <span aria-hidden="true">›</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="rounded-xl bg-[#f0eee8] p-4">
          <label htmlFor="profile-note" className="text-xs font-semibold text-[#444840]">
            Supervisor observation note (local draft only)
          </label>
          <textarea
            id="profile-note"
            rows={2}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Record a routine observation; no data is saved."
            className={`mt-2 w-full rounded-lg border border-[#c4c8bd] bg-white p-3 text-sm ${focusRing}`}
          />
          <p className="mt-2 flex items-center gap-2 text-xs text-[#444840]">
            <Info size={14} aria-hidden="true" /> Permissions are enforced by the server; hiding a
            control here is not an authorization control.
          </p>
        </section>
      </div>
    </main>
  );
}
