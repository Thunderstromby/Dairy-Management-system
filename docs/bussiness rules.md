# SmartFarm Dairy Management System
# Business Rules

**Document:** `docs/business-rules.md`  
**Version:** 1.0  
**Date:** 22 November 2026  
**Source Documents:**
- SmartFarm Dairy Management System SRS v1.0
- SmartFarm Role & Permission Matrix

**Status:** Draft — Pending Client Clarification

---

## 1. Purpose

This document defines the business rules for the SmartFarm Dairy Management System.

It establishes:
- Operational rules.
- Calculation rules.
- Stock and inventory rules.
- Animal lifecycle rules.
- Milk production and sales rules.
- Attendance and payroll rules.
- Financial reporting rules.
- Recommendation and alert rules.
- Date and time handling.
- Authorization and override boundaries.

Only requirements confirmed in the SRS are treated as confirmed rules.

Where a formula, calculation, transition, or exception is not defined, it is recorded as an OPEN QUESTION for the client.

## 2. General calculation conventions

### 2.1 Units

| Data type | Confirmed unit or configuration |
|---|---|
| Milk production | Litres |
| Milk quantity | Farm-configured unit where applicable |
| Inventory quantity | Item-specific/configured unit |
| Feed quantity | Configured feed unit |
| Weight | Unit/configuration requires confirmation |
| Time | Farm-configured timezone |
| Currency | Farm-configured currency |
| Date format | Farm-configured date format |
| Number formatting | Pakistani/Indian grouping supported |

### 2.2 Rounding

The SRS does not define:
- Monetary decimal precision.
- Currency rounding method.
- Milk quantity rounding.
- Payroll rounding.
- Percentage rounding.
- Intermediate calculation precision.

**OPEN QUESTION OQ-BR-001:** Confirm rounding policies for every calculation type.

### 2.3 Currency

Currency is configurable per farm.

The SRS does not confirm a universal default currency.

Do not hardcode PKR, INR, USD, or any other currency.

### 2.4 Override and audit conventions

The following permissions apply:

| Actor | Relevant authority |
|---|---|
| Super Admin | Platform customer/workspace administration; no routine farm operational-data access |
| Farm Admin | Farm-level administration and permitted operational/financial management |
| Farm Supervisor | Limited operational entry and maintenance functions |
| Worker | No application login or direct permissions |
| System automation | Only specifically authorized background operations |

The SRS requires basic activity logs containing user, action, and date/time.

It does not confirm comprehensive before-and-after audit tracking.

Where override logging is not explicitly established, this document marks it as requiring confirmation.

---

# 3. Pricing, discounts, totals and shipping

## BR-001 — Farm currency configuration

**Status:** CONFIRMED RULE

**Trigger:** When a Farm Admin configures or changes farm settings.

**Inputs:**
- Currency: selected currency supported by the application.
- Workspace: authenticated user's assigned workspace.

**Rule:**
1. Each farm can configure its currency.
2. Monetary records and financial displays must use the farm's configured currency.
3. Currency must not be inferred from the user's location.
4. The system must not silently convert monetary amounts between currencies.

**Rounding, units and currency:**
- Currency: farm-configured.
- Decimal precision: OPEN QUESTION.
- Rounding: OPEN QUESTION.

**Edge cases:**
- Missing currency configuration: default behavior requires confirmation.
- Invalid currency: reject unsupported configuration.
- Currency changed after transactions exist: historical conversion and display behavior require confirmation.
- Negative monetary values: permitted use cases require confirmation.

**Worked example:**
- Farm currency configured as PKR.
- A milk sale is recorded at 500.
- Expected display: 500 in the farm's configured currency.
- No currency conversion is performed.

**Override:**
- Farm Admin may change farm settings.
- Whether existing historical records are affected is unresolved.
- Basic user/action/date-time logging is required; detailed setting-change audit coverage requires confirmation.

## BR-002 — Milk sale price

**Status:** CONFIRMED RULE — calculation details OPEN

**Trigger:** When Farm Admin records a milk sale.

**Inputs:**
- Milk quantity: litres or approved configured quantity unit; must be validated as non-negative.
- Sale price: monetary amount per applicable unit.
- Default sale price: configured farm price, if available.

**Rule:**
1. The system supports a default milk sale price.
2. Farm Admin can record milk sales.
3. Farm Admin may adjust the price for an individual sale.
4. The system must retain the recorded sale price for the transaction.

**OPEN QUESTION:**
- Is the price entered per litre, per container, or another unit?
- Is sale price multiplied directly by quantity?
- Can a sale have multiple products or price tiers?
- Can zero-price sales be recorded?
- Can negative prices ever be valid?

**Rounding, units and currency:**
- Quantity: litres where applicable.
- Currency: farm-configured.
- Rounding: OPEN QUESTION.

**Worked example:**
- Quantity: 10 litres.
- Price: 100 per litre.
- Illustrative expected total if the client confirms quantity × unit price: 1,000.
- This example is not an approved calculation formula.

**Override:**
- Farm Admin may adjust the sale price.
- Supervisor cannot create milk sales under the permission matrix.
- Whether price overrides require a reason and detailed audit record is an OPEN QUESTION.

## BR-003 — Discounts

**Status:** OPEN QUESTION

**Trigger:** When a sale or transaction is recorded.

**Inputs:**
- Discount amount or percentage: not specified.
- Eligible products or transactions: not specified.
- Customer eligibility: not specified.

**Rule:**
The SRS does not define a discount feature or discount calculation.

Do not implement percentage discounts, fixed discounts, promotional pricing, loyalty discounts, or automatic discount rules without client approval.

**Rounding, units and currency:** Not applicable until approved.

**Edge cases requiring confirmation:**
- Zero discount.
- Negative discount.
- Discount greater than sale amount.
- Multiple discounts.
- Discount on cancelled transactions.
- Discount on partial deliveries.
- Refunds after discounts.

**Worked example:** Not available until the client approves a discount rule.

**Override:** No discount override permission is granted because the feature is not defined.

**Audit:** Requires confirmation if approved.

## BR-004 — Order totals and shipping

**Status:** NOT APPLICABLE / OPEN QUESTION

**Trigger:** Conventional e-commerce checkout is not included in the approved project scope.

**Rule:**
1. The platform is not defined as an online shopping or checkout system.
2. Public visitors cannot complete online purchases of the software.
3. Software sales are handled outside the application.
4. Milk sales are farm operational transactions, not public e-commerce checkout orders.
5. No shipping calculation is defined.

**OPEN QUESTION:** Confirm whether any milk delivery, transportation, delivery charges, or shipping records are required in a future scope.

**Worked example:** No shipping total can be calculated from the approved SRS.

**Override:** No shipping override authority is defined.

---

# 4. Animal management and lifecycle rules

## BR-005 — Animal registration and unique identification

**Status:** CONFIRMED RULE

**Trigger:** When an authorized user registers an animal.

**Inputs:**
- Animal information: fields defined by the approved animal profile.
- Workspace: authenticated farm workspace.
- Internal animal identifier: system-generated.
- Ear tag or external identifier: applicable animal identification data.

**Rule:**
1. An animal is registered under one farm workspace.
2. The system generates a unique internal animal ID.
3. Animal records must remain associated with their owning workspace.
4. Animal history must remain associated with the correct animal.
5. The system must validate ownership of referenced animal records.

**OPEN QUESTION:**
- Is internal ID uniqueness global or workspace-specific?
- What happens when two animals have the same ear tag?
- Can ear tags be changed?
- Can an animal be transferred between workspaces?

**Rounding and units:** Not applicable to ID generation.

**Edge cases:**
- Duplicate identifiers.
- Missing required fields.
- Invalid parent animal references.
- Re-registration of an existing animal.
- Cross-workspace record references.

**Worked example:**
- Farm A registers an animal.
- System generates internal ID `A-0001`.
- Expected result: the animal is stored in Farm A's workspace.
- A user from Farm B cannot retrieve it using the ID.

**Override:**
- Farm Admin: authorized animal registration.
- Supervisor: only confirmed permitted animal-entry operations.
- System: generates the internal identifier.
- ID replacement and manual override rules require confirmation.

**Audit:** Basic activity logging applies; identifier-specific audit coverage requires confirmation.

## BR-006 — Animal lifecycle status

**Status:** CONFIRMED STATUS VALUES; TRANSITIONS OPEN

**Trigger:** When an animal's lifecycle changes.

**Inputs:**
- Animal record.
- Current status.
- Proposed status.

**Confirmed statuses:**
- Active.
- Sold.
- Deceased.
- Removed.

