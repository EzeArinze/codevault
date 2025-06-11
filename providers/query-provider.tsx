"use client";
// import { getQueryClient } from "@/lib/get-query-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type * as React from "react";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const queryClient = getQueryClient();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
