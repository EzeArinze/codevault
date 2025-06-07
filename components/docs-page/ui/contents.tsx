"use client";

import Introduction from "../components/introduction";
import QuickStart from "../components/quick-start";
import Installation from "../components/installation";
import CreatingSnippet from "../components/creating-snippet";
import OrganizingSnippet from "../components/organizing-snippet";
import Integration from "../components/integration";
import SharingExporting from "../components/sharing-exporting";

export default function DocsContent() {
  return (
    <div className="max-w-4xl space-y-12 ">
      {/* Introduction */}
      <Introduction />

      {/* Quick Start */}
      <QuickStart />

      {/* Installation */}
      <Installation />

      {/* Creating Snippets */}
      <CreatingSnippet />

      {/* Organizing Snippets */}
      <OrganizingSnippet />

      {/* CLI Integration */}
      <Integration />
      {/* Sharing & Export */}
      <SharingExporting />
    </div>
  );
}
