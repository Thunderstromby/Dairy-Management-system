import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Droplets,
  Eye,
  FileText,
  History,
  Info,
  PawPrint,
  Scale,
  Stethoscope,
  TrendingUp,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-heading text-base font-bold text-[#1b1c18]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function InfoRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-lg bg-[#f5f3ed] px-3 py-2">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-[#444840]">{label}</dt>
      <dd className="mt-0.5 font-heading text-sm font-bold text-[#1b1c18]">{value}</dd>
      {note ? <dd className="text-xs text-[#444840]">{note}</dd> : null}
    </div>
  );
}

const lifecycle = [
  { label: 'Born', date: 'Sample date 1' },
  { label: 'Weaned', date: 'Sample date 2' },
  { label: 'Breeding', date: 'Sample date 3' },
  { label: 'First calving', date: 'Sample date 4' },
  { label: 'Current lactation', date: 'Sample date 5' },
];

const documents = [
  { name: 'Pedigree certificate', detail: 'Illustrative attachment metadata' },
  { name: 'Calving clearance', detail: 'Illustrative attachment metadata' },
  { name: 'Ear-tag verification photo', detail: 'Illustrative attachment metadata' },
];

export function AnimalProfile360View() {
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
          <span>Animal management</span>
          <ChevronRight aria-hidden="true" size={13} />
          <span className="text-[#2f4126]">Profile overview</span>
          <span className="ml-2 rounded bg-[#f0eee8] px-2 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
            Illustrative
          </span>
        </div>

        <header className="rounded-xl border border-[#c4c8bd]/50 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start gap-4">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-[#f0eee8] text-[#2f4126]">
              <PawPrint aria-hidden="true" size={36} />
            </div>
            <div className="min-w-[240px] flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1b1c18] sm:text-3xl">
                  Animal A
                </h1>
                <span className="rounded bg-[#f0eee8] px-2 py-0.5 font-mono text-xs font-semibold text-[#2f4126]">
                  TAG-A-01
                </span>
              </div>
              <p className="mt-1 text-sm text-[#444840]">
                Internal ID: ID-0001 · Illustrative profile · no real animal identity
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#2f4126]">
                  Active · lactating
                </span>
                <span className="rounded-full bg-[#eae8e2] px-2.5 py-1 text-xs font-semibold text-[#444840]">
                  Pen 04
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setNotice('Profile editing is not available in this visual prototype.')
                }
                className={`rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white ${focus}`}
              >
                Edit profile
              </button>
              <button
                type="button"
                onClick={() =>
                  setNotice(
                    'Weight logging is available in the Weight History screen; nothing is saved here.',
                  )
                }
                className={`rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-semibold text-[#1b1c18] ${focus}`}
              >
                Log weight
              </button>
            </div>
          </div>
          {notice ? (
            <p role="status" className="mt-3 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
              {notice}
            </p>
          ) : null}
          <p className="mt-3 text-xs text-[#444840]">
            Lifecycle transitions, archive actions and privileged health actions are not reproduced.
          </p>
        </header>

        <section aria-label="Animal summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              label: 'Daily average yield',
              value: '27.7',
              unit: 'L/day',
              icon: <Droplets aria-hidden="true" size={18} />,
            },
            {
              label: 'Days in milk',
              value: '73',
              unit: 'days',
              icon: <CalendarDays aria-hidden="true" size={18} />,
            },
            {
              label: 'Latest recorded weight',
              value: '642',
              unit: 'kg',
              icon: <Scale aria-hidden="true" size={18} />,
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
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">
                {item.value}{' '}
                <span className="text-sm font-semibold text-[#444840]">{item.unit}</span>
              </p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title="Core Identification & Phenotype">
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <InfoRow label="Breed" value="Holstein Friesian" note="Illustrative" />
              <InfoRow label="Sex" value="Female" note="Illustrative" />
              <InfoRow label="Date of birth" value="Sample date" note="Age not calculated" />
              <InfoRow label="Lactation stage" value="Second lactation" note="Illustrative" />
              <InfoRow label="Identification" value="Tag TAG-A-01" note="Neutral placeholder" />
              <InfoRow
                label="Group"
                value="Lactating herd"
                note="Illustrative override note omitted"
              />
            </dl>
          </Card>

          <Card title="Location & Pedigree Lineage">
            <div className="rounded-lg bg-[#f0eee8] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#444840]">
                Current housing group
              </p>
              <p className="font-heading text-sm font-bold text-[#1b1c18]">
                Lactating herd · Pen 04
              </p>
            </div>
            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <InfoRow label="Mother (dam)" value="Animal D-01" note="TAG-D-01 · illustrative" />
              <InfoRow
                label="Father (sire)"
                value="Sire S-01"
                note="Neutral registered sire placeholder"
              />
            </dl>
            <h3 className="mt-4 font-heading text-sm font-bold text-[#1b1c18]">
              Registered offspring (2)
            </h3>
            <ul className="mt-2 flex flex-col gap-2">
              {['Animal E · TAG-A-05 · active', 'Animal G · TAG-A-07 · sold'].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-2 rounded-lg bg-[#f5f3ed] p-2 text-xs"
                >
                  {item}
                  <ChevronRight aria-hidden="true" size={14} />
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card title="Lifecycle Progression & Origin">
          <p className="text-sm text-[#444840]">
            Illustrative milestones only; no dates imply current farm data.
          </p>
          <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {lifecycle.map((step, index) => (
              <li key={step.label} className="flex flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white ${
                    index === lifecycle.length - 1 ? 'bg-[#46583b]' : 'bg-[#2f4126]'
                  }`}
                >
                  {index === lifecycle.length - 1 ? (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  ) : (
                    '✓'
                  )}
                </span>
                <span className="mt-2 font-heading text-xs font-bold text-[#1b1c18]">
                  {step.label}
                </span>
                <span className="text-[11px] text-[#444840]">{step.date}</span>
              </li>
            ))}
          </ol>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title="Clinical Health Status">
            <div className="rounded-lg bg-[#f0eee8] p-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-[#1b1c18]">
                <Stethoscope aria-hidden="true" size={16} /> Routine monitoring
              </p>
              <p className="mt-1 text-xs text-[#444840]">
                Low and Moderate severity records are shown as illustrative notes only; no
                diagnosis, medication or dosage is reproduced.
              </p>
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] p-3 text-xs text-[#444840]">
              <Info aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-[#ba1a1a]" />
              High and Critical health records are restricted to Farm Admin views and are not shown
              here.
            </div>
          </Card>

          <Card title="Milking Performance">
            <div className="grid grid-cols-2 gap-2">
              <InfoRow label="Today's total" value="27.7 L" />
              <InfoRow label="Projection" value="Not approved" note="No formula applied" />
            </div>
            <div
              role="img"
              aria-label="Illustrative seven-day yield preview with no calculated trend."
              className="mt-3 flex h-24 items-end gap-1.5"
            >
              {[55, 62, 58, 70, 66, 74, 68].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t bg-[#d9e8c7]"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-[#444840]">Text summary: sample values only.</p>
          </Card>
        </div>

        <Card title="Growth & Weight Trajectory">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-heading text-xl font-bold text-[#2f4126]">
              642 kg{' '}
              <span className="text-sm font-semibold text-[#444840]">
                latest illustrative weight
              </span>
            </p>
            <span className="rounded bg-[#f0eee8] px-2 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
              Illustrative
            </span>
          </div>
          <div
            role="img"
            aria-label="Illustrative weight history preview with three sample points."
            className="mt-3 flex h-24 items-end gap-1"
          >
            {[42, 58, 76].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t bg-[#46583b]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-[#444840]">
            No growth formula or unit conversion is applied. Full history is in the Weight History
            screen.
          </p>
        </Card>

        <Card
          title="Compliance Dossier & Attachments"
          action={
            <button
              type="button"
              onClick={() => setNotice('Attachment upload is not wired in this prototype.')}
              className={`inline-flex items-center gap-1 text-sm font-semibold text-[#2f4126] ${focus}`}
            >
              Attach file <ArrowRight aria-hidden="true" size={14} />
            </button>
          }
        >
          <ul className="flex flex-col gap-2">
            {documents.map((document) => (
              <li
                key={document.name}
                className="flex items-center justify-between gap-3 rounded-lg bg-[#f5f3ed] p-3"
              >
                <div className="flex items-center gap-2">
                  <FileText aria-hidden="true" size={18} className="text-[#444840]" />
                  <div>
                    <p className="text-sm font-semibold">{document.name}</p>
                    <p className="text-xs text-[#444840]">{document.detail}</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Preview ${document.name}`}
                  className={`rounded-lg p-1.5 text-[#444840] ${focus}`}
                >
                  <Eye aria-hidden="true" size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#444840]">
            <span className="flex items-center gap-1">
              <History aria-hidden="true" size={13} /> Local preview only
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp aria-hidden="true" size={13} /> No live trend
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
