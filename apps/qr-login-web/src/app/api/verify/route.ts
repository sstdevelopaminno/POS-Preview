import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.session_token || !body.pin) {
    return Response.json({ data: null, error: { code: "invalid_payload", message: "session_token and pin are required" } }, { status: 422 });
  }

  return Response.json({
    data: {
      access_token: "demo-token",
      user_id: "00000000-0000-0000-0000-000000000101",
      branch_role: "staff"
    },
    error: null
  });
}

