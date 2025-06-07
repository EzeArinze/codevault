import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Code, Zap } from "lucide-react";

function OrganizingSnippet() {
  return (
    <section id="organizing-snippets" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Organizing Snippets
        </h2>
        <p className="text-lg text-muted-foreground">
          Keep your snippets organized with categories and favorites.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Hooks</Badge>
              <Badge variant="secondary">Utils</Badge>
              <Badge variant="secondary">Components</Badge>
              <Badge variant="secondary">Services</Badge>
              <Badge variant="secondary">Config</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Organize your snippets by type to find them quickly when you need
              them.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use the search bar to find snippets by title, description, or
              category. Filter by favorites to access your most-used snippets
              quickly.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default OrganizingSnippet;
