import { Footprints, Plus, Utensils, Wallet } from "lucide-react";
import { TripCardShell, detailRows } from "@/components/cards/card-parts";
import { formatUsd } from "@/lib/format";
import type { FoodDetails } from "@/lib/types";

/**
 * Food: small thumbnail, restaurant name as the biggest text, amber accent.
 * Walk and price level as stats, meal and estimated cost in the footer. Actions: View restaurant, Add to plan.
 */
export function FoodCard({ details, sourceRow }: { details: FoodDetails; sourceRow: string }) {
  return (
    <TripCardShell
      view={{
        id: sourceRow,
        type: "food",
        layout: "thumb",
        badge: { label: "Food", icon: Utensils, accent: "amber" },
        photo: {
          src: details.imageUrl,
          alt: details.imageAlt,
          position: details.imagePosition,
          fallbackIcon: Utensils,
        },
        title: details.restaurantName,
        subtitle: `${details.cuisine} • ${details.area}`,
        stats: [
          { icon: Footprints, value: `${details.walkFromStayMin} min`, label: "Walk" },
          { icon: Wallet, value: details.priceRange, label: "Price" },
        ],
        footer: { label: "Good for", value: details.mealType, meta: `${formatUsd(details.estCostFor2Usd)} for two, estimated` },
        actions: { view: "View restaurant", add: { label: "Add to plan", doneLabel: "In plan", icon: Plus } },
        details: detailRows([
          ["Booking", details.bookingNote],
          ["Opening hours", "Not in the sample data"],
          ["Cuisine", details.cuisine],
          ["Area", details.area],
          ["Walk from your stay", `${details.walkFromStayMin} min`],
        ]),
      }}
    />
  );
}
