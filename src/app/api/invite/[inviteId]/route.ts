import { type Acceptance } from '@prisma/client'

import { getUser } from '~/lib/actions'
import { db } from '~/server/db'

export const dynamic = 'force-dynamic'

function isAcceptance(acceptance: string): acceptance is Acceptance {
    return acceptance === 'ACCEPTED' || acceptance === 'REJECTED'
}

type Params = { params: { inviteId: string } }

export async function PUT(request: Request, context: Params) {
    const inviteId = context.params.inviteId
    const res = await request.text()

    if (!isAcceptance(res)) {
        return Response.error()
    }

    try {
        if (res === 'REJECTED') {
            await db.invite.update({ where: { id: inviteId }, data: { accepted: res } })
        }

        return Response.json({ success: true })
    } catch (e) {
        return Response.error()
    }
}

// We use delete to remove invitation and add user to team
// As we don't have accepted status for invite and if invite doesn't exist we can say that user is in team
export async function DELETE(request: Request, context: Params) {
    const inviteId = context.params.inviteId

    try {
        const user = await getUser()
        if (!user) {
            return Response.error()
        }

        const invite = await db.invite.findUnique({ where: { id: inviteId } })
        if (!invite) {
            return Response.error()
        }


        await db.invite.delete({ where: { id: inviteId } })
        await db.team.update({
            where: { id: invite.teamId },
            data: {
                members: {
                    connectOrCreate: {
                        where: { id: user.id },
                        create: { id: user.id, user: { connect: { id: user.id } } },
                    },
                },
            },
        })

        const appUrl = new URL(`/app/${invite.teamId}`, request.url)
        return Response.redirect(appUrl.toString())
    } catch (e) {
        console.error(e)
        return Response.error()
    }
}
