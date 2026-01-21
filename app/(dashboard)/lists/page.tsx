import { CreateListDialog } from "@/components/composition/lists/CreateListDialog";
import { auth } from "@/lib/auth";
import  connectToDatabase from "@/lib/mongodb";
import { List } from "@/models/list.model";
import Link from "next/link";

export default async function ListsPage() {
  const session = await auth();
  await connectToDatabase();
  const lists = await List.find({ userId: session?.user?.id }).lean();

  return (
   <main className="container mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold tracking-tighter">Lists Collections</h1>
        <CreateListDialog />
      </div>
      
      {lists.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">You haven't created any collections yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lists.map((list: any) => (
          <Link href={`/lists/${list._id}`} key={list._id}>
            <div className="group aspect-video rounded-xl border border-border bg-card p-6 flex flex-col justify-end hover:border-foreground transition-colors">
              <h2 className="text-xl font-bold">{list.name}</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                {list.movies.length} Movies
              </p>
            </div>
          </Link>
        ))}
      </div>
      )}
    </main>
  );
}
