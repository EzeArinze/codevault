"use server";

import { db } from "@/db";
import { categoriesTable, snippetsTable } from "@/db/schema";
import { getServerSession } from "./get-server-session";
type NewSnippet = typeof snippetsTable.$inferInsert;
// type NewCategory = typeof categoriesTable.$inferInsert;

export const createSnippetWithCategory = async (
  snippetValues: Omit<NewSnippet, "category_id" | "user_id"> & {
    categoryName: string;
  }
) => {
  const { session } = await getServerSession();

  // 1. Try to find the category by name
  const category = await db.query.categoriesTable.findFirst({
    where: (categories, { eq }) =>
      eq(categories.name, snippetValues.categoryName),
  });

  let categoryId: string;

  if (category) {
    categoryId = category.id;
  } else {
    const inserted = await db
      .insert(categoriesTable)
      .values({ name: snippetValues.categoryName })
      .returning();
    categoryId = inserted[0].id;
  }

  const { ...snippetData } = snippetValues;

  if (!session || !session.user || !session.user.id) {
    throw new Error("User session is required to create a snippet.");
  }
  const user_id = session.user.id;
  await db.insert(snippetsTable).values({
    ...snippetData,
    category_id: categoryId,
    user_id,
  });
};
