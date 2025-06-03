import Contents from "@/components/docs/ui/contents";
import DocsHeader from "@/components/docs/ui/header";

function page() {
  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader />
      <Contents />
    </div>
  );
}

export default page;
