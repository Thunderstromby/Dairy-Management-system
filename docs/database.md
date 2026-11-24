# SmartFarm — Database Design

**Document:** `docs/database.md`  
**Version:** 1.0 — implementation candidate  
**Date:** 24 November 2026  
**Sources:** `srs.md` v1.0; `architecture.md` v1.2.  
**Status:** Schema candidate subject to unresolved SRS/business-rule decisions. **Do not deploy to production until approval and PostgreSQL integration tests.**

## 1. Locked architecture and principles

- **Must remain:** React.js + Tailwind CSS frontend; Node.js + Express.js API; **PostgreSQL** database.
- **Selected supporting architecture:** TypeScript; Drizzle ORM + Drizzle Kit + `pg`; one shared PostgreSQL database, a tenant-scoped modular monolith and separate PostgreSQL-backed Graphile Worker process.
- `schema.sql` contains the proposed PostgreSQL baseline DDL; `seed.sql` contains safe role-reference records only. Apply the DDL through reviewed versioned Drizzle/SQL migrations, not on every application startup.
- Separate **platform tables** from **farm/tenant tables**. A farm workspace owns every operational record via `workspace_id`. Tenant references use `(workspace_id, related_id)` composite FKs in addition to UUID PKs.
- Public inquiries are platform records, not automatically customers. Workers are **not login accounts**. Do not create online checkout, subscriptions, payment-gateway, RFID/IoT, accounting ledger, or prediction tables.
- Business-rule inputs not approved are **stored without inventing formulas**. The application may not automatically calculate or post those values before approval.

## 2. Entity catalog: attributes, PKs, FKs and relationships

All listed tables have UUID `id` primary keys and `created_at`, `updated_at` timestamps. All tables under *farm* have mandatory `workspace_id` FK to `workspaces.id`, `UNIQUE(workspace_id,id)`, and tenant RLS unless explicitly noted. FK names below are logical descriptions; the SQL is authoritative.

