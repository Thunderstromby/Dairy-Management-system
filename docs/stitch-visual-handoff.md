# SmartFarm — Stitch Visual Handoff

**Document:** `docs/stitch-visual-handoff.md`  
**Prepared:** 24 November 2026  
**Scope:** Four uploaded Stitch export archives, inspected in their exact archived form. No source archive was altered.  
**Evidence status:** All registered HTML files were opened and parsed directly; representative PNG files from each package were opened for visual inspection. An individual screenshot not opened is **UNPROVEN** as visual evidence. The standalone project `design.md` was **not supplied or found in accessible project files**; token comparison uses the previously stated SmartFarm design-blueprint baseline and is explicitly labeled provisional until `design.md` is supplied.

## 1. Source packages

| Surface | ZIP name | HTML | PNG | Archive test |
|---|---|---:|---:|---|
| Public | `stitch_smartfarm_homepage_experience.zip` | 7 | 11 | PASS (testzip returned None) |
| Super Admin | `stitch_smartfarm_super_admin_console.zip` | 14 | 3 | PASS (testzip returned None) |
| Farm Admin | `stitch_smartfarm_dairy_admin_portal.zip` | 67 | 51 | PASS (testzip returned None) |
| Farm Supervisor | `stitch_smartfarm_supervisor_interface_shell.zip` | 20 | 16 | PASS (testzip returned None) |

**Verified total:** 108 HTML files and 81 PNG assets in these four selected archives. These are archive entries, not necessarily 108 distinct product pages. The alternative `(1).zip` snapshots are not included in this four-package baseline.

### Inspection method and limitations

- Read every HTML entry from the ZIP; parsed visible text, first H1/H2, style/script content, icon and font references, controls and anchors. Screen-register headings come from actual parsed HTML; when no H1/H2 exists this is stated.
- Opened representative PNG previews from every surface in a multi-image visual contact sheet. This is a **sample** review, not a claim that every PNG was visually opened or that the designs were tested in a browser.
- Counted archive PNG assets independently of screens; assets may be missing, extra, or differently named.
- No original export HTML, PNG, or ZIP was edited.

## 2. Authority statement

> Stitch exports are **visual reference material**—not specifications of system behavior, data models, permissions, automation, calculations, API contracts, or feature scope. The confirmed SmartFarm SRS, role/permission matrix, business rules, and approved sitemap supersede any prototype text, fake statuses, controls, or workflows displayed in generated HTML. Where documents are silent, mark **OPEN QUESTION**; do not silently adopt a Stitch invention.

## 3. Token reconciliation

**Baseline qualification:** No directly accessible file named `design.md` was located. The target column is the **previously supplied SmartFarm design direction** (design system / blueprint recorded in the project conversation), **not a direct inspection of `design.md`**. If a real `design.md` exists, re-run this reconciliation and treat that file as authoritative.

| Token | Target from stated design baseline (`design.md` verification: UNPROVEN) | Directly observed exports | Unification rule |
|---|---|---|
| Primary/brand | Deep Olive `#46583B` | Public heavily uses `#183F30`, `#397A58`; Super Admin and farm panels contain `#46583B`, plus different sage/lime neutrals | Make olive/sage/copper the shared semantic palette; public may use darker green as branded editorial variation. |
| Supporting palette | Sage `#89977A`, Copper `#B8794B`, Warm Stone `#F4F2EC`, Charcoal `#292D28`, Border `#DFDED5` | Admin/farm panels frequently use `#FBF9F3`, `#D9E8C7`, `#B8CDA8`, `#1B1C18`, `#E4E2DD`; Super Admin favors `#F7FAF2`; public uses `#F7F7F1` | Map observed colors to semantic tokens; eliminate accidental role-to-role drift while preserving approved surface-specific emphasis. |
| Typography | Manrope headings + Inter body | Public also references `DM Serif Display`; Super Admin mostly `Plus Jakarta Sans`; farm panels Manrope/Inter | Use Manrope + Inter as application default. Permit public-site editorial display face **only if approved in `design.md`**. |
| Icons | Lucide line icons | Material Symbols font references appear across the ZIPs (including font URLs/class names); true Lucide use is not consistently established | Replace icon-font glyphs with Lucide components in React; preserve size/meaning, do not treat existing glyphs as design authority. |
| Appearance | Coherent light and dark mode | Most HTML is light-only; sparse `dark:` classes, no demonstrated complete theme coverage | Implement semantic theme variables and check every reusable component in both appearances; do not claim dark mode is done based on a toggle. |
| Shape and density | Warm minimalism, consistent radius/spacing | Public has expansive editorial sections; admin panels dense cards/tables; Supervisor compact task-first modules | Preserve differences in density but unify corner radius scale, spacing, borders, shadows, focus and status treatments. |

