import { ChatThread } from "@/components/chat/ChatThread";

export default function Page() {
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-stone-100">
      <header className="z-10 shrink-0 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
          <div className="h-8 w-8 rounded-full bg-coral" aria-hidden="true" />
          <div className="leading-tight">
            <h1 className="text-[15px] font-semibold text-stone-900">Trip planner</h1>
            <p className="text-xs text-stone-500">Kyoto weekend · 2 guests</p>
          </div>
        </div>
      </header>
      <ChatThread />
    </main>
  );
}
