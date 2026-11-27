# ACR-005 — Public SEO pre-render versus approved hash routes

**Status:** DECIDED — owner selected Option A on 27 November 2026. No architecture change applied. The pre-render/sitemap/robots gates remain **BLOCKED** by that decision and are not claimed complete.  
**Authority:** `AGENTS.md` §§6, 15, 24; `docs/architecture.md` §§4.1, 4.21, 4.25, 16; `docs/sitemap.md` §1; `docs/design.md` §8.5; `docs/acr-004-stitch-public-pages.md`

## Conflict

`AGENTS.md` §15 and `docs/architecture.md` §4.21 require build-time pre-rendered HTML for approved public content, plus `sitemap.xml`, `robots.txt`, per-page titles/descriptions/canonical URLs and Open Graph metadata. `docs/architecture.md` §4.1 repeats the pre-render requirement.

At the same time the owner-approved public navigation is explicitly documented as **hash routes** (`docs/sitemap.md` §1.1 line 12; `docs/design.md` §8.5 line 505), and ACR-004 records **no new public routes** (`docs/acr-004-stitch-public-pages.md` lines 13, 20, 38). On 26 November 2026 the owner instructed that React Router be used; the smallest compliant migration replaced the hand-rolled router with React Router `HashRouter` so every documented hash URL and route ID is unchanged.

With hash routing, every public page is served from the single `index.html` at `/`; hash fragments are not sent to the server and are generally ignored by crawlers. Genuine per-route static HTML, `sitemap.xml` URLs and server-side canonical meaning therefore cannot be produced without changing the approved URL shape.

## Evidence

- `apps/web/src/main.tsx` — app is wrapped in React Router `HashRouter`.
- `apps/web/src/app/routes.ts` — exactly seven approved public hash routes; no route added or removed.
- `apps/web/src/app/DocumentMeta.tsx` — per-route title, description, canonical, Open Graph and `robots` are now set client-side; private and unknown routes receive `noindex, nofollow`.
- `apps/web/index.html` — default title/description/OG fallback for the single shared document; canonical is set at runtime because a static root-relative hash URL is parsed by Vite as an asset path.
- `docs/sitemap.md:12`, `docs/design.md:505` — nav resolves to approved hash routes.
- `docs/architecture.md:83-85, 249` and `AGENTS.md:168-173` — pre-render and SEO requirements.
- No `sitemap.xml`, `robots.txt` or `prerender.*` file exists in the repository.

## Impact

- **Scope:** SEO only. Public routes, layouts, permissions, data and business rules are unchanged.
- **Cost:** Small for option A below; medium for option B (build integration and deployment rewrite).
- **Security:** No change. Private routes already carry client-side `noindex`; robots.txt is not a security control.
- **Data:** No farm data is exposed by either option.

## Smallest change options

**A — Retain approved hash routes (current state).** Keep client-side per-page metadata and the single shared document. Accept that build-time per-route pre-render and effective `sitemap.xml`/`robots.txt` cannot be delivered on this URL shape; record those two gates as blocked rather than silently claiming them. No URL or hosting change.

**B — Adopt clean paths with React Router `BrowserRouter`.** Serve one static file per approved public route, generate `sitemap.xml`/`robots.txt`, and add an SPA fallback rule. This requires owner approval to change the documented hash-route shape, updates to `docs/sitemap.md`, `docs/design.md`, ACR-004 and `docs/deployment.md`, and a confirmed hosting target (`docs/deployment.md` is still an approved placeholder).

## Owner decision record

On 27 November 2026 the owner chose **Option A — retain the approved hash routes**. React Router `HashRouter` stays; all documented hash URLs and route IDs stay unchanged; client-side metadata remains in `DocumentMeta.tsx`. Build-time per-route pre-render, an effective `sitemap.xml` and `robots.txt` are recorded as **BLOCKED** SEO gates, not as delivered work. Option B is not approved and requires a fresh ACR with a confirmed hosting target.
