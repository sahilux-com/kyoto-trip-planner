import type { ExperienceDetails, FoodDetails, StayDetails } from "@/lib/types";

/**
 * Kyoto weekend content workbook, as code.
 *
 * One sheet per card type, one row per recommendation. The happy path uses
 * row 0 of each sheet. Columns match the field lists in the card spec.
 * Fixed sample trip: Kyoto, 2 guests, Fri 11 Apr – Sun 13 Apr 2025.
 */
export const kyotoWeekendWorkbook = {
  Stay: [
    {
      destination: "Kyoto, Japan",
      listingTitle: "Machiya townhouse near Gion",
      checkIn: "2025-04-11",
      checkOut: "2025-04-13",
      nightlyPriceUsd: 185,
      description: "Quiet wooden house, 5 min walk to Yasaka Shrine.",
    },
  ] satisfies StayDetails[],

  Experience: [
    {
      activityName: "Arashiyama Bamboo & Tea Walk",
      duration: "3 hours",
      dayPlan: [
        { day: "Sat 12 Apr", plan: "Bamboo grove, Tenryu-ji garden, matcha tasting" },
        { day: "Sun 13 Apr", plan: "Fushimi Inari gates at sunrise, then checkout" },
      ],
    },
  ] satisfies ExperienceDetails[],

  Food: [
    {
      restaurantName: "Nishiki Market Kaiseki Bar",
      mealType: "Dinner",
      priceRange: "$$$",
      description: "Seasonal small plates at a 10-seat counter.",
    },
  ] satisfies FoodDetails[],
} as const;
