"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { disabled: boolean; onSend: (text: string) => void };

export function Composer({ disabled, onSend }: Props) {
  const [text, setText] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-[0_10px_30px_-12px_rgb(28_25_23/0.25)] transition focus-within:border-ink/40 focus-within:shadow-[0_12px_34px_-12px_rgb(28_25_23/0.35)]"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your trip…"
        aria-label="Message"
        className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted-foreground/70"
      />
      <Button
        type="submit"
        size="icon-lg"
        disabled={disabled || !text.trim()}
        aria-label="Send"
        className="size-10 rounded-full bg-coral text-white hover:bg-coral-dark disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
      >
        <ArrowUp className="size-5" strokeWidth={2.4} />
      </Button>
    </form>
  );
}
