# ACR-003 — Stitch-hosted visual assets on Public Home

**Status:** APPROVED by project owner, 25 November 2026  
**Authority:** `AGENTS.md` §5 and §24, `docs/architecture.md`, `docs/architecture-rules.md`, `docs/ARCHITECTURE_STATUS.md`, `docs/design.md` §8.5, `docs/stitch-visual-handoff.md` §9

## Conflict

The owner requires the Public Home page to match the Stitch visual export exactly. `AGENTS.md` §5 and `docs/design.md` §8.5 previously prohibited copying unlicensed Googleusercontent imagery from Stitch. The canonical Stitch Home export references three external Googleusercontent assets: the hero pasture photograph, the connected-dairy pasture photograph and the SmartFarm logo mark.

## Evidence

- `design/stitch_smartfarm_homepage_experience/smartfarm_public_website_homepage/code.html` lines 164, 217 and 306.
- The owner explicitly approved using the Stitch-hosted image URLs on 25 November 2026 after being told that the asset license is unverified.
- This approval is limited to the Public Home visual composition. It does not approve Stitch code as application source, additional Stitch exports, private-surface visuals, WebGL/canvas/3D, fake live data or new routes.

## Impact

- **Scope:** Public Home hero, connected-dairy image and brand logo only.
- **Security/data:** No change to authentication, tenancy, APIs, business rules, data ownership or deployment.
- **Legal/provenance:** The owner accepts responsibility for the unverified third-party image license and hosting availability. Authentic licensed files should replace these URLs when supplied.
- **Availability:** External image failures must still leave critical hero copy and CTAs in ordinary HTML and preserve the deep-forest background.
- **Performance:** Images are loaded lazily where possible; no WebGL, canvas, video or model asset is introduced.

## Smallest approved change

Use the three exact Stitch-hosted image URLs on Public Home only, and port the Stitch visual structure, typography, colour tokens and spacing into source-owned React/Tailwind components. All other locked rules remain in force.

## Approval record

| Item | Status |
| --- | --- |
| Owner approval of ACR-003 | **APPROVED** by project owner, 25 November 2026 |
| Affected surfaces | Public Home only |
| Follow-up | Replace external URLs with licensed local assets when supplied |

## Addendum — logo availability (25 November 2026)

The approved logo URL was rechecked and returns HTTP 403, while both pasture images return HTTP 200. `apps/web/src/assets/stitch-logo.png` is a local fallback cropped from the owner-supplied Stitch Home screenshot so the mark remains visible. The original URL was initially retained in `stitchAssets.ts` as `logoRemote` for provenance; the 26 November addendum below removes that unused constant. ACR-004 records the owner's instruction to use this fallback and extend the visual treatment to the other approved public pages.

## Addendum — imagery scope (26 November 2026)

By owner instruction the three ACR-003 Googleusercontent assets are used on Public Home only. The `aboutPasture` image was removed from the shared inner-page hero; the six inner public pages use the source-owned deep-forest gradient and no remote imagery. The unused `logoRemote` constant was removed from `stitchAssets.ts`; the local PNG fallback remains the logo on every page. This narrows the implementation back to the ACR-003 approved surface and adds no new permission.

## Addendum — owner-supplied local assets (26 November 2026)

The owner supplied the two licensed local files that the ACR-003 follow-up anticipated:

- Hero photograph: `design/images/Hero Image/Golden Pasture with Grazing Holsteins.png` (1672×941) copied unchanged to `apps/web/src/assets/hero-pasture.png`; the owner moved the source file from `design/Hero Image/` on 27 November 2026.
- Official logo: `design/Logo/logo.png` (1448×1086, white background, no alpha) copied unchanged to `apps/web/src/assets/smartfarm-logo.png`.

`stitchAssets.ts` now imports both files locally: `heroPasture` replaces the remote hero Googleusercontent URL, and `logo` replaces the screenshot-cropped `apps/web/src/assets/stitch-logo.png` fallback, which is deleted as superseded. Colours, proportions and transparency are preserved; no re-encoding, regeneration or stock substitute was used. The remote `aboutPasture` URL remains only for the Home connected-dairy section until a local file is supplied. This is the documented execution of the ACR-003 follow-up and adds no new permission. The same instruction updates the Home hero copy and typography to the owner-approved text and Manrope/Inter specifications recorded in `docs/design.md` §8.5 and `docs/sitemap.md` §1.2.
