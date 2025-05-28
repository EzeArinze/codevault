"use client";

import * as React from "react";
import CreateSnippet from "./create-snippet";

import {
  // AudioWaveform,
  GalleryVerticalEnd,
} from "lucide-react";

import { NavCategories } from "@/components/dashboard-sidebar/nav-main";
import { NavTemplate } from "@/components/dashboard-sidebar/nav-templates";
import { NavUser } from "@/components/dashboard-sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard-sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const teams = [
  {
    name: "Code Vault",
    logo: GalleryVerticalEnd,
    plan: "Enjoying",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      {/* Body/Content */}
      <SidebarContent>
        <CreateSnippet />
        <NavCategories />
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
