import {
  Code,
  Copy,
  Download,
  FileCode2,
  FolderGit2,
  Package,
} from "lucide-react";

export const features = [
  {
    icon: FolderGit2,
    title: "Organize",
    description:
      "Categorize and tag your snippets for easy organization and retrieval.",
  },
  {
    icon: Copy,
    title: "Copy & Paste",
    description: "Quickly copy snippets to your clipboard with a single click.",
  },
  {
    icon: Download,
    title: "Download",
    description:
      "Download snippets as files or use CLI commands to create them in your project.",
  },
  {
    icon: FileCode2,
    title: "Syntax Highlighting",
    description:
      "View your code with beautiful syntax highlighting for better readability.",
  },
  {
    icon: Package,
    title: "CLI Integration",
    description:
      "Install snippets directly from your terminal with our CLI tool.",
  },
  {
    icon: Code,
    title: "Multiple Languages",
    description:
      "Support for all popular programming languages and frameworks.",
  },
];

export const how_it_works = [
  {
    id: 1,
    title: "Save",
    description:
      "Create and save your code snippets with descriptions and categories.",
  },
  {
    id: 2,
    title: "Organize",
    description:
      " Categorize and tag your snippets for easy retrieval when you need them",
  },
  {
    id: 3,
    title: "Reuse",
    description:
      "Copy, download, or use CLI commands to reuse your snippets in any project",
  },
];

export const pricing = [
  {
    plan: "Free",
    price: "$0/month",
    price_description: "Perfect for getting started",
    features: ["Up to 50 snippets", "Basic categories", "Copy & download"],
    popular: false,
    start_with: "Get Started",
  },
  {
    plan: "Pro",
    price: "$9/month",
    price_description: "",
    features: [
      "Unlimited snippets",
      "Advanced categories & tags",
      "CLI integration",
      "Syntax highlighting",
    ],
    popular: true,
    start_with: "Upgrade Now",
  },
  // {
  //   plan: "Team",
  //   price: "$29/month",
  //   price_description: "",
  //   features: [
  //     "Everything in Pro",
  //     "Team collaboration features",
  //     "Priority support",
  //   ],
  //   popular: false,
  //   start_with: "Contact Sales",
  // },
];

export const testimonials = [
  {
    name: "John Smith",
    role: "Frontend Developer",
    testimonial:
      "CodeVault has saved me countless hours. I no longer have to search through old projects to find code I've written before.",
    initials: "JS",
  },
  {
    name: "Sarah Davis",
    role: "Full Stack Developer",
    testimonial:
      "The CLI integration is a game-changer. I can instantly add my favorite hooks and utilities to any project.",
    initials: "SD",
  },
  {
    name: "Michael Brown",
    role: "Backend Engineer",
    testimonial:
      "Our team uses CodeVault to share best practices and maintain consistency across projects. It's been invaluable.",
    initials: "MB",
  },
];

export const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
];
