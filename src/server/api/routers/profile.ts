import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { updateProfile } from "~/types/zodSchemas";






export const profileRouter = createTRPCRouter({

    getprofiledetails: protectedProcedure
    .query(async({ ctx }) => {

        try {
            
            return await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id
                },
                select: {
                    name: true,
                    email: true
                }
            })

        } catch (error) {

            console.error("Error getting profile details.", error);
        }
    }),
    updateprofile: protectedProcedure
    .input(updateProfile)
    .mutation(async ({ ctx, input }) => {

        try {
            
            await ctx.db.user.update({
                where: {
                    id: ctx.session.user.id
                },
                data: {
                    name: input.name,
                    email: input.email
                }
            })

        } catch (error) {
            console.error("Error while updating profile", error);
            
        }
    })
})