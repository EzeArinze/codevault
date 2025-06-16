"use client";
import React from "react";

import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import SnippetCard from "../snippet-card/snippet-card";
// import Loading from "./loading";
import { useSnippets } from "@/hooks/service/use-snippets";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pagination } from "./pagination";
import { SnippetCardSkeleton } from "./snippet-card-skeleton";

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
  const {
    data: snippets,
    isError: error,
    error: errorMessage,
    isLoading,
    isFetching,
    isPlaceholderData,
  } = useSnippets();

  const [filterState, setFilterState] = useQueryState("filter", {
    defaultValue: "all",
  });

  const snippetLength = snippets?.data.length || 0;

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{errorMessage.message}</AlertDescription>
        </Alert>
      )}

      {/* Filter buttons */}
      <div className="flex justify-between items-center">
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

        {/* Subtle loader for background fetches */}
        {isFetching && !isLoading && (
          <Loader2 className="h-4 w-4 bg-primary/10 animate-spin rounded mb-4" />
        )}
      </div>

      {/* Initial loading */}
      {isLoading ? (
        <SnippetCardSkeleton />
      ) : snippetLength === 0 ? (
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
        <>
          {/* Snippet grid with optional dimming */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 transition-opacity ${
              isPlaceholderData ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {snippets?.data?.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {snippetLength > 0 && (
        <Pagination
          isFetching={isFetching}
          isPlaceholderData={isPlaceholderData}
          hasMore={snippets?.hasMore}
        />
      )}
    </>
  );
}

// Empty Component
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
          Create snippet
        </Button>
      )}
    </div>
  );
});
