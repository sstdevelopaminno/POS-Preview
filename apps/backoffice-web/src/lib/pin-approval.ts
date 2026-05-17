import bcrypt from "bcryptjs";
import type { ApprovalAction } from "@pos/shared-types";
import { getSupabaseServiceClient } from "@/lib/supabase-admin";

export type PinApprovalResult = {
  approved: boolean;
  approverUserId?: string;
  approverRole?: "manager" | "owner";
};

type PinScope = {
  tenantId: string;
  branchId: string;
};

type PinCandidate = {
  role: "manager" | "owner";
  user_id: string;
  users_profiles: {
    pin_hash: string | null;
    is_active: boolean;
  };
};

export async function validateManagerPin(action: ApprovalAction, pin: string, scope: PinScope): Promise<PinApprovalResult> {
  if (!pin || pin.length < 4) {
    return { approved: false };
  }

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("user_branch_roles")
    .select("role,user_id,users_profiles!inner(pin_hash,is_active)")
    .eq("tenant_id", scope.tenantId)
    .eq("branch_id", scope.branchId)
    .in("role", ["manager", "owner"])
    .order("role", { ascending: false });

  if (error || !data?.length) {
    return { approved: false };
  }

  const rows = data as unknown as PinCandidate[];

  for (const candidate of rows) {
    if (!candidate.users_profiles?.is_active || !candidate.users_profiles.pin_hash) {
      continue;
    }

    const isMatch = await bcrypt.compare(pin, candidate.users_profiles.pin_hash);

    if (isMatch) {
      return {
        approved: true,
        approverUserId: candidate.user_id,
        approverRole: candidate.role
      };
    }
  }

  return { approved: false };
}

