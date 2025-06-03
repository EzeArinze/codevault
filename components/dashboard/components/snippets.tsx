"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  // getMockSnippets,
  type Snippet,
} from "@/utils/types";
import DashboardContent from "./content";
import CreateSnippetDialog from "./create-snippet-dialog";
import Loading from "./loading";

const snippets: Snippet[] = [];

export default function SnippetDashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  if (isLoading) {
    return <Loading message="Loading Snippets..." />;
  }

  return (
    <section className="pt-4">
      <div className="w-full flex min-h-screen flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="flex w-full flex-col">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DashboardContent
            snippets={snippets}
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
