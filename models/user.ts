import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  // Array of User IDs who are confirmed friends
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);
