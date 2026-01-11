"use server"
import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { MovieEntry } from "@/models/movie.entry";
import { revalidatePath } from "next/cache";

export async function toggleMovieStatus(movie: any, status: 'WATCHLIST' | 'WATCHED') {
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
}
