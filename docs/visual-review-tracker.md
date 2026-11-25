# SmartFarm — Prototype visual and functional review tracker

**Status:** ACTIVE GATE — no feature pages are implemented in the scaffold yet  
**Authority:** ACR-001, `docs/stitch-visual-handoff.md` §9, SRS, permission matrix, business rules

This tracker exists so no page is claimed complete without two separate reviews:

1. **Visual review** against the approved Stitch screen, design system and responsive/accessibility gates.
2. **Functional review** against the SRS, permission matrix and business rules, including OPEN QUESTION handling.

No row is PASS by implication. Every implemented page must have two dated entries with evidence.

| Gate | Required evidence | Current status |
|---|---|---|
| Visual-only fixtures labelled and neutral | `// visual-only sample data` first line; neutral tokens only | Implemented at data layer; pending per-page evidence |
| Components use `@smartfarm/data-source` only | import review per component | Implemented at seam; pending per-page evidence |
| Local draft UI never claims server success | “Local draft — not saved” label in each simulated mutation state | Component available; pending per-page evidence |
| No invented APIs, DB behavior or formulas | `DATA_SOURCE_NOT_WIRED` until approved API spec; OPEN QUESTION for unresolved values | Implemented at seam; pending per-page evidence |
| Charts state period, unit, source and “Illustrative” | visible figcaption + accessible text summary | Component available; pending per-page evidence |
| Prototype route guards per role | guard present and labelled “Prototype guard only” | Component available; pending per-page evidence |
| Double page review | dated visual + functional entries for each page | No feature pages implemented; nothing marked PASS |
| Production-build fixture scan | `npm run verify:no-fixtures` after `npm run build` | Implemented and demonstrated: injected marker FAILED, clean production rebuild PASSED |
| Section 19a motion selection | `docs/design.md` §7.1 selection table + `apps/web/src/motion/` primitives | Selection recorded; primitives implemented; per-page visual/functional evidence pending |

## Page entries

| Page | Sitemap reference | Stitch reference | Visual review | Functional review |
|---|---|---|---|---|
| — | No feature pages implemented yet | — | NOT APPLICABLE | NOT APPLICABLE |