### Observed evidence by surface

| Surface | Most frequent literal colors (not exhaustive) | Referenced fonts (examples) | Material font / `dark:` / placeholder-link screens |
|---|---|---|
| Public | `#183F30`, `#397A58`, `#DCE3DA`, `#25332C`, `#58675D` | `Manrope`, `Material Symbols Outlined`, `Inter`, `DM Serif Display`, `Reenie Beanie` | 5 / 0 / 7 |
| Super Admin | `#FFFFFF`, `#F7FAF2`, `#191D18`, `#E0E4DC`, `#D9E8C7` | `Material Symbols Outlined`, `Plus Jakarta Sans` | 14 / 0 / 13 |
| Farm Admin | `#FFFFFF`, `#FBF9F3`, `#1B1C18`, `#E4E2DD`, `#B8CDA8` | `Material Symbols Outlined`, `Inter`, `Manrope` | 67 / 1 / 66 |
| Farm Supervisor | `#FFFFFF`, `#FBF9F3`, `#1B1C18`, `#E4E2DD`, `#B8CDA8` | `Material Symbols Outlined`, `Inter`, `Manrope` | 20 / 0 / 18 |

The counts above mean **files containing a pattern**, not instances of that pattern. `href="#"` is a placeholder, not functioning routing; occurrence counts are not behavior verification.

## 4. Visual grammar to preserve

- **Public website:** airy editorial hero/sections, multi-column explanatory content, benefit/feature narratives, photographic blocks, prominent green conversion CTA, long-form vertical rhythm and consistent footer. Do not convert every section into dashboard cards.
- **Private page shell:** compact left rail/sidebar, active navigation, top utility/header, role/workspace identity, clear page heading, consistent content width, responsive sidebar drawer. Supervisor and Admin must look related without exposing the same actions.
- **Hierarchy:** primary H1 and contextual subtitle, optional breadcrumb, summary strip, filters/CTA, core table/form/chart, supporting detail and state panels. Avoid stacking unexplained KPIs.
- **Cards:** understated surfaces, soft outline/border, modest radii, scarce shadows, readable key numbers and captions. Cards must not invent real-time measurements.
- **Tables:** filter/search toolbar, column labels and units, readable row density, status chips, action menus conditioned by role, pagination or scroll treatment.
- **Forms:** label-first fields, helpful unit text, required/optional differentiation only when SRS confirms it, validation/error/help, save/cancel placement and responsive layout.
- **Charts:** period labels, units and legends; no fictitious predictive metrics or unsupported formulas.
- **Status display:** distinguish record status (e.g. Paid/Unpaid; Active/Sold/Deceased/Removed) from connectivity, security or hardware status; do not invent extra transitions.
- **Responsive behavior:** public stacked sections and mobile nav; dashboard metrics wrap; dense tables scroll or use a designed mobile card alternative; forms use single-column mobile; avoid fixed overflow. Screenshot samples suggest vertical layout composition but **full responsive breakpoints/keyboard behavior are UNPROVEN without runtime testing**.

## 5. Page patterns and reusable component map

| Surface | Observed page families | Frontend composition pattern |
|---|---|---|
| Public | Home, About, Features, Benefits, How It Works, Dashboard Preview, Contact | MarketingShell + Header/Nav + editorial content sections + CTA + Footer. Dashboard preview is marketing illustration, **not** authenticated farm access. |
| Super Admin | Sign In, Platform Dashboard, Customer Register/List/Detail, Workspace Create/List/Detail, Farm Admin Provision/List/Detail, completion states | PlatformShell + permission-aware lists/detail panels + create/provision form + confirmation state. Do not assume generated analytics or tenant-management operations are all approved. |
| Farm Admin | Auth/states; farm operations; animals/health; milk; inventory/feeding; workforce/payroll; finance; equipment; notifications/reports; settings/data/supervisor access | FarmShell + module page templates (directory, profile, history, entry form, report, settings, confirmation). |
| Farm Supervisor | Sign In/states; operational dashboard; permitted animal/health; production; assigned feeding and usage; attendance; equipment; notifications; restricted reporting | FarmShell visual tokens with **separately permissioned Supervisor navigation/actions**, task-first forms, restricted records. |