| Group | Entity | Important attributes | Important relationships / constraints |
|---|---|---|---|
| Platform | `roles` | code, description | Seeded three login roles; unique code |
| Platform | `users` | email, password_hash, display_name, status, last_login_at, deleted_at | Unique email; Argon2id hash never plaintext |
| Platform | `customers` | name, contact_name, email, phone, status | Optional creator user; no fictitious billing |
| Platform | `workspaces` | customer_id, name, status, suspended_at, reason | Many workspaces per customer **structurally possible**, business cardinality pending; status constrained |
| Platform | `platform_roles` | user_id, role_code | Super Admin only; unique user |
| Farm/access | `workspace_memberships` | user_id, role_code, revoked_at, granted_by | User to workspace membership (structural many-to-many; policy TBD); workspace role is Admin/Supervisor |
| Auth | `password_reset_tokens` | user_id, token_hash, expires_at, used_at | Single-use handled transactionally, hashed token |
| Runtime | `session` | sid, sess, expire | `connect-pg-simple` session persistence; managed separately |
| Farm | `farm_settings` | farm_name, timezone, currency_code, formats, measurement/notification/module preferences, default_milk_price | Exactly one settings row per workspace; meaningful choices must be configured |
| Animals | `animal_groups` | name, description, archived_at | Named per-farm group |
| Animals | `animals` | ear_tag, name, breed, gender, birth_date/estimated_age_months, category, group_id, mother_id, father_id, lifecycle_status, archived_at | Unique normalized ear tag per workspace; parents and group same workspace |
| Animals | `animal_lifecycle_events` | animal_id, status, event_date, reason | Historical transitions, not an invented transition engine |
| Animals | `animal_weights` | animal_id, weighed_on, weight_value, unit | Historical observations |
| Animals | `animal_transactions` | animal_id, kind, date, amount, currency, counterparty | Purchase/sale record; **not** auto-posted to finance |
| Files | `attachments` | storage_key, filename, MIME, byte_size, sha256, animal_id, worker_id | Private object storage, exactly one animal or worker owner; authorized streaming only |
| Health | `health_records` | animal_id, severity, diagnosis, symptoms, date, recorded_by | Severity low/moderate/high/critical; no Supervisor high/critical alert access |
| Health | `treatments` | animal_id, health_record_id, medication, dosage, dates, vet, cost | Cost stored; no automatic expense recognition |
| Health | `vaccinations` | animal_id, vaccine_name, given_on, next_due_on | Due-date index for reminders |
| Health | `veterinary_appointments` | animal_id, scheduled_at, veterinarian, reason | Appointments |
| Health | `disease_history` | animal_id, disease, diagnosed_on, resolved_on | Disease history |
| Milk | `milk_production` | animal_id, date, morning/evening session, litres, quality | Unique `(workspace,animal,date,session)`; precise numeric quantity |
| Milk | `milk_storage_locations` | name, archived_at | Tanks/containers; allocation rule TBD |
| Milk | `milk_collections` | location_id, date, litres | Collection source record; location may be absent pending allocation rule |
| Milk | `milk_sale_customers` | name, contact | Milk buyer, not platform customer |
| Milk | `milk_sales` | customer_id, sold_on, litres, unit_price, payment_status, method, currency | Paid/unpaid only; no partial-payment model |
| Milk | `milk_usage` | used_on, litres, purpose | Internal permitted use |
| Milk | `milk_wastage` | wasted_on, litres, reason, estimated_loss | Estimated loss nullable until valuation rule approved |
| Milk | `milk_stock_movements` | location_id, source (collection/sale/usage/wastage), signed litres_delta, time | One source FK, sign check, source-kind check; transactional stock ledger, **not financial ledger** |
| Inventory | `inventory_items` | name, category, unit, minimum_stock, expiry_date, archived_at | Feed/medicine/other; stock derived from movements |
| Inventory | `inventory_purchases` | item_id, date, quantity, unit_cost, supplier | Purchase source; no finance auto-posting |
| Inventory | `inventory_additions` | item_id, date, quantity, reason | Quick additions |
| Inventory | `inventory_adjustments` | item_id, date, signed delta, reason, actor | Reason required; Farm Admin authorization in API |
| Inventory | `inventory_usage` | item_id, used_on, quantity, purpose | Supervisor only where approved |
| Inventory | `inventory_stock_movements` | item_id, one source FK, signed quantity_delta | Source must reference same tenant **and item**; balance view |
| Feeding | `feeding_plans` | name, animal_id/group_id, effective dates | Exactly one animal or group target; multi-item plans modeled |
| Feeding | `feeding_plan_items` | plan_id, inventory_item_id, quantity, unit | Individual feed ingredient rows |
| Feeding | `feeding_schedules` | plan_id, label, feeding_time | Default morning/evening or configured times |
| Feeding | `feeding_actuals` | plan_id, schedule_id, animal_id, fed_at, actor | Actual feeding event; no implied stock deduction |
| Feeding | `feeding_actual_items` | feeding_actual_id, inventory_item_id, quantity, unit | Actual quantities |
| Workforce | `workers` | full_name, cnic, phone, start/end dates, archived_at | Unique normalized non-null CNIC within farm; no login account |
| Workforce | `attendance` | worker_id, date, in/out timestamps, status | No unapproved one-record-per-day unique constraint |
| Workforce | `leave_requests` | worker_id, type, date range, status, paid flag, deciding actor | Only Farm Admin may decide; dates ordered |
| Workforce | `overtime_records` | worker_id, date, hours | Recording only, not advanced payment calculations |
| Payroll | `salary_structures` | worker_id, monthly/daily, rate, currency, frequency, rules, effective dates | Flexible options; formulas remain approval-gated |
| Payroll | `payroll_records` | worker_id, period, gross/deduction/net/pending, currency, calculation_details, status | Numeric calculation fields nullable until approved; no auto-formula |
| Payroll | `salary_advances` | worker_id, date, amount, currency, recovery_notes | Advance history |
| Payroll | `payroll_deductions` | payroll_id, advance_id, description, amount | Deductions and possible advance recovery reference |
| Payroll | `salary_payments` | payroll_id, date, amount, method, reference | Cash/bank/mobile wallet/custom are **recorded methods**, not gateway processing |
| Payroll | `payslips` | payroll_id, generated_at, private storage_key | Generated printable/PDF artifact metadata |
| Finance | `income_categories`, `expense_categories` | name | Per-workspace categories; approved predefined categories need confirmation |
| Finance | `incomes`, `expenses` | category_id, date, amount, currency, description | Farm Admin only; no double-entry accounting |
| Equipment | `equipment` | name, type, quantity, condition, archived_at | Condition vocabulary pending approval |
| Equipment | `equipment_maintenance` | equipment_id, date, description, condition_after | No cost tracking |
| Equipment | `equipment_usage` | equipment_id, date, description | Usage history |
| Alerts | `notifications` | recipient_user_id, kind, severity, title, body, read_at | Receiver enforced by API; high/critical health alerts Admin-only |
| Alerts | `notification_settings` | kind, enabled_in_app, enabled_email | Per-farm kinds, no unapproved per-user behavior |
| Alerts | `email_outbox` | recipient_email, template, payload, attempts, status, retry_at | Transactional outbox; no invented delivery guarantee |
| UI | `dashboard_layouts` | user_id, layout jsonb | **Candidate** per-user persistence; sharing decision pending |
| Data | `data_jobs` | kind, status, file_key, requesting user, error | Import/export/backup metadata only, distinct from Graphile Worker internals |
| Data | `backup_configurations` | enabled, options | Per-farm approved configuration, not full multi-tenant dump access |
| Audit | `activity_logs` | workspace, actor, action, resource, occurred_at, context | Farm activity records, no sensitive before/after payload |
| Audit | `platform_activity_logs` | actor, action, resource, occurred_at, context | Separate platform audit scope |
| Public | `contact_inquiries` | name, email, phone, message, received_at | No login, customer creation or provisioning |

