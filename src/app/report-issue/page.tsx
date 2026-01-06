"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { IssueCategory } from "@/lib/types";
import { suggestIssueCategory } from "@/ai/flows/suggest-issue-category";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  category: z.enum([
    "Roads",
    "Waste Management",
    "Water Supply",
    "Public Safety",
    "Parks",
    "Other",
  ]),
});

const issueCategories: IssueCategory[] = [
    "Roads",
    "Waste Management",
    "Water Supply",
    "Public Safety",
    "Parks",
    "Other",
];

export default function ReportIssuePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Issue Reported!",
        description: "Thank you for helping improve our community.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  async function handleSuggestCategory() {
    const description = form.getValues("description");
    if (description.length < 20) {
      form.setError("description", {
        type: "manual",
        message: "Please enter at least 20 characters to get a suggestion.",
      });
      return;
    }
    
    setIsSuggesting(true);
    try {
      const result = await suggestIssueCategory({ description });
      const suggestedCategory = result.category;
      form.setValue("category", suggestedCategory);
      toast({
        title: "AI Suggestion",
        description: `We've suggested the '${suggestedCategory}' category based on your description.`,
      });
    } catch(e) {
        console.error(e);
        toast({
            title: "AI Suggestion Failed",
            description: "We couldn't suggest a category. Please select one manually.",
            variant: "destructive"
        });
    } finally {
        setIsSuggesting(false);
    }
  }

  return (
    <AppLayout>
      <div className="flex items-center mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Report a New Issue</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Large pothole on Main Street" {...field} />
                    </FormControl>
                    <FormDescription>
                      A short, clear title for the issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide details about the issue, its impact, and exact location."
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                       Describe the issue in detail. The more information, the better!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                 <Button type="button" variant="outline" size="sm" onClick={handleSuggestCategory} disabled={isSuggesting}>
                   {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4 text-accent" /> }
                    Suggest Category with AI
                </Button>
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {issueCategories.map(cat => (
                           <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., T. Nagar, near post office" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Report
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
}
