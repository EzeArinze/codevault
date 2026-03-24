import {
  generateCodeSnippet
} from "@/actions/generate-ai";
import { GenerateSnippetRequest } from "@/utils/types";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateSnippetRequest;

    if (!body.prompt || body.prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const generatedSnippet = await generateCodeSnippet(body);

    return NextResponse.json(generatedSnippet);
  } catch (error) {
    console.error("Generation API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate snippet",
      },
      { status: 500 }
    );
  }
}
