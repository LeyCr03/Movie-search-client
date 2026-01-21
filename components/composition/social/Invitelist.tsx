"use client"
import { respondToInvite } from "@/actions/social";
import { Button } from "@/components/atoms/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export function InviteList({ invites }: { invites: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleResponse = (inviteId: string, status: "ACCEPTED" | "REJECTED") => {
    startTransition(async () => {
      const res = await respondToInvite(inviteId, status);

      if (status === "ACCEPTED") {
        toast.success("Friend request accepted", {
          description: "You can now recommend movies to each other.",
        });
      } else {
        toast.info("Invite declined");
      }
    });
  };

  if (invites.length === 0) return null;
  return (
    <div className="space-y-3">
      {invites.map((invite) => (
        <div key={invite._id} className="rounded-lg bg-secondary p-3">
          <p className="mb-2 text-xs font-medium">{invite.senderId.name}</p>
          <div className="flex gap-2">
            <Button
              variant={'ghost'}
              className="h-7 flex-1 text-[10px] text-green-400 bg-background/30"
              onClick={() => respondToInvite(invite._id, "ACCEPTED")}
            >
              Accept
            </Button>
            <Button
              variant="ghost"
              className="h-7 flex-1 text-[10px] text-red-400 "
              onClick={() => respondToInvite(invite._id, "REJECTED")}
            >
              Decline
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
