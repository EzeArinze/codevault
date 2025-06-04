import Contents from "@/components/docs-page/ui/contents";
import DocsHeader from "@/components/docs-page/ui/header";

function page() {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <Contents />
    </div>
  );
}

export default page;
