# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## SmartFarm Dairy Management System

**Document Version:** 1.0  
**Document Type:** Software Requirements Specification  
**Project:** SmartFarm Dairy Management System  
**Prepared:** 22 November 2026  
**Project Status:** Requirements Baseline – Pending Final Clarifications  
**Reference Documents:** 
- SmartFarm Product Discovery Analysis
- SmartFarm Scope of Work & Quotation – Version 1.0
- SmartFarm Software Development Agreement – Version 1.0

---

# 1. Project Overview

## 1.1 Product Description

SmartFarm is a web-based dairy farm management and analytics platform designed to digitize traditional dairy farm operations and centralize operational, animal, workforce, inventory, and financial records.

The system will replace manual paper-based recordkeeping with a centralized digital platform that enables farm owners and supervisors to manage daily operations, maintain historical records, automate calculations, monitor farm performance, and generate reports.

The platform will support multiple customer farm workspaces with isolated customer data.

## 1.2 System Interfaces

The system consists of three primary interfaces:

### A. Public Landing Page
A public-facing website that introduces SmartFarm, presents its features and benefits, explains how the platform works, and allows prospective customers to submit inquiries.

### B. Super Admin Panel
A platform-level management interface used by the software owner to:
- Register customers.
- Create farm workspaces.
- Provision Farm Admin accounts.
- Manage customer access.
- Suspend customer workspaces.
- Control platform-level access.

### C. Private Farm Management Application
A private application providing separate experiences for:
- Farm Admin.
- Farm Supervisor.

The application will support animal management, milk production, animal health, inventory, feeding, workers, attendance, payroll, finances, equipment, reporting, dashboards, and notifications.

## 1.3 Business Model

The confirmed business model is a one-time software sale.

The following are outside the current scope:
- Recurring subscriptions.
- Automatic subscription renewals.
- Public self-registration.
- Online payment checkout.
- Automatic customer purchasing and workspace provisioning.

Customer registration and workspace provisioning will be performed manually by the Super Admin.

## 1.4 Product Scope Boundary

This SRS covers only functionality included in the approved Scope of Work & Quotation.

Unconfirmed requirements will be identified separately and must not automatically become development commitments.

---

# 2. Project Objectives

The primary objectives are:

**OBJ-01:** Digitize traditional dairy farm records.

**OBJ-02:** Centralize animal profiles and lifecycle histories.

**OBJ-03:** Automate morning, evening, daily, and farm-level milk calculations.

**OBJ-04:** Detect unusual milk production reductions.

**OBJ-05:** Maintain animal health, treatment, vaccination, and veterinary records.

**OBJ-06:** Manage feed, medicine, and other inventory.

**OBJ-07:** Organize feeding plans and actual feeding records.

**OBJ-08:** Maintain worker records, attendance, leave, and payroll.

**OBJ-09:** Record farm income, expenses, and profitability.

**OBJ-10:** Maintain equipment and maintenance histories.

**OBJ-11:** Provide role-specific dashboards and reports.

**OBJ-12:** Automate configured reminders and notifications.

**OBJ-13:** Protect customer information through workspace-level data isolation.

**OBJ-14:** Provide responsive access across desktop, laptop, tablet, and smartphone browsers.

---

# 3. Target Users

| Target User | Description |
|---|---|
| Software Owner | Owns and operates the SmartFarm platform |
| Super Admin | Manages customers, workspaces, and platform access |
| Farm Owner / Manager | Uses Farm Admin functionality |
| Farm Admin | Manages all permitted farm operations |
| Farm Supervisor | Performs permitted daily operational activities |
| Prospective Customer | Visits the public website and submits inquiries |

Workers are represented as farm records. They will not receive individual application login accounts.

---

# 4. User Roles

## 4.1 Super Admin

The Super Admin manages the overall SmartFarm platform.

Responsibilities:
- Authenticate into the Super Admin Panel.
- Register customers.
- Create customer farm workspaces.
- Provision Farm Admin accounts.
- Manage customer access.
- Suspend customer workspaces.
- Control platform-level access.

The Super Admin does not routinely perform farm operational management.

**Open Question:** Whether the Super Admin can access customer operational or financial information for support purposes remains unconfirmed.

## 4.2 Farm Admin

The Farm Admin has full administrative access within the assigned farm workspace.

Responsibilities:
- Manage farm settings.
- Manage animals and lifecycle records.
- Manage animal health.
- Manage milk production and milk sales.
- Manage inventory and feeding plans.
- Manage workers and attendance corrections.
- Approve or reject leave.
- Manage payroll.
- Manage farm finances.
- Manage equipment.
- Configure notifications.
- View dashboards and reports.
- Manage Supervisor access.
- Manage imports, exports, and backup configuration.

## 4.3 Farm Supervisor

The Farm Supervisor performs permitted daily operational activities.

Responsibilities:
- View operational dashboards.
- Enter permitted animal records.
- Enter milk production records.
- Record permitted health information.
- View feeding plans.
- Record actual feeding.
- Record worker attendance and check-in/check-out.
- View equipment.
- Record equipment maintenance and usage.
- Perform other permitted operational activities.

### Supervisor Restrictions

The Supervisor cannot:
- Access farm financial information.
- Manage payroll.
- Approve or reject leave.
- Correct inventory stock.
- Manage farm settings.
- Archive animals.
- Receive High/Critical animal health alerts.

## 4.4 Worker

Workers do not have individual application accounts.

Their information is maintained through the Worker Management module.

---

# 5. Functional Requirements

Functional requirements describe what the system must do.

## 5.1 Public Website Requirements

### FR-WEB-001: Landing Page
The system shall provide a public SmartFarm landing page.

### FR-WEB-002: Product Introduction
The website shall display an introduction to SmartFarm and its purpose.

### FR-WEB-003: Features
The website shall present the main features of the platform.

### FR-WEB-004: How It Works
The website shall explain the customer onboarding and software usage process.

### FR-WEB-005: Benefits
The website shall present the benefits of using SmartFarm.

### FR-WEB-006: Dashboard Preview
The website shall display a visual preview of the management application.

### FR-WEB-007: Contact Form
The website shall allow prospective customers to submit inquiries.

### FR-WEB-008: Public Access Boundary
Public visitors shall not be able to access private management interfaces without authentication.

### FR-WEB-009: No Public Registration
The website shall not provide customer self-registration or automatic workspace creation.

### FR-WEB-010: No Online Checkout
The website shall not provide online purchasing or payment checkout.

## 5.2 Super Admin Requirements

### FR-SA-001: Super Admin Authentication
The system shall provide authenticated access to the Super Admin Panel.

### FR-SA-002: Customer Registration
The Super Admin shall be able to register customers.

### FR-SA-003: Customer Management
The Super Admin shall be able to view and manage customer records.

### FR-SA-004: Workspace Creation
The Super Admin shall be able to create a farm workspace for a registered customer.

### FR-SA-005: Farm Admin Provisioning
The Super Admin shall be able to provision a Farm Admin account.

### FR-SA-006: Customer Access Management
The Super Admin shall be able to manage customer access to the platform.

### FR-SA-007: Workspace Suspension
The Super Admin shall be able to suspend a customer workspace.

### FR-SA-008: Suspended Workspace Protection
Suspension shall prevent the affected customer from accessing the suspended workspace.

Existing customer records shall be preserved when a workspace is suspended, according to the approved scope.

### FR-SA-009: Platform Isolation
Super Admin operations shall remain separate from routine farm operational activities.

**Open Questions:**
- Can a customer have multiple farm workspaces?
- Can a farm have multiple Farm Admin accounts?
- Can a user access multiple workspaces?
- What customer information is mandatory during registration?
- Can the Super Admin access customer data for support?

## 5.3 Farm Workspace Requirements

### FR-WS-001: Isolated Workspace
Each customer shall receive an isolated farm workspace.

### FR-WS-002: Workspace Association
Farm Admin and Supervisor accounts shall be associated with their permitted farm workspace.

### FR-WS-003: Workspace Access
Users shall only access workspaces for which they have authorization.

### FR-WS-004: Workspace Suspension
Suspended workspaces shall not be accessible to their affected customer users.

### FR-WS-005: Workspace Configuration
Farm-specific settings shall be maintained within the relevant workspace.

---

## 5.4 Animal Management Requirements

### FR-AN-001: Animal Registration
Farm Admin shall be able to register animals.

### FR-AN-002: Animal Information
Animal records shall support:
- Animal name.
- Breed.
- Gender.
- Birth date or estimated age.
- Animal category/group.
- Ear-tag number.
- Automatically generated internal unique ID.

### FR-AN-003: Unique Internal ID
The system shall generate a unique internal identifier for each registered animal.

### FR-AN-004: Ear-Tag Validation
The system shall prevent duplicate ear-tag numbers within the same farm workspace.

### FR-AN-005: Animal Profiles
The system shall maintain an individual profile for each animal.

### FR-AN-006: Animal Grouping
The system shall provide automatic animal group suggestions.

### FR-AN-007: Group Override
Farm Admin shall be able to override suggested animal group assignments.

### FR-AN-008: Purchase Records
The system shall maintain animal purchase records.

### FR-AN-009: Sale Records
The system shall maintain animal sale records.

### FR-AN-010: Calf Registration
The system shall support calf registration linked to its mother and known father.

### FR-AN-011: Lifecycle Status
The system shall support:
- Active.
- Sold.
- Deceased.
- Removed.

### FR-AN-012: Lifecycle History
The system shall maintain animal status-change dates and reasons.

### FR-AN-013: Weight Records
The system shall maintain historical animal weight records.

### FR-AN-014: Weight Graphs
The system shall display historical weight information graphically.

### FR-AN-015: Animal Attachments
The system shall support animal photographs and document attachments.

### FR-AN-016: Animal History
Animal-related historical information shall remain associated with the relevant animal record.

**Open Questions:**
- Can ear-tag numbers be changed?
- What determines automatic group suggestions?
- Can animals be transferred between farms?
- Can a sold animal be registered again?
- Can a calf be registered without a known mother?
- What file formats and attachment-size limits are permitted?

---

## 5.5 Animal Health Management Requirements

### FR-HE-001: Health Records
The system shall allow permitted users to record animal health information.

### FR-HE-002: Severity Classification
Health records shall support:
- Low.
- Moderate.
- High.
- Critical.

### FR-HE-003: Critical Highlighting
Critical health conditions shall receive prominent visual highlighting.

