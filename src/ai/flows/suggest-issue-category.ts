'use server';

/**
 * @fileOverview Suggests a category for a new issue report.
 *
 * - suggestIssueCategory - A function that suggests a category for a new issue.
 * - SuggestIssueCategoryInput - The input type for the suggestIssueCategory function.
 * - SuggestIssueCategoryOutput - The return type for the suggestIssueCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { IssueCategory } from '@/lib/types';

const issueCategories: [IssueCategory, ...IssueCategory[]] = [
    "Roads",
    "Waste Management",
    "Water Supply",
    "Public Safety",
    "Parks",
    "Other",
];

const SuggestIssueCategoryInputSchema = z.object({
  description: z.string().describe('The issue report description.'),
});

export type SuggestIssueCategoryInput = z.infer<
  typeof SuggestIssueCategoryInputSchema
>;

const SuggestIssueCategoryOutputSchema = z.object({
  category: z.enum(issueCategories).describe('The suggested category for the issue report.'),
});

export type SuggestIssueCategoryOutput = z.infer<
  typeof SuggestIssueCategoryOutputSchema
>;

export async function suggestIssueCategory(
  input: SuggestIssueCategoryInput
): Promise<SuggestIssueCategoryOutput> {
  return suggestIssueCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestIssueCategoryPrompt',
  input: {schema: SuggestIssueCategoryInputSchema},
  output: {schema: SuggestIssueCategoryOutputSchema},
  prompt: `You are an expert at categorizing civic issue reports. Based on the following issue description, suggest the most appropriate category.

Available Categories:
- Roads
- Waste Management
- Water Supply
- Public Safety
- Parks
- Other

Issue Description:
"{{{description}}}"

Categorize the issue into one of the available categories.
`,
});

const suggestIssueCategoryFlow = ai.defineFlow(
  {
    name: 'suggestIssueCategoryFlow',
    inputSchema: SuggestIssueCategoryInputSchema,
    outputSchema: SuggestIssueCategoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
