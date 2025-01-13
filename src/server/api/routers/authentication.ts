
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from 'bcrypt';

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";

export const authenticationRouter = createTRPCRouter({
    signup: publicProcedure
    .input(z.object({
        email: z.string(),
        password: z.string(),
        name: z.string()
    }))
    .mutation( async({ ctx, input }) => {

        try {
            
            const userExist = await ctx.db.user.findUnique({
                where: {
                    email: input.email
                }
            })

            if(userExist) {

                throw new TRPCError({
                    code: "CONFLICT",
                    message: "USer already exists."
                })
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);

            const user = await ctx.db.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    name: input.name
                }
            })

            return {
                email: user.email,
                password: user.password
            }

        } catch (error) {
            
        }
        
    })
})