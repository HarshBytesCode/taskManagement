import { createTRPCRouter, protectedProcedure } from "../trpc";
import { string, z } from "zod";



export const taskRouter = createTRPCRouter({

    getTask: protectedProcedure
    .input(z.object({
        projectId: z.string()
    }))
    .query( async ({ ctx, input }) => {

        try {
            
            return await ctx.db.tasks.findMany({
                where: {
                    projectId: input.projectId
                }
            })

        } catch (error) {
            
        }

    })
    ,
    addtask: protectedProcedure
    .input(z.object({
        title: z.string(),
        description: z.string(),
        expiresAt: z.string(),
        projectId: z.string(),
        priority: z.enum([
            "URGENT",
            "HIGH",
            "MEDIUM",
            "LOW"
        ]),
        assignId: z.string().optional()
    }))
    .mutation( async( { ctx, input }) => {

        try {

            const expiresAt = new Date(input.expiresAt);

            await ctx.db.tasks.create({
                data: {
                    title: input.title,
                    description: input.description,
                    expiresAt,
                    projectId: input.projectId,
                    userId: ctx.session.user.id,
                    priority: input.priority,
                    assignId: input.assignId

                }
            })
        } catch (error) {
            console.error("Error in creating task.", error);
            
        }

        
    }),

    updatepriority: protectedProcedure
    .input(z.object({
        taskId: z.string(),
        priority: z.enum([
            "URGENT",
            "HIGH",
            "MEDIUM",
            "LOW"
        ])
    }))
    .mutation( async( { ctx, input }) => {

        try {
            await ctx.db.tasks.update({
                where: {
                    id: input.taskId
                },
                data: {
                    priority: input.priority
                }
            })
            
        } catch (error) {
            console.log("Error while updating priority.", error);
            
        }
    })
})