import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ThumbsUp, Calendar } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { mockIssues } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const issue = mockIssues.find((issue) => issue.id === params.id);

  if (!issue) {
    notFound();
  }

  const statusColor =
    issue.status === "Open"
      ? "bg-red-500"
      : issue.status === "In Progress"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <AppLayout>
      <div className="mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/map" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Map
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="p-0 relative">
            <Image
              src={issue.imageUrl}
              alt={issue.title}
              width={1200}
              height={600}
              className="object-cover w-full h-64 rounded-t-lg"
              data-ai-hint={issue.imageHint}
            />
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {issue.category}
                </Badge>
                <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                  {issue.title}
                </h1>
              </div>
              <Badge className={cn("text-base", statusColor)}>
                {issue.status}
              </Badge>
            </div>

            <p className="text-muted-foreground text-lg">
              {issue.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                    <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${issue.reporter.name}.png`} />
                        <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-muted-foreground">Reported by</p>
                        <p className="font-semibold">{issue.reporter.name}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Reported on</p>
                        <p className="font-semibold">{format(issue.createdAt, "PPP")}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                    <MapPin className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-semibold">{issue.location}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                    <ThumbsUp className="h-6 w-6 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Upvotes</p>
                        <p className="font-semibold">{issue.upvotes}</p>
                    </div>
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Mark as Resolved</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
