"use client"
import { useState, useTransition } from "react";
import { searchUsers, sendInvite } from "@/actions/social";
import { Input } from "@/components/atoms/ui/input";
import { Button } from "@/components/atoms/ui/button";
import { UserPlus, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/ui/tooltip";
import { toast } from "sonner";

export function UserSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleInvite = (userId: string, userName: string) => {
    toast.promise(sendInvite(userId), {
      loading: 'Sending invite...',
      success: `Invite sent to ${userName}`,
      error: 'Failed to send invite',
    });
  };

  const handleSearch = async (query: string) => {
    if (query.length < 3) return setResults([]);
    startTransition(async () => {
      const users = await searchUsers(query);
      setResults(users);
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name..."
        onChange={(e) => handleSearch(e.target.value)}
        className=" border-0 border-border"
      />

      <div className="space-y-2">
        {results.map((user) => (
          <div key={user._id} className="flex items-center justify-between rounded-md p-2">
            <span className="text-sm text-foreground">{user.name}</span>
            <Tooltip>
              <TooltipTrigger onClick={() => handleInvite(user._id, user.name)}>
                <UserPlus size={16} />
              </TooltipTrigger>
              <TooltipContent>
                Send Invite
              </TooltipContent>
            </Tooltip>

          </div>
        ))}
      </div>
    </div>
  );
}
