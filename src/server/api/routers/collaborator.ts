import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";





export const collaboraterRouter = createTRPCRouter({

    addcollaborator: protectedProcedure
    .input(z.object({
        userId: z.string(),
        projectId: z.string()
    }))
    .mutation(async({ ctx, input }) => {

        try {
            await ctx.db.collaboration.create({
                data: {
                    userId: input.userId,
                    projectId: input.projectId
                }
            })
        } catch (error) {
            console.error("Error in adding collaboration.", error);
            
        }

    }),
    getcollaborators: protectedProcedure
    .input(z.object({
        projectId: z.string()
    }))
    .query(async ({ ctx, input }) => {

        try {
            
            const projectUsers = await ctx.db.project.findUnique({
                where: {
                    id: input.projectId
                },
                include: {
                    Collaborators: {
                        include: {
                            User: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            })

            return projectUsers?.Collaborators.map(collaborator => collaborator.User) || [];

        } catch (error) {
            console.error("Error fetching collaborators.", error);
            
        }
    }),
    searchcollaborator: protectedProcedure
    .input(z.object({
        email: z.string()
    }))
    .query(async ({ ctx, input }) => {

        try {
            return  await ctx.db.user.findMany({
                where: {
                    email: {contains: input.email, mode: "insensitive"}
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

        } catch (error) {
            console.error("Error in searching collaborator.", error);
            
        }
    })
})