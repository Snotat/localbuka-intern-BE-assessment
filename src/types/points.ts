export type PointsType = "CHECK_IN" | "REVIEW";

export interface PointsLedgerEntry {
  id: string;
  userId: string;
  type: PointsType;
  points: number;
  restaurantId: string;
  createdAt: string;
}