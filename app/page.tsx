
import { tmdb } from "@/lib/tmdb";
import { SearchBar } from "@/components/composition/movies/SearchBar";
import { MovieCard } from "@/components/composition/movies/MovieCard";
import { Copyright } from "lucide-react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; 
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  
  const data = query 
    ? await tmdb.searchMovies(query) 
    : await tmdb.getPopular();

  const movies = data.results || [];

  return (
    <main className="container mx-auto px-4 py-10 ">
      <div className="flex flex-col items-center mb-12 space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter">Searching for a film?</h1>
        <SearchBar />
      </div>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
          {query ? `Results for: ${query}` : "Popular Movies"}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {movies.length === 0 && (
          <p className="text-center text-zinc-500 mt-20">No movies found.</p>
        )}
      </section>
      <footer className="mt-10 flex justify-center items-center gap-2 text-zinc-500">
        <Copyright size={25}/> 
        <h2>Copyright by <span className="font-bold">CINESPHERE.</span> All rights reserved</h2>
      </footer>
    </main>
  );
}

