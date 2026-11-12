import { kyotoWeekendWorkbook } from "@/data/kyoto-weekend-workbook";
import type { TripPlanResponse } from "@/lib/types";

/**
 * Mock response: fake sample data standing in for the assistant's real answer.
 * Built from row 0 of each workbook sheet. Order is fixed: stay, experience, food.
 */
export const mockTripPlanResponse: TripPlanResponse = [
  { cardType: "stay", details: kyotoWeekendWorkbook.Stay[0] },
  { cardType: "experience", details: kyotoWeekendWorkbook.Experience[0] },
  { cardType: "food", details: kyotoWeekendWorkbook.Food[0] },
];
