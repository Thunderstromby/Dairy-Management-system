SmartFarm — Section-wise Sitemap
Source baseline: SmartFarm SRS v1.0, Business Rules v1.0, and Complete Implementable Design System v1.0.
1. Public website
HOME
1. Navbar
- SmartFarm text-based brand lockup or approved logo.
- Navigation links: Home, About, Features, How It Works, Benefits, Dashboard Preview, Contact.
- Primary CTA: Contact Us.
- Sticky navigation on scroll.
- Mobile: collapsible navigation drawer.
- Motion: subtle menu and scroll-state transitions.
- Owner-approved Home-only override (25 November 2026): the Home navbar uses Stitch's five section links (Home, About, Features, How It Works, Contact) and the “Let's Talk” CTA; section links scroll to the corresponding Home section. Inner public pages keep the seven canonical links and “Contact Us” CTA above.
2. Hero (owner-approved Stitch override, 25 November 2026)
- Eyebrow: “SMARTER DAIRY FARM MANAGEMENT”.
- Main headline: “The intelligence behind better dairy farming.”
- Supporting text: “Bring animal care, milk production, daily operations, and farm management together with one connected platform built for modern dairy farms.”
- Primary CTA: Explore SmartFarm.
- Secondary CTA: See How It Works.
- Navbar CTA remains Contact Us under §1 Navbar.
- Stitch-hosted hero photography is approved for Public Home by ACR-003 (owner approval 25 November 2026); replace with authentic licensed photography when supplied. The ACR-002 CSS/static decorative motif remains the external-image failure fallback.
- 2D visual area: restrained organic shapes and green gradient accents.
- Lower edge: neutral illustrative label and Scroll to explore cue; no live-status, quota, sync or fictional farm-name cue.
- Motion: restrained entrance only; reduced motion shows the final state.
3. About SmartFarm
- Product introduction.
- What SmartFarm helps farm owners manage.
- Key platform value proposition.
- 2D visual area: simple agricultural line illustration or authentic farm imagery.
4. Features
- Animal management.
- Animal health.
- Milk production and management.
- Inventory and feeding.
- Worker and attendance management.
- Payroll and finance.
- Equipment management.
- Reports and data management.
- 2D visual area: consistent Lucide-style icons and feature illustrations.
- CTA: Explore SmartFarm / Contact Us.
5. How It Works
- Introduce the platform.
- Explain the general farm management workflow.
- Show how operational information is organized and managed.
- 2D visual area: numbered steps and simple process illustrations.
- Motion: subtle scroll-reveal transitions.
6. Benefits
- Centralized farm records.
- Better operational visibility.
- Organized milk production records.
- Animal health and feeding oversight.
- Worker and financial record management.
- 2D visual area: restrained icons and supporting illustrations.
7. Dashboard Preview
- SmartFarm dashboard preview.
- Operational KPI examples.
- Milk production chart preview.
- Sample operational information.
- 2D visual area: actual approved product screenshots when available; otherwise clearly identified design previews.
- Motion: subtle chart entrance and screenshot reveal.
- CTA: Contact Us.
8. Contact Inquiry
- Contact heading.
- Short inquiry instructions.
- Contact form with approved inquiry fields.
- Form validation and required-field indicators.
- Submit CTA: Submit Inquiry.
- Success and error feedback.
- No public account registration or checkout.
9. Footer
- SmartFarm brand identity.
- Relevant website navigation links.
- Approved contact information.
- Copyright information.
- Legal links only if approved content is supplied.
- Owner-approved Home-only override (25 November 2026): use Stitch's Home footer wording, seven section links and “Connect with our team →” consultation cue. Legal link labels remain text-only until approved content is supplied. Inner public pages keep the canonical footer.

