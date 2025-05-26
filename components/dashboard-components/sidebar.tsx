"use client";

import {
  PlusCircle,
  Search,
  FolderGit2,
  Package,
  FileCode2,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onCreateSnippet: () => void;
}

const categories = [
  { id: "all", label: "All Snippets", icon: FolderGit2 },
  { id: "hooks", label: "Hooks", icon: Package },
  { id: "utils", label: "Utils", icon: FileCode2 },
  { id: "components", label: "Components", icon: Code },
  { id: "services", label: "Services", icon: Package },
];

export default function DashboardSidebar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  onCreateSnippet,
}: DashboardSidebarProps) {
  return (
    <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
      <div className="h-full py-6 pr-6 lg:py-8">
        <div className="flex flex-col gap-4">
          <Button
            className="w-full justify-start gap-2"
            onClick={onCreateSnippet}
          >
            <PlusCircle className="h-4 w-4" />
            New Snippet
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search snippets..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "secondary" : "ghost"
                  }
                  className="w-full justify-start gap-2"
                  onClick={() => onCategoryChange(category.id)}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