### 2.1 Derived read models

- `milk_daily_complete`: sums two validated morning/evening entries per animal/date. **Incomplete days are deliberately excluded** rather than assumed zero. Farm total is `SUM(total_litres)` scoped by workspace and date; policy for missing sessions is pending.
- `inventory_stock_balance`: sum of signed inventory movements by item. Must **not** be interpreted as permission to let stock go negative; approved shortage rule and locking required.
- `milk_stock_balance`: sum of signed milk movements per storage location (including possible unallocated `NULL`), not an approved storage-allocation policy.
- Monthly analytics, payroll, wastage valuation, drop-alert baseline, finance recognition, dashboard charts and reporting summaries should be queries/materializations only after their underlying formulas are approved.

## 3. Relationships and referential integrity

1. `customers (1) -> (many) workspaces`; this physical relation does **not** approve multiple farms per customer as product policy.
2. `users (many) <-> (many) workspaces` via membership table; business cardinalities remain open.
3. Every operational entity references one workspace; entity relationships are `(workspace_id,id)` composite foreign keys. Cross-workspace animal-parent, worker, milk customer, health, inventory and payroll references fail at the database level.
4. `animals -> lifecycle, weights, transactions, health, treatments, vaccinations, appointments, disease history, production, attachments`; parents are self-references within the same farm.
5. `milk_collections / sales / usage / wastage -> milk_stock_movements`; the stock movement is created in the **same transaction** as its source, idempotently.
6. `inventory_purchases / additions / adjustments / usage -> inventory_stock_movements`; source and item must match, with no cross-item crediting.
7. `workers -> attendance, leave, overtime, salary structures, payroll, advances, attachments`; `payroll_records -> deductions, payments, payslips`.
8. Private photos/documents store **only metadata** in PostgreSQL. Storage contents are in a private object store, referenced by an opaque key.

## 4. Data types, constraints, uniqueness

| Concern | Design |
|---|---|
| IDs | `uuid` with `gen_random_uuid()`; no sequential tenant-sensitive identifiers exposed |
| Farm foreign keys | Mandatory `workspace_id`; composite `(workspace_id, id)` FKs for child ownership |
| Precise quantities and money | `numeric(20,6)` baseline storage capacity; `decimal.js` in Node. Numeric precision and rounding must still be client-approved; never silently truncate inputs |
| Dates | `date` for farm-local business days; `timestamptz` for instants; IANA farm timezone stored in settings and validated by API |
| Currency | ISO-style uppercase three-character code, **configured per farm**; historical transaction currency recorded individually, no automatic conversions |
| Controlled values | CHECK constraints only for explicitly named classifications; unapproved equipment-condition, vaccination schedule and leave types remain plain text |
| Animal ear tag | Case/outer-whitespace normalized unique index within workspace. Changing a tag and archive reuse policy pending |
| Worker CNIC | Per-workspace digit-normalized unique index for non-null CNIC; exact formatting/requiredness pending approval |
| Production duplicate | One animal/date/session row, unique composite key; edits/late entries require approved policy |
| Transactions | Non-negative input amounts and quantities where appropriate, signed adjustment/stock movement rows; no implicit refund workflow |
| Date ranges | End date must not precede start date |
| Inventory | Categories feed, medicine, other. Reaching `minimum_stock` triggers approved warning behavior in services |
| Private fields | Password hashes, CNIC and documents inaccessible except authorized API field projections; DB `CHECK` is **not** sufficient for privacy |
| Audit | At minimum user/action/date; avoid sensitive records in audit context, and prohibit routine hard deletes of history |

