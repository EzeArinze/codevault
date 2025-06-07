// app/api/snippets/[id]/toggle-favorite/route.ts

import { db } from "@/db";
import { snippetsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const snippetId = (await params).id;

    const [snippet] = await db
      .select({ favorite: snippetsTable.favorite })
      .from(snippetsTable)
      .where(eq(snippetsTable.id, snippetId));

    if (!snippet) {
      return NextResponse.json(
        { status: "ERROR", message: "Snippet not found" },
        { status: 404 }
      );
    }

    const newFavorite = !snippet.favorite;

    await db
      .update(snippetsTable)
      .set({ favorite: newFavorite })
      .where(eq(snippetsTable.id, snippetId));

    return NextResponse.json({
      status: "SUCCESS",
      message: newFavorite ? "Added to favorite" : "Removed from favorite",
      favorite: newFavorite,
    });
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Error updating favorite";
    return NextResponse.json(
      { status: "ERROR", message: err },
      { status: 500 }
    );
  }
}
