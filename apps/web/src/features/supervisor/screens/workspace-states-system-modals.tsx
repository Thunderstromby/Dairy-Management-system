import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  LoaderCircle,
  LockKeyhole,
  WifiOff,
} from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const STATES = [
  'Active workspace',
  'Invalid credentials',
  'Workspace suspended',
  'Access restricted',
  'Connection required',
  'Loading',
  'Validation',
] as const;

/**
 * Source: stitch_smartfarm_supervisor_interface_shell/workspace_states_system_modals
 * State/component reference only — not an authenticated route. Telemetry claims, disallowed
 * permissions and fake sync statuses from the export are intentionally omitted.
 */
export function WorkspaceStatesSystemModalsScreen() {
  const [state, setState] = useState<string>('Active workspace');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#556249]">
            Component / state reference
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
            Workspace States &amp; System Modals
          </h1>
          <p className="max-w-3xl text-sm text-[#444840]">
            Small explicit reference screen for approved interface states. It is a design reference,
            not an authenticated farm page, and shows no live status or simulated data.
          </p>
        </header>

        <div role="tablist" aria-label="Interface state previews" className="flex flex-wrap gap-2">
          {STATES.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={state === item}
              onClick={() => setState(item)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${state === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="rounded-xl border border-[#c4c8bd] bg-white p-6" aria-live="polite">
          {state === 'Active workspace' ? (
            <div className="flex items-start gap-3">
              <CheckCircle2 size={22} aria-hidden="true" className="mt-0.5 text-[#46583b]" />
              <div>
                <h2 className="font-heading text-lg font-bold">Workspace active</h2>
                <p className="mt-1 text-sm text-[#444840]">
                  Authorized supervisor access is available for the assigned workspace. No live
                  status, quota or telemetry indicator is implied.
                </p>
                <p className="mt-3 text-xs text-[#444840]">
                  Reference values are illustrative and are not shown as operational records.
                </p>
              </div>
            </div>
          ) : null}

          {state === 'Invalid credentials' ? (
            <div className="flex items-start gap-3">
              <LockKeyhole size={22} aria-hidden="true" className="mt-0.5 text-[#ba1a1a]" />
              <div>
                <h2 className="font-heading text-lg font-bold">Invalid credentials</h2>
                <p className="mt-1 text-sm text-[#444840]">
                  Sign-in was not completed. The message is generic by design and does not reveal
                  whether an account exists.
                </p>
                <button
                  type="button"
                  onClick={() => setState('Active workspace')}
                  className={`mt-4 h-10 rounded-lg bg-[#46583b] px-4 text-sm font-semibold text-white ${focusRing}`}
                >
                  Return to workspace reference
                </button>
              </div>
            </div>
          ) : null}

          {state === 'Workspace suspended' ? (
            <div className="flex items-start gap-3">
              <AlertTriangle size={22} aria-hidden="true" className="mt-0.5 text-[#7a461c]" />
              <div>
                <h2 className="font-heading text-lg font-bold">Workspace suspended</h2>
                <p className="mt-1 text-sm text-[#444840]">
                  Access is blocked by workspace status. Records are preserved. Contact Farm Admin
                  for status information; no self-service restoration is presented.
                </p>
              </div>
            </div>
          ) : null}

          {state === 'Access restricted' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <LockKeyhole size={22} aria-hidden="true" className="mt-0.5 text-[#ba1a1a]" />
                <div>
                  <h2 className="font-heading text-lg font-bold">Access restricted</h2>
                  <p className="mt-1 text-sm text-[#444840]">
                    Finance, payroll, farm settings, backup, import, export and privileged
                    configuration actions are excluded from the supervisor role.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-[#f0eee8] p-4">
                  <h3 className="font-heading text-sm font-bold text-[#46583b]">Permitted</h3>
                  <p className="mt-1 text-xs text-[#444840]">
                    Operational entry, routine observation and permitted record views.
                  </p>
                </div>
                <div className="rounded-lg bg-[#f0eee8] p-4">
                  <h3 className="font-heading text-sm font-bold text-[#ba1a1a]">Restricted</h3>
                  <p className="mt-1 text-xs text-[#444840]">
                    Finance, payroll, settings, stock correction, animal archive and account
                    management.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {state === 'Connection required' ? (
            <div className="flex items-start gap-3">
              <WifiOff size={22} aria-hidden="true" className="mt-0.5 text-[#ba1a1a]" />
              <div>
                <h2 className="font-heading text-lg font-bold">Connection required</h2>
                <p className="mt-1 text-sm text-[#444840]">
                  SmartFarm requires a connection to fetch and save records. Offline entry and local
                  queues are not supported; no endpoint or retry simulation is shown.
                </p>
              </div>
            </div>
          ) : null}

          {state === 'Loading' ? (
            <div className="space-y-3">
              <h2 className="font-heading text-lg font-bold">Loading state</h2>
              <p className="flex items-center gap-2 text-sm text-[#444840]">
                <LoaderCircle
                  size={18}
                  aria-hidden="true"
                  className="animate-spin motion-reduce:animate-none"
                />
                Preparing the reference view.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-lg bg-[#f0eee8] motion-reduce:animate-none"
                  />
                ))}
              </div>
            </div>
          ) : null}

          {state === 'Validation' ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setError(name.trim() ? '' : 'A value is required before continuing.');
              }}
              noValidate
              className="max-w-md space-y-3"
            >
              <h2 className="font-heading text-lg font-bold">Field validation</h2>
              <label htmlFor="reference-value" className="block text-sm font-semibold">
                Example required value
              </label>
              <input
                id="reference-value"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'reference-error' : undefined}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
              {error ? (
                <p
                  id="reference-error"
                  role="alert"
                  className="text-sm font-semibold text-[#ba1a1a]"
                >
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className={`h-10 rounded-lg bg-[#46583b] px-4 text-sm font-semibold text-white ${focusRing}`}
              >
                Validate
              </button>
            </form>
          ) : null}
        </section>

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-sm text-[#444840]">
            This is a reference screen. It does not authenticate, persist data, show high or
            critical alerts, or offer restricted actions such as milk diversion, drug dispensation
            or account provisioning.
          </p>
        </div>
      </div>
    </main>
  );
}
