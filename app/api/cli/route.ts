import { db } from "@/db";
import { type NextRequest, NextResponse } from "next/server";
// import your db and snippet table here

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Snippet ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the snippet from your database
    const snippet = await db.query.snippetsTable.findFirst({
      where: (snippets, { eq }) => eq(snippets.id, id),
      with: { category: true },
    });

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    const fileName = `${snippet.category?.name}/${snippet.title.toLowerCase().replace(/\s+/g, "-")}.${snippet.language === "typescript" ? "ts" : "js"}`;

    const script = `#!/bin/bash
# CodeVault Snippet Installer
# Snippet: ${snippet.title}
# Description: ${snippet.description}

echo "Installing snippet: ${snippet.title}"
echo "Description: ${snippet.description}"

# Create directory if it doesn't exist
mkdir -p $(dirname "${fileName}")

# Create the file with the snippet content
cat > "${fileName}" << 'EOL'
${snippet.code}
EOL

echo "Snippet installed successfully at ${fileName}"
`;

    return new NextResponse(script, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="install-${snippet.title.toLowerCase().replace(/\s+/g, "-")}.sh"`,
      },
    });
  } catch (error) {
    console.error("Error generating CLI script:", error);
    return NextResponse.json(
      { error: "Failed to generate CLI script" },
      { status: 500 }
    );
  }
}
