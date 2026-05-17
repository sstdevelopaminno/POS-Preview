import type { BranchRole, PlatformRole } from "@pos/shared-types";

export async function appendAuditLog(input: {
  tenantId?: string;
  branchId?: string;
  actorUserId: string;
  actorRole: BranchRole | PlatformRole;
  action: string;
  targetTable: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}) {
  // Placeholder for insert into audit_logs with Supabase client.
  return {
    inserted: true,
    at: new Date().toISOString(),
    ...input
  };
}

