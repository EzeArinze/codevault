import SnippetDashboard from "@/components/dashboard/components/snippets";

// import { getServerSession } from "@/utils/actions/get-server-session";
// import { redirect } from "next/navigation";

export default async function Page() {
  // i will do redirect if the user is not authenticated later here
  // with better auth server session management
  // const { session } = await getServerSession();

  // if (!session) {
  //   redirect("/sign-in");
  // }

  return <SnippetDashboard />;
}
