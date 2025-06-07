"use client";

import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDeleteSnippet } from "@/hooks/service/use-delete-snippet";

interface SnippetDeleteDialogProps {
  id: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SnippetDeleteDialog({
  title,
  open,
  onOpenChange,
  id,
}: SnippetDeleteDialogProps) {
  const { mutate, isPending: isDeleting } = useDeleteSnippet();

  const handleDeleteSnippet = async () => {
    mutate(id, {
      onSuccess: (data) => {
        if (data.status === "SUCCESS") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onError: (err) => {
        toast.error(err.message || "Failed to delete snippet");
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the snippet {title}. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteSnippet}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
