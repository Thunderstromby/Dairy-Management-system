# SmartFarm Role & Permission Matrix

**Source:** SmartFarm Dairy Management System SRS v1.0, 22 November 2026  
**Status:** Draft security baseline — pending resolution of the SRS open questions  
**Purpose:** Define server-enforced authorization. This document does not approve or add product scope.

## 1. Roles and actors

| Role / actor | Description | Authentication / access |
|---|---|---|
| Guest | Unauthenticated visitor to the public SmartFarm website. | No private application access. |
| Prospective Customer | A guest who submits a public contact inquiry; not a provisioned platform account. | No private application access. |
| Super Admin | Platform operator who registers customers, provisions workspaces and Farm Admin accounts, manages customer access, and suspends workspaces. | Authenticated Super Admin Panel account. |
| Farm Admin | Farm owner/manager account with administrative permissions inside its assigned farm workspace. | Authenticated account associated with a workspace. |
| Farm Supervisor | Farm staff account with limited operational permissions inside its assigned workspace. | Authenticated account associated with a workspace. |
| Worker (record-only) | A person represented in Worker Management records; workers do not receive application login accounts. | No application authentication or direct permissions. |
| System / scheduled automation | Trusted application processes that calculate totals, evaluate thresholds, run scheduled jobs, create reminders, and maintain configured backups. | Non-human service identity; narrowly scoped service permissions only. |
| Email delivery service | External delivery mechanism used to send approved system emails. It is not a human application role. | Receives only the message payload required for delivery; no interactive access to farm data. |

**Role-model notes**
- “Farm Owner / Manager” is represented by the Farm Admin role in the SRS; it is not a separate role.
- A Worker is a data subject/record, not an authenticated actor. A worker cannot sign in, view a payslip, or exercise permissions.
- The SRS does not define a separate auditor, veterinarian, accountant, customer self-service, or read-only role. None is granted access.
- Automated actors are not granted general user permissions. Their rights are limited to the specific background operation described below.

## 2. Permission notation and enforcement rules

Each matrix uses these action columns:

- **View** — retrieve or read the resource.
- **Create** — add a resource or record.
- **Edit** — change an existing resource or record.
- **Delete** — perform an applicable soft or permanent deletion.
- **Approve** — perform an explicit approval/rejection decision where the workflow supports it.
- **Export** — export the resource or its data.
- **Archive** — archive the resource where archiving is supported.

Every cell is `YES`, `NO`, or `CONDITIONAL`. A conditional permission states its boundary in the cell.

**Conservative default:** `NO` means the SRS does not grant the permission. Where the SRS is silent or ambiguous, the permission remains `NO` and is listed as an Open Question below. This is a security default, not a claim that the business has definitively rejected the capability.

**Server-side requirement:** Every permission, condition, ownership check, role check, and workspace check in this document must be enforced by backend/API authorization on every request. Hiding a page, button, menu item, or field is not authorization. Direct API calls, altered identifiers, bulk operations, imports, exports, background jobs, and file downloads must receive the same enforcement.

**System actor convention:** `CONDITIONAL` for System / scheduled automation means only the named automated process may perform the named operation, using a service identity and validated workspace context. It does not grant an operator or user a general bypass.

## 3. Cross-cutting access rules

1. **Workspace isolation:** Farm Admins and Supervisors may access only the workspace(s) explicitly associated with their authenticated account. All farm records, files, search results, reports, aggregates, imports, exports, notifications, and background-job inputs/outputs must be scoped to that workspace.
2. **No cross-workspace access:** No Farm Admin, Supervisor, Worker, Guest, or Prospective Customer may view or operate on another workspace's data. Super Admin cross-workspace operational-data access is **not granted** pending the support-access decision in the SRS. Platform customer/workspace administration is distinct from farm operational-data access.
3. **Workspace status:** A suspended workspace rejects customer-user access and operations, including existing sessions and direct API requests. Records are preserved on suspension. The SRS does not define Super Admin access restoration mechanics; do not infer them.
4. **Ownership:** Every farm operational record must be associated with a workspace. A user-supplied record ID, animal ID, worker ID, attachment ID, or parent-record ID must not be trusted as proof of ownership. The server must verify that every referenced record belongs to the authenticated user's authorized workspace.
5. **Child records:** Access to a child record (for example, treatment, weight, production, attachment, attendance, payroll, or maintenance history) is no broader than access to its parent record and workspace. A child record cannot be used to bypass a parent's restrictions.
6. **Financial confidentiality:** Farm financial information is Farm Admin only. Supervisors must not receive finance data through dashboards, reports, search, exports, notifications, API payloads, or indirect aggregates that reveal restricted financial information.
7. **Payroll confidentiality:** Payroll is Farm Admin only. Workers have no login access. Supervisors cannot view payroll, salary, advances, deductions, balances, payments, or payslips.
8. **Inventory correction:** Only Farm Admin may correct stock. Supervisor usage entries are not stock corrections. System stock changes are permitted only as explicitly configured consequences of approved operations (for example, milk sales/wastage; inventory purchase/addition; any future-approved feeding deduction).
9. **Animal archive:** Supervisors cannot archive animals. Farm Admin may archive animals as permitted by the applicable record lifecycle. The SRS separately defines animal lifecycle states (Active, Sold, Deceased, Removed); whether “archive” is distinct from those states is unresolved.
10. **Leave approval:** Only Farm Admin may approve or reject leave. A Supervisor may not approve/reject leave, even if the Supervisor created or entered the leave record.
11. **Health alert delivery:** High/Critical health notifications go to Farm Admin users, not Supervisors. This delivery restriction also applies to notification APIs, email recipients, dashboards, and exports.
12. **Role assignment:** Super Admin provisions Farm Admin accounts. Farm Admin manages Supervisor access. No role may grant itself a higher role. The exact supported role changes, invitation flow, and ability to revoke or edit accounts require confirmation; until then, only the explicitly described provisioning/management operations are allowed.
13. **No public registration:** Guests cannot create customer accounts or workspaces. Contact inquiry submission is not account creation.
14. **Workers:** Worker records and documents are accessible only to authorized farm users. Worker self-service access is excluded because worker login accounts are explicitly out of scope.
15. **Automation:** Background processes must use least privilege, be restricted to the relevant workspace, validate the source records and configuration, and avoid exposing restricted data in logs or notifications.
16. **Deletion:** Delete permissions below mean only where the SRS says deletion is applicable. Soft deletion and permanent deletion behavior, retention, linked-record handling, and who may permanently delete are not fully specified. Until approved, permanent deletion is `NO`.
17. **Approval is not implied by create/edit:** Where the SRS does not define a review/approval workflow, `Approve` is `NO`. Leave approval/rejection is the explicitly confirmed exception.
18. **Export:** Export permission is separate from view permission. A role may export only when explicitly allowed and only within its permitted workspace, records, and fields. Supervisor export is `NO` unless a specific operational export is confirmed.
19. **Import:** Import is a separate capability even though it is not one of the requested matrix action columns. Farm Admin is the only role explicitly granted farm data import/export in the SRS; Supervisor import is `NO`.
20. **Audit:** All authorization decisions and privileged data mutations should be attributable to the authenticated user or service identity. See the audit list in Section 6.

