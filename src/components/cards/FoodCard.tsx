import { Utensils } from "lucide-react";
import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import type { FoodDetails } from "@/lib/types";

/** Food: short card, small round photo top right, amber meal/price label, no border. Reads like a quick tip. */
export function FoodCard({ details }: { details: FoodDetails }) {
  return (
    <article
      data-card="food"
      className="flex items-start justify-between gap-4 rounded-3xl bg-amber-100/55 px-5 py-4"
    >
      <div className="min-w-0 space-y-1.5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-amber-800 uppercase">Food</p>
        <h3 className="text-[18px] leading-[1.25] font-medium tracking-tight text-ink">{details.restaurantName}</h3>
        <p className="text-sm font-semibold text-amber-800">
          {details.mealType} <span className="text-amber-500">·</span> {details.priceRange}
        </p>
        <p className="text-sm leading-snug text-ink/75">{details.description}</p>
      </div>
      <PhotoPlaceholder
        className="size-16 shrink-0 rounded-full ring-4 ring-paper"
        src={details.imageUrl}
        alt={details.imageAlt}
        position={details.imagePosition}
        sizes="64px"
        icon={Utensils}
        iconClassName="size-5"
      />
    </article>
  );
}
