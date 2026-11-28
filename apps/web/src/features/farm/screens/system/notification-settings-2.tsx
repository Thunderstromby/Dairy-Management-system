import {
  AlertTriangle,
  BellRing,
  CalendarClock,
  ChevronRight,
  Droplets,
  HeartPulse,
  Lock,
  Mail,
  PackageMinus,
  Save,
  ShieldCheck,
  Stethoscope,
  Syringe,
  UserCheck,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';

type Pref = 'inApp' | 'email';

type Row = {
  id: string;
  label: string;
  detail: string;
  note: string;
  restricted?: boolean;
  inApp: boolean;
  email: boolean;
  icon: typeof HeartPulse;
};

const initialRows: readonly Row[] = [
  {
    id: 'health-high',
    label: 'High & Critical animal health alerts',
    detail: 'Admin-only health escalation category',
    note: 'Delivery of critical health alerts is restricted to Farm Admin recipients. Disabling critical alerts is not confirmed.',
    restricted: true,
    inApp: true,
    email: true,
    icon: AlertTriangle,
  },
  {
    id: 'health-low',
    label: 'Animal health alerts (Low / Moderate)',
    detail: 'Routine observations and non-critical health flags',
    note: 'Standard herd health monitoring updates. Lead times and repetition are unresolved.',
    inApp: true,
    email: false,
    icon: HeartPulse,
  },
  {
    id: 'vaccination',
    label: 'Vaccination reminders',
    detail: 'Scheduled herd immunization notices',
    note: 'Reminder lead times and repetition policies remain unresolved.',
    inApp: true,
    email: true,
    icon: Syringe,
  },
  {
    id: 'production',
    label: 'Milk production alerts',
    detail: 'Yield variance monitoring',
    note: 'The comparison formula is pending approval; no threshold is treated as a confirmed rule.',
    inApp: true,
    email: false,
    icon: Droplets,
  },
  {
    id: 'low-stock',
    label: 'Inventory low-stock notifications',
    detail: 'Feed, supplies and consumables',
    note: 'Trigger reference: current stock at or below configured minimum.',
    inApp: true,
    email: true,
    icon: PackageMinus,
  },
  {
    id: 'expiry',
    label: 'Inventory expiry reminders',
    detail: 'Perishable stock and veterinary supplies',
    note: 'Alerts prior to recorded batch expiration dates.',
    inApp: true,
    email: true,
    icon: CalendarClock,
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

export function NotificationSettings2Screen() {
  const [rows, setRows] = useState<readonly Row[]>(initialRows);
  const [primaryEmail, setPrimaryEmail] = useState('admin@example.invalid');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [notice, setNotice] = useState('');

  const toggle = (id: string, field: Pref, value: boolean) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const saveLocal = () => {
    setNotice('Local preview only — no preference was saved or delivered.');
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
                Notification Settings
              </h1>
              <Badge tone="danger">
                <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin only
              </Badge>
              <Badge>Illustrative</Badge>
            </div>
            <p className="mt-1.5 text-sm text-[#444840]">
              Notification preference layout for a farm workspace. Delivery is unwired; sample
              recipients use reserved example addresses.
            </p>
          </div>
          <div className="flex gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setRows(initialRows);
                setPrimaryEmail('admin@example.invalid');
                setSecondaryEmail('');
                setNotice('Local draft reset.');
              }}
              className="rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#dcdad4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              Cancel changes
            </button>
            <button
              type="button"
              onClick={saveLocal}
              className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-5 py-2 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Save size={16} aria-hidden="true" /> Save settings (local)
            </button>
          </div>
        </header>

        <section
          aria-label="Notification channels"
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          <div className="flex flex-col justify-between rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm lg:col-span-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#d9e8c7] p-2.5 text-[#556249]">
                  <BellRing size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-lg font-semibold">In-App Notifications</h2>
                  <p className="text-xs text-[#444840]">Dashboard alerts and notification center</p>
                </div>
              </div>
              <Switch
                checked={rows[0].inApp}
                onChange={(v) => toggle('health-high', 'inApp', v)}
                label="In-app notifications"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#444840]">
              Example preference for dashboard alerts across the web application. This preview does
              not create notifications or show a live feed.
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-[#eae8e2] pt-3 text-xs text-[#444840]">
              <span>Delivery scope</span>
              <span className="font-medium text-[#46583b]">Web dashboard (unwired)</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#d9e8c7] p-2.5 text-[#556249]">
                  <Mail size={20} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-lg font-semibold">Email Notifications</h2>
                  <p className="text-xs text-[#444840]">Preferences for authorized recipients</p>
                </div>
              </div>
              <Switch
                checked={rows[0].email}
                onChange={(v) => toggle('health-high', 'email', v)}
                label="Email notifications"
              />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="primary-recipient" className="mb-1.5 block text-xs font-semibold">
                  Primary Farm Admin recipient
                </label>
                <div className="relative">
                  <UserCheck
                    size={16}
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556249]"
                  />
                  <input
                    id="primary-recipient"
                    type="email"
                    value={primaryEmail}
                    onChange={(event) => setPrimaryEmail(event.target.value)}
                    className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  />
                </div>
                <p className="mt-1 text-xs text-[#444840]">
                  Reserved example address; not a real account.
                </p>
              </div>
              <div>
                <label htmlFor="secondary-recipient" className="mb-1.5 block text-xs font-semibold">
                  Secondary recipient <span className="font-normal text-[#556249]">(optional)</span>
                </label>
                <div className="relative">
                  <Stethoscope
                    size={16}
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a461c]"
                  />
                  <input
                    id="secondary-recipient"
                    type="email"
                    value={secondaryEmail}
                    onChange={(event) => setSecondaryEmail(event.target.value)}
                    placeholder="second-recipient@example.invalid"
                    className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] pl-9 pr-3 text-sm placeholder:text-[#556249] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  />
                </div>
                <p className="mt-1 text-xs text-[#444840]">
                  Email recipients and delivery remain approval-gated.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="preferences-title"
          className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-[#c4c8bd] bg-[#f0eee8] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="preferences-title" className="font-heading text-xl font-semibold">
                Notification types &amp; permitted preferences
              </h2>
              <p className="mt-0.5 text-xs text-[#444840]">
                In-app and email preferences for each illustrative notification category.
              </p>
            </div>
            <Badge>{rows.length} categories (illustrative)</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#c4c8bd] bg-[#f5f3ed] text-xs uppercase tracking-wide text-[#444840]">
                  <th scope="col" className="px-6 py-3.5 font-semibold">
                    Notification type
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Trigger &amp; policy notes
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center font-semibold">
                    In-app
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-center font-semibold">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {rows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <tr key={row.id} className={row.restricted ? 'bg-[#eae8e2]/30' : ''}>
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <Icon
                            size={20}
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-[#46583b]"
                          />
                          <div>
                            <div className="font-semibold">{row.label}</div>
                            <div className="mt-0.5 text-xs text-[#444840]">{row.detail}</div>
                            {row.restricted ? (
                              <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#eae8e2] px-2 py-0.5 text-xs font-semibold text-[#7a461c]">
                                <Lock size={12} aria-hidden="true" /> Farm Admin recipients only
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-[#444840]">{row.note}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center">
                          <Switch
                            checked={row.inApp}
                            onChange={(value) => toggle(row.id, 'inApp', value)}
                            label={`In-app preference for ${row.label}`}
                            small
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <Switch
                            checked={row.email}
                            onChange={(value) => toggle(row.id, 'email', value)}
                            label={`Email preference for ${row.label}`}
                            small
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setNotice('Local draft reset.')}
            className="rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#dcdad4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <X size={14} className="mr-1 inline" aria-hidden="true" /> Cancel changes
          </button>
          <button
            type="button"
            onClick={saveLocal}
            className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-5 py-2 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <Save size={16} aria-hidden="true" /> Save settings (local)
          </button>
        </div>
        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'Preview only — no preference has been persisted or delivered.'}
        </p>
      </div>
    </div>
  );
}