## 4. Resource permission matrices

### 4.1 Public website and inquiries

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | YES — public marketing pages only | NO | NO | NO | NO | NO | NO |
| Prospective Customer | YES — public marketing pages only | CONDITIONAL — submit own contact inquiry only | NO | NO | NO | NO | NO |
| Super Admin | YES — public website; inquiry access not specified | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — public pages only | NO | NO | NO | NO | NO | NO |
| Farm Supervisor | YES — public pages only | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | NO | CONDITIONAL — accept/store a submitted inquiry through the contact-form process only | NO | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Question:** Who can view, manage, export, or delete submitted inquiries, and where/how inquiries are delivered or retained.

### 4.2 Platform customers and customer records

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO — own inquiry only; no customer account view | NO | NO | NO | NO | NO | NO |
| Super Admin | YES — platform customer records | YES — register customer | YES — manage customer records | NO — not specified | NO | NO | NO |
| Farm Admin | NO — own farm profile is a separate resource | NO | NO | NO | NO | NO | NO |
| Farm Supervisor | NO | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | NO | NO | NO | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

### 4.3 Farm workspaces and workspace status

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | YES — platform workspace records/status; operational farm data is not included | YES — create workspace for registered customer | CONDITIONAL — manage workspace/customer access only; operational settings excluded | NO | NO | NO | NO |
| Farm Admin | YES — assigned workspace metadata/settings only | NO | CONDITIONAL — own assigned farm settings only, not platform workspace identity/status | NO | NO | NO | NO |
| Farm Supervisor | NO — workspace metadata not specified | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read workspace status and configuration required for an authorized job | NO | CONDITIONAL — update only system-maintained operational state required by a defined job | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Suspension is a privileged status transition:** Super Admin may suspend a workspace (see Section 4.4). Suspension must preserve records and block customer access. Permanent workspace deletion/closure is not authorized by this matrix.

### 4.4 Workspace suspension and customer access control

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | YES — customer access and workspace status | NO | CONDITIONAL — suspend workspace/manage customer access only | NO | NO | NO | NO |
| Farm Admin | CONDITIONAL — own access/workspace status only | NO | NO | NO | NO | NO | NO |
| Farm Supervisor | CONDITIONAL — own access/workspace status only | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — check suspension status on every customer access path | NO | CONDITIONAL — enforce suspension by rejecting customer access; do not change suspension status | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Question:** Workspace reactivation/restoration authority and process are not specified.

### 4.5 User accounts, authentication, and role assignment

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | YES — platform account/access records within its administration scope | CONDITIONAL — provision Farm Admin accounts only | CONDITIONAL — manage customer access only; account-field scope unspecified | NO — account deletion/revocation rules unspecified | NO | NO | NO |
| Farm Admin | YES — own account and permitted Supervisor access records | CONDITIONAL — create/provision Supervisor access only | CONDITIONAL — manage Supervisor access only; exact editable fields unspecified | NO — revocation/deletion mechanics unspecified | NO | NO | NO |
| Farm Supervisor | YES — own account/profile only | NO | CONDITIONAL — change own password only | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — validate account, role, workspace association, and account status for authentication/authorization | CONDITIONAL — create account only through an authorized provisioning workflow | CONDITIONAL — perform password-reset/credential workflow only as specified | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Supervisor provisioning details; account activation and first-login behavior; account suspension/deactivation/revocation; whether Farm Admin may edit Supervisor role or only provision access; whether multiple Farm Admins/users/workspaces are supported; Super Admin account lifecycle and OTP policy.

