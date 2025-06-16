// components/snippets/pagination.tsx
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
  const [offset, setOffset] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0)
  );
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(6));

  return (
    <div className="flex items-center justify-center gap-6 mt-8 pt-4">
      <button
        onClick={() => setOffset(Math.max(offset - limit, 0))}
        disabled={offset === 0}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors
          ${
            offset === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              : "bg-background hover:bg-accent border-accent text-primary"
          }
        `}
      >
        Previous
      </button>
      <span className="text-base font-semibold text-muted-foreground">
        Page <span className="text-primary">{offset / limit + 1}</span>
      </span>
      <button
        onClick={() => hasMore && setOffset(offset + limit)}
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
