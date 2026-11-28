import { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Info, LockKeyhole, Mail, Shield } from 'lucide-react';
import { StitchLogo } from '../public/StitchLogo';

const TRUST_POINTS = [
  {
    title: 'Customer Organization Management',
    body: 'Direct management of dairy enterprise customer profiles and workspace allocations.',
  },
  {
    title: 'Workspace Administration',
    body: 'Partitioned operational workspace scoping across commercial dairy units and parlors.',
  },
  {
    title: 'Farm Admin Account Provisioning',
    body: 'Role-scoped account provisioning and credential lifecycle management for farm administrators.',
  },
] as const;

const TOPOGRAPHY = [
  'M-100 120C80 90 220 220 400 170C580 120 620 40 750 90',
  'M-100 200C110 170 250 310 440 240C630 170 650 110 780 180',
  'M-100 290C70 240 270 380 430 330C590 280 610 200 760 270',
  'M-80 390C120 330 230 460 410 430C590 400 640 310 770 370',
  'M-110 480C90 420 260 550 450 510C640 470 650 400 790 460',
  'M-90 580C80 520 240 650 420 610C600 570 630 490 760 560',
  'M-70 680C110 610 270 730 440 700C610 670 650 610 780 670',
] as const;

function BrandPanel() {
  return (
    <section className="relative flex flex-col justify-between overflow-hidden bg-[#2F4126] p-8 text-[#F7FAF2] lg:w-[45%] lg:p-14">
      <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 600 800" fill="none" focusable="false">
          {TOPOGRAPHY.map((path, index) => (
            <path
              key={path}
              d={path}
              stroke="#f7faf2"
              strokeWidth={index % 2 === 0 ? 1.2 : 1.5}
              strokeDasharray={index % 3 === 0 ? '4 4' : undefined}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-2 shadow-sm">
            <StitchLogo className="h-full w-full" />
          </div>
          <div>
            <span className="block font-heading text-sm font-semibold leading-tight tracking-tight text-[#F7FAF2]">
              SmartFarm
            </span>
            <span className="block font-inter text-[10px] uppercase tracking-[0.18em] text-[#B8CDA8]">
              Super Admin Portal
            </span>
          </div>
        </div>

        <div className="h-1 w-16 rounded-full bg-[#7A461C]" />

        <div className="space-y-3">
          <h1 className="font-heading text-2xl font-bold leading-snug text-[#F7FAF2] lg:text-3xl">
            Enterprise Dairy Management &amp; Tenant Administration
          </h1>
          <p className="font-inter text-sm leading-relaxed text-[#E6E9E1]">
            Centralized administrative console for managing dairy customer organizations,
            operational workspaces, and delegated Farm Administrator accounts.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#46583B]">
                <Check size={14} aria-hidden="true" className="text-[#F7FAF2]" />
              </span>
              <div>
                <p className="font-heading text-sm font-bold leading-tight text-[#F7FAF2]">
                  {point.title}
                </p>
                <p className="mt-0.5 font-inter text-xs leading-relaxed text-[#E6E9E1]">
                  {point.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 border-t border-[#46583B] pt-10">
        <p className="font-inter text-[10px] leading-normal text-[#E6E9E1]">
          © 2025 SmartFarm Technologies Inc. Super Admin Access Only.
        </p>
      </div>
    </section>
  );
}

export function SuperAdminSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string>();

  return (
    <main className="sf-private-auth flex min-h-screen items-center justify-center bg-[#F7FAF2] p-4 lg:p-10">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-xl lg:flex-row">
        <BrandPanel />

        <section className="flex flex-col justify-between bg-[#F2F5ED] p-8 lg:w-[55%] lg:p-16">
          <div className="mx-auto my-auto w-full max-w-md space-y-8">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded bg-[#D9E8C7] px-2.5 py-1 font-inter text-[10px] font-medium uppercase tracking-wide text-[#5B694E]">
                <Shield size={13} aria-hidden="true" /> SUPER ADMIN ACCESS
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[#191D18]">
                Super Admin Portal
              </h2>
              <p className="font-inter text-sm text-[#444840]">
                Sign in with your verified administrative credentials to manage customer accounts,
                workspaces, and farm administrators.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                setStatus('Sign-in is not connected in this prototype.');
              }}
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block font-heading text-sm font-semibold text-[#191D18]"
                >
                  Administrative Email
                </label>
                <div className="relative flex items-center">
                  <Mail size={18} aria-hidden="true" className="absolute left-3 text-[#75786F]" />
                  <input
                    id="admin-email"
                    type="email"
                    required
                    placeholder="admin@smartfarm.io"
                    className="h-11 w-full rounded-lg border border-[#C4C8BD] bg-white pl-10 pr-3.5 font-inter text-sm text-[#191D18] shadow-sm transition duration-150 placeholder:text-[#75786F] focus:border-[#2F4126] focus:outline-none focus:ring-2 focus:ring-[#2F4126]/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="admin-password"
                  className="block font-heading text-sm font-semibold text-[#191D18]"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <LockKeyhole
                    size={18}
                    aria-hidden="true"
                    className="absolute left-3 text-[#75786F]"
                  />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    className="h-11 w-full rounded-lg border border-[#C4C8BD] bg-white pl-10 pr-11 font-inter text-sm text-[#191D18] shadow-sm transition duration-150 placeholder:text-[#75786F] focus:border-[#2F4126] focus:outline-none focus:ring-2 focus:ring-[#2F4126]/20"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2.5 rounded p-1 text-[#75786F] transition hover:bg-[#ECEFE7] hover:text-[#191D18]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer select-none items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded border-[#C4C8BD] accent-[#2F4126] focus:ring-[#2F4126]/30"
                  />
                  <span className="font-inter text-xs font-medium text-[#444840]">
                    Remember this workstation
                  </span>
                </label>
                <span
                  className="cursor-default font-inter text-xs font-medium text-[#556249] underline underline-offset-4"
                  aria-disabled="true"
                >
                  Forgot credential support?
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#46583B] px-6 font-heading text-sm font-semibold text-white shadow transition hover:bg-[#2F4126] hover:shadow-md active:translate-y-px"
                >
                  <span>Sign In to Super Admin</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
              {status ? (
                <p role="status" className="font-inter text-xs text-[#444840]">
                  {status}
                </p>
              ) : null}
            </form>

            <div className="flex items-start gap-3 rounded-lg border border-[#C4C8BD] bg-[#ECEFE7] p-3.5">
              <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#556249]" />
              <p className="font-inter text-xs leading-relaxed text-[#444840]">
                Access restricted to authorized Super Administrators. For account recovery, contact{' '}
                <span className="font-semibold text-[#191D18]">Platform Support</span>.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md pt-6">
            <p className="w-full text-center font-inter text-[10px] text-[#75786F]">
              SmartFarm Administrative Environment • Authorized Personnel Only
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