### 4.6 Farm profile, settings, and configuration

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm settings access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — assigned farm settings | YES — configurable categories/settings where supported | YES — assigned farm settings, units, currency, timezone, date/time formats, notification preferences, module settings | NO — not specified | NO | NO | NO |
| Farm Supervisor | NO — settings management excluded | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read configuration required for an authorized calculation/job | NO | CONDITIONAL — update system-maintained configuration/state only when explicitly required by a defined process | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

### 4.7 Animals, animal profiles, and lifecycle records

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace animals and histories | YES — register animals/calves and supported lifecycle records | YES — animal details, group override, purchase/sale/lifecycle/weight records as applicable | NO — deletion policy not specified | NO | CONDITIONAL — own workspace records through permitted data export | YES — animal archive permitted by role matrix; lifecycle/archive semantics need confirmation |
| Farm Supervisor | CONDITIONAL — permitted operational animal information only; sensitive fields/record scope not specified | CONDITIONAL — permitted animal entry only; exact record types unresolved | CONDITIONAL — permitted operational entry only; no archive and no unconfirmed edits | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read animal data needed for approved calculations/reminders | CONDITIONAL — generate internal unique ID and create system-generated group suggestions only | CONDITIONAL — update calculated/system-generated fields only | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Supervisor animal-entry scope; edit/delete rights for submitted animal records; ear-tag changes; animal transfer/re-registration; calf parent exceptions; attachment limits; whether archive is separate from lifecycle status; permitted animal export fields.

### 4.8 Animal attachments and documents

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm document access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — attachments belonging to own workspace animal records | YES — attach animal photos/documents | CONDITIONAL — replace/update attachment metadata only if supported; not specified | NO — deletion policy unspecified | NO | CONDITIONAL — only as part of permitted record export; attachment export rules unspecified | NO |
| Farm Supervisor | CONDITIONAL — only attachments exposed as part of permitted operational animal access; exact scope unresolved | CONDITIONAL — only if the related permitted animal entry workflow supports it; not confirmed | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — validate/store/retrieve files only for authorized parent-record operations | CONDITIONAL — store uploaded files after authorization and validation | NO | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

### 4.9 Animal health, treatment, vaccination, veterinary appointments, and disease history

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace health records | YES — health, treatment, vaccination, appointment, and disease records | YES — own workspace records; correction policy not fully specified | NO — deletion policy not specified | NO | CONDITIONAL — own workspace records through permitted data export | NO |
| Farm Supervisor | CONDITIONAL — operational health information only; High/Critical alert access is prohibited; full record-view scope unresolved | CONDITIONAL — permitted health information entry only; severity levels unresolved | NO — edit rights not specified; conservative default | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read health/vaccination data required for configured reminders and alerts | CONDITIONAL — create generated reminders/alerts and notification records only | CONDITIONAL — update system-managed reminder/notification state only | NO | NO | NO | NO |
| Email delivery service | NO — receives only approved notification payload | NO | NO | NO | NO | NO | NO |

**Open Questions:** Supervisor severity levels; whether Supervisors can edit/delete submitted health records; full Supervisor health-record visibility; reminder repetition/suppression; vaccination schedule configuration; health-record approval workflow (none currently specified).

### 4.10 Milk production records and production reports

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace production records/reports | YES — morning/evening production records | CONDITIONAL — corrections only after the production-edit rule is approved; otherwise NO | NO — deletion policy not specified | NO | CONDITIONAL — own workspace production reports/records | NO |
| Farm Supervisor | CONDITIONAL — permitted operational production information; view scope not fully specified | YES — permitted morning/evening production entry | NO — edit/correction rule unresolved; conservative default | NO | NO | NO — operational export not confirmed | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read production records for totals, reports, and approved drop detection | CONDITIONAL — create calculated totals and alerts only | CONDITIONAL — recalculate derived totals when source records change; never alter source entries | NO | NO | NO | NO |
| Email delivery service | NO — receives only approved alert payload | NO | NO | NO | NO | NO | NO |

**Open Questions:** Whether submitted entries can be edited; missing-session and late-entry handling; historical correction process; Supervisor production history visibility; production export scope; mathematical definition and alert deduplication for the three-day/15% rule.

### 4.11 Milk collection, storage, stock, usage, sales, and wastage

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace milk stock, collection, storage, usage, sales, and wastage | YES — all supported milk operations and sales | CONDITIONAL — corrections/cancellations only after rules are approved; default NO for unspecified edits | NO — deletion/cancellation rules unresolved | NO | CONDITIONAL — own workspace records through permitted data export | NO |
| Farm Supervisor | NO — sales/stock/finance access is not granted; collection/storage/usage view not specified | NO — milk sales are explicitly Admin-only; other milk stock-operation creation not granted | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read stock and operation records to calculate available milk stock | CONDITIONAL — create system-generated stock movements/deductions only as a consequence of an authorized recorded collection, sale, usage, or wastage operation | CONDITIONAL — recalculate derived stock only; no source-record edits | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Whether Supervisors may record collection, storage, or internal usage; whether sales can exceed stock; cancellation/return reversal; tank transfers and allocation; internal consumption; transaction edit/delete rights; stock reconciliation.

