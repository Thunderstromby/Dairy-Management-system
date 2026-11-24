# ACR-001 — Prototype fixtures and data-access switch

**Status:** APPROVED — owner decisions recorded 24 November 2026  
**Date:** 24 November 2026  
**Requested by:** Owner checklist (fixture/data-access prototype rules)

## Conflict

The checklist asks for:

1. sample data in `frontend/src/fixtures`;
2. components reading data only through a data-access layer with a single fixture-to-API switch “during wiring (Section 24)”;
3. local UI state that may simulate create/edit/delete;
4. illustrative charts and neutral placeholders where formulas are unresolved;
5. prototype route guards;
6. double page review and a production-build fixture scan.

Items 3–6 are compatible with the locked architecture when clearly labelled as prototype-only. Items 1–2 conflict with approved boundaries:

| # | Evidence | Conflict |
|---|---|---|
| C1 | `AGENTS.md` §4 and §19 require exactly three apps under `apps/`, with the web app at `apps/web`, and explicitly forbid recreating a `frontend/` tree. The checklist says `frontend/src/fixtures`. | A literal root `frontend/` would create a duplicate app tree, bypass npm workspaces, and break the approved folder structure. |
| C2 | `AGENTS.md` §5 says “No fake data, fake metrics, simulated live telemetry, or placeholder production values in code or tests.” §22 says no fictional farmer names, fake metrics, or live-looking demo telemetry. The checklist permits visual-only sample data and illustrative charts. | Fixtures are allowed only as a narrow, explicitly labelled prototype exception; otherwise they violate the no-fake-data rule. |
| C3 | The checklist cites “Section 24” for the wiring switch. No such data-access section exists in the approved docs: `docs/architecture.md` has no §24, `docs/implementation-plan.md` has no §24, and `docs/appflow.md` §24 covers import/export/backup/activity flows. `docs/api-spec.md` is still `STATUS: placeholder`. | Defining endpoint calls now would invent APIs, which the checklist itself forbids. The correct Section 24 reference is also unresolved. |

## Impact

- **Scope:** a literal `frontend/` directory would require reworking the scaffold layout, Vite config, TypeScript paths, npm workspaces, CI paths and folder-rule compliance.
- **Cost:** no new service cost, but avoidable engineering rework and review time.
- **Security:** fixtures or sample names leaking into a production bundle would undermine tenant/data honesty; simulated CRUD could be mistaken for a completed server action; prototype route guards could be mistaken for authorization.
- **Data:** fake metrics, placeholder currency or realistic worker/farm names could be mistaken for real farm records. This must not happen.

## Smallest proposed change that preserves the locked architecture

1. Keep exactly three apps. Use `apps/web/src/fixtures/` as the logical equivalent of the checklist’s `frontend/src/fixtures`. Do **not** create a root `frontend/` directory.
2. Add one data-access seam: `apps/web/src/data/data-source.ts`, driven by a build-time switch such as `VITE_DATA_SOURCE=fixture|api`. Components import only typed data-access functions, never fixture files or a future API client directly.
3. No API endpoints, request shapes or persistence behavior are invented. The real adapter remains unimplemented until the OpenAPI 3.1 contract in `docs/api-spec.md` is approved. “Section 24” must be identified by the owner before wiring is claimed complete.
4. Every fixture file starts with `// visual-only sample data`. Fixture content uses neutral tokens only — no realistic names, CNICs, currency amounts, live-looking telemetry or production values.
5. Local create/edit/delete state is labelled “Local draft — not saved”. The UI never shows a server-success state.
6. Charts carry a visible caption: `Illustrative · <period> · <unit> · source: visual-only fixture`. Unresolved calculations use a neutral placeholder and an `OPEN QUESTION` entry; no formula is selected.
7. Prototype route guards are labelled “prototype only; server enforcement pending”. Navigation visibility remains non-authorization.
8. Add a build-time verification script that fails if fixture markers, sample tokens or placeholder currency appear in `dist/web`.
9. Record each page twice in the review tracker: visually against the Stitch screen, and functionally against the SRS, permission matrix and business rules.

## Approval record

| Conflict | Owner decision |
|---|---|
| C1 — fixture path | **Approved:** use `apps/web/src/fixtures`; no root `frontend/` tree. Locked three-app structure unchanged. |
| C2 — fixture exception | **Approved with safeguards:** visual-only labels, neutral tokens, local-draft wording, illustrative chart captions, and production-build exclusion check are mandatory. |
| C3 — “Section 24” | **Resolved:** no such section exists; this ACR is the authority for the data-access seam. No Section 24 was invented. |

The owner explicitly approved C1–C3 on 24 November 2026. The locked architecture remains authoritative; this ACR records a narrow, labelled prototype exception only.
