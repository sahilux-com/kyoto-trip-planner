/** Events the usability sessions look for. Nothing is sent anywhere. */
export type TrackEvent = "failure_injected" | "retry_success";

type TrackedEvent = { event: TrackEvent; at: string };

declare global {
  interface Window {
    __tripPlannerEvents?: TrackedEvent[];
  }
}

/**
 * Records an event in the page only: it is logged to the console and kept on
 * `window.__tripPlannerEvents` so a moderator can read it back after a session.
 */
export function track(event: TrackEvent) {
  const entry: TrackedEvent = { event, at: new Date().toISOString() };
  (window.__tripPlannerEvents ??= []).push(entry);
  console.info("[track]", entry.event, entry.at);
}