### 4.12 Inventory items, purchases, additions, stock adjustments, and usage

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace inventory and history | YES — items, purchases, quick additions, adjustments | YES — inventory details and stock corrections; adjustment requires reason | NO — deletion policy not specified | NO — no separate approval workflow specified | CONDITIONAL — own workspace inventory records through permitted export | NO |
| Farm Supervisor | CONDITIONAL — permitted inventory information; exact view scope unresolved | CONDITIONAL — daily usage entries only; no stock correction | NO — stock correction prohibited; edits to usage entries not specified | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read inventory levels, minimum levels, expiry dates, and usage | CONDITIONAL — apply stock movement only for explicitly approved purchase/addition/usage rules; feeding deduction is not authorized until confirmed | CONDITIONAL — update calculated current-stock/alert state only under approved stock rules | NO | NO | NO | NO |
| Email delivery service | NO — receives only low-stock/expiry notification payload | NO | NO | NO | NO | NO | NO |

**Open Questions:** Immediate stock deduction for usage; negative stock; expired/damaged stock handling; custom units; feeding-to-stock linkage; Supervisor visibility and editing of usage entries; item archive/delete behavior.

### 4.13 Feeding plans, schedules, suggestions, and actual feeding

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace plans and actual feeding records | YES — plans, assignments, schedules, and permitted actual feeding records | YES — plans and permitted overrides | NO — deletion policy not specified | NO | CONDITIONAL — own workspace feeding records through permitted export | NO |
| Farm Supervisor | CONDITIONAL — assigned/permitted feeding plans only | YES — actual feeding records only | NO — correction rights not specified | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read approved plan and available animal parameters to generate suggestions/schedules | CONDITIONAL — create system-generated suggestions/reminders only; not veterinary prescriptions | NO | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Nutritional formulas and parameters; multiple feed items; day-specific schedules; Supervisor out-of-schedule entry; feeding stock deductions; actual feeding correction/deletion; whether suggestions are stored records or transient calculations.

### 4.14 Worker profiles and worker documents

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace worker profiles/documents | YES — worker profiles and attachments | YES — worker profiles and attachments | NO — deletion policy not specified | NO | CONDITIONAL — own workspace worker records through permitted export; sensitive document export rules unspecified | NO |
| Farm Supervisor | CONDITIONAL — worker information only as needed for permitted attendance operations; full profile/document access not granted | NO — worker registration is Farm Admin-only | NO | NO | NO | NO | NO |
| Worker (record-only) | NO — no self-service account | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read worker identifiers/status needed for authorized attendance/payroll jobs | NO | NO | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Supervisor worker-profile visibility; worker document visibility; worker deactivation/archive lifecycle; who may update or delete worker documents; worker data export scope.

### 4.15 Attendance, check-in/check-out, leave, and overtime

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace attendance, leave, and overtime | YES — attendance/leave/overtime records as applicable | YES — review and correct attendance; leave record corrections not fully specified | NO — deletion policy not specified | YES — approve or reject leave | CONDITIONAL — own workspace attendance records through permitted export | NO |
| Farm Supervisor | CONDITIONAL — permitted attendance records needed for operational entry; broader visibility unresolved | YES — permitted attendance and check-in/check-out entry | NO — correction rights unresolved; conservative default | NO | NO — leave approval/rejection prohibited | NO | NO |
| Worker (record-only) | NO — no login/self-service | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read attendance/leave data required for configured calculations | CONDITIONAL — create system-generated attendance-derived values only if a defined rule requires them; no such rule is currently confirmed | NO — no automatic correction rule specified | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Multiple daily entries; late-arrival calculation; Supervisor correction of prior entries; rejected leave handling; holidays/rest days; attendance/leave precedence; overtime calculation; record deletion and export rights.

### 4.16 Payroll, salary structures, advances, deductions, payments, balances, and payslips

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace payroll and payslips | YES — salary configuration, payroll, advances, deductions, salary payments, payslips | YES — permitted payroll adjustments; correction/reopening rules unresolved | NO — deletion policy not specified | NO — payroll approval/release workflow not defined | CONDITIONAL — own workspace payroll records/payslips through permitted export | NO |
| Farm Supervisor | NO — payroll is Farm Admin-only | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO — no worker login/self-service | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read authorized attendance/payroll inputs to calculate payroll and balances under approved formulas | CONDITIONAL — create calculated payroll outputs/payslip artifacts only after approved calculation rules are configured; payment records are not created automatically | CONDITIONAL — recalculate derived values only under an approved correction process | NO | NO | NO | NO |
| Email delivery service | NO — no payroll payload unless an approved delivery workflow is later specified | NO | NO | NO | NO | NO | NO |

**Open Questions:** All exact salary formulas; partial day, holiday, rest-day and leave rules; advance recovery; split payments; payroll approval/finalization; payslip correction/reissue; reopening; deletion; whether payslips are ever delivered by email.

### 4.17 Farm income, expenses, financial summaries, and financial reports

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm financial access; support access is unresolved and not granted | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace financial records, dashboard, and reports | YES — income, expenses, and expense categories | NO — transaction correction rules unresolved; conservative default | NO — transaction deletion rules unresolved | NO | YES — own workspace financial reports in PDF, Excel, and print formats | NO |
| Farm Supervisor | NO — financial information restricted | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read authorized financial records to calculate summaries/monthly analytics | CONDITIONAL — create derived summaries only; do not invent or post financial transactions | CONDITIONAL — recalculate derived summaries after an authorized source change | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Cash vs sales-based reporting; unpaid-sale treatment; integration of animal/inventory/veterinary costs; transaction edit/delete; opening balances; whether Supervisor dashboards can display non-financial aggregate data derived from financial sources (default prohibited).

