import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String },
  favorites: [{
    tmdbId: Number,
    title: String,
    posterPath: String
  }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });



export const User = models.User || model("User", UserSchema);
