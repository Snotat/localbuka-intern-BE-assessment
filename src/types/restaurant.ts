export type PriceRange = "₦" | "₦₦" | "₦₦₦";

export interface Restaurant {
  id: string;
  name: string;
  cuisineType: string;
  latitude: number;
  longitude: number;
  rating: number;
  priceRange: PriceRange;
  reviews?: Review[];
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}