import { SnippetArrayType } from "@/actions/service/get-all-snippets";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSnippets() {
  return useSuspenseQuery<SnippetArrayType>({
    queryKey: ["snippets"],
    queryFn: async () => {
      const res = await fetch("/api/snippets");
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
  });
}
