import Image from "next/image";
import { tmdb } from "@/lib/tmdb";
import Link from "next/link";

export function MovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative cursor-pointer overflow-hidden rounded-md bg-accent-foreground transition-all hover:scale-[1.02]">
        <div className="aspect-[2/3] relative">
          <Image
            src={tmdb.getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all"
          />
        </div>
      </div>
    </Link>

  );
}
