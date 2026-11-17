"use client";

import { ClipboardList, X } from "lucide-react";
import { usePlan } from "@/components/cards/plan-context";

/**
 * The traveller's shortlist, pinned above the message box once it has
 * anything in it. Tapping an item removes it. Nothing here is booked.
 */
export function PlanBar() {
  const { items, toggle } = usePlan();
  if (items.length === 0) return null;

  return (
    <section
      aria-label="Your plan"
      aria-live="polite"
      data-plan-bar
      className="mb-2 flex animate-rise items-center gap-2 rounded-2xl border border-border bg-card/95 py-1.5 pr-1.5 pl-3 shadow-[0_10px_30px_-16px_rgb(28_25_23/0.3)]"
    >
      <p className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-ink">
        <ClipboardList className="size-3.5 text-muted-foreground" aria-hidden="true" />
        Your plan
        <span className="rounded-full bg-ink px-1.5 py-px text-[10px] font-semibold text-primary-foreground">
          {items.length}
        </span>
      </p>
      <ul className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <button
              type="button"
              onClick={() => toggle(item)}
              aria-label={`Remove ${item.title} from your plan`}
              className="group flex max-w-48 items-center gap-1 rounded-full bg-muted py-1 pr-1.5 pl-2.5 text-xs text-ink transition hover:bg-muted/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink"
            >
              <span className="truncate">{item.title}</span>
              <X className="size-3 shrink-0 text-muted-foreground group-hover:text-ink" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
