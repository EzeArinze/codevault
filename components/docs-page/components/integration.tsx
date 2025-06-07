import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CodeBlock from "../ui/code-block";

function Integration() {
  return (
    <section id="cli-integration" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">CLI Integration</h2>
        <p className="text-lg text-muted-foreground">
          Use the command line to install snippets directly into your projects.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Basic Usage</h3>
        <CodeBlock
          language="bash"
          code="# Install a snippet by ID
codevault install <snippet-id>

# Install to a specific directory
codevault install <snippet-id> --dir src/hooks

# List all your snippets
codevault list

# Search for snippets
codevault search 'localStorage'"
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Authentication</h3>
        <CodeBlock
          language="bash"
          code="# Login to your account
codevault login

# Check authentication status
codevault whoami"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pro Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The CLI automatically creates the necessary directory structure when
            installing snippets. For example, installing a hook will create a{" "}
            <code>hooks/</code> directory if it doesn`&apos;`t exist.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default Integration;
