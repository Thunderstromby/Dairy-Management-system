# Stitch export coverage register

**Status:** ACTIVE GATE — all 108 `code.html` exports accounted for; no page marked PASS  
**Authority:** `AGENTS.md`, `docs/sitemap.md`, `docs/design.md`, `docs/role-permission-matrix.md`, `docs/stitch-visual-handoff.md`

All Stitch files are **visual references only**. Exported labels, fields, statuses, calculations, navigation and workflows are never copied as authoritative behavior. Where an export conflicts with an approved rule, the conflict is excluded and recorded below.

Every row remains **PENDING** until both reviews are recorded in `docs/visual-review-tracker.md`:

- **Visual review:** approved Stitch screen, reconciled tokens, responsive layout, accessibility and motion.
- **Functional review:** SRS, permission matrix, business rules, OPEN QUESTION handling and role guards.

## Public website — 7 exports

| Stitch export | Implementation disposition | Boundary applied | Visual | Functional |
|---|---|---|---|---|
| `smartfarm_public_website_homepage` | `public.home` | Owner-approved Stitch Home visual composition; ACR-003 permits the Stitch-hosted images; ACR-002 motif is the image-failure fallback; ACR-004 adds the local logo fallback and below-footer static strip | PENDING | PENDING |
| `smartfarm_about_page` | `public.about` | ACR-004 source-owned visual port; no Googleusercontent imagery; no unapproved claims or imagery treated as licensed | PENDING | PENDING |
| `smartfarm_features_page` | `public.features` | ACR-004 source-owned visual port; no Googleusercontent imagery; twelve approved module labels; no fake snapshots or RFID/IoT | PENDING | PENDING |
| `smartfarm_how_it_works_page` | `public.how-it-works` | ACR-004 source-owned visual port; no Googleusercontent imagery; pricing excluded; no checkout or subscription | PENDING | PENDING |
| `smartfarm_benefits_page` | `public.benefits` | ACR-004 source-owned visual port; no Googleusercontent imagery; neutral benefit copy; no fake metrics | PENDING | PENDING |
| `smartfarm_dashboard_preview_page` | `public.dashboard-preview` | ACR-004 source-owned visual port; no Googleusercontent imagery; clearly labelled illustrative preview; neutral placeholders only; not private access | PENDING | PENDING |
| `smartfarm_contact_page` | `public.contact` | ACR-004 source-owned visual port; no Googleusercontent imagery; herd-size field excluded; local draft only, no registration | PENDING | PENDING |

## Super Admin — 14 exports

| Stitch export | Implementation disposition | Boundary applied | Visual | Functional |
|---|---|---|---|---|
| `super_admin_sign_in` | `platform.login` | Email/password shell only; no simulated authentication | PENDING | PENDING |
| `platform_analytics_dashboard` | `platform.dashboard` | Platform-level summaries only; no farm operational data | PENDING | PENDING |
| `customer_management` | `platform.customers` | Customer records only | PENDING | PENDING |
| `register_customer_form_validation_states` | `platform.customers.new` | Approved fields only; no fabricated customer record | PENDING | PENDING |
| `customer_registered_successfully` | State within `platform.customers.new` | Confirmation state; not an independent sitemap route | PENDING | PENDING |
| `customer_details_highland_dairy_collective` | `platform.customers.detail` | Fictional name replaced with neutral prototype token | PENDING | PENDING |
| `workspace_management` | `platform.workspaces` | Platform workspace metadata only | PENDING | PENDING |
| `create_farm_workspace` | `platform.workspaces.new` | Provisioning shell; no automatic workspace creation | PENDING | PENDING |
| `farm_workspace_created_successfully` | State within `platform.workspaces.new` | Confirmation state; not an independent sitemap route | PENDING | PENDING |
| `workspace_details_highland_north_rotary_unit` | `platform.workspaces.detail` | Mapping UNPROVEN in handoff; neutral prototype tokens only | PENDING | PENDING |
| `farm_admin_accounts` | `platform.farm-admins` | Farm Admin account records only | PENDING | PENDING |
| `farm_admin_account_details_thomas_wright` | `platform.farm-admins.detail` | Fictional person and passkey reference excluded | PENDING | PENDING |
| `provision_farm_admin_account` | `platform.farm-admins.new` | Super Admin provisioning shell only | PENDING | PENDING |
| `farm_admin_account_provisioned_successfully` | State within `platform.farm-admins.new` | Confirmation state; not an independent sitemap route | PENDING | PENDING |

