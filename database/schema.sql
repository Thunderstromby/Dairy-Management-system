-- SmartFarm PostgreSQL baseline / candidate physical schema, 2026-11-24
-- LOCKED stack: PostgreSQL, Express/Node, React/Tailwind. Drizzle migrations should own this DDL.
-- IMPORTANT: Review OPEN business decisions in database.md before production.
-- Run by a dedicated MIGRATION role, NOT the restricted application runtime role.
BEGIN;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS app;
-- App DB role must not own tables, hold BYPASSRLS or be allowed to change schema.
-- API validates account, membership, role and workspace status BEFORE SET LOCAL app.workspace_id.
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE CHECK(code IN ('super_admin','farm_admin','farm_supervisor')),
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_name text,
  email text,
  phone text,
  status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','inactive')),
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (true)
);

CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','suspended')),
  suspended_at timestamptz,
  suspended_by uuid,
  suspension_reason text,
  CHECK ((status = 'suspended') = (suspended_at IS NOT NULL)),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (true)
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  password_hash text NOT NULL,
  display_name text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','disabled')),
  last_login_at timestamptz,
  password_changed_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(email)
);

CREATE TABLE platform_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE RESTRICT,
  role_code text NOT NULL DEFAULT 'super_admin' REFERENCES roles(code) CHECK(role_code = 'super_admin'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE workspace_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  role_code text NOT NULL REFERENCES roles(code) CHECK(role_code IN ('farm_admin','farm_supervisor')),
  revoked_at timestamptz,
  granted_by uuid REFERENCES users(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,user_id)
);

CREATE TABLE password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  CHECK (used_at IS NULL OR used_at >= created_at),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE farm_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  farm_name text NOT NULL,
  timezone text NOT NULL,
  currency_code varchar(3) NOT NULL CHECK(currency_code ~ '^[A-Z]{3}$'),
  date_format text,
  time_format text,
  number_grouping text CHECK(number_grouping IN ('western','indian_pakistani')),
  measurement_preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  notification_preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  module_preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  default_milk_price numeric(20,6) CHECK(default_milk_price >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id)
);

CREATE TABLE animal_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,name)
);

CREATE TABLE animals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text,
  breed text,
  gender text,
  birth_date date,
  estimated_age_months integer CHECK(estimated_age_months >= 0),
  category text,
  group_id uuid,
  ear_tag text NOT NULL,
  lifecycle_status text NOT NULL DEFAULT 'active' CHECK(lifecycle_status IN ('active','sold','deceased','removed')),
  mother_id uuid,
  father_id uuid,
  archived_at timestamptz,
  archived_by uuid REFERENCES users(id),
  CHECK (birth_date IS NOT NULL OR estimated_age_months IS NOT NULL),
  CHECK(mother_id IS NULL OR mother_id <> id),
  CHECK(father_id IS NULL OR father_id <> id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, group_id) REFERENCES animal_groups(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, mother_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, father_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE animal_lifecycle_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  status text NOT NULL CHECK(status IN ('active','sold','deceased','removed')),
  event_date date NOT NULL,
  reason text,
  entered_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE animal_weights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  weighed_on date NOT NULL,
  weight_value numeric(20,6) NOT NULL CHECK(weight_value > 0),
  unit text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE animal_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  kind text NOT NULL CHECK(kind IN ('purchase','sale')),
  transaction_date date NOT NULL,
  amount numeric(20,6) CHECK(amount >= 0),
  currency_code varchar(3),
  counterparty text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE workers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  full_name text NOT NULL,
  cnic text,
  contact_phone text,
  start_date date,
  end_date date,
  notes text,
  archived_at timestamptz,
  CHECK(end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  storage_key text NOT NULL UNIQUE,
  original_filename text NOT NULL,
  mime_type text NOT NULL,
  byte_size bigint NOT NULL CHECK(byte_size >= 0),
  sha256 text,
  animal_id uuid,
  worker_id uuid,
  uploaded_by uuid REFERENCES users(id),
  CHECK ((animal_id IS NOT NULL)::int + (worker_id IS NOT NULL)::int = 1),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, worker_id) REFERENCES workers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE health_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  severity text NOT NULL CHECK(severity IN ('low','moderate','high','critical')),
  recorded_on date NOT NULL,
  diagnosis text,
  symptoms text,
  notes text,
  recorded_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  health_record_id uuid,
  diagnosis text,
  symptoms text,
  medication text,
  dosage text,
  started_on date NOT NULL,
  ended_on date,
  veterinarian text,
  cost numeric(20,6) CHECK(cost >= 0),
  currency_code varchar(3),
  follow_up text,
  CHECK(ended_on IS NULL OR ended_on >= started_on),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, health_record_id) REFERENCES health_records(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE vaccinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  vaccine_name text NOT NULL,
  given_on date,
  next_due_on date,
  veterinarian text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE veterinary_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  scheduled_at timestamptz NOT NULL,
  veterinarian text,
  reason text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE disease_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  disease_name text NOT NULL,
  diagnosed_on date NOT NULL,
  resolved_on date,
  notes text,
  CHECK(resolved_on IS NULL OR resolved_on >= diagnosed_on),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE milk_production (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  animal_id uuid NOT NULL,
  production_date date NOT NULL,
  session text NOT NULL CHECK(session IN ('morning','evening')),
  litres numeric(20,6) NOT NULL CHECK(litres >= 0),
  quality text CHECK(quality IN ('good','average','poor')),
  recorded_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,animal_id,production_date,session)
);

CREATE TABLE milk_storage_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,name)
);

