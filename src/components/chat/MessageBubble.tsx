import { CloudOff } from "lucide-react";
import { AssistantAvatar } from "@/components/chat/Avatar";
import { ErrorActions } from "@/components/chat/ErrorActions";
import { TripCards } from "@/components/cards/TripCards";
import type { ChatMessage } from "@/components/chat/messages";

type Props = { message: ChatMessage; onRetry?: (prompt: string) => void };

export function MessageBubble({ message, onRetry }: Props) {
  if (message.role === "user") {
    return (
      <div className="flex animate-rise justify-end">
        <p className="max-w-[min(82%,34rem)] rounded-[1.35rem] rounded-br-md bg-ink px-4 py-2.5 text-[15px] leading-relaxed text-primary-foreground shadow-[0_8px_20px_-12px_rgb(28_25_23/0.7)]">
          {message.text}
        </p>
      </div>
    );
  }

  if (message.error) {
    const { error } = message;
    const textId = `${message.id}-text`;
    return (
      <div className="flex animate-rise items-start gap-3" data-error-bubble>
        <AssistantAvatar />
        <div className="max-w-[92%] rounded-[1.35rem] rounded-tl-md border border-border bg-card px-4 py-3.5 shadow-[0_10px_30px_-18px_rgb(28_25_23/0.35)]">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral-dark"
            >
              <CloudOff className="size-4" />
            </span>
            <p id={textId} className="text-[15px] leading-relaxed text-ink">
              {message.text}
            </p>
          </div>
          {!error.resolved && <ErrorActions describedBy={textId} onRetry={() => onRetry?.(error.prompt)} />}
        </div>
      </div>
    );
  }

  const isWelcome = message.id === "welcome";

  return (
    <div className="animate-rise space-y-4">
      <div className="flex items-start gap-3">
        <AssistantAvatar />
        {message.text && (
          <p
            className={
              isWelcome
                ? "max-w-[30ch] text-[22px] leading-[1.3] font-normal tracking-tight text-ink sm:text-[26px]"
                : "max-w-[58ch] pt-2 text-[15px] leading-relaxed text-ink"
            }
          >
            {message.text}
          </p>
        )}
      </div>
      {/* The card row uses the full width of the thread, not the text column beside the avatar. */}
      {message.cards && <TripCards cards={message.cards} />}
    </div>
  );
}
