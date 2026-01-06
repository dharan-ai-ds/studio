import { Issue, IssueCategory, IssueStatus } from './types';

const users = [
  { id: 'user-1', name: 'Arun Kumar' },
  { id: 'user-2', name: 'Priya Sharma' },
  { id: 'user-3', name: 'Sanjay Gupta' },
  { id: 'user-4', name: 'Anjali Mehta' },
  { id: 'user-5', name: 'Vikram Singh' },
];

const locations = [
  'Marina Beach',
  'T. Nagar',
  'Anna Salai Road',
  'Velachery',
  'Adyar',
  'Guindy',
  'Mylapore',
  'Besant Nagar',
];

const titles: { [key in IssueCategory]: string[] } = {
  "Roads": ["Massive Pothole Reported", "Cracked Pavement", "Faded Road Markings"],
  "Waste Management": ["Garbage Overflowing", "Irregular Waste Collection", "Illegal Dumping Site"],
  "Water Supply": ["Leaky Pipe Flooding Street", "Contaminated Water", "No Water Supply for Days"],
  "Public Safety": ["Broken Streetlight", "Damaged Public Fence", "Exposed Electrical Wires"],
  "Parks": ["Neglected Public Park", "Broken Playground Equipment", "Overgrown Bushes"],
  "Other": ["Stray Dog Menace", "Noise Pollution Complaint", "Abandoned Vehicle"],
};

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomDate = (start: Date, end: Date): Date => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const mockIssues: Issue[] = Array.from({ length: 25 }, (_, i) => {
  const category = getRandomElement(Object.keys(titles) as IssueCategory[]);
  const status: IssueStatus = getRandomElement(['Open', 'In Progress', 'Resolved']);
  const createdAt = getRandomDate(new Date(2023, 0, 1), new Date());
  
  return {
    id: `issue-${i + 1}`,
    title: `${getRandomElement(titles[category])} in ${getRandomElement(locations)}`,
    description: "A resident has reported an issue requiring immediate attention from local authorities. This has been a recurring problem in the area, affecting the daily lives of many people.",
    category,
    status,
    location: getRandomElement(locations),
    reporter: getRandomElement(users),
    upvotes: Math.floor(Math.random() * 150),
    createdAt,
    imageUrl: `https://picsum.photos/seed/issue${i+1}/600/400`,
    imageHint: 'urban problem'
  };
});

// Add specific issues from prompt
mockIssues.unshift(
  {
    id: 'issue-100',
    title: 'Uncollected garbage near Marina Beach',
    description: 'Large piles of garbage have been left uncollected near the main entrance of Marina Beach for over a week, causing a foul smell and attracting pests.',
    category: 'Waste Management',
    status: 'Open',
    location: 'Marina Beach',
    reporter: { id: 'user-1', name: 'Arun Kumar' },
    upvotes: 128,
    createdAt: new Date('2024-07-20T09:00:00Z'),
    imageUrl: 'https://picsum.photos/seed/garbage-marina/600/400',
    imageHint: 'garbage beach'
  },
  {
    id: 'issue-101',
    title: 'Broken streetlight in T. Nagar',
    description: 'A key streetlight on the main shopping road in T. Nagar has been out for several nights, creating a safety hazard for pedestrians and motorists.',
    category: 'Public Safety',
    status: 'In Progress',
    location: 'T. Nagar',
    reporter: { id: 'user-2', name: 'Priya Sharma' },
    upvotes: 76,
    createdAt: new Date('2024-07-18T22:30:00Z'),
    imageUrl: 'https://picsum.photos/seed/streetlight-tnagar/600/400',
    imageHint: 'broken streetlight'
  },
  {
    id: 'issue-102',
    title: 'Pothole on Anna Salai Road',
    description: 'A very large and deep pothole has formed on Anna Salai Road near the Gemini Flyover, causing damage to vehicles and posing a risk to two-wheelers.',
    category: 'Roads',
    status: 'Open',
    location: 'Anna Salai Road',
    reporter: { id: 'user-3', name: 'Sanjay Gupta' },
    upvotes: 215,
    createdAt: new Date('2024-07-21T14:00:00Z'),
    imageUrl: 'https://picsum.photos/seed/pothole-annasalai/600/400',
    imageHint: 'pothole road'
  },
   {
    id: 'issue-103',
    title: 'Waterlogging in Velachery',
    description: 'Following a short spell of rain, the main road in Velachery is completely waterlogged, making it impassable for pedestrians and vehicles.',
    category: 'Water Supply',
    status: 'Resolved',
    location: 'Velachery',
    reporter: { id: 'user-4', name: 'Anjali Mehta' },
    upvotes: 95,
    createdAt: new Date('2024-07-15T11:00:00Z'),
    imageUrl: 'https://picsum.photos/seed/waterlogging-velachery/600/400',
    imageHint: 'flooded street'
  }
);
