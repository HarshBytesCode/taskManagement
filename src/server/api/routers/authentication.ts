
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from 'bcrypt';

import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
import { signupSchema } from "~/types/zodSchemas";

export const authenticationRouter = createTRPCRouter({
    signup: publicProcedure
    .input(signupSchema)
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

            const hashedPassword = input.password;

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
            console.error("Error during authentication.", error);
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error in authentication."
            })
            
        }
        
    })
})