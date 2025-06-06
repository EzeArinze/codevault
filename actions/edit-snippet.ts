"use server";

import { toast } from "sonner";
import { db } from "@/db";
import { snippetsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SnippetSchema } from "@/utils/z-schema/schema";
import { SnippetEditPayload } from "@/utils/types";

// Edit a snippet in the database
export const editSnippet = async (snippet: SnippetEditPayload) => {
  const result = SnippetSchema.safeParse(snippet);

  let parsedValues;

  if (!result.success) {
    return {
      status: "ERROR",
      message: result.error.message,
    };
  } else {
    parsedValues = result.data;
  }

  try {
    await db
      .update(snippetsTable)
      .set({
        title: parsedValues.title,
        code: parsedValues.code,
        description: parsedValues.description,
        language: parsedValues.language,
        command: parsedValues.command,
        // add other fields as needed
      })
      .where(eq(snippetsTable.id, snippet.id));
    toast.success("Snippet updated!", {
      description: `The snippet "${parsedValues.title}" was updated successfully.`,
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
