"use server";

import { Snippet } from "@/utils/types";
import { toast } from "sonner";
import { db } from "@/db";
import { snippetsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// Delete a snippet from the database
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

// Edit a snippet in the database
export const editSnippet = async (snippet: Snippet) => {
  try {
    await db
      .update(snippetsTable)
      .set({
        title: snippet.title,
        code: snippet.code,
        description: snippet.description,
        language: snippet.language,
        command: snippet.installCommand,
        // add other fields as needed
      })
      .where(eq(snippetsTable.id, snippet.id));
    toast.success("Snippet updated!", {
      description: `The snippet "${snippet.title}" was updated successfully.`,
    });
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Error updating snippet";
    console.log(err);
    toast.error("Update failed", {
      description: "There was an error updating the snippet.",
    });
  }
};
