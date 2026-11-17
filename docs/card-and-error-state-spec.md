# Trip-Planner Chat – Kyoto Weekend Card Spec (Stay, Experience, Food)

One-page card and error-state spec for the Airbnb conversational trip-planner prototype. It covers the assistant's reply to one exploratory request and the one error state the prototype must recover from. Layout follows `host_reservation_card_spec.md` (Host Inbox Assistant "Upcoming reservation" card): sketch, field list, what makes the card look different, mock response.

**Scenario.** An exploration-focused traveller (Intent B) types: *"Plan a weekend in Kyoto for two people. We enjoy cultural experiences, Japanese food and quiet neighbourhoods."* The assistant replies with three recommendation cards, always in the order **Stay, Experience, Food**. No filters are asked for first; destination, guests and dates come from the chat.

**Fixed sample trip.** Kyoto, Japan · 2 guests · Fri 11 Apr – Sun 13 Apr 2025 · 2 nights. Every card and every mock value uses this trip.

**Content source.** Example values come from the Kyoto Weekend Prototype Content Pack: rows S1 (Stays), E1 (Experiences) and F1 (Food). Together they cost $516 for two against the pack's $600 reference budget. This is the first of three use cases; see "Three use cases" below. The pack has no photo URLs because rights for the real photos are not cleared, so each image slot shows a stock photo from Unsplash for illustration. It does not show the place on the card. Where the spec says "image placeholder", read it as that photo slot; a grey stand-in is drawn if a photo is missing.

**What makes the cards look different.** Stay, Experience and Food share one frame (corners, stats row, footer, two actions), so they still read as one plan. Three things differ, as the brief asks:

| | Stay | Experience | Food |
|---|---|---|---|
| Image position | Across the top, landscape 4:3 | At the side, portrait 3:4, about 45% of the width | Small square thumbnail, top left |
| Biggest text | Nightly price, "$168 per night" | Start time, "Sat 10:30 start" | Restaurant name, "Menya Inoichi" |
| Accent colour | Coral | Violet | Amber |

The accent colour shows as a filled badge with the card type in words ("Stay", "Experience", "Food") a 3px rule across the top of the card and a very light pastel wash behind the card, so colour is never the only cue. An earlier version merged the three into one identical layout to match a reference listing card; that lost the first two differences and was reverted.

```
 STAY                        EXPERIENCE                  FOOD
 ======== coral =========    ======== violet ========    ======== amber =========
 +--------------------+      +--------+ (Experience)     +----+          ( Food )
 | (Stay)             |      |        |                  |img |
 |      photo         |      | photo  |                  +----+
 |                    |      |        |  Sat 10:30       Menya Inoichi    <- biggest
 +--------------------+      +--------+  start  <- biggest   Ramen • Gion
 $168 per night  <- biggest  Tea ceremony in a ...
 Restored machiya ...        • Culture
 ---------------------       ---------------------       ---------------------
 2 Nights | 4.92 Rating      2 Hours | 4.96 Rating       8 min Walk | $ Price
 Hosted by • Kenji           Hosted by • Mei             Good for • Dinner
 11 – 13 Apr 2025            $58 per guest               $34 for two, estimated
 [View stay] [Save]          [See times] [Add to plan]   [View restaurant] [Add to plan]
```

| Slot | Stay | Experience | Food |
|---|---|---|---|
| Badge | Stay, coral | Experience, violet | Food, amber |
| Photo | Top | Side | Thumbnail |
| Biggest text | Nightly price, "per night" | Start time, "start" | Place name |
| Name line | Listing title, neighbourhood | Experience title, category | Cuisine and area, under the name |
| Stat 1 | Nights | Duration | Walk from stay |
| Stat 2 | Guest rating | Rating | Price level |
| Footer line 1 | Hosted by, host first name | Hosted by, host first name (or "to be confirmed") | Good for, meal |
| Footer line 2 | Dates | Price per guest | Estimated cost for two |
| Action 1, opens details in the card | View stay | See times | View restaurant |
| Action 2, adds to the shortlist | Save, then Saved | Add to plan, then In plan | Add to plan, then In plan |
| Details shown | Property type, highlight, guests, reviews, total | Time, availability, meeting point, total for two | Booking note, opening hours (not in the sample data), cuisine, area, walk |

