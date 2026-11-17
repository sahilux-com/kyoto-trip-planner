import Image from "next/image";

/**
 * The assistant's profile picture: the orange character from OpenDots
 * (github.com/CopilotKit/OpenDots, MIT; licence in public/avatars/).
 *
 * The source picture is a full-body character, so it is zoomed in from the top
 * to frame the face, the way a profile photo is cropped. It is served as the
 * original 160px file (not re-compressed) so it stays sharp on high-density
 * screens. It is decorative, so screen readers skip it.
 */
export function AssistantAvatar() {
  return (
    <span
      aria-hidden="true"
      data-assistant-avatar
      className="relative block size-10 shrink-0 overflow-hidden rounded-full bg-orange-100 shadow-[0_2px_8px_-3px_rgb(234_88_12/0.5)] ring-1 ring-orange-200"
    >
      <Image
        src="/avatars/dot-orange.png"
        alt=""
        width={160}
        height={160}
        unoptimized
        draggable={false}
        className="absolute inset-0 size-full origin-[50%_22%] scale-[1.55] object-contain"
      />
    </span>
  );
}