2. Super Admin Panel
Shared Super Admin layout
The following elements appear on authenticated Super Admin pages:
- Platform sidebar navigation.
- Application header.
- Page title and relevant actions.
- Main content area.
- User/account menu where supported.
- Minimal application footer where required.
Navigation scope: Customer Management, Workspace Management, Farm Admin Management, Customer Access Management, and Workspace Suspension. Do not expose routine farm-management navigation here.
2.1 SUPER ADMIN LOGIN
1. Login Header
- SmartFarm brand lockup.
- Super Admin identification.
2. Login Form
- Email or approved login identifier.
- Password.
- Password visibility control.
- Field validation.
3. Login Actions
- Sign In CTA.
- Loading state.
- Authentication error feedback.
4. Login Footer
- Minimal copyright or application information.
2.2 SUPER ADMIN DASHBOARD
1. Platform Header
- Page title: Dashboard.
- Relevant account controls.
2. Platform Overview
- Customer overview.
- Workspace overview.
- Access-status overview.
- 2D visual area: KPI cards.
3. Customer and Workspace Summary
- Customer management summary.
- Workspace management summary.
- 2D visual area: relevant status indicators and charts where supported.
4. Platform Activity
- Relevant platform activity records.
- Activity status and timestamps.
5. Quick Actions
- Add Customer.
- Manage Customers.
- Manage Workspaces.
2.3 CUSTOMER MANAGEMENT
1. Page Header
- Title: Customer Management.
- CTA: Add Customer.
2. Customer Overview
- Relevant customer summary indicators.
3. Customer Search and Filters
- Search customers.
- Applicable customer filters.
- Sorting controls where supported.
4. Customer Table
- Customer identity and approved customer details.
- Customer status.
- Associated workspace information where available.
- Role-appropriate row actions.
5. Pagination
- Supported page sizes: 10, 25, 50, 100.
6. Customer Action Feedback
- Success and error messages.
- Confirmation dialogs for important actions.
2.4 ADD CUSTOMER
1. Page Header
- Title: Add Customer.
- Navigation back to Customer Management.
2. Customer Information Form
- Customer information fields confirmed by the SRS.
- Required-field indicators.
- Field-level validation.
3. Workspace Registration Information
- Information required for the associated farm workspace, where included in the confirmed registration workflow.
4. Form Actions
- Save/Create Customer CTA.
- Cancel CTA.
5. Confirmation and Feedback
- Confirmation where required.
- Success or error feedback.
2.5 WORKSPACE MANAGEMENT
1. Page Header
- Title: Workspace Management.
- Relevant workspace management actions.
2. Workspace Overview
- Workspace summary indicators.
- 2D visual area: status cards.
3. Workspace Search and Filters
- Search workspaces.
- Filter by applicable workspace status.
4. Workspace Table
- Workspace identity.
- Associated customer.
- Workspace status.
- Associated Farm Admin information where available.
- Available workspace actions.
5. Workspace Actions
- Create workspace through the confirmed provisioning workflow.
- View/manage workspace information.
- Access management and suspension actions where authorized.
6. Pagination and Feedback
- Pagination.
- Loading, empty, error, and success states.
2.6 FARM ADMIN MANAGEMENT
1. Page Header
- Title: Farm Admin Management.
2. Farm Admin Overview
- Relevant Farm Admin/account status indicators.
3. Farm Admin Search and Filters
- Search Farm Admin accounts.
- Applicable status filters.
4. Farm Admin Table
- Farm Admin identity.
- Associated customer/workspace.
- Account/access status.
- Available management actions.
5. Farm Admin Provisioning
- Create/provision Farm Admin account through the approved workspace setup workflow.
- Required account information.
- Validation and confirmation.
6. Feedback
- Success and error messages.
- Appropriate confirmation dialogs.
2.7 CUSTOMER ACCESS MANAGEMENT
1. Page Header
- Title: Customer Access Management.
2. Customer Selection/Search
- Search and select the relevant customer.
3. Workspace and Account Information
- Associated workspace.
- Relevant Farm Admin account.
- Current access status.
4. Access Management Controls
- Customer access information.
- Available access-management actions permitted by the SRS.
5. Confirmation
- Explain the effect of an access change.
- Confirm important changes.
6. Feedback
- Updated access status.
- Success or error message.
2.8 WORKSPACE SUSPENSION
1. Page Header
- Title: Workspace Suspension.
2. Workspace Search and Selection
- Find the relevant workspace.
- Display associated customer information.
3. Workspace Status
- Current workspace status.
- Relevant access information.
4. Suspension Action
- Available suspension action.
- Explanation of the impact of suspension.
5. Confirmation Dialog
- Workspace identification.
- Suspension consequence.
- Confirm or cancel action.
6. Result Feedback
- Updated workspace status.
- Success or error message.

3. Private Farm Management Application
Shared Farm Application layout
The Farm Admin and Supervisor experiences use the same SmartFarm visual language but have separate permission-based navigation and content.
Shared application shell
1. Sidebar
- SmartFarm logo or text lockup.
- Role-appropriate navigation.
- Active navigation state.
- Collapsed desktop sidebar.
- Mobile navigation drawer.
2. Application Header
- Current page context.
- Notification access.
- Relevant account controls.
3. Main Content
- Page heading.
- Page-specific content.
- Primary and secondary actions.
- Role-appropriate data and controls.
4. Feedback Layer
- Toast messages.
- Confirmation dialogs.
- Field validation.
- Loading and empty states.
5. Application Footer
- Minimal version or copyright information where required.

4. Farm Admin and Farm Supervisor pages
4.1 DASHBOARD
FARM ADMIN DASHBOARD
1. Page Header
- Dashboard title.
- Relevant date/context information.
2. Farm Overview
- Animal statistics.
- Milk production summary.
- Other approved farm overview indicators.
- 2D visual area: KPI cards.
3. Milk Production
- Daily milk production.
- Morning and evening production.
- Relevant production trends.
- 2D visual area: milk production chart.
4. Animal Health Overview
- Health alerts.
- Vaccination reminders.
- Disease and treatment-related summaries.
- Severity labels.
5. Feeding and Inventory Overview
- Feeding information.
- Inventory availability.
- Low-stock and expiry alerts where applicable.
6. Worker and Attendance Overview
- Attendance summary.
- Relevant worker statistics.
7. Financial Summary
- Approved income and expense summaries.
- Financial overview charts.
- 2D visual area: financial charts.
8. Recent Activity
- Relevant recent farm activity.
9. Dashboard Customization
- Admin-configurable dashboard widgets, as supported.
FARM SUPERVISOR DASHBOARD
1. Page Header
- Dashboard title.
- Relevant operational context.
2. Daily Operational Overview
- Supervisor-authorized operational indicators.
- 2D visual area: simplified KPI cards.
3. Milk Production
- Relevant milk production information.
- Production entry access.
4. Attendance
- Attendance/check-in/check-out access.
- Relevant daily attendance information.
5. Feeding
- Assigned feeding plan and schedule information.
- Actual feeding entry access.
6. Animal Operations
- Animal profile access.
- Permitted operational information.
7. Health Operations
- Permitted health record information.
- No High/Critical health alert access.
8. Equipment
- Equipment condition and maintenance information.
- Maintenance recording access.
9. Operational Notifications
- Supervisor-authorized notifications.

