import { useState } from 'react';
import {
  Bell,
  ClipboardList,
  Droplets,
  Info,
  LayoutDashboard,
  LockKeyhole,
  PackageOpen,
  Scale,
  Sprout,
  Users,
  Wrench,
} from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const MODULES = [
  { label: 'Dashboard', detail: 'Operational overview', icon: LayoutDashboard },
  { label: 'Animals', detail: 'Permitted animal records', icon: ClipboardList },
  { label: 'Animal health', detail: 'Routine observation only', icon: Scale },
  { label: 'Milk production', detail: 'Session entry and totals', icon: Droplets },
  { label: 'Feeding', detail: 'Assigned plans and entries', icon: Sprout },
  { label: 'Inventory', detail: 'Approved usage logging', icon: PackageOpen },
  { label: 'Workers', detail: 'Attendance records', icon: Users },
  { label: 'Equipment', detail: 'Condition and service', icon: Wrench },
  { label: 'Notifications', detail: 'Routine notices only', icon: Bell },
] as const;

const EXCLUDED = [
  'Finance, billing and invoices',
  'Payroll, wages and payslips',
  'Farm settings and configuration',
  'Backup, import and export',
  'Stock corrections and animal archiving',
  'Supervisor account management',
  'Super Admin platform features',
  'High / Critical health alerts',
] as const;

/**
 * Source: stitch_smartfarm_supervisor_interface_shell/supervisor_shell_component_system
 * Component reference only — not an authenticated route. No full-page shell is rendered here;
 * the application shell provides navigation and header.
 */
export function SupervisorShellComponentSystemScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#556249]">
            Component / shell reference
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
            Workspace Architecture &amp; Component System
          </h1>
          <p className="max-w-3xl text-sm text-[#444840]">
            Reference sheet for the supervisor visual language. Navigation visibility is not
            authorization, and server-side policy remains authoritative.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-12">
          <div className="rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-8">
            <h2 className="font-heading text-base font-bold text-[#1b1c18]">
              Permitted operational modules
            </h2>
            <p className="mt-1 text-sm text-[#444840]">
              Reference set for supervisor navigation. Routes are provided by the application shell.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map(({ label, detail, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelected(label)}
                  className={`flex items-start gap-3 rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] p-3 text-left transition-colors duration-150 hover:bg-[#f0eee8] motion-reduce:transition-none ${focusRing}`}
                >
                  <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
                  <span>
                    <strong className="block text-sm text-[#1b1c18]">{label}</strong>
                    <span className="block text-xs text-[#444840]">{detail}</span>
                  </span>
                </button>
              ))}
            </div>
            {selected ? (
              <p
                role="status"
                className="mt-4 rounded-lg bg-[#d9e8c7] px-3 py-2 text-xs text-[#46583b]"
              >
                {selected} is part of the supervisor reference set. Selection is local only.
              </p>
            ) : null}
          </div>

          <div className="rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-4">
            <div className="flex items-center gap-2">
              <LockKeyhole size={18} aria-hidden="true" className="text-[#ba1a1a]" />
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">Excluded domains</h2>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[#444840]">
              {EXCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-lg bg-[#f0eee8] px-3 py-2">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ba1a1a]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {[
            {
              title: 'Typography',
              body: 'Manrope headings (font-heading) and Inter body (font-inter).',
            },
            {
              title: 'Colour',
              body: 'Warm ivory surfaces, white panels, olive primary and copper accent tokens.',
            },
            {
              title: 'Interaction',
              body: 'Visible focus, keyboard access, reduced-motion-safe transitions and 44px+ controls.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <h3 className="font-heading text-sm font-bold text-[#1b1c18]">{item.title}</h3>
              <p className="mt-1 text-sm text-[#444840]">{item.body}</p>
            </div>
          ))}
        </section>

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            No device telemetry, RFID, pen transfer action, critical triage badge or veterinary
            dispensation control is reproduced from the source export.
          </p>
        </div>
      </div>
    </main>
  );
}
