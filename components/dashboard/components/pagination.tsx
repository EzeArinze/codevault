import { parseAsInteger, useQueryState } from "nuqs";

export function Pagination({
  hasMore,
  isFetching,
  isPlaceholderData,
}: {
  hasMore: boolean | undefined;
  isFetching: boolean;
  isPlaceholderData: boolean;
}) {
  // This is actually a page number (0-indexed), but we keep "offset" as the URL param name
  const [page, setPage] = useQueryState(
    "offset", // Keep same URL param name for API compatibility
    parseAsInteger.withDefault(0)
  );

  return (
    <div className="flex items-center justify-center gap-6 mt-8 pt-2">
      <button
        onClick={() => setPage(Math.max(page - 1, 0))}
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

      <span className="text-base font-semibold text-muted-foreground">
        Page{" "}
        {/* ✅ Fixed: Since page is 0-indexed, add 1 for user-friendly display */}
        <span className="text-primary">{page + 1}</span>
      </span>

      <button
        onClick={() => hasMore && setPage(page + 1)}
        disabled={!hasMore || isPlaceholderData || isFetching}
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
