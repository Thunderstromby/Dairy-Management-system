# ACR-006 — Exact Stitch inner-page headings versus locked content rules

**Status:** OPEN — owner decision required for the blocked strings. No architecture change is proposed or applied.  
**Authority:** `AGENTS.md` §§5, 22, 24; `docs/architecture-rules.md`; `docs/stitch-visual-handoff.md` §9; `docs/acr-004-stitch-public-pages.md`

## Conflict

On 27 November 2026 the owner instructed that the six inner public pages port the exact H1–H3 strings from their approved Stitch exports. A structural check found 116 exported headings absent from the source-owned ports. A subset of those strings conflicts with locked content rules:

- Fictional or concrete sample identities: `Cow #4028 “Clover”`, `Oak Haven Farm Management Console`.
- Excluded IoT/telemetry: `Plant Telemetry & Service Intervals`, `Plant Telemetry`, `Operational Telemetry`.
- Unapproved formulas: `Income vs Feed Margin (FCPM)`, `Feed vs Solids Efficiency`.

`AGENTS.md` §5 forbids fake data, fake metrics and simulated live telemetry; §22 forbids fictional names and telemetry; `docs/architecture-rules.md` keeps unresolved formulas blocked; ACR-004 records that no fake farm names, telemetry, RFID/IoT or invented formulas are introduced by the public visual port.

## Evidence

- `design/stitch_smartfarm_homepage_experience/smartfarm_dashboard_preview_page/code.html` — sample cow identity, telemetry and efficiency headings.
- `design/stitch_smartfarm_homepage_experience/smartfarm_features_page/code.html` — fictional farm console heading and FCPM heading.
- `docs/stitch-visual-handoff.md:96-97,252` — remove unsupported telemetry/hardware/formula copy from Stitch exports.
- `docs/stitch-coverage-register.md:149,152` — telemetry, fake data and formulas are excluded.

## Impact

- **Scope:** public-page copy only. No route, layout, permission, API, database or authentication change.
- **Security/legal:** none.
- **Data:** blocked strings would imply fabricated records, live telemetry or an unapproved calculation; none are introduced into source.

## Smallest change

Port every non-conflicting exported heading as real, visible H2/H3 content in the existing source-owned components, keeping the approved Stitch visual language and neutral copy. Leave the blocked strings listed above out of the implementation until the owner explicitly approves them or supplies neutral equivalents. No new dependency, route or permission.

## Approval record

| Item | Status |
| --- | --- |
| Owner instruction to port exact headings | **APPROVED** 27 November 2026 |
| Blocked strings (fictional identities, telemetry, formulas) | **BLOCKED** pending owner decision or neutral replacement |
| Affected surfaces | Six inner public pages only |
