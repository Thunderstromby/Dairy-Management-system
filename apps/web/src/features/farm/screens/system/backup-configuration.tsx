import {
  Check,
  ChevronRight,
  Cloud,
  History,
  HardDrive,
  Info,
  Save,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

const history = [
  {
    id: 'BKP-EXAMPLE-01',
    date: 'Example 24 Oct · 04:00',
    type: 'Automatic',
    target: 'Local option',
  },
  {
    id: 'BKP-EXAMPLE-02',
    date: 'Example 23 Oct · 04:00',
    type: 'Automatic',
    target: 'Local option',
  },
  { id: 'BKP-EXAMPLE-03', date: 'Example 20 Oct · 16:30', type: 'Manual', target: 'Cloud option' },
  {
    id: 'BKP-EXAMPLE-04',
    date: 'Example 17 Oct · 04:00',
    type: 'Automatic',
    target: 'Local option',
  },
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

export function BackupConfigurationScreen() {
  const [automatic, setAutomatic] = useState(true);
  const [storage, setStorage] = useState<'local' | 'cloud'>('local');
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#444840]">
              <span>Data Management</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="font-bold text-[#2f4126]">Backup Configuration</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Backup Configuration
              </h1>
              <Badge tone="danger">
                <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
              </Badge>
              <Badge>Illustrative</Badge>
            </div>
            <p className="mt-1 text-sm text-[#444840]">
              Example workspace context. This is a local preview only — no backup, restore, or file
              download is performed.
            </p>
          </div>
        </header>

        <section className="flex items-start gap-3 rounded-xl border border-[#c4c8bd] bg-[#f0eee8] p-4 shadow-sm">
          <Info size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a461c]" />
          <div>
            <h2 className="font-heading text-sm font-bold">Unconfirmed backup policy</h2>
            <p className="mt-1 text-sm text-[#444840]">
              Exact frequency, retention periods, storage target, encryption model, restore
              authority, and RPO/RTO remain unconfirmed. Actions on this screen do not create a
              backup or persist a setting.
            </p>
          </div>
        </section>

        <section aria-label="Backup summary" className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            {
              label: 'Backup status',
              value: 'Preferences staged (example)',
              hint: 'No operation executed',
              icon: Check,
            },
            {
              label: 'Last recorded date',
              value: 'Example 24 Oct · 04:00',
              hint: 'Illustrative record',
              icon: History,
            },
            {
              label: 'Storage preference',
              value: storage === 'local' ? 'Local option' : 'Cloud option',
              hint: 'Selectable below',
              icon: HardDrive,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#444840]">
                  {card.label}
                </span>
                <card.icon size={18} aria-hidden="true" className="text-[#46583b]" />
              </div>
              <p className="font-heading mt-2 text-base font-bold">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.hint}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <section
              aria-labelledby="auto-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 id="auto-title" className="font-heading text-base font-bold">
                    Automatic backup capability
                  </h2>
                  <p className="mt-1 text-sm text-[#444840]">
                    Illustrative preference. Schedule and retention intervals are pending
                    confirmation.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={automatic}
                  aria-label="Automatic backup capability preference"
                  onClick={() => setAutomatic(!automatic)}
                  className={`relative h-6 w-11 shrink-0 rounded-full border border-[#c4c8bd] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
                    automatic ? 'bg-[#46583b]' : 'bg-[#eae8e2]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform motion-reduce:transition-none ${
                      automatic ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </section>

            <section
              aria-labelledby="storage-title"
              className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <h2 id="storage-title" className="font-heading text-base font-bold">
                Storage option presentation
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Illustrative destination preference. No provider is enabled or connected.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    id: 'local' as const,
                    label: 'Local storage option',
                    detail: 'Designated local farm infrastructure (example)',
                    icon: HardDrive,
                  },
                  {
                    id: 'cloud' as const,
                    label: 'Cloud storage option',
                    detail: 'Designated off-site environment (example)',
                    icon: Cloud,
                  },
                ].map((option) => (
                  <label
                    key={option.id}
                    htmlFor={`storage-${option.id}`}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors motion-reduce:transition-none ${
                      storage === option.id
                        ? 'border-[#46583b] bg-[#d9e8c7]/30'
                        : 'border-transparent bg-[#f5f3ed] hover:bg-[#eae8e2]'
                    }`}
                  >
                    <input
                      id={`storage-${option.id}`}
                      type="radio"
                      name="storage-option"
                      checked={storage === option.id}
                      onChange={() => setStorage(option.id)}
                      className="mt-1 h-4 w-4 accent-[#46583b]"
                    />
                    <span>
                      <span className="flex items-center gap-1.5 text-sm font-bold">
                        <option.icon size={18} aria-hidden="true" className="text-[#556249]" />{' '}
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs text-[#444840]">{option.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <section
              aria-labelledby="actions-title"
              className="flex flex-col gap-4 rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
            >
              <div>
                <h2 id="actions-title" className="font-heading text-base font-bold">
                  Backup actions
                </h2>
                <p className="mt-1 text-xs text-[#444840]">Local preview controls only.</p>
              </div>
              <button
                type="button"
                onClick={() => setNotice('No backup was initiated — this is a local preview.')}
                className="w-full rounded-lg bg-[#46583b] px-4 py-3 text-sm font-bold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                Initiate manual backup (preview only)
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setNotice('Local preview only — no configuration was saved.')}
                  className="flex-1 rounded-lg bg-[#556249] px-3 py-2.5 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  <Save size={14} className="mr-1 inline" aria-hidden="true" /> Save (local)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAutomatic(true);
                    setStorage('local');
                    setNotice('Local draft reset.');
                  }}
                  className="rounded-lg bg-[#f0eee8] px-3 py-2.5 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#eae8e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                >
                  <X size={14} className="mr-1 inline" aria-hidden="true" /> Discard
                </button>
              </div>
              <p className="rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                Restore controls remain blocked pending approval. No backup file is downloaded.
              </p>
            </section>
          </div>
        </div>

        <section
          aria-labelledby="history-title"
          className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-[#c4c8bd] bg-[#f5f3ed] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="history-title" className="font-heading text-lg font-bold">
                Existing backup status &amp; history
              </h2>
              <p className="text-xs text-[#444840]">
                Illustrative records — download and restore are unavailable.
              </p>
            </div>
            <Badge>{history.length} example records</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-xs uppercase tracking-wide text-[#444840]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Backup ID
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Date / time
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Storage target
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {history.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-mono text-xs font-semibold">{row.id}</td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.date}</td>
                    <td className="px-3 py-3">
                      <Badge tone={row.type === 'Manual' ? 'neutral' : 'primary'}>{row.type}</Badge>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{row.target}</td>
                    <td className="px-4 py-3 text-right">
                      <Badge>Illustrative</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no backup was executed, stored, or restored.'}
        </p>
      </div>
    </div>
  );
}