### Reusable component mapping

| Visual reference | Candidate React component | Critical rule |
|---|---|
| All private sidebars and headers | `AppShell`, `Sidebar`, `Topbar`, `Breadcrumbs`, `RoleIdentity`, `ThemeToggle` | Compose different nav configs by role; do not share routes/permissions by default. |
| Directory/list screens | `PageHeader`, `FilterBar`, `DataTable`, `Pagination`, `StatusBadge`, `EmptyState` | Columns, row actions, export visibility depend on policy. |
| Details, animal/equipment/worker profiles | `DetailHeader`, `InfoGrid`, `HistoryTimeline`, `DocumentList` | Field visibility differs even when UI shell is identical. |
| Entry/edit screens | `Field`, `Select`, `DatePicker`, `FormSection`, `ValidationMessage`, `ConfirmDialog` | Only approved actions and fields; mock events are not API logic. |
| Farm dashboards/production reports | `StatCard`, `ChartCard`, `DateRangeFilter`, `Legend`, `TrendGraph` | Numbers and alerts need approved sources/formulas. |
| Notifications and system states | `NotificationList`, `AlertBanner`, `Skeleton`, `ErrorState`, `AccessDenied`, `ConnectionRequired` | Notification severity and visibility enforced by server later. |
| Public content | `MarketingHeader`, `Hero`, `FeatureSection`, `SplitMedia`, `CTASection`, `MarketingFooter` | Avoid copying private-application controls into public surfaces. |

**Non-negotiable:** a **shared visual component never means shared permissions**. Farm Admin and Supervisor may render the same table or form shell, while having different records, fields and authorized actions. Server enforcement is required in the real product; UI hiding alone is insufficient.

## 6. Known generated-content problems — NOT requirements

| Observed issue | Where (verified examples and pattern evidence) | Instruction |
|---|---|---|
| Icon font differs from target | Material Symbols font/classes across all four source families | Implement Lucide; do not preserve font-based icons by inertia. |
| Missing complete dark-mode variants | Most source screens lack `dark:`; actual cross-screen visual dark state UNPROVEN | Build semantic theme in React and visually test light/dark for each template. |
| Placeholder links | `href="#"` found in public, Super Admin, Farm Admin and Supervisor HTML | Treat as visuals only; route later using approved sitemap; no claims of working navigation. |
| Fake live/sync/quota | Farm Admin shared sidebar and pages; Supervisor shell/dashboard; some public preview examples | Remove unsupported "Live", "SYNCED", "Storage Quota" indicators; do not treat sample as telemetry. |
| Hardware / telemetry / RFID | Farm Admin milk/health/inventory/equipment screens; Supervisor equipment, report, login/shell; public copy | Remove hardware integrations absent from SRS; retain only actual record-entry semantics. |
| Offline functionality | Supervisor `workspace_states_system_modals`; other offline reference texts | No offline data entry or local queue; connectivity-required state is legitimate. Interpret context before removing the word offline. |
| Extra login methods | Supervisor `supervisor_sign_in` and state screens; Admin sign-in copy | Use approved login/password and recovery; no RFID/NFC/PIN/passkey schemes unless separately approved. |
| Hardcoded currency | Farm Admin `currency_settings`, animal/finance/payroll templates; USD/$ samples | Currency is farm-configured; do not make USD universal or embed unapproved conversion rules. |
| Stale demo dates | Multiple farm-panel tables and charts showing earlier years | Use clearly labeled examples; make dates internally consistent, not implied current data. |
| Invented statuses and workflows | Super Admin provisioning and farm screens; milk dispatch, treatments, equipment, notifications | Cross-check SRS and business rules; delete unsupported steps/statuses; unresolved values = OPEN QUESTION. |
| Invented calculations | Farm Admin financial/payroll and milk; predicted health/feeding figures | No implementation from mock calculations; only confirmed formulas/thresholds where fully defined. |
| Role-exceeding buttons | Supervisor operational report export, animal archive/edits, stock corrections/leave approval when present | Check action-level permission per screen; suppress unauthorized controls and enforce server side later. |
| Marketing promises treated as features | Public feature copy or dashboard preview could imply sensors/automation | Marketing text is concept art, not scope approval. Rewrite to confirmed benefits. |
| Sample legal/security/compliance claims | Industrial labels, invented certifications and policy names in multiple screens | Remove unless approved and substantiated. |

