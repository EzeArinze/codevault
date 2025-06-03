"use server";

import { db } from "@/db";
import { categoriesTable, snippetsTable } from "@/db/schema";
import { getServerSession } from "./get-server-session";
import { SnippetPayload } from "@/utils/types";
// import { revalidatePath } from "next/cache";

// export const createSnippetWithCategory = async (
//   snippetValues: SnippetPayload
// ) => {
//   if (!snippetValues.code || !snippetValues.title || !snippetValues.command)
//     return;

//   const { session } = await getServerSession();

//   if (!session || !session.user.id) {
//     throw new Error("User session is required to create a snippet.");
//   }
//   // 1. Try to find the category by name
//   const category = await db.query.categoriesTable.findFirst({
//     where: (categories, { eq }) => eq(categories.name, snippetValues.category),
//   });

//   let categoryId: string;

//   if (category) {
//     categoryId = category.id;
//   } else {
//     const inserted = await db
//       .insert(categoriesTable)
//       .values({ name: snippetValues.category, user_id: session.user.id })
//       .returning();
//     categoryId = inserted[0].id;
//   }

//   await db.insert(snippetsTable).values({
//     ...snippetValues,
//     category_id: categoryId,
//     user_id: session.user.id,
//   });

//   // revalidatePath("/dashboard");
// };

export const createSnippetWithCategory = async (
  snippetValues: SnippetPayload
) => {
  if (!snippetValues.code || !snippetValues.title || !snippetValues.command)
    return;

  const { session } = await getServerSession();

  if (!session?.user?.id) {
    throw new Error("User session is required to create a snippet.");
  }

  let category = await db.query.categoriesTable.findFirst({
    where: (categories, { eq }) => eq(categories.name, snippetValues.category),
  });

  if (!category) {
    const [inserted] = await db
      .insert(categoriesTable)
      .values({ name: snippetValues.category, user_id: session.user.id })
      .returning();
    category = inserted;
  }

  const [snippet] = await db
    .insert(snippetsTable)
    .values({
      ...snippetValues,
      category_id: category.id,
      user_id: session.user.id,
    })
    .returning();

  return snippet;
};
