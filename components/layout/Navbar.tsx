import Link from "next/link";
import { auth } from "@/lib/auth";
import  UserNav  from "@/components/atoms/user/UserNav"; 

export async function Navbar() {

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/10 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          CINESPHERE.
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:font-bold transition-colors">HOME</Link>
          <Link href="/watchlist" className="hover:font-bold transition-colors">WATCHLIST</Link>
          <Link href="/profile" className="hover:font-bold transition-colors">PROFILE</Link>
          <Link href="/watched" className="hover:font-bold transition-colors">WATCHED</Link>
          <Link href="/social" className="hover:font-bold transition-colors">SOCIAL</Link>
        </div>

        <UserNav />
      </div>
    </nav>
  );
}