**Card actions.** Each card has two buttons.

- The first (**View stay**, **See times**, **View restaurant**) opens a short list of details inside the card and records a `card_opened` event. There is no detail page behind it.
- The second (**Save** on a stay, **Add to plan** on an experience or a restaurant) puts the card on the traveller's shortlist and records a `plan_added` event. The button then reads **Saved** or **In plan**, and tapping it again removes the card.

The shortlist appears as a **Your plan** bar above the message box, with one chip per item; tapping a chip removes it. It is kept when new messages are sent, when a reply fails and when Try again is used.

Neither action books, holds or reserves anything. Times, availability and totals in the details are labelled as sample data, the restaurant details say opening hours are not in the sample data, and adding a restaurant does not imply a table is available.

**Row layout.** The three cards sit side by side in one row, in the order Stay, Experience, Food, so they can be compared at a glance. From tablet width up all three share the row. On a phone the row scrolls sideways and snaps card by card, with the next card peeking in. The cards are compact and stretch to the same height, with the buttons pinned to the bottom so they line up.

The Fields tables below list the mock keys for each card. They are a subset; the full shape is in `src/lib/types.ts`.

## Stay card

### Fields

| Field | Mock key | Example value |
|---|---|---|
| Destination | `destination` | Kyoto, Japan |
| Listing title | `listingTitle` | Restored machiya townhouse near Gion |
| Check-in | `checkIn` | 2025-04-11 |
| Check-out | `checkOut` | 2025-04-13 |
| Nightly price (USD) | `nightlyPriceUsd` | 168 |
| Short description | `description` | Private garden and cedar soaking tub. (The pack's Highlight column.) |

## Experience card

### Fields

| Field | Mock key | Example value |
|---|---|---|
| Activity name | `activityName` | Tea ceremony in a 100-year-old machiya |
| Duration | `duration` | 2 hours |
| Day plan, Sat 12 Apr | `dayPlan[0].day`, `dayPlan[0].plan` | Sat 12 Apr · Starts 10:30. Meeting point: Outside Gion-Shijo Station, exit 6. |

The content pack schedules every experience on Sat 12 Apr only, so the day plan has one line. `dayPlan` stays a list so a Sunday line can be added if content for it arrives.

## Food card

### Fields

| Field | Mock key | Example value |
|---|---|---|
| Restaurant name | `restaurantName` | Menya Inoichi |
| Meal type | `mealType` | Dinner |
| Price range | `priceRange` | $ |
| Short description | `description` | Ramen in Gion, 8 min walk from your stay. No reservations - arrive before 18:00. (Built from the pack's Cuisine, Neighbourhood, Walk from Stay and Booking Note columns.) |

## Three use cases

The chat answers three different requests, each with its own stay, experience and food cards built from content pack rows. A message is matched by the words it uses; anything that matches none of them gets the first plan. Every plan is inside the $600 reference budget, and none uses the sold-out E3.

| Use case | Paste this | Rows | Cost for two |
|---|---|---|---|
| Culture and calm | Plan a weekend in Kyoto for two people. We enjoy cultural experiences, Japanese food and quiet neighbourhoods. | S1, E1, F1 | $516 |
| Food first | Plan a food-lover's weekend in Kyoto for two. We want market stalls, street food and a tasting walk with a local cook. | S3, E2, F3 | $449 |
| Hands-on | Plan a hands-on weekend in Kyoto for two. We'd like to make something in a pottery studio and stay somewhere calm by the river. | S2, E4, F2 | $520 |

The field tables above show the first use case. The other two use the same card layout with their own rows.

## Mock response shape

A mock response is sample data that stands in for the assistant's real answer, written in JSON. The chat reads `cardType` to decide which card to draw. The list always holds exactly three items in the order stay, experience, food. Values are left blank here so the shape can be checked without the content; the example values live in each card's Fields table.

```json
[
  { "cardType": "stay", "sample": true, "sourceRow": "",
    "unresolved": [ { "field": "", "reason": "" } ],
    "details": {
      "destination": "", "listingTitle": "",
      "checkIn": "", "checkOut": "",
      "nightlyPriceUsd": null, "description": "",
      "guests": null, "totalUsd": null,
      "imageUrl": null, "imageAlt": "", "imagePosition": "" } },
  { "cardType": "experience", "sample": true, "sourceRow": "",
    "unresolved": [ { "field": "", "reason": "" } ],
    "details": {
      "activityName": "", "duration": "",
      "dayPlan": [
        { "day": "", "plan": "" } ],
      "date": "", "startTime": "", "partySize": null,
      "pricePerGuestUsd": null, "availability": "",
      "imageUrl": null, "imageAlt": "", "imagePosition": "" } },
  { "cardType": "food", "sample": true, "sourceRow": "",
    "unresolved": [ { "field": "", "reason": "" } ],
    "details": {
      "restaurantName": "", "mealType": "",
      "priceRange": "", "description": "",
      "cuisine": "", "area": "", "walkFromStayMin": null,
      "openingHours": null,
      "imageUrl": null, "imageAlt": "", "imagePosition": "" } }
]
```

### Sample content and unresolved fields

Every card carries `sample: true`: the content is sample data, and nothing is booked, held or checked against live inventory. `sourceRow` names the content pack row (S1, E1, F1). `unresolved` lists the fields that are missing or unverified, with the reason.

| Card | Unresolved | Why |
|---|---|---|
| Stay | `imageUrl` | Stock photo for illustration; not this listing. |
| Stay | `checkIn`, `checkOut` | April 2025 sample dates. |
| Stay | `totalUsd` | Pack lists $366 for 2 nights at $168 a night and does not explain the difference. |
| Experience | `imageUrl` | Stock photo for illustration; not this experience. |
| Experience | `date`, `startTime`, `availability` | Sample values, not current availability. |
| Experience | `pricePerGuestUsd` | Sample price, not verified. |
| Food | `imageUrl` | Stock photo for illustration; not this restaurant. |
| Food | `openingHours` | Pack has a booking note only. |
| Food | `walkFromStayMin` | Pack does not say which stay the walk is measured from. |

Apart from the photo fields, the cards do not yet display the new fields; they are in the contract so the layout work can use them.

## Error bubble

Goal from the brief: the traveller recovers from a technical failure without losing progress. The request text stays in the thread, the thread is never empty, and one tap re-sends it.

```
Assistant
+-----------------------------------------------+
|  Sorry, I couldn't put your Kyoto weekend     |
|  together just now. Let's give it another go. |
|               [ Browse stays ]  [ Try again ] |
+-----------------------------------------------+
```

| Part | Value |
|---|---|
| Message | Sorry, I couldn't put your Kyoto weekend together just now. Let's give it another go. |
| Primary button | Try again |
| Secondary button | Browse stays. Opens the existing Kyoto stay search in a new tab, so the chat is kept. |
| Button position | Inside the assistant's chat bubble, bottom right. |
| What Try again does | Re-sends the same trip request. The traveller does not retype anything. The three cards appear in the order Stay, Experience, Food. |
| What is kept | The whole thread: the traveller's original message, the error bubble (without its buttons once used) and any earlier cards. |
| Accessibility | The error text is announced through the thread's live region, and keyboard focus moves to Try again. |
| Forced-failure trigger | A moderator-only **Fail next reply** control. It is on the page only when the address includes `?moderator`. It is one-shot: the next request waits 800 ms, fails, and the control switches itself off. Every request after that works normally, so Try again always succeeds. |
| Events | `failure_injected` when the armed request is sent, `retry_success` when a retry returns the cards (and `card_opened` when View details is tapped on a card). Both are logged to the browser console and kept on `window.__tripPlannerEvents`; nothing is sent anywhere. |

### Steps to fire the trigger (usability test script)

1. Open the live link with `?moderator` added to the end of the address.
2. Tap **Fail next reply** in the top-right corner. It changes to "Next reply will fail".
3. Hand over the device. The traveller types "Plan a weekend in Kyoto for two" and presses Send.
4. The thinking animation plays. Then the error bubble appears and the control resets.
5. The traveller taps **Try again**. The Stay, Experience and Food cards appear in that order.

## Out of scope for this prototype

Booking, live inventory, pricing accuracy, and the fast path for transaction-focused travellers (Intent A). Those stay with the existing search.
