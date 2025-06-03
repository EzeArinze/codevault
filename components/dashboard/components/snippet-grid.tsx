import { Snippet } from "@/utils/types";
import SnippetCard from "../snippet-card/snippet-card";

export const SnippetGrid = ({ snippets }: { snippets: Snippet[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {snippets.map((snippet) => (
      <SnippetCard key={snippet.id} snippet={snippet} />
    ))}
  </div>
);
