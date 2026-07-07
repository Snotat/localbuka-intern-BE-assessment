import { promises as fs } from "fs";
import path from "path";
import { Restaurant } from "../types/restaurant";
import { parseRestaurant } from "../validator/parseRestaurant";

const restaurantsFilePath = path.join(
  __dirname,
  "../data/restaurants.json"
);

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const data = await fs.readFile(restaurantsFilePath, "utf-8");

  const raw = JSON.parse(data) as unknown[];

  return raw.map(parseRestaurant);
};

export const getRestaurantById = async (
  id: string
): Promise<Restaurant | undefined> => {
  const restaurants = await getAllRestaurants();

  return restaurants.find((restaurant) => restaurant.id === id);
};

export const saveRestaurants = async (
  restaurants: Restaurant[]
): Promise<void> => {
  await fs.writeFile(
    restaurantsFilePath,
    JSON.stringify(restaurants, null, 2),
    "utf-8"
  );
};