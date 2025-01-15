import { QueryObserverResult } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RefetchType = (options?: { throwOnError: boolean }) => Promise<QueryObserverResult<any, any>> 

export interface UserType {
    id: string,
    name: string,
    email: string,


}

export interface TaskType {
    id: string,
    title: string,       
    description: string, 
    priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW",    
    createdAt: Date,   
    expiresAt: Date,   
    projectId: string,   
    userId: string,
    assignId: string | null,     
    assignedTo: { name: string, email: string} | null    
}