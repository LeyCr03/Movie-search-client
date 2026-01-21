import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { FriendRequest } from "@/models/friend.model";
import { Recommendation } from "@/models/recommendation.model";
import { User } from "@/models/user.model";
import { MovieCard } from "@/components/composition/movies/MovieCard";
import { UserSearch } from "@/components/composition/social/UserSearch";
import { InviteList } from "@/components/composition/social/Invitelist";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

export default async function SocialPage() {
  const session = await auth();
  await connectToDatabase();

  const user = await User.findById(session?.user?.id).populate("friends");
  const friends = user?.friends || [];

  const invites = await FriendRequest.find({
    receiverId: session?.user?.id,
    status: "PENDING"
  }).populate("senderId");

  const recsDoc = await Recommendation.find({
    receiverId: session?.user?.id
  }).sort({ createdAt: -1 })
    .lean();

  const recs = recsDoc.map((r: any) => ({
    _id: r._id.toString(),
    tmdbId: r.tmdbId,
    movieTitle: r.movieTitle,
    posterPath: r.posterPath,
    senderName: r.senderName,
  }));

  return (
    <main className="container mx-auto flex min-h-screen gap-10 py-10">

      <aside className="w-80 space-y-10 border-r border-border pr-10">
        <div>
          <h2 className="mb-4 text-xs uppercase tracking-widest text-foreground">Find People</h2>
          <UserSearch />
        </div>

        {invites.length > 0 && (
          <div>
            <h2 className="mb-4 text-xs uppercase tracking-widest text-foreground">Invites</h2>
            <InviteList invites={JSON.parse(JSON.stringify(invites))} />
          </div>
        )}

        <div>
          <h2 className="mb-4 text-xs uppercase tracking-widest text-foreground">Friends</h2>
          <div className="space-y-3">
            {friends.map((friend: any) => (
              <div key={friend._id} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-background" />
                <span className="text-sm font-medium">{friend.name}</span>
              </div>
            ))}
            {friends.length === 0 && <p className="text-xs text-muted-foreground">No friends yet.</p>}
          </div>
        </div>
      </aside>

      <section className="flex-1">
        <h1 className="mb-8 text-3xl font-bold tracking-tighter text-muted-foreground">Recommended for You</h1>

        {recs.length === 0 ? (
          <p className="text-muted-foreground">No recommendations yet. Invite friends to get started!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recs.map((rec) => (
              <div key={rec._id.toString()} className="space-y-2">
                <MovieCard movie={{ id: rec.tmdbId, title: rec.movieTitle, poster_path: rec.posterPath }} />
                <p className="text-xs text-muted-foreground italic">From {rec.senderName || "a friend"}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