CREATE TABLE milk_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  location_id uuid,
  collected_on date NOT NULL,
  litres numeric(20,6) NOT NULL CHECK(litres > 0),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, location_id) REFERENCES milk_storage_locations(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE milk_sale_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  contact text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE milk_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL,
  sold_on date NOT NULL,
  litres numeric(20,6) NOT NULL CHECK(litres > 0),
  unit_price numeric(20,6) NOT NULL CHECK(unit_price >= 0),
  payment_status text NOT NULL CHECK(payment_status IN ('paid','unpaid')),
  payment_method text,
  currency_code varchar(3) NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, customer_id) REFERENCES milk_sale_customers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE milk_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  used_on date NOT NULL,
  litres numeric(20,6) NOT NULL CHECK(litres > 0),
  purpose text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE milk_wastage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  wasted_on date NOT NULL,
  litres numeric(20,6) NOT NULL CHECK(litres > 0),
  reason text,
  estimated_loss numeric(20,6) CHECK(estimated_loss >= 0),
  currency_code varchar(3),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE milk_stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  location_id uuid,
  collection_id uuid,
  sale_id uuid,
  usage_id uuid,
  wastage_id uuid,
  movement_kind text NOT NULL CHECK(movement_kind IN ('collection','sale','usage','wastage')),
  litres_delta numeric(20,6) NOT NULL CHECK(litres_delta <> 0),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((collection_id IS NOT NULL)::int + (sale_id IS NOT NULL)::int + (usage_id IS NOT NULL)::int + (wastage_id IS NOT NULL)::int = 1),
  CHECK ((movement_kind = 'collection' AND collection_id IS NOT NULL AND litres_delta > 0) OR (movement_kind = 'sale' AND sale_id IS NOT NULL AND litres_delta < 0) OR (movement_kind = 'usage' AND usage_id IS NOT NULL AND litres_delta < 0) OR (movement_kind = 'wastage' AND wastage_id IS NOT NULL AND litres_delta < 0)),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, location_id) REFERENCES milk_storage_locations(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, collection_id) REFERENCES milk_collections(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, sale_id) REFERENCES milk_sales(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, usage_id) REFERENCES milk_usage(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, wastage_id) REFERENCES milk_wastage(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  category text NOT NULL CHECK(category IN ('feed','medicine','other')),
  unit text NOT NULL,
  minimum_stock numeric(20,6) NOT NULL DEFAULT 0 CHECK(minimum_stock >= 0),
  expiry_date date,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE inventory_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  item_id uuid NOT NULL,
  purchased_on date NOT NULL,
  quantity numeric(20,6) NOT NULL CHECK(quantity > 0),
  unit_cost numeric(20,6) CHECK(unit_cost >= 0),
  currency_code varchar(3),
  supplier text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, item_id) REFERENCES inventory_items(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE inventory_additions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  item_id uuid NOT NULL,
  added_on date NOT NULL,
  quantity numeric(20,6) NOT NULL CHECK(quantity > 0),
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, item_id) REFERENCES inventory_items(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE inventory_adjustments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  item_id uuid NOT NULL,
  adjusted_on date NOT NULL,
  quantity_delta numeric(20,6) NOT NULL CHECK(quantity_delta <> 0),
  reason text NOT NULL CHECK(length(btrim(reason)) > 0),
  adjusted_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, item_id) REFERENCES inventory_items(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE inventory_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  item_id uuid NOT NULL,
  used_on date NOT NULL,
  quantity numeric(20,6) NOT NULL CHECK(quantity > 0),
  purpose text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, item_id) REFERENCES inventory_items(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE inventory_stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  item_id uuid NOT NULL,
  purchase_id uuid,
  addition_id uuid,
  adjustment_id uuid,
  usage_id uuid,
  kind text NOT NULL CHECK(kind IN ('purchase','addition','adjustment','usage')),
  quantity_delta numeric(20,6) NOT NULL CHECK(quantity_delta <> 0),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((purchase_id IS NOT NULL)::int + (addition_id IS NOT NULL)::int + (adjustment_id IS NOT NULL)::int + (usage_id IS NOT NULL)::int = 1),
  CHECK ((kind='purchase' AND purchase_id IS NOT NULL AND quantity_delta > 0) OR (kind='addition' AND addition_id IS NOT NULL AND quantity_delta > 0) OR (kind='adjustment' AND adjustment_id IS NOT NULL) OR (kind='usage' AND usage_id IS NOT NULL AND quantity_delta < 0)),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, item_id) REFERENCES inventory_items(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, purchase_id) REFERENCES inventory_purchases(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, addition_id) REFERENCES inventory_additions(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, adjustment_id) REFERENCES inventory_adjustments(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, usage_id) REFERENCES inventory_usage(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE feeding_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  animal_id uuid,
  group_id uuid,
  effective_from date NOT NULL,
  effective_to date,
  notes text,
  CHECK ((animal_id IS NOT NULL)::int + (group_id IS NOT NULL)::int = 1),
  CHECK(effective_to IS NULL OR effective_to >= effective_from),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, group_id) REFERENCES animal_groups(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE feeding_plan_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  plan_id uuid NOT NULL,
  inventory_item_id uuid NOT NULL,
  quantity numeric(20,6) NOT NULL CHECK(quantity > 0),
  unit text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, plan_id) REFERENCES feeding_plans(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, inventory_item_id) REFERENCES inventory_items(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE feeding_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  plan_id uuid NOT NULL,
  label text NOT NULL,
  feeding_time time NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, plan_id) REFERENCES feeding_plans(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE feeding_actuals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  plan_id uuid,
  schedule_id uuid,
  animal_id uuid,
  fed_at timestamptz NOT NULL,
  notes text,
  recorded_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, plan_id) REFERENCES feeding_plans(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, schedule_id) REFERENCES feeding_schedules(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, animal_id) REFERENCES animals(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE feeding_actual_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  feeding_actual_id uuid NOT NULL,
  inventory_item_id uuid NOT NULL,
  quantity numeric(20,6) NOT NULL CHECK(quantity > 0),
  unit text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, feeding_actual_id) REFERENCES feeding_actuals(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, inventory_item_id) REFERENCES inventory_items(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  worker_id uuid NOT NULL,
  attendance_date date NOT NULL,
  check_in_at timestamptz,
  check_out_at timestamptz,
  status text NOT NULL CHECK(status IN ('present','absent','late','leave')),
  notes text,
  CHECK(check_out_at IS NULL OR check_in_at IS NULL OR check_out_at >= check_in_at),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, worker_id) REFERENCES workers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  worker_id uuid NOT NULL,
  leave_type text NOT NULL,
  starts_on date NOT NULL,
  ends_on date NOT NULL,
  reason text,
  approval_status text NOT NULL DEFAULT 'pending' CHECK(approval_status IN ('pending','approved','rejected')),
  is_paid boolean,
  decided_by uuid REFERENCES users(id),
  decided_at timestamptz,
  CHECK(ends_on >= starts_on),
  CHECK((decided_by IS NULL) = (decided_at IS NULL)),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, worker_id) REFERENCES workers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE overtime_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  worker_id uuid NOT NULL,
  overtime_date date NOT NULL,
  hours numeric(12,4) NOT NULL CHECK(hours > 0),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, worker_id) REFERENCES workers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE salary_structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  worker_id uuid NOT NULL,
  structure_type text NOT NULL CHECK(structure_type IN ('monthly','daily')),
  base_rate numeric(20,6) NOT NULL CHECK(base_rate >= 0),
  currency_code varchar(3) NOT NULL,
  payment_frequency text CHECK(payment_frequency IN ('daily','weekly','biweekly','monthly')),
  effective_from date NOT NULL,
  effective_to date,
  absence_rules jsonb NOT NULL DEFAULT '{}'::jsonb,
  leave_rules jsonb NOT NULL DEFAULT '{}'::jsonb,
  partial_month_basis text CHECK(partial_month_basis IN ('calendar_days','working_days')),
  CHECK(effective_to IS NULL OR effective_to >= effective_from),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, worker_id) REFERENCES workers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE payroll_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  worker_id uuid NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  currency_code varchar(3) NOT NULL,
  gross_amount numeric(20,6),
  deduction_amount numeric(20,6),
  net_amount numeric(20,6),
  pending_amount numeric(20,6),
  status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','calculated','paid')),
  calculation_details jsonb,
  CHECK(period_end >= period_start),
  CHECK(gross_amount IS NULL OR gross_amount >= 0),
  CHECK(deduction_amount IS NULL OR deduction_amount >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, worker_id) REFERENCES workers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE salary_advances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  worker_id uuid NOT NULL,
  advanced_on date NOT NULL,
  amount numeric(20,6) NOT NULL CHECK(amount > 0),
  currency_code varchar(3) NOT NULL,
  recovery_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, worker_id) REFERENCES workers(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE payroll_deductions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  payroll_id uuid NOT NULL,
  advance_id uuid,
  description text NOT NULL,
  amount numeric(20,6) NOT NULL CHECK(amount >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, payroll_id) REFERENCES payroll_records(workspace_id, id) ON DELETE RESTRICT,
  FOREIGN KEY (workspace_id, advance_id) REFERENCES salary_advances(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE salary_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  payroll_id uuid NOT NULL,
  paid_on date NOT NULL,
  amount numeric(20,6) NOT NULL CHECK(amount > 0),
  method text NOT NULL CHECK(method IN ('cash','bank_transfer','mobile_wallet','custom')),
  custom_method text,
  reference text,
  CHECK ((method = 'custom') = (custom_method IS NOT NULL)),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, payroll_id) REFERENCES payroll_records(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE payslips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  payroll_id uuid NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now(),
  storage_key text NOT NULL UNIQUE,
  generated_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, payroll_id) REFERENCES payroll_records(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE expense_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,name)
);

