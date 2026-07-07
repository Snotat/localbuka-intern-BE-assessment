import { Request, Response, NextFunction } from "express";
import * as pointsService from "../services/points.services";
import { EarnPointsDto } from "../services/points.services";

interface BalanceParams {
  userId: string;
}

export const earnPoints = async (
  req: Request<unknown, unknown, EarnPointsDto>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const entry = await pointsService.earnPoints(req.body);

    res.status(201).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

export const getBalance = async (
  req: Request<BalanceParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const balance = await pointsService.getBalance(req.params.userId);

    res.status(200).json({
      success: true,
      data: balance,
    });
  } catch (error) {
    next(error);
  }
};