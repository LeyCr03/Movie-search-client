import mongoose, { Schema, model, models } from "mongoose";

const FriendRequestSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { 
    type: String, 
    enum: ["PENDING", "ACCEPTED", "REJECTED"], 
    default: "PENDING" 
  },
}, { timestamps: true });

export const FriendRequest = models.FriendRequest || model("FriendRequest", FriendRequestSchema);
