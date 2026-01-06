import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-issue-reports.ts';
import '@/ai/flows/generate-issue-improvements.ts';
import '@/ai/flows/suggest-issue-category.ts';
