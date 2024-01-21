import { redirect } from 'next/navigation'
import { type FC, type PropsWithChildren } from 'react'

import { db } from '~/server/db'

import { MainNav } from './_components/MainNav'
import { TeamSwitcher } from './_components/TeamSwitcher'
import { UserNav } from './_components/UserNav'

export const metadata = {
    title: 'Overview',
}

const RootLayout: FC<PropsWithChildren<{ params: { team_id: string } }>> = async ({ children, params }) => {
    const teamId = params.team_id
    const team = await db.team.findUnique({ where: { id: teamId } })


    if (!team) {
        return redirect('/user')
    }

    return (
        <div className="flex flex-col">
            <div className="border-b">
                <div className="flex h-12 items-center px-4">
                    <TeamSwitcher/>
                    <MainNav/>

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
