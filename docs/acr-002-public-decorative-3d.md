# ACR-002 — Limited public-only decorative 3D motif

**Status:** APPROVED — owner approved scope, Home hero location, and CSS/static implementation on 25 November 2026  
**Date:** 25 November 2026  
**Requested by:** Owner instruction: “Implement the approved 3D experience. Follow the locked 3D architecture.”  
**Authority:** `docs/architecture.md` (LOCKED), `docs/architecture-rules.md`, `AGENTS.md` §13 and §24, `docs/ARCHITECTURE_STATUS.md`

This ACR records a conflict. It does **not** approve 3D by itself. Implementation must remain 2D/static until the owner explicitly approves this ACR and selects the open decisions below.

## 1. Conflict

The request says the 3D experience is approved, but the repository contains no approved scope/design change for 3D. The locked architecture excludes 3D by default and makes it conditional pending explicit written approval.

## 2. Evidence

- `AGENTS.md` §13: “**Default: excluded.** … Any 3D work requires an explicit written scope/design change approval recorded through the Architecture Change Request process.”
- `AGENTS.md` §13 acceptance envelope: at most one small decorative public-only motif, Home hero **or** How It Works (not both by default); CSS/static implementation first; no livestock models, game-like farms, simulations, new routes, or 3D in private interfaces.
- `AGENTS.md` §13 performance acceptance: static/WebP/SVG fallback, reduced-motion support, WebGL failure handling, no layout shift or CTA obstruction, lazy load after critical content, DPR cap 1.5, under 20k triangles, under 10 draw calls, about 300 KB incremental budget, low-end mobile verification, licensed assets.
- `docs/architecture.md` §4.14 calls the motif a “proposed enhancement” and states: “Until then the default is static/2D.”
- `docs/architecture.md` §16 and `docs/ARCHITECTURE_STATUS.md` §7 both record limited 3D as conditional; only ACR-001 (prototype fixtures) is approved.
- `docs/srs.md` §24, `docs/scope.md` §6.3, `docs/design-direction.md` §15, `docs/design-system.md` §10 and `docs/design.md` §14 exclude dedicated 3D/WebGL from the current scope.
- No file named `docs/acr-002-*` existed before this draft.

## 3. Affected approved decisions

| Area | Current locked decision | Effect of proposed change |
|---|---|---|
| Frontend | React + Tailwind + Vite | Unchanged; motif stays inside the existing public Home route. |
| Scope | No operational 3D; 3D excluded by default | Narrow marketing-only exception needs approval. |
| Design | 2D is the complete visual direction | One decorative public motif would be added; photography and HTML content stay primary. |
| Libraries | No library outside the approved stack | CSS/static adds none; true WebGL requires conditional `three` + `@react-three/fiber`, already named as conditional in `architecture.md` §4.14. |
| Data | No tenant data in public surfaces | Unchanged; motif carries no farm, worker or financial data. |
| Authorization | Private surfaces are deny-by-default | Unchanged; no 3D on login, dashboards, forms, tables, reports or any private route. |

## 4. Impact

- **Scope:** Marketing-only. Does not add workflows, routes, livestock models, simulations or operational value claims.
- **Cost:** CSS/static has no new dependency or recurring cost. True WebGL uses open-source libraries but adds real development, asset and QA effort. No paid Spline subscription, hosted 3D API or GPU server.
- **Security/data:** No new data path, no secrets, no tenant records. Canvas remains decorative and hidden from assistive technology.
- **Performance:** Must stay out of the initial route bundle, use static fallback on mobile/reduced motion/WebGL failure, and never delay the primary CTA. Mobile and low-end device verification are mandatory.
- **Accessibility:** All headings, copy and CTAs remain ordinary HTML. The canvas contains no critical content.

## 5. Smallest change that preserves locked decisions

