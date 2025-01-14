import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";


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
    .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        expiresAt: z.string(),
    }))
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
    })
})