"use client";

import { Copy, Download, Terminal, Folder } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { Snippet } from "@/lib/api";
import { copyToClipboard, downloadSnippet } from "@/utils/snippet-actions";

interface SnippetViewDialogProps {
  snippet: Snippet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SnippetViewDialog({
  snippet,
  open,
  onOpenChange,
}: SnippetViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{snippet.title}</DialogTitle>
          <DialogDescription>{snippet.description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 my-2">
          <Badge variant="outline">{snippet.language}</Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Folder className="h-3 w-3" />
            {snippet.category}
          </Badge>
        </div>
        <ScrollArea className="flex-1 border rounded-md">
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap overflow-auto">
            {snippet.code}
          </pre>
        </ScrollArea>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-1 justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() =>
                copyToClipboard(
                  snippet.installCommand,
                  "Install command copied!"
                )
              }
            >
              <Terminal className="h-4 w-4" />
              Copy Install Command
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => downloadSnippet(snippet)}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          <Button
            onClick={() =>
              copyToClipboard(snippet.code, "Code copied to clipboard!")
            }
            className="flex items-center gap-1"
          >
            <Copy className="h-4 w-4" />
            Copy Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