4.2 ANIMAL MANAGEMENT
ANIMAL LIST
1. Page Header
- Title: Animal List.
- Farm Admin CTA: Add Animal.
- Supervisor: permitted animal access only.
2. Animal Summary
- Relevant animal statistics.
- 2D visual area: KPI cards.
3. Search and Filters
- Search animals.
- Applicable animal grouping and status filters.
- Sorting controls.
4. Animal Records Table
- Animal identification.
- Relevant animal information.
- Group/status information.
- Role-appropriate actions.
5. Pagination
- Supported pagination controls.
6. Empty and Feedback States
- No animal records.
- Search results not found.
- Loading and error states.
ADD/EDIT ANIMAL
1. Page Header
- Add Animal or Edit Animal.
- Navigation back to Animal List.
2. Animal Identification
- Animal identification fields.
- Required field indicators.
3. Animal Details
- Relevant animal characteristics.
- Group assignment.
4. Parent and Calf Information
- Parent information where applicable.
- Calf relationship information.
5. Purchase and Lifecycle Information
- Applicable purchase details.
- Lifecycle information supported by the SRS.
6. Photos and Attachments
- Animal photo.
- Supporting attachments.
7. Form Actions
- Save CTA.
- Cancel CTA.
8. Validation and Confirmation
- Field-specific errors.
- Confirmation and save feedback.
ANIMAL PROFILE
1. Profile Header
- Animal identification.
- Animal photo.
- Relevant status.
- Admin-only management actions where authorized.
2. Animal Overview
- Core animal information.
- Group and parent information where available.
3. Lifecycle Information
- Purchase information.
- Lifecycle status and history summary.
4. Health Summary
- Permitted health record summary.
- Related health information.
5. Milk Production Summary
- Animal production information.
- 2D visual area: production chart where applicable.
6. Weight Summary
- Latest recorded weight.
- Weight history overview.
- 2D visual area: weight trend chart.
7. Related Records
- Lifecycle History.
- Weight History.
- Relevant supporting records.
LIFECYCLE HISTORY
1. Page Header
- Title: Lifecycle History.
- Animal identification.
2. Lifecycle Overview
- Relevant lifecycle status.
3. Lifecycle Records
- Recorded lifecycle events.
- Relevant event details and dates.
4. Record Actions
- Authorized record management actions.
- Confirmation and feedback.
WEIGHT HISTORY
1. Page Header
- Title: Weight History.
- Animal identification.
2. Current Weight Summary
- Latest recorded weight.
- Measurement unit.
3. Weight Trend
- Historical weight records.
- 2D visual area: weight history line chart.
- Axis labels, dates, units, and tooltips.
4. Weight Records Table
- Recorded weight.
- Record date.
- Available supporting information.
5. Record Actions
- Permitted add/edit actions.
- Validation and feedback.

4.3 ANIMAL HEALTH
HEALTH RECORDS
1. Page Header
- Title: Health Records.
- Farm Admin management actions.
- Supervisor permitted entry/access.
2. Health Overview
- Relevant health record summaries.
- Severity indicators.
3. Search and Filters
- Search animal health records.
- Filter by animal, date, and applicable severity/status.
4. Health Records Table
- Animal identification.
- Health event.
- Date.
- Severity: Low, Moderate, High, Critical.
- Relevant record status.
5. Record Details and Actions
- Open health record details.
- Role-appropriate actions.
6. Feedback
- Loading, empty, error, and success states.
TREATMENTS
1. Page Header
- Title: Treatments.
- Authorized Add Treatment CTA.
2. Treatment Search and Filters
- Animal selection.
- Date and applicable record filters.
3. Treatment Records
- Animal.
- Treatment details.
- Relevant dates.
- Related health information.
4. Treatment Details
- Treatment information.
- Supporting record details.
5. Actions and Feedback
- Permitted create/edit actions.
- Validation and confirmation.
VACCINATIONS
1. Page Header
- Title: Vaccinations.
- Authorized Add Vaccination CTA.
2. Vaccination Overview
- Vaccination records.
- Due and upcoming reminders.
3. Search and Filters
- Search by animal.
- Applicable date and status filters.
4. Vaccination Records Table
- Animal identification.
- Vaccination details.
- Date.
- Due information.
- Status.
5. Vaccination Details
- Relevant vaccination information.
- Supporting record details.
6. Reminders and Feedback
- Due vaccination indicators.
- Relevant notification information.
- Success and error feedback.
VETERINARY APPOINTMENTS
1. Page Header
- Title: Veterinary Appointments.
- Authorized Add Appointment CTA.
2. Appointment Overview
- Relevant appointment information.
3. Search and Filters
- Animal.
- Appointment date.
- Applicable appointment status.
4. Appointment Records
- Animal identification.
- Appointment information.
- Scheduled date.
- Relevant details.
5. Appointment Details
- Veterinary appointment information.
- Related health information where available.
6. Actions and Feedback
- Permitted appointment management.
- Confirmation and validation.
DISEASE HISTORY
1. Page Header
- Title: Disease History.
2. Disease Overview
- Relevant recorded disease information.
3. Search and Filters
- Search by animal.
- Applicable date and severity filters.
4. Disease History Records
- Animal identification.
- Disease information.
- Recorded date.
- Relevant severity and status.
5. Related Health Information
- Relevant treatment and health record references.
6. Feedback
- Loading, empty, and error states.

