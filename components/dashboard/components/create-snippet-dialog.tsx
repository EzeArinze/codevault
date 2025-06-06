"use client";

import type React from "react";
import { useState, useTransition } from "react";
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
import { Loader2 } from "lucide-react";
import { categoryOptions, languageOptions } from "@/utils/constants/code";
import { generateInstallCommand } from "@/utils/helpers/generate-install-command";
import { createSnippetWithCategory } from "@/actions/create-snippet";
import { toast } from "sonner";
import { CreateSnippetDialogProps } from "@/utils/types";

import SelectComponent from "@/components/select-component";
import { initialFormDetails } from "../constant";

export default function CreateSnippetDialog({
  open,
  onOpenChange,
}: CreateSnippetDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [formDetails, setFormDetails] = useState(initialFormDetails);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const data = await createSnippetWithCategory({
          ...formDetails,
        });

        if (data.status === "SUCCESS") {
          toast.success(data.status, {
            description: data.message,
            position: "top-center",
          });
          setFormDetails(initialFormDetails);
        } else {
          toast.error(data.message, {
            position: "top-center",
            duration: 10000,
          });
        }
      } catch {
        toast.error("Error", {
          description: "Something went wrong",
          position: "top-center",
        });
      } finally {
        onOpenChange?.(false);
      }
    });
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
                  placeholder="eg. useLocalStorage Hook"
                  value={formDetails.title}
                  onChange={onChange}
                  required
                />
              </div>
              <SelectComponent
                id="language"
                placeholder="Select language"
                label="Language"
                values={languageOptions}
                value={formDetails.language}
                onValueChange={(value) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    language: value ?? "typescript",
                  }))
                }
              />
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
            <SelectComponent
              id="category"
              placeholder="Select category"
              label="Category"
              values={categoryOptions}
              value={formDetails.category}
              onValueChange={(value) =>
                setFormDetails((prev) => ({
                  ...prev,
                  category: value ?? "typescript",
                }))
              }
            />
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                name="code"
                placeholder="Paste your code here..."
                className="font-mono h-32"
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
                  onClick={() =>
                    generateInstallCommand(formDetails, setFormDetails)
                  }
                >
                  Generate
                </Button>
              </div>
              <Input
                id="installCommand"
                name="installCommand"
                placeholder="npx add utils/my-util.ts"
                value={formDetails.command}
                onChange={onChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
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
