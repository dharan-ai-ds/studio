"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIssues } from "@/lib/issue-actions";
import { Issue } from "@/lib/types";
import { ThumbsUp, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function LiveFeed() {
  const [latestIssues, setLatestIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      const data = await getIssues();
      setLatestIssues(data.slice(0, 5));
      setLoading(false);
    };

    fetchIssues();

    // In a real app, you'd use Supabase real-time here.
    // For now, we'll just fetch once on mount.
    const interval = setInterval(fetchIssues, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading && latestIssues.length === 0) {
    return (
      <Card className="h-full flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">Loading feed...</p>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Live Community Feed</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-6">
          {latestIssues.map((issue) => (
            <div key={issue.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${issue.reporter.name}.png`} />
                <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{issue.reporter.name}</span> reported a new issue
                </p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {issue.title}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                  <span>{formatDistanceToNow(issue.createdAt, { addSuffix: true })}</span>
                  <div className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {issue.upvotes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
