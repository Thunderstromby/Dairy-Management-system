import { useState } from 'react';
import { ArrowRight, BadgeCheck, Eye, EyeOff, Info, LockKeyhole } from 'lucide-react';
import { StitchLogo } from '../../public/StitchLogo';

const CONTOURS = [
  'M-100 200 C300 120 600 380 1100 240 C1300 190 1500 280 1600 260',
  'M-120 340 C280 260 620 510 1120 380 C1340 330 1520 420 1620 400',
  'M-80 500 C340 430 720 640 1200 520 C1380 480 1540 560 1640 540',
  'M-100 680 C360 610 750 820 1250 700 C1400 660 1560 740 1650 720',
] as const;

export function FarmAdminSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string>();

  return (
    <main className="sf-private-auth relative flex min-h-screen items-center justify-center bg-[#FBF9F3] p-4 lg:p-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-35"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full text-[#556249]/30"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          focusable="false"
        >
          {CONTOURS.map((path, index) => (
            <path
              key={path}
              d={path}
              stroke="currentColor"
              strokeWidth={1.25}
              strokeDasharray={index % 2 === 0 ? '4 6' : undefined}
            />
          ))}
          <circle cx="280" cy="260" r="3" fill="currentColor" />
          <circle cx="1120" cy="380" r="3" fill="currentColor" />
          <circle cx="720" cy="640" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="flex w-full max-w-md flex-col">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5 shadow-sm">
              <StitchLogo className="h-full w-full" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-base font-bold leading-none tracking-tight text-[#1B1C18]">
                  SmartFarm
                </h1>
                <span className="rounded bg-[#D9E8C7] px-1.5 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wide text-[#5B694E]">
                  Admin Portal
                </span>
              </div>
              <p className="mt-0.5 font-inter text-[10px] text-[#444840]">
                Dairy Enterprise Operations
              </p>
            </div>
          </div>
          <p className="mt-1 font-inter text-sm text-[#444840]">
            Sign in to manage your assigned dairy workspace.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-lg bg-[#F5F3ED] p-3">
          <div className="flex min-w-0 items-center gap-2">
            <BadgeCheck size={20} aria-hidden="true" className="shrink-0 text-[#556249]" />
            <div className="flex min-w-0 flex-col text-left">
              <span className="font-inter text-[10px] uppercase tracking-wider text-[#444840]">
                Assigned Dairy Unit
              </span>
              <span className="truncate font-inter text-sm font-semibold text-[#1B1C18]">
                Assigned workspace
              </span>
            </div>
          </div>
          <span className="group relative flex items-center">
            <Info size={18} aria-hidden="true" className="cursor-help text-[#75786F]" />
            <span className="pointer-events-none absolute bottom-full right-0 z-20 hidden w-48 rounded bg-[#30312D] p-2 font-inter text-xs text-[#F3F1EB] shadow-lg group-hover:flex group-focus-within:flex">
              The workspace is determined by your assigned account, not by this preview.
            </span>
          </span>
        </div>

        <form
          className="flex w-full flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setStatus('Sign-in is not connected in this prototype.');
          }}
        >
          <div className="flex flex-col gap-1.5 text-left">
            <label
              htmlFor="farm-admin-id"
              className="font-inter text-sm font-medium text-[#1B1C18]"
            >
              Farm Admin Identifier or Email
            </label>
            <div className="relative flex items-center">
              <BadgeCheck size={20} aria-hidden="true" className="absolute left-3 text-[#75786F]" />
              <input
                id="farm-admin-id"
                name="identifier"
                type="text"
                required
                placeholder="admin@yourfarm.example"
                className="w-full rounded-lg bg-white py-2.5 pl-10 pr-3 font-inter text-sm text-[#1B1C18] shadow-sm transition-all placeholder:text-[#75786F] focus:outline-none focus:ring-2 focus:ring-[#7A461C]/40"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex items-center justify-between">
              <label
                htmlFor="farm-admin-password"
                className="font-inter text-sm font-medium text-[#1B1C18]"
              >
                Password
              </label>
              <span
                aria-disabled="true"
                className="cursor-default font-inter text-xs text-[#556249] underline decoration-[#C4C8BD] underline-offset-2"
              >
                Forgot Password?
              </span>
            </div>
            <div className="relative flex items-center">
              <LockKeyhole
                size={20}
                aria-hidden="true"
                className="absolute left-3 text-[#75786F]"
              />
              <input
                id="farm-admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                className="w-full rounded-lg bg-white py-2.5 pl-10 pr-10 font-inter text-sm text-[#1B1C18] shadow-sm transition-all placeholder:text-[#75786F] focus:outline-none focus:ring-2 focus:ring-[#7A461C]/40"
              />
              <button
                type="button"
                aria-label="Toggle password view"
                aria-pressed={showPassword}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-2.5 rounded p-1 text-[#75786F] transition-colors hover:text-[#1B1C18]"
              >
                {showPassword ? (
                  <EyeOff size={19} aria-hidden="true" />
                ) : (
                  <Eye size={19} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-left">
            <label className="flex cursor-pointer select-none items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded accent-[#2F4126] focus:ring-[#7A461C]/30"
              />
              <span className="font-inter text-sm text-[#444840]">Remember this workstation</span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2F4126] px-4 py-3 font-heading text-sm font-semibold text-white shadow transition hover:bg-[#46583B] active:scale-[0.99]"
          >
            <span>Sign In to Farm Workspace</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
          {status ? (
            <p role="status" className="font-inter text-xs text-[#444840]">
              {status}
            </p>
          ) : null}
        </form>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#C4C8BD] pt-4 text-center">
          <div className="flex items-center justify-center gap-2 font-inter text-[11px] text-[#444840]">
            <span className="h-2 w-2 rounded-full bg-[#2F4126]" aria-hidden="true" />
            Assigned dairy workspace • Farm Administrator Portal
          </div>
          <span
            aria-disabled="true"
            className="cursor-default font-inter text-[11px] text-[#444840] underline decoration-[#C4C8BD] underline-offset-4"
          >
            Need workspace verification or access recovery? Contact Support
          </span>
        </div>
      </div>
    </main>
  );
}
