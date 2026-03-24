"use server";

import { generateObject } from "ai";
import { ConstantSystemPrompt } from "@/utils/constants/prompt";
import { GenerateSnippetRequest } from "@/utils/types";
import { getGroqModel } from "@/lib/ai/groq";
import { SnippetSchema } from "@/utils/z-schema/schema";
import { buildSnippetPrompt } from "@/lib/ai/prompts";
import { normalizeSnippet } from "@/lib/ai/normalize";

export async function generateCodeSnippet(
  request: GenerateSnippetRequest
) {
  const { prompt, language = "typescript", category = "utils" } = request;

  try {
    const model = getGroqModel();

    const { text } = await generateText({
      model: openrouter(process.env.OPEN_ROUTER_MODEL as string),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
    });

    return normalizeSnippet(object, { language, category });
  } catch (error) {
    console.error("[generateCodeSnippet]", error);
    throw new Error("Failed to generate code snippet");
  }
}