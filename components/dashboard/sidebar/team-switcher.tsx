import * as React from "react";
import { ChevronsLeftRight } from "lucide-react";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  if (!teams || teams.length === 0) {
    return null;
  }
  // const Logo = teams[0].logo;

  return (
    <div className="flex items-center gap-2 pt-2">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        {/* <Logo className="h-4 w-4 " /> */}
        <ChevronsLeftRight className=" h-4 w-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{teams[0].name}</span>
        <span className="truncate text-xs">{teams[0].plan}</span>
      </div>
    </div>
  );
}
