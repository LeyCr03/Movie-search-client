"use server"
import { auth } from "@/lib/auth";
import  connectToDatabase from "@/lib/mongodb";
import { Recommendation } from "@/models/recommendation.model";
import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";

export async function recommendToFriends(friendIds: string[], movie: any) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const userId = session.user.id;

    await connectToDatabase();
    const sender = await User.findById(userId);

    if (!sender) {
      return { error: "Sender not found" };
    }

    const recommendations = friendIds.map(friendId => ({
      senderId: userId,
      senderName: sender.name,
      receiverId: friendId,
      tmdbId: movie.id,
      movieTitle: movie.title,
      posterPath: movie.poster_path,
    }));

    await Recommendation.insertMany(recommendations);
    
    revalidatePath("/social");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to send recommendations" };
  }
}

