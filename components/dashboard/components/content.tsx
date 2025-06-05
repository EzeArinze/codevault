"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useQueryState } from "nuqs";
import { SnippetArrayType } from "@/actions/service/get-all-snippets";
import SnippetCard from "../snippet-card/snippet-card";

interface DashboardContentProps {
  snippets: SnippetArrayType;
  onCreateSnippet: () => void;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Recent", value: "recent" },
  { label: "Favorites", value: "favorite" },
];

export default function DashboardContent({
  snippets,
  onCreateSnippet,
}: DashboardContentProps) {
  const [filterState, setFilterState] = useQueryState("filter", {
    defaultValue: "all",
  });

  const EmptyState = ({
    message,
    showButton = false,
  }: {
    message: string;
    showButton?: boolean;
  }) => (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">{message}</p>
      {showButton && (
        <Button onClick={onCreateSnippet}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create your first snippet
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div className="flex gap-2 mb-4">
        {filterOptions.map((filter) => (
          <Button
            key={filter.value}
            variant={filterState === filter.value ? "default" : "outline"}
            onClick={() => setFilterState(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      {snippets.length === 0 ? (
        <EmptyState
          message={
            filterState === "all"
              ? "No snippets found"
              : filterState === "recent"
                ? "No recent snippets"
                : "No favorite snippets yet"
          }
          showButton={filterState === "all"}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </>
  );
}