CREATE TABLE income_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,name)
);

CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  category_id uuid NOT NULL,
  expense_date date NOT NULL,
  amount numeric(20,6) NOT NULL CHECK(amount >= 0),
  currency_code varchar(3) NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, category_id) REFERENCES expense_categories(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE incomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  category_id uuid NOT NULL,
  income_date date NOT NULL,
  amount numeric(20,6) NOT NULL CHECK(amount >= 0),
  currency_code varchar(3) NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, category_id) REFERENCES income_categories(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  name text NOT NULL,
  equipment_type text,
  quantity numeric(20,6) NOT NULL CHECK(quantity > 0),
  condition text NOT NULL,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE equipment_maintenance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  equipment_id uuid NOT NULL,
  maintenance_date date NOT NULL,
  description text NOT NULL,
  condition_after text,
  recorded_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, equipment_id) REFERENCES equipment(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE equipment_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  equipment_id uuid NOT NULL,
  used_on date NOT NULL,
  description text,
  recorded_by uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, equipment_id) REFERENCES equipment(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  recipient_user_id uuid NOT NULL REFERENCES users(id),
  kind text NOT NULL CHECK(kind IN ('vaccination','health','production_drop','low_stock','inventory_expiry','system')),
  severity text CHECK(severity IN ('low','moderate','high','critical')),
  title text NOT NULL,
  body text NOT NULL,
  read_at timestamptz,
  related_record_type text,
  related_record_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE notification_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  kind text NOT NULL,
  enabled_in_app boolean NOT NULL DEFAULT true,
  enabled_email boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,kind)
);

