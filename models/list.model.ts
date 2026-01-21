import mongoose, { Schema, model, models } from "mongoose";

const ListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  movies: [{
    tmdbId: Number,
    title: String,
    posterPath: String,
    addedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const List = models.List || model("List", ListSchema);
