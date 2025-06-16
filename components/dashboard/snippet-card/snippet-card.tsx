"use client";

import { memo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder } from "lucide-react";

import SnippetCardHeader from "./snippet-card-header";
import SnippetCodePreview from "./snippet-code-preview";
import SnippetCardActions from "./snippet-card-actions";
import SnippetViewDialog from "./snippet-view-dialog";
import SnippetDeleteDialog from "./snippet-delete-dialog";
import { SnippetObjectType } from "@/utils/types";
import EditSnippetForm from "../components/edit-snippet-form";
// import { useDialogStore } from "@/store/use-dialog-store";

const MemoSnippetCardHeader = memo(SnippetCardHeader);
const MemoSnippetCodePreview = memo(SnippetCodePreview);
const MemoSnippetCardActions = memo(SnippetCardActions);

interface SnippetCardProps {
  snippet: SnippetObjectType;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden h-[30%]">
        <CardHeader className="pb-3">
          <MemoSnippetCardHeader
            onView={() => setIsViewOpen(true)}
            onDelete={() => setIsDeleteDialogOpen(true)}
            onEdit={() => setIsEditDialogOpen(true)}
            snippet={snippet}
          />
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {snippet.language}
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs flex items-center gap-1 "
            >
              <Folder className="h-3 w-3" />
              {snippet.category?.name}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {snippet.description}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <MemoSnippetCodePreview code={snippet.code} />
        </CardContent>
        <CardFooter className="flex justify-between pt-1">
          <MemoSnippetCardActions
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

      <EditSnippetForm
        snippet={snippet}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <SnippetDeleteDialog
        title={snippet.title}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        id={snippet.id}
      />
    </>
  );
}
