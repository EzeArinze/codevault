import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type SnippetType = {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  command: string;
};

export function useAddSnippet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (initialData: Omit<SnippetType, "id">) => {
      const response = await axios.post(`/api/snippets/create`, initialData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    // Optimistic update
    onMutate: async (newSnippet) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"], exact: false });

      // Store previous data for rollback
      const previousSnippetsQueries = queryClient.getQueriesData<SnippetType[]>(
        {
          queryKey: ["snippets"],
        }
      );

      // Optimistically update each matching snippet query
      const optimisticSnippet = {
        ...newSnippet,
        id: `temp-${Date.now()}`,
      };

      previousSnippetsQueries.forEach(([key]) => {
        queryClient.setQueryData<SnippetType[]>(key, (old) =>
          old ? [...old, optimisticSnippet] : [optimisticSnippet]
        );
      });

      return { previousSnippetsQueries, tempId: optimisticSnippet.id };
    },

    onSuccess: () => {
      // Refetch all snippet queries
      queryClient.invalidateQueries({ queryKey: ["snippets"], exact: false });
      toast.success("Snippet added successfully");
    },

    onError: (_error, _vars, context) => {
      toast.error("Failed to add snippet");
      // Rollback to previous data
      context?.previousSnippetsQueries?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
  });
}
