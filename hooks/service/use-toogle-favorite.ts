import { api } from "@/lib/axios";
import { SnippetArrayType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ToggleFavoriteResponse = {
  status: "SUCCESS" | "ERROR";
  message: string;
  favorite?: boolean;
};

export function useToggleFavorite(snippetId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    ToggleFavoriteResponse,
    Error,
    boolean,
    { previousSnippets?: SnippetArrayType }
  >({
    mutationFn: async () => {
      const res = await api.patch(`/snippets/${snippetId}/toggle-favorite`);
      return res.data;
    },
    // Optimistic update
    onMutate: async (currentFavorite) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] });

      const previousSnippets = queryClient.getQueryData<SnippetArrayType>([
        "snippets",
      ]);

      queryClient.setQueryData(["snippets"], (old: SnippetArrayType) =>
        old?.map((s) =>
          s.id === snippetId ? { ...s, favorite: !currentFavorite } : s
        )
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
