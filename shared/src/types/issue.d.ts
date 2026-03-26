import { IssueCategory, IssueStatus } from "../enums/issue";
import { User } from "./user";
export interface Issue {
    id: string;
    title: string;
    description: string;
    category: IssueCategory;
    status: IssueStatus;
    latitude: number;
    longitude: number;
    address: string;
    images: string[];
    cityRefNumber?: string;
    upvoteCount: number;
    createdAt: string;
    author: Pick<User, 'id' | 'name' | 'profileImage'>;
}
export interface Upvote {
    id: string;
    user: Pick<User, 'id' | 'name' | 'profileImage'>;
    issue: Pick<Issue, 'id' | 'title'>;
    createdAt: string;
}
