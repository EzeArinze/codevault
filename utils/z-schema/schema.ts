import { z } from "zod/v4";

const noScript = (val: string) =>
  !/<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(val);

export const SnippetSchema = z.object({
  title: z.string().trim().min(5, "Title is required").refine(noScript, {
    message: "Scripts are not allowed in the title.",
  }),
  description: z
    .string()
    .trim()
    .min(10, "Description is required")
    .refine(noScript, {
      message: "Scripts are not allowed in the description.",
    }),
  code: z.string().min(25, "Code is required").refine(noScript, {
    message: "Scripts are not allowed in the code.",
  }),
  language: z.string().min(3, "Language is required"),
  category: z.string().min(4, "Category is required"),
  command: z.string().min(6, "Command is required").refine(noScript, {
    message: "Scripts are not allowed in the command.",
  }),
});
export type SnippetZodTyped = z.infer<typeof SnippetSchema>;
