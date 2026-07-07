import { Restaurant, PriceRange } from "../types/restaurant";

const isPriceRange = (value: unknown): value is PriceRange => {
  return value === "₦" || value === "₦₦" || value === "₦₦₦";
};

export const parseRestaurant = (raw: unknown): Restaurant => {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid restaurant data.");
  }

  const data = raw as Record<string, unknown>;

  const id = data.id;
  const name = data.name;
  const cuisineType = data.cuisineType ?? data.cuisine_type;
  const latitude = Number(data.latitude);
  const longitude = Number(data.longitude);
  const rating = Number(data.rating);
  const priceRange = data.priceRange ?? data.price_range;

  if (typeof id !== "string") {
    throw new Error("Restaurant id is required.");
  }

  if (typeof name !== "string") {
    throw new Error("Restaurant name is required.");
  }

  if (typeof cuisineType !== "string") {
    throw new Error("Restaurant cuisineType is required.");
  }

  if (Number.isNaN(latitude)) {
    throw new Error("Restaurant latitude is invalid.");
  }

  if (Number.isNaN(longitude)) {
    throw new Error("Restaurant longitude is invalid.");
  }

  if (Number.isNaN(rating)) {
    throw new Error("Restaurant rating is invalid.");
  }

  if (!isPriceRange(priceRange)) {
    throw new Error("Restaurant priceRange is invalid.");
  }

  return {
    id,
    name,
    cuisineType,
    latitude,
    longitude,
    rating,
    priceRange,
  };
};