### FR-HE-004: Treatment Records
Treatment records shall support:
- Diagnosis.
- Symptoms.
- Medication.
- Dosage.
- Treatment dates.
- Veterinarian information.
- Treatment cost.
- Follow-up instructions.

### FR-HE-005: Vaccination Records
The system shall maintain vaccination records.

### FR-HE-006: Vaccination Due Dates
Vaccination records shall support next due dates.

### FR-HE-007: Vaccination Reminders
The system shall generate configured upcoming and overdue vaccination reminders.

### FR-HE-008: Veterinary Appointments
The system shall maintain veterinary appointment records.

### FR-HE-009: Disease History
The system shall maintain animal disease histories.

### FR-HE-010: Health Notifications
High and Critical health alerts shall be delivered to Farm Admin users through in-app and email channels.

### FR-HE-011: Supervisor Alert Restriction
Supervisors shall not receive High/Critical health notifications.

**Open Questions:**
- Which severity levels can Supervisors record?
- Can Supervisors edit or delete submitted health records?
- How frequently should overdue reminders repeat?
- Are vaccination schedules configurable?
- What breeding records and reminders are required?

---

## 5.6 Milk Production Requirements

### FR-MP-001: Morning Production
The system shall allow recording morning milk production for individual animals.

### FR-MP-002: Evening Production
The system shall allow recording evening milk production for individual animals.

### FR-MP-003: Daily Animal Total
The system shall automatically calculate daily milk production for each animal from its morning and evening records.

### FR-MP-004: Farm Total
The system shall automatically calculate total farm production from individual animal daily totals.

### FR-MP-005: Milk Quantity
Milk quantities shall support litres with flexible numerical precision.

### FR-MP-006: No Unit Conversion
The system shall not automatically convert measurement units.

### FR-MP-007: Milk Quality
Milk quality shall support:
- Good.
- Average.
- Poor.

### FR-MP-008: Production History
The system shall maintain historical milk production records.

### FR-MP-009: Daily Reports
The system shall provide daily farm-level milk production reports.

### FR-MP-010: Monthly Reports
The system shall provide monthly farm-level milk production reports.

### FR-MP-011: Production Aggregation
Farm totals shall reflect the production records belonging to the selected farm workspace.

**Open Questions:**
- Can submitted production entries be edited?
- How are missed sessions represented?
- How are late entries handled?
- How are corrected historical production records processed?

---

## 5.7 Milk Storage, Sales, and Wastage Requirements

### FR-MS-001: Milk Collection
The system shall support milk collection records.

### FR-MS-002: Milk Storage
The system shall support milk storage records for tanks or containers.

### FR-MS-003: Available Milk Stock
The system shall maintain available milk stock based on recorded collection, sales, usage, and wastage operations.

### FR-MS-004: Milk Usage
The system shall support recording permitted milk usage.

### FR-MS-005: Milk Sales
The system shall allow Farm Admin to record milk sales.

### FR-MS-006: Customer Information
Milk sale records shall support customer details.

### FR-MS-007: Sale Details
Each sale shall support:
- Sale date.
- Quantity.
- Price.
- Customer.
- Payment method.
- Payment status.

### FR-MS-008: Default Milk Price
Farm Admin shall be able to configure a default milk price.

### FR-MS-009: Manual Price Adjustment
Farm Admin shall be able to adjust the price for individual sales.

### FR-MS-010: Payment Status
Milk sales shall support:
- Paid.
- Unpaid.

### FR-MS-011: Automatic Stock Deduction
Recorded milk sales shall automatically deduct their quantities from available milk stock.

### FR-MS-012: Wastage Records
The system shall support milk wastage records.

### FR-MS-013: Wastage Financial Loss
The system shall calculate an estimated financial loss for recorded wastage.

### FR-MS-014: Wastage Stock Deduction
Recorded milk wastage shall automatically reduce available milk stock.

Partial milk payments and outstanding-balance calculations are excluded.

**Open Questions:**
- Can sales exceed available stock?
- Can sales be cancelled?
- How are returned sales handled?
- Can milk move between storage tanks?
- How is internal milk consumption recorded?
- How is milk allocated to individual storage locations?

---

## 5.8 Milk Production Automation Requirements

### FR-AU-001: Automatic Calculation
The system shall automatically calculate individual animal and farm-level milk totals.

### FR-AU-002: Production Drop Detection
The system shall evaluate animal milk production against a rolling three-day average.

### FR-AU-003: Drop Threshold
A reduction of 15% or more shall trigger a production-drop alert.

### FR-AU-004: Production Alerts
The system shall generate configured alerts when the approved detection rule is satisfied.

### FR-AU-005: Alert Delivery
Configured production alerts shall be available through the approved in-app and email notification channels.

**Pending Mathematical Definition:**

The following must be approved before implementation:
- Whether the average uses the previous three calendar days or recorded production days.
- Whether the comparison uses daily totals or individual milking sessions.
- How missing production records are treated.
- When an alert is generated.
- Whether duplicate alerts are suppressed.
- Whether alerts can be acknowledged or dismissed.

The 15% threshold is confirmed. The remaining mathematical and alert-handling details are not yet confirmed.

---

## 5.9 Inventory Management Requirements

### FR-IN-001: Inventory Registration
Farm Admin shall be able to register inventory items.

### FR-IN-002: Inventory Categories
The system shall support:
- Feed.
- Medicines.
- Other supplies.

### FR-IN-003: Inventory Information
Each inventory item shall support:
- Item name.
- Category.
- Quantity.
- Unit.
- Minimum stock level.
- Current stock.

### FR-IN-004: Inventory Purchases
The system shall support full inventory purchase records.

### FR-IN-005: Quick Stock Addition
The system shall support quick stock additions.

### FR-IN-006: Stock Adjustment
Only Farm Admin shall be permitted to correct inventory stock.

### FR-IN-007: Adjustment Reason
Stock adjustments shall require a reason.

### FR-IN-008: Adjustment History
The system shall maintain stock adjustment history.

### FR-IN-009: Expiry Dates
Inventory records shall support optional expiry dates.

### FR-IN-010: Expiry Reminders
The system shall support configured expiry reminders.

### FR-IN-011: Low Stock Warnings
The system shall generate low-stock warnings when inventory reaches or falls below its configured minimum level.

### FR-IN-012: Supervisor Usage
Supervisors shall be able to record permitted daily inventory usage.

### FR-IN-013: Stock Correction Restriction
Supervisors shall not be allowed to perform stock corrections.

**Open Questions:**
- Does every usage entry deduct stock immediately?
- Can stock become negative?
- How are expired or damaged items handled?
- Can inventory units be customized?
- Are feeding records automatically connected to inventory deductions?

---

## 5.10 Feeding Management Requirements

### FR-FD-001: Feeding Plans
Farm Admin shall be able to create feeding plans.

### FR-FD-002: Feeding Plan Assignment
Feeding plans shall support assignment to animals or animal groups.

### FR-FD-003: Feeding Plan Information
Feeding plans shall support:
- Animal or group.
- Feed items.
- Quantities.
- Units.
- Feeding times.
- Effective dates.

### FR-FD-004: Feeding Schedule
The system shall support default morning and evening schedules.

### FR-FD-005: Custom Schedules
The system shall support custom feeding schedules.

### FR-FD-006: Feeding Suggestions
The system shall provide nutritional allocation suggestions based on available animal parameters, including age and breed.

### FR-FD-007: Admin Control
Farm Admin shall control feeding plans and permitted overrides.

### FR-FD-008: Supervisor Plan Access
Supervisors shall be able to view their permitted feeding plans.

### FR-FD-009: Actual Feeding Records
Supervisors shall be able to record actual feeding activities.

**Open Questions:**
- What nutritional formulas determine recommendations?
- Which additional animal parameters are required?
- Can plans contain multiple feed items?
- Can feeding plans differ by day?
- Can Supervisors record feeding outside assigned schedules?
- Does actual feeding deduct inventory?

Nutritional recommendations shall not be treated as veterinary or scientifically validated prescriptions without approved business rules.

---

## 5.11 Worker Management Requirements

### FR-WK-001: Worker Registration
Farm Admin shall be able to register workers.

### FR-WK-002: Worker Profiles
The system shall maintain worker profiles.

### FR-WK-003: Worker Documents
The system shall support worker document attachments, including:
- CNIC.
- Agreements.
- Certificates.
- Other permitted documents.

### FR-WK-004: CNIC Validation
The system shall prevent duplicate CNIC values within the applicable farm workspace.

### FR-WK-005: Worker Login Exclusion
The system shall not create individual worker login accounts.

### FR-WK-006: Worker Records
Worker information shall be available to authorized farm users according to their permissions.

---

## 5.12 Attendance and Leave Requirements

### FR-AT-001: Attendance Recording
The system shall support daily attendance recording.

### FR-AT-002: Attendance Information
Attendance records shall support:
- Worker.
- Date.
- Check-in.
- Check-out.
- Present.
- Absent.
- Late.
- Leave.

### FR-AT-003: Supervisor Attendance
Supervisors shall be able to record permitted worker attendance.

### FR-AT-004: Check-in/Check-out
The system shall support check-in and check-out records.

### FR-AT-005: Attendance Correction
Farm Admin shall be able to review and correct attendance records.

### FR-AT-006: Leave Records
Leave records shall support:
- Worker.
- Leave type.
- Start and end dates.
- Reason.
- Approval status.
- Paid/unpaid classification.

### FR-AT-007: Leave Approval
Farm Admin shall be able to approve or reject leave.

### FR-AT-008: Overtime Records
The system shall support recording overtime dates, hours, and history.

### FR-AT-009: Leave Approval Restriction
Supervisors shall not be allowed to approve or reject leave.

Advanced overtime payment calculations are excluded.

**Open Questions:**
- Can a worker have multiple attendance entries per day?
- How is late arrival calculated?
- How are rejected leave records handled?
- Can Supervisors correct previously submitted attendance?
- How are holidays and weekly rest days handled?

---

## 5.13 Payroll Management Requirements

### FR-PR-001: Salary Structures
The system shall support monthly salary and daily wage structures.

### FR-PR-002: Worker Salary Configuration
Farm Admin shall select the applicable salary structure for each worker.

### FR-PR-003: Payroll Records
The system shall maintain payroll records.

### FR-PR-004: Payroll Calculations
The system shall support attendance-based automatic salary calculations.

### FR-PR-005: Manual Adjustments
Farm Admin shall be able to make permitted manual payroll adjustments.

### FR-PR-006: Absence Deductions
The system shall support configurable absence-day deductions.

