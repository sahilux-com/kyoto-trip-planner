import { mockTripPlanResponse } from "@/data/mock-response";
import type { TripPlanResponse } from "@/lib/types";

/** How long the thinking animation shows before the cards arrive. */
export const THINKING_DELAY_MS = 1600;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The single seam between the chat and "the assistant".
 *
 * Happy path only: any message resolves to the same three cards after a short
 * delay. Error handling (timeouts, broken responses, retry) plugs in here
 * without touching the chat UI.
 */
export async function requestTripPlan(message: string): Promise<TripPlanResponse> {
  void message; // every message gets the same plan for now
  await sleep(THINKING_DELAY_MS);
  return mockTripPlanResponse;
}
