import { randomUUID } from "crypto";
import { PointsLedgerEntry, PointsType } from "../types/points";
import {
  addPointsEntry,
  getPointsByUserId,
  hasCheckedInToday,
} from "../repos/points.repo";
import { getRestaurantById } from "../repos/restaurant.repo";
import { ApiError } from "../utils/APIError";

export interface EarnPointsDto {
  userId: string;
  restaurantId: string;
  type: PointsType;
}

export const earnPoints = async (
  body: EarnPointsDto
): Promise<PointsLedgerEntry> => {
  const { userId, restaurantId, type } = body;

  const restaurant = await getRestaurantById(restaurantId);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  const today = new Date().toISOString().split("T")[0];

  if (type === "CHECK_IN") {
    const alreadyCheckedIn = await hasCheckedInToday(
      userId,
      restaurantId,
      today
    );

    if (alreadyCheckedIn) {
      throw new ApiError(
        409,
        "User has already checked in today"
      );
    }
  }

  const points = type === "CHECK_IN" ? 50 : 20;

  const entry: PointsLedgerEntry = {
    id: randomUUID(),
    userId,
    restaurantId,
    type,
    points,
    createdAt: new Date().toISOString(),
  };

  await addPointsEntry(entry);

  return entry;
};

export const getBalance = async (userId: string) => {
  const ledger = await getPointsByUserId(userId);

  const totalPoints = ledger.reduce(
    (sum, entry) => sum + entry.points,
    0
  );

  return {
    totalPoints,
    ledger,
  };
};