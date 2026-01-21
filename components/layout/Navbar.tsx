import Link from "next/link";
import { Home, Bookmark, List, CheckCircle, Users, UserRound } from "lucide-react";
import { ThemeToggle } from "../atoms/user/ThemeToggle";
import UserNav from "../atoms/user/UserNav";

export function Navbar() {
  const navLinks = [
    { name: "HOME", href: "/", icon: Home },
    { name: "WATCHLIST", href: "/watchlist", icon: Bookmark },
    { name: "LISTS", href: "/lists", icon: List },
    { name: "WATCHED", href: "/watched", icon: CheckCircle },
    { name: "SOCIAL", href: "/social", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-card/45 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tighter mr-4">
          CINESPHERE<span className="hidden xs:inline">.</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="group flex items-center justify-center p-2 rounded-lg transition-all"
            >
              <link.icon className="h-5 w-5 sm:hidden" />
              <span className="hidden sm:inline text-xs font-bold tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-2">
          <Link href="/profile" className="rounded-full p-2 transition-colors">
            <UserRound size={20} className="text-muted-foreground" />
          </Link>
          <div className="scale-90">
            <ThemeToggle />
          </div>
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
