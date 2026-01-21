import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*
export async function getSessionUser() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user;
}
*/