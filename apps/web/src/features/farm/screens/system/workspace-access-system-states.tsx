import { Ban, CirclePause, Info, LockKeyhole, ShieldCheck, WifiOff } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type StateId = 'suspended' | 'restricted' | 'connectivity';

const tabs: readonly { id: StateId; label: string; icon: typeof Ban }[] = [
  { id: 'suspended', label: 'Workspace suspended', icon: CirclePause },
  { id: 'restricted', label: 'Restricted access', icon: LockKeyhole },
  { id: 'connectivity', label: 'Connectivity required', icon: WifiOff },
];

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#eae8e2] px-2.5 py-0.5 text-[11px] font-semibold text-[#444840]">
      {children}
    </span>
  );
}

export function WorkspaceAccessSystemStatesScreen() {
  const [state, setState] = useState<StateId>('suspended');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4 md:p-6">
        <div className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eee8] text-[#2f4126]">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="font-heading text-base font-bold">SmartFarm</p>
              <p className="text-xs uppercase tracking-wide text-[#444840]">
                Farm workspace access states
              </p>
            </div>
            <Badge>State reference — not a route</Badge>
            <Badge>Illustrative</Badge>
          </div>

          <div
            className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3"
            role="tablist"
            aria-label="Access state reference"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={state === tab.id}
                onClick={() => setState(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                  state === tab.id
                    ? 'bg-[#46583b] text-white'
                    : 'bg-[#f0eee8] text-[#1b1c18] hover:bg-[#eae8e2]'
                }`}
              >
                <tab.icon size={14} aria-hidden="true" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-5" role="tabpanel">
            {state === 'suspended' ? (
              <div className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eae8e2] text-[#7a461c]">
                  <CirclePause size={26} aria-hidden="true" />
                </span>
                <h1 className="font-heading mt-3 text-xl font-bold">Farm workspace suspended</h1>
                <p className="mt-1 text-xs text-[#444840]">Example workspace reference GF-042</p>
                <p className="mt-3 text-sm text-[#444840]">
                  Access to this workspace is on hold pending administrative review. Historical
                  records are preserved; this reference screen does not change any session or
                  workspace state.
                </p>
                <div className="mt-4 w-full space-y-2 rounded-xl bg-[#f5f3ed] p-4 text-left text-sm">
                  <div className="flex items-center justify-between">
                    <span>Farm production records</span>
                    <Badge>Preserved (example)</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Access status</span>
                    <Badge>On hold (example)</Badge>
                  </div>
                </div>
              </div>
            ) : null}

            {state === 'restricted' ? (
              <div className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0eee8] text-[#2f4126]">
                  <LockKeyhole size={26} aria-hidden="true" />
                </span>
                <h1 className="font-heading mt-3 text-xl font-bold">Access restricted</h1>
                <p className="mt-1 text-xs text-[#444840]">Permission-scoped reference</p>
                <p className="mt-3 text-sm text-[#444840]">
                  This state represents an authorized account without permission for the requested
                  resource. Navigation visibility is never authorization; the server must deny the
                  request. No account data is shown here.
                </p>
              </div>
            ) : null}

            {state === 'connectivity' ? (
              <div className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0eee8] text-[#7a461c]">
                  <WifiOff size={26} aria-hidden="true" />
                </span>
                <h1 className="font-heading mt-3 text-xl font-bold">Connectivity required</h1>
                <p className="mt-1 text-xs text-[#444840]">Error-state reference</p>
                <p className="mt-3 text-sm text-[#444840]">
                  This state explains that the action needs a connection. Offline data entry and
                  local queues are excluded from scope; no offline state is simulated here.
                </p>
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-[#c4c8bd] pt-4">
            <button
              type="button"
              disabled
              className="w-full rounded-lg bg-[#2f4126] px-4 py-2.5 text-sm font-semibold text-white opacity-60"
            >
              Contact support — unwired in this reference
            </button>
            <button
              type="button"
              disabled
              className="w-full rounded-lg bg-[#f0eee8] px-4 py-2 text-sm font-medium text-[#444840] opacity-60"
            >
              Switch workspace — not in approved scope
            </button>
          </div>
        </div>

        <p className="flex items-start gap-2 rounded-xl bg-white p-4 text-xs text-[#444840] shadow-sm">
          <Info size={14} className="mt-0.5 shrink-0 text-[#46583b]" aria-hidden="true" />
          Component/state reference only. This screen is not an approved sitemap route and makes no
          claim about live sessions, quotas, synchronization, or real workspace status.
        </p>
      </div>
    </div>
  );
}