4.4 MILK PRODUCTION
PRODUCTION ENTRY
1. Page Header
- Title: Production Entry.
2. Production Date and Session
- Production date.
- Morning/evening session selection.
3. Animal Selection
- Search/select animal.
- Relevant animal identification.
4. Production Information
- Milk quantity.
- Measurement unit clearly displayed.
- Quality: Good, Average, Poor.
5. Entry Validation
- Required fields.
- Numeric validation.
- Unit clarity.
6. Form Actions
- Save Production CTA.
- Cancel CTA.
7. Save Feedback
- Success/error feedback.
- Loading state.
ANIMAL PRODUCTION HISTORY
1. Page Header
- Title: Animal Production History.
2. Animal Selection
- Search/select animal.
3. Production Summary
- Relevant production totals.
- Selected period.
4. Production Trend
- 2D visual area: animal production chart.
- Morning/evening comparisons where supported.
- Units and dates.
5. Production Records
- Date.
- Session.
- Recorded quantity.
- Quality.
6. Filters and Feedback
- Date filters.
- Empty, loading, and error states.
DAILY TOTALS
1. Page Header
- Title: Daily Totals.
- Date selection.
2. Farm Production Summary
- Total daily production.
- Morning total.
- Evening total.
3. Production Breakdown
- Animal-level production totals.
- 2D visual area: daily production breakdown.
4. Production Records
- Relevant daily production entries.
- Quality information.
5. Daily Production Chart
- Visual representation of approved daily totals.
- Labels, units, and tooltips.
6. Feedback
- Loading, empty, and error states.
MONTHLY REPORTS
1. Page Header
- Title: Monthly Reports.
2. Reporting Period
- Month/year selection.
3. Monthly Production Summary
- Monthly total.
- Relevant daily and session summaries.
4. Production Trend
- 2D visual area: monthly production chart.
5. Production Breakdown
- Relevant daily totals.
- Animal production information where supported.
6. Report Records
- Monthly production data.
- Dates, quantities, and units.
7. Export/Print Actions
- Approved report export and print options.

4.5 MILK MANAGEMENT
COLLECTION
1. Page Header
- Title: Collection.
2. Collection Overview
- Relevant milk collection summary.
3. Collection Records
- Collection date/time.
- Relevant quantity.
- Applicable session information.
4. Collection Details
- Supporting collection information.
5. Record Actions
- Permitted collection recording and management.
6. Feedback
- Validation, success, empty, and error states.
STORAGE
1. Page Header
- Title: Storage.
2. Storage Overview
- Current recorded milk storage information.
- Relevant quantity and units.
3. Storage Records
- Recorded storage information.
- Dates and quantities.
4. Storage Details
- Relevant storage record details.
5. Actions and Feedback
- Permitted storage record operations.
- Validation and confirmation.
MILK SALES
1. Page Header
- Title: Milk Sales.
- Authorized Add Sale CTA.
2. Sales Overview
- Relevant sales totals and payment status indicators.
- 2D visual area: summary cards.
3. Search and Filters
- Search sales.
- Date and payment-status filters.
4. Sales Records
- Customer.
- Quantity.
- Price.
- Payment method.
- Paid/unpaid status.
- Sale date.
5. Sale Details
- Customer and sale information.
- Quantity and pricing information.
- Payment details.
6. Record Actions
- Permitted sales management.
- Confirmation where required.
7. Feedback
- Success, error, loading, and empty states.
WASTAGE RECORDS
1. Page Header
- Title: Wastage Records.
- Authorized Add Wastage CTA.
2. Wastage Overview
- Recorded wastage summary.
- Estimated loss summary where supported.
3. Search and Filters
- Date and applicable record filters.
4. Wastage Records Table
- Date.
- Quantity.
- Relevant wastage information.
- Estimated loss.
5. Wastage Details
- Supporting record information.
6. Actions and Feedback
- Permitted record management.
- Validation and confirmation.

4.6 INVENTORY
INVENTORY LIST
1. Page Header
- Title: Inventory List.
- Farm Admin: authorized inventory management actions.
- Supervisor: permitted inventory viewing and usage access.
2. Inventory Overview
- Relevant stock indicators.
- Low-stock and expiry information.
- 2D visual area: KPI cards and status badges.
3. Search and Filters
- Search inventory items.
- Categories: Feed, Medicines, Other.
- Applicable stock and expiry filters.
4. Inventory Table
- Item name.
- Category.
- Quantity.
- Unit.
- Relevant stock information.
- Expiry information where applicable.
5. Pagination
- Supported page sizes.
6. Feedback
- Loading, empty, and error states.
ITEM DETAILS
1. Page Header
- Item name.
- Category.
- Relevant management actions.
2. Item Overview
- Item details.
- Current stock.
- Unit.
- Expiry information where applicable.
3. Stock Information
- Relevant stock records.
- Low-stock indicators.
4. Purchase and Addition History
- Related stock entries.
5. Adjustment and Usage History
- Relevant adjustments.
- Recorded usage.
6. Actions
- Farm Admin: authorized item management.
- Supervisor: permitted usage-related access.
PURCHASES
1. Page Header
- Title: Purchases.
- Authorized Add Purchase CTA.
2. Purchase Overview
- Relevant purchase information.
3. Search and Filters
- Item.
- Date.
- Applicable category filters.
4. Purchase Records
- Item.
- Purchase quantity.
- Unit.
- Purchase information.
- Date.
5. Purchase Details
- Supporting purchase information.
6. Actions and Feedback
- Permitted purchase operations.
- Validation and confirmation.
STOCK ADDITIONS
1. Page Header
- Title: Stock Additions.
- Authorized Add Stock CTA.
2. Item Selection
- Search/select inventory item.
3. Addition Information
- Quantity.
- Measurement unit.
- Relevant addition details.
4. Addition Records
- Historical stock additions.
- Date and item information.
5. Form Actions
- Save CTA.
- Cancel CTA.
6. Validation and Feedback
- Success/error feedback.
STOCK ADJUSTMENTS
1. Page Header
- Title: Stock Adjustments.
- Farm Admin only.
2. Item Selection
- Search/select inventory item.
3. Current Stock Information
- Existing quantity.
- Unit.
4. Adjustment Information
- Adjustment quantity.
- Adjustment reason.
5. Adjustment History
- Previous adjustments.
- Relevant dates and reasons.
6. Form Actions
- Save Adjustment CTA.
- Cancel CTA.
7. Confirmation and Feedback
- Confirm adjustment.
- Display result.

