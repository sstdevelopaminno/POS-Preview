import type { PinApprovalInput } from "@pos/shared-types";
import { getAuthContext } from "@/lib/auth-context";
import { appendAuditLog } from "@/lib/audit-log";
import { fail, ok } from "@/lib/http";
import { validateManagerPin } from "@/lib/pin-approval";
import { executePinApproval } from "@/lib/services/approval-service";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PinApprovalInput;
    const auth = await getAuthContext({ requireBranchScope: true });

    const result = await executePinApproval({
      auth,
      input: body,
      validatePin: () =>
        validateManagerPin(body.action, body.manager_pin, {
          tenantId: auth.tenantId!,
          branchId: auth.branchId!
        }),
      appendAuditLog
    });

    if (!result.ok) {
      return fail(result.code, result.message, result.status);
    }

    return ok(result.data);
  } catch (error) {
    return fail("unauthorized", error instanceof Error ? error.message : "Authentication failed.", 401);
  }
}

