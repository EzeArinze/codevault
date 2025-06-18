import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";

type SnippetType = {
  id?: string;
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
    mutationFn: async (snippetData: SnippetType) => {
      const { data } = await api.post<SnippetType>(
        "/snippets/create",
        snippetData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return data;
    },

    onMutate: async (newSnippet) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["snippets"] }),
        queryClient.cancelQueries({ queryKey: ["categories"] }),
      ]);

      const previousSnippets = queryClient.getQueryData<SnippetType[]>([
        "snippets",
      ]);

      const tempId = `temp-${Date.now()}`;
      const optimisticSnippet: SnippetType = {
        ...newSnippet,
        id: tempId,
      };

      queryClient.setQueryData<SnippetType[]>(["snippets"], (old = []) => [
        ...old,
        optimisticSnippet,
      ]);

      return { previousSnippets, tempId };
    },

    onSuccess: (savedSnippet, _vars, context) => {
      queryClient.setQueryData<SnippetType[]>(["snippets"], (old = []) =>
        old.map((s) => (s.id === context?.tempId ? savedSnippet : s))
      );

      toast.success("Snippet added successfully");
    },

    onError: (error, _vars, context) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add snippet";

      toast.error(errorMessage);

      // Rollback both snippets and categories if needed
      if (context?.previousSnippets !== undefined) {
        queryClient.setQueryData(["snippets"], context.previousSnippets);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
