import { Loader2 } from "lucide-react";
import React from "react";

function Loading({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
