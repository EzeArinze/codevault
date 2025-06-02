"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const newUrl = `?${params.toString()}`;
    router.replace(newUrl, { scroll: false }); // ✅ replaces URL without page reload
  };

  const getParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const clearParams = (...keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => params.delete(key));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    setParam,
    getParam,
    clearParams,
  };
}