### FR-PR-007: Leave Rules
The system shall support configurable paid and unpaid leave rules.

### FR-PR-008: Partial Month Calculation
The system shall support calendar-day or working-day calculation options for partial months.

### FR-PR-009: Salary Advances
The system shall maintain worker salary advance records.

### FR-PR-010: Advance Recovery
The system shall support recovery through next-salary deductions or installments.

### FR-PR-011: Deductions
The system shall maintain payroll deductions.

### FR-PR-012: Salary Payments
The system shall maintain salary payment records.

### FR-PR-013: Payment Methods
The system shall support:
- Cash.
- Bank transfer.
- Mobile wallet.
- Custom payment method.

### FR-PR-014: Payment Frequency
The system shall support:
- Daily.
- Weekly.
- Biweekly.
- Monthly.

### FR-PR-015: Pending Salary and Balances
The system shall maintain applicable pending salary and balance information.

### FR-PR-016: Payslips
The system shall generate PDF and printable payslips.

### FR-PR-017: Payroll Access Restriction
Only Farm Admin shall access payroll management.

**Open Questions:**
- Exact monthly salary formulas.
- Exact daily wage formulas.
- Treatment of partial-day absences.
- Holiday and rest-day rules.
- Advance installment scheduling.
- Multiple payment entries.
- Payroll correction after payslip generation.
- Payroll reopening rules.

Tax, pension, and statutory deductions are not confirmed requirements.

---

## 5.14 Financial Management Requirements

### FR-FN-001: Financial Access
Only Farm Admin shall access farm financial information.

### FR-FN-002: Expense Records
Farm Admin shall be able to create expense records.

### FR-FN-003: Quick Expense Entry
The system shall support quick expense entry.

### FR-FN-004: Expense Categories
The system shall support predefined and Admin-created expense categories.

### FR-FN-005: Income Records
The system shall support income records.

### FR-FN-006: Income Sources
The system shall support:
- Milk sales.
- Animal sales.
- Manure sales.
- Breeding services.
- Miscellaneous income.

### FR-FN-007: Financial Summaries
The system shall calculate:
- Total income.
- Total expenses.
- Net profit/loss.

### FR-FN-008: Financial Periods
The system shall support:
- Daily.
- Weekly.
- Monthly.
- Custom date ranges.

### FR-FN-009: Financial Dashboard
The Farm Admin dashboard shall display:
- Income.
- Expenses.
- Profit/loss.
- Revenue categories.
- Unpaid milk sales.
- Recent transactions.

### FR-FN-010: Financial Reports
The system shall provide financial reports.

### FR-FN-011: Report Exports
Financial reports shall support PDF, Excel, and print formats.

### FR-FN-012: Financial Privacy
Financial data shall not be accessible to Farm Supervisors.

**Open Questions:**
- Cash-based versus sales-based reporting definitions.
- Treatment of unpaid sales in profit/loss reports.
- Integration of animal purchase costs.
- Integration of inventory purchases.
- Integration of veterinary costs.
- Transaction correction and deletion rules.
- Opening balances and historical financial records.

A formal accounting ledger and reconciliation system are not included in the approved scope.

---

## 5.15 Equipment Management Requirements

### FR-EQ-001: Equipment Registration
Farm Admin shall be able to register equipment.

### FR-EQ-002: Equipment Information
Equipment records shall support:
- Name.
- Type.
- Quantity.
- Condition.

### FR-EQ-003: Maintenance History
The system shall maintain maintenance records containing:
- Date.
- Description.
- Condition after repair.

### FR-EQ-004: Equipment Usage
The system shall maintain equipment usage records.

### FR-EQ-005: Supervisor Maintenance Entry
Supervisors shall be able to record maintenance activities.

### FR-EQ-006: Supervisor Condition Updates
Supervisors shall be able to update permitted equipment condition information.

### FR-EQ-007: Admin Equipment Management
Only Farm Admin shall edit or archive equipment records.

Maintenance provider/cost tracking and automated maintenance reminders are excluded.

**Open Questions:**
- Allowed equipment condition values.
- Whether one record represents multiple units.
- Whether maintenance attachments are required.
- Whether disposed equipment requires a separate status.

---

## 5.16 Dashboard Requirements

### FR-DB-001: Farm Admin Dashboard
The system shall provide a Farm Admin dashboard.

### FR-DB-002: Admin Dashboard Information
The dashboard shall display relevant:
- Animal information.
- Milk production.
- Health alerts.
- Vaccination reminders.
- Feeding information.
- Inventory information.
- Attendance.
- Financial analytics.
- Recent activities.

### FR-DB-003: Supervisor Dashboard
The system shall provide a separate Supervisor dashboard.

### FR-DB-004: Supervisor Information
The Supervisor dashboard shall display permitted operational information only.

### FR-DB-005: Widget Customization
Farm Admin shall be able to:
- Rearrange dashboard widgets.
- Select available metrics.
- Resize dashboard cards.
- Customize dashboard layout.

### FR-DB-006: Dashboard Persistence
Dashboard configuration persistence is required to be clarified before implementation.

**Open Questions:**
- Is dashboard customization per user or shared across a farm?
- Can users reset the default layout?
- Which metrics are available?
- What is the update frequency of dashboard metrics?

---

## 5.17 Notification and Automation Requirements

### FR-NT-001: In-App Notifications
The system shall provide in-app notifications.

### FR-NT-002: Email Notifications
The system shall support email notifications.

### FR-NT-003: Notification History
The system shall maintain basic notification history.

### FR-NT-004: Read/Unread Status
Notifications shall support read and unread status.

### FR-NT-005: Notification Configuration
Farm Admin shall be able to configure available notification types.

### FR-NT-006: Vaccination Reminders
The system shall generate configured vaccination reminders.

### FR-NT-007: Health Alerts
The system shall generate configured health alerts.

### FR-NT-008: Production Alerts
The system shall generate milk production-drop alerts according to the approved calculation rules.

### FR-NT-009: Low Stock Alerts
The system shall generate configured low-stock notifications.

### FR-NT-010: Scheduled Jobs
The system shall support scheduled background processing.

### FR-NT-011: Monthly Financial Analytics
The system shall support monthly financial analytics processing.

### FR-NT-012: Farm Timezone
Scheduled operations shall respect the configured farm timezone where applicable.

### FR-NT-013: Role-Based Delivery
Notifications shall respect user roles and notification access permissions.

### FR-NT-014: High/Critical Health Alert Restriction
High/Critical animal health notifications shall be delivered to Farm Admin users, not Supervisors.

**Open Questions:**
- Notification repetition and suppression.
- Acknowledgement and dismissal behavior.
- Per-user notification preferences.
- Email failure handling.
- Notification retry rules.
- Breeding reminder triggers.
- Whether critical notifications can be disabled.

Advanced notification analytics are excluded.

---

## 5.18 Farm Settings Requirements

### FR-ST-001: Farm Profile
Farm Admin shall be able to configure farm profile information.

### FR-ST-002: Units
Farm Admin shall be able to configure permitted measurement units.

### FR-ST-003: Currency
Farm Admin shall be able to configure farm currency.

### FR-ST-004: Timezone
Farm Admin shall be able to configure the farm timezone.

### FR-ST-005: Date and Time Format
Farm Admin shall be able to configure date and time display formats.

### FR-ST-006: Numeric Formatting
The system shall support Indian/Pakistani numeric grouping.

### FR-ST-007: Measurement Precision
The system shall support flexible measurement precision.

### FR-ST-008: Notification Preferences
Farm Admin shall be able to configure available notification preferences.

### FR-ST-009: Module Configuration
Farm Admin shall be able to manage permitted farm module settings.

### FR-ST-010: Language
The initial system language shall be English.

### FR-ST-011: No Unit Conversion
The system shall not automatically convert units.

---

## 5.19 Data Management Requirements

### FR-DM-001: Excel Import
The system shall support Excel data import.

### FR-DM-002: CSV Import
The system shall support CSV data import.

### FR-DM-003: Excel Export
The system shall support Excel export.

### FR-DM-004: CSV Export
The system shall support CSV export.

### FR-DM-005: Record Export
The system shall support exporting individual records and datasets where applicable.

### FR-DM-006: Automatic Backups
The system shall support automatic backups.

### FR-DM-007: Manual Backups
The system shall support manual backups.

### FR-DM-008: Backup Configuration
Farm Admin shall be able to configure available backup settings.

### FR-DM-009: Backup Storage Options
The requirements identify local and cloud backup storage options.

### FR-DM-010: Activity Logs
The system shall maintain basic activity logs containing:
- User.
- Action.
- Date/time.

### FR-DM-011: Soft Deletion
The system shall support soft deletion where applicable.

### FR-DM-012: Permanent Deletion
The system shall support permanent deletion where applicable.

### FR-DM-013: Deletion Confirmation
The system shall require confirmation before deletion.

**Open Questions:**
- Backup frequency.
- Backup retention.
- Recovery point and recovery time expectations.
- Who can restore backups?
- Data deletion after permanent workspace closure.
- Import duplicate handling.
- Import validation and error reporting.
- Activity log coverage for Super Admin and farm users.

---

# 6. Non-Functional Requirements

## 6.1 Usability

**NFR-USE-001:** The system shall provide a modern and professional user interface.

**NFR-USE-002:** The interface shall maintain consistent navigation and visual components.

**NFR-USE-003:** The interface shall use clear labels and understandable error messages.

**NFR-USE-004:** The system shall require confirmation before create, edit, delete, and archive actions.

**NFR-USE-005:** The system shall provide success and error feedback.

**NFR-USE-006:** Technical error details shall be accessible to authorized Admin users where appropriate.

**NFR-USE-007:** Forms shall provide required-field validation.

**NFR-USE-008:** The system shall provide helpful empty states.

**NFR-USE-009:** Pages, dashboards, and tables shall support skeleton loading states.

**NFR-USE-010:** Smaller actions shall provide appropriate loading indicators or spinners.

**NFR-USE-011:** Automatic form draft saving is not required.

## 6.2 Responsiveness

**NFR-RES-001:** The system shall support desktop browsers.

**NFR-RES-002:** The system shall support laptop screens.

**NFR-RES-003:** The system shall support tablets.

**NFR-RES-004:** The system shall support smartphone browsers.

**NFR-RES-005:** Navigation, forms, tables, dashboards, and dialogs shall adapt to supported screen sizes.

## 6.3 Browser Compatibility

**NFR-BR-001:** The system shall support modern versions of:
- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Apple Safari.

