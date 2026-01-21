"use client"

import { useState } from "react";
import { addMovieToList, createList } from "@/actions/list";
import { Button } from "@/components/atoms/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/atoms/ui/dialog";
import { Plus, ListPlus, Check } from "lucide-react";
import { toast } from "sonner";

export function AddToListDialog({ movie, userLists }: { movie: any, userLists: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const handleAdd = async (listId: string, listName: string) => {
    const res = await addMovieToList(listId, movie);
    if (res.success) {
      toast.success(`Added to ${listName}`);
      setIsOpen(false);
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newListName) return;
    const res = await createList(newListName);
    if (res.success) {
      await handleAdd(res.listId!, newListName);
      setNewListName("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full px-6">
          <ListPlus className=" h-4 w-4" /> Add to List
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border sm:max-w-[300px]">
        <DialogTitle className="text-xl font-bold tracking-tighter">My Lists</DialogTitle>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            {userLists.map((list) => (
              <button
                key={list._id}
                onClick={() => handleAdd(list._id, list.name)}
                className="flex w-full items-center justify-between rounded-lg p-3 text-sm hover:bg-muted transition-colors"
              >
                {list.name}
                <Plus size={14} className="text-muted-foreground" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <input 
              placeholder="New list name..."
              className="w-full bg-transparent text-sm outline-none mb-3"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Button onClick={handleCreateAndAdd} className="w-full h-9 text-xs rounded-full">
              Create & Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