CREATE TABLE email_outbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  recipient_email text NOT NULL,
  template_key text NOT NULL,
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK(status IN ('queued','sending','accepted','failed')),
  attempts integer NOT NULL DEFAULT 0 CHECK(attempts >= 0),
  next_attempt_at timestamptz,
  last_error text,
  provider_reference text,
  notification_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (workspace_id, notification_id) REFERENCES notifications(workspace_id, id) ON DELETE RESTRICT,
  UNIQUE (workspace_id, id)
);

CREATE TABLE dashboard_layouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  user_id uuid NOT NULL REFERENCES users(id),
  layout jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id,user_id)
);

CREATE TABLE data_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  requested_by uuid REFERENCES users(id),
  kind text NOT NULL CHECK(kind IN ('csv_import','excel_import','csv_export','excel_export','backup')),
  status text NOT NULL DEFAULT 'queued' CHECK(status IN ('queued','running','succeeded','failed')),
  file_key text,
  error_summary text,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE backup_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  enabled boolean NOT NULL DEFAULT false,
  options jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id),
  UNIQUE(workspace_id)
);

CREATE TABLE activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE RESTRICT,
  actor_user_id uuid REFERENCES users(id),
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, id)
);

CREATE TABLE platform_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES users(id),
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  phone text,
  received_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_workspaces_customer ON workspaces(customer_id);

CREATE INDEX idx_workspace_memberships_workspace_created ON workspace_memberships(workspace_id, created_at DESC);

CREATE INDEX idx_memberships_user ON workspace_memberships(user_id, revoked_at);

CREATE INDEX idx_password_reset_expiry ON password_reset_tokens(expires_at);

CREATE INDEX idx_farm_settings_workspace_created ON farm_settings(workspace_id, created_at DESC);

CREATE INDEX idx_animal_groups_workspace_created ON animal_groups(workspace_id, created_at DESC);

CREATE INDEX idx_animals_workspace_created ON animals(workspace_id, created_at DESC);

CREATE UNIQUE INDEX uq_animals_tag ON animals(workspace_id,lower(btrim(ear_tag)));

CREATE INDEX idx_animals_status ON animals(workspace_id,lifecycle_status);

CREATE INDEX idx_animal_lifecycle_events_workspace_created ON animal_lifecycle_events(workspace_id, created_at DESC);

CREATE INDEX idx_animal_weights_workspace_created ON animal_weights(workspace_id, created_at DESC);

CREATE INDEX idx_animal_transactions_workspace_created ON animal_transactions(workspace_id, created_at DESC);

CREATE INDEX idx_workers_workspace_created ON workers(workspace_id, created_at DESC);

CREATE UNIQUE INDEX uq_worker_cnic ON workers(workspace_id,regexp_replace(cnic, '[^0-9]', '', 'g')) WHERE cnic IS NOT NULL;

CREATE INDEX idx_attachments_workspace_created ON attachments(workspace_id, created_at DESC);

CREATE INDEX idx_health_records_workspace_created ON health_records(workspace_id, created_at DESC);

CREATE INDEX idx_treatments_workspace_created ON treatments(workspace_id, created_at DESC);

CREATE INDEX idx_vaccinations_workspace_created ON vaccinations(workspace_id, created_at DESC);

CREATE INDEX idx_vaccination_due ON vaccinations(workspace_id,next_due_on) WHERE next_due_on IS NOT NULL;

CREATE INDEX idx_veterinary_appointments_workspace_created ON veterinary_appointments(workspace_id, created_at DESC);

CREATE INDEX idx_disease_history_workspace_created ON disease_history(workspace_id, created_at DESC);

CREATE INDEX idx_milk_production_workspace_created ON milk_production(workspace_id, created_at DESC);

CREATE INDEX idx_milk_prod_date ON milk_production(workspace_id,production_date DESC);

CREATE INDEX idx_milk_storage_locations_workspace_created ON milk_storage_locations(workspace_id, created_at DESC);

CREATE INDEX idx_milk_collections_workspace_created ON milk_collections(workspace_id, created_at DESC);

CREATE INDEX idx_milk_sale_customers_workspace_created ON milk_sale_customers(workspace_id, created_at DESC);

CREATE INDEX idx_milk_sales_workspace_created ON milk_sales(workspace_id, created_at DESC);

CREATE INDEX idx_milk_usage_workspace_created ON milk_usage(workspace_id, created_at DESC);

CREATE INDEX idx_milk_wastage_workspace_created ON milk_wastage(workspace_id, created_at DESC);

CREATE INDEX idx_milk_stock_movements_workspace_created ON milk_stock_movements(workspace_id, created_at DESC);

CREATE UNIQUE INDEX uq_msm_collection ON milk_stock_movements(workspace_id,collection_id) WHERE collection_id IS NOT NULL;

CREATE UNIQUE INDEX uq_msm_sale_location ON milk_stock_movements(workspace_id,sale_id,location_id) WHERE sale_id IS NOT NULL;

CREATE INDEX idx_msm_location ON milk_stock_movements(workspace_id,location_id,occurred_at);

CREATE INDEX idx_inventory_items_workspace_created ON inventory_items(workspace_id, created_at DESC);

CREATE INDEX idx_inventory_purchases_workspace_created ON inventory_purchases(workspace_id, created_at DESC);

CREATE INDEX idx_inventory_additions_workspace_created ON inventory_additions(workspace_id, created_at DESC);

CREATE INDEX idx_inventory_adjustments_workspace_created ON inventory_adjustments(workspace_id, created_at DESC);

CREATE INDEX idx_inventory_usage_workspace_created ON inventory_usage(workspace_id, created_at DESC);

CREATE INDEX idx_inventory_stock_movements_workspace_created ON inventory_stock_movements(workspace_id, created_at DESC);

CREATE UNIQUE INDEX uq_ism_purchase ON inventory_stock_movements(workspace_id,purchase_id) WHERE purchase_id IS NOT NULL;

