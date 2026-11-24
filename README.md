# SmartFarm — Dairy Management System

![SmartFarm Logo](https://images.unsplash.com/photo-1526633414598-7851cd0e7cbe?w=800&h=400&fit=crop)

A modern, operational dairy farm management platform built with a locked technology stack and role-based access control.

## ✨ Overview

SmartFarm digitizes traditional dairy farm operations, centralizing animal records, milk production, inventory, workforce management, payroll, and financial reporting. The platform supports multiple customer farm workspaces with strict data isolation.

## 📋 Architecture (LOCKED)

| Layer | Technology | Status |
|-------|-----------|--------|
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
| Payments | COD/manual only; no online gateways | LOCKED |
| Email | Brevo Free candidate | Conditional |
| Storage | OCI private Object Storage candidate | Conditional |

## 📋 Scope (Included)

- Public SmartFarm website (landing, features, benefits, contact inquiry)
- Super Admin Panel (customer registration, workspace creation, provisioning, suspension)
- Private Farm Management Application (Farm Admin & Farm Supervisor roles)
- Animal management (registration, lifecycle, health, vaccinations, weight tracking)
- Milk production tracking (morning/evening entries, quality, sales, wastage, stock)
- Inventory management (feed, medicines, other supplies; purchases, additions, adjustments)
- Feeding plans and actual feeding records
- Worker management (profiles, CNIC, documents; no login accounts)
- Attendance and leave management
- Payroll management (salary structures, advances, deductions, payslips)
- Financial management (incomes, expenses, profit/loss dashboards, reports)
- Equipment management (registration, maintenance, usage)
- Dashboards and reports (role-specific, exportable)
- Notifications and scheduled background jobs (Graphile Worker)
- Farm settings (units, currency, timezone, preferences)
- Data imports/exports (Excel/CSV)
- Backup and activity logging

## 🚫 Exclusions (NOT included)

- Public self-registration or automatic workspace creation
- Online payment checkout or payment gateways
- Recurring subscriptions or automatic renewals
- IoT, RFID, or hardware sensor integration
- Offline data entry or synchronization
- 3D farm environments, models, or interactive visualizations
- Advanced accounting ledger and reconciliation
- Breeding management modules
- Advanced nutrition engines
- Mobile applications (Android/iOS)
- External API dependencies
- Languages other than English
- Advanced session monitoring
- Before/after activity tracking

## 👥 User Roles

| Role | Key Permissions |
|------|----------------|
| **Guest** | Public website only; submit inquiries; no access to private areas |
| **Super Admin** | Platform-wide: customer/ workspace management; no routine farm operations |
| **Farm Admin** | Full farm workspace access: all modules, settings, finance, payroll, equipment, reports, imports/exports, backups, suspensions |
| **Farm Supervisor** | Operational only: milk entry, attendance, feeding, permitted animals/health; **excluded**: finance, payroll, settings, archiving, High/Critical health alerts |
| **Worker** | Record only; no individual login accounts |

## 🛠 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment
cp .env.example .env
# Edit .env with PostgreSQL connection, Brevo API key, and domain settings

# 3. Start development servers
npm run dev          # Vite frontend at http://localhost:3000
npm run dev:api      # Express API at http://localhost:4000
npm run dev:worker   # Graphile Worker process

# 4. Run development checks
npm run typecheck    # TypeScript validation
npm run lint         # ESLint
npm test             # Vitest unit tests

# 5. Preview production build
npm run preview      # at http://localhost:4173
```

## 📁 Repository Structure

```
smartfarm/
├── package.json                    ← Root workspace config
├── vite.config.ts                  ← Vite config
├── tsconfig.json                   ← TypeScript config
├── eslint.config.mjs               ← ESLint config
├── .prettierrc.json                ← Prettier config
├── .env.example                    ← Environment variables template
├── .gitignore                      ← Git ignore rules
├── apps/
│   ├── web/                        ← React + Tailwind frontend
│   │   ├── package.json
│   │   └── src/                    ← Vite-react source
│   ├── api/                        ← Node.js + Express backend
│   │   ├── package.json
│   │   └── src/                    ← Express source
│   └── worker/                     ← Graphile Worker process
│       ├── package.json
│       └── src/
├── packages/
│   ├── database/                   ← Drizzle ORM + migrations
│   │   ├── package.json
│   │   ├── schema/                 ← Drizzle schema TS
│   │   ├── migrations/             ← Versioned SQL migrations
│   │   └── seeds/                  ← Safe role-reference seeds
│   ├── ui/                         ← Reusable UI components & tokens
│   │   ├── package.json
│   │   ├── components/             ← shadcn/ui + Radix primitives
│   │   └── tokens/                 ← Tailwind semantic tokens
│   ├── domain/                     ← Business rules & calculations
│   │   └── package.json
│   └── contracts/                  ← Type contracts & schemas
│       └── package.json
├── infrastructure/
│   ├── caddy/                      ← Caddy HTTPS reverse proxy config
│   ├── systemd/                    ← systemd service units
│   ├── docker/                     ← Docker Compose (optional)
│   ├── scripts/                    ← Deployment & utility scripts
│   └── backups/                    ← Backup configurations
├── tests/
│   ├── unit/                       ← Vitest unit tests
│   ├── integration/                ← Integration tests
│   ├── permissions/                ← RBAC negative tests
│   ├── e2e/                      ← Playwright E2E journeys
│   └── performance/                ← k6 load tests
├── docs/
│   ├── architecture.md             ← Locked architecture
│   ├── database.md                 ← DB design with RLS, UUIDs
│   ├── srs.md                      ← Software Requirements Spec
│   ├── design.md                   ← UI design blueprint
│   ├── scope.md                    ← Project scope & exclusions
│   ├── implementation-plan.md      ← Milestone execution plan
│   ├── deployment.md               ← Hosting & deployment guide
│   ├── api-spec.md                 ← API specification
│   ├── agreement.md                ← Development agreement
│   ├── appflow.md                  ← App flow diagrams
│   ├── design-system.md            ← Design tokens & components
│   ├── srs.md                      ← Requirements baseline
│   ├── qa.md                       ← QA checklist
│   ├── scope.md                    ← Scope document
│   ├── sitemap.md                  ← Page navigation scope
│   ├── stitch-prompts.md           ← Stitch visual handoff
│   ├── template-check.md           ← Template validation
│   ├── discovery.md                ← Discovery findings
│   ├── agreement.md                ← Development agreement
│   └── ...                         ← Other design docs
└── .github/workflows/
    └── ci.yml                      ← GitHub Actions CI workflow
```

## 📜 License

SmartFarm is a commercial software product. Source code is licensed per development agreement. No open-source licensing applies to the application code — only the selected open-source dependencies (marked as $0 software in the architecture).

## 📞 Contact

For development, customization, or deployment questions, refer to the approved architecture documentation or contact the development team.