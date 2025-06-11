import { api } from "@/lib/axios";
import { CategoryArrayType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<CategoryArrayType>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    },
  });
}
