"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { track } from "@/lib/track";

/**
 * The traveller's plan: the cards they saved or added. It lives above the
 * thread, so it survives new messages, errors and retries.
 *
 * It is a shortlist only. Nothing in it is booked, held or reserved.
 */
export type PlanItem = {
  /** Content pack row, e.g. "S1". The same place in two replies is one item. */
  id: string;
  type: string;
  title: string;
};

type PlanContextValue = {
  items: PlanItem[];
  has: (id: string) => boolean;
  toggle: (item: PlanItem) => void;
};

const PlanContext = createContext<PlanContextValue>({ items: [], has: () => false, toggle: () => {} });

export function PlanProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PlanItem[]>([]);

  const toggle = useCallback(
    (item: PlanItem) => {
      const alreadyIn = items.some((i) => i.id === item.id);
      // Tracked here, not inside the state updater, so it is recorded once per tap.
      if (!alreadyIn) track("plan_added", `${item.type}:${item.id}`);
      setItems((current) =>
        current.some((i) => i.id === item.id) ? current.filter((i) => i.id !== item.id) : [...current, item],
      );
    },
    [items],
  );

  const value = useMemo<PlanContextValue>(
    () => ({ items, has: (id) => items.some((i) => i.id === id), toggle }),
    [items, toggle],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export const usePlan = () => useContext(PlanContext);
