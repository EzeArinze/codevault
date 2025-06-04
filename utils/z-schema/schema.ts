import { z } from "zod/v4";

export const SnippetSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  code: z.string().min(1, "Code is required"),
  language: z.string().min(1, "Language is required"),
  category: z.string().min(1, "Category is required"),
  command: z.string().min(1, "Command is required"),
});

export type SnippetZodTyped = z.infer<typeof SnippetSchema>;
