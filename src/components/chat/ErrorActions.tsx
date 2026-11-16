"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { BROWSE_STAYS_URL } from "@/components/chat/messages";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { describedBy: string; onRetry: () => void };

/** Buttons inside the error bubble, bottom right. Focus lands on Try again when the error appears. */
export function ErrorActions({ describedBy, onRetry }: Props) {
  const retryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    retryRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="mt-3.5 flex flex-wrap items-center justify-end gap-2">
      <a
        href={BROWSE_STAYS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-4")}
      >
        Browse stays
        <ArrowUpRight data-icon="inline-end" />
      </a>
      <Button
        ref={retryRef}
        type="button"
        size="lg"
        onClick={onRetry}
        aria-describedby={describedBy}
        className="rounded-full px-4"
      >
        <RotateCw data-icon="inline-start" />
        Try again
      </Button>
    </div>
  );
}