## 5. Index strategy

- By default: PK B-tree index, `(workspace_id,id)` unique indexes, `(workspace_id,created_at DESC)` for every farm table.
- Selective unique indexes on ear tags, CNICs, production sessions, single-farm settings, reference codes and stock movement source keys.
- Date/range lookup indexes on production date, vaccination due date, payroll periods, income/expense date, attendance date and activity timestamps.
- Recipient index on `(workspace_id,recipient_user_id,created_at DESC)` for notifications; outbox queue status/next retry index.
- Search via case-insensitive indexed fields or PostgreSQL `pg_trgm`/FTS **after** approved searchable columns, workload profiling and safe per-role filtering. No new search service.
- Re-evaluate with `EXPLAIN (ANALYZE, BUFFERS)`, high-cardinality test data, real pagination/filter queries and index size. Avoid redundant speculative indexes.

## 6. Tenant isolation, authorization and transactions

- All 56 candidate farm tables have RLS enabled **and forced**, with an active-workspace policy comparing `workspace_id` to `app.workspace_id`. An unset context denies all tenant operations.
- Within an Express request, check the authenticated user, active account, **current** membership and active workspace, then open a database transaction and issue `SET LOCAL app.workspace_id = '<verified uuid>'`; perform queries through that transaction only. Roll back and clear context on failure. **Never use client-supplied workspace ID as trusted context.**
- Runtime database identity must be non-owner, non-superuser, without `BYPASSRLS`; no migration or table-ownership privileges. Split public/platform/farm access with separate restricted DB roles or repositories/grants after security review. Table RLS alone does **not** distinguish Farm Admin from Supervisor—Express policies and field allowlists are mandatory.
- Platform data and private secrets have no blanket farm-policy grant. Super Admin has no routine access to farm data. Database migration/backup identities must remain segregated.
- Graphile Worker and system actions must explicitly select an authorized workspace and use a scoped database transaction. Before a job runs, re-check workspace active state and permitted recipients; paused/suspended behavior is pending approval.
- Validate transactional source + stock movement writes, row locks/serialization, duplicate submission keys, negative-balance policy and failures. A movement must never be published separately from its source event.
- `milk_sales.payment_status` only has Paid/Unpaid; do not implement partial payments/outstanding milk balances. There are no payment processor credentials or transactions in the schema.

**Security caveat:** The included RLS policy primarily isolates tenants. Database **grants, session context safety, record permissions, user-to-recipient membership checks and field-level authorization are deployment/application responsibilities**. Do not expose unrestricted SQL access or user-settable `app.workspace_id`.

## 7. Audit fields and deletion policy

All modeled business tables: `id`, `created_at`, `updated_at` with an update trigger. Domain actions with an accountable user also store `recorded_by`, `adjusted_by`, `uploaded_by`, `requested_by`, `granted_by`, or equivalent. `activity_logs` and `platform_activity_logs` separately record actor/action/time/resource and approved nonsensitive context. Advanced before/after auditing is excluded.

**Soft deletion candidate:** `animals`, `workers`, `equipment`, `inventory_items`, `animal_groups`, `milk_storage_locations` have `archived_at`; `users` has `deleted_at` and status; access memberships use `revoked_at`. Do not cascade-delete operational history. `lifecycle_status` is separate from archiving and follows approved transitions. No global soft-delete filter is assumed; reads must be explicit.

**Deletion prohibited by default pending policy:** historical production, health, payroll, finance, stock movements, notifications and audit records. The SRS requires applicable permanent deletion, but **which** records, retention, authority and effects are OPEN. Any approved purge must be an audited, restricted migration/job procedure with related-file disposal and restore implications reviewed.

## 8. Normalization and consistency strategy

- Target **3NF** for operational records; isolate repeated observations, payments, source events, categories and many-to-many memberships.
- Avoid storing recalculable daily/farm totals as mutable columns. Use scoped SQL views/queries. Store **source snapshot** price/amount/currency on historical transactions to prevent retroactive reinterpretation.
- Use JSONB only for flexible, validated UI preferences, email payloads, configurable rules and calculation-detail snapshots where exact shape is not yet confirmed; no primary relational records hidden in JSONB.
- Keep milk inventory ledger distinct from financial income/expense records. Do not double-count transactions by creating automatic income/expense rows absent approved recognition policy.
- Restrict financial/payroll data to Farm Admin in both API and reports, search, exports and notifications. Do not share Admin query payloads with Supervisor.

