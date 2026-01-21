import Image from "next/image";
import { tmdb } from "@/lib/tmdb";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Clock, Eye } from "lucide-react";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-secondary text-foreground">
        <Image
          src={tmdb.getImageUrl(movie.poster_path)}
          alt={movie.title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            "grayscale group-hover:grayscale-0 group-hover:scale-105",
            className?.includes("grayscale-0") && "grayscale-0"
          )}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        />

        {className?.includes("grayscale-0") && (
          <div className="absolute top-2 right-2 rounded-full p-1 shadow-lg">
            <CheckCheck size={20} className="text-green-600" />
          </div>
        )}

        {className?.includes("opacity-90") && (
          <div className="absolute top-2 right-2 rounded-full p-1 shadow-lg">
            <Clock size={20} className="text-red-600" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-foreground truncate">
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
