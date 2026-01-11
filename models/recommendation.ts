
import mongoose, { Schema, model, models } from "mongoose";

const RecommendationSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tmdbId: { type: Number, required: true },
  movieTitle: { type: String, required: true },
  posterPath: { type: String },
  message: { type: String, maxLength: 200 },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export const Recommendation = models.Recommendation || model("Recommendation", RecommendationSchema);
