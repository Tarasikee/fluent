import { createTRPCRouter } from '~/server/api/trpc'
import { userRouter } from './routers/user'
import { teamRouter } from './routers/team'

export const appRouter = createTRPCRouter({
    users: userRouter,
    teams: teamRouter
})

export type AppRouter = typeof appRouter;
