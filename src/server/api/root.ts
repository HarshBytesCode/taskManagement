import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authenticationRouter } from "./routers/authentication";
import { projectRouter } from "./routers/project";
import { taskRouter } from "./routers/task";
import { collaboraterRouter } from "./routers/collaborator";


export const appRouter = createTRPCRouter({
  authentication: authenticationRouter,
  project: projectRouter,
  task: taskRouter,
  collaborator: collaboraterRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
