"use client";

import Link from "next/link";
import { ModeToggle } from "../toogle-theme";

import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Button, buttonVariants } from "../ui/button";
import { Search, StarsIcon } from "lucide-react";
import { useState } from "react";
import { DashboardSearchCommand } from "./dashboard-search-cmd";

function DashboardHeader() {
  const [openCommand, setOpenCommand] = useState(false);

  return (
    <>
      <DashboardSearchCommand open={openCommand} setOpen={setOpenCommand} />
      <header className="flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <div>
            <Button
              className="w-full justify-start gap-2 font-normal text-muted-foreground hover:text-muted-foreground"
              variant="outline"
              size={"sm"}
              onClick={() => setOpenCommand((open) => !open)}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              Search
              <kbd className="ml-auto flex items-center gap-1 rounded border bg-muted px-1.5 text-xs font-normal text-muted-foreground">
                <span className="text-sm">&#8984;k</span>
              </kbd>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href={"#"} className={buttonVariants()}>
            <StarsIcon className="w-3 h-3" />
            Ai<span className="hidden sm:block">Generate</span>
          </Link>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
