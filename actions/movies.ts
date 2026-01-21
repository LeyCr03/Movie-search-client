"use server"
import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { tmdb } from "@/lib/tmdb";
import { MovieEntry } from "@/models/movie.model";
import { revalidatePath } from "next/cache";

export async function toggleMovieStatus(movie: any, status: 'WATCHLIST' | 'WATCHED') {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "You must be logged in" };


    await connectToDatabase();

    await MovieEntry.findOneAndUpdate(
      { userId: session.user.id, tmdbId: movie.id },
      {
        status,
        title: movie.title,
        posterPath: movie.poster_path,
        addedAt: new Date()
      },
      { upsert: true }
    );

    revalidatePath(`/movie/${movie.id}`);
    revalidatePath("/watchlist");
    revalidatePath("/watched");
    return { success: true, error: null };
  } catch (error: any) {
    if (error.message.includes('ETIMEDOUT') || error.message.includes('ENOTFOUND')) {
      return { success: false, error: "Database connection failed. Are you offline?" };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function searchMoviesAction(query: string) {
  if (!query || query.length < 2) return [];
  const data = await tmdb.searchMovies(query);
  return data.results.slice(0, 5);
}


export async function removeMovieFromLibrary(tmdbId: number) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    await connectToDatabase();
    await MovieEntry.findOneAndDelete({
      userId: session.user.id,
      tmdbId: tmdbId
    });

    revalidatePath("/watchlist");
    revalidatePath("/watched");
    revalidatePath(`/movie/${tmdbId}`);

    return { success: true };
  } catch (error) {
    return { error: "Failed to remove movie" };
  }
}

