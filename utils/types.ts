/**
 * API service for interacting with the snippet backend
 */
export interface AllSnippets {
  favorite: boolean;
  code: string;
  title: string;
  id: string;
  description: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  category_id: string | null;
  command: string;
}

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
