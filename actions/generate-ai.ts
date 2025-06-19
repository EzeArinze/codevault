"use server";

import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
// import { createOpenAI } from "@ai-sdk/openai";

// const MODEL = process.env.OPEN_ROUTER_MODEL as string;

// const openrouter = createOpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY as string,
//   baseURL: process.env.OPEN_ROUTER_URL as string,
// });

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

// const openrouter = createOpenRouter({
//   apiKey: process.env.OPENROUTER_API_KEY as string,
// });

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

export async function generateCodeSnippet(
  request: GenerateSnippetRequest
): Promise<GeneratedSnippet> {
  const { prompt, language = "typescript", category = "utils" } = request;

  const systemPrompt = `You are an expert software developer. Generate a code snippet based on the user's request.

Rules:
1. Generate clean, well-documented, production-ready code
2. Include proper TypeScript types when applicable
3. Follow best practices and modern conventions
4. Make the code reusable and modular
5. Add helpful comments where needed

Response format (JSON):
{
  "title": "Brief descriptive title (max 50 chars)",
  "description": "What the code does (max 150 chars)", 
  "code": "The actual code snippet",
  "language": "programming language",
  "category": "appropriate category (hooks, utils, components, services, config, styles)",
  "installCommand": "npx create-file command for this snippet"
}

Categories:
- hooks: React hooks and custom hooks
- utils: Utility functions and helpers
- components: React/UI components
- services: API services and external integrations
- config: Configuration files and setup
- styles: CSS, styling utilities

Languages: typescript, javascript, jsx, tsx, css, html, python, etc.`;

  const userPrompt = `Create a ${language} code snippet for: ${prompt}

Preferred category: ${category}
Language: ${language}

Generate a practical, well-structured code snippet that solves this requirement.`;

  try {
    const openrouter = createSafeOpenRouter();

    const { text } = await generateText({
      model: openrouter("google/gemini-2.0-flash-exp:free"),
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
        `npx add ${generated.category || category}/${(generated.title || "snippet").toLowerCase().replace(/\s+/g, "-")}.${generated.language === "typescript" ? "ts" : "js"}`,
    };
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("Failed to generate code snippet. Please try again.");
  }
}
