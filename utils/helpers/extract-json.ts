import { GeneratedSnippet } from "@/actions/generate-ai";

// Robust JSON extraction function
export function extractJSON(text: string): GeneratedSnippet {
  // Remove various code block formats
  let cleaned = text
    .replace(/```(?:json|javascript|typescript)?\n?/g, "")
    .replace(/\n?```/g, "")
    .trim();

  // Find JSON object boundaries
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}") + 1;

  if (start !== -1 && end !== -1) {
    cleaned = cleaned.substring(start, end);
  }

  return JSON.parse(cleaned);
}
