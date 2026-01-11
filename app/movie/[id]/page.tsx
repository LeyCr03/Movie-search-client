import { tmdb } from "@/lib/tmdb";
import Image from "next/image";
import { auth } from "@/lib/auth";
import  connectToDatabase  from "@/lib/mongodb";
import { MovieEntry } from "@/models/movie.entry";
import { MovieActions } from "@/components/composition/movies/MovieActions";

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  
  // Fetch Movie Data & Credits (for Director/Cast)
  const movie = await tmdb.getMovieDetails(id);
  
  // Check if movie is already in user's library
  let currentStatus = null;
  if (session?.user?.id) {
    await connectToDatabase();
    const entry = await MovieEntry.findOne({ userId: session.user.id, tmdbId: id });
    currentStatus = entry?.status || null;
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-background  to-black/90 pb-20 flex justify-center">

      <div className="container mx-auto mt-20 px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <div className="w-64 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
            <Image
              src={tmdb.getImageUrl(movie.poster_path)}
              alt={movie.title}
              width={500}
              height={750}
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-end py-4">
            <h1 className="text-5xl font-bold tracking-tighter mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm mb-6">
              <span>{movie.release_date.split("-")[0]}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span className="text-yellow-500">★ {movie.vote_average.toFixed(1)}</span>
            </div>
            
            <p className="max-w-2xl leading-relaxed mb-8">
              {movie.overview}
            </p>

            {/* Action Buttons Component */}
            <MovieActions movie={movie} currentStatus={currentStatus} />
          </div>
        </div>
      </div>
    </main>
  );
}
