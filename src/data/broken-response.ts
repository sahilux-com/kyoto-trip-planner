/**
 * Fake, deliberately broken reply for the moderator's "Fail next reply" control.
 *
 * It looks like what a real assistant might send back when something goes wrong
 * mid-answer: the food card never arrived, the stay lost its price, and the
 * experience points at a slot that is sold out. None of it reaches the guest:
 * `checkReply` in `src/lib/trip-planner.ts` rejects it and the chat shows the
 * error bubble instead. Values are made up and not taken from the content pack.
 */
export const BROKEN_MOCK_RESPONSE: unknown = {
  planId: "culture",
  intro: "Here's a Kyoto weekend for two. A townhouse near Gion, a tea ceremony on Saturday morning, and",
  cards: [
    {
      cardType: "stay",
      sample: true,
      sourceRow: "S1",
      unresolved: [],
      details: { listingTitle: "Restored machiya near Gion", nightlyPriceUsd: null, totalUsd: null },
    },
    {
      cardType: "experience",
      sample: true,
      sourceRow: "E9",
      unresolved: [],
      details: { activityName: "Tea ceremony", availability: "Sold out", startTime: "" },
    },
    // The food card is missing: the reply was cut off.
  ],
};
