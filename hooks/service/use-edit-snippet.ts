import { api } from "@/lib/axios";
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

export function useUpdateSnippet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updateData }: SnippetType) => {
      const response = await api.put(`/snippets/${id}/edit`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },

    onMutate: async (updatedSnippet) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["snippets"] });

      // Snapshot previous data
      const previousSnippets = queryClient.getQueryData<SnippetType[]>([
        "snippets",
      ]);

      // Optimistically update UI
      queryClient.setQueryData<SnippetType[]>(["snippets"], (old = []) =>
        old.map((snippet) =>
          snippet.id === updatedSnippet.id
            ? { ...snippet, ...updatedSnippet }
            : snippet
        )
      );

      return { previousSnippets };
    },

    onError: (err, _variables, context) => {
      if (context?.previousSnippets) {
        queryClient.setQueryData(["snippets"], context.previousSnippets);
      }
      toast.error("Failed to update snippet", {
        description:
          err.message || "Something went wrong while updating snippet",
      });
    },

    onSuccess: () => {
      toast.success("Snippet updated successfully");
    },

    onSettled: () => {
      // Optionally refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["snippets"], exact: false });
    },
  });
}
