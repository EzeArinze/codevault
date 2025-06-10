"use client";

import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export const DashboardSearchCommand = () => {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });

  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => setSearchQuery(inputValue), 700);
    return () => clearTimeout(handler);
  }, [inputValue, setSearchQuery]);

  return (
    <Input
      placeholder="Search.."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
