"use client";

import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { Alert, AlertDescription } from "@/components/ui/alert";

import DashboardContent from "./content";
import CreateSnippetDialog from "./create-snippet-dialog";

export default function SnippetDashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <section className="pt-4">
      <div className="w-full flex min-h-screen flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="flex w-full flex-col">
          <DashboardContent
            onCreateSnippet={() => setIsCreateDialogOpen(true)}
          />
        </main>

        <CreateSnippetDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </div>
    </section>
  );
}
