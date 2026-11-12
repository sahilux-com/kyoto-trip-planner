type Props = { className?: string; label?: string };

/** Grey box standing in for a photo. */
export function PhotoPlaceholder({ className = "", label = "Photo" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-[linear-gradient(135deg,#e7e5e4,#d6d3d1)] text-[11px] font-medium uppercase tracking-wider text-stone-500 ${className}`}
    >
      {label}
    </div>
  );
}
