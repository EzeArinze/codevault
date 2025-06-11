"use client";

import CreateSnippet from "./create-snippet";

import {
  // AudioWaveform,
  GalleryVerticalEnd,
} from "lucide-react";

import { NavCategories } from "@/components/dashboard/sidebar/nav-main";
import { NavTemplate } from "@/components/dashboard/sidebar/nav-templates";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import { useIsClient } from "@/hooks/use-is-client";

const teams = [
  {
    name: "Code Vault",
    logo: GalleryVerticalEnd,
    plan: "Enjoying",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const client = useIsClient();

  if (!client) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      {/* Body/Content */}
      <SidebarContent>
        <CreateSnippet />
        <Suspense>
          <NavCategories />
        </Suspense>
        <NavTemplate />
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
