import React from "react";
import GenerateInput from "@/components/generate-code/generate-input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

async function AiGeneratePage() {
  return (
    <div className="flex min-h-[92vh] w-full gap-6 p-4">
      {/* Sidebar */}
      <aside className="bg-muted/50 rounded-xl w-full max-w-xs p-4 md:flex flex-col hidden">
        <Link
          href={"/dashboard"}
          className={`${buttonVariants({ variant: "secondary" })} bg-primary/10 flex items-center`}
        >
          <ArrowLeft />
          <span>dashbaord</span>
        </Link>
      </aside>
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
