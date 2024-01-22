'use server'

import { getServerAuthSession } from '~/server/auth'
import { db } from '~/server/db'

export async function getUser() {
    const session = await getServerAuthSession()
    if (!session?.user?.id) return null
    return db.user.findUnique({ where: { id: session.user.id } })
}

export async function getUserTeams() {
    const user = await getUser()
    return db.team.findMany({ where: { members: { some: { user: user! } } } })
}
