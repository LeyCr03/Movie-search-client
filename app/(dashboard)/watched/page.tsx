import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { MovieEntry } from "@/models/movie.model";
import { MovieCard } from "@/components/composition/movies/MovieCard";
import { redirect } from "next/navigation";

export default async function WatchedPage() {
  const session = await auth();

  if (!session?.user) redirect("/api/auth/signin");

  await connectToDatabase();

  const entries = await MovieEntry.find({
    userId: session.user.id,
    status: "WATCHED"
  }).sort({ addedAt: -1 });

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tighter">Watched</h1>
        <p className="text-zinc-500 text-sm">Movies you have already seen.</p>
      </header>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl">
          <p className="text-zinc-500">You haven't marked any movies as seen yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {entries.map((entry) => (
            <MovieCard
              className='grayscale-0'
              key={entry.tmdbId}
              movie={{
                id: entry.tmdbId,
                title: entry.title,
                poster_path: entry.posterPath
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
