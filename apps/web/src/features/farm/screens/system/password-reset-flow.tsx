import { ArrowLeft, Info, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useState, type ReactNode } from 'react';

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#eae8e2] px-2.5 py-0.5 text-[11px] font-semibold text-[#444840]">
      {children}
    </span>
  );
}

export function PasswordResetFlowScreen() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [notice, setNotice] = useState('');

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4 p-4 md:p-6">
        <div className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0eee8] text-[#2f4126]">
              <KeyRound size={24} aria-hidden="true" />
            </span>
            <p className="font-heading text-base font-bold">SmartFarm</p>
            <p className="text-xs uppercase tracking-wide text-[#444840]">
              Password recovery state reference
            </p>
            <Badge>Reference screen — not a route</Badge>
            <Badge>Illustrative</Badge>
          </div>

          <div
            className="mt-5 grid grid-cols-2 gap-2 rounded-lg bg-[#f0eee8] p-1"
            aria-label="Recovery steps"
          >
            {[
              { id: 1 as const, label: 'Request link' },
              { id: 2 as const, label: 'Set new password' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={step === item.id ? 'step' : undefined}
                onClick={() => {
                  setStep(item.id);
                  setNotice('Step changed locally — no email or token was issued.');
                }}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition-colors motion-reduce:transition-none ${
                  step === item.id ? 'bg-white text-[#2f4126] shadow-sm' : 'text-[#444840]'
                }`}
              >
                {item.id}. {item.label}
              </button>
            ))}
          </div>

          {step === 1 ? (
            <div className="mt-5">
              <h1 className="font-heading text-xl font-bold">Reset Farm Admin password</h1>
              <p className="mt-1 text-sm text-[#444840]">
                Reference layout for the approved recovery flow. No message is sent and no account
                existence is revealed.
              </p>
              <label htmlFor="reset-email" className="mt-4 block text-sm font-semibold">
                Registered administrator email
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.invalid"
                className="mt-1.5 h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm placeholder:text-[#556249] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              />
              <p className="mt-1 text-xs text-[#444840]">Use a reserved example address only.</p>
              <button
                type="button"
                onClick={() => setNotice('No reset link was sent — this is a local preview.')}
                className="mt-4 w-full rounded-lg bg-[#2f4126] px-4 py-3 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                Request reset link (preview only)
              </button>
            </div>
          ) : (
            <div className="mt-5">
              <h1 className="font-heading text-xl font-bold">Establish a new password</h1>
              <p className="mt-1 text-sm text-[#444840]">
                Reference layout only. No token is validated, no requirement is asserted, and no
                credential is changed.
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <label htmlFor="new-password" className="block text-sm font-semibold">
                    New password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-semibold">
                    Confirm new password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                  />
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                Complexity, lockout, token/OTP expiry, and first-login rules remain approval-gated.
                No checklist is presented as an approved policy.
              </p>
              <button
                type="button"
                onClick={() => setNotice('No password was changed — this is a local preview.')}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2f4126] px-4 py-3 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#46583b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <LockKeyhole size={16} aria-hidden="true" /> Update password (preview only)
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#556249] transition-colors motion-reduce:transition-none hover:text-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Return to sign-in reference
          </button>
        </div>

        <div className="rounded-xl border border-[#c4c8bd] bg-white p-4 text-xs text-[#444840] shadow-sm">
          <p className="flex items-start gap-2">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#46583b]" aria-hidden="true" />
            Recovery uses expiring, single-use tokens stored server-side as hashes. No token, email,
            or OTP is simulated in this reference.
          </p>
          <p className="mt-2 flex items-start gap-2">
            <Info size={14} className="mt-0.5 shrink-0 text-[#7a461c]" aria-hidden="true" />
            Preview only — no credential state was changed.
          </p>
        </div>

        <p role="status" className="text-right text-xs text-[#444840]">
          {notice || 'No message sent, no token issued, no password changed.'}
        </p>
      </div>
    </div>
  );
}
