import { createTRPCRouter, protectedProcedure } from '../trpc'

export const teamRouter = createTRPCRouter({
    getMy: protectedProcedure.query(({ ctx }) => ctx.db.team.findUnique({
        where: {
            id: ctx.session.user.id,
        },
    })),
})
