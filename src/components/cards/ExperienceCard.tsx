import { Clock, Star, Ticket } from "lucide-react";
import { TripCardShell, detailRows } from "@/components/cards/card-parts";
import { formatDay, formatUsd } from "@/lib/format";
import type { ExperienceDetails } from "@/lib/types";

/** Experience: price per guest up top, duration and rating as stats, host and start time in the footer. */
export function ExperienceCard({ details }: { details: ExperienceDetails }) {
  return (
    <TripCardShell
      view={{
        type: "experience",
        badge: { label: "Experience", icon: Ticket, accent: "violet" },
        photo: {
          src: details.imageUrl,
          alt: details.imageAlt,
          position: details.imagePosition,
          fallbackIcon: Ticket,
        },
        headline: { value: formatUsd(details.pricePerGuestUsd), label: "per guest" },
        title: details.activityName,
        subtitle: details.category,
        stats: [
          { icon: Clock, value: String(details.durationHours), label: details.durationHours === 1 ? "Hour" : "Hours" },
          { icon: Star, value: details.rating.toFixed(2), label: "Rating" },
        ],
        footer: {
          label: "Hosted by",
          value: details.hostFirstName ?? "to be confirmed",
          meta: `${formatDay(details.date)}, ${details.startTime}`,
        },
        details: detailRows([
          ["Meet at", details.meetingPoint],
          ["Guests", details.partySize],
          ["Total, sample data", `${formatUsd(details.totalFor2Usd)} for ${details.partySize}`],
          ["Availability, sample data", details.availability],
        ]),
      }}
    />
  );
}
