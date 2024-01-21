import { createTRPCRouter, protectedProcedure } from '../trpc'

export const teamRouter = createTRPCRouter({
    getMy: protectedProcedure.query(({ ctx }) => ctx.db.team.findMany({
        where: {
            members: {
                some: {
                    userId: ctx.session.user.id,
                },
            },
        },
    })),
})