**NFR-BR-002:** Outdated browser support is excluded.

Exact minimum browser versions remain to be agreed.

## 6.4 Operational Availability

**NFR-OP-001:** The application shall operate online.

**NFR-OP-002:** An active internet connection shall be required.

**NFR-OP-003:** Offline data entry is not included.

**NFR-OP-004:** Offline synchronization is not included.

**NFR-OP-005:** Hosting availability and uptime targets remain unspecified.

## 6.5 Data Integrity

**NFR-DI-001:** The system shall maintain unique internal animal identifiers.

**NFR-DI-002:** Duplicate ear-tag numbers shall be prevented within a farm.

**NFR-DI-003:** Duplicate worker CNIC values shall be prevented within the applicable farm.

**NFR-DI-004:** Related records shall maintain valid associations.

**NFR-DI-005:** Calculated totals shall be consistent with their underlying records.

**NFR-DI-006:** Customer data shall remain isolated between workspaces.

## 6.6 Scalability

**NFR-SC-001:** The platform shall support multiple customer farm workspaces.

**NFR-SC-002:** The system shall support the expected operational growth of customer farms.

Maximum farm counts, animal counts, worker counts, and concurrent user numbers have not been specified.

These capacity targets must be confirmed before performance testing is finalized.

---

# 7. User Journeys

## 7.1 Prospective Customer Journey

1. User visits the SmartFarm website.
2. User views the product introduction.
3. User explores platform features and benefits.
4. User views the dashboard preview.
5. User opens the contact section.
6. User submits an inquiry.
7. The inquiry is received through the configured contact process.

## 7.2 Customer Onboarding Journey

1. Customer contacts SmartFarm.
2. Software owner discusses requirements.
3. Customer purchases the software.
4. Super Admin registers the customer.
5. Super Admin creates the farm workspace.
6. Super Admin provisions the Farm Admin account.
7. Customer receives login instructions.
8. Farm Admin signs in.
9. Farm Admin configures the farm.
10. Farm Admin adds operational records.
11. Farm Admin creates permitted Supervisor access.

## 7.3 Farm Admin Daily Operations Journey

1. Farm Admin signs in.
2. System verifies the account and workspace access.
3. Farm Admin views the dashboard.
4. Farm Admin reviews animal, health, production, and inventory information.
5. Farm Admin creates or updates operational records.
6. System validates submitted information.
7. System saves valid records.
8. Relevant calculations and configured notifications are processed.
9. Dashboard and reports reflect updated information.

## 7.4 Supervisor Daily Operations Journey

1. Supervisor signs in.
2. System verifies Supervisor permissions.
3. Supervisor views the operational dashboard.
4. Supervisor views permitted animals and operational records.
5. Supervisor records milk production, attendance, feeding, or permitted health information.
6. Supervisor views assigned feeding plans.
7. Supervisor records equipment maintenance or usage where permitted.
8. System validates and saves the information.
9. Supervisor receives an appropriate success or error message.

## 7.5 Milk Production Journey

1. Authorized user selects an animal.
2. User selects the production date.
3. User enters morning production.
4. User enters evening production.
5. User selects the applicable milk quality category.
6. System validates the values.
7. System calculates the animal's daily total.
8. System updates the farm production total.
9. System makes the updated information available in relevant dashboards and reports.
10. The automation process evaluates production-drop conditions according to approved rules.

## 7.6 Inventory and Feeding Journey

1. Farm Admin registers inventory items.
2. Farm Admin records purchases or stock additions.
3. Farm Admin configures minimum stock levels.
4. Farm Admin creates feeding plans.
5. Supervisor views permitted feeding plans.
6. Supervisor records actual feeding.
7. System saves feeding records.
8. Inventory adjustments occur only according to the final approved deduction rules.
9. Low-stock notifications are generated when configured conditions are met.

## 7.7 Worker and Payroll Journey

1. Farm Admin registers a worker.
2. Farm Admin selects the salary structure.
3. Supervisor records daily attendance.
4. Farm Admin reviews attendance.
5. Farm Admin corrects permitted attendance records.
6. Farm Admin records and reviews leave.
7. Farm Admin calculates applicable payroll.
8. Farm Admin reviews salary, deductions, advances, and balances.
9. Farm Admin records salary payments.
10. System generates a payslip.

The exact calculation sequence and formulas require final approval.

## 7.8 Financial Management Journey

1. Farm Admin opens the financial dashboard.
2. Farm Admin records income and expenses.
3. System maintains the recorded transactions.
4. System calculates financial summaries according to approved rules.
5. Farm Admin selects a reporting period.
6. Farm Admin reviews financial reports.
7. Farm Admin exports the report or prints it.

## 7.9 Workspace Suspension Journey

1. Super Admin identifies the relevant customer workspace.
2. Super Admin initiates suspension.
3. System requests confirmation.
4. Super Admin confirms the action.
5. System restricts affected customer access.
6. Existing customer records are preserved.
7. Access restoration rules remain subject to final confirmation.

---

# 8. Pages and Screen Requirements

## 8.1 Public Website

| Page / Section | Purpose |
|---|---|
| Hero | Introduce SmartFarm |
| About | Explain the product |
| Features | Present functionality |
| How It Works | Explain onboarding and usage |
| Benefits | Present business value |
| Dashboard Preview | Show product interface |
| Contact | Accept inquiries |
| Footer | Navigation and company information |

## 8.2 Super Admin Panel

| Page | Purpose |
|---|---|
| Super Admin Login | Authentication |
| Dashboard | Platform overview |
| Customer Management | Customer registration and records |
| Add Customer | Customer creation |
| Workspace Management | Farm workspace creation and management |
| Farm Admin Management | Account provisioning |
| Customer Access Management | Access control |
| Workspace Suspension | Restrict customer access |

The exact navigation and additional screens will be finalized during detailed UI/UX specification.

## 8.3 Farm Management Application

| Module | Pages / Views |
|---|---|
| Dashboard | Farm Admin Dashboard, Supervisor Dashboard |
| Animal Management | Animal List, Add/Edit Animal, Animal Profile, Lifecycle History, Weight History |
| Animal Health | Health Records, Treatments, Vaccinations, Veterinary Appointments, Disease History |
| Milk Production | Production Entry, Animal Production History, Daily Totals, Monthly Reports |
| Milk Management | Collection, Storage, Milk Sales, Wastage Records |
| Inventory | Inventory List, Item Details, Purchases, Stock Additions, Stock Adjustments |
| Feeding | Feeding Plans, Feeding Schedule, Actual Feeding Records |
| Workers | Worker List, Worker Profiles, Worker Documents |
| Attendance | Attendance Records, Check-in/Check-out, Leave Management |
| Payroll | Salary Management, Payroll Records, Advances, Deductions, Payslips |
| Finance | Income Records, Expense Records, Financial Dashboard, Financial Reports |
| Equipment | Equipment List, Equipment Details, Maintenance History, Usage Records |
| Notifications | Notification Center, Notification History |
| Reports | Milk Reports, Financial Reports, Available Data Exports |
| Settings | Farm Profile, Units, Currency, Timezone, Preferences, Notifications, Configuration |
| Data Management | Import, Export, Backup Configuration, Activity Logs |

---

# 9. Features

The system shall provide the following major feature groups:

1. Public SmartFarm website.
2. Customer management.
3. Farm workspace provisioning.
4. Role-based authentication and authorization.
5. Workspace data isolation.
6. Animal profile management.
7. Animal lifecycle management.
8. Animal health and vaccination management.
9. Milk production tracking.
10. Milk collection and storage.
11. Milk sales and wastage tracking.
12. Milk production calculations.
13. Milk production-drop detection.
14. Inventory management.
15. Feeding plans and actual feeding.
16. Worker management.
17. Attendance and leave management.
18. Payroll management.
19. Farm financial management.
20. Equipment management.
21. Farm Admin and Supervisor dashboards.
22. Reports and exports.
23. Notifications and reminders.
24. Farm settings.
25. Data imports and exports.
26. Backup and activity log functionality.

---

# 10. Admin Requirements

## 10.1 Super Admin Requirements

The Super Admin shall be able to:
- Log in securely.
- Register customers.
- View and manage customer records.
- Create farm workspaces.
- Provision Farm Admin accounts.
- Manage customer access.
- Suspend workspaces.

## 10.2 Farm Admin Requirements

Farm Admin shall be able to:
- Access all permitted farm modules.
- Manage animals.
- Manage animal health.
- Manage milk production.
- Manage milk storage and sales.
- Manage inventory.
- Manage feeding plans.
- Manage workers and attendance corrections.
- Approve or reject leave.
- Manage payroll.
- Manage finances.
- Manage equipment.
- Configure notifications.
- Customize dashboards.
- Manage farm settings.
- Access reports.
- Manage permitted imports and exports.
- Configure backups.

## 10.3 Supervisor Requirements

Supervisor shall be able to:
- View permitted operational dashboards.
- Record permitted daily operational information.
- Enter permitted animal and milk records.
- Record permitted health information.
- View feeding plans.
- Record actual feeding.
- Record attendance and check-in/check-out.
- View equipment.
- Record maintenance and usage information.

## 10.4 Admin Action Confirmation

The system shall require confirmation before creating, editing, deleting, or archiving records.

The confirmation behavior shall be consistent across the application.

---

# 11. Authentication Requirements

## 11.1 Standard Login

**AUTH-001:** The system shall support standard password-based authentication.

**AUTH-002:** Users shall authenticate before accessing private application areas.

**AUTH-003:** The system shall identify the user's assigned role.

**AUTH-004:** The system shall associate authenticated users with permitted workspaces.

## 11.2 Password Management

**AUTH-005:** Users shall be able to change their passwords.

**AUTH-006:** Users shall be able to request password resets through email.

**AUTH-007:** Password reset functionality shall depend on a working email delivery arrangement.

## 11.3 Email OTP

**AUTH-008:** The system shall support optional email OTP functionality.

Mandatory OTP requirements and role-specific OTP policies remain unconfirmed.

## 11.4 Session Behavior

The system shall protect authenticated areas from unauthorized access.

Session expiration duration, account lockout rules, and detailed session policies require confirmation.

Advanced session monitoring is excluded.

## 11.5 Account Activation

The customer onboarding process includes provisioning Farm Admin accounts and providing login instructions.

The exact activation process, temporary credentials, and first-login password-change requirements remain open questions.

---

# 12. Authorization Requirements

## 12.1 Role-Based Authorization

