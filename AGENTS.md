# SmartFarm Dairy Management System — Agent Instructions

**Status:** Architecture approved and LOCKED by the project owner. This is a scaffold-stage repository: no application features are implemented yet.
**Authority:** This file is binding for all agents in this repository. When it conflicts with a visual export, template, or an unapproved assumption, this file and the approved architecture documents win.

> **CRITICAL — LOCKED ARCHITECTURE**
> Never change the framework, backend, database, authentication architecture, or deployment architecture without **explicit human approval**.
> If an architectural problem is discovered, **stop**, explain the conflict and its impact, and create an **Architecture Change Request**. Never silently change the system.

**Architecture rules:** The canonical system map, ownership registry, allowed dependencies and forbidden paths, critical data flows, invariants and stop-and-report rule are in `docs/architecture-rules.md`. That file restates approved decisions; it does not add new ones.

## 1. Project purpose

SmartFarm is a multi-tenant, web-based dairy farm management and analytics platform. It serves three surfaces:

1. Public marketing site (Home with sections, contact inquiry only).
2. Super Admin panel (customers, workspaces, provisioning, suspension).
3. Private farm application with Farm Admin and Farm Supervisor experiences.

Workers are **records, not login accounts**. Customers are onboarded manually by Super Admin. Software purchase is COD/manual; there is no online checkout or gateway. Farm data must be isolated per workspace.

## 2. Approved architecture (LOCKED)

- **Pattern:** modular monolith with a separate PostgreSQL-backed job process.
- **Tenancy:** one shared PostgreSQL database with explicit workspace ownership, scoped foreign keys, and row-level security (RLS).
- **Layering:** UI → API → policies/services → repositories → database. Cross-module mutations go through domain services and transactions.
- **Authorization:** deny-by-default RBAC plus workspace/resource ownership, field-level response allowlists, and RLS as defense in depth (never a substitute for action checks).
- **Sessions:** revocable server-side sessions in PostgreSQL; account/workspace status checked on every protected request.
- **Automation:** durable background jobs via a separate worker process; outbox so provider failures cannot corrupt business transactions.
- **Storage:** private object storage with metadata in PostgreSQL; no public buckets or permanent public URLs for private files.
- **Excluded structures:** microservices, Kubernetes, Redis, online gateways, IoT/RFID, offline sync, native mobile apps, double-entry accounting, AI/veterinary predictions, operational 3D.

## 3. Technology stack

### Locked — must not change

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React.js + Tailwind CSS             |
| Backend  | Node.js + Express.js                |
| Database | PostgreSQL                          |
| Payments | COD/manual only; no online gateways |

### Approved supporting choices (scaffold baseline)

TypeScript, Vite, npm workspaces, Drizzle ORM + Drizzle Kit + `pg`, Graphile Worker, `express-session` + `connect-pg-simple` + Argon2id, Zod, REST + OpenAPI 3.1, Helmet, `express-rate-limit`, Pino, shadcn/ui + Radix UI, TanStack Query/Table, React Hook Form, React Router, Recharts, Lucide React, date-fns, decimal.js, Vitest, Testing Library, Supertest, Playwright, axe-core, k6.

### Conditional — not enabled by default

Brevo email, OCI private Object Storage, Cloudflare Pages/OCI hosting, independent backup destination, and any 3D work. Enable only after the stated capacity, cost, availability, or scope approval is granted.

## 4. Folder structure

```text
<repository root>/
  apps/
    web/       React + Tailwind + Vite frontend
    api/       Node.js + Express backend
    worker/    Graphile Worker process
  packages/
    database/  Drizzle schema, migrations, seeds
    contracts/ Zod schemas and shared types
    domain/    Business rules and calculations
    ui/        Reusable components and tokens
  infrastructure/
    caddy/ systemd/ docker/ scripts/ backups/
  tests/
    unit/ integration/ permissions/ e2e/ performance/
  docs/
  .github/workflows/
  .env.example  .gitignore  package.json  tsconfig.json
  vite.config.ts  vitest.config.ts  eslint.config.mjs  .prettierrc.json
```

## 5. Coding conventions

- TypeScript in `strict` mode; no unchecked `any` unless justified in review.
- Controllers handle transport only. Business logic lives in domain services; persistence lives in repositories.
- Prefer small, typed modules. No package for a trivial utility.
- Use exact decimal arithmetic (`decimal.js` / PostgreSQL `numeric`) for money and quantities; never binary floating point for stored truth.
- Server is authoritative. Client previews are never saved as financial truth.
- No fake data, fake metrics, simulated live telemetry, or placeholder production values in code or tests.
- Unresolved business rules remain blocked; do not invent formulas, transitions, or statuses.

