# SmartFarm — Architecture Coverage Status

**Document:** `docs/ARCHITECTURE_STATUS.md`  
**Version:** 1.0  
**Date:** 24 November 2026  
**Status:** LOCKED — architecture approved by the project owner on 24 November 2026; audit findings remain open  
**Audited artifact:** `docs/architecture.md` v1.2, LOCKED 24 November 2026  
**Purpose:** Confirm whether each required topic is an **explicit topic** in the architecture document, not merely implied by a technology choice.

## 1. Audit method and verdict definitions

Each of the 15 requested topics was checked against the section structure and prose of `docs/architecture.md` v1.2. A technology mention alone (for example, `express-rate-limit` in a library table) does not qualify as an explicit topic.

| Verdict | Meaning |
|---|---|
| **ADDRESSED** | The topic has its own explicit section or clearly bounded set of sections that state decisions, rationale and boundaries. |
| **PARTIAL** | The topic is present, but one or more required aspects are distributed across unrelated sections, implied, or missing. |
| **GAP** | The topic is applicable to this project but is not established as an explicit topic; a reason and corrective action are recorded. |
| **N/A** | Not applicable to this project. The reason is stated. N/A is never used to hide a documentation gap. |

Every topic below carries a status and a reason; no topic is left unaddressed. Section references are to `docs/architecture.md` v1.2 dated 24 November 2026.

## 2. Project analysis summary