The system shall enforce permissions based on assigned roles.

Authorization shall apply to both visible interface actions and the corresponding backend operations.

## 12.2 Permission Matrix

| Functionality | Super Admin | Farm Admin | Supervisor |
|---|---|---|---|
| Platform customer management | Yes | No | No |
| Workspace creation | Yes | No | No |
| Farm Admin provisioning | Yes | No | No |
| Workspace suspension | Yes | No | No |
| Farm profile settings | No routine farm management | Yes | No |
| Animal management | No routine farm management | Yes | Permitted operations |
| Animal archiving | No routine farm management | Yes | No |
| Animal health records | No routine farm management | Yes | Permitted entry |
| Milk production | No routine farm management | Yes | Permitted entry |
| Milk sales | No routine farm management | Yes | Not confirmed |
| Inventory management | No routine farm management | Yes | Permitted usage entry |
| Inventory correction | No routine farm management | Yes | No |
| Feeding plans | No routine farm management | Yes | View assigned plans |
| Actual feeding | No routine farm management | Yes | Yes |
| Worker management | No routine farm management | Yes | Not confirmed |
| Attendance | No routine farm management | Yes | Permitted entry |
| Attendance correction | No routine farm management | Yes | Not confirmed |
| Leave approval | No routine farm management | Yes | No |
| Payroll | No routine farm management | Yes | No |
| Finance | No routine farm management | Yes | No |
| Equipment management | No routine farm management | Yes | View permitted records |
| Maintenance records | No routine farm management | Yes | Yes |
| Reports | Platform-level records only | Yes | Permitted operational reports |
| Dashboard customization | Platform-level views | Yes | Not confirmed |
| Import/export | Platform-level scope only | Yes | Not confirmed |
| Backup configuration | Platform-level scope only | Yes | No |

The matrix represents confirmed boundaries and explicitly identifies actions requiring clarification.

## 12.3 Workspace-Level Security

**AUTHZ-001:** Users shall not access another customer's farm records.

**AUTHZ-002:** Farm Admin access shall be limited to the assigned farm workspace.

**AUTHZ-003:** Supervisor access shall be limited to permitted operations within the assigned workspace.

**AUTHZ-004:** Financial information shall be inaccessible to Supervisors.

**AUTHZ-005:** Payroll information shall be inaccessible to Supervisors.

**AUTHZ-006:** Unauthorized operations shall be rejected even if a user attempts to bypass interface restrictions.

**AUTHZ-007:** Suspended workspaces shall reject customer access.

---

# 13. Database Requirements

This section defines logical data requirements only. It does not select a database technology or prescribe a physical database architecture.

## 13.1 Customer and Workspace Data

The system shall maintain:
- Customer records.
- Farm workspace records.
- Farm Admin account associations.
- Supervisor account associations.
- Workspace status.
- Workspace settings.

## 13.2 Animal Data

The system shall maintain:
- Internal animal ID.
- Ear-tag number.
- Animal name.
- Breed.
- Gender.
- Birth date or estimated age.
- Animal group.
- Category.
- Purchase records.
- Sale records.
- Parent relationships.
- Lifecycle statuses.
- Lifecycle history.
- Weight history.
- Photos and attachments.

## 13.3 Health Data

The system shall maintain:
- Animal health records.
- Severity.
- Diagnosis.
- Symptoms.
- Treatment.
- Medication.
- Dosage.
- Treatment dates.
- Veterinarian details.
- Treatment costs.
- Vaccination records.
- Due dates.
- Veterinary appointments.
- Disease history.

## 13.4 Milk Data

The system shall maintain:
- Animal production records.
- Morning production.
- Evening production.
- Daily totals.
- Farm totals.
- Milk quality.
- Collection records.
- Storage records.
- Milk stock.
- Sales.
- Sale customers.
- Sale prices.
- Payment methods.
- Paid/Unpaid statuses.
- Wastage records.
- Estimated wastage losses.

## 13.5 Inventory and Feeding Data

The system shall maintain:
- Inventory items.
- Categories.
- Quantities.
- Units.
- Minimum stock levels.
- Current stock.
- Purchase records.
- Stock additions.
- Stock adjustments.
- Adjustment reasons.
- Expiry dates.
- Feeding plans.
- Feeding schedules.
- Actual feeding records.

## 13.6 Worker and Payroll Data

The system shall maintain:
- Worker profiles.
- Worker documents.
- CNIC information.
- Attendance.
- Check-in/check-out.
- Leave records.
- Leave approval status.
- Overtime records.
- Salary structures.
- Payroll records.
- Advances.
- Deductions.
- Payments.
- Balances.
- Payslip information.

## 13.7 Financial Data

The system shall maintain:
- Income records.
- Expense records.
- Expense categories.
- Income categories.
- Financial dates.
- Amounts.
- Payment-related information where applicable.
- Financial reporting summaries.

## 13.8 Equipment Data

The system shall maintain:
- Equipment records.
- Equipment types.
- Quantity.
- Condition.
- Maintenance history.
- Usage history.

## 13.9 System and Notification Data

The system shall maintain:
- Notifications.
- Notification status.
- Notification type.
- Notification history.
- User activity logs.
- Farm settings.
- Currency.
- Timezone.
- Date/time preferences.
- Backup configuration.

## 13.10 Data Integrity Rules

The system shall:
- Generate unique internal identifiers.
- Prevent duplicate ear tags within a farm.
- Prevent duplicate worker CNIC values within the applicable farm.
- Maintain valid references between related records.
- Preserve customer workspace boundaries.
- Validate required data before saving.
- Prevent inconsistent calculated totals.

Exact database relationships, retention policies, and permanent deletion behavior require detailed data modeling and approval.

---

# 14. API Requirements

This section specifies required system interactions without selecting an API technology or communication protocol.

## 14.1 General API Requirements

**API-001:** The system shall provide application operations for the public website, Super Admin Panel, and farm management application.

**API-002:** Application operations shall validate submitted data.

**API-003:** Application operations shall enforce authentication and authorization.

**API-004:** Application operations shall enforce workspace-level data isolation.

**API-005:** Application operations shall return appropriate success and failure responses.

**API-006:** Application operations shall reject invalid or unauthorized requests.

**API-007:** Sensitive information shall not be exposed through unauthorized responses.

## 14.2 Required API Functional Groups

The system shall provide operations for:

1. Authentication and password management.
2. Customer management.
3. Workspace provisioning.
4. Farm Admin and Supervisor management.
5. Animal management.
6. Animal health management.
7. Milk production.
8. Milk storage and sales.
9. Inventory management.
10. Feeding management.
11. Worker management.
12. Attendance and leave.
13. Payroll.
14. Financial records.
15. Equipment.
16. Dashboards.
17. Notifications.
18. Reports.
19. Import and export.
20. Backup configuration.
21. Activity logs.
22. Farm settings.

## 14.3 API Validation

The system shall validate:
- Required fields.
- Data formats.
- Numeric values.
- Duplicate identifiers.
- Record ownership.
- Related record references.
- User permissions.
- Workspace association.

## 14.4 API Error Handling

The system shall return understandable error information for:
- Invalid requests.
- Missing required information.
- Unauthorized access.
- Missing records.
- Duplicate records.
- Failed operations.
- Unexpected server errors.

Detailed error codes and response structures will be established during technical design.

---

# 15. Payment Requirements

## 15.1 Customer Software Purchase

The business model is a one-time software sale.

The current application scope does not include:
- Public online checkout.
- Subscription billing.
- Automatic renewals.
- Recurring customer billing.
- Payment gateway integration.

Customer purchases are handled outside the public application workflow.

## 15.2 Milk Sale Payments

Milk sales shall support:
- Payment method.
- Sale price.
- Paid status.
- Unpaid status.

Partial milk payments and outstanding-balance calculations are excluded.

## 15.3 Worker Salary Payments

The system shall maintain worker salary payment records.

Supported methods:
- Cash.
- Bank transfer.
- Mobile wallet.
- Custom.

Supported payment frequencies:
- Daily.
- Weekly.
- Biweekly.
- Monthly.

The system records payments; automatic bank or wallet transaction processing is not included.

## 15.4 External Payment Services

No payment gateway or external online checkout integration is required in the current scope.

---

# 16. Email Requirements

## 16.1 Email Functionality

The system shall support email delivery for:
- Password reset.
- Optional email OTP.
- High/Critical animal health alerts.
- Configured production notifications.
- Other approved notification types.

## 16.2 Email Configuration

The email delivery service and its configuration shall be confirmed before implementation.

## 16.3 Email Failure Handling

The system shall provide an appropriate failure-handling process for unsuccessful email delivery.

The exact retry mechanism, delivery-status tracking, and escalation rules remain open questions.

## 16.4 Email Security

Sensitive account credentials and confidential farm information shall not be exposed through inappropriate email content.

---

# 17. Search Requirements

## 17.1 Global Search

The system shall provide global search functionality for applicable records.

## 17.2 Section-Level Search

Relevant sections shall provide individual search functionality.

Expected searchable areas include:
- Animals.
- Health records.
- Milk records.
- Inventory.
- Workers.
- Attendance.
- Payroll.
- Equipment.
- Customers.
- Farm workspaces.

## 17.3 Filtering

The system shall provide applicable advanced filters.

Filters shall be relevant to the selected module.

Examples include:
- Date ranges.
- Animal category.
- Lifecycle status.
- Health severity.
- Inventory category.
- Worker.
- Attendance status.
- Payment status.
- Transaction category.

## 17.4 Sorting

The system shall support predefined sorting options.

## 17.5 Pagination

The system shall support the following page sizes:
- 10 records.
- 25 records.
- 50 records.
- 100 records.

## 17.6 Table Customization

Farm Admin users shall be able to control visible table columns where applicable.

Exact global search fields, filter combinations, and sorting options will be defined during UI/UX and functional specification.

---

# 18. SEO Requirements

## 18.1 Public Website SEO

The public landing page shall support basic search engine optimization.

Requirements:
- Descriptive page titles.
- Relevant meta descriptions.
- Clear heading hierarchy.
- Meaningful image alternative text.
- Descriptive page content.
- Search-engine-readable public content.
- Appropriate page URLs.

## 18.2 Public and Private Separation

Public marketing content shall be distinguishable from authenticated application content.

Private farm records, dashboards, and administrative pages shall not be publicly accessible.

## 18.3 SEO Exclusions

Advanced SEO campaigns, paid advertising management, ongoing content marketing, and guaranteed search rankings are not included in the approved software development scope.

