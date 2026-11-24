# SmartFarm Dairy Management System

**Status**: Architecture approved and locked. Scaffold project structure only. No application features implemented yet.

## Approved Technology Stack (LOCKED)

| Layer | Technology | Status |
|---|---|---|
| Frontend | React.js + Tailwind CSS | LOCKED |
| Backend | Node.js + Express.js | LOCKED |
| Database | PostgreSQL | LOCKED |
| ORM | Drizzle ORM + Drizzle Kit + pg | Recommended |
| Language | TypeScript | Recommended |
| Pattern | Modular monolith + separate job process | Recommended |
| Auth | express-session + connect-pg-simple + Argon2id | Recommended |
| Authorization | RBAC + ownership/field policies + RLS | Recommended |
| API | REST, OpenAPI 3.1, Zod validation | Recommended |
| UI | shadcn/ui + Radix UI | Recommended |
| Charts | Recharts, Lucide React | Recommended |
| Motion | CSS + selective Motion | Recommended |
| 3D | Small public-only decorative motif; CSS first, Three.js + R3F conditional, static fallback | Conditional |
| Payments | COD/manual only; no online gateways | LOCKED |
| Email | Brevo Free candidate | Conditional |
| Storage | OCI private Object Storage candidate | Conditional |

## Project Structure

```
smartfram/
  apps/
    web/     ← React + Tailwind Vite frontend
    api/     ← Node.js + Express backend
    worker/  ← Graphile Worker process
  packages/
    database/ ← Drizzle schema + migrations
    ui/       ← Reusable UI components & tokens
    domain/   ← Business rules & calculations
    contracts/← Type contracts & schemas
  infrastructure/
    caddy/    ← Caddy HTTPS reverse proxy
    systemd/  ← systemd service units
    docker/   ← Docker configurations
    scripts/  ← Deployment & utility scripts
    backups/  ← Backup configurations
  tests/
    unit/     ← Vitest unit tests
    integration/ ← Integration tests
    permissions/ ← RBAC tests
    e2e/      ← Playwright E2E tests
    performance/ ← k6/load tests
  docs/       ← Architecture & SRS documentation
  .github/workflows/ ← CI/CD pipelines