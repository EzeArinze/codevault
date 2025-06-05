import {
  // parseAsFloat,
  createLoader,
  parseAsString,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  filter: parseAsString.withDefault("all"),
  category: parseAsString.withDefault("All Snippets"),
  q: parseAsString.withDefault(""),
};

export const SearchParamsValues = createLoader(coordinatesSearchParams);
