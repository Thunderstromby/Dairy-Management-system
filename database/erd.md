# SmartFarm — ERD Description

**Reference:** `docs/database.md` and `docs/schema.sql` (24 November 2026).  
**Notation:** `||--o{` = one to zero/many; `}o--o{` = many-to-many through a junction. All farm-owned records include `workspace_id` and its composite FK requirement, even where omitted for readability.

## 1. Platform / access

```mermaid
erDiagram
  CUSTOMERS ||--o{ WORKSPACES : owns
  USERS ||--o{ WORKSPACE_MEMBERSHIPS : assigned
  WORKSPACES ||--o{ WORKSPACE_MEMBERSHIPS : authorizes
  ROLES ||--o{ WORKSPACE_MEMBERSHIPS : assigns
  USERS ||--o| PLATFORM_ROLES : platform_role
  USERS ||--o{ PASSWORD_RESET_TOKENS : resets
  WORKSPACES ||--|| FARM_SETTINGS : configures
  WORKSPACES ||--o{ ACTIVITY_LOGS : audits
  USERS ||--o{ PLATFORM_ACTIVITY_LOGS : performs
```

`WORKSPACE_MEMBERSHIPS` is a junction allowing future multiple workspace assignments, **not an approved policy**. Suspension blocks tenant RLS access (except restricted maintenance/recovery procedures). Sessions are held in a standalone `session` table and are never treated as a farm entity.

## 2. Animals, health and milk

```mermaid
erDiagram
  WORKSPACES ||--o{ ANIMALS : contains
  ANIMAL_GROUPS ||--o{ ANIMALS : categorizes
  ANIMALS ||--o{ ANIMAL_LIFECYCLE_EVENTS : changes
  ANIMALS ||--o{ ANIMAL_WEIGHTS : weighs
  ANIMALS ||--o{ ANIMAL_TRANSACTIONS : trades
  ANIMALS ||--o{ HEALTH_RECORDS : experiences
  HEALTH_RECORDS ||--o{ TREATMENTS : documents
  ANIMALS ||--o{ VACCINATIONS : receives
  ANIMALS ||--o{ VETERINARY_APPOINTMENTS : schedules
  ANIMALS ||--o{ DISEASE_HISTORY : histories
  ANIMALS ||--o{ MILK_PRODUCTION : produces
  MILK_SALE_CUSTOMERS ||--o{ MILK_SALES : buys
  MILK_STORAGE_LOCATIONS ||--o{ MILK_STOCK_MOVEMENTS : holds
  MILK_COLLECTIONS ||--o{ MILK_STOCK_MOVEMENTS : supplies
  MILK_SALES ||--o{ MILK_STOCK_MOVEMENTS : deducts
  MILK_USAGE ||--o{ MILK_STOCK_MOVEMENTS : uses
  MILK_WASTAGE ||--o{ MILK_STOCK_MOVEMENTS : loses
```

An animal can optionally reference mother/father animals in the same workspace. Every milk movement points to **exactly one** source and has a signed delta; these are stock movements, not journal entries. Milk sales have Paid/Unpaid status, no partial-payment entity.

## 3. Inventory and feeding

```mermaid
erDiagram
  INVENTORY_ITEMS ||--o{ INVENTORY_PURCHASES : purchased
  INVENTORY_ITEMS ||--o{ INVENTORY_ADDITIONS : added
  INVENTORY_ITEMS ||--o{ INVENTORY_ADJUSTMENTS : adjusted
  INVENTORY_ITEMS ||--o{ INVENTORY_USAGE : consumed
  INVENTORY_ITEMS ||--o{ INVENTORY_STOCK_MOVEMENTS : balances
  FEEDING_PLANS ||--o{ FEEDING_PLAN_ITEMS : includes
  FEEDING_PLANS ||--o{ FEEDING_SCHEDULES : schedules
  FEEDING_PLANS ||--o{ FEEDING_ACTUALS : observed
  FEEDING_ACTUALS ||--o{ FEEDING_ACTUAL_ITEMS : comprises
  INVENTORY_ITEMS ||--o{ FEEDING_PLAN_ITEMS : planned_item
  INVENTORY_ITEMS ||--o{ FEEDING_ACTUAL_ITEMS : fed_item
```

A feeding plan targets **one animal or one group**; actual feeding may reference schedules. **No implicit inventory deduction** from feeding occurs until the client approves that rule. Inventory source/item match is reinforced by three-column FKs in `schema.sql`.

## 4. Workers, payroll and finance

```mermaid
erDiagram
  WORKERS ||--o{ ATTENDANCE : attends
  WORKERS ||--o{ LEAVE_REQUESTS : requests
  WORKERS ||--o{ OVERTIME_RECORDS : works
  WORKERS ||--o{ SALARY_STRUCTURES : earns
  WORKERS ||--o{ PAYROLL_RECORDS : paid_for
  WORKERS ||--o{ SALARY_ADVANCES : advances
  PAYROLL_RECORDS ||--o{ PAYROLL_DEDUCTIONS : deducts
  SALARY_ADVANCES ||--o{ PAYROLL_DEDUCTIONS : recovered_by
  PAYROLL_RECORDS ||--o{ SALARY_PAYMENTS : disburses
  PAYROLL_RECORDS ||--o{ PAYSLIPS : generates
  EXPENSE_CATEGORIES ||--o{ EXPENSES : classifies
  INCOME_CATEGORIES ||--o{ INCOMES : classifies
```

Finance entries are separate from sales, animal transactions and salary payments until recognition rules are approved. No general ledger, online payment processor or accounting reconciliation subsystem.

## 5. Files, messaging and operations

```mermaid
erDiagram
  ANIMALS ||--o{ ATTACHMENTS : owns
  WORKERS ||--o{ ATTACHMENTS : owns
  USERS ||--o{ NOTIFICATIONS : receives
  NOTIFICATIONS ||--o{ EMAIL_OUTBOX : may_enqueue
  WORKSPACES ||--o{ NOTIFICATION_SETTINGS : configures
  WORKSPACES ||--o{ BACKUP_CONFIGURATIONS : configures
  WORKSPACES ||--o{ DATA_JOBS : performs
  USERS ||--o{ DASHBOARD_LAYOUTS : customizes
```

An attachment must refer to **exactly one** worker or animal. Email outbox recipients need server-side permission validation; High/Critical animal health alerts must never target Supervisors. Graphile Worker internal queue tables are managed by its own installation/versioned migration process, and are not drawn here. Public `contact_inquiries` is standalone, intentionally not an automatic customer/workspace creation relationship.

## 6. Relationship validation checklist

- Composite FK rejects a child referencing a record in a different workspace.
- UUID internal PKs are unique globally; ear tag and CNIC uniqueness are **farm-scoped**.
- Suspended farm cannot read/update tenant rows under ordinary runtime policy.
- `milk_production` rejects duplicate date/animal/session combinations.
- A stock movement cannot name multiple source kinds; inventory movement references the **same item** as its source.
- Farm Admin/Supervisor visibility is **not** derived from ERD edges: it is enforced in Express RBAC and approved response schemas.
- Cleanup, reports, background jobs and data exports use the same tenant and permission boundaries.
