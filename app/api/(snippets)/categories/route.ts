// /app/api/snippets/route.ts
import { getSnippetCategories } from "@/actions/get-snippets-categories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSnippetCategories();
    return NextResponse.json(data);
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Error fetching categories";
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
