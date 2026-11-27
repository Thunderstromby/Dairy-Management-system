// ACR-003 approved the Stitch-hosted imagery on Public Home only. Inner public
// pages use the source-owned gradient treatment instead. On 26 November 2026 the
// owner supplied the official hero photograph and logo, which replace the remote
// hero URL and the screenshot-cropped logo fallback (ACR-003 follow-up).
import heroPasture from '../../assets/hero-pasture.png';
import localLogo from '../../assets/smartfarm-logo.png';

export const STITCH_ASSETS = {
  logo: localLogo,
  heroPasture,
  aboutPasture:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDLiJbB6Bg1w0EOYtnzzcQP-ywLLapZfmzzEtmZwjfHE3ArzoDCEd6339nOSooBEPDpz75JU7i6eQQcwydvFkH4bsQc5gr79f-ApdSun_ebPGuV9q-xvQSkzqe_8n6DKsOu2mEJGFKwgMpc1idaRZWJ4g2M06-FTSyCE1WPl_sQL9vGHnjpnZvC4Pk8P-ny2fja3ZAzLRsdDDgKcojEQJxRejNMtAUY_A-jQQmWoDc',
} as const;
