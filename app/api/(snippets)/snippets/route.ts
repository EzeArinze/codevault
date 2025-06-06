import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { and, desc, eq, ilike } from "drizzle-orm";
import { snippetsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SearchParamsValues } from "@/server/nuqs-server";

export type FilterType = "all" | "recent" | "favorites";

export async function GET(req: NextRequest) {
  const { q, filter, categoryId, limit, offset } = SearchParamsValues(req);

  const filterValue = (filter as FilterType) ?? "all";
  const parsedLimit = limit ? parseInt(limit, 10) : undefined;
  const parsedOffset = offset ? parseInt(offset, 10) : undefined;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const conditions = [eq(snippetsTable.user_id, session.user.id)];

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

    return NextResponse.json(snippets);
  } catch (err) {
    console.error("Failed to fetch snippets:", err);
    return NextResponse.json(
      { message: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
