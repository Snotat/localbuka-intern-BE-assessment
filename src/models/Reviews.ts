import { Schema, model, Types } from "mongoose";

export interface IReview {
  restaurantId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model<IReview>("Review", reviewSchema);