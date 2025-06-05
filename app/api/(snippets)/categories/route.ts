// /app/api/snippets/route.ts
import { getSnippetCategories } from "@/actions/service/get-snippets-categories";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getSnippetCategories();
  return NextResponse.json(data);
}
