"use client";

import { useId, useState, type ReactNode } from "react";
import { Check, type LucideIcon } from "lucide-react";
import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import { usePlan } from "@/components/cards/plan-context";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * The one layout all three cards use, so Stay, Experience and Food read as a
 * family: inset photo with a badge, price headline, name line, two stats, a
 * footer and two actions.
 *
 * It is compact on purpose: the three cards sit side by side in one row.
 * Each card type only decides what goes in the slots. The badge icon and its
 * accent colour are what tell the cards apart.
 */

const accents = {
  coral: "text-coral",
  violet: "text-violet-600",
  amber: "text-amber-500",
} as const;

export type CardAccent = keyof typeof accents;

export type CardStat = { icon: LucideIcon; value: string; label: string };

export type TripCardView = {
  /** Content pack row, e.g. "S1". Identifies the card in the traveller's plan. */
  id: string;
  /** "stay" | "experience" | "food": kept on the element for tests and tracking. */
  type: string;
  badge: { label: string; icon: LucideIcon; accent: CardAccent };
  photo: { src: string | null; alt: string; position: string; fallbackIcon: LucideIcon };
  /** Biggest text on the card, with a small label after it: "$168" + "per night". */
  headline: { value: string; label: string };
  /** Name in ink, then a detail in grey: "Menya Inoichi" + "Ramen". */
  title: string;
  subtitle: string;
  stats: [CardStat, CardStat];
  /** "Hosted by" + "Kenji" on the first line, a short fact on the second. */
  footer: { label: string; value: string; meta: string };
  actions: {
    /** Opens the details inside the card: "View stay", "See times", "View restaurant". */
    view: string;
    /** Puts the card on the traveller's shortlist: "Save" or "Add to plan". Never a booking. */
    add: { label: string; doneLabel: string; icon: LucideIcon };
  };
  /** Shown when the view action is opened. */
  details: { label: string; value: string }[];
};

function Stat({ icon: Icon, value, label }: CardStat) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5 px-1.5 first:pl-0.5 last:pr-0.5">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.8} aria-hidden="true" />
      <p className="min-w-0 truncate text-xs">
        <span className="font-medium text-ink">{value}</span> <span className="text-muted-foreground">{label}</span>
      </p>
    </div>
  );
}

export function TripCardShell({ view }: { view: TripCardView }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const plan = usePlan();
  const inPlan = plan.has(view.id);
  const BadgeIcon = view.badge.icon;
  const AddIcon = inPlan ? Check : view.actions.add.icon;

  function toggleDetails() {
    if (!open) track("card_opened", `${view.type}:${view.id}`);
    setOpen((o) => !o);
  }

  return (
    <article
      data-card={view.type}
      data-in-plan={inPlan}
      className={cn(
        "rounded-[22px] border bg-card p-2 shadow-[0_14px_30px_-22px_rgb(28_25_23/0.45)] transition-colors",
        inPlan ? "border-ink/40" : "border-border/70",
      )}
    >
      <div className="relative">
        <PhotoPlaceholder
          className="aspect-[4/3] w-full rounded-[16px]"
          src={view.photo.src}
          alt={view.photo.alt}
          position={view.photo.position}
          sizes="(min-width: 768px) 280px, 250px"
          label="Photo"
          icon={view.photo.fallbackIcon}
        />
        <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-medium text-ink shadow-sm">
          <BadgeIcon className={cn("size-3", accents[view.badge.accent])} strokeWidth={2.4} aria-hidden="true" />
          {view.badge.label}
        </span>
      </div>

      <div className="px-1.5 pt-3">
        <p className="flex items-baseline gap-1.5">
          <span className="text-xl leading-none font-semibold tracking-tight text-ink">{view.headline.value}</span>
          <span className="truncate text-xs text-muted-foreground">{view.headline.label}</span>
        </p>
        {/* Always two lines tall, so the three cards line up whatever the name length. */}
        <h3
          className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-[13px] leading-5 text-muted-foreground"
          title={`${view.title}, ${view.subtitle}`}
        >
          <span className="font-medium text-ink">{view.title}</span>
          <span className="mx-1 text-ink" aria-hidden="true">
            •
          </span>
          {view.subtitle}
        </h3>
      </div>

      <div className="mt-2.5 flex items-center divide-x divide-border border-y border-border px-1 py-2.5">
        <Stat {...view.stats[0]} />
        <Stat {...view.stats[1]} />
      </div>

      <div className="space-y-0.5 px-1.5 py-2.5 text-xs">
        <p className="truncate text-muted-foreground">
          {view.footer.label}
          <span className="mx-1 text-ink" aria-hidden="true">
            •
          </span>
          <span className="font-medium text-ink">{view.footer.value}</span>
        </p>
        <p className="truncate text-muted-foreground">{view.footer.meta}</p>
      </div>

      {open && (
        <dl id={detailsId} className="mb-2 animate-rise space-y-2 rounded-xl bg-muted/60 px-3 py-2.5 text-xs">
          {view.details.map((row) => (
            <div key={row.label}>
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="flex gap-1.5">
        <Button
          type="button"
          onClick={toggleDetails}
          aria-expanded={open}
          aria-controls={open ? detailsId : undefined}
          data-action="view"
          className="h-9 flex-1 rounded-full bg-gradient-to-b from-stone-700 to-stone-950 px-2.5 text-xs font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] hover:from-stone-600 hover:to-stone-900"
        >
          <span className="whitespace-nowrap">{open ? "Hide details" : view.actions.view}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => plan.toggle({ id: view.id, type: view.type, title: view.title })}
          aria-pressed={inPlan}
          data-action="add"
          className={cn(
            "h-9 min-w-0 flex-1 rounded-full px-2.5 text-xs font-medium",
            inPlan && "border-ink/40 bg-muted text-ink",
          )}
        >
          <AddIcon className="size-3.5" aria-hidden="true" />
          <span className="truncate">{inPlan ? view.actions.add.doneLabel : view.actions.add.label}</span>
        </Button>
      </div>
    </article>
  );
}

/** Helper for the three cards: a row is skipped when its value is missing. */
export function detailRows(rows: [label: string, value: ReactNode | null][]): { label: string; value: string }[] {
  return rows.filter(([, value]) => value != null && value !== "").map(([label, value]) => ({ label, value: String(value) }));
}