**Rule:**
1. The system must support the four defined lifecycle statuses.
2. Animal lifecycle history must be maintained.
3. Animal records must remain linked to their workspace.
4. The SRS does not define permitted transitions between statuses.

**OPEN QUESTION:**
- Can Sold transition back to Active?
- Can Deceased or Removed ever be reversed?
- Can an Active animal become Deceased directly?
- What validations apply when an animal is sold?
- Does changing lifecycle status automatically archive the animal?
- What happens to future feeding and health schedules?

**Rounding and units:** Not applicable.

**Edge cases:**
- Repeated status changes.
- Duplicate sale records.
- Missing sale date.
- Invalid transition.
- Historical correction.
- Animal already marked Deceased or Removed.

**Worked example:**
- Current status: Active.
- Proposed status: Sold.
- Expected result: the system supports both statuses, but transition validation must follow a client-approved transition table.
- Until that table is approved, no irreversible transition is assumed.

**Override:**
- Farm Admin: animal lifecycle administration.
- Supervisor: no archive permission; other transition permissions require confirmation.
- Whether status overrides are logged beyond basic activity logs requires confirmation.

## BR-007 — Animal archiving

**Status:** CONFIRMED ROLE PERMISSION; ARCHIVE BEHAVIOR OPEN

**Trigger:** When Farm Admin archives an animal.

**Inputs:**
- Animal record.
- Workspace ownership.
- Current animal status.

**Rule:**
1. Farm Admin may archive animals where supported.
2. Supervisor cannot archive animals.
3. Archive is not automatically equivalent to Sold, Deceased, or Removed.
4. Archive behavior must not be inferred from lifecycle status.

**OPEN QUESTION:**
- Does archive hide the animal from active lists?
- Can an archived animal be restored?
- Are historical reports affected?
- Can an animal be archived while still Active?
- What happens to child records and scheduled reminders?

**Worked example:**
- Farm Admin archives an eligible animal.
- Expected result: archive operation is permitted for Farm Admin.
- The precise visibility and restoration behavior requires approval.

**Override:**
- Farm Admin only.
- Supervisor: NO.
- Audit coverage requires confirmation.

## BR-008 — Animal weight history

**Status:** CONFIRMED RECORDING; CALCULATION OPEN

**Trigger:** When an authorized user adds a weight record.

**Inputs:**
- Animal ID.
- Weight value.
- Weight unit.
- Measurement date/time.

**Rule:**
1. Weight records are associated with an animal.
2. Historical weight information must be retained.
3. The SRS does not define weight-based calculations or automatic growth predictions.

**OPEN QUESTION:**
- Supported weight units.
- Allowed minimum and maximum weight.
- Whether weight averages or growth rates are calculated.
- Whether historical entries can be corrected.

**Worked example:**
- Animal weight record: 250 kg.
- Expected result: a weight history entry is associated with the correct animal.
- No growth-rate calculation is implied.

**Override:** Farm Admin, subject to approved animal-record permissions. Supervisor rights require confirmation.

---

# 5. Animal health and veterinary rules

## BR-009 — Health severity classification

**Status:** CONFIRMED RULE

**Trigger:** When an animal health record is created.

**Inputs:**
- Animal ID.
- Health record.
- Severity.

**Allowed severity values:**
- Low.
- Moderate.
- High.
- Critical.

**Rule:**
1. Every applicable health record uses one of the defined severity values.
2. High and Critical health notifications are delivered to Farm Admin users only.
3. Supervisors must not receive High/Critical health alerts.
4. Notification access restrictions apply to APIs, email recipients, dashboards, and exports.

**Rounding and units:** Not applicable.

**Edge cases:**
- Missing severity.
- Unsupported severity.
- Duplicate notifications.
- Changed severity.
- Health record linked to another workspace's animal.

**Worked example:**
- Animal health record severity: Critical.
- Expected result: authorized Farm Admin users receive the configured alert.
- Supervisor does not receive the alert.

**Override:**
- Farm Admin: health record administration.
- Supervisor: permitted health-entry scope remains subject to confirmation.
- System: generates authorized notifications.
- Severity override permissions require confirmation.

**Audit:** Notification and health-record audit coverage requires confirmation beyond the basic activity log.

## BR-010 — Vaccination due-date reminders

**Status:** CONFIRMED REMINDER FEATURE; SCHEDULING DETAILS OPEN

**Trigger:** When a vaccination reminder becomes due according to configured scheduling.

**Inputs:**
- Animal.
- Vaccination record.
- Due date.
- Farm timezone.
- Notification configuration.

**Rule:**
1. Vaccination due dates must be stored.
2. The system supports vaccination reminders.
3. Scheduled jobs must respect farm timezone where applicable.
4. The SRS does not specify how many days before a due date a reminder is sent.

**OPEN QUESTION:**
- Reminder lead time.
- Reminder repetition.
- Overdue reminder frequency.
- Duplicate suppression.
- Reminder acknowledgement.
- Rescheduling after vaccination.

**Rounding and units:** Calendar date/time rules require confirmation.

**Worked example:**
- Vaccination due date: 1 December 2026.
- Expected result: a vaccination reminder is generated according to the approved reminder schedule.
- Exact notification date/time cannot be calculated until the lead time is approved.

**Override:** Farm Admin manages available notification settings. Supervisor cannot receive High/Critical health alerts.

**Audit:** Notification configuration and delivery logging details require confirmation.

## BR-011 — High/Critical health notification routing

**Status:** CONFIRMED RULE

**Trigger:** When a health record is classified High or Critical and the configured alert process runs.

**Inputs:**
- Health severity.
- Workspace.
- Farm Admin recipient list.
- Notification configuration.

**Rule:**
1. Check health severity.
2. If severity is High or Critical, identify authorized Farm Admin recipients.
3. Generate the configured notification.
4. Do not send the restricted health alert to Supervisors.
5. Do not expose restricted notification content through unauthorized APIs or exports.

**Worked example:**
- Severity: High.
- Farm Admin recipients: 2.
- Supervisors: 3.
- Expected result: the alert is routed to the two authorized Farm Admin recipients, not the three Supervisors.

**Override:** Recipient routing is controlled by authorization policy. Users cannot override the Supervisor exclusion.

**Audit:** Delivery and recipient-selection audit coverage requires confirmation.

---

# 6. Milk production rules

## BR-012 — Morning and evening milk production records

**Status:** CONFIRMED RULE

**Trigger:** When a milk production session is recorded.

**Inputs:**
- Animal ID.
- Production session: Morning or Evening.
- Milk quantity in litres.
- Date.
- Workspace.

**Rule:**
1. The system supports morning production records.
2. The system supports evening production records.
3. Production records must be associated with the correct animal and workspace.
4. Animal daily totals and farm totals are supported.
5. Flexible milk quantity precision is supported.

**OPEN QUESTION:**
- Maximum quantity per session.
- Whether zero is a valid record.
- Whether negative values are rejected.
- Whether duplicate sessions are allowed.
- Whether entries can be edited after submission.

**Rounding and units:**
- Unit: litres.
- Precision: flexible.
- Rounding: not specified.

**Edge cases:**
- Missing morning session.
- Missing evening session.
- Duplicate session.
- Late entry.
- Negative quantity.
- Zero quantity.

**Worked example:**
- Morning production: 8 litres.
- Evening production: 7 litres.
- If both sessions are valid, the expected daily sum is 15 litres.
- The daily-total calculation is a mathematical implication of the stated total feature; missing-session treatment remains unresolved.

**Override:**
- Farm Admin: production administration.
- Supervisor: permitted production entry.
- Editing/correction rights are unresolved.
- System: calculates derived totals.

**Audit:** Basic activity logging applies; historical correction logging requires confirmation.

## BR-013 — Animal daily milk total

**Status:** PARTIALLY CONFIRMED; MISSING-SESSION RULE OPEN

**Trigger:** When morning/evening production records are available or recalculated.

**Inputs:**
- Morning quantity in litres.
- Evening quantity in litres.

**Proposed calculation requiring confirmation:**

Daily animal production = Morning production + Evening production.

**Worked example:**
- Morning: 8 litres.
- Evening: 7 litres.
- Expected mathematical sum: 15 litres.

**OPEN QUESTION:**
- Does a missing session count as zero?
- Is a missing session treated as unknown?
- Can a daily total be displayed as incomplete?
- How are duplicate or corrected sessions handled?

**Rounding and units:**
- Litres.
- Flexible precision.
- Rounding policy unresolved.

**Override:** Farm Admin may manage permitted source records; System recalculates derived totals. No manual override is confirmed.

**Audit:** Source correction and recalculation logging require confirmation.

