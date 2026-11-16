import { Clock, Image as ImageIcon } from "lucide-react";
import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ExperienceDetails } from "@/lib/types";

const dayLabel = (day: string) => day.slice(0, 3).toUpperCase();

/** Experience: tall photo strip on the left, activity name biggest, purple day labels. Reads like a schedule. */
export function ExperienceCard({ details }: { details: ExperienceDetails }) {
  return (
    <Card
      data-card="experience"
      className="flex-row gap-0 rounded-3xl py-0 shadow-[0_14px_34px_-24px_rgb(28_25_23/0.4)]"
    >
      <PhotoPlaceholder
        className="w-24 shrink-0 self-stretch sm:w-36"
        src={details.imageUrl}
        alt={details.imageAlt}
        position={details.imagePosition}
        sizes="(min-width: 640px) 144px, 96px"
        label="Photo"
        icon={ImageIcon}
      />
      <div className="min-w-0 flex-1 space-y-2.5 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-violet-700 uppercase">Experience</p>
        <h3 className="text-[19px] leading-[1.25] font-medium tracking-tight text-ink sm:text-[21px]">{details.activityName}</h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {details.duration}
        </p>
        <ul className="space-y-2 border-t border-dashed border-border pt-3">
          {details.dayPlan.map((item) => (
            <li key={item.day} className="flex items-start gap-2.5 text-sm leading-snug text-ink">
              <Badge
                title={item.day}
                className="mt-px h-5 rounded-md bg-violet-100 px-1.5 text-[10px] font-bold tracking-wider text-violet-800"
              >
                {dayLabel(item.day)}
              </Badge>
              <span>{item.plan}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
