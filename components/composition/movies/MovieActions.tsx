"use client";

import { toggleMovieStatus } from "@/actions/movies";
import { Button } from "@/components/atoms/ui/button";
import { Bookmark, Check, Share2, Trash, WifiOff } from "lucide-react";
import { useTransition } from "react";
import { RecommendDialog } from "./RecommendDialog";
import { toast } from "sonner";
import { AddToListDialog } from "../lists/AddtoLists";

export function MovieActions({ movie, currentStatus, friends, userLists }: { movie: any, currentStatus: string | null, friends: any[], userLists: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (status: 'WATCHLIST' | 'WATCHED') => {
    startTransition(async () => {
      const res = await toggleMovieStatus(movie, status);

      if (res.success) {
        toast.success(status === "WATCHLIST" ? "Added to Watchlist" : "Marked as Watched", {
          description: movie.title,
        });
      }
      if (res.error) {
        toast.error("Connection Error", {
          description: res.error,
          icon: <WifiOff className="h-4 w-4" />,
        });
      }
    });
  };


  return (
    <div className="flex flex-wrap gap-4">
      <Button
        disabled={isPending}
        variant={currentStatus === "WATCHLIST" ? "default" : 'ghost'}
        onClick={() => handleToggle("WATCHLIST")}
        className="rounded-full px-6 hover:text-muted"
      >
        <Bookmark className=" h-4 w-4" />
        {currentStatus === "WATCHLIST" ? "In Watchlist" : "Watch Later"}
      </Button>

      <Button
        disabled={isPending}
        variant={currentStatus === "WATCHED" ? "default" : 'ghost'}
        onClick={() => handleToggle("WATCHED")}
        className="rounded-full px-6 hover:text-muted"
      >
        <Check className="mr-2 h-4 w-4" />
        {currentStatus === "WATCHED" ? "Watched" : "Mark as Seen"}
      </Button>

      <RecommendDialog
        movie={movie}
        friends={friends}
        isWatched={currentStatus === "WATCHED"}
      />

      <AddToListDialog
        movie={movie}
        userLists={userLists}
      />
    </div>
  );
}
