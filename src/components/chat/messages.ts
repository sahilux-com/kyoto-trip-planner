import type { TripCard } from "@/lib/types";

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text?: string; cards?: TripCard[] };

export const SUGGESTED_PROMPT =
  "Plan a weekend in Kyoto for two people. We enjoy cultural experiences, Japanese food and quiet neighbourhoods.";

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi! Tell me about the trip you have in mind and I'll put together a place to stay, something to do and somewhere to eat.",
};

export const PLAN_INTRO = "Here's a Kyoto weekend for two. A quiet place to stay, one unhurried day out, and dinner at a counter.";
