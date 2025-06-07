"use client";
// import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Rocket,
  Code,
  Terminal,
  FileText,
  Download,
  Share,
} from "lucide-react";

interface DocsSidebarProps {
  onLinkClick?: () => void;
}

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "#introduction", icon: BookOpen },
      { title: "Quick Start", href: "#quick-start", icon: Rocket },
      { title: "Installation", href: "#installation", icon: Download },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Creating Snippets", href: "#creating-snippets", icon: Code },
      {
        title: "Organizing Snippets",
        href: "#organizing-snippets",
        icon: FileText,
      },
      { title: "CLI Integration", href: "#cli-integration", icon: Terminal },
      { title: "Sharing & Export", href: "#sharing-export", icon: Share },
    ],
  },
];

export default function DocsSidebar({ onLinkClick }: DocsSidebarProps) {
  // const pathname = usePathname()

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onLinkClick?.();
  };

  return (
    <nav className="space-y-6">
      {navigation.map((section) => (
        <div key={section.title}>
          <h4 className="mb-2 px-2 text-sm font-semibold tracking-tight">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
