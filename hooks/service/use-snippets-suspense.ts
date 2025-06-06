import {
  FilterType,
  SnippetArrayType,
} from "@/actions/service/get-all-snippets";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useSnippets() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q")?.trim();
  const filter = searchParams.get("filter")?.trim() as FilterType | undefined;
  const categoryId = searchParams.get("categoryId")?.trim();

  const queryParams = new URLSearchParams();

  if (q) queryParams.set("q", q);
  if (filter) queryParams.set("filter", filter);
  if (categoryId) queryParams.set("categoryId", categoryId);

  const queryString = queryParams.toString();

  return useQuery<SnippetArrayType>({
    queryKey: ["snippets", q, filter, categoryId],
    queryFn: async () => {
      const res = await fetch(`/api/snippets?${queryString}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
  });
}
