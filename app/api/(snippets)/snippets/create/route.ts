import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { categoriesTable, snippetsTable } from "@/db/schema";
import { isAuthorized } from "@/data/user/is-authorized";
import { SnippetSchema } from "@/utils/z-schema/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const result = SnippetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          status: "ERROR",
          message: result.error.issues[0]?.message || "Invalid snippet data",
        },
        { status: 400 }
      );
    }
    const parsedValues = result.data;

    // Auth check
    const user = await isAuthorized();
    if (!user) {
      return NextResponse.json(
        { status: "ERROR", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find or create category
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

    // Insert snippet
    await db.insert(snippetsTable).values({
      ...parsedValues,
      category_id: category.id,
      user_id: user.id,
    });

    return NextResponse.json({
      status: "SUCCESS",
      message: "Snippet Created Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "ERROR",
        message:
          error instanceof Error ? error.message : "Failed to create Snippet",
      },
      { status: 500 }
    );
  }
}
