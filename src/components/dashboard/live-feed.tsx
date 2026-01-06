"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockIssues } from "@/lib/data";
import { ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Get the initial set of issues outside the component to ensure it's the same on server and client
const initialIssues = mockIssues.slice(0, 5);

export default function LiveFeed() {
  const [latestIssues, setLatestIssues] = useState(initialIssues);
  
  // This useEffect simulates a live feed by cycling through mock data.
  // In a real app, this would be a WebSocket or real-time subscription.
  useEffect(() => {
    const interval = setInterval(() => {
      setLatestIssues(prevIssues => {
        // Find an issue from the full mock list that isn't already in the latest issues
        const availableIssues = mockIssues.filter(
          mockIssue => !prevIssues.some(latestIssue => latestIssue.id === mockIssue.id)
        );
        
        if (availableIssues.length === 0) {
            // All issues are displayed, no new issue to add.
            // You could reset or stop the interval. Here, we just return the current state.
            return prevIssues;
        }

        const newIssue = availableIssues[Math.floor(Math.random() * availableIssues.length)];
        
        const newFeed = [newIssue, ...prevIssues];
        return newFeed.slice(0, 5);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