---

# 19. Accessibility Requirements

## 19.1 General Accessibility

The interface should provide:
- Readable text.
- Clear labels.
- Consistent navigation.
- Sufficient visual distinction between interface elements.
- Understandable validation messages.
- Clear status indicators.
- Keyboard-accessible interactive controls where applicable.

## 19.2 Forms

Forms should provide:
- Clearly identified fields.
- Required-field indicators.
- Understandable validation errors.
- Logical navigation.
- Clear action labels.

## 19.3 Visual Indicators

Status and severity indicators should not rely solely on color.

## 19.4 Responsive Accessibility

Interface controls should remain usable on supported desktop, tablet, and smartphone screen sizes.

**Open Question:** Formal accessibility compliance, including whether WCAG 2.2 AA or another standard is required, has not been confirmed.

No formal accessibility certification is included in the current approved scope.

---

# 20. Security Requirements

## 20.1 Authentication Security

- Private areas shall require authentication.
- Password changes shall be supported.
- Forgotten-password reset shall be supported through email.
- Optional email OTP shall be supported.

## 20.2 Authorization Security

- Access shall be role-based.
- Financial information shall be restricted to Farm Admin.
- Payroll shall be restricted to Farm Admin.
- Supervisor restrictions shall be enforced.
- Workspace isolation shall be maintained.

## 20.3 Data Security

- Customer farm data shall remain isolated.
- Unauthorized data access shall be rejected.
- Sensitive worker documents shall only be accessible to authorized users.
- Credentials shall be handled securely.
- Private application information shall not be exposed through public pages.

## 20.4 Input Security

The system shall validate submitted data before saving.

The system shall reject invalid input and unauthorized operations.

## 20.5 Deletion Security

The system shall require confirmation before delete and archive operations.

Soft and permanent deletion shall be supported where applicable.

## 20.6 Activity Logging

Basic activity logs shall record:
- User.
- Action.
- Date/time.

Advanced before-and-after change tracking is excluded.

## 20.7 Security Limitations

The following are not included:
- Advanced session monitoring.
- Advanced password history.
- Advanced password expiry management.

Password complexity, account lockout, session expiration, and Super Admin OTP requirements remain open questions.

---

# 21. Performance Requirements

The system shall provide responsive operation for normal farm management activities.

## 21.1 Interface Performance

- Pages shall display appropriate loading indicators.
- Dashboards shall support skeleton loading.
- Tables shall support pagination.
- Smaller actions shall display loading feedback.
- Users shall receive success or error feedback for operations.

## 21.2 Data Processing

- Animal daily milk totals shall be calculated automatically.
- Farm production totals shall be calculated from animal totals.
- Configured reminders shall be processed automatically.
- Low-stock conditions shall be evaluated according to configured rules.
- Financial summaries shall be calculated according to approved financial rules.

## 21.3 Large Datasets

The application shall support searching, filtering, sorting, and pagination of applicable records.

## 21.4 Performance Targets

Exact response-time targets, maximum record volumes, and concurrent-user limits have not been approved.

The following must be confirmed:
- Expected number of farms.
- Maximum animals per farm.
- Maximum workers per farm.
- Maximum simultaneous users.
- Expected report generation times.
- Dashboard loading targets.
- Expected data retention period.

No numerical performance SLA is established by this SRS.

---

# 22. 2D Visual Requirements

The project includes 2D interface visuals.

## 22.1 UI Visual Elements

The system shall include:
- UI icons.
- Interface illustrations.
- Dashboard charts.
- Data visualization components.
- Status indicators.
- Animal-related visual elements.
- Farm-related visual elements.
- Informational graphics.

## 22.2 Dashboard Graphics

Dashboards shall present relevant operational and financial information using suitable visual components.

Examples:
- Production summaries.
- Financial summaries.
- Animal information.
- Inventory status.
- Attendance information.
- Health alerts.

## 22.3 Data Visualization

Charts and graphs shall be used where they improve the understanding of:
- Historical animal weight.
- Milk production totals.
- Financial summaries.
- Other approved dashboard metrics.

## 22.4 Branding

Final logos, colors, fonts, and branding assets shall be provided or approved by the client.

---

# 23. Motion Requirements

The project includes basic interface-level motion and transitions.

## 23.1 Interaction Animations

The interface shall support appropriate:
- Button hover interactions.
- Button state transitions.
- Dropdown transitions.
- Modal transitions.
- Sidebar interactions.
- Notification interactions.

## 23.2 Loading Animations

The system shall provide:
- Loading indicators.
- Spinners.
- Skeleton loading animations.

## 23.3 Navigation Animations

The interface may include:
- Basic page transitions.
- Dashboard card transitions.
- Sidebar open/close transitions.

## 23.4 Motion Limitations

Motion shall support usability rather than interfere with operational workflows.

Complex cinematic animations, advanced motion graphics, and extensive promotional animation sequences are not confirmed requirements.

---

# 24. 3D Requirements

**Status: Not Included**

The current project scope does not include:
- 3D animal models.
- 3D farm environments.
- Interactive 3D farm visualization.
- 3D equipment models.
- 3D operational simulations.
- Interactive 3D environments.

Any future 3D functionality shall be treated as a separate enhancement requiring discovery, estimation, and approval.

---

# 25. Analytics Requirements

## 25.1 Farm Operational Analytics

The system shall provide dashboard information relating to:
- Animal records.
- Milk production.
- Health alerts.
- Vaccination reminders.
- Inventory.
- Feeding.
- Attendance.

## 25.2 Milk Analytics

The system shall provide:
- Daily farm milk totals.
- Monthly farm milk totals.
- Animal-level production history.
- Automated production-drop detection.

Advanced individual animal trend analysis and production targets are excluded.

## 25.3 Financial Analytics

The Farm Admin dashboard shall display:
- Income.
- Expenses.
- Net profit/loss.
- Revenue categories.
- Unpaid milk sales.
- Recent transactions.

## 25.4 Inventory Analytics

The system shall provide stock information and low-stock warnings.

## 25.5 Monthly Financial Analytics

The system shall support monthly financial analytics processing.

## 25.6 Analytics Limitations

The following are excluded:
- Advanced predictive analytics.
- Machine-learning-based predictions.
- Advanced custom report builders.
- Advanced notification analytics.
- Advanced individual animal comparisons.
- Milk production targets.

All calculations shall follow client-approved business rules.

---

# 26. Deployment Requirements

## 26.1 Deployment Preparation

The project shall include:
- Production build preparation.
- Backend deployment preparation.
- Database setup and configuration.
- Environment configuration.
- Initial Admin account setup.
- Deployment verification.
- Production smoke testing.

## 26.2 Hosting

The application shall be deployed to the client-approved hosting environment.

The hosting provider remains to be confirmed.

## 26.3 Domain

The system shall be connected to the client-approved domain, subject to access being provided.

## 26.4 External Services

The following arrangements shall be confirmed:
- Hosting provider.
- Domain and DNS.
- Email delivery provider.
- Cloud backup storage provider.

Third-party service subscriptions and infrastructure costs are excluded unless separately agreed.

## 26.5 Handover

The final delivery shall include:
- Deployed SmartFarm application.
- Source code.
- Initial Admin account setup.
- Basic deployment instructions.
- Agreed handover documentation.

## 26.6 Maintenance

Ongoing post-launch maintenance, hosting management, and technical support are not included unless separately agreed.

---

# 27. Acceptance Criteria

Acceptance shall be based on the approved scope and the requirements defined in this SRS.

## 27.1 Public Website Acceptance

**AC-001:** The public website displays the approved sections.

**AC-002:** The contact form accepts valid inquiries.

**AC-003:** Invalid contact form submissions display appropriate validation errors.

**AC-004:** Public visitors cannot access private application areas without authentication.

**AC-005:** No public registration or checkout functionality is available.

## 27.2 Super Admin Acceptance

**AC-006:** Super Admin can authenticate successfully.

**AC-007:** Super Admin can register customers.

**AC-008:** Super Admin can create farm workspaces.

**AC-009:** Super Admin can provision Farm Admin accounts.

**AC-010:** Super Admin can suspend a customer workspace.

**AC-011:** Suspended customer workspaces reject affected customer access.

**AC-012:** Workspace suspension preserves customer records.

## 27.3 Workspace and Security Acceptance

**AC-013:** Farm Admin can access only authorized farm data.

**AC-014:** Supervisor can access only permitted farm data.

**AC-015:** A customer cannot access another customer's farm records.

**AC-016:** Supervisors cannot access financial records.

**AC-017:** Supervisors cannot access payroll.

**AC-018:** Supervisors cannot approve leave.

**AC-019:** Supervisors cannot correct inventory stock.

**AC-020:** Supervisors cannot archive animals.

## 27.4 Animal Management Acceptance

**AC-021:** Animal registration generates a unique internal identifier.

**AC-022:** Duplicate ear tags within the same farm are rejected.

**AC-023:** Animal profiles display their stored information.

**AC-024:** Animal lifecycle statuses can be maintained.

**AC-025:** Animal weight history can be recorded and displayed.

**AC-026:** Animal attachments can be associated with relevant records.

## 27.5 Animal Health Acceptance

**AC-027:** Health records support all four severity classifications.

**AC-028:** Critical conditions receive visual highlighting.

**AC-029:** Treatment information can be recorded.

**AC-030:** Vaccination due dates can be recorded.

**AC-031:** Configured vaccination reminders are generated.

**AC-032:** High/Critical alerts reach Farm Admin through configured channels.

**AC-033:** Supervisors do not receive High/Critical health alerts.

## 27.6 Milk Production Acceptance

**AC-034:** Morning and evening production can be recorded separately.

**AC-035:** Animal daily totals are calculated correctly.

**AC-036:** Farm totals equal the sum of applicable animal daily totals.

**AC-037:** Milk quality categories are available.

**AC-038:** Daily and monthly production reports are generated.

**AC-039:** Production-drop detection follows the approved mathematical rule.

**AC-040:** A reduction meeting or exceeding the approved 15% threshold triggers the expected alert.

## 27.7 Milk Stock and Sales Acceptance

**AC-041:** Milk collection and storage records can be maintained.

**AC-042:** Milk sales can be recorded with customer, quantity, price, and payment status.

**AC-043:** Recorded milk sales automatically reduce available stock.

**AC-044:** Recorded milk wastage automatically reduces available stock.

**AC-045:** Wastage financial loss is calculated according to the approved rule.

## 27.8 Inventory and Feeding Acceptance

