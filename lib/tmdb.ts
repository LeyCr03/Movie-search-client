const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams({
    ...params,
    language: "en-US",
  }).toString();

  const res = await fetch(`${TMDB_API_URL}${endpoint}?${query}`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) throw new Error("Failed to fetch from TMDB");
  return res.json();
}

export const tmdb = {
  getPopular: () => fetchTMDB<any>("/movie/popular"),
  searchMovies: (query: string) => fetchTMDB<any>("/search/movie", { query }),
  getMovieDetails: (id: string) => fetchTMDB<any>(`/movie/${id}`),
  getCredits: (id: string) => fetchTMDB<any>(`/movie/${id}/credits`),
  getImageUrl: (path: string, size: "w500" | "original" = "w500") => 
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.png",
};
