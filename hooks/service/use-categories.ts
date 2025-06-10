import { CategoryType } from "@/actions/get-snippets-categories";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<CategoryType>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    },
  });
}
