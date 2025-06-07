import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { snippetsTable } from "@/db/schema";
import { isAuthorized } from "@/lib/data-access-layer/is-authorized";
import { eq } from "drizzle-orm";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const snippetId = await (await params).id;
  const user = await isAuthorized();

  if (!user) {
    return NextResponse.json(
      { status: "UnAuthorized", message: "Login to your account" },
      { status: 401 }
    );
  }

  try {
    await db.delete(snippetsTable).where(eq(snippetsTable.id, snippetId));

    return NextResponse.json({
      status: "SUCCESS",
      message: "Deleted successfully",
    });
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Error deleting snippet";
    return NextResponse.json(
      { status: "ERROR", message: err },
      { status: 500 }
    );
  }
}
