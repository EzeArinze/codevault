import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CodeBlock from "../ui/code-block";

function Installation() {
  return (
    <section id="installation" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Installation</h2>
        <p className="text-lg text-muted-foreground">
          Install the CodeVault CLI for enhanced productivity.
        </p>
      </div>
      <Tabs defaultValue="npm" className="w-full">
        <TabsList>
          <TabsTrigger value="npm">npm</TabsTrigger>
          <TabsTrigger value="yarn">Yarn</TabsTrigger>
          <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        </TabsList>
        <TabsContent value="npm">
          <CodeBlock language="bash" code="npm install -g @codevault/cli" />
        </TabsContent>
        <TabsContent value="yarn">
          <CodeBlock language="bash" code="yarn global add @codevault/cli" />
        </TabsContent>
        <TabsContent value="pnpm">
          <CodeBlock language="bash" code="pnpm add -g @codevault/cli" />
        </TabsContent>
      </Tabs>
      <div className="rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">
          <strong>Note:</strong> The CLI tool requires Node.js 16 or higher.
          Make sure you have the latest version installed.
        </p>
      </div>
    </section>
  );
}

export default Installation;