### 4.18 Equipment, maintenance, and usage records

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — no routine farm operational access | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace equipment and history | YES — equipment, maintenance, and usage records | YES — equipment records and permitted history | NO — deletion policy not specified | NO | CONDITIONAL — own workspace equipment records through permitted export | YES — archive equipment |
| Farm Supervisor | YES — permitted equipment information | YES — maintenance and usage records | CONDITIONAL — update permitted equipment condition only; equipment master edits prohibited | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read equipment data for authorized views | NO | NO | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Equipment condition values; unit/quantity modeling; maintenance attachments; disposed-equipment status; whether Supervisor may edit a submitted maintenance/usage entry; equipment record deletion.

### 4.19 Dashboards, widgets, and dashboard configuration

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | YES — public dashboard preview only | NO | NO | NO | NO | NO | NO |
| Prospective Customer | YES — public dashboard preview only | NO | NO | NO | NO | NO | NO |
| Super Admin | YES — platform-level dashboard only; farm dashboard data not granted | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace Admin dashboard | CONDITIONAL — create/select supported widget configuration | YES — rearrange, select metrics, resize and customize supported layout | NO — reset/delete behavior not specified | NO | CONDITIONAL — only via separately authorized report/export functions | NO |
| Farm Supervisor | YES — permitted operational Supervisor dashboard only | NO — customization not confirmed | NO — customization not confirmed | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read source metrics needed to render authorized dashboards | CONDITIONAL — create/update calculated dashboard metrics only | CONDITIONAL — refresh calculated metrics only | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Per-user vs shared layout persistence; Supervisor customization; reset behavior; metric catalog; refresh frequency; whether dashboard export is supported.

### 4.20 Notifications, notification history, and preferences

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — farm notifications not included in platform duties | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace notifications/history | YES — configure available notification types/preferences; system creates generated notifications | CONDITIONAL — notification preferences and read/unread state only; notification content/history edits not specified | NO — deletion/clear-history not specified | NO | NO — notification export not specified | NO |
| Farm Supervisor | CONDITIONAL — permitted notifications only; High/Critical health alerts excluded | NO | CONDITIONAL — mark own permitted notifications read/unread only | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read configured rules and recipient permissions | YES — create configured in-app notification/history records | CONDITIONAL — update generated delivery/read state only as defined by system behavior | NO | NO | NO | NO |
| Email delivery service | NO — receives only the individual approved email payload | CONDITIONAL — deliver an email message supplied by the application; cannot create an application notification | NO | NO | NO | NO | NO |

**Open Questions:** Per-user preferences; repetition/suppression; acknowledgement/dismissal; whether critical alerts can be disabled; retry/failure behavior; Supervisor notification categories; notification deletion/export.

### 4.21 Reports and operational analytics

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO — dashboard preview is public marketing content, not farm reports | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | CONDITIONAL — platform-level records only; farm reports not granted | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace reports and analytics | CONDITIONAL — generate reports for supported periods/filters | NO — reports are derived outputs; source record edits use their own permissions | NO | NO | YES — where the specific report format is confirmed | NO |
| Farm Supervisor | CONDITIONAL — permitted operational reports only; financial/payroll reports excluded | CONDITIONAL — view/generate permitted operational reports only if exposed; exact report list unresolved | NO | NO | NO | NO — Supervisor report export not confirmed | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read authorized source records for calculations and scheduled analytics | CONDITIONAL — generate derived reports/summaries only | CONDITIONAL — refresh derived reports only | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

### 4.22 Data import and export

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | CONDITIONAL — platform-level records only; farm imports/exports not granted | NO | NO | NO | NO | CONDITIONAL — platform-level scope only; exact formats/data not specified | NO |
| Farm Admin | YES — own workspace import/export status and results | YES — initiate Excel/CSV imports for supported records | NO — import is not a general edit permission; changes must follow record-level authorization and validation | NO | NO | YES — own workspace permitted records/datasets in supported Excel/CSV formats and applicable report formats | NO |
| Farm Supervisor | NO — import/export access not confirmed | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — read import/export job metadata and authorized source records | CONDITIONAL — process an Admin-authorized import/export job after validating workspace, row-level permissions, and mapping | CONDITIONAL — create/update imported records only where the initiating Farm Admin has the corresponding record-level permission and validation passes | NO | NO | CONDITIONAL — produce the requested export only for authorized workspace data | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Importable modules and fields; duplicate handling; validation/error reporting; transactional vs partial import; export field-level restrictions; whether Super Admin has any platform export; whether Supervisors may export operational data (default NO).

