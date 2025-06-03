"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import type { SnippetPayload } from "@/utils/types";

interface EditSnippetFormProps {
  snippet: SnippetPayload;
}

export default function EditSnippetForm({ snippet }: EditSnippetFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(snippet.title);
  const [description, setDescription] = useState(snippet.description);
  const [code, setCode] = useState(snippet.code);
  const [language, setLanguage] = useState(snippet.language);
  const [category, setCategory] = useState(snippet.category);
  const [installCommand, setInstallCommand] = useState(snippet.command);
  const [isSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const generateInstallCommand = () => {
    if (!title || !category) return;

    const fileName = title.toLowerCase().replace(/\s+/g, "-");
    const extension = language === "typescript" ? "ts" : "js";
    const command = `npx create-file ${category}/${fileName}.${extension}`;

    setInstallCommand(command);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="useLocalStorage Hook"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
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
              placeholder="A brief description of what this snippet does"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
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
              placeholder="Paste your code here..."
              className="font-mono h-60"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
              placeholder="npx create-file utils/my-util.ts"
              value={installCommand}
              onChange={(e) => setInstallCommand(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Snippet"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
