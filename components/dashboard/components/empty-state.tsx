import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

const EmptyState = ({
  message,
  showButton = false,
  onCreateSnippet,
}: {
  message: string;
  showButton?: boolean;
  onCreateSnippet: () => void;
}) => (
  <div className="text-center py-12">
    <p className="text-muted-foreground mb-4">{message}</p>
    {showButton && (
      <Button onClick={onCreateSnippet}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create your first snippet
      </Button>
    )}
  </div>
);

export default React.memo(EmptyState);