### 4.23 Backups and restoration

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — backup access/restore authority not specified | NO | NO | NO | NO | NO | NO |
| Farm Admin | CONDITIONAL — own workspace backup configuration/status only where exposed | YES — initiate manual backup where supported | YES — configure available backup settings | NO — backup deletion/retention control not specified | NO | NO — backup file export/download not specified | NO |
| Farm Supervisor | NO | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — access only the data/configuration required for configured backup jobs | YES — execute configured automatic/manual backup jobs | CONDITIONAL — update backup job status/metadata only | NO — retention/deletion rules not specified | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Backup frequency, retention, storage provider, encryption/access model, restore authority, restore workflow, RPO/RTO, backup deletion, whether Farm Admin can download backups, and whether Super Admin/platform operators can restore customer data.

### 4.24 Activity logs

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | NO | NO | NO | NO | NO | NO |
| Prospective Customer | NO | NO | NO | NO | NO | NO | NO |
| Super Admin | NO — platform activity-log visibility not specified | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — own workspace activity logs, subject to log coverage and visibility confirmation | NO — logs are system-generated | NO — logs must not be user-editable | NO — retention/deletion policy not specified | NO | NO — log export not specified | NO |
| Farm Supervisor | NO — log visibility not specified | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — write basic user/action/date-time events and read only as needed for system operation | YES — record basic activity events | NO — immutable to application users; corrections are not specified | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

**Open Questions:** Whether Super Admin can view platform logs; whether Farm Admin can view all farm-user logs; Supervisor log visibility; event coverage; retention; export; tamper protection; and whether failed authorization attempts are included.

### 4.25 Search, filtering, sorting, and pagination

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | CONDITIONAL — public website content only | NO | NO | NO | NO | NO | NO |
| Prospective Customer | CONDITIONAL — public website content only | NO | NO | NO | NO | NO | NO |
| Super Admin | CONDITIONAL — platform customer/workspace records only | NO | NO | NO | NO | NO | NO |
| Farm Admin | YES — searchable records in assigned workspace, subject to each resource permission | NO | NO | NO | NO | NO — export governed by Section 4.22 | NO |
| Farm Supervisor | CONDITIONAL — only permitted operational records; payroll/finance and other restricted records excluded | NO | NO | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — query only records authorized for the requesting actor or defined job | NO | NO | NO | NO | NO | NO |
| Email delivery service | NO | NO | NO | NO | NO | NO | NO |

Search does not create an independent permission to access data. Search indexes, autocomplete, counts, filters, sort fields, pagination totals, and snippets must enforce the same record- and field-level restrictions as direct reads.

### 4.26 Password reset, password change, and optional email OTP

| Role | View | Create | Edit | Delete | Approve | Export | Archive |
|---|---|---|---|---|---|---|---|
| Guest | NO | CONDITIONAL — request password reset for an existing account using the approved reset flow; must not reveal account existence | NO | NO | NO | NO | NO |
| Prospective Customer | NO | CONDITIONAL — same reset request only if already provisioned as an account; inquiry status alone grants no account | NO | NO | NO | NO | NO |
| Super Admin | CONDITIONAL — own authentication state only | CONDITIONAL — request own password reset/change | CONDITIONAL — change own password | NO | NO | NO | NO |
| Farm Admin | CONDITIONAL — own authentication state only | CONDITIONAL — request own password reset/change | CONDITIONAL — change own password | NO | NO | NO | NO |
| Farm Supervisor | CONDITIONAL — own authentication state only | CONDITIONAL — request own password reset/change | CONDITIONAL — change own password | NO | NO | NO | NO |
| Worker (record-only) | NO | NO | NO | NO | NO | NO | NO |
| System / scheduled automation | CONDITIONAL — validate reset request and one-time token/OTP under approved rules | CONDITIONAL — issue reset token or optional OTP only through the approved flow | CONDITIONAL — update credential state after successful verification | NO | NO | NO | NO |
| Email delivery service | NO | CONDITIONAL — deliver password-reset/optional OTP email supplied by the application | NO | NO | NO | NO | NO |

**Open Questions:** Password complexity, lockout, token/OTP expiry and rate limits, mandatory vs optional OTP by role, Super Admin OTP, session expiration, and first-login activation/password-change rules.

## 5. System / automated actor boundaries

The System / scheduled automation actor may perform only these narrowly scoped operations:

| Automated process | Permitted operation | Explicit boundary |
|---|---|---|
| Unique ID generator | Generate unique internal animal identifiers | Only during an authorized animal registration; workspace-scoped uniqueness/identifier policy to be finalized. |
| Animal grouping suggestion | Produce suggested group assignment | Suggestion only; Farm Admin retains the confirmed override authority. |
| Milk total calculation | Calculate animal daily totals and farm totals | Derived values only; use records from one workspace and approved missing-session rules. |
| Production-drop detector | Evaluate the three-day average and 15% threshold | Must not run until the pending mathematical definition is approved; alert only to authorized recipients. |
| Milk stock calculator | Apply derived stock movement for recorded collection/sale/usage/wastage | Only for operation types and reversal rules approved by the client; never bypass stock policy. |
| Inventory threshold/expiry checker | Evaluate configured minimum stock and expiry reminders | Workspace-scoped; notification recipients must be authorized. |
| Feeding suggestion process | Generate suggestions from approved parameters | No unapproved nutritional prescription; no automatic inventory deduction until confirmed. |
| Payroll calculator | Calculate payroll-derived values and payslip output | Only after formulas and payroll rules are approved; cannot initiate actual salary transfer. |
| Financial analytics process | Calculate dashboard/report summaries | Derived summaries only; Farm Admin-only data must not leak to Supervisors. |
| Notification scheduler | Create configured reminder/alert records | Respect severity, role, workspace, channel, and recipient permissions. |
| Backup process | Execute configured automatic/manual backup jobs | Only configured data/storage targets; restore/delete permissions remain unresolved. |
| Import/export processor | Process an authorized Farm Admin job | Enforce initiating user's workspace and record permissions row by row; no implicit service bypass. |
| Activity logger | Record basic user/action/date-time events | Application users cannot edit log entries; coverage and retention need approval. |
| Email delivery service | Deliver application-supplied messages | No independent search, read, export, or modification access to application records. |

