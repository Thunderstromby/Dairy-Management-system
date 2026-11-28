# ACR-008 — Requested 3D cinematic scrolling and typography motion

**Status:** APPROVED — owner selected Option B on 28 November 2026. Implemented with CSS 3D transforms only; no WebGL, canvas, Three.js/R3F, 3D asset or new dependency is introduced.  
**Authority:** `AGENTS.md` §§12, 13, 22, 24; `docs/design.md` §§8.5, 12; ACR-002

## Conflict

On 27 November 2026 the owner requested:
- a continuous left-to-right “shine” sweep on the navbar wordmark while hovered;
- a per-character “scroll-wheel” animation on each navbar link while hovered;
- site-wide scroll animations that are “3D and cinematic”.

`AGENTS.md` §13 excludes 3D/WebGL by default and requires an explicit written scope/design change through the ACR process for any 3D work. ACR-002 authorises only a Home-only CSS/static motif and explicitly excludes WebGL, canvas, GLB/GLTF, simulations and continuous motion. `AGENTS.md` §12 requires CSS transitions first, 150–250 ms durations, `prefers-reduced-motion` support and no required hover gestures, continuous rotation or simulated activity. Site-wide 3D scroll effects would also add a new rendering loop, layout-shift risk and an accessibility/performance gate that is currently excluded.

## Evidence

- `apps/web/src/features/public/PublicNavbar.tsx` — current wordmark and five nav links.
- `apps/web/src/styles/stitch-exact.css` — current CSS-first motion and reduced-motion rules.
- `docs/acr-002-public-decorative-3d.md` — CSS/static-only boundary; WebGL/canvas remain excluded.
- `AGENTS.md` §§12–13 — motion and 3D rules.

## Impact

- **Scope:** public navbar and public scroll behaviour; no data, permission or API change.
- **Performance/accessibility:** 3D scroll-driven rendering adds frame-rate, layout-shift and reduced-motion obligations; 2D CSS reveals do not.
- **Security/data:** none.

## Smallest change options

**A — CSS-only motion (recommended).** Keep the existing locked architecture: add a hover shine sweep to the wordmark and per-character 2D scroll/reveal on nav links, plus restrained CSS scroll-reveal entrances on public sections. All effects stop under `prefers-reduced-motion`; no WebGL, canvas, continuous rotation or 3D asset.

**B — Approved 3D treatment.** Requires explicit owner approval to amend §13 and ACR-002, plus a written scope: decorative public-only motif, static/WebP/SVG fallback, reduced-motion support, WebGL failure handling, no layout shift or CTA obstruction, lazy load after critical content, DPR cap 1.5, <20k triangles, <10 draw calls, ~300 KB incremental budget, low-end mobile verification, licensed assets, and no 3D in private routes. This is a materially larger scope and is not implemented yet.

## Implementation decision (owner approval 28 November 2026)

Option B was approved. The smallest change that satisfies it is **CSS perspective/3D transforms**: a hover shine sweep on the navbar wordmark, staggered per-character Ferris-wheel arcs on nav links (revised 28 November 2026), and restrained CSS scroll-reveal entrances on public sections. No WebGL context, canvas, Three.js/R3F, GLB/GLTF, texture or new dependency is added, so triangle/draw-call/DPR budgets are not applicable; the static/reduced-motion state is the fallback. All effects are public-only, stop under `prefers-reduced-motion`, do not shift layout or obstruct CTAs, and never enter private routes.

## Approval record

| Item | Status |
| --- | --- |
| Owner request received | **RECEIVED** 27 November 2026 |
| Owner choice | **APPROVED** Option B, 28 November 2026 |
| Shine/per-character CSS hover motion | **APPROVED** public-only, reduced-motion safe |
| Site-wide 3D cinematic scrolling | **APPROVED** as CSS 3D scroll-reveal entrances; no WebGL |
| Existing reduced-motion guarantees | **RETAINED** regardless of outcome |
