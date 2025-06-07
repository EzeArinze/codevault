"use client";

import { Star, MoreHorizontal, Edit, Trash, Loader2 } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  copyToClipboard,
  downloadSnippet,
} from "@/utils/helpers/download-and-copy";
import { SnippetType } from "@/actions/service/get-all-snippets";
import { toast } from "sonner";
import { useToggleFavorite } from "@/hooks/service/use-toogle-favorite";

interface SnippetCardHeaderProps {
  onView: () => void;
  onDelete: () => void;
  snippet: SnippetType;
}

export default function SnippetCardHeader({
  onView,
  onDelete,
  snippet,
}: SnippetCardHeaderProps) {
  const { mutate, isPending: isToggling } = useToggleFavorite(snippet.id);

  const handleToggleFavorite = () => {
    mutate(snippet.favorite, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (err) => {
        toast.error(err.message || "Failed to toggle favorite");
      },
    });
  };

  const isFavorite = snippet.favorite || false;

  return (
    <div className="flex justify-between items-start">
      <CardTitle className="text-lg font-bold">{snippet.title}</CardTitle>
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleToggleFavorite}
                disabled={isToggling}
              >
                {isToggling ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Star
                    className={`h-4 w-4 ${
                      isFavorite ? "fill-yellow-400 text-yellow-400" : ""
                    }`}
                  />
                )}
                <span className="sr-only">
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                copyToClipboard(snippet.code, "Code copied to clipboard!")
              }
            >
              Copy code
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                copyToClipboard(snippet.command, "Install command copied!")
              }
            >
              Copy install command
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadSnippet(snippet)}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => (window.location.href = `/edit/${snippet.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