No Stitch export exists for approved sitemap §2.7 Customer Access Management or §2.8 Workspace Suspension. Both are implemented from the sitemap and SRS, not invented from a visual export.

## Farm Admin — 67 exports

| Stitch export | Implementation disposition | Boundary applied | Visual | Functional |
|---|---|---|---|---|
| `actual_feeding_records` | `farm.feeding.actual` | Local draft only; no invented stock deduction | PENDING | PENDING |
| `add_animal_form_validation` | `farm.animals.new` | Approved identification fields; no guessed lifecycle transition | PENDING | PENDING |
| `add_worker` | `farm.workers` | CTA/form state folded into Worker List; workers are records, not logins | PENDING | PENDING |
| `animal_production_history` | `farm.milk.animal-history` | Neutral tokens; no invented formula | PENDING | PENDING |
| `animal_profile_360_view` | `farm.animals.profile` | Role-aware sections only | PENDING | PENDING |
| `attendance_records` | `farm.attendance.records` | No overtime formula invented | PENDING | PENDING |
| `available_data_exports` | `farm.reports.exports` | Approved categories only; no generated file | PENDING | PENDING |
| `backup_configuration` | `farm.data.backups` | Restore controls excluded; no backup file download | PENDING | PENDING |
| `bulk_tank_container_storage` | `farm.milk.storage` | No equipment telemetry | PENDING | PENDING |
| `clinical_treatments_prescription_log` | `farm.health.treatments` | No veterinary prediction | PENDING | PENDING |
| `currency_settings` | `farm.settings.currency` | Farm-configured currency; no hardcoded USD sample | PENDING | PENDING |
| `daily_totals` | `farm.milk.daily-totals` | Neutral values; no invented correction rule | PENDING | PENDING |
| `disease_history_pathological_surveillance` | `farm.health.disease-history` | No High/Critical content exposed to Supervisor | PENDING | PENDING |
| `equipment_details` | `farm.equipment.detail` | Telemetry and hardware copy excluded | PENDING | PENDING |
| `equipment_list` | `farm.equipment` | Equipment records only | PENDING | PENDING |
| `expense_records` | `farm.finance.expenses` | Farm Admin only | PENDING | PENDING |
| `farm_admin_sign_in` | `farm.login` | No simulated authentication | PENDING | PENDING |
| `farm_operations_dashboard` | `farm.dashboard` | No fake live metrics or financial data for Supervisor | PENDING | PENDING |
| `farm_profile` | `farm.settings.profile` | Owner confirmation pending for profile fields | PENDING | PENDING |
| `feeding_plans` | `farm.feeding.plans` | Nutritional formulas remain OPEN QUESTION | PENDING | PENDING |
| `feeding_schedule` | `farm.feeding.schedule` | Assigned groups only | PENDING | PENDING |
| `financial_dashboard` | `farm.finance.dashboard` | Profit/loss formula unresolved; no derived number shown | PENDING | PENDING |
| `financial_reports` | `farm.finance.reports`, `farm.reports.financial` | Unresolved calculations blocked | PENDING | PENDING |
| `foundational_design_system_components` | Component sheet, not a route | Reusable tokens and primitives only | NOT A ROUTE | NOT A ROUTE |
| `health_records_severity_triage` | `farm.health.records` | Approved severity labels only; no High/Critical for Supervisor | PENDING | PENDING |
| `herd_registry_animal_directory` | `farm.animals` | Role-appropriate actions only | PENDING | PENDING |
| `import_data` | `farm.data.import` | No simulated upload success | PENDING | PENDING |
| `income_records` | `farm.finance.income` | Farm-configured currency; no hardcoded sample | PENDING | PENDING |
| `interface_preferences` | `farm.settings.preferences` | US-$ copy excluded | PENDING | PENDING |
| `inventory_list` | `farm.inventory` | Neutral stock values only | PENDING | PENDING |
| `item_details` | `farm.inventory.item` | No fabricated history rule | PENDING | PENDING |
| `leave_management` | `farm.attendance.leave` | Approval controls Farm Admin only | PENDING | PENDING |
| `lifecycle_lineage_history` | `farm.animals.lifecycle` | Approved lifecycle records only | PENDING | PENDING |
| `maintenance_history` | `farm.equipment.maintenance` | No telemetry | PENDING | PENDING |
| `manual_check_in_check_out_overtime` | `farm.attendance.check-in-out` | No tactile hardware framing | PENDING | PENDING |
| `milk_collection_intake_log` | `farm.milk.collection` | Farm Admin only | PENDING | PENDING |
| `milk_reports` | `farm.reports.milk` | Neutral operational report; Supervisor export excluded | PENDING | PENDING |
| `milk_sales_commercial_dispatch` | `farm.milk.sales` | Unapproved "commercial dispatch" workflow excluded | PENDING | PENDING |
| `milk_wastage_usage_records` | `farm.milk.wastage` | No invented stock rule | PENDING | PENDING |
| `module_configuration_1` | Excluded noncanonical variant | IoT/barcode/ledger copy conflicts with locked scope | EXCLUDED | EXCLUDED |
| `module_configuration_2` | `farm.settings.configuration` | Provisional canonical variant; pricing defaults still excluded | PENDING | PENDING |
| `monthly_reports` | `farm.milk.monthly-reports` | Neutral trend only | PENDING | PENDING |
| `notification_center` | `farm.notifications` | Role-filtered content; no High/Critical for Supervisor | PENDING | PENDING |
| `notification_history` | `farm.notifications.history` | Role-filtered content | PENDING | PENDING |
| `notification_settings_1` | Excluded noncanonical variant | Handoff selects `_2` as provisional canonical | EXCLUDED | EXCLUDED |
| `notification_settings_2` | `farm.settings.notifications` | Delivery adapter unwired | PENDING | PENDING |
| `password_reset_flow` | `farm.password-reset` state | No token or email simulated | PENDING | PENDING |
| `payroll_deductions` | `farm.payroll.deductions` | No invented deduction formula | PENDING | PENDING |
| `payroll_records` | `farm.payroll.records` | Farm Admin only | PENDING | PENDING |
| `payslips` | `farm.payroll.payslips` | Export/print unwired | PENDING | PENDING |
| `production_entry` | `farm.milk.production-entry` | Date/session/animal/quantity fields only | PENDING | PENDING |
| `purchases_inbound_invoices` | `farm.inventory.purchases` | No invented invoice total | PENDING | PENDING |
| `salary_advances` | `farm.payroll.advances` | No invented calculation | PENDING | PENDING |
| `salary_management` | `farm.payroll.salary` | Formulas remain unresolved | PENDING | PENDING |
| `stock_additions` | `farm.inventory.stock-additions` | No simulated stock change | PENDING | PENDING |
| `stock_adjustments` | `farm.inventory.stock-adjustments` | Supervisor cannot correct stock | PENDING | PENDING |
| `supervisor_access` | Excluded | No approved sitemap page; provisioning rules unresolved | EXCLUDED | EXCLUDED |
| `timezone_settings` | `farm.settings.timezone` | Farm-local dates; no fake timezone telemetry | PENDING | PENDING |
| `units_of_measurement` | `farm.settings.units` | Unit options pending owner approval | PENDING | PENDING |
| `usage_records` | `farm.equipment.usage` | No telemetry | PENDING | PENDING |
| `vaccination_schedules_prophylaxis_ledger` | `farm.health.vaccinations` | No reminder rule invented | PENDING | PENDING |
| `veterinary_appointments_clinical_schedule` | `farm.health.appointments` | Farm Admin only | PENDING | PENDING |
| `weight_history_growth_analytics` | `farm.animals.weight` | Neutral trend only | PENDING | PENDING |
| `worker_directory` | `farm.workers` | Workers are records, not login accounts | PENDING | PENDING |
| `worker_documents` | `farm.workers.documents` | Metadata only; no public URL | PENDING | PENDING |
| `worker_profile` | `farm.workers.profile` | Sensitive identifiers redacted in prototype | PENDING | PENDING |
| `workspace_access_system_states` | `farm.access-state` state | No fake sync or quota indicator | PENDING | PENDING |

