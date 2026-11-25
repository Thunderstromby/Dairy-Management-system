// ACR-003 approved Stitch-hosted visual assets, extended to approved Public pages by ACR-004.
import localLogo from '../../assets/stitch-logo.png';

export const STITCH_ASSETS = {
  // The remote Stitch logo URL now returns HTTP 403. ACR-004 records the local
  // fallback cropped from the owner-supplied Stitch Home screenshot.
  logo: localLogo,
  logoRemote:
    'https://lh3.googleusercontent.com/aida/ALJJyrBnd3Bho7YvFFUhsB9Di57IFGrTbMCHo8Z3IL-tCQ1VLfN9oOACnmf6wXW56ZqaD7rHt_tVbsI54byhepWaijUEMQobivTA9fQHnUj4Vi6I-iIfw4fASLwK5a_Gy31FFdoxkdoDLJYENdzh1Aik_b6cqWtvG_LUPBBv2dqtvye2eWgJM9o0RqmU_WiNYZcdEZ98jhpnRrFCxLO1VVfg90v-J0BeW2YznEPiYyzQMYo',
  heroPasture:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDYd6xyFy32-N0a8Taf_-Fxo6UXt2WoFjopGofwiuOSe83uJaqj9lkS9zQvDgAx_dONo2Z3QZekXhPg8ggZIGRCNYUobfBu4CSChqddqJPZ57AS4vWi9YtgSOVc3qaO2vEsn_pkcKQI6VPNGGsNwHSvPvExerdHREpldqeFAZqn5_Pvz6Oq-14A0KNQF-dITnnpvV0X2TQUIXw9HcBAqiHD463srcwxE7Le1Z91Tj8',
  aboutPasture:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDLiJbB6Bg1w0EOYtnzzcQP-ywLLapZfmzzEtmZwjfHE3ArzoDCEd6339nOSooBEPDpz75JU7i6eQQcwydvFkH4bsQc5gr79f-ApdSun_ebPGuV9q-xvQSkzqe_8n6DKsOu2mEJGFKwgMpc1idaRZWJ4g2M06-FTSyCE1WPl_sQL9vGHnjpnZvC4Pk8P-ny2fja3ZAzLRsdDDgKcojEQJxRejNMtAUY_A-jQQmWoDc',
} as const;