CREATE UNIQUE INDEX uq_ism_addition ON inventory_stock_movements(workspace_id,addition_id) WHERE addition_id IS NOT NULL;

CREATE UNIQUE INDEX uq_ism_adjustment ON inventory_stock_movements(workspace_id,adjustment_id) WHERE adjustment_id IS NOT NULL;

CREATE UNIQUE INDEX uq_ism_usage ON inventory_stock_movements(workspace_id,usage_id) WHERE usage_id IS NOT NULL;

CREATE INDEX idx_ism_item ON inventory_stock_movements(workspace_id,item_id,occurred_at);

CREATE INDEX idx_feeding_plans_workspace_created ON feeding_plans(workspace_id, created_at DESC);

CREATE INDEX idx_feeding_plan_items_workspace_created ON feeding_plan_items(workspace_id, created_at DESC);

CREATE INDEX idx_feeding_schedules_workspace_created ON feeding_schedules(workspace_id, created_at DESC);

CREATE INDEX idx_feeding_actuals_workspace_created ON feeding_actuals(workspace_id, created_at DESC);

CREATE INDEX idx_feeding_actual_items_workspace_created ON feeding_actual_items(workspace_id, created_at DESC);

CREATE INDEX idx_attendance_workspace_created ON attendance(workspace_id, created_at DESC);

CREATE INDEX idx_attendance_date ON attendance(workspace_id,attendance_date DESC);

CREATE INDEX idx_leave_requests_workspace_created ON leave_requests(workspace_id, created_at DESC);

CREATE INDEX idx_overtime_records_workspace_created ON overtime_records(workspace_id, created_at DESC);

CREATE INDEX idx_salary_structures_workspace_created ON salary_structures(workspace_id, created_at DESC);

CREATE INDEX idx_payroll_records_workspace_created ON payroll_records(workspace_id, created_at DESC);

CREATE INDEX idx_payroll_period ON payroll_records(workspace_id,period_start,period_end);

CREATE INDEX idx_salary_advances_workspace_created ON salary_advances(workspace_id, created_at DESC);

CREATE INDEX idx_payroll_deductions_workspace_created ON payroll_deductions(workspace_id, created_at DESC);

CREATE INDEX idx_salary_payments_workspace_created ON salary_payments(workspace_id, created_at DESC);

CREATE INDEX idx_payslips_workspace_created ON payslips(workspace_id, created_at DESC);

CREATE INDEX idx_expense_categories_workspace_created ON expense_categories(workspace_id, created_at DESC);

CREATE INDEX idx_income_categories_workspace_created ON income_categories(workspace_id, created_at DESC);

CREATE INDEX idx_expenses_workspace_created ON expenses(workspace_id, created_at DESC);

CREATE INDEX idx_expenses_date ON expenses(workspace_id,expense_date DESC);

CREATE INDEX idx_incomes_workspace_created ON incomes(workspace_id, created_at DESC);

CREATE INDEX idx_incomes_date ON incomes(workspace_id,income_date DESC);

CREATE INDEX idx_equipment_workspace_created ON equipment(workspace_id, created_at DESC);

CREATE INDEX idx_equipment_maintenance_workspace_created ON equipment_maintenance(workspace_id, created_at DESC);

CREATE INDEX idx_equipment_usage_workspace_created ON equipment_usage(workspace_id, created_at DESC);

CREATE INDEX idx_notifications_workspace_created ON notifications(workspace_id, created_at DESC);

CREATE INDEX idx_notifications_recipient ON notifications(workspace_id,recipient_user_id,created_at DESC);

CREATE INDEX idx_notification_settings_workspace_created ON notification_settings(workspace_id, created_at DESC);

CREATE INDEX idx_email_outbox_workspace_created ON email_outbox(workspace_id, created_at DESC);

CREATE INDEX idx_email_outbox_next ON email_outbox(status,next_attempt_at);

CREATE INDEX idx_dashboard_layouts_workspace_created ON dashboard_layouts(workspace_id, created_at DESC);

CREATE INDEX idx_data_jobs_workspace_created ON data_jobs(workspace_id, created_at DESC);

CREATE INDEX idx_data_jobs_status ON data_jobs(workspace_id,status,created_at DESC);

CREATE INDEX idx_backup_configurations_workspace_created ON backup_configurations(workspace_id, created_at DESC);

CREATE INDEX idx_activity_logs_workspace_created ON activity_logs(workspace_id, created_at DESC);

CREATE INDEX idx_activity_logs_time ON activity_logs(workspace_id,occurred_at DESC);

CREATE OR REPLACE FUNCTION app.tenant_id() RETURNS uuid LANGUAGE sql STABLE AS $$
 SELECT NULLIF(current_setting('app.workspace_id', true), '')::uuid
$$;
CREATE OR REPLACE FUNCTION app.active_tenant(p_workspace uuid) RETURNS boolean LANGUAGE sql STABLE AS $$
 SELECT COALESCE(p_workspace = app.tenant_id() AND EXISTS
   (SELECT 1 FROM public.workspaces w WHERE w.id = p_workspace AND w.status = 'active'), false)
$$;


ALTER TABLE customers ADD CONSTRAINT fk_customers_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT;

ALTER TABLE workspaces ADD CONSTRAINT fk_workspaces_suspender FOREIGN KEY (suspended_by) REFERENCES users(id) ON DELETE RESTRICT;

CREATE TABLE session (
 sid varchar NOT NULL PRIMARY KEY,
 sess json NOT NULL,
 expire timestamptz NOT NULL
);

CREATE INDEX idx_session_expire ON session(expire);

CREATE OR REPLACE FUNCTION app.touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END $$;

