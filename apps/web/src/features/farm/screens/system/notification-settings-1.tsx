import {
  AlertTriangle,
  BellRing,
  CalendarClock,
  ChevronRight,
  Lock,
  Mail,
  Save,
  ShieldCheck,
  Volume2,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

type MatrixRow = {
  id: string;
  label: string;
  tag: string;
  detail: string;
  note: string;
  restricted?: boolean;
  inApp: boolean;
  email: boolean;
};

const initialMatrix: readonly MatrixRow[] = [
  {
    id: 'critical',
    label: 'High & Critical animal health alerts',
    tag: 'Restricted',
    detail: 'Farm Admin recipients only',
    note: 'Critical health delivery is restricted by policy; whether it can be disabled remains unresolved.',
    restricted: true,
    inApp: true,
    email: true,
  },
  {
    id: 'vaccination',
    label: 'Vaccination due reminders',
    tag: 'Preventive',
    detail: 'Scheduled herd doses',
    note: 'Lead time and repetition rules are unresolved.',
    inApp: true,
    email: true,
  },
  {
    id: 'production',
    label: 'Milk production drop notice',
    tag: 'Production',
    detail: 'Illustrative yield variance',
    note: 'Comparison formula is pending approval; no threshold is confirmed here.',
    inApp: true,
    email: false,
  },
  {
    id: 'stock',
    label: 'Inventory minimum stock',
    tag: 'Supply',
    detail: 'Illustrative reorder reference',
    note: 'Trigger reference: stock at or below configured minimum.',
    inApp: true,
    email: true,
  },
  {
    id: 'expiry',
    label: 'Inventory / medication expiry',
    tag: 'Reminder',
    detail: 'Illustrative batch expiry',
    note: 'Alerts prior to recorded batch expiration dates.',
    inApp: true,
    email: true,
  },
  {
    id: 'attendance',
    label: 'Workforce attendance discrepancy',
    tag: 'Operations',
    detail: 'Illustrative shift check',
    note: 'Payroll and salary data are excluded from Supervisor notifications.',
    inApp: true,
    email: false,
  },
];

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

function Switch({
  checked,
  onChange,
  label,
  small = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 rounded-full border border-[#c4c8bd] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b] ${
        small ? 'h-5 w-9' : 'h-6 w-11'
      } ${checked ? 'bg-[#46583b]' : 'bg-[#dcdad4]'}`}
    >
      <span
        className={`absolute top-0.5 rounded-full bg-white transition-transform motion-reduce:transition-none ${
          small ? 'h-4 w-4' : 'h-5 w-5'
        } ${checked ? (small ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0.5'}`}
      />
    </button>
  );
}

export function NotificationSettings1Screen() {
  const [rows, setRows] = useState<readonly MatrixRow[]>(initialMatrix);
  const [primary, setPrimary] = useState('admin@example.invalid');
  const [secondary, setSecondary] = useState('');
  const [cues, setCues] = useState({ visual: true, audible: false });
  const [notice, setNotice] = useState('');

  const setField = (id: string, field: 'inApp' | 'email', value: boolean) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 py-6 md:p-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#444840]">
              <span>Settings &amp; Configuration</span>
              <ChevronRight size={14} aria-hidden="true" />
              <span className="font-semibold text-[#46583b]">Notification Settings</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                Notification preferences &amp; channel routing
              </h1>
              <Badge tone="danger">
                <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin authority
              </Badge>
              <Badge>Alternative layout — illustrative</Badge>
            </div>
            <p className="mt-1.5 text-sm text-[#444840]">
              Alternative notification routing layout. Recipient fields use reserved example
              addresses and no delivery is simulated.
            </p>
          </div>
          <div className="flex gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setRows(initialMatrix);
                setPrimary('admin@example.invalid');
                setSecondary('');
                setNotice('Local draft reset.');
              }}
              className="rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#dcdad4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              Cancel changes
            </button>
            <button
              type="button"
              onClick={() => setNotice('Local preview only — no preference was saved.')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2f4126] px-4 py-2 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save notification settings (local)
            </button>
          </div>
        </header>

        <section
          aria-label="Policy boundary"
          className="relative overflow-hidden rounded-xl border border-[#c4c8bd] bg-white p-4 shadow-sm"
        >
          <span className="absolute inset-y-0 left-0 w-1.5 bg-[#7a461c]" aria-hidden="true" />
          <div className="flex flex-col gap-3 pl-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-[#eae8e2] p-2 text-[#7a461c]">
                <AlertTriangle size={20} aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-sm font-bold uppercase tracking-wide">
                    Notification permission boundary
                  </h2>
                  <Badge tone="danger">Health alert restriction</Badge>
                </div>
                <p className="mt-1 text-sm text-[#444840]">
                  High and Critical animal health notifications are restricted to Farm Admin
                  recipients. Whether they may be disabled is unresolved; this preview does not
                  assert a permanent or regulatory lock.
                </p>
              </div>
            </div>
            <Badge>Preview only</Badge>
          </div>
        </section>

        <section
          aria-label="Channel configuration"
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          <div className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm lg:col-span-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#d9e8c7] p-2.5 text-[#556249]">
                  <BellRing size={22} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-base font-semibold">In-app dashboard channel</h2>
                  <p className="text-xs text-[#444840]">Dashboard alerts and notice badges</p>
                </div>
              </div>
              <Switch
                checked={rows[0].inApp}
                onChange={(value) => setField('critical', 'inApp', value)}
                label="In-app channel"
              />
            </div>
            <p className="mt-3 text-sm text-[#444840]">
              Illustrative in-app channel preference. No live badge count, audio cue, or hardware
              integration is represented.
            </p>
            <div className="mt-4 rounded-lg bg-[#f0eee8] p-3 text-xs text-[#444840]">
              Connected terminals: not simulated in this preview.
            </div>
          </div>

          <div className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm lg:col-span-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#d9e8c7] p-2.5 text-[#556249]">
                  <Mail size={22} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-base font-semibold">Email channel</h2>
                  <p className="text-xs text-[#444840]">Preferences for authorized recipients</p>
                </div>
              </div>
              <Switch
                checked={rows[0].email}
                onChange={(value) => setField('critical', 'email', value)}
                label="Email channel"
              />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="alt-primary" className="mb-1.5 block text-xs font-semibold">
                  Primary Farm Admin recipient
                </label>
                <input
                  id="alt-primary"
                  type="email"
                  value={primary}
                  onChange={(event) => setPrimary(event.target.value)}
                  className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                />
              </div>
              <div>
                <label htmlFor="alt-secondary" className="mb-1.5 block text-xs font-semibold">
                  Secondary recipient (optional)
                </label>
                <input
                  id="alt-secondary"
                  type="email"
                  value={secondary}
                  onChange={(event) => setSecondary(event.target.value)}
                  placeholder="secondary@example.invalid"
                  className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm placeholder:text-[#556249] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="matrix-title"
          className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-[#c4c8bd] bg-[#f0eee8] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="matrix-title" className="font-heading text-xl font-semibold">
                Notification routing matrix
              </h2>
              <p className="mt-0.5 text-xs text-[#444840]">
                Illustrative per-category preferences. No dispatch or suppression rule is executed.
              </p>
            </div>
            <Badge>{rows.length} illustrative rules</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="bg-[#f5f3ed] text-xs uppercase tracking-wide text-[#444840]">
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Event &amp; classification
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Scope
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold">
                    In-app
                  </th>
                  <th scope="col" className="px-4 py-3 text-center font-semibold">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold">
                    Policy note
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {rows.map((row) => (
                  <tr key={row.id} className={row.restricted ? 'bg-[#eae8e2]/30' : ''}>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {row.restricted ? (
                          <Lock size={18} aria-hidden="true" className="mt-0.5 text-[#7a461c]" />
                        ) : (
                          <BellRing
                            size={18}
                            aria-hidden="true"
                            className="mt-0.5 text-[#46583b]"
                          />
                        )}
                        <div>
                          <div className="font-semibold">{row.label}</div>
                          <div className="mt-0.5 text-xs text-[#444840]">{row.detail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <Badge tone={row.restricted ? 'danger' : 'primary'}>{row.tag}</Badge>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={row.inApp}
                          onChange={(value) => setField(row.id, 'inApp', value)}
                          label={`In-app preference for ${row.label}`}
                          small
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={row.email}
                          onChange={(value) => setField(row.id, 'email', value)}
                          label={`Email preference for ${row.label}`}
                          small
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#444840]">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-label="Interface cues" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#f0eee8] p-2.5 text-[#46583b]">
                <Volume2 size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-base font-semibold">Interface cues</h2>
                <p className="text-xs text-[#444840]">Visual and audible preference layout only</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-3">
                <span className="text-sm">Persistent visual banner</span>
                <Switch
                  checked={cues.visual}
                  onChange={(value) => setCues((current) => ({ ...current, visual: value }))}
                  label="Persistent visual banner preference"
                />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#f5f3ed] p-3">
                <span className="text-sm">Audible alert cue</span>
                <Switch
                  checked={cues.audible}
                  onChange={(value) => setCues((current) => ({ ...current, audible: value }))}
                  label="Audible cue preference"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-[#444840]">
              No parlor hardware, RFID, autoplay media, or continuous tone is implemented.
            </p>
          </div>
          <div className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#f0eee8] p-2.5 text-[#7a461c]">
                <CalendarClock size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-base font-semibold">Approval-gated settings</h2>
                <p className="text-xs text-[#444840]">Not implemented in this preview</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[#444840]">
              <li>• Critical-alert suppression policy — unresolved.</li>
              <li>• Reminder lead times and repetition — unresolved.</li>
              <li>• Email recipient and OTP policy — unresolved.</li>
            </ul>
          </div>
        </section>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no preference has been persisted or delivered.'}
        </p>
      </div>
    </div>
  );
}
