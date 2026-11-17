import { Footprints, Utensils, Wallet } from "lucide-react";
import { TripCardShell, detailRows } from "@/components/cards/card-parts";
import { formatUsd } from "@/lib/format";
import type { FoodDetails } from "@/lib/types";

/** Food: estimated cost for two up top, walk and price level as stats, meal and area in the footer. */
export function FoodCard({ details }: { details: FoodDetails }) {
  return (
    <TripCardShell
      view={{
        type: "food",
        badge: { label: "Food", icon: Utensils, accent: "amber" },
        photo: {
          src: details.imageUrl,
          alt: details.imageAlt,
          position: details.imagePosition,
          fallbackIcon: Utensils,
        },
        headline: { value: formatUsd(details.estCostFor2Usd), label: "for two, estimated" },
        title: details.restaurantName,
        subtitle: details.cuisine,
        stats: [
          { icon: Footprints, value: `${details.walkFromStayMin} min`, label: "Walk" },
          { icon: Wallet, value: details.priceRange, label: "Price" },
        ],
        footer: { label: "Good for", value: details.mealType, meta: details.area },
        details: detailRows([
          ["Booking", details.bookingNote],
          ["Cuisine", details.cuisine],
          ["Area", details.area],
          ["Walk from your stay", `${details.walkFromStayMin} min`],
        ]),
      }}
    />
  );
}
