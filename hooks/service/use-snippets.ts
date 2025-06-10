import { api } from "@/lib/axios";
import { SnippetArrayType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type FilterType = "all" | "recent" | "favorites";

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
      const res = await api.get(`/snippets?${queryString}`);
      return res.data;
    },
  });
}