## BR-014 — Farm milk production total

**Status:** CONFIRMED TOTAL FEATURE; EXACT AGGREGATION DETAILS OPEN

**Trigger:** When farm production totals are calculated or reports are generated.

**Inputs:**
- Eligible animal production records.
- Workspace.
- Date/period.

**Rule:**
1. Farm-level milk production totals must be available.
2. Only records belonging to the same workspace may contribute.
3. The exact treatment of incomplete records requires approval.

**OPEN QUESTION:**
- Are totals calculated from animal daily totals or raw sessions?
- Are inactive, sold, deceased, or removed animals included for historical dates?
- How are missing sessions treated?
- How are corrected historical records reflected?

**Worked example:**
- Animal A: 15 litres.
- Animal B: 12 litres.
- Expected total if both records are eligible: 27 litres.

**Override:** System calculates totals. Farm Admin may correct permitted source records. Supervisor cannot manually override derived totals.

## BR-015 — Milk production drop detection

**Status:** CONFIRMED THRESHOLD; FORMULA OPEN

**Trigger:** When the scheduled production-drop detector evaluates farm production.

**Inputs:**
- Current production.
- Previous three-day production data.
- Threshold: 15%.
- Farm timezone.
- Applicable production dates.

**Confirmed rule:**
1. The system compares production against a rolling three-day average.
2. A drop of 15% or greater is the stated alert threshold.
3. The system generates a production-drop alert when the approved comparison condition is met.

**OPEN QUESTION:**
- Does the three-day average include calendar days or production days?
- Is the average based on daily totals or sessions?
- How are missing days handled?
- Is the comparison:
  - Current production against the average of the previous three days?
  - Current production against a rolling average including the current day?
- What is the exact percentage-drop formula?
- How are zero averages handled?
- How frequently does the detector run?
- How are duplicate alerts suppressed?
- Who may acknowledge or dismiss alerts?

**Worked example — illustrative only:**
- Three-day average: 100 litres.
- Current production: 85 litres.
- Difference: 15 litres.
- Difference relative to 100 litres: 15%.
- This meets the stated threshold if the client confirms this comparison formula.
- The formula is not approved until the OPEN QUESTION is resolved.

**Rounding and units:**
- Production: litres.
- Threshold: 15%.
- Percentage precision and rounding: OPEN QUESTION.

**Override:**
- System evaluates the rule.
- Farm Admin receives configured alerts.
- No manual override or alert suppression permission is confirmed.

**Audit:** Automated job execution and failures should be attributable to the service identity; detailed alert override logging requires confirmation.

---

# 7. Milk stock, sales, collection and wastage

## BR-016 — Milk stock movement

**Status:** CONFIRMED STOCK FEATURES; MOVEMENT FORMULA OPEN

**Trigger:** When milk collection, sale, usage, or wastage is recorded.

**Inputs:**
- Milk quantity.
- Operation type.
- Workspace.
- Available stock.
- Storage/tank allocation, if applicable.

**Rule:**
1. The system supports milk collection and storage records.
2. The system supports milk stock tracking.
3. Sales and wastage are defined as operations that automatically deduct milk stock.
4. Only approved operation types may trigger automatic stock movement.
5. System stock movement must be scoped to the relevant workspace.

**OPEN QUESTION:**
- Is stock increased immediately on collection?
- Can stock be transferred between tanks?
- Can sales exceed available stock?
- Can stock become negative?
- How are internal consumption and returns handled?
- What is the reversal procedure for cancelled sales?
- How is stock reconciled?

**Worked example — confirmed deduction behavior, subject to stock availability:**
- Available milk: 100 litres.
- Recorded sale: 20 litres.
- Expected result: 20 litres deducted from stock.
- Expected remaining stock: 80 litres, provided the transaction is accepted and no other movement occurs.

**Rounding and units:** Litres; precision and rounding follow approved farm configuration.

**Override:**
- Farm Admin: authorized milk operations.
- Supervisor: no milk sale or stock-operation permission unless specifically approved.
- System: performs approved automatic deductions.
- No unrestricted service override is allowed.

**Audit:** Stock movement and correction event coverage requires confirmation.

## BR-017 — Milk sale stock deduction

**Status:** CONFIRMED RULE

**Trigger:** When an authorized Farm Admin records a milk sale.

**Inputs:**
- Available stock in litres.
- Sale quantity in litres.
- Sale transaction.
- Workspace.

**Rule:**
1. Validate the sale belongs to the correct workspace.
2. Validate the sale operation.
3. Deduct the recorded sale quantity from milk stock automatically.
4. Preserve the sale record and resulting stock movement.

**Worked example:**
- Available stock: 100 litres.
- Sale: 25 litres.
- Expected deduction: 25 litres.
- Expected remaining stock: 75 litres.

**OPEN QUESTION:**
- Whether a sale can exceed available stock.
- Whether a partial sale is permitted.
- Whether sale cancellation restores stock.
- Whether returned milk is restocked.
- Whether negative stock is possible.

**Override:**
- Farm Admin may record sales.
- Supervisor cannot record milk sales.
- System applies the configured deduction.
- Reversal authority is not defined.

**Audit:** Basic activity logging applies; stock before/after values and reversal details are not confirmed.

## BR-018 — Milk wastage deduction

**Status:** CONFIRMED RULE; FINANCIAL LOSS FORMULA OPEN

**Trigger:** When Farm Admin records milk wastage.

**Inputs:**
- Available stock in litres.
- Wastage quantity in litres.
- Applicable milk price, if used in loss estimation.

**Rule:**
1. Farm Admin records wastage.
2. The system automatically deducts wastage from milk stock.
3. The system supports estimated financial loss reporting.
4. The financial loss formula is not defined.

**Worked example:**
- Available stock: 100 litres.
- Wastage: 5 litres.
- Expected remaining stock after accepted deduction: 95 litres.

**OPEN QUESTION:**
- What happens when wastage exceeds available stock?
- Is wastage valued at default sale price or actual sale price?
- Is the estimate based on production cost or selling price?
- How are partial wastage and duplicate records handled?

**Rounding and currency:** Farm-configured currency; rounding unresolved.

**Override:**
- Farm Admin records wastage.
- System deducts stock.
- Supervisor has no milk stock-operation permission unless approved.
- Detailed audit logging requires confirmation.

## BR-019 — Estimated financial loss from milk wastage

**Status:** OPEN QUESTION

**Trigger:** When a wastage record is included in financial analytics.

**Inputs:**
- Wastage quantity.
- Price or valuation basis.
- Currency.
- Applicable date.

**Rule:**
The SRS requires an estimated financial loss but does not define its formula.

Potential valuation bases must not be selected without client approval.

**OPEN QUESTION:**
- Sale price basis?
- Production cost basis?
- Default price basis?
- Weighted average cost?
- How are price changes handled?
- Are estimates included in net profit/loss?

**Worked example:** Cannot be approved until valuation basis and formula are confirmed.

**Override:** Farm Admin may manage permitted source records; no loss-calculation override is confirmed.

---

# 8. Inventory rules

## BR-020 — Inventory item creation

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin creates an inventory item.

**Inputs:**
- Item name.
- Category.
- Current stock.
- Minimum stock.
- Unit.
- Expiry date, if applicable.

**Rule:**
1. Farm Admin can create inventory items and categories.
2. Inventory items have current stock and minimum stock.
3. Expiry dates can be recorded.
4. Inventory data is workspace-scoped.

**OPEN QUESTION:**
- Allowed units and conversion.
- Whether current stock can be zero.
- Whether negative opening stock is allowed.
- Duplicate item handling.
- Required fields and validation ranges.

**Worked example:**
- Item: Feed A.
- Current stock: 100 kg.
- Minimum stock: 20 kg.
- Expected result: item is stored with the supplied quantities and unit.

**Override:** Farm Admin only for inventory master creation.

## BR-021 — Inventory purchase and stock addition

**Status:** CONFIRMED FEATURE; STOCK CALCULATION OPEN

**Trigger:** When Farm Admin records an inventory purchase or quick stock addition.

**Inputs:**
- Inventory item.
- Purchase/addition quantity.
- Unit.
- Purchase details, if supported.
- Workspace.

**Rule:**
1. Farm Admin may record inventory purchases.
2. Farm Admin may perform quick additions.
3. These are supported inventory stock-in operations.
4. Exact purchase-to-stock calculation and partial-delivery handling are not defined.

**OPEN QUESTION:**
- Is stock increased immediately on purchase creation?
- Are received quantities recorded separately from ordered quantities?
- How are partial deliveries handled?
- Can purchases be cancelled?
- How are purchase returns/refunds handled?
- Are duplicate purchase records detected?

