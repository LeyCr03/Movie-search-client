import { auth } from "@/lib/auth";
import  connectToDatabase  from "@/lib/mongodb";
import { MovieEntry } from "@/models/movie.model";
import { MovieCard } from "@/components/composition/movies/MovieCard";
import { redirect } from "next/navigation";

export default async function WatchlistPage() {
  const session = await auth();
  
  // Protect the route
  if (!session?.user) redirect("/api/auth/signin");

  await connectToDatabase();
  
  // Fetch movies from DB for this user
  const entries = await MovieEntry.find({ 
    userId: session.user.id, 
    status: "WATCHLIST" 
  }).sort({ addedAt: -1 }); 

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tighter">Watchlist</h1>
        <p className="text-zinc-500 text-sm">Movies you're planning to see.</p>
      </header>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl">
          <p className="text-zinc-500">Your watchlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {entries.map((entry) => (
            <MovieCard 
            className="opacity-90"
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
