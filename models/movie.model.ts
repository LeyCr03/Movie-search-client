import mongoose, { Schema, model, models } from "mongoose";

const MovieEntrySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tmdbId: { type: Number, required: true },
  title: { type: String, required: true },
  posterPath: { type: String },
  status: { 
    type: String, 
    enum: ["WATCHLIST", "WATCHED"], 
    required: true 
  },
  addedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure a user can't have the same movie twice in the same status
MovieEntrySchema.index({ userId: 1, tmdbId: 1, status: 1 }, { unique: true });

export const MovieEntry = models.MovieEntry || model("MovieEntry", MovieEntrySchema);
