import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { snippetsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SnippetSchema } from "@/utils/z-schema/schema";
import { isAuthorized } from "@/data/user/is-authorized";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const snippetId = (await params).id;

    // Validate input
    const result = SnippetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          status: "ERROR",
          message: result.error.message,
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

    // Update snippet using id from URL
    await db
      .update(snippetsTable)
      .set({
        title: parsedValues.title,
        code: parsedValues.code,
        description: parsedValues.description,
        language: parsedValues.language,
        command: parsedValues.command,
      })
      .where(eq(snippetsTable.id, snippetId));

    return NextResponse.json({
      status: "SUCCESS",
      message: "Snippet updated successfully",
    });
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Error updating snippet";
    return NextResponse.json(
      {
        status: "ERROR",
        message: err,
      },
      { status: 500 }
    );
  }
}
