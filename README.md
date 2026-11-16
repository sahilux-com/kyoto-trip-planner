# Kyoto Trip Planner

Prototype of a conversational trip planner for a Kyoto weekend. It answers the
question "can travellers start exploring before configuring search filters?"
by letting them describe the trip in one message and getting three
recommendation cards back: a stay, an experience and a place to eat.

All content is sample data from the content pack. Nothing is booked, held or
checked against live inventory.

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
| Kyoto weekend content workbook: the content pack spreadsheet transcribed as code, one sheet per card type | `src/data/kyoto-weekend-workbook.ts` |
| Mock response built from row 0 of each sheet (S1, E1, F1), plus the row-to-card mapping | `src/data/mock-response.ts` |
| The single seam between the chat and "the assistant" (delay, mock, injected failure) | `src/lib/trip-planner.ts` |
| Chat page, thinking state, composer, error bubble, moderator control | `src/components/chat/` |
| The three cards, each with a different layout | `src/components/cards/` |
| Card and error-state spec | [`docs/card-and-error-state-spec.md`](docs/card-and-error-state-spec.md) |

Stack: Next.js (App Router), React, TypeScript, Tailwind CSS v4. No backend.

## What makes the cards distinct

| | Stay | Experience | Food |
|---|---|---|---|
| Photo | Wide banner, top | Tall strip, left | Small circle, top right |
| Biggest text | Dates and nights | Activity name | Restaurant name |
| Accent colour | Coral top border | Purple day labels | Amber meal / price label |

## Error state

Open the page with `?moderator` on the address to get a **Fail next reply**
control in the top-right corner. It is one-shot: the next request waits 800 ms
and fails, the assistant shows an apology bubble with **Try again** and
**Browse stays**, and the control switches itself off. Try again re-sends the
same prompt and returns the three cards; the thread is never cleared.

`failure_injected` and `retry_success` are logged to the console and kept on
`window.__tripPlannerEvents`. Nothing is sent anywhere.

## Design and components

Lexend Deca throughout, on a warm paper background. UI primitives come from
shadcn/ui (button, badge, card, separator) and coss ui, formerly Origin UI
(skeleton, tooltip), in `src/components/ui/`.

## Photo credits

The cards use stock photos from [Unsplash](https://unsplash.com/license) for
illustration. They do not show the real stay, experience or restaurant.

- Stay: [Jazmin Wong](https://unsplash.com/photos/a-japanese-style-house-with-a-bicycle-KZTXVSZtUeA)
- Experience: [Huy Phan](https://unsplash.com/photos/person-whisking-matcha-tea-in-a-ceramic-bowl-Ku-huM0VCak)
- Food: [Stanley Kustamin](https://unsplash.com/photos/a-bowl-of-ramen-with-pork-egg-and-green-onions-uCAJBSZqPG4)
