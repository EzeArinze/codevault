// lib/ai/prompts/snippet.ts
export function buildSnippetPrompt({
  prompt,
  language,
  category,
}: {
  prompt: string;
  language: string;
  category: string;
}) {
  return `Create a ${language} code snippet for: ${prompt}

Requirements:
- Category: ${category}
- Language: ${language}
- Must be practical and production-ready
- Include clear naming

Return ONLY valid JSON matching this structure:
{
  "title": "...",
  "description": "...",
  "code": "...",
  "language": "...",
  "category": "...",
  "command": "..."
}`;
}