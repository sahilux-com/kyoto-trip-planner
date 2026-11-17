import { Clock, Plus, Star, Ticket } from "lucide-react";
import { TripCardShell, detailRows } from "@/components/cards/card-parts";
import { formatDay, formatUsd } from "@/lib/format";
import type { ExperienceDetails } from "@/lib/types";

/**
 * Experience: photo at the side, start time as the biggest text, violet accent.
 * Duration and rating as stats, host and price per guest in the footer. Actions: See times, Add to plan.
 */
export function ExperienceCard({ details, sourceRow }: { details: ExperienceDetails; sourceRow: string }) {
  return (
    <TripCardShell
      view={{
        id: sourceRow,
        type: "experience",
        layout: "side",
        badge: { label: "Experience", icon: Ticket, accent: "violet" },
        photo: {
          src: details.imageUrl,
          alt: details.imageAlt,
          position: details.imagePosition,
          fallbackIcon: Ticket,
        },
        headline: { value: `${formatDay(details.date).split(" ")[0]} ${details.startTime}`, label: "start" },
        title: details.activityName,
        subtitle: details.category,
        stats: [
          { icon: Clock, value: String(details.durationHours), label: details.durationHours === 1 ? "Hour" : "Hours" },
          { icon: Star, value: details.rating.toFixed(2), label: "Rating" },
        ],
        footer: {
          label: "Hosted by",
          value: details.hostFirstName ?? "to be confirmed",
          meta: `${formatUsd(details.pricePerGuestUsd)} per guest`,
        },
        actions: { view: "See times", add: { label: "Add to plan", doneLabel: "In plan", icon: Plus } },
        details: detailRows([
          ["Time, sample data", `${formatDay(details.date)} at ${details.startTime}, ${details.duration}`],
          ["Availability, sample data", details.availability],
          ["Meet at", details.meetingPoint],
          ["Total, sample data", `${formatUsd(details.totalFor2Usd)} for ${details.partySize} guests`],
        ]),
      }}
    />
  );
}
