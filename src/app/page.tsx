import { ChatThread } from "@/components/chat/ChatThread";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden bg-paper">
      <div className="paper-wash pointer-events-none absolute inset-x-0 top-0 h-56" aria-hidden="true" />

      <header className="relative z-10 shrink-0">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pt-4 pb-3 text-center">
          <div className="flex items-center gap-2">
            <h1 className="text-[17px] leading-none font-medium tracking-tight text-ink">Trip planner</h1>
            <Badge variant="outline" className="border-ink/15 bg-card/60 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              Prototype
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Kyoto weekend · 2 guests</p>
        </div>
      </header>

      <ChatThread />
    </main>
  );
}
