# ACR-007 — Public informational pages from the new Stitch exports

**Status:** OPEN — owner decision required. No routes or screens have been added.  
**Authority:** `AGENTS.md` §§7, 8, 15, 19, 24; `docs/architecture.md` §4.1; `docs/sitemap.md`; `docs/acr-004-stitch-public-pages.md`

## Conflict

The owner added `design/stitch_smartfarm_informational_page_template/` containing approved-looking Stitch exports for **Privacy Policy**, **Terms of Service** and **Operational Security** (plus two design-direction PNGs). The approved sitemap lists seven public pages, and ACR-004 records **no new public routes**; `AGENTS.md` §7 forbids extra public routes from Stitch exports. Legal/operational policy copy cannot be invented: `AGENTS.md` §§5, 15 and 19 forbid unapproved claims and placeholder production values.

## Evidence

- `design/stitch_smartfarm_informational_page_template/privacy_policy/code.html` and `screen.png`.
- `design/stitch_smartfarm_informational_page_template/terms_of_service/code.html` and `screen.png`.
- `design/stitch_smartfarm_informational_page_template/operational_security/code.html` and `screen.png`.
- `design/stitch_smartfarm_informational_page_template/agro_editorial_minimalism/DESIGN.md`, `botanical_agricultural_accent/screen.png` — visual-direction references.
- `docs/sitemap.md` — seven approved public pages; `docs/acr-004-stitch-public-pages.md` — no new public routes.

## Impact

- **Scope:** three extra public routes and static content screens if approved; no farm data, permissions, authentication or API changes.
- **Legal:** policy wording must be supplied or explicitly approved by the owner; the visual exports are not a legal source of truth.
- **SEO:** under ACR-005 Option A, additional hash routes keep the same pre-render/sitemap gate limitation as the existing seven pages.

## Smallest change

On approval, add exactly three static public pages (Privacy Policy, Terms of Service, Operational Security) using the existing public shell, source-owned tokens and route-based navigation; port the approved heading structure from the corresponding Stitch exports, with owner-provided/approved body copy only; add no backend, gateway, form or third-party script. Update `docs/sitemap.md`, coverage register and visual-review tracker in the same step.

## Approval record

| Item | Status |
| --- | --- |
| Owner supplied the informational exports | **RECEIVED** 27 November 2026 |
| New public routes (up to three) | **BLOCKED** — explicit owner approval required |
| Legal/policy body copy | **BLOCKED** — owner-supplied or approved wording required |
| Stitch export code deployed as source | **PROHIBITED** — source-owned port only |
