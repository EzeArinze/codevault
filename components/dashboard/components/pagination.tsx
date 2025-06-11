import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";

interface PaginationProps {
  isPlaceholderData: boolean;
  hasMore: boolean | undefined;
  isFetching: boolean;
}

function Pagination({
  isPlaceholderData,
  hasMore,
  isFetching,
}: PaginationProps) {
  const [page, setPage] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0)
  );

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors
          ${
            page === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              : "bg-background hover:bg-accent border-accent text-primary"
          }
        `}
      >
        Previous
      </button>
      <span className="text-sm font-semibold text-muted-foreground">
        Page <span className="text-primary">{page + 1}</span>
      </span>
      <button
        onClick={() => {
          if (!isPlaceholderData && hasMore) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData || !hasMore || isFetching}
        className={`px-4 py-2 rounded-md border text-sm font-medium flex items-center gap-2 transition-colors
          ${
            isPlaceholderData || !hasMore || isFetching
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              : "bg-background hover:bg-accent border-accent text-primary"
          }
        `}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
