import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { and, desc, eq, gte, ilike, sql } from "drizzle-orm";
import { snippetsTable } from "@/db/schema";
import { isAuthorized } from "@/data/user/is-authorized";

export type FilterType = "all" | "recent" | "favorites";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim();
  const filter = url.searchParams.get("filter") ?? "all";
  const categoryId = url.searchParams.get("categoryId");
  const limit = parseInt(url.searchParams.get("limit") || "6");
  const page = parseInt(url.searchParams.get("offset") || "0"); // This is actually the page number
  const offset = page * limit; // ✅ Convert page to row offset for database query

  const user = await isAuthorized();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const conditions = [eq(snippetsTable.user_id, user.id)];

  if (filter === "favorites") {
    conditions.push(eq(snippetsTable.favorite, true));
  }

  if (filter === "recent") {
    const aDayAgo = new Date();
    aDayAgo.setDate(aDayAgo.getDate() - 1);
    conditions.push(gte(snippetsTable.created_at, aDayAgo));
  }

  if (q) {
    conditions.push(ilike(snippetsTable.title, `%${q}%`));
  }

  if (categoryId) {
    conditions.push(eq(snippetsTable.category_id, categoryId));
  }

  const whereClause = and(...conditions);

  try {
    const snippets = await db.query.snippetsTable.findMany({
      where: whereClause,
      with: { category: true },
      orderBy: desc(snippetsTable.created_at),
      limit,
      offset,
    });

    const count = await db
      .select({ count: sql<number>`count(*)` })
      .from(snippetsTable)
      .where(whereClause)
      .then((res) => Number(res[0].count));

    return NextResponse.json({
      data: snippets,
      hasMore: offset + limit < count,
    });
  } catch (err) {
    console.error("Failed to fetch snippets:", err);
    return NextResponse.json(
      { message: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
