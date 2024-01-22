import { redirect } from 'next/navigation'
import { type FC, type PropsWithChildren } from 'react'

import { Typography } from '~/components'
import { getUser } from '~/lib/actions'
import { db } from '~/server/db'

import { MainNav } from './_components/MainNav'
import { UserNav } from './_components/UserNav'

export const metadata = {
    title: 'Overview',
}

const RootLayout: FC<PropsWithChildren<{ params: { team_id: string } }>> = async ({ children, params }) => {
    const user = await getUser()
    const teamId = params.team_id
    const team = await db.team.findUnique({
        where: {
            id: teamId,
            members: { some: { user: { id: user?.id } } },
        },
    })

    if (!team) {
        return redirect('/user')
    }

    return (
        <div className="flex flex-col">
            <div className="border-b">
                <div className="flex h-12 items-center px-4">
                    <Typography.H4>{team.name}</Typography.H4>
                    <MainNav teamId={teamId}/>

                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav/>
                    </div>
                </div>
            </div>

            <div className="mx-3 mt-5 flex flex-col flex-1">
                <div className="flex-1">{children}</div>
            </div>
        </div>
    )
}

export default RootLayout
