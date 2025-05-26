"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

import { getMockSnippets, type Snippet } from "@/lib/api";
import DashboardHeader from "./dashboard-hearder";
import DashboardSidebar from "./sidebar";
import DashboardContent from "./content";
import CreateSnippetDialog from "./create-snippet-dialog";

export default function SnippetDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [snippets, setSnippets] = useState<Snippet[]>(getMockSnippets);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

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
        <DashboardHeader />
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Loading snippets...</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <DashboardHeader />
      <div className="flex min-h-screen flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] md:gap-6 lg:gap-10 py-6">
          <DashboardSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onCreateSnippet={() => setIsCreateDialogOpen(true)}
          />
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
        </div>
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
