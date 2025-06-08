import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { SnippetArrayType } from "@/utils/types";

type DeleteSnippetResponse = {
  status: "SUCCESS" | "ERROR" | "UnAuthorized";
  message: string;
};

export function useDeleteSnippet() {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteSnippetResponse,
    Error,
    string,
    { previousSnippets?: SnippetArrayType }
  >({
    mutationFn: async (snippetId: string) => {
      const res = await api.delete(`/snippets/${snippetId}/delete-snippet`);
      return res.data;
    },
    onMutate: async (snippetId) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] });

      const previousSnippets = queryClient.getQueryData<SnippetArrayType>([
        "snippets",
      ]);

      queryClient.setQueryData(["snippets"], (old: SnippetArrayType) =>
        old?.filter((s) => s.id !== snippetId)
      );

      return { previousSnippets };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousSnippets) {
        queryClient.setQueryData(["snippets"], context.previousSnippets);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"], exact: false });
    },
  });
}
