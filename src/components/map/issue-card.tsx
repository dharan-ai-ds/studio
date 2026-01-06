import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Issue } from "@/lib/types";
import { MapPin, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const statusColor =
    issue.status === "Open"
      ? "bg-red-500"
      : issue.status === "In Progress"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0 relative">
        <Image
          src={issue.imageUrl}
          alt={issue.title}
          width={600}
          height={400}
          className="object-cover w-full h-48"
          data-ai-hint={issue.imageHint}
        />
        <Badge className={cn("absolute top-2 right-2", statusColor)}>
          {issue.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{issue.category}</Badge>
        <h3 className="font-semibold text-lg leading-tight">{issue.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{issue.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
        <div className="flex items-center text-sm">
          <ThumbsUp className="h-4 w-4 mr-2" />
          <span className="font-semibold">{issue.upvotes}</span>
        </div>
        <Button size="sm" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
