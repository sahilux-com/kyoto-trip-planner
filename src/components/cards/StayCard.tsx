import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import { formatStayDates, formatUsd } from "@/lib/format";
import type { StayDetails } from "@/lib/types";

/** Stay: wide banner photo on top, coral top border, dates are the biggest text. */
export function StayCard({ details }: { details: StayDetails }) {
  return (
    <article
      data-card="stay"
      className="overflow-hidden rounded-2xl border border-stone-200 border-t-4 border-t-coral bg-white shadow-sm"
    >
      <PhotoPlaceholder className="h-40 w-full" label="Listing photo" />
      <div className="space-y-1 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-coral">Stay</p>
        <h3 className="text-xl font-semibold leading-tight text-stone-900">
          {formatStayDates(details.checkIn, details.checkOut)}
        </h3>
        <p className="text-stone-700">
          {details.listingTitle} <span className="text-stone-400">·</span> {details.destination}
        </p>
        <p className="font-medium text-stone-900">
          {formatUsd(details.nightlyPriceUsd)} <span className="font-normal text-stone-500">USD / night</span>
        </p>
        <p className="text-sm text-stone-600">{details.description}</p>
      </div>
    </article>
  );
}
