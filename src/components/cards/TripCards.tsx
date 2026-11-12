import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { FoodCard } from "@/components/cards/FoodCard";
import { StayCard } from "@/components/cards/StayCard";
import type { TripCard } from "@/lib/types";

function renderCard(card: TripCard) {
  switch (card.cardType) {
    case "stay":
      return <StayCard details={card.details} />;
    case "experience":
      return <ExperienceCard details={card.details} />;
    case "food":
      return <FoodCard details={card.details} />;
  }
}

/** Draws the cards in the order the response gives them, staggering their entrance. */
export function TripCards({ cards }: { cards: TripCard[] }) {
  return (
    <ol className="space-y-3" aria-label="Trip recommendations">
      {cards.map((card, i) => (
        <li
          key={card.cardType}
          className="animate-card-in opacity-0"
          style={{ animationDelay: `${i * 140}ms` }}
        >
          {renderCard(card)}
        </li>
      ))}
    </ol>
  );
}
