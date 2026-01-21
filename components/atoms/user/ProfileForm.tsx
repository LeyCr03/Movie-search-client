"use client"

import { useActionState, useEffect } from "react";
import { updateProfile } from "@/actions/profile";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { toast } from "sonner";

export function ProfileForm({ initialName }: { initialName: string }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  useEffect(() => {
    if (state?.success) toast.success(state.success);
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <h2 className="text-sm font-medium">Account Settings</h2>
      <Input 
        name="name" 
        defaultValue={initialName} 
        className="bg-zinc-300 border-none h-12" 
      />
      
      {/* Display messages based on the returned state */}
      {state?.error && <p className="text-xs text-red-500">{state.error}</p>}
      {state?.success && <p className="text-xs text-green-500">{state.success}</p>}

      <Button 
        type="submit"
        disabled={isPending} 
        className="w-full rounded-full h-12"
      >
        {isPending ? "Updating..." : "Update Details"}
      </Button>
    </form>
  );
}

