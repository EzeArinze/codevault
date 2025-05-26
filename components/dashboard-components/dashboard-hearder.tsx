"use client";

import { useTheme } from "next-themes";
import { Code, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className=" sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4 w-[80%] mx-auto">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6" />
          <h1 className="text-xl font-bold">CodeVault</h1>
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
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
