import { BROKEN_MOCK_RESPONSE } from "@/data/broken-response";
import { orderedCards, pickTripPlan } from "@/data/trip-plans";
import type { TripCard } from "@/lib/types";

/** How long the thinking animation shows before the cards arrive. */
export const THINKING_DELAY_MS = 1600;

/** How long the thinking animation shows before an injected failure surfaces. */
export const FAILURE_DELAY_MS = 800;

/** The assistant could not produce a usable plan. The chat answers this with the error bubble. */
export class TripPlanError extends Error {
  constructor(readonly problems: string[]) {
    super(`Trip plan reply was unusable: ${problems.join("; ")}`);
    this.name = "TripPlanError";
  }
}

export type TripPlanReply = {
  /** Which of the three use cases the message matched. */
  planId: string;
  /** What the assistant says above the cards. */
  intro: string;
  /** The three cards, led by the one the request is about. */
  cards: TripCard[];
};

const CARD_TYPES = ["stay", "experience", "food"] as const;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;
const filled = (v: unknown) => (typeof v === "number" ? Number.isFinite(v) : typeof v === "string" && v.trim() !== "");

/** The one field each card cannot be drawn without: its biggest text. */
const REQUIRED: Record<(typeof CARD_TYPES)[number], string> = {
  stay: "nightlyPriceUsd",
  experience: "startTime",
  food: "restaurantName",
};

/**
 * Every reply passes through here before the guest sees it, real or broken.
 * A guest only ever gets all three cards, each complete, or the error bubble:
 * never two cards, an empty card or a sold-out slot.
 */
export function checkReply(raw: unknown): TripPlanReply {
  const problems: string[] = [];
  if (!isRecord(raw) || !Array.isArray(raw.cards)) throw new TripPlanError(["reply has no cards"]);

  const cards = raw.cards.filter(isRecord);
  for (const type of CARD_TYPES) {
    const matching = cards.filter((c) => c.cardType === type);
    if (matching.length !== 1) {
      problems.push(`${matching.length} ${type} cards`);
      continue;
    }
    const card = matching[0];
    const details = isRecord(card.details) ? card.details : {};
    if (card.sample !== true) problems.push(`${type} card is not marked as sample content`);
    if (!filled(card.sourceRow)) problems.push(`${type} card has no source row`);
    if (!filled(details[REQUIRED[type]])) problems.push(`${type} card is missing ${REQUIRED[type]}`);
    if (type === "experience" && details.availability !== "Spots open") {
      problems.push(`experience is ${String(details.availability)}`);
    }
  }
  if (!filled(raw.intro)) problems.push("reply has no intro");

  if (problems.length) throw new TripPlanError(problems);
  return raw as TripPlanReply;
}

/**
 * The single seam between the chat and "the assistant".
 *
 * The message is matched to one of three sample Kyoto weekends and resolves to
 * that plan's three cards after a short delay. With `fail: true` (set by the
 * moderator's one-shot "Fail next reply" control) the assistant sends back
 * BROKEN_MOCK_RESPONSE instead, which fails `checkReply`, so the request
 * rejects with a TripPlanError and the chat shows the error bubble.
 */
export async function requestTripPlan(
  message: string,
  { fail = false }: { fail?: boolean } = {},
): Promise<TripPlanReply> {
  if (fail) {
    await sleep(FAILURE_DELAY_MS);
    return checkReply(BROKEN_MOCK_RESPONSE);
  }
  await sleep(THINKING_DELAY_MS);
  const plan = pickTripPlan(message);
  return checkReply({ planId: plan.id, intro: plan.intro, cards: orderedCards(plan) });
}
