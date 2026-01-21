import Link from "next/link";
import { auth } from "@/lib/auth";
import UserNav from "@/components/atoms/user/UserNav";
import { ThemeToggle } from "../atoms/user/ThemeToggle";
import { UserRound } from "lucide-react";

export async function Navbar() {

  return (
    <nav className="sticky top-0 z-50 w-full text-muted-foreground flex border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-[10vh] items-center justify-between px-0">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          CINESPHERE.
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">HOME</Link>
          <Link href="/watchlist" className="hover:text-foreground transition-colors">WATCHLIST</Link>
          <Link href="/lists" className="hover:text-foreground transition-colors">LISTS</Link>
          <Link href="/watched" className="hover:text-foreground transition-colors">WATCHED</Link>
          <Link href="/social" className="hover:text-foreground transition-colors">SOCIAL</Link>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Link href="/profile" className=" hover:bg-muted-foreground/40 rounded-full p-2 "><UserRound size={18} /></Link>
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
