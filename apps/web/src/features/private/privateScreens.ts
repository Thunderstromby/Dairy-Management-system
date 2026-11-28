import { lazy, type ComponentType } from 'react';
import type { PrototypeRole } from '../../data/types';
const SuperAdminSignIn = lazy(() =>
  import('../platform/SuperAdminSignIn').then((m) => ({ default: m.SuperAdminSignIn })),
);
const CustomerDetails = lazy(() =>
  import('../platform/screens/customer-details-highland-dairy-collective').then((m) => ({
    default: m.CustomerDetails,
  })),
);
const CustomerManagement = lazy(() =>
  import('../platform/screens/customer-management').then((m) => ({
    default: m.CustomerManagement,
  })),
);
const CreateFarmWorkspace = lazy(() =>
  import('../platform/screens/create-farm-workspace').then((m) => ({
    default: m.CreateFarmWorkspace,
  })),
);
const FarmAdminAccountDetails = lazy(() =>
  import('../platform/screens/farm-admin-account-details-thomas-wright').then((m) => ({
    default: m.FarmAdminAccountDetails,
  })),
);
const FarmAdminAccounts = lazy(() =>
  import('../platform/screens/farm-admin-accounts').then((m) => ({ default: m.FarmAdminAccounts })),
);
const PlatformAnalyticsDashboard = lazy(() =>
  import('../platform/screens/platform-analytics-dashboard').then((m) => ({
    default: m.PlatformAnalyticsDashboard,
  })),
);
const ProvisionFarmAdminAccount = lazy(() =>
  import('../platform/screens/provision-farm-admin-account').then((m) => ({
    default: m.ProvisionFarmAdminAccount,
  })),
);
const RegisterCustomerFormValidationStates = lazy(() =>
  import('../platform/screens/register-customer-form-validation-states').then((m) => ({
    default: m.RegisterCustomerFormValidationStates,
  })),
);
const WorkspaceDetails = lazy(() =>
  import('../platform/screens/workspace-details-highland-north-rotary-unit').then((m) => ({
    default: m.WorkspaceDetails,
  })),
);
const WorkspaceManagement = lazy(() =>
  import('../platform/screens/workspace-management').then((m) => ({
    default: m.WorkspaceManagement,
  })),
);
const FarmAdminSignIn = lazy(() =>
  import('../farm/screens/farm-admin-sign-in').then((m) => ({ default: m.FarmAdminSignIn })),
);
const AddAnimalFormValidation = lazy(() =>
  import('../farm/screens/animal-health-milk/add-animal-form-validation').then((m) => ({
    default: m.AddAnimalFormValidation,
  })),
);
const AnimalProductionHistory = lazy(() =>
  import('../farm/screens/animal-health-milk/animal-production-history').then((m) => ({
    default: m.AnimalProductionHistory,
  })),
);
const AnimalProfile360View = lazy(() =>
  import('../farm/screens/animal-health-milk/animal-profile-360-view').then((m) => ({
    default: m.AnimalProfile360View,
  })),
);
const BulkTankContainerStorage = lazy(() =>
  import('../farm/screens/animal-health-milk/bulk-tank-container-storage').then((m) => ({
    default: m.BulkTankContainerStorage,
  })),
);
const ClinicalTreatmentsPrescriptionLog = lazy(() =>
  import('../farm/screens/animal-health-milk/clinical-treatments-prescription-log').then((m) => ({
    default: m.ClinicalTreatmentsPrescriptionLog,
  })),
);
const DailyTotals = lazy(() =>
  import('../farm/screens/animal-health-milk/daily-totals').then((m) => ({
    default: m.DailyTotals,
  })),
);
const DiseaseHistoryPathologicalSurveillance = lazy(() =>
  import('../farm/screens/animal-health-milk/disease-history-pathological-surveillance').then(
    (m) => ({ default: m.DiseaseHistoryPathologicalSurveillance }),
  ),
);
const FarmOperationsDashboard = lazy(() =>
  import('../farm/screens/animal-health-milk/farm-operations-dashboard').then((m) => ({
    default: m.FarmOperationsDashboard,
  })),
);
const HealthRecordsSeverityTriage = lazy(() =>
  import('../farm/screens/animal-health-milk/health-records-severity-triage').then((m) => ({
    default: m.HealthRecordsSeverityTriage,
  })),
);
const HerdRegistryAnimalDirectory = lazy(() =>
  import('../farm/screens/animal-health-milk/herd-registry-animal-directory').then((m) => ({
    default: m.HerdRegistryAnimalDirectory,
  })),
);
const LifecycleLineageHistory = lazy(() =>
  import('../farm/screens/animal-health-milk/lifecycle-lineage-history').then((m) => ({
    default: m.LifecycleLineageHistory,
  })),
);
const MilkCollectionIntakeLog = lazy(() =>
  import('../farm/screens/animal-health-milk/milk-collection-intake-log').then((m) => ({
    default: m.MilkCollectionIntakeLog,
  })),
);
const MilkReports = lazy(() =>
  import('../farm/screens/animal-health-milk/milk-reports').then((m) => ({
    default: m.MilkReports,
  })),
);
const MilkSalesCommercialDispatch = lazy(() =>
  import('../farm/screens/animal-health-milk/milk-sales-commercial-dispatch').then((m) => ({
    default: m.MilkSalesCommercialDispatch,
  })),
);
const MilkWastageUsageRecords = lazy(() =>
  import('../farm/screens/animal-health-milk/milk-wastage-usage-records').then((m) => ({
    default: m.MilkWastageUsageRecords,
  })),
);
const MonthlyReports = lazy(() =>
  import('../farm/screens/animal-health-milk/monthly-reports').then((m) => ({
    default: m.MonthlyReports,
  })),
);
const ProductionEntry = lazy(() =>
  import('../farm/screens/animal-health-milk/production-entry').then((m) => ({
    default: m.ProductionEntry,
  })),
);
const VaccinationSchedulesProphylaxisLedger = lazy(() =>
  import('../farm/screens/animal-health-milk/vaccination-schedules-prophylaxis-ledger').then(
    (m) => ({ default: m.VaccinationSchedulesProphylaxisLedger }),
  ),
);
const VeterinaryAppointmentsClinicalSchedule = lazy(() =>
  import('../farm/screens/animal-health-milk/veterinary-appointments-clinical-schedule').then(
    (m) => ({ default: m.VeterinaryAppointmentsClinicalSchedule }),
  ),
);
const WeightHistoryGrowthAnalytics = lazy(() =>
  import('../farm/screens/animal-health-milk/weight-history-growth-analytics').then((m) => ({
    default: m.WeightHistoryGrowthAnalytics,
  })),
);
const ActualFeedingRecordsScreen = lazy(() =>
  import('../farm/screens/operations/actual-feeding-records').then((m) => ({
    default: m.ActualFeedingRecordsScreen,
  })),
);
const AttendanceRecordsScreen = lazy(() =>
  import('../farm/screens/operations/attendance-records').then((m) => ({
    default: m.AttendanceRecordsScreen,
  })),
);
const EquipmentDetailsScreen = lazy(() =>
  import('../farm/screens/operations/equipment-details').then((m) => ({
    default: m.EquipmentDetailsScreen,
  })),
);
const EquipmentListScreen = lazy(() =>
  import('../farm/screens/operations/equipment-list').then((m) => ({
    default: m.EquipmentListScreen,
  })),
);
const ExpenseRecordsScreen = lazy(() =>
  import('../farm/screens/operations/expense-records').then((m) => ({
    default: m.ExpenseRecordsScreen,
  })),
);
const FeedingPlansScreen = lazy(() =>
  import('../farm/screens/operations/feeding-plans').then((m) => ({
    default: m.FeedingPlansScreen,
  })),
);
const FeedingScheduleScreen = lazy(() =>
  import('../farm/screens/operations/feeding-schedule').then((m) => ({
    default: m.FeedingScheduleScreen,
  })),
);
const FinancialDashboardScreen = lazy(() =>
  import('../farm/screens/operations/financial-dashboard').then((m) => ({
    default: m.FinancialDashboardScreen,
  })),
);
const FinancialReportsScreen = lazy(() =>
  import('../farm/screens/operations/financial-reports').then((m) => ({
    default: m.FinancialReportsScreen,
  })),
);
const IncomeRecordsScreen = lazy(() =>
  import('../farm/screens/operations/income-records').then((m) => ({
    default: m.IncomeRecordsScreen,
  })),
);
const InventoryListScreen = lazy(() =>
  import('../farm/screens/operations/inventory-list').then((m) => ({
    default: m.InventoryListScreen,
  })),
);
const ItemDetailsScreen = lazy(() =>
  import('../farm/screens/operations/item-details').then((m) => ({ default: m.ItemDetailsScreen })),
);
const LeaveManagementScreen = lazy(() =>
  import('../farm/screens/operations/leave-management').then((m) => ({
    default: m.LeaveManagementScreen,
  })),
);
const MaintenanceHistoryScreen = lazy(() =>
  import('../farm/screens/operations/maintenance-history').then((m) => ({
    default: m.MaintenanceHistoryScreen,
  })),
);
const ManualCheckInCheckOutOvertimeScreen = lazy(() =>
  import('../farm/screens/operations/manual-check-in-check-out-overtime').then((m) => ({
    default: m.ManualCheckInCheckOutOvertimeScreen,
  })),
);
const PayrollDeductionsScreen = lazy(() =>
  import('../farm/screens/operations/payroll-deductions').then((m) => ({
    default: m.PayrollDeductionsScreen,
  })),
);
const PayrollRecordsScreen = lazy(() =>
  import('../farm/screens/operations/payroll-records').then((m) => ({
    default: m.PayrollRecordsScreen,
  })),
);
const PayslipsScreen = lazy(() =>
  import('../farm/screens/operations/payslips').then((m) => ({ default: m.PayslipsScreen })),
);
const PurchasesInboundInvoicesScreen = lazy(() =>
  import('../farm/screens/operations/purchases-inbound-invoices').then((m) => ({
    default: m.PurchasesInboundInvoicesScreen,
  })),
);
const SalaryAdvancesScreen = lazy(() =>
  import('../farm/screens/operations/salary-advances').then((m) => ({
    default: m.SalaryAdvancesScreen,
  })),
);
const SalaryManagementScreen = lazy(() =>
  import('../farm/screens/operations/salary-management').then((m) => ({
    default: m.SalaryManagementScreen,
  })),
);
const StockAdditionsScreen = lazy(() =>
  import('../farm/screens/operations/stock-additions').then((m) => ({
    default: m.StockAdditionsScreen,
  })),
);
const StockAdjustmentsScreen = lazy(() =>
  import('../farm/screens/operations/stock-adjustments').then((m) => ({
    default: m.StockAdjustmentsScreen,
  })),
);
const UsageRecordsScreen = lazy(() =>
  import('../farm/screens/operations/usage-records').then((m) => ({
    default: m.UsageRecordsScreen,
  })),
);
const WorkerDirectoryScreen = lazy(() =>
  import('../farm/screens/operations/worker-directory').then((m) => ({
    default: m.WorkerDirectoryScreen,
  })),
);
const WorkerDocumentsScreen = lazy(() =>
  import('../farm/screens/operations/worker-documents').then((m) => ({
    default: m.WorkerDocumentsScreen,
  })),
);
const WorkerProfileScreen = lazy(() =>
  import('../farm/screens/operations/worker-profile').then((m) => ({
    default: m.WorkerProfileScreen,
  })),
);
const AvailableDataExportsScreen = lazy(() =>
  import('../farm/screens/system/available-data-exports').then((m) => ({
    default: m.AvailableDataExportsScreen,
  })),
);
const BackupConfigurationScreen = lazy(() =>
  import('../farm/screens/system/backup-configuration').then((m) => ({
    default: m.BackupConfigurationScreen,
  })),
);
const CurrencySettingsScreen = lazy(() =>
  import('../farm/screens/system/currency-settings').then((m) => ({
    default: m.CurrencySettingsScreen,
  })),
);
const FarmProfileScreen = lazy(() =>
  import('../farm/screens/system/farm-profile').then((m) => ({ default: m.FarmProfileScreen })),
);
const ImportDataScreen = lazy(() =>
  import('../farm/screens/system/import-data').then((m) => ({ default: m.ImportDataScreen })),
);
const InterfacePreferencesScreen = lazy(() =>
  import('../farm/screens/system/interface-preferences').then((m) => ({
    default: m.InterfacePreferencesScreen,
  })),
);
const ModuleConfiguration2Screen = lazy(() =>
  import('../farm/screens/system/module-configuration-2').then((m) => ({
    default: m.ModuleConfiguration2Screen,
  })),
);
const NotificationCenterScreen = lazy(() =>
  import('../farm/screens/system/notification-center').then((m) => ({
    default: m.NotificationCenterScreen,
  })),
);
const NotificationHistoryScreen = lazy(() =>
  import('../farm/screens/system/notification-history').then((m) => ({
    default: m.NotificationHistoryScreen,
  })),
);
const NotificationSettings2Screen = lazy(() =>
  import('../farm/screens/system/notification-settings-2').then((m) => ({
    default: m.NotificationSettings2Screen,
  })),
);
const PasswordResetFlowScreen = lazy(() =>
  import('../farm/screens/system/password-reset-flow').then((m) => ({
    default: m.PasswordResetFlowScreen,
  })),
);
const TimezoneSettingsScreen = lazy(() =>
  import('../farm/screens/system/timezone-settings').then((m) => ({
    default: m.TimezoneSettingsScreen,
  })),
);
const UnitsOfMeasurementScreen = lazy(() =>
  import('../farm/screens/system/units-of-measurement').then((m) => ({
    default: m.UnitsOfMeasurementScreen,
  })),
);
const WorkspaceAccessSystemStatesScreen = lazy(() =>
  import('../farm/screens/system/workspace-access-system-states').then((m) => ({
    default: m.WorkspaceAccessSystemStatesScreen,
  })),
);
const AnimalDirectoryHerdManifestScreen = lazy(() =>
  import('../supervisor/screens/animal-directory-herd-manifest').then((m) => ({
    default: m.AnimalDirectoryHerdManifestScreen,
  })),
);
const AnimalProfileNl84920AScreen = lazy(() =>
  import('../supervisor/screens/animal-profile-nl-84920-a').then((m) => ({
    default: m.AnimalProfileNl84920AScreen,
  })),
);
const AssignedFeedingPlansDailyScheduleScreen = lazy(() =>
  import('../supervisor/screens/assigned-feeding-plans-daily-schedule').then((m) => ({
    default: m.AssignedFeedingPlansDailyScheduleScreen,
  })),
);
const DailyProductionTotalsMonthlySummaryScreen = lazy(() =>
  import('../supervisor/screens/daily-production-totals-monthly-summary').then((m) => ({
    default: m.DailyProductionTotalsMonthlySummaryScreen,
  })),
);
const EquipmentInventoryConditionManagementScreen = lazy(() =>
  import('../supervisor/screens/equipment-inventory-condition-management').then((m) => ({
    default: m.EquipmentInventoryConditionManagementScreen,
  })),
);
const EquipmentMaintenanceUsageRecordsScreen = lazy(() =>
  import('../supervisor/screens/equipment-maintenance-usage-records').then((m) => ({
    default: m.EquipmentMaintenanceUsageRecordsScreen,
  })),
);
const FarmSupervisorDashboardScreen = lazy(() =>
  import('../supervisor/screens/farm-supervisor-dashboard').then((m) => ({
    default: m.FarmSupervisorDashboardScreen,
  })),
);
const MilkProductionEntrySessionRecordingScreen = lazy(() =>
  import('../supervisor/screens/milk-production-entry-session-recording').then((m) => ({
    default: m.MilkProductionEntrySessionRecordingScreen,
  })),
);
const PermittedHealthRecordsObservationEntryScreen = lazy(() =>
  import('../supervisor/screens/permitted-health-records-observation-entry').then((m) => ({
    default: m.PermittedHealthRecordsObservationEntryScreen,
  })),
);
const PermittedInventoryDailyUsageLoggingScreen = lazy(() =>
  import('../supervisor/screens/permitted-inventory-daily-usage-logging').then((m) => ({
    default: m.PermittedInventoryDailyUsageLoggingScreen,
  })),
);
const PermittedOperationalShiftMilkProductionReportScreen = lazy(() =>
  import('../supervisor/screens/permitted-operational-shift-milk-production-report').then((m) => ({
    default: m.PermittedOperationalShiftMilkProductionReportScreen,
  })),
);
const PermittedWeightHistoryNl84920AScreen = lazy(() =>
  import('../supervisor/screens/permitted-weight-history-nl-84920-a').then((m) => ({
    default: m.PermittedWeightHistoryNl84920AScreen,
  })),
);
const SupervisorNotificationCenterOperationalAlertsScreen = lazy(() =>
  import('../supervisor/screens/supervisor-notification-center-operational-alerts').then((m) => ({
    default: m.SupervisorNotificationCenterOperationalAlertsScreen,
  })),
);
const SupervisorSignInScreen = lazy(() =>
  import('../supervisor/screens/supervisor-sign-in').then((m) => ({
    default: m.SupervisorSignInScreen,
  })),
);
const TactileWorkerCheckInCheckOutConsoleScreen = lazy(() =>
  import('../supervisor/screens/tactile-worker-check-in-check-out-console').then((m) => ({
    default: m.TactileWorkerCheckInCheckOutConsoleScreen,
  })),
);
const TreatmentVaccinationRecordsOperationalViewScreen = lazy(() =>
  import('../supervisor/screens/treatment-vaccination-records-operational-view').then((m) => ({
    default: m.TreatmentVaccinationRecordsOperationalViewScreen,
  })),
);
const WorkerAttendanceRecordsShiftLogScreen = lazy(() =>
  import('../supervisor/screens/worker-attendance-records-shift-log').then((m) => ({
    default: m.WorkerAttendanceRecordsShiftLogScreen,
  })),
);

