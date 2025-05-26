"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Snippet } from "@/lib/api";

import { Loader2 } from "lucide-react";

interface CreateSnippetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSnippetCreated: (newSnippet: Snippet) => void;
}

export default function CreateSnippetDialog({
  open,
  onOpenChange,
  onSnippetCreated,
}: // onSnippetCreated,
CreateSnippetDialogProps) {
  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    code: "",
    language: "typescript",
    category: "utils",
    installCommand: "",
  });

  const [isSubmitting] = useState(false);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSnippetCreated({
      ...formDetails,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setFormDetails({
      title: "",
      description: "",
      code: "",
      language: "typescript",
      category: "utils",
      installCommand: "",
    });
  };

  const generateInstallCommand = () => {
    if (!formDetails.title || !formDetails.category) return;

    const fileName = formDetails.title.toLowerCase().replace(/\s+/g, "-");
    const extension = formDetails.language === "typescript" ? "ts" : "js";
    const command = `npx create-file ${formDetails.category}/${fileName}.${extension}`;

    setFormDetails((prev) => ({ ...prev, installCommand: command }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Snippet</DialogTitle>
            <DialogDescription>
              Add a new code snippet to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="useLocalStorage Hook"
                  value={formDetails.title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formDetails.language}
                  onValueChange={(value) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      language: value ?? "typescript",
                    }))
                  }
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="jsx">JSX</SelectItem>
                    <SelectItem value="tsx">TSX</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="A brief description of what this snippet does"
                value={formDetails.description}
                onChange={onChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formDetails.category}
                onValueChange={(value) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hooks">Hooks</SelectItem>
                  <SelectItem value="utils">Utils</SelectItem>
                  <SelectItem value="components">Components</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="config">Config</SelectItem>
                  <SelectItem value="styles">Styles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                name="code"
                placeholder="Paste your code here..."
                className="font-mono h-40"
                value={formDetails.code}
                onChange={onChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="installCommand">Install Command</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateInstallCommand}
                >
                  Generate
                </Button>
              </div>
              <Input
                id="installCommand"
                name="installCommand"
                placeholder="npx create-file utils/my-util.ts"
                value={formDetails.installCommand}
                onChange={onChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Snippet"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
