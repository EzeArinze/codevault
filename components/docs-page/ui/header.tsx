import { Code } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";

function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between w-[80%] mx-auto">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CodeVault</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:text-primary hidden md:inline-flex"
          >
            Log in
          </Link>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default DocsHeader;
