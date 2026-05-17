import { requiresPinApproval } from "@pos/pos-domain";
import { getAuthContext } from "@/lib/auth-context";
import { appendAuditLog } from "@/lib/audit-log";
import { ok, fail } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const auth = await getAuthContext({ requireBranchScope: true });
    const body = (await req.json()) as {
      ingredient_id: string;
      quantity_delta: number;
      reason: string;
      approval_id?: string;
    };

    if (requiresPinApproval("stock_adjustment") && !body.approval_id) {
      return fail("approval_required", "Stock adjustment requires manager/owner PIN approval.", 403);
    }

    await appendAuditLog({
      tenantId: auth.tenantId!,
      branchId: auth.branchId!,
      actorUserId: auth.userId,
      actorRole: auth.branchRole!,
      action: "stock_adjustment_created",
      targetTable: "stock_movements",
      metadata: {
        ingredient_id: body.ingredient_id,
        quantity_delta: body.quantity_delta,
        reason: body.reason,
        approval_id: body.approval_id ?? null
      }
    });

    return ok({
      id: crypto.randomUUID(),
      status: "recorded",
      movement_type: "manual_adjustment"
    });
  } catch (error) {
    return fail("unauthorized", error instanceof Error ? error.message : "Authentication failed.", 401);
  }
}