## 6. Naming conventions

- Directories and route paths: lowercase `kebab-case`.
- Component files and React components: `PascalCase` (`AnimalProfilePage.tsx`).
- API module files: `<module>.<layer>.ts`, e.g. `animal.routes.ts`, `animal.controller.ts`, `animal.schema.ts`, `animal.policy.ts`, `animal.service.ts`, `animal.repository.ts`, `animal.types.ts`.
- Hooks: `useThing.ts`; tests: `*.test.ts` / `*.test.tsx`; E2E specs: `*.spec.ts`.
- Database tables/columns: `snake_case`; every tenant-owned table has `workspace_id`; primary keys are UUIDs.
- Environment variables: `UPPER_SNAKE_CASE`.
- Workspace packages: `@smartfarm/<name>`.

## 7. Component rules

- Use Public, Auth, Platform and Farm layouts with lazy-loaded feature modules.
- Use shadcn/ui + Radix primitives; keep source-owned styling.
- Shared UI never grants shared permissions. Navigation visibility is not authorization.
- Components do not query the database or call APIs directly; use the typed API client and server state layer.
- Every screen must map to an approved sitemap page/section. No extra public routes from Stitch exports.
- Provide explicit loading, empty, no-results, and error states; no silent failure.
- Only Farm Admin sees privileged actions; Supervisor sees the approved operational subset.
- Keep 3D code (only if ever approved) out of the initial route bundle and out of every private route.

## 8. API rules

- Versioned REST JSON under `/api/v1`; OpenAPI 3.1 is the contract; Zod validates all input.
- ISO dates, bounded pagination, filter/sort allowlists, explicit response field selection.
- Standard error envelope; never leak stack traces, secrets, or sensitive payloads.
- Idempotency safeguards for applicable mutations; reject duplicate submissions.
- Never trust a client-supplied workspace ID; derive membership from trusted session context.
- Enforce matrix conditions on nested IDs, search, aggregates, files, imports, exports, and jobs.
- Suspend access immediately, including existing sessions.
- Namespace examples in `architecture.md` §4.7 are candidates, not final endpoint approvals.

## 9. Database rules

- PostgreSQL only. UUID primary keys; `workspace_id` and same-workspace foreign keys on all farm records.
- Enforce ear-tag and CNIC uniqueness per workspace; reject cross-workspace parent references.
- RLS enabled and forced on tenant tables; set workspace context transaction-locally (`SET LOCAL app.workspace_id`).
- Runtime role must not own protected tables and must not have `BYPASSRLS`; migration credentials are separate.
- Money/quantities use `numeric` and `decimal.js`; instants use `timestamptz` in UTC; dates are farm-local; currency is farm-configured.
- Version-controlled immutable migrations only. Never run `schema.sql` at application startup.
- Preserve history; no cascade deletion of history; permanent deletion stays blocked pending approval.
- Seed only deterministic reference roles. No demo users, realistic CNICs, or production data in source control.

## 10. Authentication rules

- `express-session` + `connect-pg-simple`, Argon2id hashing, secure HTTP-only cookies.
- Regenerate session ID on login; revoke on logout; check account and workspace status on every protected request.
- Recovery uses expiring, single-use tokens stored as hashes.
- No public registration, worker login, RFID, PIN, social login, or JWT replacement.
- Activation policy and optional OTP remain approval-gated; do not assume either.

## 11. Design-system rules

- `docs/design.md` is the canonical UI blueprint; reconcile with `docs/design-system.md` before implementation.
- Semantic CSS variables in one token file consumed by Tailwind; light and dark use the same semantic tokens, never inversion filters.
- Approved tokens: Primary `#245C45`/`#8DC6A1`, Secondary `#397A58`/`#75B38B`, Accent `#D5A64A`/`#E4BC69`, Background `#F7F7F1`/`#151D19`, Surface `#FFFFFF`/`#1E2922`, Text `#25332C`/`#EDF3EE`, Border `#DCE3DA`/`#35443A`.
- Manrope headings, Inter body, tabular numerals, Lucide icons; 248px expanded and 76px collapsed sidebar; mobile drawer.
- Reusable AppShell, Sidebar, Topbar, DataTable, FormSection, StatCard, ChartCard, StatusBadge, ConfirmDialog, EmptyState, ErrorState, ThemeProvider.
- Test from 320px mobile through wide desktop. Actual data only; design previews must not imply live operational data.

## 12. Motion rules

