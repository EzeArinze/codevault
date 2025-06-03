import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { categoriesTab } from "@/utils/constants/sidebar-category-constant";
import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

// interface CategoriesProp {
//   title: string;
//   url: string;
//   icon?: LucideIcon;
//   isActive?: boolean;
//   items?: {
//     title: string;
//     url: string;
//   }[];
// }

// const Icon = category.icon;

export function NavCategories() {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "All Snippets",
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Snippets</SidebarGroupLabel>
      <SidebarMenu>
        {categoriesTab.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Button
                          variant={
                            category === subItem.title ? "outline" : "ghost"
                          }
                          className={
                            category === subItem.title ? "text-primary" : ""
                          }
                          onClick={() => setCategory(subItem.title)}
                        >
                          {subItem.title}
                        </Button>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