CREATE TRIGGER trg_roles_updated BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_customers_updated BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_workspaces_updated BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_platform_roles_updated BEFORE UPDATE ON platform_roles FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_workspace_memberships_updated BEFORE UPDATE ON workspace_memberships FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_password_reset_tokens_updated BEFORE UPDATE ON password_reset_tokens FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_farm_settings_updated BEFORE UPDATE ON farm_settings FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_animal_groups_updated BEFORE UPDATE ON animal_groups FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_animals_updated BEFORE UPDATE ON animals FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_animal_lifecycle_events_updated BEFORE UPDATE ON animal_lifecycle_events FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_animal_weights_updated BEFORE UPDATE ON animal_weights FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_animal_transactions_updated BEFORE UPDATE ON animal_transactions FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_workers_updated BEFORE UPDATE ON workers FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_attachments_updated BEFORE UPDATE ON attachments FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_health_records_updated BEFORE UPDATE ON health_records FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_treatments_updated BEFORE UPDATE ON treatments FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_vaccinations_updated BEFORE UPDATE ON vaccinations FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_veterinary_appointments_updated BEFORE UPDATE ON veterinary_appointments FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_disease_history_updated BEFORE UPDATE ON disease_history FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_production_updated BEFORE UPDATE ON milk_production FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_storage_locations_updated BEFORE UPDATE ON milk_storage_locations FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_collections_updated BEFORE UPDATE ON milk_collections FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_sale_customers_updated BEFORE UPDATE ON milk_sale_customers FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_sales_updated BEFORE UPDATE ON milk_sales FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_usage_updated BEFORE UPDATE ON milk_usage FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_wastage_updated BEFORE UPDATE ON milk_wastage FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_milk_stock_movements_updated BEFORE UPDATE ON milk_stock_movements FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_inventory_items_updated BEFORE UPDATE ON inventory_items FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_inventory_purchases_updated BEFORE UPDATE ON inventory_purchases FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_inventory_additions_updated BEFORE UPDATE ON inventory_additions FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_inventory_adjustments_updated BEFORE UPDATE ON inventory_adjustments FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_inventory_usage_updated BEFORE UPDATE ON inventory_usage FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_inventory_stock_movements_updated BEFORE UPDATE ON inventory_stock_movements FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_feeding_plans_updated BEFORE UPDATE ON feeding_plans FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_feeding_plan_items_updated BEFORE UPDATE ON feeding_plan_items FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_feeding_schedules_updated BEFORE UPDATE ON feeding_schedules FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_feeding_actuals_updated BEFORE UPDATE ON feeding_actuals FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_feeding_actual_items_updated BEFORE UPDATE ON feeding_actual_items FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_attendance_updated BEFORE UPDATE ON attendance FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_leave_requests_updated BEFORE UPDATE ON leave_requests FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_overtime_records_updated BEFORE UPDATE ON overtime_records FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_salary_structures_updated BEFORE UPDATE ON salary_structures FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_payroll_records_updated BEFORE UPDATE ON payroll_records FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_salary_advances_updated BEFORE UPDATE ON salary_advances FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_payroll_deductions_updated BEFORE UPDATE ON payroll_deductions FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_salary_payments_updated BEFORE UPDATE ON salary_payments FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_payslips_updated BEFORE UPDATE ON payslips FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_expense_categories_updated BEFORE UPDATE ON expense_categories FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_income_categories_updated BEFORE UPDATE ON income_categories FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_expenses_updated BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_incomes_updated BEFORE UPDATE ON incomes FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_equipment_updated BEFORE UPDATE ON equipment FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_equipment_maintenance_updated BEFORE UPDATE ON equipment_maintenance FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_equipment_usage_updated BEFORE UPDATE ON equipment_usage FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_notifications_updated BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_notification_settings_updated BEFORE UPDATE ON notification_settings FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_email_outbox_updated BEFORE UPDATE ON email_outbox FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_dashboard_layouts_updated BEFORE UPDATE ON dashboard_layouts FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_data_jobs_updated BEFORE UPDATE ON data_jobs FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_backup_configurations_updated BEFORE UPDATE ON backup_configurations FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_activity_logs_updated BEFORE UPDATE ON activity_logs FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_platform_activity_logs_updated BEFORE UPDATE ON platform_activity_logs FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

CREATE TRIGGER trg_contact_inquiries_updated BEFORE UPDATE ON contact_inquiries FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();

ALTER TABLE workspace_memberships ENABLE ROW LEVEL SECURITY;

ALTER TABLE workspace_memberships FORCE ROW LEVEL SECURITY;

CREATE POLICY p_workspace_memberships_tenant ON workspace_memberships FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE farm_settings ENABLE ROW LEVEL SECURITY;

ALTER TABLE farm_settings FORCE ROW LEVEL SECURITY;

CREATE POLICY p_farm_settings_tenant ON farm_settings FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE animal_groups ENABLE ROW LEVEL SECURITY;

ALTER TABLE animal_groups FORCE ROW LEVEL SECURITY;

CREATE POLICY p_animal_groups_tenant ON animal_groups FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

ALTER TABLE animals FORCE ROW LEVEL SECURITY;

CREATE POLICY p_animals_tenant ON animals FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE animal_lifecycle_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE animal_lifecycle_events FORCE ROW LEVEL SECURITY;

CREATE POLICY p_animal_lifecycle_events_tenant ON animal_lifecycle_events FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE animal_weights ENABLE ROW LEVEL SECURITY;

ALTER TABLE animal_weights FORCE ROW LEVEL SECURITY;

CREATE POLICY p_animal_weights_tenant ON animal_weights FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE animal_transactions ENABLE ROW LEVEL SECURITY;

ALTER TABLE animal_transactions FORCE ROW LEVEL SECURITY;

