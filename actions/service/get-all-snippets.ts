import { db } from "@/db";
import { desc, and, eq } from "drizzle-orm";
import { snippetsTable } from "@/db/schema";
import { isAuthorized } from "@/lib/data-access-layer/is-authorized";

type FilterType = "all" | "recent" | "favorites";

interface GetSnippetsOptions {
  filter?: FilterType;
  categoryId?: string;
  limit?: number;
  offset?: number;
}

export const getSnippets = async ({
  filter = "all",
  categoryId,
  limit,
  offset,
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

  const whereClause = and(...conditions);

  // Build order and limit for "recent"
  const orderBy =
    filter === "recent" ? desc(snippetsTable.createdAt) : undefined;

  const AllSnippets = await db.query.snippetsTable.findMany({
    where: whereClause,
    ...(orderBy && { orderBy }),
    ...(limit && { limit }),
    ...(offset && { offset }),
  });

  return AllSnippets;
};
