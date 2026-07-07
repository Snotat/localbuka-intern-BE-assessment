import {
  getAllRestaurants,
  getRestaurantById as findRestaurantById,
} from "../repos/restaurant.repo";
import { getReviewsByRestaurantId } from "../repos/reviews.repo";
import { haversine } from "../utils/haversine";
import { Restaurant } from "../types/restaurant";

interface RestaurantQuery {
  search?: string;
  latitude?: string;
  longitude?: string;
}

export const getRestaurants = async (
  query: RestaurantQuery
): Promise<Restaurant[]> => {
  const { search, latitude, longitude } = query;

  let restaurants = await getAllRestaurants();

  if (search) {
    restaurants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (latitude && longitude) {
    const userLatitude = Number(latitude);
    const userLongitude = Number(longitude);

    restaurants = restaurants
      .map((restaurant) => ({
        ...restaurant,
        distance: haversine(
          userLatitude,
          userLongitude,
          restaurant.latitude,
          restaurant.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .map(({ distance, ...restaurant }) => restaurant);
  }

  return restaurants;
};

export const getRestaurantById = async (id: string) => {
  const restaurant = await findRestaurantById(id);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const reviews = await getReviewsByRestaurantId(id);

  return {
    ...restaurant,
    reviews,
  };
};