import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Copy, Save } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { toast } from "sonner";

import { GeneratedSnippet } from "@/actions/generate-ai";
import { Dispatch, SetStateAction } from "react";
import { useAddSnippet } from "@/hooks/service/use-create-snippet";

interface CodeResultProps {
  onSetStep: Dispatch<SetStateAction<"input" | "result">>;
  // handleSave: () => void;
  handleClose: () => void;
  generatedSnippet: GeneratedSnippet;
}

function CodeResult({
  onSetStep,
  handleClose,
  // handleSave,
  generatedSnippet,
}: CodeResultProps) {
  const { mutate: addSnippet, isPending: isCreating } = useAddSnippet();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!", {
      description: "Code copied to clipboard.",
    });
  };

  const handleSave = async () => {
    if (generatedSnippet) {
      addSnippet(generatedSnippet, {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error("Request failed:", error);
        },
      });
      console.log(generatedSnippet);
    }
  };

  function setStep(step: "input" | "result") {
    onSetStep?.(step);
  }

  return (
    <>
      <div className="space-y-4 flex-1 overflow-auto">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {generatedSnippet.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {generatedSnippet.description}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{generatedSnippet.language}</Badge>
                <Badge variant="secondary">{generatedSnippet.category}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Generated Code</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generatedSnippet.code)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <ScrollArea className="h-[300px] w-full rounded-md border">
                <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
                  {generatedSnippet.code}
                </pre>
              </ScrollArea>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Install Command</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={generatedSnippet.command}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generatedSnippet.command)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep("input")}>
            Generate Another
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isCreating}>
              <Save className="mr-2 h-4 w-4" />
              {isCreating ? "Saving..." : "Save Snippet"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeResult;
