'use server'

import { z } from 'zod'

import { getUser } from '~/lib/actions'
import { serverInvite } from '~/lib/pusher/invite'
import { db } from '~/server/db'

const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    teamId: z.string(),
})

export async function sendInvite(_: unknown, formData: FormData) {
    'use server'

    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        teamId: formData.get('teamId'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, teamId } = validatedFields.data

    try {
        const currentUser = await getUser()
        if (!currentUser) {
            return {
                errors: { email: 'Something went wrong, try again or later' },
            }
        }

        const member = await db.member.findFirst({ where: { userId: currentUser?.id, teamId } })
        if (!member || member.role !== 'ADMIN') {
            return {
                errors: { email: 'You are not allowed to invite members' },
            }
        }


        const isUserAlreadyInTeam = await db.team.findFirst({ where: { id: teamId, members: { some: { user: { email } } } } })
        if (isUserAlreadyInTeam) {
            return {
                errors: { email: 'User is already in the team' },
            }
        }

        const isPending = await db.invite.findFirst({ where: { email, teamId, accepted: 'PENDING' } })
        if (isPending) {
            return {
                errors: { email: 'User is already invited. Please wait for the user to accept the invitation' },
            }
        }

        const isRejected = await db.invite.findFirst({ where: { email, teamId, accepted: 'REJECTED' } })
        if (isRejected) {
            return {
                errors: { email: 'User rejected the invitation. Re-request it in canceled invites tab' },
            }
        }

        const inviteWithTeam = await db.invite.create({ data: { email, teamId }, include: { team: true } })
        await serverInvite(email, inviteWithTeam)
        return { success: true }

    } catch (error) {
        return {
            errors: { email: 'Something went wrong, try again or later' },
        }
    }
}
