import Image from "next/image";

/**
 * The assistant's profile picture: the orange character from OpenDots
 * (github.com/CopilotKit/OpenDots, MIT; licence in public/avatars/).
 * It is decorative, so screen readers skip it.
 */
export function AssistantAvatar() {
  return (
    <span
      aria-hidden="true"
      data-assistant-avatar
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-100 ring-1 ring-orange-200/80"
    >
      <Image
        src="/avatars/dot-orange.png"
        alt=""
        width={36}
        height={36}
        loading="eager"
        draggable={false}
        className="size-8 object-contain"
      />
    </span>
  );
}
