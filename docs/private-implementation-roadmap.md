# Private interface implementation roadmap

**Authority:** owner instruction 28 November 2026 to complete all private screens without per-screen approval.  
**Source of truth:** `docs/srs.md`, `docs/role-permission-matrix.md`, `docs/sitemap.md` §2–3, `docs/stitch-visual-handoff.md`, and the actual Stitch `code.html` files. Stitch defines visual appearance only; it does not grant permissions or business rules.

## Status legend

NOT STARTED · IN PROGRESS · IMPLEMENTED · VERIFIED · BLOCKED (conflict with locked rules)

## Super Admin — `design/stitch_smartfarm_super_admin_console`

| Order | Stitch folder | Route id | Status |
| --- | --- | --- | --- |
| 1 | `super_admin_sign_in` | `platform.login` | VERIFIED (commit `01f4577`) |
| 2 | `platform_analytics_dashboard` | `platform.dashboard` | IMPLEMENTED (browser-checked) |
| 3 | `customer_management` | `platform.customers` | IMPLEMENTED (browser-checked) |
| 4 | `register_customer_form_validation_states` | `platform.customers.new` (state reference) | IMPLEMENTED |
| 5 | `customer_details_highland_dairy_collective` | `platform.customers.detail` | IMPLEMENTED (browser-checked) |
| 6 | `customer_registered_successfully` | success state, no route | IMPLEMENTED (reference only) |
| 7 | `workspace_management` | `platform.workspaces` | IMPLEMENTED (browser-checked) |
| 8 | `create_farm_workspace` | `platform.workspaces.new` | IMPLEMENTED (browser-checked) |
| 9 | `workspace_details_highland_north_rotary_unit` | `platform.workspaces.detail` | IMPLEMENTED (browser-checked) |
| 10 | `farm_workspace_created_successfully` | success state, no route | IMPLEMENTED (reference only) |
| 11 | `farm_admin_accounts` | `platform.farm-admins` | IMPLEMENTED (browser-checked) |
| 12 | `provision_farm_admin_account` | `platform.farm-admins.new` | IMPLEMENTED (browser-checked) |
| 13 | `farm_admin_account_details_thomas_wright` | `platform.farm-admins.detail` | IMPLEMENTED (browser-checked) |
| 14 | `farm_admin_account_provisioned_successfully` | success state, no route | IMPLEMENTED (reference only) |
| 15 | `customer_access_management` | `platform.customer-access` | BLOCKED (no Stitch source; existing prototype retained) |
| 16 | `workspace_suspension` | `platform.workspace-suspension` | BLOCKED (no Stitch source; existing prototype retained) |
| — | `agroterra_executive` | no `code.html` — design reference only | BLOCKED (no source) |

## Farm Admin — `design/stitch_smartfarm_dairy_admin_portal`

Folders with `code.html` are ported as content components. Canonical versions are `_2` for `notification_settings` and `module_configuration`, matching the routes; `_1` variants are retained as references. State/validation folders are rendered as explicit reference screens, not new routes.

| Module | Representative folders | Route ids | Status |
| --- | --- | --- | --- |
| Dashboard | `farm_operations_dashboard` | `farm.dashboard` | IMPLEMENTED (browser-checked) |
| Animals | `herd_registry_animal_directory`, `animal_profile_360_view`, `add_animal_form_validation`, `lifecycle_lineage_history`, `weight_history_growth_analytics` | `farm.animals`, `.new`, `.profile`, `.lifecycle`, `.weight` | IMPLEMENTED (browser-checked) |
| Health | `health_records_severity_triage`, `clinical_treatments_prescription_log`, `disease_history_pathological_surveillance`, `vaccination_schedules_prophylaxis_ledger`, `veterinary_appointments_clinical_schedule` | `farm.health.*` | IMPLEMENTED (browser-checked) |
| Milk | `milk_collection_intake_log`, `production_entry`, `daily_totals`, `animal_production_history`, `monthly_reports`, `milk_reports`, `bulk_tank_container_storage`, `milk_sales_commercial_dispatch`, `milk_wastage_usage_records` | `farm.milk.*`, `farm.reports.milk` | IMPLEMENTED (browser-checked) |
| Inventory | `inventory_list`, `item_details`, `purchases_inbound_invoices`, `stock_additions`, `stock_adjustments`, `usage_records` | `farm.inventory*` | IMPLEMENTED (browser-checked) |
| Feeding | `feeding_plans`, `feeding_schedule`, `actual_feeding_records` | `farm.feeding.*` | IMPLEMENTED (browser-checked) |
| Workers / attendance | `worker_directory`, `add_worker`, `worker_profile`, `worker_documents`, `attendance_records`, `leave_management`, `manual_check_in_check_out_overtime` | `farm.workers*`, `farm.attendance.*` | IMPLEMENTED (`add_worker` has no route) |
| Payroll / finance | `payroll_records`, `payroll_deductions`, `salary_advances`, `salary_management`, `payslips`, `income_records`, `expense_records`, `financial_dashboard`, `financial_reports` | `farm.payroll.*`, `farm.finance.*`, `farm.reports.financial` | IMPLEMENTED (browser-checked) |
| Equipment | `equipment_list`, `equipment_details`, `maintenance_history` | `farm.equipment*` | IMPLEMENTED (browser-checked) |
| Notifications / settings / data | `notification_center`, `notification_history`, `notification_settings_1/2`, `supervisor_access`, `farm_profile`, `currency_settings`, `timezone_settings`, `units_of_measurement`, `interface_preferences`, `module_configuration_1/2`, `backup_configuration`, `import_data`, `available_data_exports`, `workspace_access_system_states`, `password_reset_flow`, `foundational_design_system_components` | `farm.notifications*`, `farm.settings.*`, `farm.data.*`, `farm.reports.exports` | IMPLEMENTED (canonical `_2` variants routed) |
| — | `agroterra_dairy_admin` | no `code.html` — design reference only | BLOCKED (no source) |