const PLATFORM_SCREENS: Record<string, ComponentType> = {
  'platform.login': SuperAdminSignIn,
  'platform.dashboard': PlatformAnalyticsDashboard,
  'platform.customers': CustomerManagement,
  'platform.customers.new': RegisterCustomerFormValidationStates,
  'platform.customers.detail': CustomerDetails,
  'platform.workspaces': WorkspaceManagement,
  'platform.workspaces.new': CreateFarmWorkspace,
  'platform.workspaces.detail': WorkspaceDetails,
  'platform.farm-admins': FarmAdminAccounts,
  'platform.farm-admins.new': ProvisionFarmAdminAccount,
  'platform.farm-admins.detail': FarmAdminAccountDetails,
};

const FARM_ADMIN_SCREENS: Record<string, ComponentType> = {
  'farm.login': FarmAdminSignIn,
  'farm.password-reset': PasswordResetFlowScreen,
  'farm.access-state': WorkspaceAccessSystemStatesScreen,
  'farm.dashboard': FarmOperationsDashboard,
  'farm.animals': HerdRegistryAnimalDirectory,
  'farm.animals.new': AddAnimalFormValidation,
  'farm.animals.profile': AnimalProfile360View,
  'farm.animals.lifecycle': LifecycleLineageHistory,
  'farm.animals.weight': WeightHistoryGrowthAnalytics,
  'farm.health.records': HealthRecordsSeverityTriage,
  'farm.health.treatments': ClinicalTreatmentsPrescriptionLog,
  'farm.health.vaccinations': VaccinationSchedulesProphylaxisLedger,
  'farm.health.appointments': VeterinaryAppointmentsClinicalSchedule,
  'farm.health.disease-history': DiseaseHistoryPathologicalSurveillance,
  'farm.milk.production-entry': ProductionEntry,
  'farm.milk.animal-history': AnimalProductionHistory,
  'farm.milk.daily-totals': DailyTotals,
  'farm.milk.monthly-reports': MonthlyReports,
  'farm.milk.collection': MilkCollectionIntakeLog,
  'farm.milk.storage': BulkTankContainerStorage,
  'farm.milk.sales': MilkSalesCommercialDispatch,
  'farm.milk.wastage': MilkWastageUsageRecords,
  'farm.reports.milk': MilkReports,
  'farm.inventory': InventoryListScreen,
  'farm.inventory.item': ItemDetailsScreen,
  'farm.inventory.purchases': PurchasesInboundInvoicesScreen,
  'farm.inventory.stock-additions': StockAdditionsScreen,
  'farm.inventory.stock-adjustments': StockAdjustmentsScreen,
  'farm.feeding.plans': FeedingPlansScreen,
  'farm.feeding.schedule': FeedingScheduleScreen,
  'farm.feeding.actual': ActualFeedingRecordsScreen,
  'farm.workers': WorkerDirectoryScreen,
  'farm.workers.profile': WorkerProfileScreen,
  'farm.workers.documents': WorkerDocumentsScreen,
  'farm.attendance.records': AttendanceRecordsScreen,
  'farm.attendance.leave': LeaveManagementScreen,
  'farm.attendance.check-in-out': ManualCheckInCheckOutOvertimeScreen,
  'farm.payroll.salary': SalaryManagementScreen,
  'farm.payroll.records': PayrollRecordsScreen,
  'farm.payroll.advances': SalaryAdvancesScreen,
  'farm.payroll.deductions': PayrollDeductionsScreen,
  'farm.payroll.payslips': PayslipsScreen,
  'farm.finance.income': IncomeRecordsScreen,
  'farm.finance.expenses': ExpenseRecordsScreen,
  'farm.finance.dashboard': FinancialDashboardScreen,
  'farm.finance.reports': FinancialReportsScreen,
  'farm.reports.financial': FinancialReportsScreen,
  'farm.equipment': EquipmentListScreen,
  'farm.equipment.detail': EquipmentDetailsScreen,
  'farm.equipment.maintenance': MaintenanceHistoryScreen,
  'farm.equipment.usage': UsageRecordsScreen,
  'farm.notifications': NotificationCenterScreen,
  'farm.notifications.history': NotificationHistoryScreen,
  'farm.reports.exports': AvailableDataExportsScreen,
  'farm.data.import': ImportDataScreen,
  'farm.data.export': AvailableDataExportsScreen,
  'farm.data.backups': BackupConfigurationScreen,
  'farm.settings.profile': FarmProfileScreen,
  'farm.settings.units': UnitsOfMeasurementScreen,
  'farm.settings.currency': CurrencySettingsScreen,
  'farm.settings.timezone': TimezoneSettingsScreen,
  'farm.settings.preferences': InterfacePreferencesScreen,
  'farm.settings.notifications': NotificationSettings2Screen,
  'farm.settings.configuration': ModuleConfiguration2Screen,
};

