// shared/src/types/api.ts
import { IssueCategory } from "../enums/issue";

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface CreateIssueDTO {
    title: string;
    description: string;
    category: IssueCategory;
    latitude: number;
    longitude: number;
    address: string;
    images?: string[];
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    }
}

export interface CreateAuthDTO {
    email: string;
    password: string;
    name: string;
}