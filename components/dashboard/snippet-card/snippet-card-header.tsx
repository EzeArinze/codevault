"use client";

import { useState } from "react";
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

// import { toggleFavoriteSnippet } from "@/app/actions";
import type { Snippet } from "@/lib/api";
import {
  copyToClipboard,
  downloadSnippet,
} from "@/utils/helpers/download-and-copy";

interface SnippetCardHeaderProps {
  title: string;
  isFavorite: boolean;
  onFavoriteChange: (isFavorite: boolean) => void;
  onView: () => void;
  onDelete: () => void;
  snippet: Snippet;
}

export default function SnippetCardHeader({
  title,
  isFavorite,
  onFavoriteChange,
  onView,
  onDelete,
  snippet,
}: SnippetCardHeaderProps) {
  const [isLoading] = useState(false);

  const handleToggleFavorite = async () => {
    try {
      // Simulate API call to toggle favorite status
      // const updatedSnippet = await toggleFavoriteSnippet(snippet.id, !isFavorite);
      // onFavoriteChange(updatedSnippet.isFavorite);
      onFavoriteChange(!isFavorite); // For demo purposes, directly toggle
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div className="flex justify-between items-start">
      <CardTitle className="text-lg font-bold">{title}</CardTitle>
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleToggleFavorite}
                disabled={isLoading}
              >
                {isLoading ? (
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
                copyToClipboard(
                  snippet.installCommand,
                  "Install command copied!"
                )
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