## Farm Supervisor — 20 exports

| Stitch export | Implementation disposition | Boundary applied | Visual | Functional |
|---|---|---|---|---|
| `actual_feeding_records_entry` | `farm.feeding.actual` | Operational entry only | PENDING | PENDING |
| `animal_directory_herd_manifest` | `farm.animals` | No archive/edit actions | PENDING | PENDING |
| `animal_profile_nl_84920_a` | `farm.animals.profile` | Neutral ear tag; no sensitive field exposure | PENDING | PENDING |
| `assigned_feeding_plans_daily_schedule` | `farm.feeding.plans`, `farm.feeding.schedule` | Combined export; view only | PENDING | PENDING |
| `daily_production_totals_monthly_summary` | `farm.milk.daily-totals`, `farm.milk.monthly-reports` | Combined export; no financial data | PENDING | PENDING |
| `equipment_inventory_condition_management` | `farm.equipment` | Combined export; no master edit | PENDING | PENDING |
| `equipment_maintenance_usage_records` | `farm.equipment.maintenance`, `farm.equipment.usage` | Combined export; permitted records only | PENDING | PENDING |
| `farm_supervisor_dashboard` | `farm.dashboard` | No payroll, finance or High/Critical widgets | PENDING | PENDING |
| `milk_production_entry_session_recording` | `farm.milk.production-entry` | Permitted morning/evening entry | PENDING | PENDING |
| `permitted_health_records_observation_entry` | `farm.health.records` | High/Critical alert content excluded | PENDING | PENDING |
| `permitted_inventory_daily_usage_logging` | `farm.inventory` | Usage entry only; no stock correction | PENDING | PENDING |
| `permitted_operational_shift_milk_production_report` | `farm.reports.milk` | Operational subset only; export excluded | PENDING | PENDING |
| `permitted_weight_history_nl_84920_a` | `farm.animals.weight` | Mapping UNPROVEN in handoff; neutral tokens only | PENDING | PENDING |
| `supervisor_notification_center_operational_alerts` | `farm.notifications` | Export/archive controls and live telemetry excluded | PENDING | PENDING |
| `supervisor_shell_component_system` | Component sheet, not a route | Reusable shell patterns only | NOT A ROUTE | NOT A ROUTE |
| `supervisor_sign_in` | `farm.login` | Passkey/RFID/PIN methods excluded | PENDING | PENDING |
| `tactile_worker_check_in_check_out_console` | `farm.attendance.check-in-out` | Ordinary form; no hardware framing | PENDING | PENDING |
| `treatment_vaccination_records_operational_view` | `farm.health.treatments`, `farm.health.vaccinations` | Combined export; no edit rights | PENDING | PENDING |
| `worker_attendance_records_shift_log` | `farm.attendance.records` | Permitted attendance records only | PENDING | PENDING |
| `workspace_states_system_modals` | `farm.access-state` state | Simulated sync/upload/quota excluded | PENDING | PENDING |

