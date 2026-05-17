import type { CreateManualDeliveryOrderInput } from "@pos/shared-types";
import { getAuthContext } from "@/lib/auth-context";
import { appendAuditLog } from "@/lib/audit-log";
import { ok, fail } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as CreateManualDeliveryOrderInput;
    const auth = await getAuthContext({ requireBranchScope: true });

    if (!payload.external_order_code?.trim()) {
      return fail("invalid_external_code", "External order code is required.", 422);
    }

    if (!["grab", "line_man", "shopee", "merchant_app", "other"].includes(payload.channel)) {
      return fail("invalid_channel", "Manual delivery channel is invalid.", 422);
    }

    const orderId = crypto.randomUUID();

    await appendAuditLog({
      tenantId: auth.tenantId!,
      branchId: auth.branchId!,
      actorUserId: auth.userId,
      actorRole: auth.branchRole!,
      action: "manual_delivery_order_created",
      targetTable: "orders",
      targetId: orderId,
      metadata: {
        channel: payload.channel,
        external_order_code: payload.external_order_code,
        app_total_amount: payload.app_total_amount
      }
    });

    return ok(
      {
        id: orderId,
        status: "queued",
        created_at: new Date().toISOString()
      },
      201
    );
  } catch (error) {
    return fail("unauthorized", error instanceof Error ? error.message : "Authentication failed.", 401);
  }
}

