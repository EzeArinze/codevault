"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import CreateSnippetDialog from "../dashboard-components/create-snippet-dialog";
import { useState } from "react";

function CreateSnippet() {
  const { state } = useSidebar();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  if (state === "collapsed") {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-2 p-2 items-center w-full">
        <h2 className="text-sm font-base text-muted-foreground">
          Create Snippet
        </h2>
        <Button
          className="w-full justify-start gap-2"
          onClick={() => setOpenCreateDialog((open) => !open)}
        >
          <PlusCircle className="h-4 w-4" />
          New Snippet
        </Button>
      </div>
      <CreateSnippetDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
    </>
  );
}

export default CreateSnippet;
