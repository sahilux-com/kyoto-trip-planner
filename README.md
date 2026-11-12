# Kyoto Trip Planner

Prototype of a conversational trip planner for a Kyoto weekend. It answers the
question "can travellers start exploring before configuring search filters?"
by letting them describe the trip in one message and getting three
recommendation cards back: a stay, an experience and a place to eat.

This repository holds the **happy path only**. Everything works, so error
handling can be layered on next.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>, type any message (or tap the suggested prompt)
and press send. A thinking animation plays, then three cards appear in the
order Stay, Experience, Food.

## How it is put together

| Piece | Where |
|---|---|
| Kyoto weekend content workbook, one sheet per card type, as code | `src/data/kyoto-weekend-workbook.ts` |
| Mock response built from row 0 of each sheet | `src/data/mock-response.ts` |
| The single seam between the chat and "the assistant" (delay + mock) | `src/lib/trip-planner.ts` |
| Chat page, thinking state, composer | `src/components/chat/` |
| The three cards, each with a different layout | `src/components/cards/` |
| Card and error-state spec | [`docs/card-and-error-state-spec.md`](docs/card-and-error-state-spec.md) |

Stack: Next.js (App Router), React, TypeScript, Tailwind CSS v4. No backend.

## What makes the cards distinct

| | Stay | Experience | Food |
|---|---|---|---|
| Photo placeholder | Wide banner, top | Tall strip, left | Small circle, top right |
| Biggest text | Dates and nights | Activity name | Restaurant name |
| Accent colour | Coral top border | Purple day labels | Amber meal / price label |

## Next step

Error state per the spec: `?fail=once` breaks the first request, the assistant
shows an apology bubble with a **Try again** button, and the retry returns the
three cards. The hook for it is `requestTripPlan` in `src/lib/trip-planner.ts`.
