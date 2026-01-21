"use server"
import { auth } from "@/lib/auth";
import  connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    if (!name || name.length < 2) return { error: "Name is too short" };

    await connectToDatabase();
    await User.findByIdAndUpdate(session.user.id, { name });
    
    revalidatePath("/profile");
    return { success: "Profile updated successfully" };
  } catch (e) {
    return { error: "Failed to update profile" };
  }
}

export async function setFavorite(slotIndex: number, movie: any) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await connectToDatabase();
    const user = await User.findById(session.user.id);
    
    // 1. Initialize an array of 3 if it doesn't exist or is the wrong length
    let newFavorites = user.favorites && user.favorites.length === 3 
      ? [...user.favorites] 
      : [null, null, null];

    // 2. Update the specific slot
    // We map TMDB's snake_case to our camelCase
    newFavorites[slotIndex] = {
      tmdbId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path // Ensure this is the string path
    };

    // 3. Save using findByIdAndUpdate to ensure the array is overwritten correctly
    await User.findByIdAndUpdate(
      session.user.id, 
      { $set: { favorites: newFavorites } },
      { new: true }
    );

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Error setting favorite:", error);
    return { error: "Failed to save favorite" };
  }
}

