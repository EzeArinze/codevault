"use client";
import React from "react";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useQueryState } from "nuqs";
import SnippetCard from "../snippet-card/snippet-card";
import Loading from "./loading";
import { useSnippets } from "@/hooks/service/use-snippets";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DashboardContentProps {
  onCreateSnippet: () => void;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Recent", value: "recent" },
  { label: "Favorites", value: "favorites" },
];

export default function DashboardContent({
  onCreateSnippet,
}: DashboardContentProps) {
  const { data: snippets, isError: error, isLoading } = useSnippets();

  const [filterState, setFilterState] = useQueryState("filter", {
    defaultValue: "all",
  });

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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

      {isLoading ? <Loading message="Loading Snippet" /> : null}
      {snippets?.length === 0 && !isLoading ? (
        <EmptyState
          message={
            filterState === "all"
              ? "No snippets found"
              : filterState === "recent"
                ? "No recent snippets"
                : "No favorite snippets yet"
          }
          showButton={filterState === "all"}
          onCreateSnippet={onCreateSnippet}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {snippets?.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </>
  );
}

const EmptyState = React.memo(function EmptyState({
  message,
  showButton = false,
  onCreateSnippet,
}: {
  message: string;
  showButton?: boolean;
  onCreateSnippet: () => void;
}) {
  return (
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
});
