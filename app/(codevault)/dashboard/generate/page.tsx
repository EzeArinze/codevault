import React from "react";
import GenerateInput from "@/components/generate-code/generate-input";
// import { getServerSession } from "@/utils/actions/get-server-session";
// import { redirect } from "next/navigation";

async function AiGeneratePage() {
  // const { session } = await getServerSession();

  // if (!session) {
  //   redirect("/sign-in");
  // }

  return (
    <div className="flex min-h-[92vh] w-full gap-6 p-4">
      {/* Sidebar */}
      <aside className="bg-muted/50 rounded-xl w-full max-w-xs p-4 md:flex flex-col hidden"></aside>
      {/* Main Content */}
      <main className="flex-1 bg-muted/50 rounded-xl p-6 flex flex-col justify-end">
        {/* Main content goes here */}
        {/* <div className="flex-1" /> */}
        <GenerateInput />
      </main>
    </div>
  );
}

export default AiGeneratePage;
