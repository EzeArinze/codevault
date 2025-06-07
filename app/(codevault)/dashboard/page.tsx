import SnippetDashboard from "@/components/dashboard/components/snippets";
import { Suspense } from "react";

import { redirect } from "next/navigation";
import { getServerSession } from "@/data/user/get-server-session";

export default async function Page() {
  const { session } = await getServerSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Suspense>
        <SnippetDashboard />
      </Suspense>
    </>
  );
}
