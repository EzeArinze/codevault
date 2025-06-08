"use client";

import type React from "react";
import {
  useState,
  // useTransition
} from "react";
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
import { CreateSnippetDialogProps } from "@/utils/types";

import SelectComponent from "@/components/select-component";
import { initialFormDetails } from "../constant";
import { SnippetSchema } from "@/utils/z-schema/schema";
import { useAddSnippet } from "@/hooks/service/use-create-snippet";

export default function CreateSnippetDialog({
  open,
  onOpenChange,
}: CreateSnippetDialogProps) {
  const [formDetails, setFormDetails] = useState(initialFormDetails);
  const [error, setError] = useState<string | null>(null);
  const { mutate: addSnippet, isPending } = useAddSnippet();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = SnippetSchema.safeParse(formDetails);

    if (!result.success) {
      setError(result.error.issues[0]?.message);
      return;
    }

    addSnippet(formDetails, {
      onSuccess: () => {
        setFormDetails(initialFormDetails);
        onOpenChange?.(false);
      },
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
            {error ? (
              <p className="text-red-400 h-4 font-medium">{error}</p>
            ) : null}
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
