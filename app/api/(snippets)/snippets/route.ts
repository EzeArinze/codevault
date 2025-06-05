// /app/api/snippets/route.ts
import { getSnippets } from "@/actions/service/get-all-snippets";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getSnippets(); // still uses server-only logic
  return NextResponse.json(data);
}
