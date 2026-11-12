import { AssistantAvatar } from "@/components/chat/Avatar";

/** Assistant bubble shown while the plan is being put together. */
export function ThinkingBubble() {
  return (
    <div className="flex items-start gap-3" role="status" aria-label="Assistant is thinking">
      <AssistantAvatar />
      <div className="flex items-center gap-3 rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm ring-1 ring-stone-200">
        <span className="flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-coral"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </span>
        <span className="text-sm text-stone-600">Putting your Kyoto weekend together…</span>
      </div>
    </div>
  );
}
