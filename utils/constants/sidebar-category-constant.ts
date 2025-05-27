import { BookOpen, Settings2, SquareTerminal } from "lucide-react";

export const categoriesTab = [
  {
    title: "Categories",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "All Snippets",
        url: "#",
      },
      {
        title: "Hooks",
        url: "#",
      },
      {
        title: "Utils",
        url: "#",
      },
      {
        title: "Components",
        url: "#",
      },
      {
        title: "Services",
        url: "#",
      },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];
