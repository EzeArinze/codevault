import { GeneratedSnippet } from "@/utils/types";

export function extractJSON(text: string): GeneratedSnippet {
  let cleaned = text
    .replace(/```(?:json|javascript|typescript)?\n?/g, "")
    .replace(/\n?```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}") + 1;

  if (start !== -1 && end !== -1) {
    cleaned = cleaned.substring(start, end);
  }

  return JSON.parse(cleaned);
}
