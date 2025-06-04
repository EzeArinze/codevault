import { db } from "@/db";
import { isAuthorized } from "@/lib/data-access-layer/is-authorized";

export const getSnippetCategories = async () => {
  const user = await isAuthorized();

  if (!user) return [];

  const category = await db.query.categoriesTable.findMany({
    where: (categories, { eq }) => eq(categories.user_id, user.id),
  });

  return category;
};
