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
      const { data } = await api.post<{ data: SnippetType }>(
        "/snippets/create",
        snippetData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return data.data;
    },

    onMutate: async (newSnippet) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] });

      const previousData = queryClient.getQueryData<SnippetType[]>([
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

      return { previousData, tempId };
    },

    onSuccess: (savedSnippet, _vars, context) => {
      queryClient.setQueryData<SnippetType[]>(["snippets"], (old = []) =>
        old.map((s) => (s.id === context?.tempId ? savedSnippet : s))
      );

      toast.success("Snippet added successfully");
    },

    onError: (_error, _vars, context) => {
      toast.error("Failed to add snippet");

      if (context?.previousData) {
        queryClient.setQueryData(["snippets"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets", "categories"] });
    },
  });
}
