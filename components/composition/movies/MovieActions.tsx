"use client";

import { toggleMovieStatus } from "@/actions/movies";
import { Button } from "@/components/atoms/ui/button";
import { Bookmark, Check, Share2 } from "lucide-react";
import { useTransition } from "react";

export function MovieActions({ movie, currentStatus }: { movie: any, currentStatus: string | null }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (status: 'WATCHLIST' | 'WATCHED') => {
    startTransition(async () => {
      await toggleMovieStatus({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      }, status);
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        disabled={isPending}
        variant={currentStatus === "WATCHLIST" ? "default" : "outline"}
        onClick={() => handleToggle("WATCHLIST")}
        className="rounded-full px-6"
      >
        <Bookmark className="mr-2 h-4 w-4" />
        {currentStatus === "WATCHLIST" ? "In Watchlist" : "Watch Later"}
      </Button>

      <Button 
        disabled={isPending}
        variant={currentStatus === "WATCHED" ? "default" : "outline"}
        onClick={() => handleToggle("WATCHED")}
        className="rounded-full px-6"
      >
        <Check className="mr-2 h-4 w-4" />
        {currentStatus === "WATCHED" ? "Watched" : "Mark as Seen"}
      </Button>

      <Button variant="outline" className="rounded-full px-6">
        <Share2 className="mr-2 h-4 w-4" />
        Recommend
      </Button>
    </div>
  );
}
