"use server";

import { generateObject } from "ai";
import { ConstantSystemPrompt } from "@/utils/constants/prompt";
import { GenerateSnippetRequest } from "@/utils/types";
import { getGroqModel } from "@/lib/ai/groq";
import { SnippetSchema } from "@/utils/z-schema/schema";
import { normalizeSnippet } from "@/lib/ai/normalize";
import { buildSnippetPrompt } from "@/lib/ai/prompts";

export async function generateCodeSnippet(
  request: GenerateSnippetRequest
) {
  const { prompt, language = "typescript", category = "utils" } = request;

  try {
    const model = getGroqModel();

    const { object } = await generateObject({
      model,
      schema: SnippetSchema,
      system: ConstantSystemPrompt,
      prompt: buildSnippetPrompt({ prompt, language, category }),
      temperature: 0.7,
    });

    return normalizeSnippet(object, { language, category });
  } catch (error) {
    console.error("[generateCodeSnippet]", error);
    throw new Error("Failed to generate code snippet");
  }
}