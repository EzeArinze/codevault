import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCodeSnippet } from "@/utils/code";

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Store, Organize, and Reuse Your Code Snippets
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                CodeVault helps developers save time by making code snippets
                easily accessible and reusable across projects.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">See Demo</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center rounded-xl border bg-background p-4 shadow-lg">
            <div className="w-full overflow-hidden rounded-lg bg-slate-950 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div className="ml-2 text-sm text-slate-400">
                  useLocalStorage.ts - CodeVault
                </div>
              </div>
              <div className="p-4 text-sm text-slate-50 font-mono">
                <pre className="text-xs md:text-sm">
                  <code>{HeroCodeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
