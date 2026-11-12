"use client";

import { useState, type FormEvent } from "react";

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
      className="flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1.5 pl-5 shadow-lg shadow-stone-900/5 focus-within:border-stone-500"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your trip…"
        aria-label="Message"
        className="min-w-0 flex-1 bg-transparent text-[15px] text-stone-900 outline-none placeholder:text-stone-400"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white transition hover:bg-coral-dark disabled:cursor-not-allowed disabled:bg-stone-300"
        aria-label="Send"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </form>
  );
}
