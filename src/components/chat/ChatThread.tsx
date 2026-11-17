"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Info } from "lucide-react";
import { PlanProvider } from "@/components/cards/plan-context";
import { Composer } from "@/components/chat/Composer";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { PlanBar } from "@/components/chat/PlanBar";
import { ThinkingBubble } from "@/components/chat/ThinkingBubble";
import {
  ERROR_MESSAGE,
  SUGGESTED_PROMPTS,
  WELCOME_MESSAGE,
  type ChatMessage,
} from "@/components/chat/messages";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";
import { track } from "@/lib/track";
import { pickTripPlan, type TripPlan } from "@/data/trip-plans";
import { requestTripPlan } from "@/lib/trip-planner";

const noSubscription = () => () => {};
const isModeratorUrl = () => new URLSearchParams(window.location.search).has("moderator");

/** Marks every open error bubble as dealt with, so only the latest error offers buttons. */
const resolveErrors = (messages: ChatMessage[]) =>
  messages.map((m) =>
    m.role === "assistant" && m.error && !m.error.resolved ? { ...m, error: { ...m.error, resolved: true } } : m,
  );

export function ChatThread() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [thinking, setThinking] = useState(false);
  /** Card order of the reply on its way, so the loading outlines match the cards that replace them. */
  const [pendingOrder, setPendingOrder] = useState<TripPlan["order"]>(["stay", "experience", "food"]);
  /** One-shot: the next request fails, then this turns itself off. */
  const [failNext, setFailNext] = useState(false);
  /** The moderator control only exists when the address has `?moderator`. */
  const isModerator = useSyncExternalStore(noSubscription, isModeratorUrl, () => false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  /** Asks for the plan and appends either the cards or the error bubble. History is never removed. */
  async function request(prompt: string, { isRetry }: { isRetry: boolean }) {
    const id = crypto.randomUUID();
    const fail = failNext;
    if (fail) {
      setFailNext(false);
      track("failure_injected");
    }
    setPendingOrder(pickTripPlan(prompt).order);
    setThinking(true);
    try {
      const { intro, cards } = await requestTripPlan(prompt, { fail });
      setMessages((m) => [...m, { id, role: "assistant", text: intro, cards }]);
      if (isRetry) track("retry_success");
    } catch {
      setMessages((m) => [
        ...m,
        { id, role: "assistant", text: ERROR_MESSAGE, error: { prompt, resolved: false } },
      ]);
    } finally {
      setThinking(false);
    }
  }

  function send(text: string) {
    if (thinking) return;
    setMessages((m) => [...resolveErrors(m), { id: crypto.randomUUID(), role: "user", text }]);
    void request(text, { isRetry: false });
  }

  /** Sends the same prompt again. The original message and the error bubble stay in the thread. */
  function retry(prompt: string) {
    if (thinking) return;
    setMessages(resolveErrors);
    void request(prompt, { isRetry: true });
  }

  const showSuggestion = messages.length === 1 && !thinking;

  return (
    <PlanProvider>
    <div className="relative z-10 flex min-h-0 flex-1 flex-col">
      {isModerator && (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                size="sm"
                variant={failNext ? "default" : "outline"}
                aria-pressed={failNext}
                onClick={() => setFailNext((armed) => !armed)}
                data-moderator-control
                // On a phone the centred title and badge reach the right edge, so the
                // control sits just under the header there instead of beside it.
                className="fixed top-[4.5rem] right-3 z-30 rounded-full px-3 shadow-sm md:top-3"
              />
            }
          >
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${failNext ? "bg-coral" : "bg-muted-foreground/50"}`}
            />
            {failNext ? "Next reply will fail" : "Fail next reply"}
          </TooltipTrigger>
          <TooltipPopup side="bottom" align="end" className="max-w-56">
            Moderator only. The next reply fails once, then this switches itself off.
          </TooltipPopup>
        </Tooltip>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl space-y-6 px-4 pt-5 pb-56" aria-live="polite">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} onRetry={retry} />
          ))}
          {thinking && <ThinkingBubble order={pendingOrder} />}
          {showSuggestion && (
            <div className="animate-rise pl-[52px] [animation-delay:120ms]">
              <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Try one of these
              </p>
              <ul className="max-w-md space-y-2">
                {SUGGESTED_PROMPTS.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      onClick={() => send(suggestion.prompt)}
                      data-suggestion={suggestion.id}
                      className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-card/80 px-4 py-3 text-left shadow-[0_8px_24px_-18px_rgb(28_25_23/0.4)] transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-card hover:shadow-[0_14px_30px_-18px_rgb(28_25_23/0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">{suggestion.label}</span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                          {suggestion.prompt}
                        </span>
                      </span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-ink transition group-hover:bg-coral group-hover:text-white">
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-paper via-paper/95 to-transparent pt-10 pb-4">
        <div className="pointer-events-auto mx-auto w-full max-w-4xl px-4">
          <PlanBar />
          <Composer disabled={thinking} onSend={send} />
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
            <Info className="size-3 shrink-0" aria-hidden="true" />
            Prototype with sample content and stock photos. Nothing is booked.
          </p>
        </div>
      </div>
    </div>
    </PlanProvider>
  );
}
