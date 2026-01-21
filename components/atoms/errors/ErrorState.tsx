"use client"

import { WifiOff, RefreshCw, Globe, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";

export function ErrorState({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void 
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 rounded-full bg-muted p-4">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-bold tracking-tighter mb-2">Connection Failed</h2>
      <p className="text-sm text-muted-foreground max-w-xs mb-8">
        We couldn't reach the movie database. This usually happens due to:
      </p>

      <div className="grid grid-cols-1 gap-4 text-left mb-10 w-full max-w-sm">
        <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50">
          <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase">No Internet</p>
            <p className="text-[10px] text-muted-foreground">Check your Wi-Fi or mobile data connection.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50">
          <ShieldAlert className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase">Proxy or Firewall</p>
            <p className="text-[10px] text-muted-foreground">A VPN or corporate firewall might be blocking TMDB.</p>
          </div>
        </div>
      </div>

      <Button onClick={() => reset()} className="rounded-full px-8">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
      
      {process.env.NODE_ENV === 'development' && (
        <p className="mt-4 text-[10px] font-mono text-foreground">{error.message}</p>
      )}
    </div>
  );
}
