import { tripPlans } from "@/data/trip-plans";
import type { TripCard } from "@/lib/types";

/** Set on the assistant's error bubble. `prompt` is the request to send again. */
export type ChatError = {
  prompt: string;
  /** True once the traveller retried or moved on; the bubble then drops its buttons. */
  resolved: boolean;
};

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text?: string; cards?: TripCard[]; error?: ChatError };

/** One starter per use case. Tapping a tile sends its prompt. */
export const SUGGESTED_PROMPTS = tripPlans.map(({ id, label, prompt }) => ({ id, label, prompt }));

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi! Tell me about the trip you have in mind and I'll put together a place to stay, something to do and somewhere to eat.",
};

export const ERROR_MESSAGE = "Sorry, I couldn't put your Kyoto weekend together just now. Let's give it another go.";

/** Fallback offered next to Try again: the existing search, in a new tab so the chat is kept. */
export const BROWSE_STAYS_URL = "https://www.airbnb.com/s/Kyoto--Japan/homes";
