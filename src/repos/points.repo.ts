import { promises as fs } from "fs";
import path from "path";
import { PointsLedgerEntry } from "../types/points";

const pointsFilePath = path.join(__dirname, "../data/points.json");

export const getAllPoints = async (): Promise<PointsLedgerEntry[]> => {
  const data = await fs.readFile(pointsFilePath, "utf-8");

  return JSON.parse(data) as PointsLedgerEntry[];
};

export const getPointsByUserId = async (
  userId: string
): Promise<PointsLedgerEntry[]> => {
  const points = await getAllPoints();

  return points
    .filter((entry) => entry.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
};

export const addPointsEntry = async (
  entry: PointsLedgerEntry
): Promise<void> => {
  const points = await getAllPoints();

  points.push(entry);

  await fs.writeFile(
    pointsFilePath,
    JSON.stringify(points, null, 2),
    "utf-8"
  );
};

export const hasCheckedInToday = async (
  userId: string,
  restaurantId: string,
  today: string
): Promise<boolean> => {
  const points = await getAllPoints();

  return points.some(
    (entry) =>
      entry.userId === userId &&
      entry.restaurantId === restaurantId &&
      entry.type === "CHECK_IN" &&
      entry.createdAt.startsWith(today)
  );
};