- CSS transitions first; selective Motion for React only where justified.
- Typical duration 150–250 ms; restrained public reveals via Intersection Observer.
- Always respect `prefers-reduced-motion`; no required hover gestures or parallax-heavy scrolling.
- No simulated production activity, no continuous rotation, no autoplay media tricks.

## 13. 3D rules

- **Default: excluded.** `design.md`, `design-system.md`, `design-direction.md`, `scope.md`, `sitemap.md` and README exclude 3D/WebGL. Do not add Three.js/R3F or any 3D asset by default.
- Any 3D work requires an explicit written scope/design change approval recorded through the Architecture Change Request process.
- If approved: one small decorative public-only motif (Home hero **or** How It Works, not both by default); CSS/static implementation first; no livestock models, game-like farms, simulations, or new routes.
- Never import 3D code into login, dashboards, forms, tables, reports, or any private interface.
- Required acceptance: static/WebP/SVG fallback, reduced-motion support, WebGL failure handling, no layout shift or CTA obstruction, lazy load after critical content, DPR cap 1.5, <20k triangles, <10 draw calls, ~300 KB incremental budget, low-end mobile verification, licensed assets.

## 14. Accessibility rules

- Engineering target: WCAG 2.2 AA; this is a target, not a certification claim.
- Semantic HTML, Radix primitives, keyboard focus management, labels, error associations, visible focus, adequate contrast in both themes, touch targets.
- Charts need text summaries; dialogs restore focus; status is never conveyed by color alone.
- axe-core plus manual keyboard and screen-reader testing.
- Decorative 3D, if ever approved, is hidden from assistive technology.

## 15. SEO rules

- Build-time pre-rendered HTML for approved public content; hydrate only interactive elements.
- Titles, descriptions, canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph, verified structured data, image alt text.
- Private routes require auth and `noindex`; `robots.txt` is not a security control.
- Analytics only if approved. No paid SEO tooling. No unapproved marketing claims.

## 16. Testing rules

- Vitest (unit), Testing Library (components), Supertest (API), real PostgreSQL (migrations, constraints, concurrency), Playwright (E2E), axe-core (accessibility), k6 (performance).
- Permission tests cover every matrix row; negative cases are mandatory.
- Required negatives: Farm A cannot read Farm B; Supervisor cannot read payroll/finance, approve leave, correct stock, archive animals, or receive High/Critical alerts; Super Admin cannot browse farm data; guest cannot provision; suspended sessions rejected; concurrent duplicate mutations do not double-deduct; jobs cannot bypass tenant policy.
- Use approved worked examples for every approved calculation. No fake production data and no static/mock frontend success as proof of a passing slice.
- Release gates: reviewed migrations, smoke tests, representative load, backup restore verification, accessibility and performance checks.

## 17. Security rules

- Defense in depth: HTTPS, Helmet, strict CORS/origin checks, CSRF tokens, secure cookies, rate limiting, Argon2id, Zod validation, parameterized SQL, field allowlists, private files, restricted secrets, activity logs, encrypted backups.
- Separate migration and runtime database roles; no runtime `BYPASSRLS`; transaction-local workspace context; test RLS policies.
- Redact CNIC, payroll, health details, tokens, and passwords from logs.
- Uploads are bounded and validated (content, type, size); no public URLs for private files.
- No secrets or production data in source control. Dependency versions and licenses are reviewed before pinning.
- Rate limiting is a documented architecture gap: define an explicit policy (endpoints, key, window, thresholds, 429 behavior) before implementing protected surfaces.

## 18. Git rules

- One private repository; npm workspaces; work on reviewed feature branches.
- Never commit credentials, `.env`, realistic worker data, or production data. `.env.example` only.
- Blocked work is not "done" and is not committed as complete.
- Use Conventional Commit style (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `ci:`).
- CI runs format check, lint, typecheck, tests, and build before review.

## 19. Folder structure rules (Section 2a)

> Owner-supplied checklist identifier. No numbered Section 2a exists in `docs/architecture.md` yet; these rules are derived from the approved structure in `architecture.md` §10 and `AGENTS.md`. Exact source text pending.

- Keep exactly three apps under `apps/` and four shared packages under `packages/`.
- Keep `infrastructure/` for deployment assets and `tests/` for all test categories.
- Keep empty directories tracked with `.gitkeep` until their feature is approved.
- Do not recreate the stray `smartfram/`, `backend/`, or `frontend/` placeholder trees; the repository root **is** the project root.
- `database/schema.sql`, `database/seed.sql`, `database/erd.md` and `docs/database.md` are candidate design artifacts; Drizzle migrations own deployable DDL.
- Add no package for a trivial utility; add no library that is not in the approved stack.