## 6. Actions that must be audit-logged

The SRS explicitly requires basic activity logs containing **user, action, and date/time**. The following event coverage is the minimum recommended interpretation for security-sensitive and material operations. The SRS does not explicitly enumerate every event below, so coverage beyond the basic log fields must be approved.

### 6.1 Required baseline events

- Successful and failed authentication attempts, password changes, and password-reset completion (security events; detailed coverage is an Open Question).
- Customer registration and customer-record changes.
- Workspace creation, suspension, and any later-approved reactivation.
- Farm Admin provisioning and Supervisor access provisioning/management.
- Role, workspace association, or access-status changes.
- Farm settings and notification configuration changes.
- Create/edit/delete/archive attempts and successful mutations for farm records, including animal, health, production, milk stock/sales/wastage, inventory, feeding, worker, attendance, leave, payroll, finance, and equipment records.
- Leave approve/reject decisions, including actor and decision.
- Inventory stock adjustments, including required reason and resulting stock.
- Attendance corrections.
- Payroll adjustments, advance/deduction changes, salary payment recording, and payslip generation/reissue where supported.
- Financial income/expense creation or any later-approved correction/deletion.
- Data import/export initiation, completion, failure, and record counts where available.
- Backup configuration changes and backup job initiation/completion/failure.
- Notification creation, recipient selection, delivery outcome, and read/unread changes where supported.
- Denied authorization attempts, cross-workspace access attempts, and attempts to use restricted Supervisor functions (coverage is an Open Question).
- Automated job execution and failure for calculations, alerts, reminders, imports/exports, and backups.

### 6.2 Minimum event fields

The confirmed minimum is:
- Actor/user (or service identity for automation).
- Action.
- Date/time.

The following fields are recommended but not confirmed by the SRS and are therefore Open Questions: workspace ID; resource type and record ID; outcome (success/denied/failure); reason; request/correlation ID; source IP/device; before/after values; changed-field list; export/import scope; and automated job identifier.

**Do not implement advanced before-and-after change tracking as an assumed requirement:** the SRS explicitly excludes advanced before-and-after audit tracking. A basic event log is in scope; richer audit evidence requires approval.

## 7. Open questions and conservative defaults

The following unresolved items affect authorization. Until answered, apply the stated default.

