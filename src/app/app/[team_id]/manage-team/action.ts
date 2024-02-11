'use server'

import { z } from 'zod'

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
        const isUserAlreadyInTeam = await db.team.findFirst({ where: { id: teamId, members: { some: { user: { email } } } } })

        if (isUserAlreadyInTeam) {
            return {
                errors: { email: 'User is already in the team' },
            }
        }

        const isEmailAlreadyInvited = await db.invite.findFirst({ where: { email, teamId } })

        if (isEmailAlreadyInvited) {
            return {
                errors: { email: 'User is already invited. Please wait for the user to accept the invitation' },
            }
        }

        const inviteWithTeam = await db.invite.create({ data: { email, teamId }, include: { team: true } })
        await serverInvite(email, inviteWithTeam)

    } catch (error) {
        return {
            errors: { email: 'Something went wrong, try again or later' },
        }
    }

    return { success: true }
}
