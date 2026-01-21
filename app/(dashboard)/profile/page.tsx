import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { MovieEntry } from "@/models/movie.model";
import { Recommendation } from "@/models/recommendation.model";
import { FavoriteSlot } from "@/components/atoms/user/FavoriteSlot";
import { ProfileForm } from "@/components/atoms/user/ProfileForm";
import { List } from "@/models/list.model";

export default async function ProfilePage() {
  const session = await auth();
  await connectToDatabase();

  const user = await User.findById(session?.user?.id).lean(); // Use .lean() for plain JS objects 
  const watchedCount = await MovieEntry.countDocuments({ userId: user._id, status: "WATCHED" });
  const watchlistCount = await MovieEntry.countDocuments({ userId: user._id, status: "WATCHLIST" });
  const recsCount = await Recommendation.countDocuments({ receiverId: user._id });
  const listsCount = await List.countDocuments({ userId: user._id });

  return (
    <main className="container mx-auto max-w-4xl px-4 py-20 space-y-20">
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter">{user.name}</h1>
        <p className="text-zinc-500">{user.email}</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-500 text-center">Favorite Films</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => {
            const favoriteData = user.favorites && user.favorites[i] ? {
              title: user.favorites[i].title,
              posterPath: user.favorites[i].posterPath,
              tmdbId: user.favorites[i].tmdbId
            } : null;

            return (
              <FavoriteSlot
                key={i}
                index={i}
                initialData={favoriteData}
              />
            );
          })}
        </div>
      </section>
      <section>
        <h2 className="text-xs uppercase mb-10 text-zinc-500 text-center">Films Stats</h2>

        <div className="grid grid-cols-4 gap-4 border-y border-zinc-800 py-10 text-center">

          <div>
            <p className="text-2xl font-bold">{watchedCount}</p>
            <p className="text-xs uppercase text-zinc-500">Watched</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{watchlistCount}</p>
            <p className="text-xs uppercase text-zinc-500">Watchlist</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{listsCount}</p> 
            <p className="text-xs uppercase text-muted-foreground">Lists</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{recsCount}</p>
            <p className="text-xs uppercase text-zinc-500">Recs</p>
          </div>
        </div>
      </section>


      <section className="max-w-md mx-auto space-y-10">
        <ProfileForm initialName={user.name} />
      </section>


    </main>
  );
}
