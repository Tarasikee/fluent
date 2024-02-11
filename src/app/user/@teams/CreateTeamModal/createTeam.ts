'use server'

import { type Team } from '@prisma/client'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getUser } from '~/lib/actions'
import { db } from '~/server/db'

const schema = z.object({
    teamName: z
        .string({ invalid_type_error: 'Invalid team name' })
        .min(5, { message: 'Team name must be at least 5 characters' }),
})

export async function createTeam(_: unknown, formData: FormData) {
    'use server'

    const validatedFields = schema.safeParse({
        teamName: formData.get('teamName'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const teamName = validatedFields.data.teamName
    let newTeam: Team

    try {
        const user = await getUser()

        if (user === undefined || user === null) {
            return { errors: { teamName: 'User not found' } }
        }

        newTeam = await db.team.create({
            data: {
                name: teamName,
                members: {
                    create: {
                        user: { connect: { id: user.id } },
                        role: 'ADMIN',
                    },
                },
                creatorId: user.id,
            },
        })
        redirect(`/app/${newTeam.id}`)
    } catch (e) {
        return { errors: { teamName: 'Something went wrong, try again or later' } }
    }
}