**Worked example — illustrative:**
- Existing stock: 100 kg.
- Recorded addition: 25 kg.
- Expected result if additions increase stock immediately: 125 kg.
- The stock timing rule requires client confirmation.

**Override:** Farm Admin only.

**Audit:** Stock adjustments require a reason and history. Detailed before/after audit fields remain unresolved.

## BR-022 — Inventory stock correction

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin corrects inventory stock.

**Inputs:**
- Inventory item.
- Corrected stock quantity.
- Adjustment reason.
- Workspace.

**Rule:**
1. Only Farm Admin may correct inventory stock.
2. Every stock correction requires a reason.
3. Stock adjustment history must be maintained.
4. Supervisors cannot perform stock corrections.
5. Supervisor usage entries must not be treated as stock corrections.

**OPEN QUESTION:**
- Can corrected stock be negative?
- Are adjustments absolute quantities or signed differences?
- Is a second-person approval required? No such workflow is currently defined.

**Worked example:**
- Recorded stock: 50 kg.
- Corrected stock: 45 kg.
- Reason: physical stock count correction.
- Expected result: stock reflects the approved corrected value and adjustment history contains the reason.

**Override:** Farm Admin only.

**Audit:** Adjustment history and basic activity logging are required. Whether old/new values are retained in the audit log requires confirmation.

## BR-023 — Inventory low-stock alert

**Status:** CONFIRMED RULE

**Trigger:** When current stock is evaluated against minimum stock.

**Inputs:**
- Current stock.
- Minimum stock.
- Inventory item.
- Workspace.

**Rule:**
1. Compare current stock with minimum stock.
2. If current stock is less than or equal to minimum stock, trigger a low-stock warning.
3. Generate notifications only for authorized recipients.

**Worked example:**
- Current stock: 10 kg.
- Minimum stock: 10 kg.
- Expected result: low-stock warning is triggered.
- Current stock: 11 kg.
- Minimum stock: 10 kg.
- Expected result: this rule does not trigger a low-stock warning.

**Rounding and units:** Both quantities must use compatible units. Automatic unit conversion is not supported by the SRS.

**Edge cases:**
- Missing minimum stock.
- Negative stock.
- Zero minimum stock.
- Unit mismatch.
- Duplicate alerts.
- Restocking after an alert.

**Override:** Farm Admin manages inventory configuration. System evaluates the threshold.

**Audit:** Notification generation and configuration changes require confirmation of detailed coverage.

## BR-024 — Inventory expiry reminders

**Status:** CONFIRMED FEATURE; REMINDER RULE OPEN

**Trigger:** When an inventory item approaches or reaches its expiry date according to an approved schedule.

**Inputs:**
- Expiry date.
- Farm timezone.
- Reminder configuration.
- Inventory item.

**Rule:**
1. Expiry dates may be recorded.
2. The system supports expiry reminders.
3. The exact reminder lead time and repeated-notification behavior are unresolved.

**Worked example:**
- Expiry date: 30 November 2026.
- Expected result: reminder generated according to the client-approved schedule.
- Exact reminder date cannot be calculated from the SRS.

**OPEN QUESTION:**
- How many days before expiry?
- Are already-expired items excluded from use?
- Does expiry automatically deduct stock?
- Can expired stock be manually retained?
- Are damaged and expired items handled identically?

**Override:** Farm Admin controls permitted inventory records. System generates reminders.

---

# 9. Feeding rules and recommendations

## BR-025 — Feeding plan assignment

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin creates or updates a feeding plan.

**Inputs:**
- Animal or animal group.
- Feed item.
- Feed quantity.
- Unit.
- Feeding time.
- Effective date.
- Schedule type.

**Supported schedule types:**
- Morning.
- Evening.
- Custom.

**Rule:**
1. Farm Admin can create feeding plans.
2. Plans may be assigned to individual animals or groups.
3. Plans may include feed items, quantities, units, times, and effective dates.
4. Actual feeding records are separate from the planned schedule.

**OPEN QUESTION:**
- Can multiple plans overlap?
- What happens when an animal changes groups?
- How are missed feeding sessions handled?
- Are plan changes retroactive?

**Worked example:**
- Animal: A-001.
- Feed item: Feed A.
- Quantity: 2 kg.
- Schedule: Morning.
- Effective date: 23 November 2026.
- Expected result: a morning feeding plan is associated with the animal from the specified effective date.

**Override:** Farm Admin manages plans. Supervisor may record actual feeding only within the permitted workflow.

## BR-026 — Nutritional recommendations

**Status:** CONFIRMED SUGGESTION FEATURE; FORMULA OPEN

**Trigger:** When the feeding suggestion process evaluates animal information.

**Inputs:**
- Animal age.
- Animal breed.
- Other parameters: not confirmed.

**Rule:**
1. The system supports nutritional suggestions based on animal age and breed.
2. Suggestions must be distinguished from approved feeding plans.
3. The SRS does not define a nutritional formula.
4. The system must not present unapproved suggestions as veterinary prescriptions.

**OPEN QUESTION:**
- Which age ranges are used?
- Which breed data is supported?
- Which nutritional parameters are considered?
- What feed recommendations are available?
- Are weight, milk production, pregnancy, or health conditions included?
- Who approves the recommendation?
- Are suggestions saved or calculated dynamically?

**Worked example:**
- Animal age: 3 years.
- Breed: Client-configured breed value.
- Expected result: recommendation behavior is unavailable for acceptance testing until the recommendation rules and reference data are approved.

**Override:** Farm Admin retains control of feeding plans. No automatic plan override is authorized.

**Audit:** Recommendation acceptance/rejection tracking requires confirmation.

## BR-027 — Actual feeding records

**Status:** CONFIRMED RULE; INVENTORY DEDUCTION OPEN

**Trigger:** When Supervisor records actual feeding.

**Inputs:**
- Animal/group.
- Feed item.
- Quantity.
- Unit.
- Date/time.

**Rule:**
1. Supervisor may enter actual feeding records.
2. Actual records must be associated with the correct workspace and assigned animal/group.
3. Actual feeding does not automatically imply inventory deduction.
4. Feeding-to-inventory linkage requires explicit approval.

**Worked example:**
- Planned feed: 2 kg.
- Actual feeding recorded: 1.5 kg.
- Expected result: actual feeding record stores 1.5 kg.
- Inventory deduction is not assumed.

**Override:** Supervisor may enter actual feeding. Editing/correction rights are unresolved. Farm Admin manages feeding plans.

**Audit:** Basic activity logging applies; correction tracking requires confirmation.

---

# 10. Worker and attendance rules

## BR-028 — Worker record creation and duplicate CNIC prevention

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin registers a worker.

**Inputs:**
- Worker profile fields.
- CNIC.
- Workspace.

**Rule:**
1. Worker records are managed by Farm Admin.
2. Workers do not receive application login accounts.
3. Duplicate CNIC values must be prevented within the same farm.
4. Worker documents may be stored.
5. Worker records are workspace-scoped.

**OPEN QUESTION:**
- CNIC format and validation.
- Whether CNIC uniqueness is case/format normalized.
- Whether the same CNIC may exist in another workspace.
- Worker archive/deactivation behavior.
- Document retention and deletion.

**Worked example:**
- Farm A already has worker CNIC `12345-1234567-1`.
- A second worker is registered in Farm A with the same CNIC.
- Expected result: duplicate registration is rejected.
- The same CNIC in another workspace is not automatically rejected by the confirmed farm-level uniqueness rule.

**Override:** Farm Admin only for worker creation. No worker self-service permission exists.

**Audit:** Basic activity logging applies; sensitive CNIC access logging requires confirmation.

## BR-029 — Attendance entry

**Status:** CONFIRMED RULE; CALCULATION OPEN

**Trigger:** When attendance is recorded.

**Inputs:**
- Worker ID.
- Date.
- Check-in time.
- Check-out time.
- Attendance status.

**Supported statuses:**
- Present.
- Absent.
- Late.
- Leave.

**Rule:**
1. Attendance records are maintained by date.
2. Check-in/check-out information may be recorded.
3. Supervisor may enter permitted attendance records.
4. Farm Admin may correct attendance.
5. Workers cannot access the application.

**OPEN QUESTION:**
- Can a worker have multiple entries per day?
- How is late status calculated?
- What happens when check-out is missing?
- Can attendance be recorded retrospectively?
- How are overnight shifts handled?

