"use client";
// import { useState } from "react";

// import Link from "next/link";
import { ModeToggle } from "../../toogle-theme";

import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import {
  Button,
  //  buttonVariants
} from "../../ui/button";
import { StarsIcon } from "lucide-react";
import { DashboardSearchCommand } from "./dashboard-search-cmd";
import { useState } from "react";
import AIGenerateDialog from "@/components/generate-code/generate-code-dialog";

function DashboardHeader() {
  const [openAiGenerate, setOpenAiGenerate] = useState(false);

  return (
    <>
      <header className="flex justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <div>
            <DashboardSearchCommand
            // open={openCommand}
            // setOpen={setOpenCommand}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* <Link href={"/dashboard/generate"} className={buttonVariants()}>
            <StarsIcon className="w-3 h-3" />
            Ai<span className="hidden sm:block">Generate</span>
          </Link> */}
          <Button onClick={() => setOpenAiGenerate((prev) => !prev)}>
            <StarsIcon className="w-3 h-3" />
            Ai<span className="hidden sm:block">Generate</span>
          </Button>
        </div>
      </header>

      <AIGenerateDialog
        onOpenChange={setOpenAiGenerate}
        open={openAiGenerate}
      />
    </>
  );
}

export default DashboardHeader;