## 9. Seed requirements

`seed.sql` inserts only deterministic non-sensitive role reference codes. Do **not** seed guessed default milk prices, salary formulas, currencies, farm timezones, fake dashboards, fake animals, demo accounts or third-party credentials. First Super Admin account must be created by secure deployment provisioning with Argon2id; farm-specific settings are entered during onboarding. Predefined financial categories and notification defaults require an approved catalog before additional seeds are written. Test fixtures belong in isolated test environments and must never be promoted to production.

## 10. Migration strategy

1. Produce reviewed Drizzle TypeScript schema matching the SQL baseline; check generated SQL and reconcile hand-authored indexes, RLS policies, triggers, and views in explicit SQL migrations.
2. Use `drizzle-kit generate` to prepare **versioned, immutable** migrations. Keep one migration ledger; use Drizzle Kit's standard migration tracking and do not re-run `schema.sql` on an existing database.
3. Run migrations with a dedicated credential against a tested staging clone; app runtime has no DDL privileges. Coordinate Graphile Worker-owned schema and `connect-pg-simple` session table creation separately; verify library versions and ownership before deployment.
4. For live changes use expand → deploy compatible application → backfill (batched/resumable) → enforce/contract. Use `CREATE INDEX CONCURRENTLY` outside transactions for larger production indexes.
5. Backup PostgreSQL + attachments; verify restore and rollback/forward recovery. Do not rely on destructive down-migrations as the sole recovery mechanism.
6. Deploy gated by transaction/tenant/RBAC security tests, checks for constraints and uniqueness, report reconciliation, concurrent stock updates, suspended workspaces, imports and worker idempotency.
7. Treat client-approved business formulas, dataset limits and deletion rules as separately reviewed migration/application changes with tests referencing SRS acceptance criteria.

Suggested source tree: `packages/database/schema/`, `packages/database/migrations/`, `packages/database/seeds/`, and `docs/{database.md,schema.sql,seed.sql,erd.md}`. Do not put production secrets, file blobs or realistic CNIC data in the repository.

## 11. Pending decisions and release blockers

| Priority | Unresolved decision | Impact |
|---|---|---|
| Critical | User/customer/workspace cardinality; provisioning/activation and session policy | Membership constraints and security workflows |
| Critical | Complete role-permission matrix, especially Supervisor health edits, reports, attachments, exports | API grants, data projections, notifications |
| Critical | Milk missing-session treatment, historic corrections, rolling 3-day baseline and 15% alert timing | Production aggregates and scheduled jobs |
| Critical | Stock shortage, cancellation/reversal, tank allocation and internal usage | Milk movement integrity and availability checks |
| Critical | Inventory negative stock, expiry, feeding-to-stock deduction, duplicates | Stock and feeding transaction semantics |
| Critical | Payroll formula, advances/installments, multiple payments, payslip reopening, paid leave | Calculation fields and payment workflows |
| Critical | Cash vs accrual/sales financial recognition; unpaid sales; costs and deletions | Income/expense reporting and no-double-count policy |
| High | Deletion/retention, archive transitions, changed ear tags, re-entry and farm transfers | FK and historical record policy |
| High | Formats, file caps, encryption, geographic requirements and backup RPO/RTO | Attachments and recovery |
| High | Per-user vs shared dashboard layout; exact searchable fields, categories, workday rules | Preferences, indexes and app validation |
| High | Notification retry, delivery, suppression, recipient and suspension policy | Outbox, job deduplication and audits |
| High | Farm timezone/currency/precision policies and methods of recording offline payments | Historical values, configured calculations |

**Source consistency:** `architecture.md` identifies the core stack as locked but labels supporting technology choices and production services conditional. This database uses the proposed Drizzle/RLS/Graphile pattern without upgrading conditional decisions into final client approval. The proposed decorative public-only 3D change has no database entities.

## 12. Validation status

This is a **candidate executable DDL design**, not a claim of successful PostgreSQL deployment. The file is structurally generated and reviewed for scope; actual SQL execution, database role/grant setup, RLS attack tests, precision tests and concurrent write tests remain required before release.
