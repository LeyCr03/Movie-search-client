"use client"

import { useState, useTransition } from "react";
import { Button } from "@/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/ui/dialog";
import { Checkbox } from "@/components/atoms/ui/checkbox";
import { Share2, Loader2, CheckCircle2, UserRound } from "lucide-react";
import { recommendToFriends } from "@/actions/recommendations";
import { ScrollArea } from "@/components/atoms/ui/scroll-area";
import { toast } from "sonner";

export function RecommendDialog({ movie, friends, isWatched }: { movie: any, friends: any[], isWatched: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedFriends.length === friends.length) {
      setSelectedFriends([]);
    } else {
      setSelectedFriends(friends.map(f => f._id));
    }
  };

  const handleRecommend = () => {
  startTransition(async () => {
    const res = await recommendToFriends(selectedFriends, movie);
    if (res.success) {
      setIsOpen(false);
      toast.success("Movie Recommended", {
        description: `Sent to ${selectedFriends.length} friends.`,
      });
      setSelectedFriends([]);
    }
  });
};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="rounded-full px-6"
          disabled={!isWatched} // Only enabled if movie is seen
          title={!isWatched ? "Mark as watched to recommend" : ""}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Recommend
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-secondary border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tighter">Recommend Film</DialogTitle>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">To your friends</p>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500 animate-in zoom-in" />
            <p className="text-sm font-medium">Recommendations Sent!</p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {friends.length > 0 ? (
              <>
                <div className="flex items-center justify-between border-b border-muted-foreground pb-4">
                  <span className="text-sm font-medium">Select All</span>
                  <Checkbox 
                    checked={selectedFriends.length === friends.length && friends.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </div>

                <ScrollArea className="h-[250px] pr-4">
                  <div className="space-y-4">
                    {friends.map((friend) => (
                      <div key={friend._id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full text-muted-foreground p-2"> <UserRound size={18}/></div>
                          <span className="text-sm">{friend.name}</span>
                        </div>
                        <Checkbox 
                          checked={selectedFriends.includes(friend._id)}
                          onCheckedChange={() => toggleFriend(friend._id)}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Button 
                  className="w-full rounded-full h-12" 
                  disabled={selectedFriends.length === 0 || isPending}
                  onClick={handleRecommend}
                >
                  {isPending ? <Loader2 className="animate-spin" /> : `Send to ${selectedFriends.length} friends`}
                </Button>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-muted-foreground">You need friends to recommend movies.</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
