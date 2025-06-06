"use server";

import { db } from "@/db";
import { desc, and, eq, ilike } from "drizzle-orm";
import { snippetsTable } from "@/db/schema";
import { isAuthorized } from "@/lib/data-access-layer/is-authorized";

export type FilterType = "all" | "recent" | "favorites";

interface GetSnippetsOptions {
  filter?: FilterType;
  categoryId?: string;
  limit?: number;
  offset?: number;
  search?: string;
}

export const getSnippets = async ({
  filter = "all",
  categoryId,
  limit,
  offset,
  search,
}: GetSnippetsOptions = {}) => {
  const user = await isAuthorized();

  if (!user) return [];
  // Build where clause based on filter and category
  const conditions = [eq(snippetsTable.user_id, user.id)];

  if (filter === "favorites") {
    conditions.push(eq(snippetsTable.favorite, true));
  }

  if (categoryId) {
    conditions.push(eq(snippetsTable.category_id, categoryId));
  }

  if (search) {
    // Case-insensitive search on title
    conditions.push(ilike(snippetsTable.title, `%${search}%`));
  }

  const whereClause = and(...conditions);

  // Build order and limit for "recent"
  const orderBy =
    filter === "recent" ? desc(snippetsTable.created_at) : undefined;

  const AllSnippets = await db.query.snippetsTable.findMany({
    where: whereClause,
    ...(orderBy && { orderBy }),
    ...(limit && { limit }),
    ...(offset && { offset }),
    with: {
      category: true,
    },
  });

  return AllSnippets;
};

export type SnippetArrayType = Awaited<ReturnType<typeof getSnippets>>;
export type SnippetType = SnippetArrayType[0];
// This will be an array of your snippet objects (with category relation if included)
