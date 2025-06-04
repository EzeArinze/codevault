import { db } from "@/db";
import { snippetsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

export const deleteSnippet = async (snippetId: string) => {
  try {
    await db.delete(snippetsTable).where(eq(snippetsTable.id, snippetId));
    toast.success("Deleted!", {
      description: "Snippet has been deleted successfully.",
    });
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Error Deleting snippet";
    console.log(err);
    toast.error("Delete failed", {
      description: "There was an error deleting the snippet.",
    });
  }
};
