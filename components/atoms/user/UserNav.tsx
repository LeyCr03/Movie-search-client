import { signIn, signOut, auth } from "@/lib/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default async function UserNav() {
  const session = await auth();

  return (
    <div className="flex items-center gap-4">
      {session ? (
        <form action={async () => { "use server"; await signOut(); }}>
          <Tooltip>
            <TooltipTrigger className="rounded-full text-muted-foreground p-2 bg-accent-foreground ">
            <LogOut size={18}/>
            </TooltipTrigger>
            <TooltipContent>
              LogOut?
            </TooltipContent>
          </Tooltip>
        </form>
      ) : (
        <Link href="/login">
          <Tooltip>
            <TooltipTrigger className="rounded-full text-muted-foreground p-2 bg-accent-foreground ">
            <LogIn size={18}/>
            </TooltipTrigger>
            <TooltipContent>
              LogIn
            </TooltipContent>
          </Tooltip>
        </Link>
      )}
    </div>
  );
}
