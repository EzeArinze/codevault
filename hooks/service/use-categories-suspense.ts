import { CategoryType } from "@/actions/get-snippets-categories";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<CategoryType>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to load Categories");
      return res.json();
    },
  });
}
