"use client"

import { ErrorState } from "@/components/atoms/errors/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container mx-auto">
      <ErrorState error={error} reset={reset} />
    </main>
  );
}
