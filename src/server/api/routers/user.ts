import { createTRPCRouter, protectedProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
    getMe: protectedProcedure.query(({ ctx }) => ctx.db.user.findUnique({
        where: {
            id: ctx.session.user.id,
        },
    })),
})
