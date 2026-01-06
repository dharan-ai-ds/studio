export type IssueCategory =
  | "Roads"
  | "Waste Management"
  | "Water Supply"
  | "Public Safety"
  | "Parks"
  | "Other";

export type IssueStatus = "Open" | "In Progress" | "Resolved";

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: string;
  reporter: {
    id: string;
    name: string;
  };
  upvotes: number;
  createdAt: Date;
  imageUrl: string;
  imageHint: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  createdAt: Date;
}