**AC-046:** Inventory items can be registered and categorized.

**AC-047:** Purchases and stock additions update applicable inventory records.

**AC-048:** Stock adjustments require Farm Admin authorization and a reason.

**AC-049:** Stock adjustment history is maintained.

**AC-050:** Low-stock warnings are generated according to configured thresholds.

**AC-051:** Feeding plans can be created.

**AC-052:** Supervisors can view permitted feeding plans.

**AC-053:** Actual feeding records can be recorded.

**AC-054:** Feeding-related stock deductions follow the approved business rule.

## 27.9 Worker and Payroll Acceptance

**AC-055:** Worker profiles can be created.

**AC-056:** Duplicate CNIC values within the applicable farm are rejected.

**AC-057:** Attendance records can be maintained.

**AC-058:** Farm Admin can correct permitted attendance records.

**AC-059:** Farm Admin can approve and reject leave.

**AC-060:** Payroll calculations match the approved calculation examples.

**AC-061:** Salary payments can be recorded.

**AC-062:** Payslips can be generated in PDF and printable formats.

## 27.10 Finance Acceptance

**AC-063:** Income and expense records can be maintained.

**AC-064:** Financial summaries are calculated according to approved rules.

**AC-065:** Financial reports support the approved reporting periods.

**AC-066:** Reports can be exported to PDF and Excel and printed.

**AC-067:** Supervisors cannot access financial records.

## 27.11 Equipment Acceptance

**AC-068:** Equipment records can be created and maintained.

**AC-069:** Maintenance history can be recorded.

**AC-070:** Supervisors can record permitted maintenance information.

**AC-071:** Only Farm Admin can edit or archive equipment.

## 27.12 Dashboard and Notification Acceptance

**AC-072:** Farm Admin and Supervisor receive their respective dashboards.

**AC-073:** Dashboard information respects role permissions.

**AC-074:** Farm Admin can customize the supported dashboard widgets.

**AC-075:** In-app notifications are available.

**AC-076:** Notification read/unread status is maintained.

**AC-077:** Configured email notifications are delivered through the approved email arrangement.

**AC-078:** Scheduled jobs execute according to approved configuration.

## 27.13 Data Management Acceptance

**AC-079:** Excel and CSV import functionality is available.

**AC-080:** Excel and CSV export functionality is available.

**AC-081:** Automatic and manual backup functionality is available.

**AC-082:** Basic activity logs record user, action, and date/time.

**AC-083:** Applicable soft and permanent deletion operations are supported.

## 27.14 User Experience Acceptance

**AC-084:** The application works on supported desktop, laptop, tablet, and smartphone screen sizes.

**AC-085:** The application is tested on modern Chrome, Edge, Firefox, and Safari.

**AC-086:** Required fields are validated.

**AC-087:** Create, edit, delete, and archive operations request confirmation.

**AC-088:** Success and error feedback is displayed.

**AC-089:** Loading indicators and empty states are available.

**AC-090:** Search, applicable filters, sorting, and pagination work as specified.

Requirements dependent on unresolved business rules cannot receive final acceptance until the relevant client decisions have been approved.

---

# 28. Edge Cases and Exception Handling

This section identifies expected exceptional conditions that must be designed and tested before QA rather than discovered during final testing.

## 28.1 Empty States

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-001 | No animals registered | Display a helpful empty state and permitted registration action |
| EC-002 | No milk production records | Display an empty production state |
| EC-003 | No inventory items | Display an empty inventory state |
| EC-004 | No workers registered | Display a helpful worker empty state |
| EC-005 | No attendance records | Display an empty attendance state |
| EC-006 | No financial transactions | Display an empty financial state |
| EC-007 | No notifications | Display a no-notifications message |
| EC-008 | No search results | Display a no-results message |
| EC-009 | No equipment records | Display an empty equipment state |
| EC-010 | No report data for selected period | Display a no-data message instead of misleading totals |

## 28.2 Invalid Input

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-011 | Missing required field | Reject submission and identify the missing field |
| EC-012 | Invalid numeric quantity | Reject the invalid value |
| EC-013 | Negative milk production | Reject the value unless an approved exception is defined |
| EC-014 | Negative inventory quantity | Reject or handle according to the approved stock policy |
| EC-015 | Invalid date | Reject the date and explain the problem |
| EC-016 | End date before start date | Reject the date range |
| EC-017 | Invalid email address | Reject the invalid format |
| EC-018 | Duplicate ear tag | Prevent saving the duplicate |
| EC-019 | Duplicate CNIC | Prevent saving the duplicate |
| EC-020 | Invalid parent animal reference | Reject the invalid association |
| EC-021 | Unsupported attachment format | Display a clear validation message |
| EC-022 | Attachment exceeds configured limit | Reject the attachment with an explanation |
| EC-023 | Excessive numerical precision | Apply the approved precision validation rule |

## 28.3 Failed API Calls and Server Errors

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-024 | Server returns an error | Display a user-friendly error |
| EC-025 | Record save fails | Inform the user that the record was not saved |
| EC-026 | Record update fails | Preserve the existing saved record |
| EC-027 | Record deletion fails | Keep the record unchanged |
| EC-028 | Dashboard request fails | Display an error state instead of false or fabricated data |
| EC-029 | Report generation fails | Inform the user that the report could not be generated |
| EC-030 | Notification processing fails | Record or expose an appropriate failure state where supported |
| EC-031 | Import operation fails | Display the import failure and relevant validation information |
| EC-032 | Export operation fails | Inform the user that the export was unsuccessful |
| EC-033 | Backup operation fails | Report the backup failure to the authorized user |
| EC-034 | Unexpected server response | Display a safe error message without exposing sensitive internal information |

## 28.4 No Internet Connectivity

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-035 | Internet connection lost | Display an appropriate connection error |
| EC-036 | User submits a form without connectivity | Inform the user that the operation could not be completed |
| EC-037 | Connection is lost during saving | Clearly communicate that save completion is unknown or unsuccessful until verified |
| EC-038 | Connection returns | Allow the user to retry the operation |
| EC-039 | User attempts offline operation | Inform the user that offline functionality is not supported |

The system shall not claim that an unsuccessful operation has been saved.

Offline data entry and synchronization are excluded.

## 28.5 Unexpected or Inconsistent Data

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-040 | Missing optional animal information | Display available information without application failure |
| EC-041 | Missing production session | Follow the approved missing-production rule |
| EC-042 | Missing historical production days | Apply the approved milk-drop detection policy |
| EC-043 | Invalid relationship between records | Reject the operation or report the inconsistency |
| EC-044 | Archived animal referenced in a new operation | Apply approved lifecycle restrictions |
| EC-045 | Inactive worker referenced in payroll | Apply approved worker lifecycle rules |
| EC-046 | Unexpected imported column | Report or ignore according to approved import mapping rules |
| EC-047 | Imported duplicate records | Detect and report according to approved duplicate rules |
| EC-048 | Corrupted attachment | Reject the file or report that it cannot be processed |
| EC-049 | Historical record missing related data | Preserve available history and communicate unavailable information |
| EC-050 | Invalid currency or timezone configuration | Reject invalid configuration |
| EC-051 | Missing farm configuration | Prevent dependent calculations from using fabricated defaults |
| EC-052 | Unexpected numeric values in reports | Validate calculations and avoid misleading totals |

## 28.6 Workspace and Permission Edge Cases

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-053 | User accesses another farm's record | Reject access |
| EC-054 | Supervisor attempts to open finance | Deny access |
| EC-055 | Supervisor attempts payroll access | Deny access |
| EC-056 | Supervisor attempts stock correction | Deny access |
| EC-057 | Supervisor attempts animal archiving | Deny access |
| EC-058 | Suspended customer attempts login | Reject access to the suspended workspace |
| EC-059 | Unauthorized user attempts an administrative action | Reject the operation |
| EC-060 | User account no longer has workspace access | Reject subsequent unauthorized requests |
| EC-061 | Workspace has no provisioned Farm Admin | Prevent unauthorized farm administration and report the configuration issue |

## 28.7 Milk Production and Stock Edge Cases

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-062 | Only morning production exists | Calculate according to the approved missing-session rule |
| EC-063 | Only evening production exists | Calculate according to the approved missing-session rule |
| EC-064 | Duplicate production submission | Prevent duplicate or conflicting records according to approved rules |
| EC-065 | Production entry is corrected | Recalculate dependent totals |
| EC-066 | Production reduction is exactly 15% | Trigger an alert under the confirmed threshold rule |
| EC-067 | Production reduction is below 15% | Do not trigger a threshold alert |
| EC-068 | Milk sale exceeds available stock | Apply the approved stock policy; do not silently create inconsistent stock |
| EC-069 | Milk sale is cancelled | Apply the approved stock reversal rule |
| EC-070 | Milk wastage exceeds available stock | Reject or handle according to approved stock rules |
| EC-071 | Multiple storage locations exist | Maintain location-specific quantities according to approved allocation rules |
| EC-072 | Historical production is changed | Recalculate affected totals and handle related alerts according to approved rules |

## 28.8 Inventory and Feeding Edge Cases

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-073 | Inventory reaches minimum level | Generate configured low-stock notification |
| EC-074 | Inventory falls below minimum level | Maintain the low-stock condition |
| EC-075 | Inventory reaches zero | Apply approved stock restrictions |
| EC-076 | Feeding quantity exceeds available stock | Apply approved inventory deduction policy |
| EC-077 | Expired inventory is selected | Apply the approved expiry handling rule |
| EC-078 | Stock adjustment has no reason | Reject the adjustment |
| EC-079 | Supervisor attempts adjustment | Deny the operation |
| EC-080 | Duplicate feeding record | Prevent or flag duplicate submission according to approved rules |

## 28.9 Attendance and Payroll Edge Cases

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-081 | Check-in without check-out | Apply the approved attendance correction process |
| EC-082 | Check-out without check-in | Reject or flag the invalid record |
| EC-083 | Multiple attendance entries on one day | Apply approved attendance rules |
| EC-084 | Attendance marked late | Use the approved late-arrival policy |
| EC-085 | Leave overlaps with attendance | Apply approved leave and attendance precedence |
| EC-086 | Leave is rejected | Update the leave status and applicable records |
| EC-087 | Attendance is corrected after payroll calculation | Recalculate or flag the affected payroll according to approved rules |
| EC-088 | Advance exceeds available salary | Apply the approved advance policy |
| EC-089 | Payroll period has missing attendance | Flag missing information before final calculation |
| EC-090 | Partial-month employment | Apply the selected approved calculation method |
| EC-091 | Multiple salary payments exist | Maintain the correct payment history and balance |
| EC-092 | Payroll is corrected after payslip generation | Apply the approved correction and payslip handling rules |

