import { Schema, model, Document, Types } from "mongoose";

export interface ILedgerEntry {
  userId: Types.ObjectId;
  restaurantId: Types.ObjectId;
  type: "CHECK_IN" | "REVIEW";
  points: number;
  createdAt: Date;
}

const ledgerSchema = new Schema<ILedgerEntry>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    type: {
      type: String,
      enum: ["CHECK_IN", "REVIEW"],
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model<ILedgerEntry>(
  "LedgerEntry",ledgerSchema
);