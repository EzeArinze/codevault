"use server";

import { db } from "@/db";
import { getServerSession } from "./get-server-session";
import { desc, and, eq } from "drizzle-orm";
import { snippetsTable } from "@/db/schema";

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
  const { session } = await getServerSession();
  if (!session?.user.id) return [];

  // Build where clause based on filter and category
  const conditions = [eq(snippetsTable.user_id, session.user.id)];

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
