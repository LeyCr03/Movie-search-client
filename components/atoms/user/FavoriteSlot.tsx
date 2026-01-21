"use client"

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Search, Loader2, X, CloudCog } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { setFavorite } from "@/actions/profile";
import { searchMoviesAction } from "@/actions/movies";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/atoms/ui/dialog";
import { Input } from "@/components/atoms/ui/input";
import { Button } from "@/components/atoms/ui/button";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date?: string;
}

export function FavoriteSlot({ index, initialData }: { index: number, initialData: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [image, setImage] = useState<any>('')

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        if (query.length < 2) return;

        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            try {
                const movies = await searchMoviesAction(query);
                setResults(movies);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsSearching(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };


    const handleSelect = (movie: Movie) => {
        startTransition(async () => {
            await setFavorite(index, movie);
            setIsOpen(false);
            setQuery("");
            setResults([]);
            setImage(tmdb.getImageUrl(movie.poster_path))
        });
    };

    console.log(initialData)
    useEffect(() => {
        if (initialData === null) return;
        setImage(tmdb.getImageUrl(initialData.poster_path))
    }, [])

    return (
        <div className="group relative aspect-[2/3] w-full overflow-hidden rounded-xl border-2 border-dashed border-border transition-colors">
            {initialData ? (
                <>
                    <Image
                        src={tmdb.getImageUrl(initialData.posterPath)}
                        alt={initialData.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-40"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="px-4 text-center text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                            {initialData.title}
                        </p>
                        <Button
                            variant="default"
                            size="sm"
                            className="rounded-full h-8 text-[10px] border-border"
                            onClick={() => setIsOpen(true)}
                        >
                            Change            </Button>
                    </div>
                </>
            ) : (
                // EMPTY STATE
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-muted-foreground/80"
                >
                    <Plus size={32} strokeWidth={1} />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Add Favorite</span>
                </button>
            )}

            {/* SEARCH DIALOG */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px] border-border p-2 bg-background overflow-hidden">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-xl font-bold tracking-tighter text-foreground">Search Film</DialogTitle>
                    </DialogHeader>

                    <div className="p-6 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4" />
                            <Input
                                placeholder="Type movie name..."
                                value={query}
                                onChange={handleInputChange}
                                className="pl-10 border-none h-11 focus-visible:ring-1 ring-border"
                            />
                        </div>

                        <div className="space-y-2 min-h-[200px]">
                            {isSearching ? (
                                <div className="flex items-center justify-center py-10">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                results.map((movie) => (
                                    <button
                                        key={movie.id}
                                        onClick={() => handleSelect(movie)}
                                        disabled={isPending}
                                        className="flex w-full items-center gap-4 rounded-lg p-2  text-left group/item"
                                    >
                                        <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded">
                                            {movie.poster_path && (
                                                <Image
                                                    src={tmdb.getImageUrl(movie.poster_path)}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="truncate text-sm font-medium text-muted-foreground">
                                                {movie.title}
                                            </p>
                                            <p className="text-xs text-foreground">
                                                {movie.release_date?.split("-")[0]}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            )}

                            {query.length > 2 && results.length === 0 && !isSearching && (
                                <p className="text-center text-xs text-muted-foreground py-10">No movies found.</p>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
