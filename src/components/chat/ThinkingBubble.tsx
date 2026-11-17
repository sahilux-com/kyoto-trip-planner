"use client";

import { Orb } from "@yogesharc/thinking-orbs";
import { AssistantAvatar } from "@/components/chat/Avatar";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown while the plan is being put together, so the thread is never blank.
 * The ghosts underneath have the outline of the row of three cards that is coming.
 */
export function ThinkingBubble() {
  return (
    <div className="animate-rise space-y-4" role="status" aria-label="Assistant is thinking">
      <div className="flex items-start gap-3">
        <AssistantAvatar />
        <p className="flex items-center gap-2 pt-2 text-[15px]">
          {/* The orb shows the assistant is working. It draws in the text colour, so text-coral
              tints it, and it holds still under prefers-reduced-motion. */}
          <span className="flex shrink-0" aria-hidden="true" data-thinking-orb>
            <Orb state="reasoning" size={22} className="text-coral" />
          </span>
          <span className="text-sheen animate-sheen">Putting your Kyoto weekend together…</span>
        </p>
      </div>

      <div className="-mx-4 flex gap-2.5 overflow-hidden px-4 md:mx-0 md:px-0" aria-hidden="true" data-thinking-ghosts>
        {/* Same three photo positions as the real cards: top, side, thumbnail. */}
        {(["top", "side", "thumb"] as const).map((layout) => (
          <div
            key={layout}
            className="w-[16.5rem] shrink-0 rounded-[22px] border border-border/70 bg-card/60 p-2 md:w-auto md:min-w-0 md:flex-1 md:basis-0"
          >
            {layout === "top" && <Skeleton className="aspect-[4/3] w-full rounded-[16px]" />}
            {layout === "side" && (
              <div className="flex gap-3">
                <Skeleton className="aspect-[3/4] w-[44%] shrink-0 rounded-[16px]" />
                <div className="flex flex-1 flex-col justify-between py-1">
                  <Skeleton className="h-5 w-3/4 rounded-full" />
                  <Skeleton className="h-5 w-full rounded-full" />
                </div>
              </div>
            )}
            {layout === "thumb" && <Skeleton className="m-1.5 size-16 rounded-[14px]" />}
            <div className="space-y-2 px-1.5 pt-3 pb-2">
              <Skeleton className="h-5 w-2/5 rounded-full" />
              <Skeleton className="h-3 w-4/5 rounded-full" />
              <Skeleton className="h-3 w-3/5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
