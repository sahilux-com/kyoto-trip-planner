"use client";

import { useId, useState, type ReactNode } from "react";
import { Check, type LucideIcon } from "lucide-react";
import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import { usePlan } from "@/components/cards/plan-context";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/**
 * The frame all three cards share, so Stay, Experience and Food still read as
 * one plan: same corners, stats row, footer and two actions.
 *
 * Three things tell the cards apart, as the brief asks:
 * - where the photo sits (`layout`): on top for the stay, at the side for the
 *   experience, a small thumbnail for food;
 * - which text is biggest: the nightly price, the start time, the restaurant name;
 * - the accent colour: coral, violet, amber, on a filled badge and a top rule.
 */

const accents = {
  // `card` is a very light pastel wash of the accent, behind the whole card.
  coral: { badge: "bg-coral text-white", rule: "bg-coral", card: "bg-[#fff7f8]" },
  violet: { badge: "bg-violet-600 text-white", rule: "bg-violet-600", card: "bg-[#faf8ff]" },
  amber: { badge: "bg-amber-400 text-ink", rule: "bg-amber-400", card: "bg-[#fffaf0]" },
} as const;

export type CardAccent = keyof typeof accents;

/** Photo on top (stay), photo at the side (experience), small thumbnail (food). */
export type CardLayout = "top" | "side" | "thumb";

export type CardStat = { icon: LucideIcon; value: string; label: string };

export type TripCardView = {
  /** Content pack row, e.g. "S1". Identifies the card in the traveller's plan. */
  id: string;
  /** "stay" | "experience" | "food": kept on the element for tests and tracking. */
  type: string;
  layout: CardLayout;
  badge: { label: string; icon: LucideIcon; accent: CardAccent };
  photo: { src: string | null; alt: string; position: string; fallbackIcon: LucideIcon };
  /**
   * Biggest text on the card, with a small label after it: "$168" + "per night",
   * "Sat 10:30" + "start". Left out when the name itself is the biggest text (food).
   */
  headline?: { value: string; label: string };
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

function CardBadge({ badge }: { badge: TripCardView["badge"] }) {
  const Icon = badge.icon;
  return (
    <span
      data-card-badge
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-[11px] leading-none font-semibold shadow-sm",
        accents[badge.accent].badge,
      )}
    >
      <Icon className="size-3" strokeWidth={2.4} aria-hidden="true" />
      {badge.label}
    </span>
  );
}

function Headline({ headline }: { headline: NonNullable<TripCardView["headline"]> }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-1.5" data-card-biggest>
      <span className="text-xl leading-none font-semibold tracking-tight text-ink">{headline.value}</span>
      <span className="text-xs text-muted-foreground">{headline.label}</span>
    </p>
  );
}

/** Name line: name in ink, detail in grey, always two lines tall so the row lines up. */
function NameLine({ view }: { view: TripCardView }) {
  return (
    <h3
      className="line-clamp-2 min-h-[2.5rem] text-[13px] leading-5 text-muted-foreground"
      title={`${view.title}, ${view.subtitle}`}
    >
      <span className="font-medium text-ink">{view.title}</span>
      <span className="mx-1 text-ink" aria-hidden="true">
        •
      </span>
      {view.subtitle}
    </h3>
  );
}

/** Top of the card. This is where the three layouts differ. */
function CardTop({ view }: { view: TripCardView }) {
  const photo = (className: string, sizes: string) => (
    <PhotoPlaceholder
      className={className}
      src={view.photo.src}
      alt={view.photo.alt}
      position={view.photo.position}
      sizes={sizes}
      label="Photo"
      icon={view.photo.fallbackIcon}
    />
  );

  if (view.layout === "side") {
    // Experience: photo at the side, start time beside it as the biggest text.
    return (
      <>
        <div className="flex gap-3">
          {photo("aspect-[3/4] w-[44%] shrink-0 rounded-[16px]", "130px")}
          <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pr-1">
            <CardBadge badge={view.badge} />
            {view.headline && <Headline headline={view.headline} />}
          </div>
        </div>
        <div className="px-1.5 pt-3">
          <NameLine view={view} />
        </div>
      </>
    );
  }

  if (view.layout === "thumb") {
    // Food: small thumbnail, restaurant name as the biggest text.
    return (
      <div className="px-1.5 pt-1.5">
        <div className="flex items-start justify-between gap-2">
          {photo("size-16 shrink-0 rounded-[14px]", "64px")}
          <CardBadge badge={view.badge} />
        </div>
        <h3 className="mt-3 line-clamp-2 text-xl leading-6 font-semibold tracking-tight text-ink" data-card-biggest>
          {view.title}
        </h3>
        <p className="mt-1 truncate text-[13px] text-muted-foreground">{view.subtitle}</p>
      </div>
    );
  }

  // Stay: photo across the top with the badge on it, nightly price as the biggest text.
  return (
    <>
      <div className="relative">
        {photo("aspect-[4/3] w-full rounded-[16px]", "(min-width: 768px) 280px, 250px")}
        <span className="absolute top-2 left-2">
          <CardBadge badge={view.badge} />
        </span>
      </div>
      <div className="space-y-1.5 px-1.5 pt-3">
        {view.headline && <Headline headline={view.headline} />}
        <NameLine view={view} />
      </div>
    </>
  );
}

export function TripCardShell({ view }: { view: TripCardView }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const plan = usePlan();
  const inPlan = plan.has(view.id);
  const AddIcon = inPlan ? Check : view.actions.add.icon;

  function toggleDetails() {
    if (!open) track("card_opened", `${view.type}:${view.id}`);
    setOpen((o) => !o);
  }

  return (
    <article
      data-card={view.type}
      data-layout={view.layout}
      data-in-plan={inPlan}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[22px] border p-2 pt-3 shadow-[0_14px_30px_-22px_rgb(28_25_23/0.45)] transition-colors",
        accents[view.badge.accent].card,
        inPlan ? "border-ink/40" : "border-border/70",
      )}
    >
      {/* Accent rule across the top: the card's colour, visible even before the photo loads. */}
      <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-[2px]", accents[view.badge.accent].rule)} />

      <CardTop view={view} />

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

      {/* Pinned to the bottom, so the buttons line up across cards of different heights. */}
      <div className="mt-auto flex gap-1.5">
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
