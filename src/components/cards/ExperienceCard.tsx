import { PhotoPlaceholder } from "@/components/cards/PhotoPlaceholder";
import type { ExperienceDetails } from "@/lib/types";

const dayLabel = (day: string) => day.slice(0, 3).toUpperCase();

/** Experience: tall photo strip on the left, activity name biggest, purple day labels. */
export function ExperienceCard({ details }: { details: ExperienceDetails }) {
  return (
    <article
      data-card="experience"
      className="flex overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
    >
      <PhotoPlaceholder className="w-24 shrink-0 self-stretch" label="Photo" />
      <div className="min-w-0 flex-1 space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">Experience</p>
        <h3 className="text-xl font-semibold leading-tight text-stone-900">{details.activityName}</h3>
        <p className="text-sm text-stone-600">{details.duration}</p>
        <ul className="space-y-1.5 pt-1">
          {details.dayPlan.map((item) => (
            <li key={item.day} className="flex items-start gap-2 text-sm text-stone-700">
              <span
                title={item.day}
                className="mt-0.5 shrink-0 rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-bold tracking-wide text-violet-700"
              >
                {dayLabel(item.day)}
              </span>
              <span>{item.plan}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
