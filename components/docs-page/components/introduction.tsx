function Introduction() {
  return (
    <section id="introduction" className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          CodeVault Documentation
        </h1>
        <p className="text-xl text-muted-foreground">
          Complete guide to managing your code snippets efficiently with
          CodeVault.
        </p>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>
          CodeVault is a powerful code snippet manager that helps developers
          save, organize, and reuse code efficiently. Whether you`&apos;`re
          working on personal projects or collaborating with a team, CodeVault
          provides the tools you need to manage your code snippets effectively.
        </p>
        <h3>Key Features</h3>
        <ul>
          <li>🗂️ Organize snippets by categories and tags</li>
          <li>📋 One-click copy to clipboard</li>
          <li>⬇️ Download snippets as files</li>
          <li>⚡ CLI integration for instant project setup</li>
          <li>🎨 Syntax highlighting for multiple languages</li>
          <li>👥 Team collaboration and sharing</li>
        </ul>
      </div>
    </section>
  );
}

export default Introduction;
