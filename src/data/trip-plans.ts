import { kyotoWeekendWorkbook, WEEKEND_BUDGET_USD } from "@/data/kyoto-weekend-workbook";
import { buildTripPlanResponse } from "@/data/mock-response";
import type { TripCard, TripPlanResponse } from "@/lib/types";

/**
 * The three use cases the prototype can answer. Each is a different Kyoto
 * weekend built from content pack rows, and each stays inside the pack's
 * $600 reference budget for two.
 *
 * A message is matched to a plan by counting the words it shares with the
 * plan's `matches` pattern. No match, or a tie, falls back to the first plan.
 */
export type TripPlan = {
  id: "culture" | "food" | "craft";
  /** Short name shown on the starter tile. */
  label: string;
  /** Starter prompt: tap the tile, or paste this text into the chat. */
  prompt: string;
  /** What the assistant says above the cards. */
  intro: string;
  /** Content pack rows the cards are built from. */
  rows: { stay: string; experience: string; food: string };
  /**
   * Order the cards appear in. Each plan leads with what its prompt is about:
   * the food-first weekend opens with the food card, the hands-on weekend with
   * the pottery experience.
   */
  order: [TripCard["cardType"], TripCard["cardType"], TripCard["cardType"]];
  matches: RegExp;
  totalUsd: number;
  /** The mock response, always stay, experience, food (the agreed contract). */
  cards: TripPlanResponse;
};

/** The plan's cards in the order the chat shows them. */
export function orderedCards(plan: TripPlan): TripCard[] {
  return plan.order.map((type) => plan.cards.find((c) => c.cardType === type)!);
}

const { Stays, Experiences, Food } = kyotoWeekendWorkbook;

function byId<Row extends { optionId: string }>(rows: Row[], optionId: string): Row {
  const row = rows.find((r) => r.optionId === optionId);
  if (!row) throw new Error(`Content pack row ${optionId} not found`);
  return row;
}

function definePlan(plan: Omit<TripPlan, "cards" | "totalUsd">): TripPlan {
  if (new Set(plan.order).size !== 3) throw new Error(`Plan "${plan.id}" must show each card type once`);
  const stay = byId(Stays, plan.rows.stay);
  const experience = byId(Experiences, plan.rows.experience);
  const food = byId(Food, plan.rows.food);
  const totalUsd = stay.totalFor2NightsUsd + experience.totalFor2GuestsUsd + food.estCostFor2Usd;
  if (totalUsd > WEEKEND_BUDGET_USD) {
    throw new Error(`Plan "${plan.id}" costs $${totalUsd}, over the $${WEEKEND_BUDGET_USD} reference budget`);
  }
  if (experience.availability !== "Spots open") {
    throw new Error(`Plan "${plan.id}" uses ${experience.optionId}, which is ${experience.availability}`);
  }
  return { ...plan, totalUsd, cards: buildTripPlanResponse(stay, experience, food) };
}

export const tripPlans: TripPlan[] = [
  definePlan({
    id: "culture",
    label: "Culture and calm",
    prompt:
      "Plan a weekend in Kyoto for two people. We enjoy cultural experiences, Japanese food and quiet neighbourhoods.",
    intro:
      "Here's a Kyoto weekend for two. A townhouse near Gion, a tea ceremony on Saturday morning, and ramen for dinner a short walk away.",
    rows: { stay: "S1", experience: "E1", food: "F1" },
    order: ["stay", "experience", "food"],
    matches: /\b(cultur\w*|tradition\w*|tea|ceremon\w*|temples?|shrines?|quiet|histor\w*|heritage)\b/gi,
  }),
  definePlan({
    id: "food",
    label: "Food first",
    prompt:
      "Plan a food-lover's weekend in Kyoto for two. We want market stalls, street food and a tasting walk with a local cook.",
    intro:
      "Here's a food-first Kyoto weekend for two. Skewers from a Nishiki Market stall, a tasting walk with a local cook on Saturday, and a flat two blocks from the market.",
    rows: { stay: "S3", experience: "E2", food: "F3" },
    order: ["food", "experience", "stay"],
    matches: /\b(food\w*|eat\w*|markets?|tasting|cook\w*|snacks?|restaurants?|cuisine|stalls?)\b/gi,
  }),
  definePlan({
    id: "craft",
    label: "Hands-on",
    prompt:
      "Plan a hands-on weekend in Kyoto for two. We'd like to make something in a pottery studio and stay somewhere calm by the river.",
    intro:
      "Here's a hands-on Kyoto weekend for two. An afternoon at a pottery wheel in Kiyomizu, a quiet tatami room by the Kamo River, and a tofu lunch in Arashiyama.",
    rows: { stay: "S2", experience: "E4", food: "F2" },
    order: ["experience", "stay", "food"],
    matches: /\b(crafts?|potter\w*|hands-on|hands on|mak(e|ing)|workshops?|ceramics?|rivers?\w*|creative|studios?)\b/gi,
  }),
];

/** Picks the plan whose words the message uses most. The first plan wins ties and no-match. */
export function pickTripPlan(message: string): TripPlan {
  let best = tripPlans[0];
  let bestScore = 0;
  for (const plan of tripPlans) {
    const score = message.match(plan.matches)?.length ?? 0;
    if (score > bestScore) {
      best = plan;
      bestScore = score;
    }
  }
  return best;
}
