"use client";

import { useState } from "react";
import { AlertCircle, BrainCircuit, Loader2, Sparkles } from "lucide-react";
import { summarizeIssueReports } from "@/ai/flows/summarize-issue-reports";
import { generateIssueImprovements } from "@/ai/flows/generate-issue-improvements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function IntelligenceHub() {
  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setSummaryLoading(true);
    setSummary("");
    try {
      const result = await summarizeIssueReports({
        location: "T. Nagar",
        issueReports: [
          "Multiple streetlights on Usman Road are out.",
          "Garbage has not been collected for 3 days on Ranganathan Street.",
          "Broken pavement near the bus stand is a hazard for elderly people.",
        ],
      });
      setSummary(result.summary);
    } catch (error) {
      console.error("Error summarizing reports:", error);
      toast({
        title: "AI Error",
        description: "Could not generate summary.",
        variant: "destructive",
      });
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleGenerateImprovements = async () => {
    if (!summary) {
      toast({
        title: "No Summary",
        description: "Please generate a summary first.",
      });
      return;
    }
    setSuggestionsLoading(true);
    setSuggestions([]);
    try {
      const result = await generateIssueImprovements({
        issueReport: summary,
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error("Error generating improvements:", error);
      toast({
        title: "AI Error",
        description: "Could not generate improvement suggestions.",
        variant: "destructive",
      });
    } finally {
      setSuggestionsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-accent" />
          <span>Intelligence Hub</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2"><AlertCircle className="h-5 w-5 text-destructive" /> Anomaly Detection</h3>
            <p className="text-sm text-muted-foreground">AI has detected a spike in 'Public Safety' and 'Waste Management' reports in T. Nagar.</p>
            <Button onClick={handleSummarize} disabled={summaryLoading} size="sm">
                {summaryLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Summary
            </Button>
            {summary && <p className="text-sm bg-muted p-3 rounded-md mt-2">{summary}</p>}
        </div>

        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" /> Predictive Alerts & Actions</h3>
            <p className="text-sm text-muted-foreground">Generate AI-powered suggestions to address the summarized issues proactively.</p>
             <Button onClick={handleGenerateImprovements} disabled={!summary || suggestionsLoading} size="sm">
                {suggestionsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Suggest Improvements
            </Button>
            {suggestions.length > 0 && (
                <div className="space-y-2 pt-2">
                    {suggestions.map((suggestion, index) => (
                        <Badge key={index} variant="secondary" className="mr-2 mb-2 p-2 text-wrap h-auto">
                            {suggestion}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
