import SnippetDashboard from "@/components/dashboard/components/snippets";
import { Suspense } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "@/actions/get-server-session";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSnippets } from "@/actions/service/get-all-snippets";
import Loading from "@/components/dashboard/components/loading";

export default async function Page() {
  const { session } = await getServerSession();
  const queryClient = getQueryClient();

  if (!session) {
    redirect("/sign-in");
  }

  void queryClient.prefetchQuery({
    queryKey: ["snippets"],
    queryFn: () => getSnippets(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading message="Loading snippets" />}>
        <SnippetDashboard />
      </Suspense>
    </HydrationBoundary>
  );
}
