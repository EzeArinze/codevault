import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import React from "react";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Recent", value: "recent" },
  { label: "Favorites", value: "favorite" },
];

function FilterOptions() {
  const [filterState, setFilterState] = useQueryState("filter", {
    defaultValue: "all",
  });

  return (
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
  );
}

export default FilterOptions;
