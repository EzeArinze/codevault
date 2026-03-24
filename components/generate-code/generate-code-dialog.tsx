"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

import { generateCodeSnippet } from "@/actions/generate-ai";

import { categoryOptions, languageOptions } from "@/utils/constants/code";
import SelectComponent from "../select-component";
import CodeResult from "./code-result";
import { GeneratedSnippet } from "@/utils/types";

interface AIGenerateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSnippetGenerated?: (snippet: GeneratedSnippet) => void;
}

export default function AIGenerateDialog({
  open,
  onOpenChange,
}: AIGenerateDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [category, setCategory] = useState("utils");
  const [generatedSnippet, setGeneratedSnippet] =
    useState<GeneratedSnippet | null>(null);
  const [step, setStep] = useState<"input" | "result">("input");
  const [isGenerating, startTransition] = useTransition()

  const handleGenerateWithTransition = () => {
    startTransition(async () => {
    if (!prompt.trim()) {
      toast.error("Error", {
        description: "Please enter a description of what you want to generate.",
      });
      return;
    }

    try {
      setIsGenerating(true);

      const generatedCode = await generateCodeSnippet({
        prompt: prompt.trim(),
        language,
        category,
      });
      setGeneratedSnippet(generatedCode);
      // setGeneratedSnippet(generated);
      setStep("result");

      toast.success("Code generated!", {
        description: "Your AI-generated snippet is ready.",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Generation failed", {
        description:
          error instanceof Error ? error.message : "Please try again.",
        duration: 5000,
      });
    }
  });
  };

  const handleClose = () => {
    setPrompt("");
    setGeneratedSnippet(null);
    setStep("input");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className=" sm:max-w-4xl max-h-[60vh] overflow-auto flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Snippet Generator
          </DialogTitle>
          <DialogDescription>
            Describe the snippet you want to build and AI will generate the code
            for you.
          </DialogDescription>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-6 flex-1">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">What do you want to build?</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., A React hook for managing form state with validation, A utility function to debounce API calls, A responsive navigation component..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                  disabled={isGenerating}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SelectComponent
                  id="language"
                  placeholder="Select language"
                  label="Language"
                  values={languageOptions}
                  value={language}
                  onValueChange={(value) => setLanguage(value)}
                  className="w-full"
                />

                <SelectComponent
                  id="category"
                  placeholder="Select Category"
                  label="Language"
                  values={categoryOptions}
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerateWithTransition}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Code
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "result" && generatedSnippet && (
          <CodeResult
            generatedSnippet={generatedSnippet}
            handleClose={handleClose}
            onSetStep={setStep}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
