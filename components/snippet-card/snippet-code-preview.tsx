interface SnippetCodePreviewProps {
  code: string;
}

export default function SnippetCodePreview({ code }: SnippetCodePreviewProps) {
  return (
    <div className="bg-slate-950 text-slate-50 p-3 text-xs font-mono overflow-hidden">
      <pre className="line-clamp-3">
        {code.split("\n").slice(0, 3).join("\n")}
      </pre>
    </div>
  );
}