**Worked example:**
- Worker: W-001.
- Date: 23 November 2026.
- Check-in: 08:00.
- Check-out: 17:00.
- Status: Present.
- Expected result: attendance record is stored.
- No paid-hours or overtime formula is inferred.

**Override:** Supervisor may enter attendance. Farm Admin may correct attendance.

**Audit:** Basic activity logging applies; before/after correction tracking requires confirmation.

## BR-030 — Leave approval and rejection

**Status:** CONFIRMED RULE

**Trigger:** When a leave request is submitted and reviewed.

**Inputs:**
- Worker.
- Leave date or period.
- Leave classification.
- Decision.

**Rule:**
1. Leave may be recorded.
2. Farm Admin may approve or reject leave.
3. Supervisor cannot approve or reject leave.
4. The decision must be associated with the appropriate leave record.

**OPEN QUESTION:**
- What happens to rejected leave in attendance?
- Can approved leave be changed?
- Can a rejected leave request be resubmitted?
- Are leave dates inclusive?
- How are overlapping requests handled?

**Worked example:**
- Worker requests leave for 24 November 2026.
- Farm Admin approves the request.
- Expected result: leave decision is Approved.
- Supervisor attempting the same approval must be denied.

**Override:** Farm Admin only.

**Audit:** Basic activity logging is required. Leave decision actor and action should be recorded; additional fields require confirmation.

## BR-031 — Paid and unpaid leave classification

**Status:** CONFIRMED CLASSIFICATION; PAYROLL EFFECT OPEN

**Trigger:** When leave is classified or used in payroll.

**Inputs:**
- Leave status.
- Paid/unpaid classification.
- Payroll period.

**Rule:**
1. The system supports paid and unpaid leave classification.
2. The payroll effect of each classification is not defined.
3. No automatic deduction or salary adjustment is authorized until formulas are approved.

**Worked example:**
- Leave: 1 day.
- Classification: Unpaid.
- Expected result: the leave is stored as unpaid.
- The salary deduction amount remains undefined.

**Override:** Farm Admin manages permitted leave/payroll records. Supervisor cannot approve leave.

---

# 11. Payroll rules

## BR-032 — Payroll period

**Status:** CONFIRMED FEATURE; PERIOD RULE OPEN

**Trigger:** When Farm Admin creates payroll for a worker.

**Inputs:**
- Worker.
- Payroll frequency.
- Period start and end.
- Salary type.

**Supported frequencies:**
- Daily.
- Weekly.
- Biweekly.
- Monthly.

**Supported salary types:**
- Monthly salary.
- Daily wage.

**Rule:**
1. Payroll supports monthly salary and daily wage.
2. Payroll records may be generated at supported frequencies.
3. The exact calculation period and period boundaries require confirmation.

**OPEN QUESTION:**
- Calendar month versus custom payroll month.
- Weekly start day.
- Biweekly anchor date.
- Partial first/last periods.
- Payroll cut-off times.

**Worked example:**
- Payroll frequency: Monthly.
- Period: November 2026.
- Expected result: a monthly payroll period is available.
- Exact payable days and salary are not calculated until the period formula is approved.

**Override:** Farm Admin only.

## BR-033 — Monthly salary calculation

**Status:** OPEN QUESTION

**Trigger:** When monthly salary is calculated.

**Inputs:**
- Monthly salary.
- Attendance.
- Paid leave.
- Unpaid leave.
- Absence days.
- Working days/calendar days.
- Payroll period.

**Rule:**
The SRS does not define a monthly salary formula.

Possible approaches such as calendar-day proration, working-day proration, and fixed monthly salary treatment must not be selected without approval.

**OPEN QUESTION:**
- Salary divisor.
- Partial-month treatment.
- Absence deduction formula.
- Paid leave treatment.
- Holiday/rest-day treatment.
- Partial-day absence treatment.

**Worked example:**
- Monthly salary: 30,000.
- Absence: 2 days.
- Expected result: cannot be calculated until the client approves the divisor and deduction policy.

**Override:** Farm Admin may manage payroll adjustments. No formula override is defined.

**Audit:** Payroll adjustment activity must be attributable to the actor; detailed before/after values are not confirmed.

## BR-034 — Daily wage calculation

**Status:** OPEN QUESTION

**Trigger:** When daily-wage payroll is calculated.

**Inputs:**
- Daily wage.
- Eligible payable days.
- Attendance.
- Paid/unpaid leave.
- Payroll period.

**Rule:**
The SRS does not define which attendance statuses count as payable days or the exact daily-wage calculation.

**OPEN QUESTION:**
- Are payable days based on Present status only?
- Does Late count as a full day?
- Are approved paid leave days payable?
- Are holidays/rest days payable?
- How are partial days treated?

**Worked example:**
- Daily wage: 1,000.
- Present days: 20.
- Expected result: cannot be finalized until payable-day rules are approved.

**Override:** Farm Admin manages payroll records and adjustments.

## BR-035 — Absence deductions

**Status:** CONFIRMED CONFIGURATION FEATURE; FORMULA OPEN

**Trigger:** When payroll is calculated using attendance.

**Inputs:**
- Absence days.
- Configured deduction rule.
- Salary basis.
- Payroll period.

**Rule:**
1. Absence-based automatic calculations are supported.
2. Absence deduction rules are configurable.
3. The SRS does not specify the deduction formula.
4. No default deduction percentage or divisor may be assumed.

**OPEN QUESTION:**
- Fixed amount or proportional deduction?
- Monthly salary divisor?
- Partial-day absence treatment?
- Multiple absence deductions?
- Rounding?

**Worked example:**
- Absence days: 2.
- Salary: 30,000.
- Expected deduction: unresolved until configuration formula is approved.

**Override:** Farm Admin may make permitted manual adjustments.

## BR-036 — Advance recovery

**Status:** CONFIRMED FEATURE; FORMULA OPEN

**Trigger:** When an advance is recovered through payroll.

**Inputs:**
- Advance amount.
- Previous recovery.
- Remaining balance.
- Current recovery amount.
- Payroll period.

**Rule:**
1. Payroll supports advances.
2. Advance recovery is supported.
3. The exact recovery schedule and calculation are not defined.

**OPEN QUESTION:**
- Fixed installment or percentage?
- Can recovery exceed the remaining balance?
- Can multiple advances be recovered simultaneously?
- Can recovery be paused?
- What happens after worker termination?

**Worked example:**
- Advance: 10,000.
- Proposed recovery: 2,000.
- Expected remaining balance if the recovery is accepted: 8,000.
- This is arithmetic only; the recovery schedule requires approval.

**Override:** Farm Admin manages advances and payroll adjustments.

**Audit:** Advance creation and recovery logging requires detailed coverage confirmation.

## BR-037 — Payroll adjustments and deductions

**Status:** CONFIRMED FEATURE; RULES OPEN

**Trigger:** When Farm Admin adds a manual payroll adjustment or deduction.

**Inputs:**
- Worker.
- Payroll period.
- Adjustment amount.
- Adjustment type.
- Reason, if configured.

**Rule:**
1. Farm Admin may make manual payroll adjustments.
2. Payroll supports deductions.
3. The system must not invent deduction categories or formulas.

**OPEN QUESTION:**
- Permitted adjustment types.
- Negative adjustment behavior.
- Maximum deduction.
- Reason requirement.
- Adjustment after payslip generation.
- Approval or reopening workflow.

**Worked example:**
- Manual adjustment: 500.
- Expected result: the adjustment record is stored.
- Whether it increases or decreases net pay depends on the approved adjustment type.

**Override:** Farm Admin only.

## BR-038 — Salary payment recording

**Status:** CONFIRMED FEATURE; BALANCE FORMULA OPEN

**Trigger:** When Farm Admin records a salary payment.

**Inputs:**
- Worker.
- Payroll period.
- Payment amount.
- Payment date.
- Payment method.

**Supported methods:**
- Cash.
- Bank transfer.
- Mobile wallet.
- Custom.

**Rule:**
1. Salary payment records are supported.
2. The system supports pending balances.
3. Multiple payment handling and balance calculations require confirmation.

**OPEN QUESTION:**
- Can salary be paid in installments?
- Can payment exceed the outstanding balance?
- How are reversed payments handled?
- What is the balance calculation formula?
- Can a payment be edited or deleted?

**Worked example:**
- Payroll amount: 20,000.
- Recorded payment: 10,000.
- Illustrative outstanding amount: 10,000 if balance equals payroll amount minus accepted payments.
- This balance formula requires confirmation.

**Override:** Farm Admin only.

**Audit:** Payment recording must be attributable to the actor; detailed payment correction tracking requires confirmation.

## BR-039 — Payslip generation

