import {
  GUESTS,
  kyotoWeekendWorkbook,
  type ExperienceRow,
  type FoodRow,
  type StayRow,
} from "@/data/kyoto-weekend-workbook";
import { stockPhotos, type StockPhoto } from "@/data/stock-photos";
import { formatDay } from "@/lib/format";
import type { ExperienceDetails, FoodDetails, StayDetails, TripPlanResponse, UnresolvedField } from "@/lib/types";

/** Every option in the pack is for the same trip. */
const DESTINATION = "Kyoto, Japan";

const photoFields = (photo: StockPhoto) => ({
  imageUrl: photo.src,
  imageAlt: photo.alt,
  imagePosition: photo.position,
});

const sentence = (text: string) => (/[.!?]$/.test(text) ? text : `${text}.`);

/** Workbook row -> card fields. Every value shown on a card comes from the row. */
export function stayCardFromRow(row: StayRow): StayDetails {
  return {
    destination: DESTINATION,
    listingTitle: row.listingTitle,
    checkIn: row.checkIn,
    checkOut: row.checkOut,
    nightlyPriceUsd: row.pricePerNightUsd,
    description: sentence(row.highlight),
    guests: GUESTS,
    totalUsd: row.totalFor2NightsUsd,
    ...photoFields(stockPhotos.stay),
  };
}

export function experienceCardFromRow(row: ExperienceRow): ExperienceDetails {
  return {
    activityName: row.experienceTitle,
    duration: `${row.durationHours} hour${row.durationHours === 1 ? "" : "s"}`,
    // The pack schedules each experience on a single day, so the plan has one line.
    dayPlan: [{ day: formatDay(row.date), plan: `Starts ${row.startTime}. Meeting point: ${row.meetingPoint}.` }],
    date: row.date,
    startTime: row.startTime,
    partySize: GUESTS,
    pricePerGuestUsd: row.pricePerGuestUsd,
    availability: row.availability,
    ...photoFields(stockPhotos.experience),
  };
}

export function foodCardFromRow(row: FoodRow): FoodDetails {
  const where = `${row.cuisine} in ${row.neighbourhood}, ${row.walkFromStayMin} min walk from your stay.`;
  return {
    restaurantName: row.placeName,
    mealType: row.meal,
    priceRange: row.priceLevel,
    description: row.bookingNote ? `${where} ${sentence(row.bookingNote)}` : where,
    cuisine: row.cuisine,
    area: row.neighbourhood,
    walkFromStayMin: row.walkFromStayMin,
    openingHours: null,
    ...photoFields(stockPhotos.food),
  };
}

const STOCK_IMAGE: UnresolvedField = {
  field: "imageUrl",
  reason: "Stock photo from Unsplash for illustration. It does not show the place on the card; rights for real photos are not cleared.",
};

const stay = kyotoWeekendWorkbook.Stays[0];
const experience = kyotoWeekendWorkbook.Experiences[0];
const food = kyotoWeekendWorkbook.Food[0];

/**
 * Mock response: sample data standing in for the assistant's real answer.
 * Every card is marked `sample` and lists the fields that are missing or
 * unverified, so nothing reads as booked, available or price-checked.
 * Built from row 0 of each workbook sheet (S1, E1, F1), which together cost
 * $516 for two against the pack's $600 reference budget.
 * Order is fixed: stay, experience, food.
 */
export const mockTripPlanResponse: TripPlanResponse = [
  {
    cardType: "stay",
    sample: true,
    sourceRow: stay.optionId,
    unresolved: [
      STOCK_IMAGE,
      { field: "checkIn, checkOut", reason: "April 2025 sample dates from the content pack; not checked against a calendar." },
      {
        field: "totalUsd",
        reason: `The pack lists $${stay.totalFor2NightsUsd} for ${stay.nights} nights at $${stay.pricePerNightUsd} a night and does not explain the difference. Not a verified price.`,
      },
    ],
    details: stayCardFromRow(stay),
  },
  {
    cardType: "experience",
    sample: true,
    sourceRow: experience.optionId,
    unresolved: [
      STOCK_IMAGE,
      { field: "date, startTime, availability", reason: "Sample values from the content pack, not current availability." },
      { field: "pricePerGuestUsd", reason: "Sample price from the content pack; not verified." },
    ],
    details: experienceCardFromRow(experience),
  },
  {
    cardType: "food",
    sample: true,
    sourceRow: food.optionId,
    unresolved: [
      STOCK_IMAGE,
      { field: "openingHours", reason: "The pack has a booking note only, not opening hours." },
      { field: "walkFromStayMin", reason: "The pack does not say which stay the walk is measured from." },
    ],
    details: foodCardFromRow(food),
  },
];
