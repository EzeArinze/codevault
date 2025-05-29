"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import SnippetCard from "@/components/snippet-card"
import type { Snippet } from "@/lib/api";
import SnippetCard from "@/components/snippet-card/snippet-card";

interface DashboardContentProps {
  snippets: Snippet[];
  onCreateSnippet: () => void;
}

export default function DashboardContent({
  snippets,
  onCreateSnippet,
}: DashboardContentProps) {
  const favoriteSnippets = snippets.filter((snippet) => snippet.isFavorite);
  const recentSnippets = [...snippets]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 6);

  const EmptyState = ({
    message,
    showButton = false,
  }: {
    message: string;
    showButton?: boolean;
  }) => (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">{message}</p>
      {showButton && (
        <Button onClick={onCreateSnippet}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create your first snippet
        </Button>
      )}
    </div>
  );

  const SnippetGrid = ({ snippets }: { snippets: Snippet[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorite">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {snippets.length === 0 ? (
            <EmptyState message="No snippets found" showButton />
          ) : (
            <SnippetGrid snippets={snippets} />
          )}
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          {recentSnippets.length === 0 ? (
            <EmptyState message="No recent snippets" />
          ) : (
            <SnippetGrid snippets={recentSnippets} />
          )}
        </TabsContent>
        <TabsContent value="favorite" className="space-y-4">
          {favoriteSnippets.length === 0 ? (
            <EmptyState message="No favorite snippets yet" />
          ) : (
            <SnippetGrid snippets={favoriteSnippets} />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