const SUPERVISOR_SCREENS: Record<string, ComponentType> = {
  'farm.login': SupervisorSignInScreen,
  'farm.dashboard': FarmSupervisorDashboardScreen,
  'farm.animals': AnimalDirectoryHerdManifestScreen,
  'farm.animals.profile': AnimalProfileNl84920AScreen,
  'farm.animals.weight': PermittedWeightHistoryNl84920AScreen,
  'farm.health.records': PermittedHealthRecordsObservationEntryScreen,
  'farm.health.treatments': TreatmentVaccinationRecordsOperationalViewScreen,
  'farm.health.vaccinations': TreatmentVaccinationRecordsOperationalViewScreen,
  'farm.milk.production-entry': MilkProductionEntrySessionRecordingScreen,
  'farm.milk.daily-totals': DailyProductionTotalsMonthlySummaryScreen,
  'farm.milk.monthly-reports': DailyProductionTotalsMonthlySummaryScreen,
  'farm.feeding.plans': AssignedFeedingPlansDailyScheduleScreen,
  'farm.feeding.schedule': AssignedFeedingPlansDailyScheduleScreen,
  'farm.feeding.actual': AssignedFeedingPlansDailyScheduleScreen,
  'farm.inventory': PermittedInventoryDailyUsageLoggingScreen,
  'farm.attendance.records': WorkerAttendanceRecordsShiftLogScreen,
  'farm.attendance.check-in-out': TactileWorkerCheckInCheckOutConsoleScreen,
  'farm.equipment': EquipmentInventoryConditionManagementScreen,
  'farm.equipment.maintenance': EquipmentMaintenanceUsageRecordsScreen,
  'farm.equipment.usage': EquipmentMaintenanceUsageRecordsScreen,
  'farm.reports.milk': PermittedOperationalShiftMilkProductionReportScreen,
  'farm.notifications': SupervisorNotificationCenterOperationalAlertsScreen,
};

export function resolvePrivateScreen(
  surface: string,
  id: string,
  role: PrototypeRole,
): ComponentType | undefined {
  if (surface === 'platform') return PLATFORM_SCREENS[id];
  if (surface === 'farm') {
    return role === 'farm-supervisor' ? SUPERVISOR_SCREENS[id] : FARM_ADMIN_SCREENS[id];
  }
  return undefined;
}
