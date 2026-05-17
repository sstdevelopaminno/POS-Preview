export type Tables = {
  tenants: {
    Row: {
      id: string;
      code: string;
      name: string;
      package_id: string | null;
      is_active: boolean;
      created_at: string;
    };
  };
  branches: {
    Row: {
      id: string;
      tenant_id: string;
      code: string;
      name: string;
      is_active: boolean;
      created_at: string;
    };
  };
  orders: {
    Row: {
      id: string;
      tenant_id: string;
      branch_id: string;
      order_no: string;
      order_type: "dine_in" | "takeaway" | "delivery_manual";
      channel: string;
      status: "draft" | "queued" | "preparing" | "completed" | "cancelled";
      total_amount: number;
      created_at: string;
    };
  };
};

