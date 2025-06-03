"use server";

import { db } from "@/db";
import { categoriesTable, snippetsTable } from "@/db/schema";
import { getServerSession } from "./get-server-session";
import { SnippetPayload } from "@/utils/types";
// import { revalidatePath } from "next/cache";

export const createSnippetWithCategory = async (
  snippetValues: SnippetPayload
) => {
  const { session } = await getServerSession();

  if (!session || !session.user || !session.user.id) {
    throw new Error("User session is required to create a snippet.");
  }
  // 1. Try to find the category by name
  const category = await db.query.categoriesTable.findFirst({
    where: (categories, { eq }) => eq(categories.name, snippetValues.category),
  });

  let categoryId: string;

  if (category) {
    categoryId = category.id;
  } else {
    const inserted = await db
      .insert(categoriesTable)
      .values({ name: snippetValues.category, user_id: session.user.id })
      .returning();
    categoryId = inserted[0].id;
  }

  await db.insert(snippetsTable).values({
    ...snippetValues,
    category_id: categoryId,
    user_id: session.user.id,
  });

  // revalidatePath("/dashboard");
};