- The repository is documentation-led: SRS, scope, role/permission matrix, business rules, data requirements, design documents, Stitch visual exports, and a candidate PostgreSQL baseline (`database/schema.sql`, `database/seed.sql`, `database/database.md`).
- `smartfram/` exists only as an empty directory tree (`apps/web`, `apps/api`, `apps/worker`, `packages/*`, `infrastructure/*`, `tests/*`). `backend/`, `frontend/` and `.github/workflows/` contain only `.gitkeep`. No application code, migrations or tests are implemented. Root-level `package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, ESLint and Prettier configs are scaffold tooling only. This matches `AGENTS.md` ("scaffold project structure only").
- `docs/api-spec.md`, `docs/qa.md`, `docs/deployment.md` and `docs/stitch-prompts.md` are 0-byte placeholders. `docs/database.md` is **not** empty: it contains the v1.0 candidate database design; `database/erd.md` and `database/schema.sql` are also populated. A previous version of this status file incorrectly listed `docs/database.md` as empty and named a non-existent `database/database.md`; corrected after full documentation audit.
- Status conflict **resolved 24 November 2026**: `docs/architecture.md` §1 header and §16 previously called the architecture a candidate requiring human approval, while `AGENTS.md` and `README.md` describe it as approved/locked. The project owner approved and LOCKED the architecture on 24 November 2026; the header, §16 title, decision table and this status file now record the approver and date. Conditional items (3D, production hosting, email, storage, backups) remain conditional by decision, not by unresolved approval. Audit verdicts are unchanged.

## 3. 15-topic coverage register

| # | Topic | Verdict | Explicit location(s) | Reason / required action |
|---|---|---|---|---|
| 1 | System design / overall shape | **PARTIAL** | §2, §3 (component flow diagram), §5 (module table), §8.1 (deployment topology) | The overall shape is described, but split across four sections. Add one consolidated "System design" topic that fixes the canonical boundary view. |
| 2 | System architecture *(see Section 13a)* | **PARTIAL** | §3, §5, §8.1, §16; owner-supplied Section 13a content specification reproduced in §4 below | **No file in this repository contains a section numbered 13a.** §13 of `architecture.md` is "Open questions / approval gates". The correct reference is pending from the owner. Against the six Section 13a requirements: 2 addressed, 2 partial, 2 gaps (see §4). |
| 3 | Frontend | **ADDRESSED** | §4.1, §4.12–4.15, §4.21–4.23, §4.25, §7 | Dedicated sections cover framework, layouts, assets, 3D proposal, motion, SEO, accessibility, performance, library choices and design tokens. |
| 4 | APIs & backend logic | **ADDRESSED** | §4.2, §4.7, §5, §6, §6.1, §6.2 | Backend module convention, REST/OpenAPI/Zod API, module responsibilities, transactional mutations and calculation boundaries are explicit. |
| 5 | Databases & storage | **ADDRESSED** | §4.3, §4.4, §4.8, §6, §9 | Database, ORM, private object storage, integrity conventions and backup/disaster recovery each have explicit treatment. |
| 6 | Auth & permissions | **ADDRESSED** | §4.5, §4.6, §5, §11 | Authentication and authorization are separate explicit sections; RBAC/ownership/field policies, RLS and permission tests are defined. |
| 7 | Hosting & cloud | **ADDRESSED** | §4.18, §8, §8.1, §8.3 | Hosting choice, free-tier verification, deployment topology and cost enforcement are explicit. Conditional status is stated, not concealed. |
| 8 | CI/CD & version control | **ADDRESSED** | §4.19, §10 | §4.19 names Git, a private GitHub repository and GitHub Actions; §10 states one private repository with npm workspaces and no secrets in source control. |
| 9 | Security | **ADDRESSED** | §4.20 (plus §4.5, §4.6, §4.8, §6) | Dedicated defense-in-depth section with transport, cookies, CORS, CSRF, hashing, RLS roles, secrets and activity logs. |
| 10 | Rate limiting | **GAP** | §4.20 (one phrase in a list); §4.25 (`express-rate-limit` library row) | Applicable to login, password reset, public inquiries and uploads, but no explicit policy: no protected endpoints, limit key, window, thresholds, 429/`Retry-After` behavior, configuration owner or tests. Add a dedicated subsection. |
| 11 | Caching & CDN | **PARTIAL** | §4.16 (caching); §4.18 and §8.1 (Cloudflare Pages / same-origin Caddy) | Caching is an explicit topic. **CDN is not** — it is only implied by the Cloudflare Pages choice. No cache-control policy, asset immutability, edge behavior or invalidation topic exists beyond §4.16's header rule. |
| 12 | Error tracking & logs | **PARTIAL** | §4.2 (Pino HTTP logging); §4.24 (structured logs, queue/email/backup failure alerts); §11 (audit-log tests) | Logs are explicit. Dedicated error tracking is **N/A with reason** (see §5), but the document does not say so as a decision; it merely lists hosted error services as rejected alternatives. Record the N/A explicitly in §4.24. |
| 13 | Monitoring & alerts | **ADDRESSED** | §4.24; §8.2 (70/85/95% allowance alerts); §9 (backup failure alerts) | Explicit section covering structured logs, PostgreSQL/Linux metrics, failure and quota alerts, conditional Uptime Kuma and redaction rules. |
| 14 | Testing strategy | **ADDRESSED** | §11; §4.25; §14 | §11 defines 14 test categories, required negative cases and release gates; tools are listed in §4.25. |
| 15 | Scaling approach | **GAP — blocked, reason recorded** | §2, §4.18, §4.23, §8.2, §12 (AR-001) | No dedicated scaling section, thresholds or triggers. §8.2 capacity values are all TBD; §4.18 says scale is "unproven"; §4.23 permits replicas only "after measurements"; AR-001 is Critical. Not N/A: scaling is applicable but cannot be specified until capacity inputs are approved. |

**Tally:** 9 ADDRESSED · 4 PARTIAL · 2 GAP · 0 N/A at topic level. Section 13a sub-items add a further 2 gaps.

## 4. Section 13a — System architecture detail

The owner supplied the following content specification for "System architecture (see Section 13a)". It is reproduced here because no such numbered section currently exists in `docs/architecture.md`; the authoritative document/section reference is still to be supplied by the owner. Until then, this table is the working interpretation of that checklist item.

| Required content | Verdict | Evidence / gap in `architecture.md` |
|---|---|---|
| **1. What exists** — high-level system map showing major pieces and connections, not a file tree | **ADDRESSED** | §3 diagram: User surfaces → React/Tailwind/Vite → Express API → session/workspace/RBAC/validation → domain modules/repositories → PostgreSQL, private file storage, Graphile Worker, email and backups. §8.1 adds the deployment topology. |
| **2. Who owns what** — each component/module's responsibility, unambiguous and not duplicated | **PARTIAL** | §5 assigns responsibilities across 20 modules; §4.2 fixes per-module file roles; §4.6 defines actor boundaries. No single-owner rule exists and responsibility overlaps: logging appears in §4.20, §4.24 and §5 "Activity logs"; search (§4.9) is cross-cutting; frontend (§4.1) and admin UI (§4.12) are separate sections. |
| **3. What may depend on what** — allowed dependency direction and explicitly named forbidden paths | **GAP** | §4.2's route → controller → schema/policy → service → repository layout and §5's "cross-module mutations go through domain services and transactions" imply direction. Constraints exist (§4.6 "never trust a client-supplied workspace ID"; §4.20 "no broad farm bypass"; §4.1 "shared UI never grants shared permissions"; §6.2 "server is authoritative"), but there is **no explicit allowed-direction list and no named forbidden path** such as "UI must never query the database directly". |
| **4. How data moves** — critical flows traced end to end | **PARTIAL** | §6.1 traces one critical mutation end to end: authorize Farm Admin → validate references and quantities → begin transaction → check stock with locking → create sale and stock movement → outbox event → commit, with rollback on failure. No general read/refresh, notification or import/export flow is traced. |
| **5. What must stay true** — architectural invariants that must never be silently broken | **PARTIAL** | Strong individual rules exist: §1 locked core stack; §4.5 no public registration/worker login/gateways; §4.6 no client-supplied workspace ID and RLS as defense-in-depth only; §4.8 no public buckets or permanent private URLs; §4.10 no gateway alternative; §4.20 no runtime BYPASSRLS or table ownership; §6.2 server authoritative; §10 no secrets or production data in source control. These are **not consolidated** into an invariants list with a "must never be silently broken" rule. |
| **6. When to stop** — explicit agent rule for boundary conflicts | **GAP** | §13 approval gates, §6.2 "block affected logic until approved", §4.14 static/2D default pending approval, §8.3 "stop production approval and resolve the conflict" and §5's refusal to authorize unapproved postings come close. There is **no explicit stop → explain the conflict → show the impact → propose the smallest non-breaking change** rule. |

## 5. N/A register with reasons

| Item | Verdict | Reason |
|---|---|---|
| Dedicated error-tracking platform / third-party error aggregator | **N/A** | §4.24 explicitly rejects hosted error/uptime services because of quotas under the zero-recurring-charge constraint, and no self-hosted alternative is selected. Errors are handled through Pino structured logs (§4.2, §4.24) plus queue/email/backup failure alerts; retention and recipients are still open (§13). This is an applicability decision, not an oversight — but it must be written as an explicit decision in §4.24, which is why topic 12 is PARTIAL. |
| Independently configured CDN layer | **N/A as a separate architectural component** | No CDN service is procured or configured independently. Static delivery is inherited from Cloudflare Pages and the optional same-origin Caddy static hosting (§4.18, §8.1); no custom edge rules or invalidation policy are in scope. Caching itself remains ADDRESSED via §4.16. |
| Autonomous / automatic scale-out plan | **NOT N/A** | Scaling is applicable to a multi-tenant platform. It is a GAP blocked by the TBD capacity worksheet (§8.2) and the Critical AR-001 risk (§12), so it must be recorded as an open item rather than dismissed. |
| Rate limiting | **NOT N/A** | Login, password reset, public inquiry submission, uploads and exports are exposed surfaces. The topic is a documentation GAP, not inapplicability. |

## 6. Corrections required before this audit can be closed

1. **Rate limiting:** add a dedicated subsection specifying protected endpoints, key strategy (IP/session/workspace), windows and thresholds, 429 and `Retry-After` behavior, configuration ownership, and negative tests. Link the existing public-inquiry rate-limit check in `docs/implementation-plan.md` (M3-02).
2. **CDN:** add an explicit statement in §4.16/§4.18 of what is and is not in scope (static asset headers, immutability, invalidation, no CDN configuration), or record the N/A decision from §5.
3. **Error tracking:** convert §4.24's implicit rejection into an explicit N/A decision with the substitute mechanism, retention and alert recipients.
4. **Scaling approach:** add a dedicated section recording the current blocked state, the capacity inputs required from §8.2, the vertical-first single-host baseline, and the conditional scale-out triggers from §4.23 and §12 (AR-001).
5. **Section 13a:** add the missing content to `architecture.md` — a single-owner responsibility registry, an explicit allowed-dependency table with named forbidden paths, at least one more end-to-end flow, a consolidated invariants list, and the agent stop rule. Supply the correct document/section reference for "Section 13a".
6. **System design:** consolidate §2, §3, §5 and §8.1 into one explicit overall-shape topic.
7. **Status conflict — RESOLVED 24 November 2026:** the "candidate / human approval required" language in `architecture.md` §1 and §16 was reconciled with `AGENTS.md` and `README.md`. Architecture is LOCKED, approved by the project owner on 24 November 2026.
8. **Placeholder documents:** backfill `docs/api-spec.md`, `docs/qa.md`, `docs/deployment.md` and `docs/stitch-prompts.md` only when their contents are approved. `docs/database.md`, `database/erd.md` and `database/schema.sql` already contain the candidate database design and must not be treated as placeholders.

## 7. Approval record

| Item | Status |
|---|---|
| Whole-project analysis | Completed 24 November 2026 |
| 15-topic audit | Completed 24 November 2026 |
| Section 13a six-item audit | Completed 24 November 2026 against owner-supplied specification |
| Owner approval to create this file | Granted 24 November 2026 |
| Corrections in §6 | Correction 7 resolved; corrections 1–6 and 8 pending |
| Correct reference for "Section 13a" | Pending from owner |
| Architecture approval itself | Granted by project owner 24 November 2026; `architecture.md` LOCKED |
| ACR-001 prototype fixture exception | Approved by owner 24 November 2026; mapped to `apps/web/src/fixtures` and `@smartfarm/data-source` |
