import { AssistantAvatar } from "@/components/chat/Avatar";
import { TripCards } from "@/components/cards/TripCards";
import type { ChatMessage } from "@/components/chat/messages";

export function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-tr-md bg-stone-900 px-4 py-2.5 text-[15px] leading-relaxed text-white shadow-sm">
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <AssistantAvatar />
      <div className="min-w-0 flex-1 space-y-3">
        {message.text && (
          <p className="inline-block max-w-[90%] rounded-2xl rounded-tl-md bg-white px-4 py-2.5 text-[15px] leading-relaxed text-stone-800 shadow-sm ring-1 ring-stone-200">
            {message.text}
          </p>
        )}
        {message.cards && <TripCards cards={message.cards} />}
      </div>
    </div>
  );
}
