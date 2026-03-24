// lib/ai/providers/groq.ts
import { createGroq } from "@ai-sdk/groq";

export function getGroqModel() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY missing");
  }

  if (!process.env.GROQ_MODEL) {
    throw new Error("GROQ_MODEL missing");
  }

  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
  });

  return groq(process.env.GROQ_MODEL);
}