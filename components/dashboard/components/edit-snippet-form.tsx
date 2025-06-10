"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import type { SnippetObjectType } from "@/utils/types";
import SelectComponent from "@/components/select-component";
import { categoryOptions, languageOptions } from "@/utils/constants/code";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditSnippetFormProps {
  snippet: SnippetObjectType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditSnippetForm({
  snippet,
  open,
  onOpenChange,
}: EditSnippetFormProps) {
  const [title, setTitle] = useState(snippet.title);
  const [description, setDescription] = useState(snippet.description);
  const [code, setCode] = useState(snippet.code);
  const [language, setLanguage] = useState(snippet.language);
  const [category, setCategory] = useState(snippet.category?.name);
  const [installCommand, setInstallCommand] = useState(snippet.command);

  const isSubmitting = false; // will be removed once i put in

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[70%] overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Update Snippet</DialogTitle>
            <DialogDescription>Edit code snippet.</DialogDescription>
          </DialogHeader>
          {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
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
            <SelectComponent
              id="language"
              placeholder="Select language"
              label="Language"
              values={languageOptions}
              value={language}
              onValueChange={(value) => setLanguage(value)}
            />
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
          <SelectComponent
            id="category"
            placeholder="Select category"
            label="Category"
            values={categoryOptions}
            value={category}
            onValueChange={(value) => setCategory(value)}
            disabled
          />
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
              onClick={() => onOpenChange?.(false)}
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
      </DialogContent>
    </Dialog>
  );
}
