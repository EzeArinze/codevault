import {
  // parseAsFloat,
  createLoader,
  parseAsString,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  filter: parseAsString.withDefault("all"),
  categoryId: parseAsString.withDefault(""),
  q: parseAsString.withDefault(""),
  limit: parseAsString.withDefault("10"),
  offset: parseAsString.withDefault("0"),
};

export const SearchParamsValues = createLoader(coordinatesSearchParams);