## Supervisor — `design/stitch_smartfarm_supervisor_interface_shell`

| Module | Representative folders | Route ids | Status |
| --- | --- | --- | --- |
| Access | `supervisor_sign_in`, `farm_supervisor_dashboard` | `farm.login`, `farm.dashboard` (role-specific) | IMPLEMENTED (browser-checked) |
| Animals / health | `animal_directory_herd_manifest`, `animal_profile_nl_84920_a`, `permitted_health_records_observation_entry`, `treatment_vaccination_records_operational_view`, `permitted_weight_history_nl_84920_a` | `farm.animals`, permitted health only | IMPLEMENTED (browser-checked) |
| Milk | `milk_production_entry_session_recording`, `daily_production_totals_monthly_summary` | `farm.milk.production-entry`, `farm.milk.daily-totals` | IMPLEMENTED (browser-checked) |
| Feeding / inventory | `assigned_feeding_plans_daily_schedule`, `actual_feeding_records_entry`, `permitted_inventory_daily_usage_logging` | `farm.feeding.*`, inventory usage only | IMPLEMENTED (browser-checked) |
| Attendance / equipment | `worker_attendance_records_shift_log`, `tactile_worker_check_in_check_out_console`, `equipment_inventory_condition_management`, `equipment_maintenance_usage_records` | `farm.attendance.*`, `farm.equipment*` | IMPLEMENTED (browser-checked) |
| Reports / notices | `permitted_operational_shift_milk_production_report`, `supervisor_notification_center_operational_alerts` | `farm.reports.milk`, `farm.notifications` | IMPLEMENTED (browser-checked) |
| References | `workspace_states_system_modals`, `supervisor_shell_component_system` | no new route | IMPLEMENTED (reference only) |
| — | `smartfarm_supervisor_os` | no `code.html` — design reference only | BLOCKED (no source) |

## Known conflicts resolved by neutral substitution (no permission granted)

- Concrete identities in exports (`highland_dairy_collective`, `thomas_wright`, `nl_84920_a`, personal staff names) → neutral placeholders.
- Supervisor `tactile_worker_check_in_check_out_console` → manual record-entry preview only (no hardware/IoT).
- Supervisor `supervisor_notification_center_operational_alerts` → routine notices only (no High/Critical alerts).
- Finance/payroll, leave approval, stock correction, archive and backup/export controls are Farm Admin-only; Supervisor variants are informational only.
- All metric values are explicitly labelled “Illustrative”; no formulas, persistence or live status are implied.

## Deferred visual fidelity corrections (owner decision 28 November 2026)

The owner explicitly **does not approve** the measured differences below as final. They are recorded for targeted correction and were **not modified** during the `add_worker` integration:

| Screen | Original measurement | After targeted correction (1440×900) | Status |
| --- | --- | --- | --- |
| Super Admin dashboard | 20.9% changed pixels; background `#F7FAF2` vs app `#F7F7F1`; Plus Jakarta Sans vs Inter; duplicate H1 from app shell | H1 duplicate removed; per-surface shell canvas `#F7FAF2`; 21.4% changed pixels remain — shell/topbar and approved font substitution still differ | PARTIALLY CORRECTED |
| Farm Admin dashboard | 21.1% changed pixels; text length 6427 vs 4654; background `#FBF9F3` vs app `#F7F7F1` | Restored `Feeding Plans & Shift Allocations` and `Feed Stock & Critical Reminders` sections (text 5168); per-surface canvas `#FBF9F3`; 24.4% changed pixels remain | PARTIALLY CORRECTED |
| Supervisor daily totals | 41.9% changed pixels; text length 5112 vs 2234; buttons 17 vs 7 | Restored named pen groups, 7-day/milking/ledger/monthly headings and aggregate section (text 2340); 45.1% changed pixels remain because the app uses tabs and hides most restored sections by default | PARTIALLY CORRECTED — further structural change (removing tabs) and any font change need approval |

Any restoration of Stitch content, per-interface background tokens or font treatment must be checked against the SRS/permission matrix first; unsupported functionality must be reported, not implemented. Plus Jakarta Sans is not an approved font, so Manrope/Inter remain in force pending an ACR.

## Private dashboard typography (owner-approved typography-only override)

Plus Jakarta Sans is used for private headings and KPI values; DM Sans is used for navigation, forms, tables, buttons and supporting text. Tokens are scoped to `.sf-shell`, `.sf-login-wrap` and `.sf-private-auth`, so public-site typography (Manrope/Inter) is unchanged. No layout, permission, data or business-rule changes were made with this override.

## Shared foundation

`apps/web/src/features/workspace/AppShell.tsx` provides the role shells; ported screens are content-only. The role-aware registry `apps/web/src/features/private/privateScreens.ts` maps route ids to lazy-loaded screen components, selecting Supervisor variants when the prototype role is `farm-supervisor`. Approved tokens: Manrope headings, Inter body, Lucide icons, Stitch surface/outline colors per interface. No backend or database work was performed.
