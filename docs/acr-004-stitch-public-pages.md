# ACR-004 — Stitch visual treatment across approved public pages

**Status:** APPROVED by project owner instruction, 25 November 2026  
**Authority:** `AGENTS.md` §§5, 7, 8, 11, 12, 24; `docs/acr-003-stitch-visual-assets.md`; `docs/sitemap.md` §1

## Conflict

ACR-003 approved Stitch-hosted imagery and the exact Stitch visual composition for Public Home only. The owner then reported that the remaining public pages and the below-footer signature strip were missing and instructed that the site follow the Stitch exports. Only Home had been visually ported; the six other approved public routes used simplified canonical sections. The Stitch-hosted logo asset also returns HTTP 403, so the Home logo fell back to a plain letter.

## Evidence

- Owner instruction in the current work thread: “the logo is missing the pages is missing there are more than homepage and the strip below the footer is also missing”.
- `apps/web/src/app/routes.ts` already defines exactly seven approved public routes; no new route is requested or added.
- `design/stitch_smartfarm_homepage_experience/.../smartfarm_public_website_homepage/code.html` lines 1016–1078 place the logo in the nav/footer and the signature strip after `</footer>`.
- The six remaining public exports provide `code.html` visual references for About, Features, How It Works, Benefits, Dashboard Preview and Contact.
- HTTP verification on 25 November 2026: hero image `200 image/jpeg`; about image `200 image/jpeg`; logo URL `403 text/html`.

## Impact

- **Scope:** Visual port only; no new public routes, no private-surface changes and no business-rule changes.
- **Data:** Placeholder labels remain neutral and are explicitly marked “Illustrative — not live data”. No fake farm names, live status, telemetry, RFID/IoT, invented formulas or unapproved status values are introduced.
- **Security:** Public shell remains presentational. Server authorization, RLS and data-source boundaries are unchanged.
- **Motion:** The signature strip is static. The Stitch animated marquee and continuous cinematic motion are not reproduced, preserving `AGENTS.md` §§12 and 21.
- **Assets:** The approved external pasture images remain in use. The dead Stitch logo URL is retained as `logoRemote` for provenance; the visible logo is a local PNG cropped from the owner-supplied Stitch Home screenshot and recorded as a fallback.

## Smallest approved change

1. Apply the Stitch nav/footer visual language to all seven existing public routes and link the five nav labels plus seven footer labels to the approved routes.
2. Replace the six simplified inner-page sections with source-owned React/Tailwind ports of their corresponding Stitch page structures.
3. Move the existing static signature strip to after the footer on every public page.
4. Use the local logo fallback derived from the approved Stitch screenshot because the remote asset is unavailable.

## Approval record

| Item | Status |
| --- | --- |
| Owner instruction to include the additional public pages | **APPROVED** 25 November 2026 |
| New public routes | **None added** |
| Remote pasture images | Covered by ACR-003 |
| Local logo fallback derived from approved Stitch screenshot | **Approved by this instruction** |
| Animated marquee | **Not approved**; static strip only |
| Fake operational data | **Prohibited**; neutral illustrative labels only |

Visual and functional reviews remain recorded as PENDING until the dated review evidence is captured.
