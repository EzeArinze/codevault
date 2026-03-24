import type React from "react";

import DocsSidebar from "./sidebar";
import DocsHeader from "./header";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <DocsHeader />

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] md:gap-6 lg:gap-10 py-6 w-full px-4 md:px-6 mx-auto">
        {/* Sidebar */}
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-3 pr-6 lg:py-8 overflow-auto">
            <DocsSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col">{children}</main>
      </div>
    </div>
  );
}
