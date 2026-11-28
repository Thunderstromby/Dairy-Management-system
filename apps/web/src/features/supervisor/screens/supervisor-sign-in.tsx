import { useState, type FormEvent } from 'react';
import { ArrowRight, Eye, EyeOff, Info, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

/**
 * Source: stitch_smartfarm_supervisor_interface_shell/supervisor_sign_in
 * Prototype shell only: no authentication, no device binding and no simulated states.
 */
export function SupervisorSignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!identifier.trim() || !password.trim()) {
      setError('Enter your supervisor identifier and password to continue the preview.');
      return;
    }
    setMessage('Sign-in is not connected in this prototype.');
  };

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-lg justify-center px-4 py-10 sm:px-6">
        <section className="w-full rounded-xl bg-white p-6 shadow-[0_4px_16px_-2px_rgba(41,45,40,0.08)] sm:p-8">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#444840]">
            <span>Farm Workspace</span>
            <span>Supervisor Access</span>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f0eee8] text-[#2f4126]">
              <ShieldCheck size={28} aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1b1c18]">
                SmartFarm Dairy
              </h1>
              <p className="mt-0.5 text-sm text-[#444840]">Farm Supervisor Sign In</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9e8c7] px-3 py-1 text-xs font-medium text-[#46583b]">
              <ShieldCheck size={14} aria-hidden="true" /> Supervisor Credentials
            </span>
          </div>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="supervisor-id" className="block text-sm font-semibold text-[#1b1c18]">
                Email Address or Username
              </label>
              <div className="relative flex items-center">
                <UserRound
                  size={18}
                  aria-hidden="true"
                  className="absolute left-3.5 text-[#75786f]"
                />
                <input
                  id="supervisor-id"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="supervisor@example.invalid"
                  aria-describedby={error && !identifier.trim() ? 'sign-in-error' : undefined}
                  className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-white pl-11 pr-3 text-sm text-[#1b1c18] placeholder:text-[#75786f] ${focusRing}`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="supervisor-password"
                  className="block text-sm font-semibold text-[#1b1c18]"
                >
                  Password
                </label>
                <span className="text-xs text-[#444840]">Recovery is handled by Farm Admin</span>
              </div>
              <div className="relative flex items-center">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="absolute left-3.5 text-[#75786f]"
                />
                <input
                  id="supervisor-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-white pl-11 pr-11 text-sm text-[#1b1c18] placeholder:text-[#75786f] ${focusRing}`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((current) => !current)}
                  className={`absolute right-2.5 rounded p-1 text-[#444840] transition-colors duration-150 hover:bg-[#f0eee8] motion-reduce:transition-none ${focusRing}`}
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <p id="sign-in-error" role="alert" className="text-sm font-semibold text-[#ba1a1a]">
                {error}
              </p>
            ) : null}
            {message ? (
              <p role="status" className="text-sm text-[#46583b]">
                {message}
              </p>
            ) : null}

            <button
              type="submit"
              className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#46583b] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#2f4126] motion-reduce:transition-none ${focusRing}`}
            >
              <span>Sign In to Workspace</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#f0eee8] p-4">
            <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#1b1c18]">
                Authorized Supervisor System
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#444840]">
                Access follows the approved farm permission matrix. No device binding, terminal
                identity, extra login method or simulated authentication state is implemented in
                this prototype.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-[#75786f]">
            SmartFarm Dairy Management · Supervisor Access Only
          </p>
        </section>
      </div>
    </main>
  );
}
