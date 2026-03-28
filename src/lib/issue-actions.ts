'use server';

import { supabase } from './supabase';
import { Issue, IssueCategory, IssueStatus } from './types';
import { revalidatePath } from 'next/cache';

export async function getIssues(): Promise<Issue[]> {
  try {
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching issues:', error);
      throw new Error(error.message);
    }

    // Map Supabase data to Issue type
    return (data || []).map((dbIssue: any) => ({
      id: dbIssue.id,
      title: dbIssue.title,
      description: dbIssue.description,
      category: (dbIssue.category as IssueCategory) || 'Other',
      status: (dbIssue.status as IssueStatus) || 'Open',
      location: dbIssue.location || 'Unknown',
      reporter: {
        id: dbIssue.reporter_id || 'anonymous',
        name: dbIssue.reporter_name || 'Anonymous',
      },
      upvotes: dbIssue.upvotes || 0,
      createdAt: new Date(dbIssue.created_at),
      imageUrl: dbIssue.image_url || `https://picsum.photos/seed/${dbIssue.id}/600/400`,
      imageHint: dbIssue.image_hint || 'urban problem',
    }));
  } catch (error) {
    console.error('getIssues failed:', error);
    return [];
  }
}

export async function createIssue(formData: {
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
}) {
  try {
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          status: 'Open',
          reporter_name: 'Guest User', // Placeholder since auth isn't setup yet
          upvotes: 0,
        },
      ])
      .select();

    if (error) {
      console.error('Error creating issue:', error);
      throw new Error(error.message);
    }

    revalidatePath('/');
    return { success: true, data };
  } catch (error: any) {
    console.error('createIssue failed:', error);
    return { success: false, error: error.message };
  }
}