CREATE POLICY p_animal_transactions_tenant ON animal_transactions FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE workers ENABLE ROW LEVEL SECURITY;

ALTER TABLE workers FORCE ROW LEVEL SECURITY;

CREATE POLICY p_workers_tenant ON workers FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

ALTER TABLE attachments FORCE ROW LEVEL SECURITY;

CREATE POLICY p_attachments_tenant ON attachments FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;

ALTER TABLE health_records FORCE ROW LEVEL SECURITY;

CREATE POLICY p_health_records_tenant ON health_records FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

ALTER TABLE treatments FORCE ROW LEVEL SECURITY;

CREATE POLICY p_treatments_tenant ON treatments FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE vaccinations ENABLE ROW LEVEL SECURITY;

ALTER TABLE vaccinations FORCE ROW LEVEL SECURITY;

CREATE POLICY p_vaccinations_tenant ON vaccinations FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE veterinary_appointments ENABLE ROW LEVEL SECURITY;

ALTER TABLE veterinary_appointments FORCE ROW LEVEL SECURITY;

CREATE POLICY p_veterinary_appointments_tenant ON veterinary_appointments FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE disease_history ENABLE ROW LEVEL SECURITY;

ALTER TABLE disease_history FORCE ROW LEVEL SECURITY;

CREATE POLICY p_disease_history_tenant ON disease_history FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_production ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_production FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_production_tenant ON milk_production FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_storage_locations ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_storage_locations FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_storage_locations_tenant ON milk_storage_locations FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_collections ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_collections FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_collections_tenant ON milk_collections FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_sale_customers ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_sale_customers FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_sale_customers_tenant ON milk_sale_customers FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_sales ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_sales FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_sales_tenant ON milk_sales FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_usage ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_usage FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_usage_tenant ON milk_usage FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_wastage ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_wastage FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_wastage_tenant ON milk_wastage FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE milk_stock_movements ENABLE ROW LEVEL SECURITY;

ALTER TABLE milk_stock_movements FORCE ROW LEVEL SECURITY;

CREATE POLICY p_milk_stock_movements_tenant ON milk_stock_movements FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory_items FORCE ROW LEVEL SECURITY;

CREATE POLICY p_inventory_items_tenant ON inventory_items FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE inventory_purchases ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory_purchases FORCE ROW LEVEL SECURITY;

CREATE POLICY p_inventory_purchases_tenant ON inventory_purchases FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE inventory_additions ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory_additions FORCE ROW LEVEL SECURITY;

CREATE POLICY p_inventory_additions_tenant ON inventory_additions FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE inventory_adjustments ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory_adjustments FORCE ROW LEVEL SECURITY;

CREATE POLICY p_inventory_adjustments_tenant ON inventory_adjustments FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE inventory_usage ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory_usage FORCE ROW LEVEL SECURITY;

CREATE POLICY p_inventory_usage_tenant ON inventory_usage FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE inventory_stock_movements ENABLE ROW LEVEL SECURITY;

ALTER TABLE inventory_stock_movements FORCE ROW LEVEL SECURITY;

CREATE POLICY p_inventory_stock_movements_tenant ON inventory_stock_movements FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE feeding_plans ENABLE ROW LEVEL SECURITY;

ALTER TABLE feeding_plans FORCE ROW LEVEL SECURITY;

CREATE POLICY p_feeding_plans_tenant ON feeding_plans FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE feeding_plan_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE feeding_plan_items FORCE ROW LEVEL SECURITY;

CREATE POLICY p_feeding_plan_items_tenant ON feeding_plan_items FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE feeding_schedules ENABLE ROW LEVEL SECURITY;

ALTER TABLE feeding_schedules FORCE ROW LEVEL SECURITY;

CREATE POLICY p_feeding_schedules_tenant ON feeding_schedules FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE feeding_actuals ENABLE ROW LEVEL SECURITY;

ALTER TABLE feeding_actuals FORCE ROW LEVEL SECURITY;

CREATE POLICY p_feeding_actuals_tenant ON feeding_actuals FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE feeding_actual_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE feeding_actual_items FORCE ROW LEVEL SECURITY;

CREATE POLICY p_feeding_actual_items_tenant ON feeding_actual_items FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

ALTER TABLE attendance FORCE ROW LEVEL SECURITY;

CREATE POLICY p_attendance_tenant ON attendance FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;

ALTER TABLE leave_requests FORCE ROW LEVEL SECURITY;

CREATE POLICY p_leave_requests_tenant ON leave_requests FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE overtime_records ENABLE ROW LEVEL SECURITY;

ALTER TABLE overtime_records FORCE ROW LEVEL SECURITY;

CREATE POLICY p_overtime_records_tenant ON overtime_records FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE salary_structures ENABLE ROW LEVEL SECURITY;

ALTER TABLE salary_structures FORCE ROW LEVEL SECURITY;

CREATE POLICY p_salary_structures_tenant ON salary_structures FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE payroll_records ENABLE ROW LEVEL SECURITY;

ALTER TABLE payroll_records FORCE ROW LEVEL SECURITY;

CREATE POLICY p_payroll_records_tenant ON payroll_records FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE salary_advances ENABLE ROW LEVEL SECURITY;

ALTER TABLE salary_advances FORCE ROW LEVEL SECURITY;

CREATE POLICY p_salary_advances_tenant ON salary_advances FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE payroll_deductions ENABLE ROW LEVEL SECURITY;

ALTER TABLE payroll_deductions FORCE ROW LEVEL SECURITY;

CREATE POLICY p_payroll_deductions_tenant ON payroll_deductions FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE salary_payments ENABLE ROW LEVEL SECURITY;

ALTER TABLE salary_payments FORCE ROW LEVEL SECURITY;

CREATE POLICY p_salary_payments_tenant ON salary_payments FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;

