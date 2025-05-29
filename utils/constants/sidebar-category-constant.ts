import { BookOpen, SquareTerminal } from "lucide-react";

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
      {
        title: "Api's",
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
        title: "Tutorials",
        url: "#",
      },
    ],
  },
];
