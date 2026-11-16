import { pickTripPlan } from "@/data/trip-plans";
import type { TripPlanResponse } from "@/lib/types";

/** How long the thinking animation shows before the cards arrive. */
export const THINKING_DELAY_MS = 1600;

/** How long the thinking animation shows before an injected failure surfaces. */
export const FAILURE_DELAY_MS = 800;

/** The assistant could not produce a plan. The chat answers this with the error bubble. */
export class TripPlanError extends Error {
  constructor() {
    super("Trip plan request failed");
    this.name = "TripPlanError";
  }
}

export type TripPlanReply = {
  /** Which of the three use cases the message matched. */
  planId: string;
  /** What the assistant says above the cards. */
  intro: string;
  cards: TripPlanResponse;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The single seam between the chat and "the assistant".
 *
 * The message is matched to one of three sample Kyoto weekends and resolves to
 * that plan's three cards after a short delay. With `fail: true` (set by the
 * moderator's one-shot "Fail next reply" control) the request rejects with a
 * TripPlanError instead.
 */
export async function requestTripPlan(
  message: string,
  { fail = false }: { fail?: boolean } = {},
): Promise<TripPlanReply> {
  if (fail) {
    await sleep(FAILURE_DELAY_MS);
    throw new TripPlanError();
  }
  await sleep(THINKING_DELAY_MS);
  const plan = pickTripPlan(message);
  return { planId: plan.id, intro: plan.intro, cards: plan.cards };
}
