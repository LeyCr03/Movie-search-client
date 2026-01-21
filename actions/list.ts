"use server"
import { auth } from "@/lib/auth";
import  connectToDatabase from "@/lib/mongodb";
import { List } from "@/models/list.model";
import { revalidatePath } from "next/cache";

export async function createList(name: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  await connectToDatabase();
  const newList = await List.create({ userId: session.user.id, name, movies: [] });
  
  revalidatePath("/lists");
  return { success: true, listId: newList._id.toString() };
}

export async function addMovieToList(listId: string, movie: any) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  await connectToDatabase();
  await List.updateOne(
    { _id: listId, userId: session.user.id },
    { $addToSet: { movies: { 
        tmdbId: movie.id, 
        title: movie.title, 
        posterPath: movie.poster_path 
    }}}
  );

  revalidatePath(`/lists/${listId}`);
  return { success: true };
}

export async function removeMovieFromList(listId: string, tmdbId: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  await connectToDatabase();
  await List.updateOne(
    { _id: listId, userId: session.user.id },
    { $pull: { movies: { tmdbId } } }
  );

  revalidatePath(`/lists/${listId}`);
  return { success: true };
}

export async function deleteList(listId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  await connectToDatabase();
  await List.deleteOne({ _id: listId, userId: session.user.id });

  revalidatePath("/lists");
  return { success: true };
}
