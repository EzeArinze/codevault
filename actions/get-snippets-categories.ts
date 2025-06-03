"use server"

import { db } from "@/db";
import { getServerSession } from "./get-server-session";

export const getSnippetCategories = async () => {
  const { session } = await getServerSession();

  if (!session?.user.id) {
    return [];
  }

  const category = await db.query.categoriesTable.findMany({
    where: (categories, { eq }) => eq(categories.user_id, session.user.id),
  });

  return category;
};