## Excluded conflict groups

| Code | Excluded content | Governing rule |
|---|---|---|
| C2 | Pricing link | No Pricing page in sitemap; no checkout or subscriptions in SRS |
| C3 | Approximate Herd Size contact field | Not in sitemap §1.8 or SRS FR-WEB-007; OPEN QUESTION |
| C5 | Drone/irrigation/global telemetry copy in Super Admin | Excluded IoT and platform scope |
| C6 | Supervisor export/archive/High-Critical/finance/payroll cues | Permission matrix and sitemap §5 |
| C7 | Invented finance, payroll and milk formulas | Unresolved business rules remain blocked |
| C8 | Fake telemetry, sync, quota, RFID, solenoids, barcode gates | Locked scope and no fake data rules |
| C9 | Hardcoded USD and pricing defaults | Farm-configured currency |
| C10 | Farm Admin Supervisor provisioning page | No approved sitemap page; provisioning details unresolved |
| C11 | Master passkey / RFID / PIN login | Authentication rules forbid them |
| C13 | Noncanonical `_1` variants | Handoff selects `_2` as provisional canonical |
| C14 | State sheets and combined views counted as pages | Handoff §8 interpretation |
| C15 | No H1/H2 and no PNG mappings marked UNPROVEN | Handoff evidence rule |

No Stitch export is deployed as application code; approved visuals are ported into source-owned React/Tailwind components. No 3D/WebGL/canvas/GLB/GLTF usage was introduced. ACR-002 remains the CSS/static Home hero fallback; ACR-003 permits the three Stitch-hosted images on Public Home only.
