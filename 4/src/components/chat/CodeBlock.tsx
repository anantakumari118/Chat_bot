import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const copyCode = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="group my-4 overflow-hidden rounded-xl border border-slate-700/40 bg-slate-900 shadow-subtle">
      <div className="flex items-center justify-between border-b border-slate-700/50 bg-slate-800/80 px-3 py-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {language ?? "Code"}
        </span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-slate-700/70 hover:text-slate-100 active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
