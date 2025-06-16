import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";
import { keepPreviousData } from "@tanstack/react-query";
import { SnippetArrayType } from "@/utils/types";

export function useSnippets() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q")?.trim() ?? "";
  const filter = searchParams.get("filter") ?? "all";
  const categoryId = searchParams.get("categoryId") ?? "";
  const limit = searchParams.get("limit") ?? "6";
  const page = searchParams.get("offset") ?? "0"; // This is actually a page number (0-indexed)

  const queryParams = new URLSearchParams({
    q,
    filter,
    categoryId,
    limit,
    offset: page, // Keep the same param name for API compatibility
  });

  return useQuery<{
    data: SnippetArrayType;
    hasMore: boolean;
  }>({
    queryKey: ["snippets", q, filter, categoryId, limit, page],
    queryFn: async () => {
      const res = await api.get(`/snippets?${queryParams.toString()}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
