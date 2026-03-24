"use client";

import { ArrowLeft, Code, Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { useTheme } from "next-themes";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DocsSidebar from "./sidebar";

function DocsHeader() {
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between w-full px-4 md:px-6 mx-auto">
        <div className="flex items-center gap-4">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-80">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">CodeVault Docs</span>
                </div>
              </div>
              <DocsSidebar onLinkClick={() => setIsSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to App</span>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CodeVault Docs</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default DocsHeader;