**Recommended:** approve a single CSS/static public-only decorative motif in the existing Home hero. This satisfies “premium brand moment” with no GPU runtime, no GLB pipeline and no new library. Under this option the GLB/draw-call/frame-rate requirements are not applicable because there is no WebGL scene.

**If the owner requires a true 3D runtime instead:** approve exactly one public-only R3F motif, lazy-loaded after critical content, with these hard limits:

- Location: Home hero **or** How It Works, not both.
- Geometry: original primitive geometry or one small optimized GLB/GLTF; no livestock models or farm scenes.
- Budget: under 20k triangles, under 10 draw calls, no postprocessing, no heavy shadows, no large textures; textures appropriately sized (start at 512px, never above 1024px without evidence).
- Runtime: fixed camera, render on demand, stop outside viewport, DPR capped at 1.5, no continuous rotation or required gesture, restrained pointer tilt only on fine pointers.
- Loading: visible non-blocking loading state; static SVG/WebP fallback shown until the scene is ready and on WebGL failure.
- Mobile/reduced motion: static fallback by default on coarse pointers, reduced-motion preference, slow device signals or failed WebGL context.
- Monitoring: development-only frame-rate sampler; production must not log, transmit or fabricate performance metrics.
- Bundles: dynamic import only; 3D code must not enter the initial route bundle or any private route chunk. Verify with build output and bundle inspection.
- Assets: original or appropriately licensed; licence recorded in `docs/visual-review-tracker.md`.

## 6. Open decisions requiring owner selection

1. **Approve or reject:** Is ACR-002 approved as a written scope/design change?
2. **Location:** Home hero or How It Works? Default is Home hero.
3. **Implementation:** CSS/static first (recommended) or true WebGL with Three.js + R3F?
4. **If WebGL:** Is a small original GLB/GLTF actually required, or is generated primitive geometry sufficient? Primitive geometry is the smaller change.

## 7. Approval record

| Item | Status |
|---|---|
| Owner approval of ACR-002 | **APPROVED** by project owner, 25 November 2026 |
| Location selected | **Home hero** only; How It Works remains 2D/static |
| Implementation path selected | **CSS/static first**; no WebGL, canvas, GLB/GLTF or new library |
| `docs/architecture.md` and `docs/ARCHITECTURE_STATUS.md` update | Completed 25 November 2026 |
| Implementation | Completed 25 November 2026; static fallback retained after the ACR-003 asset follow-up on 27 November 2026 — see evidence below |

## 8. Implementation evidence

- Public Home hero keeps the heading, description and CTAs in ordinary HTML; the primary visual is the owner-supplied local photograph recorded in the ACR-003 follow-up (26 November 2026).
- `apps/web/src/features/public/StaticHeroMotif.tsx` is the ACR-002 CSS/static motif. It is an inline SVG rendered only when the hero photograph fails to load. It is statically imported, so there is no lazy JS/CSS chunk, no deferred scene loading and no production loading placeholder.
- Motif styling stays in the source-owned `apps/web/src/styles/stitch-exact.css`. The earlier `HeroMotif.tsx` / `hero-motif.css` dynamic-import implementation was orphaned by the ACR-003 visual hand-off and removed on 27 November 2026; no deferred scene behaviour is claimed.
- No `<canvas>`, WebGL context, Three.js/R3F package, GLB/GLTF asset or texture is introduced. Draw-call, texture-size and frame-rate budgets are therefore not applicable to this approved change.
- Frame-rate monitoring is not added because the approved CSS/static implementation has no rendering loop; a later WebGL ACR must define that gate.
- Tests assert the static fallback on image error, reduced-motion behaviour and absence of canvas.
- Release checks passed on 27 November 2026: format, lint, typecheck, 61 tests, build and production fixture scan.

**Scope boundary after approval:** one decorative CSS/static Home hero motif only. WebGL, canvas scenes, GLB/GLTF assets, livestock models, simulations, new routes and private-surface 3D remain excluded unless a later ACR is approved.
