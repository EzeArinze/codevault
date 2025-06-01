import { Snippet } from "@/lib/api";
import { toast } from "sonner";

export const copyToClipboard = (text: string, message: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied!", {
    description: message,
  });
};

export const downloadSnippet = (snippet: Snippet) => {
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

export const deleteSnippet = (snippetId: string) => {
  // This function would typically call an API to delete the snippet
  // For now, we just simulate the deletion with a toast message
  toast.success("Deleted!", {
    description: "Snippet has been deleted successfully." + snippetId,
  });
  // In a real application, you would also update the state to remove the snippet from the UI
};

export const editSnippet = (snippet: Snippet) => {
  // This function would typically open a modal or redirect to an edit page
  // For now, we just simulate the edit action with a toast message
  toast.info("Edit Snippet", {
    description: `You can now edit the snippet titled "${snippet.title}".`,
  });
  // In a real application, you would also handle the logic to open the edit form
};
