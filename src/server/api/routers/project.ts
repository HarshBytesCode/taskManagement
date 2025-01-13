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
            }
        })

    }),
    addproject: protectedProcedure
    .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        expiresAt: z.date()
    }))
    .mutation(async ({ ctx, input }) => {

        try {
            console.log(ctx, "ctx");
            
            await ctx.db.project.create({
                
                data: {
                    title: input.title,
                    description: input.description,
                    expiresAt: input.expiresAt,
                    userId: ctx.session.user.id

                }
            })

        } catch (error) {
            
        }
    })
})