**Status:** CONFIRMED FEATURE; FINALIZATION RULE OPEN

**Trigger:** When Farm Admin generates a payslip.

**Inputs:**
- Worker.
- Payroll period.
- Salary components.
- Deductions.
- Advances.
- Payments.
- Balance.

**Rule:**
1. The system supports PDF/printable payslips.
2. Payslips must reflect approved payroll calculations.
3. Payroll finalization, correction, and reissue rules are not defined.

**OPEN QUESTION:**
- Can a payslip be regenerated?
- Does generation lock payroll?
- Can finalized payroll be reopened?
- Can historical payslips be changed?
- Can payslips be emailed?
- Can workers access payslips? No worker login is included in the SRS.

**Worked example:**
- Worker: W-001.
- Payroll period: November 2026.
- Expected result: a printable/PDF payslip can be generated from approved payroll records.
- Amounts cannot be verified until payroll formulas are approved.

**Override:** Farm Admin only. No worker self-service.

---

# 12. Financial management rules

## BR-040 — Income recording

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin records farm income.

**Inputs:**
- Income amount.
- Income category/source.
- Transaction date.
- Workspace.
- Currency.

**Supported income sources:**
- Milk.
- Animal.
- Manure.
- Breeding services.
- Miscellaneous.

**Rule:**
1. Farm Admin may record income.
2. Income must be categorized.
3. Income belongs to the farm workspace.
4. Farm currency must be used.
5. Transaction correction/deletion behavior is unresolved.

**Worked example:**
- Source: Milk.
- Amount: 5,000.
- Currency: configured farm currency.
- Expected result: an income record is created in the Milk category.

**Override:** Farm Admin only.

## BR-041 — Expense recording

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin records a farm expense.

**Inputs:**
- Expense amount.
- Expense category.
- Transaction date.
- Workspace.
- Currency.

**Rule:**
1. Farm Admin may record expenses.
2. Expenses are included in financial reporting.
3. Expense category management is supported.
4. Exact integration with purchases, veterinary costs, and inventory costs is unresolved.

**Worked example:**
- Expense category: Veterinary.
- Amount: 2,000.
- Expected result: an expense record is stored in the farm's configured currency.

**Override:** Farm Admin only.

## BR-042 — Total income

**Status:** CONFIRMED REPORTING REQUIREMENT; AGGREGATION BASIS OPEN

**Trigger:** When financial summaries are generated.

**Inputs:**
- Eligible income records.
- Reporting period.
- Workspace.
- Currency.

**Rule:**
The system must display total income for supported reporting periods.

**OPEN QUESTION:**
- Are unpaid milk sales included?
- Are animal sales included only when payment is received?
- Are opening balances included?
- Are refunds or reversals deducted?
- Are duplicate transactions excluded?

**Worked example:**
- Income A: 5,000.
- Income B: 3,000.
- Expected arithmetic total: 8,000 if both are eligible income records.

**Override:** System calculates derived totals. Farm Admin manages permitted source records.

## BR-043 — Total expenses

**Status:** CONFIRMED REPORTING REQUIREMENT; AGGREGATION BASIS OPEN

**Trigger:** When financial summaries are generated.

**Inputs:**
- Eligible expense records.
- Reporting period.
- Workspace.
- Currency.

**Rule:**
The system must display total expenses for supported reporting periods.

**OPEN QUESTION:**
- Are inventory purchases included automatically?
- Are veterinary costs integrated?
- Are payroll costs automatically included?
- Are unpaid expenses included?
- Are reversals supported?

**Worked example:**
- Expense A: 2,000.
- Expense B: 1,500.
- Expected arithmetic total: 3,500 if both are eligible expense records.

**Override:** System calculates totals; Farm Admin manages permitted source records.

## BR-044 — Net profit or loss

**Status:** CONFIRMED REPORTING REQUIREMENT; FORMULA BASIS OPEN

**Trigger:** When financial summaries are generated.

**Inputs:**
- Total income.
- Total expenses.
- Reporting period.
- Currency.

**Rule:**
The system must report net profit/loss.

The likely arithmetic relationship is income minus expenses, but the treatment of unpaid transactions, opening balances, and integrated costs must be approved before this is treated as the production formula.

**OPEN QUESTION:**
- Cash-based or sales-based accounting?
- Unpaid milk sale treatment?
- Payroll expense integration?
- Inventory purchase integration?
- Animal purchase/sale integration?
- Opening balances?
- Refunds and reversals?

**Worked example — arithmetic only:**
- Income: 10,000.
- Expenses: 6,000.
- Difference: 4,000.
- Expected result if the client approves income minus expenses: 4,000 profit.

**Override:** Farm Admin manages financial source records. System calculates summaries. No manual net-profit override is defined.

## BR-045 — Financial reporting periods

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin requests a financial report.

**Inputs:**
- Period selection.
- Date range.
- Workspace.
- Currency.

**Supported periods:**
- Daily.
- Weekly.
- Monthly.
- Custom date range.

**Rule:**
1. Financial reports must support the defined period options.
2. Results must be limited to the authenticated farm workspace.
3. Reports are available to Farm Admin only.
4. Supported output formats include PDF, Excel, and print.

**OPEN QUESTION:**
- Week start day.
- Custom date inclusivity.
- Timezone boundaries.
- Historical currency changes.
- Report treatment of transactions entered late.

**Worked example:**
- Report period: 1 November to 30 November 2026.
- Expected result: financial records within the approved inclusive/exclusive date rules are included.
- Exact boundary behavior requires confirmation.

**Override:** Farm Admin may request permitted reports. Supervisor export is not granted.

---

# 13. Equipment and maintenance rules

## BR-046 — Equipment record management

**Status:** CONFIRMED RULE

**Trigger:** When Farm Admin creates or updates equipment.

**Inputs:**
- Equipment name.
- Type.
- Quantity.
- Condition.
- Workspace.

**Rule:**
1. Farm Admin manages equipment records.
2. Equipment quantity and condition are stored.
3. Maintenance history and usage history are supported.
4. Farm Admin may archive equipment.
5. Supervisor cannot archive equipment.

**OPEN QUESTION:**
- Allowed condition values.
- Quantity units.
- Negative quantity behavior.
- Equipment disposal status.
- Archive restoration.

**Worked example:**
- Equipment: Milking Machine.
- Quantity: 2.
- Condition: Good.
- Expected result: equipment record is created with the supplied attributes.

**Override:** Farm Admin manages equipment. Supervisor may update permitted condition information.

## BR-047 — Equipment maintenance history

**Status:** CONFIRMED RULE

**Trigger:** When maintenance is recorded.

**Inputs:**
- Equipment ID.
- Maintenance details.
- Date.
- Condition update, if applicable.

**Rule:**
1. Maintenance history must be recorded.
2. Supervisor may enter maintenance records.
3. Supervisor may update permitted equipment condition.
4. Supervisor cannot edit/archive the equipment master record outside permitted condition updates.

**Worked example:**
- Equipment: Milking Machine.
- Maintenance date: 23 November 2026.
- Expected result: a maintenance record is associated with the equipment.

**Override:** Farm Admin manages equipment master records. Supervisor may record maintenance and permitted condition updates.

**Audit:** Basic activity logging applies; history correction policy requires confirmation.

---

# 14. Notifications and scheduled automation

## BR-048 — Notification creation

**Status:** CONFIRMED RULE

**Trigger:** When a configured event or scheduled process generates a notification.

**Inputs:**
- Event type.
- Workspace.
- Recipient.
- Notification configuration.
- Delivery channel.

**Supported channels:**
- In-app.
- Email.

**Rule:**
1. The system supports in-app and email notifications.
2. Notification history must be maintained.
3. Read/unread state must be supported.
4. Recipient selection must follow role permissions.
5. High/Critical health notifications are Farm Admin-only.

**OPEN QUESTION:**
- Delivery retries.
- Duplicate suppression.
- Acknowledgement.
- Dismissal.
- Retention.
- Per-user preferences.
- Whether critical notifications can be disabled.

**Worked example:**
- Event: inventory stock reaches minimum.
- Recipient: authorized Farm Admin.
- Expected result: configured notification is created for the permitted recipient.

**Override:** Farm Admin manages available notification preferences. System creates generated notifications.

## BR-049 — Scheduled job timezone

**Status:** CONFIRMED GENERAL RULE; CUT-OFF DETAILS OPEN

**Trigger:** When a scheduled job evaluates a date/time-dependent event.

**Inputs:**
- Farm timezone.
- Scheduled execution time.
- Relevant record date/time.

