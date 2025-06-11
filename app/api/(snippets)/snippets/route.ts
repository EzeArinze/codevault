import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { snippetsTable } from "@/db/schema";
import { SearchParamsValues } from "@/server/nuqs-server";
import { isAuthorized } from "@/data/user/is-authorized";

export type FilterType = "all" | "recent" | "favorites";

export async function GET(req: NextRequest) {
  const { q, filter, categoryId, limit, offset } = SearchParamsValues(req);

  const filterValue = (filter as FilterType) ?? "all";
  const parsedLimit = limit ? parseInt(limit, 10) : 10;
  const parsedOffset = offset ? parseInt(offset, 10) : undefined;

  const session = await isAuthorized();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const conditions = [eq(snippetsTable.user_id, session.id)];

  // Map-based logic for filters
  const filterLogic: Record<FilterType, () => void> = {
    favorites: () => conditions.push(eq(snippetsTable.favorite, true)),
    recent: () => {},
    all: () => {},
  };

  // Execute filter logic
  (filterLogic[filterValue] || (() => {}))();

  if (categoryId) {
    conditions.push(eq(snippetsTable.category_id, categoryId));
  }

  if (q) {
    conditions.push(ilike(snippetsTable.title, `%${q}%`));
  }

  const whereClause = and(...conditions);
  const orderBy =
    filter === "recent" ? desc(snippetsTable.created_at) : undefined;

  try {
    const snippets = await db.query.snippetsTable.findMany({
      where: whereClause,
      ...(orderBy && { orderBy }),
      ...(parsedLimit && { limit: parsedLimit }),
      ...(parsedOffset && { offset: parsedOffset }),
      with: {
        category: true,
      },
    });

    const totalCount = await db
      .select({ count: sql`count(*)` })
      .from(snippetsTable)
      .where(whereClause)
      .then((res) => Number(res[0]?.count || 0));

    const hasMore = (parsedOffset ?? 0) + parsedLimit < totalCount;

    return NextResponse.json({
      data: snippets,
      hasMore,
    });
  } catch (err) {
    console.error("Failed to fetch snippets:", err);
    return NextResponse.json(
      { message: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
