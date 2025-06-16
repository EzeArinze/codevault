import { ChevronRight, List } from "lucide-react";

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
import { useCategories } from "@/hooks/service/use-categories";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [category, setCategory] = useQueryState("categoryId", {
    defaultValue: "",
  });

  const { data, isLoading } = useCategories();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Snippets</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuSubButton asChild>
            <Button
              variant={category === "" ? "outline" : "ghost"}
              className={`w-full justify-start gap-2 ${category === "" ? "text-primary" : ""} `}
              onClick={() => setCategory("")}
            >
              <List className="size-4" />
              All Snippets
            </Button>
          </SidebarMenuSubButton>
        </SidebarMenuItem>

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
                  {isLoading ? (
                    <div className="flex flex-col gap-2 p-2">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton className="h-3 w-[50px]" key={i} />
                      ))}
                    </div>
                  ) : (
                    data?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton asChild>
                          <Button
                            variant={
                              category === subItem.id ? "outline" : "ghost"
                            }
                            className={`w-full justify-start 
                             ${category === subItem.id ? "text-primary" : ""}`}
                            onClick={() => setCategory(subItem.id)}
                          >
                            {subItem.name}
                          </Button>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
