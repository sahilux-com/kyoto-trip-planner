import { Sparkles } from "lucide-react";

/** Small coral mark that sits beside everything the assistant says. */
export function AssistantAvatar() {
  return (
    <div
      aria-hidden="true"
      className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-coral text-white shadow-[0_2px_8px_-2px_rgb(255_56_92/0.6)]"
    >
      <Sparkles className="size-3.5" strokeWidth={2.4} />
    </div>
  );
}
