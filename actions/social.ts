"use server"
import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { FriendRequest } from "@/models/friend.model";
import { revalidatePath } from "next/cache";

export async function searchUsers(query: string) {
  const session = await auth();
  if (!session) return [];

  await connectToDatabase();
  return User.find({
    $and: [
      { _id: { $ne: session.user?.id } },
      {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } }
        ]
      }
    ]
  }).limit(5).lean();
}

export async function sendInvite(receiverId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  await connectToDatabase();
  await FriendRequest.create({
    senderId: session.user.id,
    receiverId,
    status: "PENDING"
  });
  revalidatePath("/social");
}

export async function respondToInvite(requestId: string, status: "ACCEPTED" | "REJECTED") {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  await connectToDatabase();
  const request = await FriendRequest.findById(requestId);

  if (status === "ACCEPTED") {
    await User.findByIdAndUpdate(request.senderId, { $addToSet: { friends: request.receiverId } });
    await User.findByIdAndUpdate(request.receiverId, { $addToSet: { friends: request.senderId } });
  }

  await FriendRequest.findByIdAndDelete(requestId);
  revalidatePath("/social");
}
