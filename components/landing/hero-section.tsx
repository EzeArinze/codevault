import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroCodeSnippet } from "@/utils/constants/code";

function HeroSection() {
  return (
    <section className="w-full min-h-dvh py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container px-4 md:px-6 w-[89%] md:w-[80%] mx-auto">
        <div className="flex flex-col items-center space-y-8 text-center lg:text-left lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Store, Organize, and Reuse Your Code Snippets
              </h1>
              <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground text-lg md:text-xl">
                CodeVault helps developers save time by making code snippets
                easily accessible and reusable across projects.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
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
          <div className="flex-1 w-full max-w-2xl">
            <div className="mx-auto rounded-xl border bg-background p-2 sm:p-4 shadow-lg">
              <div className="w-full overflow-hidden rounded-lg bg-slate-950 shadow-xl">
                <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-3 sm:px-4 py-2 sm:py-3">
                  <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500" />
                  <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
                  <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500" />
                  <div className="ml-2 text-xs sm:text-sm text-slate-400 truncate">
                    useLocalStorage.ts - CodeVault
                  </div>
                </div>
                <div className="p-3 sm:p-4 text-slate-50 font-mono overflow-x-auto">
                  <pre className="text-xs sm:text-sm leading-relaxed">
                    <code>{HeroCodeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
