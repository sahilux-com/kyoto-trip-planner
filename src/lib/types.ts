/** Shapes shared by the workbook, the mock response and the cards. */

export type StayDetails = {
  destination: string;
  listingTitle: string;
  /** ISO date, e.g. "2025-04-11" */
  checkIn: string;
  /** ISO date, e.g. "2025-04-13" */
  checkOut: string;
  nightlyPriceUsd: number;
  description: string;
};

export type DayPlan = { day: string; plan: string };

export type ExperienceDetails = {
  activityName: string;
  duration: string;
  dayPlan: DayPlan[];
};

export type FoodDetails = {
  restaurantName: string;
  mealType: string;
  priceRange: string;
  description: string;
};

export type TripCard =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };

/** The assistant always answers with exactly three cards, in this order. */
export type TripPlanResponse = [
  Extract<TripCard, { cardType: "stay" }>,
  Extract<TripCard, { cardType: "experience" }>,
  Extract<TripCard, { cardType: "food" }>,
];
