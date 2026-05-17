export type UUID = string;

export type PlatformRole = "it_admin" | "tenant_user";
export type BranchRole = "owner" | "manager" | "staff";

export type PaymentMethod = "cash" | "bank_transfer";
export type OrderType = "dine_in" | "takeaway" | "delivery_manual";
export type DeliveryChannel = "storefront" | "walk_home" | "grab" | "line_man" | "shopee" | "merchant_app" | "other";
export type OrderStatus = "draft" | "queued" | "preparing" | "completed" | "cancelled";
export type DeliveryStatus = "pending" | "preparing" | "completed" | "cancelled";
export type ShiftStatus = "open" | "closed";
export type StockMovementType = "purchase" | "sale_deduction" | "manual_adjustment" | "waste";
export type ApprovalAction = "cancel_bill" | "stock_adjustment" | "employee_delete" | "shift_close_override";

export interface Tenant {
  id: UUID;
  code: string;
  name: string;
  is_active: boolean;
  package_id: UUID | null;
  created_at: string;
}

export interface Branch {
  id: UUID;
  tenant_id: UUID;
  code: string;
  name: string;
  address: string | null;
  is_active: boolean;
  created_at: string;
}

export interface UserProfile {
  id: UUID;
  email: string;
  full_name: string;
  platform_role: PlatformRole;
  pin_hash: string | null;
  created_at: string;
}

export interface UserBranchRole {
  id: UUID;
  user_id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  role: BranchRole;
  is_default: boolean;
  created_at: string;
}

export interface DineInTable {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  table_code: string;
  seats: number;
  is_active: boolean;
}

export interface Product {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  sku: string;
  name: string;
  category: string;
  price: number;
  is_combo: boolean;
  is_active: boolean;
}

export interface ProductComboItem {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  combo_product_id: UUID;
  child_product_id: UUID;
  qty: number;
}

export interface Ingredient {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  name: string;
  base_unit: string;
  quantity_on_hand: number;
}

export interface IngredientPackage {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  ingredient_id: UUID;
  package_name: string;
  unit_count: number;
}

export interface RecipeItem {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  product_id: UUID;
  ingredient_id: UUID;
  quantity_per_item: number;
  applies_when_takeaway_only: boolean;
}

export interface Shift {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  opened_by: UUID;
  closed_by: UUID | null;
  opened_at: string;
  closed_at: string | null;
  opening_cash: number;
  expected_cash: number | null;
  actual_cash: number | null;
  status: ShiftStatus;
}

export interface Order {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  shift_id: UUID;
  order_no: string;
  order_type: OrderType;
  channel: DeliveryChannel;
  table_id: UUID | null;
  external_order_code: string | null;
  customer_name: string | null;
  notes: string | null;
  subtotal: number;
  discount_amount: number;
  gp_amount: number;
  total_amount: number;
  status: OrderStatus;
  created_by: UUID;
  cancelled_by: UUID | null;
  cancelled_reason: string | null;
  created_at: string;
}

export interface OrderItem {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  order_id: UUID;
  product_id: UUID;
  quantity: number;
  unit_price: number;
  line_total: number;
  notes: string | null;
}

export interface Payment {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  order_id: UUID;
  method: PaymentMethod;
  amount: number;
  received_at: string;
  received_by: UUID;
  reference_no: string | null;
}

export interface StockMovement {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  ingredient_id: UUID;
  movement_type: StockMovementType;
  quantity_delta: number;
  reason: string;
  ref_table: string | null;
  ref_id: UUID | null;
  created_by: UUID;
  created_at: string;
}

export interface PinApproval {
  id: UUID;
  tenant_id: UUID;
  branch_id: UUID;
  action: ApprovalAction;
  requested_by: UUID;
  approved_by: UUID;
  target_table: string;
  target_id: UUID;
  note: string | null;
  approved_at: string;
}

export interface AuditLog {
  id: UUID;
  tenant_id: UUID | null;
  branch_id: UUID | null;
  user_id: UUID;
  role: PlatformRole | BranchRole;
  actor_user_id: UUID;
  actor_role: PlatformRole | BranchRole;
  action: string;
  module: string;
  entity_type: string;
  entity_id: string | null;
  target_table: string;
  target_id: UUID | null;
  before_data: Record<string, unknown>;
  after_data: Record<string, unknown>;
  override_by_user_id: UUID | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface CreateManualDeliveryOrderInput {
  tenant_id: UUID;
  branch_id: UUID;
  shift_id: UUID;
  channel: DeliveryChannel;
  external_order_code: string;
  customer_name?: string;
  notes?: string;
  app_total_amount: number;
  gp_amount?: number;
  discount_amount?: number;
  items: Array<{
    product_id: UUID;
    quantity: number;
    notes?: string;
  }>;
}

export interface PinApprovalInput {
  tenant_id: UUID;
  branch_id: UUID;
  action: ApprovalAction;
  target_table: string;
  target_id: UUID;
  manager_pin: string;
  note?: string;
}

export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiErrorResponse {
  data: null;
  error: {
    code: string;
    message: string;
  };
}