## 28.10 Financial Edge Cases

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-093 | No income exists | Display zero or an appropriate empty financial state |
| EC-094 | No expenses exist | Display zero or an appropriate empty financial state |
| EC-095 | Expenses exceed income | Display a negative net profit/loss where supported |
| EC-096 | Unpaid milk sale exists | Include it according to the approved financial reporting definition |
| EC-097 | Transaction is edited | Recalculate affected summaries |
| EC-098 | Transaction is deleted | Apply approved historical record and recalculation rules |
| EC-099 | Currency configuration changes | Prevent historical values from being silently reinterpreted |
| EC-100 | Duplicate transaction submission | Prevent duplicate financial entries where detectable |

## 28.11 Notifications and Scheduled Job Edge Cases

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-101 | Email delivery fails | Report or record delivery failure |
| EC-102 | Scheduled job fails | Record the failure where supported |
| EC-103 | Reminder is already overdue | Apply the approved overdue reminder policy |
| EC-104 | Multiple conditions trigger the same notification | Apply approved duplicate suppression rules |
| EC-105 | Farm timezone changes | Apply approved timezone behavior to future scheduled operations |
| EC-106 | Notification recipient lacks permission | Do not expose the restricted notification |
| EC-107 | Notification is marked read | Update its read/unread status |
| EC-108 | Critical health notification is generated | Deliver it to authorized Farm Admin recipients |

## 28.12 Import, Export, and Backup Edge Cases

| ID | Scenario | Expected System Behavior |
|---|---|---|
| EC-109 | Unsupported import file | Reject the file with an explanation |
| EC-110 | Import contains invalid records | Identify invalid records and report errors |
| EC-111 | Import contains duplicate identifiers | Prevent unintended duplicate creation |
| EC-112 | Import references nonexistent records | Report invalid relationships |
| EC-113 | Export contains no records | Generate an appropriate empty result or message |
| EC-114 | Backup fails | Notify the authorized user of the failure |
| EC-115 | Manual backup is interrupted | Do not report a successful backup without verification |
| EC-116 | Restore operation is requested | Enforce the approved restoration authorization and process |
| EC-117 | Permanent deletion affects linked records | Follow the approved retention and relationship rules |

---

# 29. Confirmed Exclusions and Constraints

The following functionality is outside the current approved project scope.

## 29.1 Commercial Exclusions
- Public self-registration.
- Online payment checkout.
- Subscription billing.
- Automatic renewals.
- Recurring subscription management.

## 29.2 Hardware and Connectivity Exclusions
- IoT hardware.
- RFID and radio-frequency sensor integration.
- Offline data entry.
- Offline synchronization.
- Advanced milk quality sensor integration.

## 29.3 Workforce Exclusions
- Individual worker login accounts.
- Worker task management.
- Worker performance management.
- Advanced overtime payment calculations.
- Separate loans/advances module.

## 29.4 Financial and Milk Exclusions
- Partial milk payments.
- Outstanding milk payment balance calculations.
- Formal accounting ledger.
- Advanced financial reconciliation.

## 29.5 Animal and Feeding Exclusions
- Advanced breeding management.
- Advanced nutritional recommendation engine.
- Advanced individual animal production trends.
- Milk production targets.
- Automatic unit conversion.

## 29.6 Equipment Exclusions
- Maintenance cost tracking.
- Automated maintenance reminders.

## 29.7 Security and Reporting Exclusions
- Advanced session monitoring.
- Advanced before-and-after audit tracking.
- Advanced notification analytics.
- Advanced custom report builder.

## 29.8 Visual Exclusions
- 3D animal models.
- 3D farm environments.
- Interactive 3D visualization.

## 29.9 Other Exclusions
- Dedicated Android application.
- Dedicated iOS application.
- Languages other than English.
- Paid external API dependencies not separately approved.
- Unspecified third-party integrations.
- Features not documented in the approved scope.

---

# 30. Assumptions Register

The following are working assumptions, not confirmed requirements.

| ID | Assumption | Status |
|---|---|---|
| AS-001 | One customer may own multiple farm workspaces | Requires confirmation |
| AS-002 | A farm may have multiple Farm Admin accounts | Requires confirmation |
| AS-003 | A user may access multiple workspaces | Requires confirmation |
| AS-004 | Each workspace maintains independent settings | Requires confirmation |
| AS-005 | Farm Admin reviews payroll before payment | Requires confirmation |
| AS-006 | Actual feeding deducts inventory | Requires confirmation |
| AS-007 | Notifications may link to related records | Requires confirmation |
| AS-008 | Farm Admin may correct historical operational records | Requires confirmation |
| AS-009 | Suspended workspaces preserve customer data | Supported by discovery |
| AS-010 | Currency and timezone are configured independently per farm | Requires confirmation |
| AS-011 | Historical records remain available after animal or worker inactivity | Partially confirmed; worker rules require confirmation |
| AS-012 | Dashboard layouts persist between sessions | Requires confirmation |
| AS-013 | Import operations validate records before saving | Requires detailed confirmation |
| AS-014 | Scheduled operations use the configured farm timezone | Requires confirmation of specific job behavior |

No assumption shall be treated as an approved feature or final business rule without client confirmation.

---

# 31. Open Questions and Pending Decisions

These decisions must be resolved before the corresponding implementation and acceptance criteria are finalized.

## 31.1 Platform and Workspace Management

1. Can one customer have multiple farms?
2. Can a farm have multiple Farm Admin accounts?
3. Can one user access multiple workspaces?
4. Can Super Admin access customer data for support?
5. What is the permanent customer closure process?
6. What information is mandatory for customer registration?

## 31.2 Authentication and Security

1. What are the password complexity rules?
2. What are the account lockout rules?
3. Is email OTP mandatory for Super Admin?
4. How are Farm Admin accounts activated?
5. What is the session expiration policy?
6. What happens to active sessions after workspace suspension?

## 31.3 Milk Production and Stock

1. What is the exact rolling three-day average formula?
2. How are missing production records handled?
3. Can production entries be corrected?
4. Can sales exceed available stock?
5. How are cancelled sales handled?
6. How are internal milk usage and storage transfers recorded?
7. Can milk be allocated to multiple tanks?

## 31.4 Feeding and Nutrition

1. What are the nutritional recommendation formulas?
2. Which animal parameters are used?
3. Can plans include multiple feed items?
4. Can different daily feeding schedules be configured?
5. Does actual feeding deduct inventory?
6. Can Supervisors record feeding outside scheduled times?

## 31.5 Payroll and Attendance

1. What are the exact monthly salary formulas?
2. What are the exact daily wage formulas?
3. How are late arrivals calculated?
4. How are holidays and rest days treated?
5. How are paid and unpaid leave calculated?
6. How are advances recovered?
7. Can payroll be reopened?
8. Can salary payments be split into multiple entries?
9. What happens when attendance changes after payroll calculation?

## 31.6 Financial Management

1. Is financial reporting cash-based, sales-based, or both?
2. How are unpaid sales treated?
3. How are animal purchase costs integrated?
4. How are inventory purchases integrated?
5. How are veterinary treatment costs integrated?
6. Can financial transactions be edited or deleted?
7. Are historical opening balances required?

## 31.7 Health and Notifications

1. What breeding records are required?
2. What triggers breeding reminders?
3. Can notifications repeat?
4. Can notifications be acknowledged or dismissed?
5. What happens when email delivery fails?
6. Can notification channels be configured independently?

## 31.8 Data and Infrastructure

1. What backup frequency is required?
2. How long are backups retained?
3. What is the recovery process?
4. Who is authorized to restore backups?
5. What file formats and upload limits are permitted?
6. What happens to data after permanent workspace closure?
7. Who provides hosting and email delivery?
8. Which cloud backup service will be used?

## 31.9 Performance and Accessibility

1. What are the maximum expected customer farms?
2. What are the expected maximum animals and workers per farm?
3. How many concurrent users are expected?
4. What are the expected dashboard response times?
5. Is a formal accessibility standard required?
6. What are the expected uptime and support arrangements?

---

# 32. Requirements Traceability and Change Control

## 32.1 Requirement Identification

Each functional requirement has a unique identifier.

Examples:
- FR-AN: Animal Management.
- FR-MP: Milk Production.
- FR-IN: Inventory.
- FR-PR: Payroll.
- FR-FN: Finance.
- FR-NT: Notifications.
- AUTH: Authentication.
- AUTHZ: Authorization.
- NFR: Non-Functional Requirements.
- EC: Edge Cases.
- AC: Acceptance Criteria.

## 32.2 Traceability

Every approved functional requirement shall be associated with:
- Its source scope section.
- Relevant user role.
- Applicable page or module.
- Related business rules.
- Associated acceptance criteria.
- Corresponding test cases.

## 32.3 Change Control

Any new feature, page, module, workflow, or functionality outside the approved scope shall be evaluated through the project's change request process.

A change request must identify:
- Requested change.
- Business reason.
- Scope impact.
- Timeline impact.
- Cost impact.
- Approval status.

## 32.4 Requirement Approval

This SRS shall become the detailed functional reference after review and approval by the client and software development company.

Unresolved items shall remain marked as assumptions or open questions until approved.

---

# 33. Final SRS Approval

By approving this document, the parties acknowledge that:

1. The SRS is based on the supplied discovery analysis and approved project scope.
2. Confirmed requirements represent the current product baseline.
3. Unconfirmed requirements are identified separately.
4. Excluded features are not included in the current development commitment.
5. Business calculations require approved formulas before implementation.
6. Acceptance testing shall be based on approved requirements and agreed criteria.
7. Changes to the approved requirements shall follow the agreed change request process.

**FOR THE CLIENT**

Company Name: ______________________________

Authorized Representative: ______________________________

Designation: ______________________________

Signature: ______________________________

Date: ______________________________

**FOR THE SOFTWARE DEVELOPMENT COMPANY**

Company Name: ______________________________

Authorized Representative: ______________________________

Designation: ______________________________

Signature: ______________________________

Date: ______________________________

---

**Document:** SmartFarm Software Requirements Specification  
**Version:** 1.0  
**Status:** Pending Client Review and Requirements Approval  
**Reference:** SmartFarm Scope of Work & Quotation – Version 1.0  
**Project:** SmartFarm Dairy Management System