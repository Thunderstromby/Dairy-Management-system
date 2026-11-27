# SmartFarm — Prototype visual and functional review tracker

**Status:** ACTIVE GATE — approved screens are scaffolded; no page is marked PASS  
**Authority:** ACR-001, ACR-002, ACR-003, ACR-004, `docs/stitch-visual-handoff.md` §9, `docs/stitch-coverage-register.md`, SRS, permission matrix, business rules

This tracker exists so no page is claimed complete without two separate reviews:

1. **Visual review** against the approved Stitch screen, design system and responsive/accessibility gates.
2. **Functional review** against the SRS, permission matrix and business rules, including OPEN QUESTION handling.

No row is PASS by implication. Every implemented page must have two dated entries with evidence.

| Gate | Required evidence | Current status |
|---|---|---|
| Visual-only fixtures labelled and neutral | `// visual-only sample data` first line; neutral tokens only | Implemented at data layer; pending per-page evidence |
| Components use `@smartfarm/data-source` only | import review per component | Implemented at seam; pending per-page evidence |
| Local draft UI never claims server success | Adapter-supplied local draft label in each simulated mutation state | Implemented; pending per-page evidence |
| No invented APIs, DB behavior or formulas | `DATA_SOURCE_NOT_WIRED` until approved API spec; OPEN QUESTION for unresolved values | Implemented at seam; pending per-page evidence |
| Charts state period, unit, source and “Illustrative” | visible figcaption + accessible text summary | Component available; pending per-page evidence |
| Prototype route guards per role | RoleGuard + adapter-supplied guard label | Implemented and tested; pending per-page evidence |
| Double page review | dated visual + functional entries for each page | No page marked PASS; see `docs/stitch-coverage-register.md` |
| Production-build fixture scan | `npm run verify:no-fixtures` after `npm run build` | Implemented and demonstrated: injected marker FAILED, clean production rebuild PASSED |
| Section 19a motion selection | `docs/design.md` §7.1 selection table + `apps/web/src/motion/` primitives | Selection recorded; primitives implemented; per-page visual/functional evidence pending |
| ACR-002 3D boundary | `docs/acr-002-public-decorative-3d.md`; CSS/static Home hero only | Implemented; static source boundary test rejects WebGL/canvas/3D/model assets; per-page evidence pending |
| Owner-approved Stitch Home page mirror | `docs/design.md` §8.5, `docs/acr-003-stitch-visual-assets.md` and `docs/sitemap.md` §§1.1, 1.2, 1.9; owner approval 25 November 2026 | Implemented with Stitch section order/copy, Home-only Stitch navbar/footer, five-tab showcase, product reveal, three stages, benefits, contact CTA and static brand strip; ACR-003 follow-up replaced the hero and logo with owner-supplied local files (26 November 2026) and the owner approved new hero copy/typography ("Every farm deserves a smarter tomorrow." Manrope/Inter); only the Home `aboutPasture` URL remains external; neutral illustrative values still replace fake live data; per-page evidence pending |
| ACR-004 public page visual port | `docs/acr-004-stitch-public-pages.md`; Stitch nav/footer and static strip on all public routes | Implemented with source-owned visual ports for all six inner public pages, route-based navigation, owner-supplied official logo and below-footer signature strip; About/Features/How It Works/Contact now use their owner-supplied local hero photographs (27 November 2026), Benefits and Dashboard Preview keep the gradient; neutral preview values only; per-page evidence pending |
| ACR-006 exact inner-page headings | `docs/acr-006-stitch-heading-copy-conflict.md`; owner instruction 27 November 2026 | All permitted Stitch H2/H3 strings ported; fictional identities, telemetry and unapproved formulas replaced with owner-approved neutral labels under ACR-006 closure |
| Stitch export coverage | all 108 `code.html` exports mapped or explicitly excluded | Recorded in `docs/stitch-coverage-register.md`; no export deployed as application code |
| Public SEO metadata | per-route title, description, canonical, Open Graph and `robots` | Implemented via `apps/web/src/app/DocumentMeta.tsx` with tests; private/unknown routes are `noindex`; per-page evidence pending |
| Build-time pre-render, `sitemap.xml`, `robots.txt` | `AGENTS.md` §15; `architecture.md` §§4.1, 4.21 | **BLOCKED** — conflicts with the approved hash-route URL shape; see `docs/acr-005-public-seo-routing-conflict.md` for the owner decision |

## Page entries

The complete per-export page matrix lives in `docs/stitch-coverage-register.md`. It records all 108 Stitch exports with their implemented route or explicit exclusion, plus PENDING visual and functional review columns. The summary below tracks the implemented sitemap surfaces.

| Surface | Routes | Sitemap coverage | Visual review | Functional review |
|---|---:|---|---|---|
| Public website | 7 | §1.1–§1.8 | PENDING — all seven pages now use source-owned Stitch visual ports, route-based Stitch shell and below-footer static strip; hero and logo are owner-supplied local files (ACR-003 follow-up, 26 November 2026) with only the Home `aboutPasture` URL still external; the six inner pages use the gradient treatment; dated screenshot comparison outstanding | PENDING — inquiry delivery remains unwired and owner content pending |
| Super Admin | 13 | §2.1–§2.8 | PENDING — no Stitch exports for §2.7/§2.8; all other exports are reference only | PENDING — provisioning, access and suspension remain local-draft prototypes |
| Farm Admin | 65 including shared auth/state screens | §3, §4.1–§4.16 | PENDING — token reconciliation and responsive screenshot evidence outstanding | PENDING — unresolved formulas and workflows remain blocked |
| Farm Supervisor | Shared routes with role-filtered navigation | §3, §5 | PENDING — role-filtered shell implemented; screenshot evidence outstanding | PENDING — payroll, finance, stock correction, leave approval, settings and High/Critical alerts excluded |

## Evidence still required before any PASS

1. Owner-provided or approved-licensed Stitch screenshot comparison for each page at 320px, tablet and wide desktop widths.
2. Recorded keyboard and screen-reader checks for every dialog, form, table and chart.
3. Functional sign-off against `docs/srs.md`, `docs/role-permission-matrix.md` and `docs/business-rules.md`, including explicit OPEN QUESTION disposition.
4. Confirmation that no page implies live telemetry, server success, public file access or fabricated financial truth.
5. A fresh `npm run build` followed by `npm run verify:no-fixtures` on the reviewed commit.
