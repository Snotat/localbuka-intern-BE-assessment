import { Schema, model } from "mongoose";

export interface IRestaurant {
  name: string;
  cuisineType: string;
  latitude: number;
  longitude: number;
  rating: number;
  priceRange: "₦" | "₦₦" | "₦₦₦";
}

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cuisineType: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,

    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    priceRange: {
      type: String,
      enum: ["₦", "₦₦", "₦₦₦"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IRestaurant>("Restaurant", restaurantSchema);