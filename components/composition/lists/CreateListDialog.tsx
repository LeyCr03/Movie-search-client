"use client"
import { useState } from "react";
import { createList } from "@/actions/list";
import { Button } from "@/components/atoms/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/atoms/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function CreateListDialog() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    if (!name) return;
    const res = await createList(name);
    if (res.success) {
      toast.success("Collection created");
      setName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6">
          <Plus className=" h-4 w-4" />New List
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border sm:max-w-[300px]">
        <DialogTitle className="text-xl font-bold tracking-tighter">Create List</DialogTitle>
        <div className="space-y-4 py-4">
          <input 
            autoFocus
            placeholder="Collection name..."
            className="w-full bg-transparent text-sm outline-none border-b border-border pb-2 focus:border-foreground transition-colors"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleCreate} className="w-full rounded-full">Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
