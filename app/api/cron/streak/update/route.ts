import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  return NextResponse.json({ ok: true });
};
