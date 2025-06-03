"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder } from "lucide-react";

import type { Snippet } from "@/utils/types";
import SnippetCardHeader from "./snippet-card-header";
import SnippetCodePreview from "./snippet-code-preview";
import SnippetCardActions from "./snippet-card-actions";
import SnippetViewDialog from "./snippet-view-dialog";
import SnippetDeleteDialog from "./snippet-delete-dialog";

interface SnippetCardProps {
  snippet: Snippet;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(snippet.isFavorite || false);

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <SnippetCardHeader
            title={snippet.title}
            isFavorite={isFavorite}
            onFavoriteChange={setIsFavorite}
            onView={() => setIsViewOpen(true)}
            onDelete={() => setIsDeleteDialogOpen(true)}
            snippet={snippet}
          />
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {snippet.language}
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs flex items-center gap-1"
            >
              <Folder className="h-3 w-3" />
              {snippet.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {snippet.description}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <SnippetCodePreview code={snippet.code} />
        </CardContent>
        <CardFooter className="flex justify-between pt-3">
          <SnippetCardActions
            snippet={snippet}
            onView={() => setIsViewOpen(true)}
          />
        </CardFooter>
      </Card>

      <SnippetViewDialog
        snippet={snippet}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />

      <SnippetDeleteDialog
        snippet={snippet}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
