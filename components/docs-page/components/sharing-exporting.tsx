import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import React from "react";

function SharingExporting() {
  return (
    <section id="sharing-export" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sharing & Export</h2>
        <p className="text-lg text-muted-foreground">
          Share snippets with your team or export for backup.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Copy className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Copy code to clipboard</li>
              <li>• Copy install command</li>
              <li>• Download as file</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default SharingExporting;
