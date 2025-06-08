"use client";

import { Frame, PieChart } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const templates = [
  {
    name: "Next Js Starter",
    url: "https://vercel.com/templates",
    icon: Frame,
  },
  {
    name: "React Starter",
    url: "https://vercel.com/templates?framework=react",
    icon: PieChart,
  },
];

export function NavTemplate() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Templates</SidebarGroupLabel>
      <SidebarMenu>
        {templates.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            {/* */}
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
