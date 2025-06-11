// /app/api/snippets/route.ts
// import { getSnippetCategories } from "@/actions/get-snippets-categories";
import { isAuthorized } from "@/data/user/is-authorized";
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await isAuthorized();

    if (!user) return [];

    const category = await db.query.categoriesTable.findMany({
      where: (categories, { eq }) => eq(categories.user_id, user.id),
    });

    return NextResponse.json(category);
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Error fetching categories";
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
