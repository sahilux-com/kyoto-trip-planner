import { BedDouble, Heart, Moon, Star } from "lucide-react";
import { TripCardShell, detailRows } from "@/components/cards/card-parts";
import { formatDateRange, formatUsd } from "@/lib/format";
import type { StayDetails } from "@/lib/types";

/**
 * Stay: photo across the top, nightly price as the biggest text, coral accent.
 * Nights and rating as stats, host and dates in the footer. Actions: View stay, Save.
 */
export function StayCard({ details, sourceRow }: { details: StayDetails; sourceRow: string }) {
  return (
    <TripCardShell
      view={{
        id: sourceRow,
        type: "stay",
        layout: "top",
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
        actions: { view: "View stay", add: { label: "Save", doneLabel: "Saved", icon: Heart } },
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
