// src/ai/flows/generate-issue-improvements.ts
'use server';

/**
 * @fileOverview Generates suggestions to resolve reported issues.
 *
 * - generateIssueImprovements - A function that generates suggestions for resolving reported issues.
 * - GenerateIssueImprovementsInput - The input type for the generateIssueImprovements function.
 * - GenerateIssueImprovementsOutput - The return type for the generateIssueImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIssueImprovementsInputSchema = z.object({
  issueReport: z.string().describe('The issue report description.'),
});

type GenerateIssueImprovementsInput = z.infer<
  typeof GenerateIssueImprovementsInputSchema
>;

const GenerateIssueImprovementsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested improvements to resolve the issue.'),
});

type GenerateIssueImprovementsOutput = z.infer<
  typeof GenerateIssueImprovementsOutputSchema
>;

export async function generateIssueImprovements(
  input: GenerateIssueImprovementsInput
): Promise<GenerateIssueImprovementsOutput> {
  return generateIssueImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIssueImprovementsPrompt',
  input: {schema: GenerateIssueImprovementsInputSchema},
  output: {schema: GenerateIssueImprovementsOutputSchema},
  prompt: `You are a city planning expert. Generate a list of suggestions to resolve the following issue report.

Issue Report: {{{issueReport}}}

Suggestions:`,
});

const generateIssueImprovementsFlow = ai.defineFlow(
  {
    name: 'generateIssueImprovementsFlow',
    inputSchema: GenerateIssueImprovementsInputSchema,
    outputSchema: GenerateIssueImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