**Rule:**
1. Each farm has configurable timezone settings.
2. Scheduled jobs must respect the configured farm timezone where applicable.
3. The application must not silently assume that all farms share one timezone.
4. Exact cut-off times and scheduling boundaries are not defined.

**OPEN QUESTION:**
- Default timezone.
- Daylight-saving behavior.
- Timezone changes after historical records exist.
- Daily production cut-off time.
- Payroll period cut-off.
- Attendance day boundary.
- Reminder execution time.
- Handling of jobs during timezone changes.

**Worked example:**
- Farm timezone: configured timezone A.
- Reminder date: 23 November 2026.
- Expected result: the reminder schedule is interpreted using the farm's configured timezone.
- Exact execution time requires approval.

**Override:** Farm Admin may change farm timezone settings. System jobs use the configured timezone. Historical timestamp behavior requires confirmation.

**Audit:** Timezone configuration changes should be attributable to the actor; detailed audit fields require confirmation.

## BR-050 — Date and time display

**Status:** CONFIRMED RULE

**Trigger:** When application dates and times are displayed or entered.

**Inputs:**
- Date.
- Time.
- Farm timezone.
- Configured date format.
- Configured time format.

**Rule:**
1. Farm Admin can configure date and time formats.
2. Farm timezone is configurable.
3. The application supports English only.
4. Pakistani/Indian number grouping is supported.
5. Automatic unit conversion is not supported.

**OPEN QUESTION:**
- Database timestamp storage standard.
- UTC conversion policy.
- Historical timezone interpretation.
- Date-only versus timestamp field behavior.
- Ambiguous local times.

**Worked example:**
- Stored event: a timestamp associated with a farm.
- Farm display configuration: approved local date/time format.
- Expected result: date/time is displayed using the farm configuration.

**Override:** Farm Admin may change farm display settings. System must preserve consistent record interpretation.

---

# 15. Workspace and authorization rules

## BR-051 — Workspace isolation

**Status:** CONFIRMED RULE

**Trigger:** Every authenticated request, database query, report, export, import, file access, and background operation.

**Inputs:**
- Authenticated principal.
- Role.
- Workspace association.
- Workspace status.
- Requested resource.

**Rule:**
1. Resolve identity and workspace from trusted server-side context.
2. Verify the requested record belongs to the authorized workspace.
3. Enforce ownership on parent and child records.
4. Restrict search, reports, files, notifications, imports, and exports to the same workspace.
5. Deny cross-workspace access.
6. Do not rely on user-supplied workspace IDs as proof of authorization.

**Worked example:**
- Farm Admin A belongs to Workspace A.
- User requests a record belonging to Workspace B.
- Expected result: access is denied without revealing whether the record exists.

**Override:** No user override. Super Admin operational-data access is not granted.

**Audit:** Denied cross-workspace attempts are recommended for logging; exact event coverage is an OPEN QUESTION.

## BR-052 — Suspended workspace access

**Status:** CONFIRMED RULE

**Trigger:** Every customer-user request when the workspace is suspended.

**Inputs:**
- Workspace status.
- Authenticated customer user.
- Requested operation.

**Rule:**
1. Super Admin may suspend a workspace.
2. A suspended workspace rejects customer-user access and operations.
3. Existing sessions and direct API requests must also be rejected.
4. Records are preserved.
5. Reactivation mechanics are not defined.

**Worked example:**
- Workspace status: Suspended.
- Farm Admin attempts to open the dashboard.
- Expected result: request is rejected.
- Existing session does not bypass suspension.

**Override:** Super Admin may suspend the workspace. Reactivation is unavailable until approved.

**Audit:** Workspace suspension must be attributable to the actor; detailed event fields require confirmation.

## BR-053 — Farm financial and payroll confidentiality

**Status:** CONFIRMED RULE

**Trigger:** Every finance/payroll read, report, search, notification, dashboard, export, and API request.

**Inputs:**
- Authenticated role.
- Workspace.
- Requested data.

**Rule:**
1. Financial information is Farm Admin-only.
2. Payroll is Farm Admin-only.
3. Supervisor APIs must not expose salary, advances, deductions, balances, payments, or payslips.
4. Restricted information must not leak through dashboard aggregates, search results, reports, exports, or notifications.

**Worked example:**
- Supervisor requests a payroll report.
- Expected result: denied.
- Farm Admin requests the same workspace payroll report.
- Expected result: allowed if the requested operation is otherwise permitted.

**Override:** No Supervisor override. Super Admin receives no routine farm financial access.

**Audit:** Authorization denial logging requires confirmation of event coverage.

## BR-054 — Import and export authorization

**Status:** CONFIRMED RULE

**Trigger:** When a user initiates an import or export.

**Inputs:**
- Authenticated actor.
- Workspace.
- Dataset.
- File format.
- Record-level permissions.

**Rule:**
1. Farm Admin is the only role explicitly granted farm data import/export.
2. Imports support Excel/CSV.
3. Export is limited to authorized workspace records and approved formats.
4. Import processing must validate each row.
5. Background processing must enforce the initiating user's permissions.
6. Supervisor import/export is denied unless separately approved.
7. Export downloads must re-check authorization.

**OPEN QUESTION:**
- Importable modules and fields.
- Duplicate handling.
- Partial import behavior.
- Transactional import behavior.
- Export field restrictions.
- Sensitive document export.
- Maximum file size.

**Worked example:**
- Farm Admin A imports an authorized inventory file into Workspace A.
- Expected result: only validated, authorized records in Workspace A are processed.
- A row referencing Workspace B is rejected.

**Override:** Farm Admin initiates authorized jobs. System processes them within delegated permissions.

**Audit:** Import/export initiation, completion, failure, and record counts are recommended minimum event coverage; expanded fields require approval.

## BR-055 — Soft and permanent deletion

**Status:** PARTIALLY CONFIRMED; RETENTION RULE OPEN

**Trigger:** When an authorized user requests deletion of a record.

**Inputs:**
- Resource type.
- Record ID.
- Workspace.
- Deletion type.

**Rule:**
1. The SRS supports soft and permanent deletion where applicable.
2. The role matrix does not authorize permanent deletion.
3. Permanent deletion remains denied until explicitly approved.
4. Soft deletion is allowed only where a specific resource workflow and role permission support it.
5. Linked-record and retention behavior must be defined before implementation.

**OPEN QUESTION:**
- Which resources support soft deletion?
- Who may request it?
- Can deleted records be restored?
- How are child records handled?
- What is the retention period?
- Which records must be retained for financial or operational history?

**Worked example:**
- Farm Supervisor attempts to permanently delete an inventory item.
- Expected result: denied.
- Farm Admin attempts permanent deletion.
- Expected result: denied until explicit authorization is approved.

**Override:** No permanent deletion override is currently granted.

**Audit:** Deletion attempts and successful deletions require event coverage confirmation.

---

# 16. Backup and data integrity rules

## BR-056 — Automatic and manual backups

**Status:** CONFIRMED FEATURE; CONFIGURATION OPEN

**Trigger:** When an automatic or manual backup job runs.

**Inputs:**
- Workspace data.
- Backup configuration.
- Storage destination.
- Job identity.

**Rule:**
1. The system supports automatic and manual backups.
2. Local/cloud storage options are supported.
3. Backup jobs use narrowly scoped service permissions.
4. Backup restore, download, deletion, and retention permissions are not defined.

**OPEN QUESTION:**
- Backup frequency.
- Retention period.
- Encryption.
- Storage provider.
- Restore authority.
- Recovery point objective.
- Recovery time objective.
- Backup verification.

**Worked example:**
- Configured backup job executes for Workspace A.
- Expected result: the configured backup process runs only for its authorized data and destination.
- Backup contents and retention cannot be determined without configuration approval.

**Override:** System executes configured jobs. Farm Admin may configure available backup settings. User restore/download rights are not granted.

**Audit:** Backup initiation, completion, failure, and configuration changes require approved event coverage.

## BR-057 — Activity logging

**Status:** CONFIRMED BASIC REQUIREMENT

**Trigger:** When an application action is recorded by the activity logger.

**Inputs:**
- User or service identity.
- Action.
- Date/time.

**Rule:**
1. Basic activity logs must include user, action, and date/time.
2. Automated jobs must be attributable to their service identity.
3. Application users must not edit activity log entries.
4. Advanced before-and-after tracking is excluded unless separately approved.

**OPEN QUESTION:**
- Event coverage.
- Log retention.
- Failed authorization logging.
- Log visibility.
- Log export.
- Tamper protection.
- Workspace ID and record ID fields.

**Worked example:**
- Farm Admin changes an inventory item.
- Expected basic log information:
  - Actor: Farm Admin.
  - Action: inventory item updated.
  - Date/time: event timestamp.

