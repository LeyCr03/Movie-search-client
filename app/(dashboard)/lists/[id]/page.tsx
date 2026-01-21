import { deleteList, removeMovieFromList } from "@/actions/list";
import { MovieCard } from "@/components/composition/movies/MovieCard";
import { Button } from "@/components/atoms/ui/button";
import { List as ListModel } from "@/models/list.model";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ListDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const list = await ListModel.findById(id).lean();
  const handleDeleteList = async () => {
  "use server"
  await deleteList(id);
  redirect("/lists");
};

  return (
    <main className="container mx-auto px-4 py-20">
    <header className="flex items-end justify-between mb-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter">{list.name}</h1>
        <p className="text-muted-foreground">A collection of {list.movies.length} films.</p>
      </div>
      
      <form action={handleDeleteList}>
        <Button variant="ghost" className="text-xs text-red-600">
          Delete Collection
        </Button>
      </form>
    </header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {list.movies.map((movie: any) => (
          <div key={movie.tmdbId} className="space-y-2">
            <MovieCard movie={{ id: movie.tmdbId, title: movie.title, poster_path: movie.posterPath }} className="grayscale-0" />
            <form action={async () => { "use server"; await removeMovieFromList(id, movie.tmdbId); }}>
              <Button variant="ghost" size="sm" className="w-full text-[10px] text-muted-foreground hover:text-destructive">
                <Trash2 size={12} className="mr-1" /> Remove
              </Button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
