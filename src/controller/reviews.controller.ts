
import * as reviewService from "../services/reviews.services";
import { Request, Response, NextFunction } from "express";

interface ReviewParams {
  id: string;
}
interface CreateReviewRequest {
  userId: string;
  rating: number;
  comment?: string;
}

export const createReview = async (
  req: Request<ReviewParams, unknown, CreateReviewRequest>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const review = await reviewService.createReview(
      req.params.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};