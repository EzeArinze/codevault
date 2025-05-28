"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

function CreateSnippet() {
  const { state } = useSidebar();

  if (state === "collapsed") {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 mt-2 p-2 items-center w-full">
      <Button className="w-full justify-start gap-2" onClick={() => {}}>
        <PlusCircle className="h-4 w-4" />
        New Snippet
      </Button>

      {/* <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search snippets..."
          className="w-full pl-8"
          value={""}
          onChange={() => {}}
        />
      </div> */}
    </div>
  );
}

export default CreateSnippet;
