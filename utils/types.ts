/**
 * API service for interacting with the snippet backend
 */

export type CategoryArrayType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}[];

export type CategoryType = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
} | null;

export type SnippetArrayType = {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  title: string;
  language: string;
  description: string;
  category_id: string | null;
  code: string;
  command: string;
  favorite: boolean;
  category: CategoryType;
}[];

export type SnippetObjectType = SnippetArrayType[0];

export interface SnippetPayload {
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  command: string;
}

export interface SnippetEditPayload {
  id: string;
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

export interface GenerateSnippetRequest {
  prompt: string;
  language?: string;
  category?: string;
}

export interface GeneratedSnippet {
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  command: string;
}
