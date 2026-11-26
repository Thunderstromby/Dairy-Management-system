// ACR-003 approves the Stitch-hosted imagery on Public Home only. Inner public
// pages use the source-owned gradient treatment instead.
import localLogo from '../../assets/stitch-logo.png';

export const STITCH_ASSETS = {
  // The remote Stitch logo URL now returns HTTP 403. ACR-004 records the local
  // fallback cropped from the owner-supplied Stitch Home screenshot.
  logo: localLogo,
  heroPasture:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDYd6xyFy32-N0a8Taf_-Fxo6UXt2WoFjopGofwiuOSe83uJaqj9lkS9zQvDgAx_dONo2Z3QZekXhPg8ggZIGRCNYUobfBu4CSChqddqJPZ57AS4vWi9YtgSOVc3qaO2vEsn_pkcKQI6VPNGGsNwHSvPvExerdHREpldqeFAZqn5_Pvz6Oq-14A0KNQF-dITnnpvV0X2TQUIXw9HcBAqiHD463srcwxE7Le1Z91Tj8',
  aboutPasture:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDLiJbB6Bg1w0EOYtnzzcQP-ywLLapZfmzzEtmZwjfHE3ArzoDCEd6339nOSooBEPDpz75JU7i6eQQcwydvFkH4bsQc5gr79f-ApdSun_ebPGuV9q-xvQSkzqe_8n6DKsOu2mEJGFKwgMpc1idaRZWJ4g2M06-FTSyCE1WPl_sQL9vGHnjpnZvC4Pk8P-ny2fja3ZAzLRsdDDgKcojEQJxRejNMtAUY_A-jQQmWoDc',
} as const;
