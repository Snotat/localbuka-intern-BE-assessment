import { randomUUID } from "crypto";
import { Review } from "../types/restaurant";
import {
  addReview,
  getReviewsByRestaurantId,
  hasUserReviewedRestaurant,
} from "../repos/reviews.repo";
import {
  getAllRestaurants,
  saveRestaurants,
} from "../repos/restaurant.repo";
import { ApiError } from "../utils/APIError";

interface CreateReviewInput {
  userId: string;
  rating: number;
  comment?: string;
}

export const createReview = async (
  restaurantId: string,
  body: CreateReviewInput
): Promise<Review> => {
  const { userId, rating, comment } = body;

  const restaurants = await getAllRestaurants();

  const restaurant = restaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be an integer between 1 and 5");
  }

  const alreadyReviewed = await hasUserReviewedRestaurant(
    userId,
    restaurantId
  );

  if (alreadyReviewed) {
    throw new ApiError(
      409,
      "User has already reviewed this restaurant"
    );
  }

  const review: Review = {
    id: randomUUID(),
    restaurantId,
    userId,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  };

  await addReview(review);

  // Update restaurant rating
  const reviews = await getReviewsByRestaurantId(restaurantId);

  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) /
    reviews.length;

  restaurant.rating = Number(average.toFixed(1));

  await saveRestaurants(restaurants);

  return review;
};