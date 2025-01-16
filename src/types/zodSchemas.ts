import { z } from "zod";


export const signupSchema = z.object({
    email: z.string().nonempty({ message: "Title is required." }),
    password: z.string().min(6, { message: "Password must be 6 characters long." }),
    name: z.string().nonempty({ message: "name is required." })
});


export const createProjectSchema = z.object({
    title: z.string().nonempty({ message: "Title is required." }),
    description: z.string().optional(),
    expiresAt: z.string().nonempty({ message: "End date is required." }),
});



export const createTaskSchema = z.object({
    taskId: z.string(),
    title: z.string().nonempty({ message: "Title is required." }),
    description: z.string().nonempty({ message: "Description is required." }),
    expiresAt: z.string(),
    projectId: z.string(),
    priority: z.enum([
        "URGENT",
        "HIGH",
        "MEDIUM",
        "LOW"
    ]),
    assignId: z.string().nullable()
});


export const updateProfile = z.object({
    name: z.string().nonempty({message: "Name is required."}),
    email: z.string().nonempty({message: "Email is required."})
})

