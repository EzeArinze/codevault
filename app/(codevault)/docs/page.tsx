import DocsContent from "@/components/docs-page/ui/contents";
import DocsLayout from "@/components/docs-page/ui/docs-layout";

export const metadata = {
  title: "Documentation - CodeVault",
  description:
    "Complete guide to using CodeVault for managing your code snippets",
};

export default function DocsPage() {
  return (
    <DocsLayout>
      <DocsContent />
    </DocsLayout>
  );
}
