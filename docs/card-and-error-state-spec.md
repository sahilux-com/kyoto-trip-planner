# Trip-Planner Chat – Kyoto Weekend Card Spec (Stay, Experience, Food)

One-page card and error-state spec for the Airbnb conversational trip-planner prototype. It covers the assistant's reply to one exploratory request and the one error state the prototype must recover from. Layout follows `host_reservation_card_spec.md` (Host Inbox Assistant "Upcoming reservation" card): sketch, field list, what makes the card look different, mock response.

**Scenario.** An exploration-focused traveller (Intent B) types: *"Plan a weekend in Kyoto for two people. We enjoy cultural experiences, Japanese food and quiet neighbourhoods."* The assistant replies with three recommendation cards, always in the order **Stay, Experience, Food**. No filters are asked for first; destination, guests and dates come from the chat.

**Fixed sample trip.** Kyoto, Japan · 2 guests · Fri 11 Apr – Sun 13 Apr 2025 · 2 nights. Every card and every mock value uses this trip.

**Rules for all three cards.** Each card has one image placeholder, one line of biggest text and one accent colour. No two cards share the same image placement, biggest-text type or accent colour (see the check table after the Food card).

## Stay card

### Sketch

```
+===============================================+  <- coral top border
|                                               |
|        [ image placeholder: wide banner ]     |
|                                               |
+-----------------------------------------------+
|  Fri 11 Apr – Sun 13 Apr 2025 · 2 nights      |  <- biggest text
|  Machiya townhouse near Gion · Kyoto, Japan   |
|  $185 USD / night                             |
|  Quiet wooden house, 5 min walk to Yasaka.    |
+-----------------------------------------------+
```

### Fields

| Field | Mock key | Example value |
|---|---|---|
| Destination | `destination` | Kyoto, Japan |
| Listing title | `listingTitle` | Machiya townhouse near Gion |
| Check-in | `checkIn` | 2025-04-11 |
| Check-out | `checkOut` | 2025-04-13 |
| Nightly price (USD) | `nightlyPriceUsd` | 185 |
| Short description | `description` | Quiet wooden house, 5 min walk to Yasaka Shrine. |

### What makes this card look different

- Image placeholder: a wide grey banner across the full top of the card.
- Biggest text: the travel dates and night count.
- Accent colour: coral, as a thick top border.
- Shape: tall, image-first. Reads like a listing.

## Experience card

### Sketch

```
+--------+--------------------------------------+
|        |  Arashiyama Bamboo & Tea Walk        |  <- biggest text
| image  |  3 hours                             |
| (tall  |  [SAT] Bamboo grove, Tenryu-ji, tea  |  <- purple day labels
| strip) |  [SUN] Fushimi Inari at sunrise      |
|        |                                      |
+--------+--------------------------------------+
```

### Fields

| Field | Mock key | Example value |
|---|---|---|
| Activity name | `activityName` | Arashiyama Bamboo & Tea Walk |
| Duration | `duration` | 3 hours |
| Day plan, Sat 12 Apr | `dayPlan[0].day`, `dayPlan[0].plan` | Sat 12 Apr · Bamboo grove, Tenryu-ji garden, matcha tasting |
| Day plan, Sun 13 Apr | `dayPlan[1].day`, `dayPlan[1].plan` | Sun 13 Apr · Fushimi Inari gates at sunrise, then checkout |

### What makes this card look different

- Image placeholder: a tall grey strip down the left edge.
- Biggest text: the activity name.
- Accent colour: purple, on the SAT / SUN day labels only.
- Shape: wide, two-column, with a day-by-day list. Reads like a schedule.

## Food card

### Sketch

```
+-----------------------------------------------+
|  Nishiki Market Kaiseki Bar          ( img )  |  <- biggest text; round image, right
|  Dinner · $$$                                 |  <- amber label
|  Seasonal small plates at a 10-seat counter.  |
+-----------------------------------------------+
```

### Fields

| Field | Mock key | Example value |
|---|---|---|
| Restaurant name | `restaurantName` | Nishiki Market Kaiseki Bar |
| Meal type | `mealType` | Dinner |
| Price range | `priceRange` | $$$ |
| Short description | `description` | Seasonal small plates at a 10-seat counter. |

### What makes this card look different

- Image placeholder: a small round thumbnail in the top-right corner.
- Biggest text: the restaurant name.
- Accent colour: amber, on the meal type and price label.
- Shape: short, three lines, no border. Reads like a quick tip.

## Differentiation check

| | Stay | Experience | Food |
|---|---|---|---|
| Image placeholder | Wide banner, top | Tall strip, left | Small circle, top right |
| Biggest text | Dates + nights | Activity name | Restaurant name |
| Accent colour | Coral | Purple | Amber |
| Accent placed on | Top border | Day labels | Meal / price label |
| Card height | Tall | Medium | Short |

No column repeats a value from another column, so the three cards cannot be mistaken for one another at a glance.

## Mock response shape

A mock response is sample data that stands in for the assistant's real answer, written in JSON. The chat reads `cardType` to decide which card to draw. The list always holds exactly three items in the order stay, experience, food. Values are left blank here so the shape can be checked without the content; the example values live in each card's Fields table.

```json
[
  { "cardType": "stay", "details": {
      "destination": "", "listingTitle": "",
      "checkIn": "", "checkOut": "",
      "nightlyPriceUsd": null, "description": "" } },
  { "cardType": "experience", "details": {
      "activityName": "", "duration": "",
      "dayPlan": [
        { "day": "", "plan": "" },
        { "day": "", "plan": "" } ] } },
  { "cardType": "food", "details": {
      "restaurantName": "", "mealType": "",
      "priceRange": "", "description": "" } }
]
```

## Error bubble

Goal from the brief: the traveller recovers from a technical failure without losing progress. The request text stays in the thread, the thread is never empty, and one tap re-sends it.

```
Assistant
+-----------------------------------------------+
|  Sorry, I couldn't put your Kyoto weekend     |
|  together just now. Let's give it another go. |
|                                [ Try again ]  |
+-----------------------------------------------+
```

| Part | Value |
|---|---|
| Message | Sorry, I couldn't put your Kyoto weekend together just now. Let's give it another go. |
| Button label | Try again |
| Button position | Inside the assistant's chat bubble, bottom right. |
| What the button does | Re-sends the same trip request. The traveller does not retype anything. On success the three cards appear in the order Stay, Experience, Food. |
| What is kept | The traveller's original message stays visible above the error bubble. |
| Forced-failure trigger | The page address ends with `?fail=once`. The first request then gets a broken mock response. Every request after that works normally. |

### Steps to fire the trigger (usability test script)

1. Open the live link with `?fail=once` added to the end of the address.
2. Type "Plan a weekend in Kyoto for two" and press Send.
3. The thinking animation plays. Then the error bubble appears.
4. Tap **Try again**. The Stay, Experience and Food cards appear in that order.

## Out of scope for this prototype

Booking, live inventory, pricing accuracy, and the fast path for transaction-focused travellers (Intent A). Those stay with the existing search.