Pattern presence is a **review signal**, not automatic proof of a violation in every matching file: e.g., an offline *error message* can be correct, or "live" can appear in ordinary prose. Read the control context before editing.

## 7. Exported variants and canonical choice

| Screen family | Exported variants in selected baseline | Canonical choice | Reason / limits |
|---|---|---|
| Farm Admin — Module Configuration | `module_configuration_1`, `module_configuration_2` | **`module_configuration_2`** (provisional visual baseline) | `_2` presents simpler module settings; `_1` contains more invented operational parameters. Validate every field against SRS. |
| Farm Admin — Notification Settings | `notification_settings_1`, `notification_settings_2` | **`notification_settings_2`** (provisional visual baseline) | `_2` narrows configuration toward notification preferences and includes limited dark utility styling. Does **not** establish complete dark support. |
| Import Data | `import_data` (only one in selected 67-screen ZIP) | **`import_data`** | No `_1`/`_2` alternative in this selected archive; previous snapshots cannot be silently merged. |
| Backup Configuration | `backup_configuration` (only one in selected ZIP) | **`backup_configuration`** | Only one exported entry in selected baseline. |
| Other screens | No matched `_1`/`_2` pairs detected within selected four ZIPs | Keep original source path | Do not infer alternate design from similar screen titles or other ZIP snapshots. |

If you intentionally choose the alternative Farm Admin snapshot `stitch_smartfarm_dairy_admin_portal (1).zip`, re-run the register and variant selection: it is a **different archive** (71 HTML files) and is not the baseline selected here. Keep one canonical folder per implemented application page.

## 8. Full screen register — opened HTML files

The **main heading** column is extracted from the first `<h1>` or `<h2>` in each actual HTML file, rather than inferred from the folder name. Mapping is interpretive and must be checked against the approved sitemap. **UNPROVEN** means the heading or exact sitemap equivalence cannot be established from the exported HTML alone. Screen counts do not equal page counts because component/state references and combined views exist.

