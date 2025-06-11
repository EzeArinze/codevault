export const SnippetCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          className="animate-pulse rounded-xl border p-4 shadow-sm space-y-3 bg-card"
          key={i}
        >
          <div className="h-5 w-3/4 rounded bg-primary/10" /> {/* Title */}
          <div className="h-4 w-1/2 rounded bg-primary/10" /> {/* Subtitle */}
          <div className="h-20 w-full rounded bg-primary/10" />{" "}
          {/* Content area */}
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded bg-primary/10" />{" "}
            {/* Button / Tag */}
            <div className="h-8 w-16 rounded bg-primary/10" />
          </div>
        </div>
      ))}
    </div>
  );
};
