const dayFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "Sat 12 Apr" */
export const formatDay = (iso: string) => dayFmt.format(toDate(iso)).replace(",", "");

/** "Fri 11 Apr – Sun 13 Apr 2025 · 2 nights" */
export function formatStayDates(checkIn: string, checkOut: string): string {
  const start = toDate(checkIn);
  const end = toDate(checkOut);
  const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  const year = end.getUTCFullYear();
  return `${dayFmt.format(start)} – ${dayFmt.format(end)} ${year} · ${nights} night${nights === 1 ? "" : "s"}`;
}

export const formatUsd = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
