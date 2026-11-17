import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { FoodCard } from "@/components/cards/FoodCard";
import { StayCard } from "@/components/cards/StayCard";
import type { TripCard } from "@/lib/types";

function renderCard(card: TripCard) {
  switch (card.cardType) {
    case "stay":
      return <StayCard details={card.details} sourceRow={card.sourceRow} />;
    case "experience":
      return <ExperienceCard details={card.details} sourceRow={card.sourceRow} />;
    case "food":
      return <FoodCard details={card.details} sourceRow={card.sourceRow} />;
  }
}

/**
 * Draws the cards side by side, in the order the response gives them.
 * From tablet width up all three share the row. On a phone the row scrolls
 * sideways and snaps card by card, with the next card peeking in.
 */
export function TripCards({ cards }: { cards: TripCard[] }) {
  return (
    <ol
      className="-mx-4 flex snap-x snap-mandatory scroll-px-4 items-stretch gap-2.5 overflow-x-auto px-4 pt-1 pb-5 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 md:pb-1 [&::-webkit-scrollbar]:hidden"
      aria-label="Trip recommendations"
    >
      {cards.map((card, i) => (
        <li
          key={card.cardType}
          className="w-[16.5rem] shrink-0 snap-start animate-card-in opacity-0 md:w-auto md:min-w-0 md:flex-1 md:basis-0"
          style={{ animationDelay: `${i * 140}ms` }}
        >
          {renderCard(card)}
        </li>
      ))}
    </ol>
  );
}
