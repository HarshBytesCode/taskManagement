import { createTaskSchema } from "~/types/zodSchemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";



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
                },
                include: {
                    assignedTo: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            })

        } catch (error) {
            console.error("Error in retriving tasks.", error);
            
        }

    })
    ,
    addtask: protectedProcedure
    .input(createTaskSchema)
    .mutation( async( { ctx, input }) => {

        try {

            const expiresAt = new Date(input.expiresAt);

            await ctx.db.tasks.upsert({
                where: {
                    id: input.taskId,
                },
                update: {
                    title: input.title,
                    description: input.description,
                    projectId: input.projectId,
                    priority: input.priority
                },
                create: {
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
    }),
    assign: protectedProcedure
    .input(z.object({
        userId: z.string(),
        taskId: z.string()
    }))
    .mutation(async({ ctx, input }) => {

        try {
            
            await ctx.db.tasks.update({
                where: {
                    id: input.taskId
                },
                data: {
                    assignId: input.userId
                }
            })

        } catch (error) {
            console.error("Error in assigning task.", error);
            
        }
    }),
    deleteTask: protectedProcedure
    .input(z.object({
        taskId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {

        try {
            
            await ctx.db.tasks.delete({
                where: {
                    id: input.taskId
                }
            })

        } catch (error) {
            console.error("Error while deleting task.", error);
            
        }
    })
})