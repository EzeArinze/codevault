"use server";

import { db } from "@/db";
import { categoriesTable, snippetsTable } from "@/db/schema";
import { createSnipReturnType, SnippetPayload } from "@/utils/types";
import { isAuthorized } from "@/data/user/is-authorized";
import { revalidatePath } from "next/cache";
import { SnippetSchema } from "@/utils/z-schema/schema";

export const createSnippetWithCategory = async (
  snippetValues: SnippetPayload
): Promise<createSnipReturnType> => {
  const result = SnippetSchema.safeParse(snippetValues);

  let parsedValues;

  if (!result.success) {
    return {
      status: "ERROR",
      message: result.error.issues[0]?.message || "Invalid snippet data",
    };
  } else {
    parsedValues = result.data;
  }

  try {
    const user = await isAuthorized();

    let category = await db.query.categoriesTable.findFirst({
      where: (categories, { eq }) => eq(categories.name, parsedValues.category),
    });

    if (!category) {
      const [inserted] = await db
        .insert(categoriesTable)
        .values({ name: parsedValues.category, user_id: user.id })
        .returning();
      category = inserted;
    }

    await db.insert(snippetsTable).values({
      ...parsedValues,
      category_id: category.id,
      user_id: user.id,
    });

    revalidatePath("/dashboard");

    return {
      status: "SUCCESS",
      message: "Snippet Created Successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to create Snippet",
    };
  }
};