4.7 FEEDING
FEEDING PLANS
1. Page Header
- Title: Feeding Plans.
- Farm Admin: authorized plan management.
- Supervisor: permitted plan viewing.
2. Feeding Plan Overview
- Existing plans.
- Relevant effective dates.
3. Plan Search and Filters
- Search plans.
- Filter by animal/group and applicable status.
4. Feeding Plan Records
- Plan name/details.
- Assigned animal or group.
- Feed items.
- Quantity and unit.
- Effective dates.
5. Plan Details
- Feed items and quantities.
- Assigned animals/groups.
- Schedule information.
6. Actions and Feedback
- Role-appropriate actions.
- Validation and confirmation.
FEEDING SCHEDULE
1. Page Header
- Title: Feeding Schedule.
2. Schedule Overview
- Default morning/evening schedule.
- Custom schedule information where configured.
3. Schedule Filters
- Date.
- Animal/group.
- Applicable schedule filters.
4. Schedule Records
- Feeding time.
- Assigned animal/group.
- Feed information.
- Quantity and unit.
5. Schedule Details
- Relevant feeding plan information.
6. Feedback
- Loading, empty, and error states.
ACTUAL FEEDING RECORDS
1. Page Header
- Title: Actual Feeding Records.
- Supervisor operational entry access.
2. Feeding Date and Schedule
- Feeding date.
- Feeding time/session.
3. Animal/Group Selection
- Select assigned animal or group.
4. Actual Feeding Information
- Feed item.
- Actual quantity.
- Measurement unit.
- Relevant record details.
5. Recorded Feeding History
- Previous actual feeding records.
- Relevant dates and quantities.
6. Form Actions
- Save Feeding Record CTA.
- Cancel CTA.
7. Validation and Feedback
- Success/error messages.
- Loading state.

4.8 WORKERS
WORKER LIST
1. Page Header
- Title: Worker List.
- Farm Admin: authorized Add Worker CTA.
- Supervisor: permitted worker access.
2. Worker Overview
- Relevant worker statistics.
3. Search and Filters
- Search workers.
- Applicable status filters.
4. Worker Records Table
- Worker identity.
- Relevant worker details.
- Applicable employment information.
5. Pagination
- Supported page sizes.
6. Feedback
- Empty, loading, and error states.
WORKER PROFILES
1. Profile Header
- Worker identity.
- Relevant profile information.
2. Worker Information
- Personal and employment details.
- Relevant worker records.
3. Identification Information
- CNIC information.
- Uniqueness validation where applicable.
4. Worker Documents
- Uploaded documents.
- Document details.
5. Related Attendance Information
- Relevant attendance records where authorized.
6. Related Records
- Applicable worker-related information.
7. Actions and Feedback
- Authorized profile management.
- Validation and confirmation.
WORKER DOCUMENTS
1. Page Header
- Title: Worker Documents.
2. Worker Selection
- Search/select worker.
3. Document Overview
- Available worker documents.
4. Document Records
- Document name/type.
- Relevant document information.
- Upload/record details.
5. Document Actions
- Permitted document management.
- Validation and feedback.

4.9 ATTENDANCE
ATTENDANCE RECORDS
1. Page Header
- Title: Attendance Records.
2. Attendance Overview
- Relevant attendance summary.
- 2D visual area: attendance KPI cards.
3. Date and Worker Filters
- Date selection.
- Search/select worker.
- Applicable attendance filters.
4. Attendance Records Table
- Worker.
- Date.
- Attendance status.
- Check-in/check-out information.
- Relevant overtime records.
5. Attendance Details
- Supporting attendance information.
6. Actions and Feedback
- Role-appropriate record management.
- Success and error states.
CHECK-IN/CHECK-OUT
1. Page Header
- Title: Check-in/Check-out.
2. Worker Selection
- Search/select worker.
3. Attendance Date
- Relevant attendance date.
4. Check-in/Check-out Controls
- Check-in action.
- Check-out action.
- Relevant recorded times.
5. Attendance Status
- Present.
- Absent.
- Late.
- Leave.
6. Overtime Information
- Relevant overtime record entry where supported.
7. Action Feedback
- Success confirmation.
- Validation and error messages.
LEAVE MANAGEMENT
1. Page Header
- Title: Leave Management.
- Farm Admin: authorized leave approval controls.
2. Leave Overview
- Relevant leave records and status indicators.
3. Search and Filters
- Worker.
- Date.
- Leave status.
4. Leave Records
- Worker.
- Leave information.
- Relevant dates.
- Approval status.
5. Leave Details
- Supporting leave information.
6. Approval Actions
- Farm Admin-only approval/rejection controls where supported.
- Confirmation dialog.
7. Feedback
- Success, error, and empty states.

