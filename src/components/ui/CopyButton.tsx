"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      data-cursor-hover
      aria-label="Copy to clipboard"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-all hover:border-foreground/30 hover:text-foreground",
        copied && "border-accent/40 text-accent",
        className
      )}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