## 20. Security hardening rules (Sections 21a, 21b, 22a)

> Owner-supplied checklist identifiers. No numbered Sections 21a, 21b or 22a exist in `docs/architecture.md` yet; the groupings below are derived from §§4.5, 4.6, 4.8, 4.20, 6, 8.3 and 9. Exact source text pending.

**21a — Transport and session hardening:** HTTPS everywhere; Helmet; strict same-origin/same-site CORS allowlist with explicit origin checks; CSRF tokens; secure HTTP-only cookies; session ID regeneration and revocation; Argon2id; bounded request bodies and query timeouts; an explicit rate-limiting policy before exposing login, reset, inquiry, upload or export endpoints.

**21b — Data and tenant hardening:** RLS forced on tenant tables; workspace context set transaction-locally and verified against membership; runtime role is non-owner and has no `BYPASSRLS`; field allowlists on responses, exports and jobs; private object storage with opaque keys and authorized streaming; no public buckets or permanent private URLs; secrets and sensitive payloads excluded from logs and errors.

**22a — Operational hardening:** separate migration/runtime/backup credentials; least privilege and periodic dependency/license review; no paid tiers, automatic upgrades, or artificial traffic to evade provider reclamation; quota alerts at 70/85/95%; encrypted independent backups, checksums, restore drills and documented RPO/RTO; named operator before launch; activity logs with actor/action/time and approved context only.

## 21. UX and motion pattern rules (Sections 18a, 19a)

> Owner-supplied checklist identifiers. No numbered Sections 18a or 19a exist in `docs/architecture.md` yet; these rules are derived from `design.md`, `design-system.md`, `design-direction.md`, `sitemap.md` and `architecture.md` §§4.13, 4.15. Exact source text pending.

**18a — UX patterns:** mobile-first responsive layouts; every journey has a reachable end state and no dead ends; real data only with no fake live/sync/quota indicators; loading, empty, no-results, error, and partial-failure states; explicit confirmation for destructive or access-changing actions; role-appropriate navigation that never substitutes for server authorization; predictable tables/forms with accessible filters, sorting, and pagination.

**19a — Motion patterns:** CSS transitions first; 150–250 ms; restrained chart and reveal entrances; `prefers-reduced-motion` honored; no simulated production activity, conveyor-bell motion, autoplay video, parallax-heavy scroll, required hover gestures, or continuous rotation; motion communicates state only.

## 22. Anti-generic design rules (Section 26d)

> Owner-supplied checklist identifier. No numbered Section 26d exists in `docs/architecture.md` yet; these rules are derived from `template-check.md` §6, `design.md`, `design-direction.md`, and `architecture.md` §7. Exact source text pending.

- Build an original SmartFarm identity: serious agricultural technology, warm minimalism, clean corporate structure — not a generic SaaS dashboard.
- No Framer/template export as production code; no borrowed dashboards, marketing copy, badges, or workflow language.
- No emoji or random solid icons; use Lucide consistently. No lorem ipsum, fictional farmer names, fake metrics, or live-looking demo telemetry.
- No generic filler cards, gratuitous gradients, neon/futuristic styling, or 3D farm scenes.
- Every visual element must correspond to an approved sitemap section or reusable design-system primitive.
- Use authentic licensed dairy imagery only; preserve the approved light/dark semantic palette.

## 23. Commit rules (Sections 3b, 27a)

> Owner-supplied checklist identifiers. No numbered Sections 3b or 27a exist in `docs/architecture.md` yet; these rules implement the owner's explicit directive and `implementation-plan.md` §1/§9. Exact source text pending.

- After **every completed step**, run the relevant checks, then **commit and push that step**. Do not batch multiple steps into one commit.
- A step is complete only when its checks are green. If blocked, stop, record the blocker, and do not commit it as done.
- One logical change per commit, with a Conventional Commit message.
- Never push credentials, `.env`, production data, synthetic sensitive worker records, or generated browser artifacts.
- Definition of done for a task: reviewed green checks + pushed task commit. "Blocked" is never "done".

## 24. Architecture Change Request (ACR)

If work would require changing the framework, backend, database, authentication, deployment model, locked stack, or an approved boundary:

1. **Stop** the current task. Do not apply a workaround that silently changes the system.
2. Write an ACR describing the conflict, evidence, affected sections, and impact on scope, cost, security, and data.
3. Propose the **smallest** change that resolves it while preserving locked decisions.
4. Obtain **explicit human approval**. Only then update the architecture document and `docs/ARCHITECTURE_STATUS.md`, and proceed.

Until approval, the locked architecture remains authoritative and the affected work stays blocked.