4.10 PAYROLL
Farm Admin only — Supervisor has no payroll access.
SALARY MANAGEMENT
1. Page Header
- Title: Salary Management.
2. Worker Selection
- Search/select worker.
3. Salary Information
- Monthly or daily wage type.
- Salary amount.
- Applicable salary information.
4. Attendance-Related Information
- Relevant attendance data used in payroll calculations.
5. Salary Records
- Worker salary information.
- Relevant effective dates.
6. Actions and Feedback
- Authorized salary management.
- Validation and confirmation.
PAYROLL RECORDS
1. Page Header
- Title: Payroll Records.
2. Payroll Period
- Relevant month/period selection.
3. Payroll Overview
- Relevant payroll summaries.
- 2D visual area: summary cards.
4. Payroll Records Table
- Worker.
- Wage information.
- Attendance information.
- Applicable adjustments.
- Payment status.
5. Payroll Details
- Salary calculation information.
- Attendance-related values.
- Manual adjustments.
6. Actions
- Permitted payroll record management.
- Relevant confirmation.
7. Feedback
- Loading, empty, and error states.
ADVANCES
1. Page Header
- Title: Advances.
2. Worker Selection
- Search/select worker.
3. Advance Entry
- Advance amount.
- Date.
- Relevant record details.
4. Advance History
- Previous advances.
- Worker and amount information.
5. Actions and Feedback
- Save CTA.
- Validation and confirmation.
DEDUCTIONS
1. Page Header
- Title: Deductions.
2. Worker Selection
- Search/select worker.
3. Deduction Entry
- Deduction amount.
- Date.
- Deduction information.
4. Deduction History
- Previous deductions.
- Relevant payroll records.
5. Actions and Feedback
- Save CTA.
- Validation and confirmation.
PAYSLIPS
1. Page Header
- Title: Payslips.
2. Worker and Payroll Period Selection
- Search/select worker.
- Select payroll period.
3. Payslip Information
- Worker details.
- Salary information.
- Attendance information.
- Advances and deductions.
- Relevant payable amount.
4. Payslip Preview
- Structured printable payslip.
- 2D visual area: document layout, not decorative graphics.
5. Payslip Actions
- Download PDF.
- Print.

4.11 FINANCE
Farm Admin only — Supervisor has no finance access.
INCOME RECORDS
1. Page Header
- Title: Income Records.
- Authorized Add Income CTA.
2. Income Overview
- Relevant income summary.
- 2D visual area: KPI cards.
3. Search and Filters
- Date range.
- Income category.
- Applicable search filters.
4. Income Records Table
- Date.
- Category.
- Amount.
- Relevant description.
5. Income Details
- Supporting income information.
6. Actions and Feedback
- Authorized record management.
- Validation and confirmation.
EXPENSE RECORDS
1. Page Header
- Title: Expense Records.
- Authorized Add Expense CTA.
2. Expense Overview
- Relevant expense summary.
3. Search and Filters
- Date range.
- Expense category.
- Applicable search filters.
4. Expense Records Table
- Date.
- Category.
- Amount.
- Relevant description.
5. Expense Details
- Supporting expense information.
6. Actions and Feedback
- Authorized record management.
- Validation and confirmation.
FINANCIAL DASHBOARD
1. Page Header
- Title: Financial Dashboard.
2. Reporting Period
- Daily, weekly, monthly, or custom date range.
3. Financial KPI Overview
- Relevant income.
- Relevant expenses.
- Approved profit/loss summary.
- 2D visual area: KPI cards.
4. Income and Expense Analysis
- Relevant financial comparisons.
- 2D visual area: chart with readable labels and units.
5. Financial Trends
- Approved financial trend information.
- 2D visual area: line/bar charts where applicable.
6. Financial Records Summary
- Relevant income and expense records.
7. Report Actions
- Available report access and export options.
FINANCIAL REPORTS
1. Page Header
- Title: Financial Reports.
2. Reporting Period
- Daily, weekly, monthly, or custom date range.
3. Financial Summary
- Relevant income and expenses.
- Approved profit/loss information.
4. Financial Analysis
- 2D visual area: approved financial charts.
5. Financial Report Data
- Structured financial records.
- Relevant categories and totals.
6. Export and Print Actions
- PDF.
- Excel.
- Print.

4.12 EQUIPMENT
EQUIPMENT LIST
1. Page Header
- Title: Equipment List.
- Farm Admin: authorized equipment management actions.
- Supervisor: permitted equipment access.
2. Equipment Overview
- Relevant equipment summary.
- Condition indicators.
3. Search and Filters
- Search equipment.
- Applicable condition/status filters.
4. Equipment Table
- Equipment identification.
- Equipment details.
- Condition.
- Relevant status.
5. Pagination
- Supported pagination.
6. Feedback
- Loading, empty, and error states.
EQUIPMENT DETAILS
1. Profile Header
- Equipment name.
- Identification.
- Current condition.
- Authorized management actions.
2. Equipment Information
- Equipment details.
- Relevant condition information.
3. Maintenance Summary
- Relevant maintenance information.
4. Usage Summary
- Recorded usage information.
5. Related History
- Maintenance History.
- Usage Records.
6. Actions and Feedback
- Role-appropriate actions.
- Confirmation and validation.
MAINTENANCE HISTORY
1. Page Header
- Title: Maintenance History.
- Equipment identification.
2. Maintenance Overview
- Relevant maintenance information.
3. Maintenance Records
- Maintenance dates.
- Maintenance details.
- Relevant equipment condition information.
4. Maintenance Details
- Supporting maintenance information.
5. Record Actions
- Farm Admin: permitted management.
- Supervisor: permitted maintenance/condition updates.
6. Feedback
- Success, error, and empty states.
USAGE RECORDS
1. Page Header
- Title: Usage Records.
- Equipment identification.
2. Usage Overview
- Relevant recorded equipment usage.
3. Usage Records Table
- Usage date.
- Equipment identification.
- Relevant usage information.
4. Usage Details
- Supporting usage record information.
5. Record Actions
- Authorized usage recording and management.
6. Feedback
- Loading, empty, and error states.