| ID | Open question from / arising from SRS | Conservative default until approved |
|---|---|---|
| OQ-01 | Can one customer own multiple workspaces? | Do not allow multi-workspace access or infer shared access. |
| OQ-02 | Can a farm have multiple Farm Admin accounts? | Provision only the explicitly requested Farm Admin account; do not assume additional Admin provisioning is supported. |
| OQ-03 | Can one user access multiple workspaces? | One explicitly associated workspace per account unless a multi-workspace association is approved. |
| OQ-04 | Can Super Admin access customer operational/financial data for support? | NO access to farm operational or financial records. Platform customer/workspace administration only. |
| OQ-05 | What customer fields are mandatory? | Do not invent required customer fields; validate only approved fields. |
| OQ-06 | Workspace reactivation/restoration authority and process? | No self-service or inferred reactivation; keep restoration unavailable until specified. |
| OQ-07 | Account activation, temporary credentials, and first-login password change? | Use only an approved provisioning/reset flow; do not send passwords in email. |
| OQ-08 | Password complexity, lockout, session expiration, and role-specific OTP policy? | Enforce baseline secure implementation choices only after technical/security approval; do not claim an SRS-defined policy. |
| OQ-09 | Supervisor account creation/edit/revocation details? | Farm Admin may manage Supervisor access at the scope stated, but unconfirmed account deletion/role elevation is NO. |
| OQ-10 | Supervisor animal-entry and animal-view scope? | Only explicitly permitted operational actions; no archive, delete, or unconfirmed edit. |
| OQ-11 | Supervisor health severity levels and edit/delete rights? | No edit/delete; create only the health entry types and severity levels approved before release. |
| OQ-12 | Supervisor access to worker profiles/documents? | Attendance-related minimum only; no full profile or document access. |
| OQ-13 | Supervisor production view/history and production correction? | Permitted entry only; no edit, delete, or export. |
| OQ-14 | Supervisor access to milk collection/storage/usage? | NO until a specific operation is confirmed. Milk sales remain Farm Admin-only. |
| OQ-15 | Can milk sales be edited, cancelled, returned, or exceed stock? | No sale cancellation/reversal or negative stock unless explicit rules are approved. |
| OQ-16 | Can inventory usage deduct stock immediately; can stock be negative? | Do not apply an unconfirmed deduction rule; reject/avoid negative stock until policy is approved. |
| OQ-17 | Do feeding records deduct inventory? | NO automatic deduction until confirmed. |
| OQ-18 | Can Supervisors edit previously submitted attendance/feeding/maintenance/health records? | NO; create-only for the confirmed entry operations. |
| OQ-19 | Attendance multiple entries, holidays, late rules, leave precedence, overtime rules? | Do not infer calculations or permit unconfirmed correction workflows. |
| OQ-20 | Leave rejection handling and leave-record editing/deletion? | Farm Admin may approve/reject; other workflow changes remain NO until specified. |
| OQ-21 | Payroll formulas, finalization, reopening, correction, and payslip reissue? | No automated finalization/reopening or post-generation correction without approved rules. |
| OQ-22 | Payroll approval/release chain? | No separate approval role or approval step is inferred; Farm Admin manages payroll as stated. |
| OQ-23 | Financial transaction edit/delete rules and unpaid-sale accounting treatment? | Farm Admin may create and view; edit/delete remain NO pending rules. |
| OQ-24 | Super Admin access to farm financial records? | NO. |
| OQ-25 | Dashboard customization persistence and Supervisor customization? | Farm Admin may customize supported widgets; persistence model and Supervisor customization remain unresolved. |
| OQ-26 | Supervisor operational reports and exports? | View only where explicitly exposed; export NO. |
| OQ-27 | Importable resources, duplicate handling, partial import, and row-level errors? | Farm Admin only; validate all rows and enforce the same record permissions; do not silently overwrite. |
| OQ-28 | Super Admin platform-level import/export scope? | NO until defined. |
| OQ-29 | Backup restore authority, retention, deletion, and download? | No user restore, download, or delete permission until defined. |
| OQ-30 | Activity log visibility, coverage, retention, and export? | System writes basic logs; user visibility/export remains NO unless specified. |
| OQ-31 | Soft vs permanent deletion, retention, and linked-record behavior? | Permanent deletion NO; soft deletion only where specifically implemented and authorized. |
| OQ-32 | Archive semantics for animals/equipment and relationship to lifecycle statuses? | Only the explicitly stated Farm Admin archive permissions; no Supervisor archive. |
| OQ-33 | Who can view/manage contact-form inquiries? | No inquiry-management permission is granted until specified. |
| OQ-34 | Notification acknowledgement, dismissal, deletion, and preferences per user? | Read/unread only as confirmed; no delete/dismiss/acknowledge workflow assumed. |
| OQ-35 | Failed email delivery retries and detailed delivery visibility? | Email service delivers only supplied payload; no access to records or independent retry policy. |
| OQ-36 | Exact audit event coverage and whether denied attempts are logged? | Record minimum user/action/date-time; obtain approval for expanded coverage. |
| OQ-37 | Can Super Admin inspect farm logs or restore backups for support? | NO pending explicit support-access policy. |
| OQ-38 | Can a worker access their own records or payslip? | NO; worker login is explicitly excluded. |
| OQ-39 | Are there other human or integration roles (veterinarian, accountant, external API client)? | NO access; no such role is specified. |

## 8. Implementation requirements for server enforcement

1. Centralize authorization checks in backend services/policies rather than duplicating ad hoc checks in UI components.
2. Resolve the authenticated principal, role, account status, workspace association, and workspace status from trusted server-side identity/context. Never accept role or workspace authority from request-body fields.
3. Apply workspace scoping to every database query and mutation. Prefer query patterns that include the authorized workspace predicate rather than fetching globally and checking later.
4. Verify ownership of every referenced parent and child resource, including attachments, imported references, report inputs, and bulk-operation IDs.
5. Apply action-level authorization for read, create, update, delete, approve, export, and archive independently.
6. Apply field-level restrictions where a role may see a record but not all fields. In particular, never include finance/payroll fields in Supervisor API responses, dashboard aggregates, search results, exports, or notifications.
7. Treat exports and downloads as protected read operations. Re-check authorization when the file is generated and when it is downloaded.
8. Treat import jobs as delegated operations: store the initiating actor and workspace, validate each row and referenced record, enforce the initiator's permissions, and record the outcome.
9. Treat background jobs as separate service principals with explicit allowlists. A job must carry a workspace context and must not use an unrestricted cross-tenant database credential.
10. Enforce workspace suspension on every request and background workflow that serves customer access. Do not rely only on login-time checks or client-side session state.
11. Prevent insecure direct object reference (IDOR) behavior: changing a record ID, workspace ID, file ID, or export ID must not expose another workspace's data.
12. Deny by default. If a permission or condition is not explicitly defined, reject the operation and raise the relevant Open Question rather than inferring access.
13. Return safe authorization errors without leaking whether another workspace's record exists.
14. Test each matrix row/action with positive, negative, cross-workspace, suspended-workspace, and direct-API cases.
15. Keep authorization tests in the automated test suite and update them whenever this matrix changes.

## 9. Approval and change control

This matrix is derived from SRS v1.0 and is intentionally conservative. It is not approval of unresolved assumptions. Before implementation sign-off:

- Client/product owner must answer the Open Questions that affect required workflows.
- Product and engineering must approve any change from `NO` to `YES` or any expanded `CONDITIONAL` permission.
- Security review must verify workspace isolation, financial/payroll confidentiality, export/download protection, and background-job least privilege.
- Every approved change must update this matrix, the SRS, API authorization policy, and relevant acceptance/security tests.

**Baseline rule:** Until a change is approved, `NO` remains `NO`.
