import { promises as fs } from "fs";
import path from "path";
import { Review } from "../types/restaurant";

const reviewsFilePath = path.join(__dirname, "../data/reviews.json");

export const getAllReviews = async (): Promise<Review[]> => {
  const data = await fs.readFile(reviewsFilePath, "utf-8");

  return JSON.parse(data) as Review[];
};

export const getReviewsByRestaurantId = async (
  restaurantId: string
): Promise<Review[]> => {
  const reviews = await getAllReviews();

  return reviews.filter(
    (review) => review.restaurantId === restaurantId
  );
};

export const hasUserReviewedRestaurant = async (
  userId: string,
  restaurantId: string
): Promise<boolean> => {
  const reviews = await getAllReviews();

  return reviews.some(
    (review) =>
      review.userId === userId &&
      review.restaurantId === restaurantId
  );
};

export const addReview = async (review: Review): Promise<void> => {
  const reviews = await getAllReviews();

  reviews.push(review);

  await fs.writeFile(
    reviewsFilePath,
    JSON.stringify(reviews, null, 2),
    "utf-8"
  );
};