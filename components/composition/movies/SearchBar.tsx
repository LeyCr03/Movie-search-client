"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/atoms/ui/input";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder="Search movies..."
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-transparent border-zinc-800 focus:border-white transition-colors"
      />
      {isPending && (
        <div className="absolute right-3 top-2.5 text-xs text-zinc-500 animate-pulse">
          ...
        </div>
      )}
    </div>
  );
}