4.13 NOTIFICATIONS
NOTIFICATION CENTER
1. Page Header
- Title: Notification Center.
2. Notification Overview
- Relevant notification summary.
- Unread/read indicators.
3. Notification Filters
- Read/unread.
- Relevant notification categories.
4. Notification List
- Health notifications.
- Vaccination reminders.
- Production alerts.
- Low-stock notifications.
- Other authorized operational notifications.
5. Notification Details
- Notification message.
- Relevant date/time.
- Related record reference where available.
6. Notification Actions
- Read/unread actions where supported.
- Authorized notification actions.
7. Feedback
- Empty, loading, and error states.
NOTIFICATION HISTORY
1. Page Header
- Title: Notification History.
2. Search and Filters
- Notification category.
- Date.
- Read/unread status.
3. Notification History Records
- Notification information.
- Date/time.
- Relevant status.
4. Notification Details
- Full relevant notification information.
5. Feedback
- Empty, loading, and error states.

4.14 REPORTS
MILK REPORTS
1. Page Header
- Title: Milk Reports.
2. Reporting Period
- Daily, monthly, or applicable date range.
3. Milk Production Summary
- Relevant total production.
- Morning/evening totals.
- Measurement units.
4. Production Analysis
- 2D visual area: production charts.
- Clear axes, labels, legends, and units.
5. Production Breakdown
- Animal production information.
- Relevant production records.
6. Report Data Table
- Structured production information.
7. Export and Print Actions
- Supported report output options.
FINANCIAL REPORTS
1. Page Header
- Title: Financial Reports.
2. Reporting Period
- Daily, weekly, monthly, or custom date range.
3. Financial Summary
- Income.
- Expenses.
- Approved profit/loss information.
4. Financial Analysis
- 2D visual area: approved financial charts.
5. Financial Report Data
- Structured financial records.
6. Export and Print Actions
- PDF.
- Excel.
- Print.
AVAILABLE DATA EXPORTS
1. Page Header
- Title: Available Data Exports.
2. Exportable Data Categories
- Available approved farm data categories.
3. Export Configuration
- Relevant data selection.
- Applicable date range or filters.
4. Export Format
- Excel.
- CSV.
5. Export Actions
- Export CTA.
6. Feedback
- Loading state.
- Success/error feedback.
- No-data state.

4.15 SETTINGS
Farm Admin only — Supervisor has no farm settings access.
FARM PROFILE
1. Page Header
- Title: Farm Profile.
2. Farm Information
- Farm identity.
- Approved farm profile fields.
3. Profile Details
- Relevant farm information.
4. Form Actions
- Save Changes CTA.
- Cancel CTA.
5. Validation and Feedback
- Field-level errors.
- Save confirmation.
UNITS
1. Page Header
- Title: Units.
2. Measurement Preferences
- Supported measurement unit settings.
3. Unit Configuration
- Relevant farm measurement preferences.
- Clearly displayed units.
4. Save Actions
- Save Changes CTA.
- Cancel CTA.
5. Feedback
- Validation and success/error messages.
CURRENCY
1. Page Header
- Title: Currency.
2. Currency Selection
- Farm currency selection.
3. Formatting Preview
- Relevant numeric/currency presentation.
4. Save Actions
- Save Changes CTA.
- Cancel CTA.
5. Feedback
- Validation and confirmation.
TIMEZONE
1. Page Header
- Title: Timezone.
2. Timezone Selection
- Farm timezone setting.
3. Configuration Preview
- Relevant date/time context.
4. Save Actions
- Save Changes CTA.
- Cancel CTA.
5. Feedback
- Validation and success/error messages.
PREFERENCES
1. Page Header
- Title: Preferences.
2. Date and Time Format
- Configurable date format.
- Configurable time format.
3. Numeric Formatting
- Numeric grouping.
- Configured precision.
4. Application Preferences
- Approved farm/application preferences.
- Optional theme preference where supported by the design system.
5. Save Actions
- Save Changes CTA.
- Cancel CTA.
6. Feedback
- Validation and save confirmation.
NOTIFICATIONS SETTINGS
1. Page Header
- Title: Notifications.
2. Notification Preferences
- Approved notification preferences.
3. Delivery Options
- In-app notifications.
- Email notifications where supported.
4. Notification Configuration
- Relevant available notification settings.
5. Save Actions
- Save Changes CTA.
- Cancel CTA.
6. Feedback
- Success/error messages.
- Delivery-related feedback where supported.
CONFIGURATION
1. Page Header
- Title: Configuration.
2. Module Configuration
- Approved configurable modules.
3. Farm Configuration
- Relevant farm-specific application settings.
4. Configuration Actions
- Save Changes CTA.
- Cancel CTA.
5. Confirmation and Feedback
- Confirmation for important changes.
- Success/error feedback.

