import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createProjectSchema } from "~/types/zodSchemas";


export const projectRouter = createTRPCRouter({

    getprojects: protectedProcedure
    .query(async ({ ctx }) => {
        console.log(ctx, "ctx");
        
        const userId = ctx.session.user.id

        return await ctx.db.project.findMany({
            where: {
                userId
            },
            include: {
                User: {
                    select: {
                        name: true
                    },
                }
            }
        })

    }),
    addproject: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {

        try {

            const expiresAt = new Date(input.expiresAt)
            
            const project = await ctx.db.project.create({
                
                data: {
                    title: input.title,
                    description: input.description,
                    expiresAt: expiresAt,
                    userId: ctx.session.user.id

                }
            })

            await ctx.db.collaboration.create({
                data: {
                    userId: ctx.session.user.id,
                    projectId: project.id
                }
            })

        } catch (error) {
            console.error("Error in creating project.", error);
            
        }
    }),
    deleteproject: protectedProcedure
    .input(z.object({
        projectId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {

        try {
            
            await ctx.db.project.delete({
                where: {
                    id: input.projectId
                }
            })

        } catch (error) {
            console.error("Error in deleting project.", error);
            
        }
    })
})