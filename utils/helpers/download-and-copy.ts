import { SnippetType } from "@/actions/service/get-all-snippets";
import { toast } from "sonner";

export const copyToClipboard = (text: string, message: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied!", {
    description: message,
  });
};

export const downloadSnippet = (snippet: SnippetType) => {
  const element = document.createElement("a");
  const file = new Blob([snippet.code], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `${snippet.title.replace(/\s+/g, "-").toLowerCase()}.${
    snippet.language === "typescript" ? "ts" : "js"
  }`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  toast.success("Downloaded!", {
    description: "Snippet has been downloaded successfully.",
  });
};
