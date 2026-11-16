import { BedDouble } from "lucide-react";
import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import { Card } from "@/components/ui/card";
import { formatStayDates, formatUsd } from "@/lib/format";
import type { StayDetails } from "@/lib/types";

/** Stay: wide banner photo on top, coral top border, dates are the biggest text. Reads like a listing. */
export function StayCard({ details }: { details: StayDetails }) {
  return (
    <Card
      data-card="stay"
      className="gap-0 rounded-3xl border-t-4 border-t-coral py-0 shadow-[0_18px_40px_-24px_rgb(28_25_23/0.45)]"
    >
      <PhotoPlaceholder
        className="h-44 w-full sm:h-56"
        src={details.imageUrl}
        alt={details.imageAlt}
        position={details.imagePosition}
        sizes="(min-width: 672px) 640px, 100vw"
        label="Listing photo"
        icon={BedDouble}
      />
      <div className="space-y-2 px-5 pt-4 pb-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-coral-dark uppercase">Stay</p>
        <h3 className="text-[22px] leading-[1.2] font-medium tracking-tight text-ink sm:text-[26px]">
          {formatStayDates(details.checkIn, details.checkOut)}
        </h3>
        <p className="text-[15px] text-ink">
          {details.listingTitle} <span className="text-muted-foreground">·</span>{" "}
          <span className="text-muted-foreground">{details.destination}</span>
        </p>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-dashed border-border pt-3">
          <p className="text-sm text-muted-foreground">{details.description}</p>
          <p className="text-[15px] font-semibold text-ink">
            {formatUsd(details.nightlyPriceUsd)}{" "}
            <span className="font-normal text-muted-foreground">USD / night</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