4.16 DATA MANAGEMENT
Farm Admin only — Supervisor has no data-management access.
IMPORT
1. Page Header
- Title: Import.
2. Import Data Selection
- Approved importable data categories.
3. File Upload
- Excel/CSV file selection.
- Supported file information.
4. Import Validation
- File validation.
- Relevant field/data validation.
- Validation errors and warnings.
5. Import Review
- Available import information.
- Relevant records and issues.
6. Import Actions
- Confirm Import CTA.
- Cancel CTA.
7. Import Result
- Success/error feedback.
- Relevant import outcome.
EXPORT
1. Page Header
- Title: Export.
2. Data Selection
- Approved exportable data categories.
3. Export Filters
- Relevant date range and filters.
4. Export Format
- Excel.
- CSV.
5. Export Actions
- Export CTA.
6. Export Feedback
- Loading state.
- Success/error feedback.
BACKUP CONFIGURATION
1. Page Header
- Title: Backup Configuration.
2. Backup Overview
- Relevant backup status information.
3. Backup Configuration
- Automatic/manual backup options.
- Available local/cloud backup options where supported.
4. Backup Records
- Relevant backup history and status.
5. Backup Actions
- Manual backup action.
- Configuration save action.
6. Confirmation and Feedback
- Confirmation for important operations.
- Success/error feedback.
7. Recovery Dependency
- Restore workflows and controls only after the client confirms the outstanding backup/recovery requirements.
ACTIVITY LOGS
1. Page Header
- Title: Activity Logs.
2. Activity Search and Filters
- Search relevant activity.
- Date and applicable activity filters.
3. Activity Records Table
- Relevant activity.
- User/actor information where available.
- Date/time.
- Related record information.
4. Activity Details
- Relevant recorded activity details.
5. Feedback
- Loading, empty, and error states.

5. Role-based page access and restrictions
Page/module	Farm Admin	Farm Supervisor
Dashboard	Full permitted dashboard	Operational dashboard
Animal List	Manage and view	Permitted view
Add/Edit Animal	Authorized management	Restricted
Animal Profile	Full permitted access	Permitted access
Lifecycle History	Authorized access	Restricted as applicable
Weight History	Authorized access	Permitted access as allowed
Health Records	Full permitted access	Permitted health records
Treatments	Authorized access	Permitted operational access
Vaccinations	Authorized access	Permitted operational access
Veterinary Appointments	Authorized access	Restricted management
Disease History	Full permitted access	Restricted High/Critical access
Milk Production	Full permitted access	Operational entry/access
Milk Management	Full permitted access	Only permitted operations
Inventory	Full permitted access	View and permitted usage
Stock Adjustments	Authorized	No access
Feeding Plans	Manage	View
Feeding Schedule	Manage	View
Actual Feeding Records	Manage	Record actual feeding
Workers	Manage	Permitted access
Attendance	Manage	Daily attendance operations
Leave Management	Approve/manage	No approval access
Payroll	Full permitted access	No access
Finance	Full permitted access	No access
Equipment	Manage	View and permitted updates
Notifications	Full permitted access	Operational notifications
Reports	Full permitted access	Only authorized information
Settings	Full permitted access	No access
Data Management	Full permitted access	No access


6. Visual and interaction placement rules
Area	2D visual treatment	Motion	3D
Public hero	Authentic dairy photography, organic shapes	Subtle entrance/reveal	None
Public features	Outline icons and illustrations	Restrained scroll reveal	None
Public dashboard preview	Product screenshots and charts	Chart/screenshot reveal	None
Super Admin dashboard	KPI cards, status indicators, approved charts	Subtle card/chart transitions	None
Customer/workspace tables	Status badges and structured tables	Row hover and feedback	None
Farm Admin dashboard	KPI cards, production/financial charts	Chart entrance and counter updates using actual data	None
Supervisor dashboard	Operational KPI cards and status indicators	Subtle operational feedback	None
Animal profiles	Animal photography and 2D charts	Tab/section transitions	None
Health	Severity badges and status indicators	Notification feedback	None
Milk production	Production charts and tables	Actual-data chart rendering	None
Inventory	Stock indicators and tables	Status update feedback	None
Feeding	Schedule and record layouts	Form and dropdown transitions	None
Attendance	Status badges and structured records	Save/check-in feedback	None
Payroll	Structured tables and payslip layouts	Short feedback transitions	None
Finance	2D financial charts	Chart rendering	None
Equipment	Equipment photos where supplied, condition indicators	Status feedback	None
Notifications	Notification icons and status badges	Badge and read/unread feedback	None
Reports	2D charts and data tables	Chart rendering	None
Settings	Standard forms and controls	Dropdown/modal transitions	None
Data Management	Structured records and status indicators	Progress only when actual progress is available	None

Global implementation requirements for every data-driven page:
- Loading: skeletons or action spinners.
- Empty: helpful empty state and permitted next action.
- Success: clear success feedback.
- Error: understandable error message.
- Validation: field-specific feedback.
- Disabled: visually distinguishable controls.
- Confirmation: explicit summary for important actions.
- Permission denied: clear access explanation.
- No results: search/filter-specific empty state.
- Responsive: desktop, tablet, and mobile behavior.
- Accessibility: keyboard support, visible focus, associated form labels, readable contrast, and status indicators that do not rely on color alone.
- Reduced motion: respect operating-system preferences.
No 3D scenes, WebGL, interactive 3D models, or simulated data animations are included anywhere in this sitemap.

Scope boundary: Multi-farm switching, Super Admin support access into farm data, unresolved calculation interfaces, breeding workflows, and backup restoration workflows are not added as pages because they remain dependent on client clarification or are not confirmed in the approved page list.