ALTER TABLE payslips FORCE ROW LEVEL SECURITY;

CREATE POLICY p_payslips_tenant ON payslips FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE expense_categories FORCE ROW LEVEL SECURITY;

CREATE POLICY p_expense_categories_tenant ON expense_categories FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE income_categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE income_categories FORCE ROW LEVEL SECURITY;

CREATE POLICY p_income_categories_tenant ON income_categories FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

ALTER TABLE expenses FORCE ROW LEVEL SECURITY;

CREATE POLICY p_expenses_tenant ON expenses FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE incomes ENABLE ROW LEVEL SECURITY;

ALTER TABLE incomes FORCE ROW LEVEL SECURITY;

CREATE POLICY p_incomes_tenant ON incomes FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;

ALTER TABLE equipment FORCE ROW LEVEL SECURITY;

CREATE POLICY p_equipment_tenant ON equipment FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE equipment_maintenance ENABLE ROW LEVEL SECURITY;

ALTER TABLE equipment_maintenance FORCE ROW LEVEL SECURITY;

CREATE POLICY p_equipment_maintenance_tenant ON equipment_maintenance FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE equipment_usage ENABLE ROW LEVEL SECURITY;

ALTER TABLE equipment_usage FORCE ROW LEVEL SECURITY;

CREATE POLICY p_equipment_usage_tenant ON equipment_usage FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE notifications FORCE ROW LEVEL SECURITY;

CREATE POLICY p_notifications_tenant ON notifications FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

ALTER TABLE notification_settings FORCE ROW LEVEL SECURITY;

CREATE POLICY p_notification_settings_tenant ON notification_settings FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE email_outbox ENABLE ROW LEVEL SECURITY;

ALTER TABLE email_outbox FORCE ROW LEVEL SECURITY;

CREATE POLICY p_email_outbox_tenant ON email_outbox FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE dashboard_layouts ENABLE ROW LEVEL SECURITY;

ALTER TABLE dashboard_layouts FORCE ROW LEVEL SECURITY;

CREATE POLICY p_dashboard_layouts_tenant ON dashboard_layouts FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE data_jobs ENABLE ROW LEVEL SECURITY;

ALTER TABLE data_jobs FORCE ROW LEVEL SECURITY;

CREATE POLICY p_data_jobs_tenant ON data_jobs FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE backup_configurations ENABLE ROW LEVEL SECURITY;

ALTER TABLE backup_configurations FORCE ROW LEVEL SECURITY;

CREATE POLICY p_backup_configurations_tenant ON backup_configurations FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE activity_logs FORCE ROW LEVEL SECURITY;

CREATE POLICY p_activity_logs_tenant ON activity_logs FOR ALL
 USING (app.active_tenant(workspace_id))
 WITH CHECK (app.active_tenant(workspace_id));

ALTER TABLE inventory_purchases ADD CONSTRAINT uq_inventory_purchases_item_ref UNIQUE(workspace_id,id,item_id);

ALTER TABLE inventory_stock_movements ADD CONSTRAINT fk_ism_inventory_purchases_same_item FOREIGN KEY(workspace_id,purchase_id,item_id) REFERENCES inventory_purchases(workspace_id,id,item_id) ON DELETE RESTRICT;

ALTER TABLE inventory_additions ADD CONSTRAINT uq_inventory_additions_item_ref UNIQUE(workspace_id,id,item_id);

ALTER TABLE inventory_stock_movements ADD CONSTRAINT fk_ism_inventory_additions_same_item FOREIGN KEY(workspace_id,addition_id,item_id) REFERENCES inventory_additions(workspace_id,id,item_id) ON DELETE RESTRICT;

ALTER TABLE inventory_adjustments ADD CONSTRAINT uq_inventory_adjustments_item_ref UNIQUE(workspace_id,id,item_id);

ALTER TABLE inventory_stock_movements ADD CONSTRAINT fk_ism_inventory_adjustments_same_item FOREIGN KEY(workspace_id,adjustment_id,item_id) REFERENCES inventory_adjustments(workspace_id,id,item_id) ON DELETE RESTRICT;

ALTER TABLE inventory_usage ADD CONSTRAINT uq_inventory_usage_item_ref UNIQUE(workspace_id,id,item_id);

ALTER TABLE inventory_stock_movements ADD CONSTRAINT fk_ism_inventory_usage_same_item FOREIGN KEY(workspace_id,usage_id,item_id) REFERENCES inventory_usage(workspace_id,id,item_id) ON DELETE RESTRICT;

CREATE VIEW milk_daily_complete WITH (security_invoker=true) AS
 SELECT workspace_id,animal_id,production_date, SUM(litres) AS total_litres
 FROM milk_production GROUP BY workspace_id,animal_id,production_date
 HAVING count(*) = 2 AND count(DISTINCT session)=2;

CREATE VIEW inventory_stock_balance WITH (security_invoker=true) AS
 SELECT i.workspace_id,i.id AS item_id,COALESCE(SUM(m.quantity_delta),0::numeric) AS current_quantity
 FROM inventory_items i LEFT JOIN inventory_stock_movements m
   ON m.workspace_id=i.workspace_id AND m.item_id=i.id
 GROUP BY i.workspace_id,i.id;

CREATE VIEW milk_stock_balance WITH (security_invoker=true) AS
 SELECT workspace_id,location_id,SUM(litres_delta) AS available_litres
 FROM milk_stock_movements GROUP BY workspace_id,location_id;

-- RECOMMENDED: after provisioning a restricted runtime DB role, grant only explicit objects.
-- NEVER GRANT BYPASSRLS or make app runtime owner. Use API policy checks for role-specific access.
-- NO automatic finance/posting triggers: recognition rules unresolved.
COMMIT;
