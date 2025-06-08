import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SnippetArrayType } from "@/utils/types";

type SnippetType = SnippetArrayType[number];

export function useAddSnippet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (initialData: Omit<SnippetType, "id">) => {
      const response = await axios.post("/api/snippets/create", initialData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    onMutate: async (newSnippet) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] });

      const previousSnippets = queryClient.getQueryData<SnippetType[]>([
        "snippets",
      ]);
      const tempId = `temp-${Date.now()}`;
      const optimisticSnippet = { ...newSnippet, id: tempId };

      queryClient.setQueryData<SnippetType[]>(["snippets"], (oldData) => {
        return oldData ? [...oldData, optimisticSnippet] : [optimisticSnippet];
      });

      return { previousSnippets, tempId };
    },

    onSuccess: (newSnippet, _, context) => {
      queryClient.setQueryData<SnippetType[]>(["snippets"], (oldData) => {
        if (!oldData) return [newSnippet];
        // Replace the temp snippet with the real one
        return oldData.map((snippet) =>
          snippet.id === context?.tempId ? newSnippet : snippet
        );
      });
      toast.success("Snippet added successfully");
    },

    onError: (_error, _, context) => {
      toast.error("Failed to add Snippet");
      if (context?.previousSnippets) {
        queryClient.setQueryData(["snippets"], context.previousSnippets);
      }
    },
  });
}
