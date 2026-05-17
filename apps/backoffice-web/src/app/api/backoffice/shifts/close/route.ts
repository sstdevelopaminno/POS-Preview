import { getAuthContext } from "@/lib/auth-context";
import { appendAuditLog } from "@/lib/audit-log";
import { fail, ok } from "@/lib/http";
import { mockOpenOrders } from "@/lib/mock-data";
import { executeShiftClose } from "@/lib/services/shift-close-service";

export async function POST(req: Request) {
  try {
    const auth = await getAuthContext({ requireBranchScope: true });
    const body = (await req.json()) as {
      shift_id: string;
      expected_cash: number;
      actual_cash: number;
      manager_override_approval_id?: string;
    };

    const result = await executeShiftClose({
      auth,
      input: body,
      openOrders: mockOpenOrders,
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