**Override:** No application-user edit override is permitted.

---

# 17. Dashboard and analytics rules

## BR-058 — Role-specific dashboards

**Status:** CONFIRMED RULE

**Trigger:** When an authenticated user opens a dashboard.

**Inputs:**
- Authenticated role.
- Workspace.
- Authorized dashboard metrics.

**Rule:**
1. Farm Admin receives the Farm Admin dashboard.
2. Supervisor receives the operational Supervisor dashboard.
3. Farm financial and payroll information must not appear in Supervisor dashboards.
4. Dashboard metrics must respect underlying resource permissions.
5. Farm Admin may customize supported dashboard widgets.

**OPEN QUESTION:**
- Dashboard refresh frequency.
- Metric catalog.
- Layout persistence.
- Whether Supervisor customization is supported.
- Whether layouts are shared or per-user.

**Worked example:**
- Farm Supervisor opens the dashboard.
- Expected result: permitted operational metrics appear.
- Payroll and financial information remain hidden.

**Override:** Farm Admin may customize supported widgets. Supervisor customization is not granted.

## BR-059 — Monthly financial analytics

**Status:** CONFIRMED FEATURE; CALCULATION BASIS OPEN

**Trigger:** When scheduled monthly financial analytics run.

**Inputs:**
- Financial source records.
- Reporting month.
- Farm timezone.
- Workspace.
- Currency.

**Rule:**
1. Monthly financial analytics are supported.
2. Calculations must use authorized farm records.
3. Financial analytics are Farm Admin-only.
4. Calculation basis follows the approved financial reporting rules.

**OPEN QUESTION:**
- Monthly cut-off.
- Late transaction handling.
- Unpaid sale inclusion.
- Expense integration.
- Currency changes.
- Scheduled execution time.

**Worked example:**
- Reporting month: November 2026.
- Expected result: monthly analytics are generated for the approved reporting period.
- Monetary results remain dependent on the financial calculation rules.

**Override:** System calculates analytics; Farm Admin manages permitted financial source records.

---

# 18. Consolidated OPEN QUESTIONS

The following questions must be answered before affected calculations or workflows can be considered implementation-ready.

| ID | Topic | Client decision required |
|---|---|---|
| OQ-BR-001 | Rounding | Currency, quantity, percentage and payroll precision and rounding methods |
| OQ-BR-002 | Currency | Default currency, decimal precision and behavior when currency changes |
| OQ-BR-003 | Discounts | Whether discounts exist and permitted calculation methods |
| OQ-BR-004 | Shipping | Whether milk delivery/transportation charges are required |
| OQ-BR-005 | Animal IDs | Global or workspace-specific uniqueness and duplicate ear-tag handling |
| OQ-BR-006 | Animal lifecycle | Allowed transitions, reversibility and irreversible states |
| OQ-BR-007 | Animal archive | Archive semantics, restoration and relation to lifecycle statuses |
| OQ-BR-008 | Weight | Supported units, validation limits and weight-derived calculations |
| OQ-BR-009 | Health | Supervisor record visibility, severity access and correction rights |
| OQ-BR-010 | Vaccination | Reminder lead time, frequency and overdue handling |
| OQ-BR-011 | Health alerts | Suppression, acknowledgement and duplicate notification rules |
| OQ-BR-012 | Milk production | Maximum quantities, zero/negative values and duplicate sessions |
| OQ-BR-013 | Daily totals | Missing morning/evening session handling |
| OQ-BR-014 | Farm totals | Eligible animals and historical record aggregation |
| OQ-BR-015 | Production drop | Exact three-day average and percentage-drop formula |
| OQ-BR-016 | Milk stock | Collection, transfer, internal use and stock reconciliation |
| OQ-BR-017 | Milk sales | Negative stock, partial sales, cancellation and returns |
| OQ-BR-018 | Wastage | Stock limits and wastage correction/reversal |
| OQ-BR-019 | Wastage loss | Financial valuation formula and accounting treatment |
| OQ-BR-020 | Inventory | Units, duplicates and allowed quantity ranges |
| OQ-BR-021 | Inventory purchases | Received quantities, partial deliveries and purchase cancellation |
| OQ-BR-022 | Stock corrections | Absolute vs signed adjustment and negative stock policy |
| OQ-BR-023 | Low stock | Missing minimum stock and duplicate alert handling |
| OQ-BR-024 | Expiry | Reminder lead time and expired/damaged stock policy |
| OQ-BR-025 | Feeding plans | Overlapping plans and schedule exceptions |
| OQ-BR-026 | Nutritional suggestions | Formula, inputs, parameters and approval process |
| OQ-BR-027 | Feeding usage | Whether actual feeding deducts inventory |
| OQ-BR-028 | Worker records | CNIC validation, cross-workspace uniqueness and worker deactivation |
| OQ-BR-029 | Attendance | Multiple entries, late rules, missing check-out and overnight shifts |
| OQ-BR-030 | Leave | Rejection, resubmission, overlap and attendance precedence |
| OQ-BR-031 | Leave payroll | Paid/unpaid leave effect on salary |
| OQ-BR-032 | Payroll period | Period boundaries, weekly anchor and partial periods |
| OQ-BR-033 | Monthly salary | Monthly salary and partial-month formula |
| OQ-BR-034 | Daily wage | Payable-day formula and attendance status treatment |
| OQ-BR-035 | Absence | Absence deduction formula and divisor |
| OQ-BR-036 | Advances | Recovery schedule, installments and balance limits |
| OQ-BR-037 | Adjustments | Adjustment categories, sign and maximum limits |
| OQ-BR-038 | Payments | Split payments, overpayment, reversal and outstanding balance formula |
| OQ-BR-039 | Payslips | Finalization, correction, reissue and reopening |
| OQ-BR-040 | Income | Transaction eligibility and refund treatment |
| OQ-BR-041 | Expenses | Purchase, veterinary and payroll integration |
| OQ-BR-042 | Total income | Unpaid sales and opening balance treatment |
| OQ-BR-043 | Total expenses | Accrual/cash treatment and integrated costs |
| OQ-BR-044 | Profit/loss | Accounting basis and net profit/loss formula |
| OQ-BR-045 | Financial periods | Week start, inclusive dates and late transactions |
| OQ-BR-046 | Equipment | Condition values, disposal and quantity units |
| OQ-BR-047 | Maintenance | Maintenance correction and deletion |
| OQ-BR-048 | Notifications | Retry, suppression, acknowledgement and retention |
| OQ-BR-049 | Timezone | Default timezone, cut-offs and daylight-saving behavior |
| OQ-BR-050 | Date/time | Storage standard and historical timezone changes |
| OQ-BR-051 | Workspace | Multi-workspace and cross-workspace administration |
| OQ-BR-052 | Suspension | Workspace reactivation and restoration |
| OQ-BR-053 | Authorization | Any change to Farm Admin/Supervisor financial restrictions |
| OQ-BR-054 | Import/export | Supported modules, duplicate and partial-import handling |
| OQ-BR-055 | Deletion | Soft deletion, permanent deletion, retention and restoration |
| OQ-BR-056 | Backup | Frequency, retention, restore and download authority |
| OQ-BR-057 | Audit | Event coverage, visibility, retention and export |
| OQ-BR-058 | Dashboard | Refresh frequency, persistence and Supervisor customization |
| OQ-BR-059 | Monthly analytics | Period cut-off and transaction inclusion rules |

---

# 19. Implementation acceptance criteria

A business rule is ready for implementation when:

1. Its business behavior has been approved.
2. Its inputs and validation ranges are defined.
3. Its calculation or decision logic is unambiguous.
4. Its units and currency are confirmed.
5. Its rounding policy is confirmed where applicable.
6. Zero, negative, missing, duplicate, cancellation and reversal cases are defined where relevant.
7. Authorized roles and override boundaries are approved.
8. Audit requirements are defined.
9. A worked example has been accepted as an expected-result test case.

For OPEN QUESTION rules, implementation must not silently select a formula or behavior.

## 20. Final status

**Confirmed:** The system's major operational features, role restrictions, selected thresholds, supported statuses, basic stock deductions, low-stock threshold behavior, and notification restrictions.

**Pending:** Detailed business calculations, payroll formulas, financial accounting basis, stock reversal rules, lifecycle transitions, nutritional recommendation logic, date/time cut-offs, rounding, and detailed audit behavior.

**Implementation instruction:** Treat this document as the business-rule baseline. Do not implement unresolved formulas or assumptions until the client provides explicit approval and the relevant rule is updated.