"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  language: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between rounded-t-lg border border-b-0 bg-muted px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">
          {language}
        </span>
        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-b-lg border bg-slate-950 p-4 text-sm text-slate-50">
        <code>{code}</code>
      </pre>
    </div>
  );
}