| Source folder (`<package>/<folder>`) | Main heading from HTML | Mapped sitemap page / pattern | Role | Notes |
|---|---|---|---|---|
| `stitch_smartfarm_homepage_experience/smartfarm_contact_page` | Let's talk about better-connected dairy farm management. | Contact | Public | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_homepage_experience/smartfarm_about_page` | Better understanding. Better connected dairy farming. | About | Public | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_homepage_experience/smartfarm_dashboard_preview_page` | A clearer view of your dairy farm management. | Dashboard Preview (public) | Public | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Marketing preview, not private dashboard |
| `stitch_smartfarm_homepage_experience/smartfarm_benefits_page` | More clarity across the work that keeps your farm moving. | Benefits | Public | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_homepage_experience/smartfarm_public_website_homepage` | The intelligence behind better dairy farming. | Home | Public | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_homepage_experience/smartfarm_features_page` | Everything your dairy farm needs to stay connected. | Features | Public | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_homepage_experience/smartfarm_how_it_works_page` | From farm setup to everyday management. | How It Works | Public | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_super_admin_console/super_admin_sign_in` | Enterprise Dairy Management & Tenant Administration | Super Admin Sign In | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/platform_analytics_dashboard` | Dashboard | Platform Dashboard | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/customer_management` | Customer Management | Customer Management | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/farm_admin_accounts` | Farm Admin Accounts | Farm Admin Accounts | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/workspace_management` | Workspace Management | Workspace Management | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/register_customer_form_validation_states` | Register Customer | Register Customer | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/customer_registered_successfully` | Customer Registered Successfully | Customer registration confirmation | Super Admin | State/confirmation reference; No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/customer_details_highland_dairy_collective` | Highland Dairy Collective | Customer Details | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/create_farm_workspace` | Create Farm Workspace | Create Farm Workspace | Super Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/farm_workspace_created_successfully` | Confirmed Farm Workspace Details | Workspace creation confirmation | Super Admin | State/confirmation reference; No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/workspace_details_highland_north_rotary_unit` | NO H1/H2 — heading unproven | Workspace Details | Super Admin | No H1/H2; exact main heading UNPROVEN; No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_super_admin_console/farm_admin_account_details_thomas_wright` | Thomas Wright | Farm Admin Account Details | Super Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_super_admin_console/provision_farm_admin_account` | Provision Farm Admin | Provision Farm Admin Account | Super Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_super_admin_console/farm_admin_account_provisioned_successfully` | Farm Admin Account Provisioned Successfully | Provision confirmation | Super Admin | State/confirmation reference; PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/farm_admin_sign_in` | SmartFarm | Sign-in & access / Farm Admin Sign In | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/password_reset_flow` | Reset Farm Admin Password | Sign-in & access / Password Reset Flow | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/workspace_access_system_states` | Farm Workspace Suspended | Sign-in & access / Workspace Access System States | Farm Admin | State/confirmation reference; No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/foundational_design_system_components` | SmartFarm Farm Admin UI Foundation & Design System | Design reference / Foundational Design System Components | Farm Admin | Component reference; not route; PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/farm_operations_dashboard` | Farm Operations Dashboard | Dashboard / Farm Operations Dashboard | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/herd_registry_animal_directory` | Herd Registry & Animal Directory | Animals / Herd Registry Animal Directory | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/add_animal_form_validation` | Add Animal | Animals / Add Animal Form Validation | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/lifecycle_lineage_history` | Bella Prime | Animals / Lifecycle Lineage History | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/animal_profile_360_view` | Bella Prime | Animals / Animal Profile 360 View | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/weight_history_growth_analytics` | Bella Prime #ET-GF-8849 | Animals / Weight History Growth Analytics | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/health_records_severity_triage` | Health Records & Severity Triage | Animal Health / Health Records Severity Triage | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/vaccination_schedules_prophylaxis_ledger` | Vaccinations & Prophylaxis Ledger | Animal Health / Vaccination Schedules Prophylaxis Ledger | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/clinical_treatments_prescription_log` | Clinical Treatments & Prescription Log | Animal Health / Clinical Treatments Prescription Log | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/veterinary_appointments_clinical_schedule` | Veterinary Appointments & Clinical Schedule | Animal Health / Veterinary Appointments Clinical Schedule | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/production_entry` | Milk Production Entry | Milk Production / Production Entry | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/animal_production_history` | Individual Animal Production History | Milk Production / Animal Production History | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/daily_totals` | Daily Milk Production Totals | Milk Production / Daily Totals | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/monthly_reports` | Monthly Milk Production & Compliance Reports | Milk Production / Monthly Reports | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/milk_collection_intake_log` | Milk Collection & Intake Log | Milk Management / Milk Collection Intake Log | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/bulk_tank_container_storage` | Milk Storage & Bulk Containers | Milk Management / Bulk Tank Container Storage | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/milk_sales_commercial_dispatch` | Milk Sales & Commercial Orders | Milk Management / Milk Sales Commercial Dispatch | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/milk_wastage_usage_records` | Milk Wastage & Usage Records | Milk Management / Milk Wastage Usage Records | Farm Admin | No same-folder PNG; screenshot evidence UNPROVEN |
| `stitch_smartfarm_dairy_admin_portal/item_details` | High-Protein Soy Concentrate | Inventory / Item Details | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/inventory_list` | Inventory List | Inventory / Inventory List | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/purchases_inbound_invoices` | Inventory Purchases & Inbound Invoices | Inventory / Purchases Inbound Invoices | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/stock_additions` | Inventory Stock Additions | Inventory / Stock Additions | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/stock_adjustments` | Historical Stock Adjustments Ledger | Inventory / Stock Adjustments | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/feeding_schedule` | Feeding Schedule | Feeding / Feeding Schedule | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/feeding_plans` | Feeding Plans | Feeding / Feeding Plans | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/actual_feeding_records` | Actual Feeding Intake & Execution Records | Feeding / Actual Feeding Records | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/add_worker` | Register New Farm Worker | Workers / Add Worker | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/worker_directory` | Farm Workforce Directory & Records | Workers / Worker Directory | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/worker_profile` | Marcus Brody | Workers / Worker Profile | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/worker_documents` | Worker Documents & Statutory Verification | Workers / Worker Documents | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/attendance_records` | Farm Workforce Attendance Records & Corrections | Attendance / Attendance Records | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/manual_check_in_check_out_overtime` | Manual Attendance Entry & Overtime Ledger | Attendance / Manual Check In Check Out Overtime | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/leave_management` | Farm Workforce Leave Management & Absence Approvals | Attendance / Leave Management | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/salary_management` | Farm Workforce Salary & Wage Structure Management | Payroll / Salary Management | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Formulas unresolved where not in business rules |
| `stitch_smartfarm_dairy_admin_portal/payroll_records` | Payroll Records | Payroll / Payroll Records | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Formulas unresolved where not in business rules |
| `stitch_smartfarm_dairy_admin_portal/salary_advances` | Farm Workforce Salary Advances Ledger & Recovery | Payroll / Salary Advances | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Formulas unresolved where not in business rules |
| `stitch_smartfarm_dairy_admin_portal/payroll_deductions` | Farm Workforce Payroll Deductions Ledger | Payroll / Payroll Deductions | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Formulas unresolved where not in business rules |
| `stitch_smartfarm_dairy_admin_portal/payslips` | Worker Payslips & Disbursement Vouchers | Payroll / Payslips | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/financial_dashboard` | Farm Financial Performance & Operational Cash Flow | Finance / Financial Dashboard | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Formulas unresolved where not in business rules |
| `stitch_smartfarm_dairy_admin_portal/income_records` | Farm Income Records & Revenue Streams | Finance / Income Records | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/expense_records` | Farm Expense Records & Outflow Ledger | Finance / Expense Records | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/financial_reports` | Farm Financial Reports & Statement Generator | Finance / Financial Reports | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Formulas unresolved where not in business rules |
| `stitch_smartfarm_dairy_admin_portal/equipment_list` | Farm Equipment & Machinery Inventory | Equipment / Equipment List | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/equipment_details` | Jaylor 5850 TMR Vertical Feed Mixer Wagon | Equipment / Equipment Details | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/maintenance_history` | Farm Equipment Maintenance History | Equipment / Maintenance History | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/usage_records` | Farm Equipment Usage & Operational Activity Records | Equipment / Usage Records | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/notification_center` | Farm Notification Center & Active Alert Hub | Notifications / Notification Center | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/notification_history` | Farm Notification History & Delivery Archive | Notifications / Notification History | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/available_data_exports` | Farm Workspace Data Export Center | Reports & Exports / Available Data Exports | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/milk_reports` | Farm Milk Production Reports & Shift Analytics | Reports & Exports / Milk Reports | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/units_of_measurement` | Units of Measurement & Dimension Standards | Settings / Units Of Measurement | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/timezone_settings` | Timezone Settings & Operational Clock | Settings / Timezone Settings | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/farm_profile` | Farm Profile & Operational Identity | Settings / Farm Profile | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/currency_settings` | Farm Currency & Monetary Presentation | Settings / Currency Settings | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/interface_preferences` | Interface Preferences & Regional Numerics | Settings / Interface Preferences | Farm Admin | Component reference; not route; PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/module_configuration_1` | Module Configuration & Operational Parameters | Settings / Module Configuration | Farm Admin | Variant `_1`; noncanonical; PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/notification_settings_1` | Notification Preferences & Channel Routing | Notifications / Notification Settings | Farm Admin | Variant `_1`; noncanonical; PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/supervisor_access` | Supervisor Access Management | Supervisor Access / Supervisor Access | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/disease_history_pathological_surveillance` | Disease History & Pathological Surveillance | Animal Health / Disease History Pathological Surveillance | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/notification_settings_2` | Notification Settings | Notifications / Notification Settings | Farm Admin | Variant `_2`; canonical provisional; PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/import_data` | Import Data | Data Management / Import Data | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/backup_configuration` | Backup Configuration | Data Management / Backup Configuration | Farm Admin | PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_dairy_admin_portal/module_configuration_2` | Module Configuration | Settings / Module Configuration | Farm Admin | Variant `_2`; canonical provisional; PNG exists; individual screenshot visual review UNPROVEN unless sampled |
| `stitch_smartfarm_supervisor_interface_shell/supervisor_sign_in` | SmartFarm Dairy | Supervisor Sign In | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/supervisor_shell_component_system` | Workspace Architecture & Component System | Component / shell reference | Farm Supervisor | Component reference; not route; PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/workspace_states_system_modals` | Supervisor Workspace Active · Greenfield Dairy Estate | Workspace access & error states | Farm Supervisor | State/confirmation reference; PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/farm_supervisor_dashboard` | Farm Supervisor Dashboard | Supervisor Dashboard | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/animal_directory_herd_manifest` | Animal Directory & Herd Manifest | Animal List | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/animal_profile_nl_84920_a` | NL-84920-A | Animal Profile | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/permitted_weight_history_nl_84920_a` | NO H1/H2 — heading unproven | Weight History | Farm Supervisor | No H1/H2; exact main heading UNPROVEN; No same-folder PNG; screenshot evidence UNPROVEN; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/treatment_vaccination_records_operational_view` | Treatments, Vaccinations & Veterinary Care | Treatments + Vaccinations (combined) | Farm Supervisor | Combined view; PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/permitted_health_records_observation_entry` | Permitted Animal Health Records | Health Records + permitted entry | Farm Supervisor | Combined view; PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/milk_production_entry_session_recording` | Milk Production Entry | Milk Production Entry | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/daily_production_totals_monthly_summary` | Daily Production Totals & Operational Summary | Daily Totals + Monthly Summary (combined) | Farm Supervisor | Combined view; No same-folder PNG; screenshot evidence UNPROVEN; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/actual_feeding_records_entry` | Record Actual Feeding Delivery | Actual Feeding | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/permitted_inventory_daily_usage_logging` | Permitted Field Inventory & Daily Usage Logging | Inventory View + Usage (combined) | Farm Supervisor | Combined view; PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/assigned_feeding_plans_daily_schedule` | Assigned Feeding Plans & Daily Schedule | Assigned Feeding Plans + Schedule (combined) | Farm Supervisor | Combined view; PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/worker_attendance_records_shift_log` | Worker Attendance Records & Daily Shift Roster | Attendance Records | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/tactile_worker_check_in_check_out_console` | Worker Check-In & Check-Out Console | Check-in / Check-out | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/supervisor_notification_center_operational_alerts` | Operational Notifications & Alert Center | Notification Center | Farm Supervisor | No same-folder PNG; screenshot evidence UNPROVEN; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/equipment_maintenance_usage_records` | Equipment Maintenance & Usage Records | Maintenance + Usage (combined) | Farm Supervisor | Combined view; No same-folder PNG; screenshot evidence UNPROVEN; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/equipment_inventory_condition_management` | Equipment Inventory & Condition Management | Equipment List + Condition (combined) | Farm Supervisor | Combined view; PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |
| `stitch_smartfarm_supervisor_interface_shell/permitted_operational_shift_milk_production_report` | Permitted Operational Shift & Milk Production Report | Operational Milk Report | Farm Supervisor | PNG exists; individual screenshot visual review UNPROVEN unless sampled; Role-filter fields/actions |

### Screen register interpretation

- The Super Admin exported completion screens are confirmation **states** associated with forms, not necessarily independent sitemap routes.
- Supervisor combines some views within the same exported HTML (`treatment_vaccination`, `daily_production_totals_monthly_summary`, feeding plan/schedule, equipment usage/maintenance), so do not duplicate screens just to match a source-folder count.
- Both design-system HTML files are **component/reference sheets**, not authenticated product routes.
- Sitemap mapping is based on screen content and earlier known SmartFarm module taxonomy; the exact text of the authoritative sitemap was not independently re-opened in this turn. Where an exact one-to-one page title is needed, that match remains **UNPROVEN** until the sitemap is checked.

## 9. Per-screen acceptance checklist

Apply this checklist to **every** row above; record PASS / FAIL / UNPROVEN in the frontend review tracker. No row is automatically PASS because its HTML was opened.

- [ ] **Reference identity:** selected the correct canonical source folder and recorded its ZIP and screenshot filename.
- [ ] **Role and sitemap:** mapped to an approved page or explicitly tagged component/state; all visible actions checked against permission matrix.
- [ ] **Heading and section order:** matches approved sitemap (not merely Stitch heading).
- [ ] **Visible fields:** all form labels, units, status values, filters, record columns and conditions checked against SRS/business rules.
- [ ] **No invented content:** no unsupported telemetry, hardware, offline data entry, login methods, regulatory claims, quotas, workflows or formulas.
- [ ] **Mock data honesty:** static example values are labeled/handled as illustrative; currency and demo date are configured/consistent.
- [ ] **Component match:** tokens, heading scale, spacing, border, form/control treatment and icon meaning align with reconciled design system.
- [ ] **Light and dark:** both variants checked visually, not just the presence of a toggle or Tailwind config.
- [ ] **Responsive:** desktop, tablet and phone layouts verified with overflow, nav and long tables.
- [ ] **State coverage:** loading, empty, invalid input, errors, no connection, unauthorized state, success where permitted.
- [ ] **Accessibility:** keyboard focus, semantic labels, contrast, readable chart semantics and reduced-motion support where motion exists.
- [ ] **Navigation later:** when implemented, links map to approved routes; `href="#"` is not accepted as working navigation.
- [ ] **No unauthorized leakage:** restricted records/aggregates/exports absent in Supervisor and guest views; back end must independently enforce permissions.
- [ ] **Traceability:** documented differences from Stitch and rationale (SRS correction, theme unification, accessibility or responsive adaptation).

### Surface-specific acceptance gates

| Surface | Additional required gate |
|---|---|
| Public | Contact/inquiry experience promises only approved capabilities; preview is clearly illustrative and no guest data access. |
| Super Admin | Customer/workspace provisioning and account management actions are confirmed; admin cannot access arbitrary tenant operations unless approved. |
| Farm Admin | Farm configured currency, approved finance/payroll logic and high/critical notifications; stock and milk business rules verified. |
| Farm Supervisor | No finance/payroll/leave approval/stock correction/animal archive/unauthorized exports; high/critical **notifications** hidden; permitted historical records must be checked separately. |

## 10. Source-of-truth order

1. **SmartFarm SRS v1.0 and confirmed client requirements** — what exists, user journeys, constraints, entities, nonfunctional requirements.
2. **Role & Permission Matrix and Business Rules** — authorized actions, field visibility, state transitions, calculations, unresolved cases.
3. **Approved Sitemap and Design Blueprint / `design.md`** — page inventory, section order, approved brand and interaction direction.
4. **This handoff guide** — inspected observations, mapping choices, reconciliations and warnings; subordinate to source documents.
5. **Actual Stitch HTML and screenshots** — layout and visual ideas only; never product authority.

If two requirements at the same level conflict, do not guess. Document the ambiguity for client/product approval. **UNPROVEN is not permission to invent.**

## 11. Deliberately not decided here

- Backend architecture, API endpoints, schema, database technology and infrastructure.
- Routing framework, state-management library, React file organization, authentication provider and deployment implementation.
- New permissions, record ownership, workspace exceptions, approval chains, exports and audit authority beyond confirmed matrix.
- Missing salary/payroll formulas, rounding, payment reconciliation, stock deduction rules, production-drop comparison details or other OPEN QUESTION items.
- Real notification delivery cadence, backup frequency/retention, import mapping/duplicate handling, and device synchronization.
- Offline data entry (excluded from existing stated scope) or IoT/hardware integrations (not approved).
- Final English copy, actual customers/animal records, production values, current dates, legal/compliance claims, and photography licensing.
- Exact `design.md` tokens until that file is supplied; exact sitemap page-by-page equivalence until the authoritative sitemap is re-opened for cross-reference.
- Whether missing screenshot assets imply missing designs; PNG availability and rendered UI correctness are separate observations.

---

**Handoff rule for future AI:** Open the relevant HTML and preview image, identify the visual pattern, then validate each screen against the SRS, permission matrix, business rules and sitemap. Reuse composition, **not invented behavior**. When a fact cannot be verified from the supplied source, write **UNPROVEN** or **OPEN QUESTION** rather than silently filling it in.
