// hooks/service/use-snippets.ts
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
  const offset = searchParams.get("offset") ?? "0";

  const queryParams = new URLSearchParams({
    q,
    filter,
    categoryId,
    limit,
    offset,
  });

  return useQuery<{
    data: SnippetArrayType;
    hasMore: boolean;
  }>({
    queryKey: ["snippets", q, filter, categoryId, limit, offset],
    queryFn: async () => {
      const res = await api.get(`/snippets?${queryParams.toString()}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
