// lib/ai/normalize/snippet.ts
import { GeneratedSnippet } from "@/utils/types";
import { SnippetSchema } from "@/utils/z-schema/schema";

import z from "zod";

export function normalizeSnippet(
  data: z.infer<typeof SnippetSchema>,
  fallback: { language: string; category: string }
): GeneratedSnippet {
  return {
    title: data.title || "Generated Snippet",
    description: data.description || "AI generated code snippet",
    language: data.language || fallback.language,
    category: data.category || fallback.category,
    code: data.code || "// Code generation failed",
    command:
      data.command ||
      `npx add ${data.category || fallback.category}/${(
        data.title || "snippet"
      )
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}.${
        (data.language || fallback.language) === "typescript" ? "ts" : "js"
      }`,
  };
}