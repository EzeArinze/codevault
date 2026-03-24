"use server";

import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ConstantSystemPrompt } from "@/utils/constants/prompt";

// const MODEL = process.env.OPEN_ROUTER_MODEL as string;

export interface GenerateSnippetRequest {
  prompt: string;
  language?: string;
  category?: string;
}

export interface GeneratedSnippet {
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  command: string;
}

function validateEnv() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY environment variable is missing");
  }
}

function createSafeOpenRouter() {
  try {
    validateEnv();
    return createOpenRouter({
      apiKey: `${process.env.OPENROUTER_API_KEY as string}`,
    });
  } catch (error) {
    console.error("OpenRouter initialization failed:", error);
    throw new Error("Failed to initialize AI provider");
  }
}

export async function generateCodeSnippet(
  request: GenerateSnippetRequest
): Promise<GeneratedSnippet> {
  const { prompt, language = "typescript", category = "utils" } = request;

  const systemPrompt = ConstantSystemPrompt;
  const userPrompt = `Create a ${language} code snippet for: ${prompt}
  Preferred category: ${category}
  Language: ${language}
  Generate a practical, well-structured code snippet that solves this requirement.`;

  try {
    const openrouter = createSafeOpenRouter();

    const { text } = await generateText({
      model: openrouter(process.env.OPEN_ROUTER_MODEL as string),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
    const generated = JSON.parse(cleanedText) as GeneratedSnippet;

    // Validate and set defaults
    return {
      title: generated.title || "Generated Snippet",
      description: generated.description || "AI generated code snippet",
      language: generated.language || language,
      category: generated.category || category,
      code: generated.code || "// Code generation failed",
      command:
        generated.command ||
        `npx add ${generated.category || category}/${(
          generated.title || "snippet"
        )
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(
            /[^a-z0-9-]/g,
            ""
          )}.${generated.language === "typescript" ? "ts" : "js"}`,
    };
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("Failed to generate code snippet. Please try again.");
  }
}
