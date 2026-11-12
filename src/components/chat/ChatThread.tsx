"use client";

import { useEffect, useRef, useState } from "react";
import { Composer } from "@/components/chat/Composer";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ThinkingBubble } from "@/components/chat/ThinkingBubble";
import { PLAN_INTRO, SUGGESTED_PROMPT, WELCOME_MESSAGE, type ChatMessage } from "@/components/chat/messages";
import { requestTripPlan } from "@/lib/trip-planner";

export function ChatThread() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  async function send(text: string) {
    const id = crypto.randomUUID();
    setMessages((m) => [...m, { id, role: "user", text }]);
    setThinking(true);
    // Happy path only. The error bubble and "Try again" will wrap this call.
    const cards = await requestTripPlan(text);
    setThinking(false);
    setMessages((m) => [...m, { id: `${id}-plan`, role: "assistant", text: PLAN_INTRO, cards }]);
  }

  const showSuggestion = messages.length === 1 && !thinking;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl space-y-5 px-4 pt-6 pb-40" aria-live="polite">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {thinking && <ThinkingBubble />}
          {showSuggestion && (
            <div className="pl-11">
              <button
                type="button"
                onClick={() => send(SUGGESTED_PROMPT)}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-left text-sm text-stone-700 shadow-sm transition hover:border-stone-500 hover:bg-stone-50"
              >
                “{SUGGESTED_PROMPT}”
              </button>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-stone-100 via-stone-100/95 to-transparent pt-8 pb-5">
        <div className="mx-auto w-full max-w-2xl px-4">
          <Composer disabled={thinking} onSend={send} />
          <p className="mt-2 text-center text-xs text-stone-500">
            Prototype. Any message returns the same Kyoto weekend plan.
          </p>
        </div>
      </div>
    </div>
  );
}
