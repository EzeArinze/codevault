/**
 * API service for interacting with the snippet backend
 */

export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  installCommand: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface SnippetPayload {
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  command: string;
}

export interface CreateSnippetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type createSnipReturnType = {
  status: "SUCCESS" | "ERROR";
  message: string;
};
