import { AssistantAvatar } from "@/components/chat/Avatar";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown while the plan is being put together, so the thread is never blank.
 * The ghosts underneath have the outline of the three cards that are coming:
 * banner on top, strip on the left, circle on the right.
 */
export function ThinkingBubble() {
  return (
    <div className="flex animate-rise items-start gap-3" role="status" aria-label="Assistant is thinking">
      <AssistantAvatar />
      <div className="min-w-0 flex-1 space-y-3.5 pt-1">
        <p className="flex items-center gap-2.5 text-[15px]">
          <span className="flex items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 animate-dot rounded-full bg-coral"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </span>
          <span className="text-sheen animate-sheen">Putting your Kyoto weekend together…</span>
        </p>

        <div className="space-y-3" aria-hidden="true" data-thinking-ghosts>
          {/* Stay */}
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/60">
            <Skeleton className="h-24 w-full rounded-none" />
            <div className="space-y-2 px-5 py-4">
              <Skeleton className="h-5 w-3/5 rounded-full" />
              <Skeleton className="h-3 w-2/5 rounded-full" />
            </div>
          </div>
          {/* Experience */}
          <div className="flex overflow-hidden rounded-3xl border border-border/70 bg-card/60">
            <Skeleton className="w-24 shrink-0 self-stretch rounded-none sm:w-32" />
            <div className="flex-1 space-y-2 px-5 py-4">
              <Skeleton className="h-5 w-4/5 rounded-full" />
              <Skeleton className="h-3 w-1/4 rounded-full" />
            </div>
          </div>
          {/* Food */}
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-muted/50 px-5 py-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-2/5 rounded-full" />
              <Skeleton className="h-3 w-3/5 rounded-full" />
            </div>
            <Skeleton className="size-12 shrink-0 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
