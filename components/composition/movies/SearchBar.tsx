"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/atoms/ui/input";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  

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
        className="bg-transparent border-border border-0 transition-colors"
      />
      {isPending && (
        <div className="absolute right-3 top-2.5 text-xs text-muted-foreground animate-pulse">
          ...
        </div>
      )}
    </div>
  );
}
