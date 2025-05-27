"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

import { getMockSnippets, type Snippet } from "@/lib/api";
import DashboardContent from "./content";
import CreateSnippetDialog from "./create-snippet-dialog";

export default function SnippetDashboard() {
  const [searchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [snippets, setSnippets] = useState<Snippet[]>(getMockSnippets);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [activeCategory] = useState("all");

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || snippet.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Loading snippets...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-4">
      {/* <DashboardHeader /> */}
      <div className="w-full flex min-h-screen flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main className="flex w-full flex-col">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DashboardContent
            snippets={filteredSnippets}
            onCreateSnippet={() => setIsCreateDialogOpen(true)}
          />
        </main>

        <CreateSnippetDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSnippetCreated={(newSnippet) => {
            setSnippets((prev) => [...prev, newSnippet]);
          }}
        />
      </div>
    </section>
  );
}
