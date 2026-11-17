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
  guests: number;
  /** Total for the stay as given in the content pack. Unverified. */
  totalUsd: number;
  nights: number;
  neighbourhood: string;
  propertyType: string;
  rating: number;
  reviewCount: number;
  hostFirstName: string;
  /** Stock photo for illustration, not a photo of this listing. null draws a placeholder. */
  imageUrl: string | null;
  imageAlt: string;
  /** CSS object-position that keeps the subject in frame. */
  imagePosition: string;
};

export type DayPlan = { day: string; plan: string };

export type ExperienceDetails = {
  activityName: string;
  duration: string;
  dayPlan: DayPlan[];
  /** ISO date */
  date: string;
  /** 24h, e.g. "10:30" */
  startTime: string;
  partySize: number;
  pricePerGuestUsd: number;
  /** Sample value from the content pack, not live availability. */
  availability: string;
  durationHours: number;
  category: string;
  /** null where the content pack leaves the host blank. */
  hostFirstName: string | null;
  rating: number;
  meetingPoint: string;
  totalFor2Usd: number;
  imageUrl: string | null;
  imageAlt: string;
  imagePosition: string;
};

export type FoodDetails = {
  restaurantName: string;
  mealType: string;
  priceRange: string;
  description: string;
  cuisine: string;
  area: string;
  walkFromStayMin: number;
  /** null: the content pack has a booking note but no opening hours. */
  openingHours: string | null;
  estCostFor2Usd: number;
  /** null where the content pack has no booking note. */
  bookingNote: string | null;
  imageUrl: string | null;
  imageAlt: string;
  imagePosition: string;
};

/** A field whose value is missing or not verified. Nothing on a card is a booking or live inventory. */
export type UnresolvedField = { field: string; reason: string };

type CardMeta = {
  /** Always true in this prototype: sample content, nothing is booked or held. */
  sample: true;
  /** Content pack row the card was built from, e.g. "S1". */
  sourceRow: string;
  unresolved: UnresolvedField[];
};

export type TripCard =
  | ({ cardType: "stay"; details: StayDetails } & CardMeta)
  | ({ cardType: "experience"; details: ExperienceDetails } & CardMeta)
  | ({ cardType: "food"; details: FoodDetails } & CardMeta);

/** The assistant always answers with exactly three cards, in this order. */
export type TripPlanResponse = [
  Extract<TripCard, { cardType: "stay" }>,
  Extract<TripCard, { cardType: "experience" }>,
  Extract<TripCard, { cardType: "food" }>,
];
