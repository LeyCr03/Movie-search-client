import { tmdb } from "@/lib/tmdb";
import Image from "next/image";
import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { MovieEntry } from "@/models/movie.model";
import { MovieActions } from "@/components/composition/movies/MovieActions";
import { User } from "@/models/user.model";
import { List } from "@/models/list.model";

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const session = await auth();

  const movie = await tmdb.getMovieDetails(id);

  let currentStatus = null;
  if (session?.user?.id) {
    await connectToDatabase();
    const entry = await MovieEntry.findOne({ userId: session.user.id, tmdbId: id });
    currentStatus = entry?.status || null;
  }

  let friends = [];
  const userId = session?.user?.id;

  if (session?.user?.id) {
    await connectToDatabase();
    const userDoc = await User.findById(session.user.id).populate("friends").lean();
    friends = (userDoc?.friends || []).map((f: any) => ({
      _id: f._id.toString(),
      name: f.name
    }));
  }

  const userListsDoc = await List.find({ userId }).lean();
  const userLists = userListsDoc.map((l: any) => ({
    _id: l._id.toString(),
    name: l.name
  }));

  return (
    <main className="h-[90vh] w-full  pb-20">

      <div className="absolute inset-0 -z-1">
        <img
          src={tmdb.getImageUrl(movie.poster_path)}
          alt={movie.title}

          className="w-[100vw] h-[100vh] object-cover opacity-15"
        />
      </div>

      <div className="container flex justify-center mx-auto py-40 px-4 z-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-64 flex-shrink-0 overflow-hidden rounded-xl border border-border shadow-2xl">
            <Image
              src={tmdb.getImageUrl(movie.poster_path)}
              alt={movie.title}
              width={500}
              height={750}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-end py-4">
            <h1 className="text-5xl font-bold tracking-tighter mb-2 text-muted-foreground">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-6 text-xl text-foreground">
              <span>{movie.release_date.split("-")[0]}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span className="">★ {movie.vote_average.toFixed(1)}</span>
            </div>

            <p className="max-w-2xl leading-relaxed mb-8">
              {movie.overview}
            </p>

            <MovieActions
              movie={movie}
              currentStatus={currentStatus}
              friends={friends}
              userLists={userLists}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
