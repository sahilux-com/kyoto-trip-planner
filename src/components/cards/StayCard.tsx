import { BedDouble, Moon, Star } from "lucide-react";
import { TripCardShell, detailRows } from "@/components/cards/card-parts";
import { formatDateRange, formatUsd } from "@/lib/format";
import type { StayDetails } from "@/lib/types";

/** Stay: nightly price up top, nights and rating as stats, host and dates in the footer. */
export function StayCard({ details }: { details: StayDetails }) {
  return (
    <TripCardShell
      view={{
        type: "stay",
        badge: { label: "Stay", icon: BedDouble, accent: "coral" },
        photo: {
          src: details.imageUrl,
          alt: details.imageAlt,
          position: details.imagePosition,
          fallbackIcon: BedDouble,
        },
        headline: { value: formatUsd(details.nightlyPriceUsd), label: "per night" },
        title: details.listingTitle,
        subtitle: `${details.neighbourhood}, Kyoto`,
        stats: [
          { icon: Moon, value: String(details.nights), label: details.nights === 1 ? "Night" : "Nights" },
          { icon: Star, value: details.rating.toFixed(2), label: "Rating" },
        ],
        footer: {
          label: "Hosted by",
          value: details.hostFirstName,
          meta: formatDateRange(details.checkIn, details.checkOut),
        },
        details: detailRows([
          ["Type", details.propertyType],
          ["Highlight", details.description],
          ["Guests", details.guests],
          ["Reviews", details.reviewCount],
          ["Total, sample data", `${formatUsd(details.totalUsd)} for ${details.nights} nights`],
        ]),
      }}
    />
  );
}
