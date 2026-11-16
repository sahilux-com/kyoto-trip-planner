import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Stock photo to show. Without one, the warm grey stand-in is drawn instead. */
  src?: string | null;
  alt?: string;
  /** `sizes` hint for the browser, e.g. "(min-width: 640px) 640px, 100vw". */
  sizes?: string;
  /** CSS object-position, to keep the subject in frame when the photo is cropped. */
  position?: string;
  label?: string;
  icon?: LucideIcon;
  iconClassName?: string;
};

/** A card's photo slot: a cropped stock photo, or a grey stand-in when there is none. */
export function PhotoPlaceholder({ className, src, alt = "", sizes, position, label, icon: Icon, iconClassName }: Props) {
  if (src) {
    return (
      <div className={cn("photo-placeholder relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading="eager"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "photo-placeholder flex flex-col items-center justify-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-ink/45 uppercase",
        className,
      )}
    >
      {Icon && <Icon className={cn("size-5", iconClassName)} strokeWidth={1.6} />}
      {label}
    </div>
  );
}
