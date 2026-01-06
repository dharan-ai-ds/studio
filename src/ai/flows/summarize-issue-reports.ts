'use server';
/**
 * @fileOverview Summarizes a cluster of issue reports by location.
 *
 * - summarizeIssueReports - A function that summarizes the issue reports.
 * - SummarizeIssueReportsInput - The input type for the summarizeIssueReports function.
 * - SummarizeIssueReportsOutput - The return type for the summarizeIssueReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueReportsInputSchema = z.object({
  location: z.string().describe('The location to summarize issue reports for.'),
  issueReports: z
    .string()
    .array()
    .describe('An array of issue reports for the specified location.'),
});
export type SummarizeIssueReportsInput = z.infer<typeof SummarizeIssueReportsInputSchema>;

const SummarizeIssueReportsOutputSchema = z.object({
  summary: z.string().describe('A summary of the issue reports for the specified location.'),
});
export type SummarizeIssueReportsOutput = z.infer<typeof SummarizeIssueReportsOutputSchema>;

export async function summarizeIssueReports(input: SummarizeIssueReportsInput): Promise<SummarizeIssueReportsOutput> {
  return summarizeIssueReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIssueReportsPrompt',
  input: {schema: SummarizeIssueReportsInputSchema},
  output: {schema: SummarizeIssueReportsOutputSchema},
  prompt: `You are an AI assistant helping to summarize issue reports for a specific location.

  Location: {{{location}}}
  Issue Reports:
  {{#each issueReports}}
  - {{{this}}}
  {{/each}}

  Please provide a concise summary of the most pressing problems in the specified location based on the provided issue reports.`,
});

const summarizeIssueReportsFlow = ai.defineFlow(
  {
    name: 'summarizeIssueReportsFlow',
    inputSchema: SummarizeIssueReportsInputSchema,
    outputSchema: SummarizeIssueReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
