import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import type { FoodDetails } from "@/lib/types";

/** Food: short card, small round photo top right, amber meal/price label. */
export function FoodCard({ details }: { details: FoodDetails }) {
  return (
    <article
      data-card="food"
      className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
    >
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Food</p>
        <h3 className="text-lg font-semibold leading-tight text-stone-900">{details.restaurantName}</h3>
        <p className="text-sm font-medium text-amber-700">
          {details.mealType} <span className="text-amber-400">·</span> {details.priceRange}
        </p>
        <p className="text-sm text-stone-600">{details.description}</p>
      </div>
      <PhotoPlaceholder className="h-14 w-14 shrink-0 rounded-full" label="" />
    </article>
  );
}
