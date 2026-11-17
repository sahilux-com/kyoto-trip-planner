"use client";

import { Orb } from "@yogesharc/thinking-orbs";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown while the plan is being put together, so the thread is never blank.
 * The ghosts underneath have the outline of the row of three cards that is coming.
 */
export function ThinkingBubble() {
  return (
    <div className="animate-rise space-y-4" role="status" aria-label="Assistant is thinking">
      <div className="flex items-start gap-3">
        {/* The orb stands in for the assistant's mark while it thinks. It draws in the
            text colour, so text-coral tints it, and holds still under prefers-reduced-motion. */}
        <span className="flex size-7 shrink-0 items-center justify-center" aria-hidden="true" data-thinking-orb>
          <Orb state="reasoning" size={28} className="text-coral" />
        </span>
        <p className="pt-1 text-[15px]">
          <span className="text-sheen animate-sheen">Putting your Kyoto weekend together…</span>
        </p>
      </div>

      <div className="-mx-4 flex gap-2.5 overflow-hidden px-4 md:mx-0 md:px-0" aria-hidden="true" data-thinking-ghosts>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[16.5rem] shrink-0 rounded-[22px] border border-border/70 bg-card/60 p-2 md:w-auto md:min-w-0 md:flex-1 md:basis-0"
          >
            <Skeleton className="aspect-[4/3] w-full rounded-[16px]" />
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
