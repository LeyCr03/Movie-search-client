import { signIn, signOut, auth } from "@/lib/auth";

export default async function UserNav() {
  const session = await auth();

  return (
    <div className="flex items-center gap-4">
      <form action={async () => { "use server"; await signOut(); }}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
