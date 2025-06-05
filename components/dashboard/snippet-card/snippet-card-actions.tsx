"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Download, Terminal } from "lucide-react";
import {
  copyToClipboard,
  downloadSnippet,
} from "@/utils/helpers/download-and-copy";

import { SnippetType } from "@/actions/service/get-all-snippets";

interface SnippetCardActionsProps {
  snippet: SnippetType;
  onView: () => void;
}

export default function SnippetCardActions({
  snippet,
  onView,
}: SnippetCardActionsProps) {
  return (
    <>
      <Button variant="outline" size="sm" onClick={onView}>
        View Code
      </Button>
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  copyToClipboard(snippet.code, "Code copied to clipboard!")
                }
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy code</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  copyToClipboard(snippet.command, "Install command copied!")
                }
              >
                <Terminal className="h-4 w-4" />
                <span className="sr-only">Copy install command</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy install command</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => downloadSnippet(snippet)}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
