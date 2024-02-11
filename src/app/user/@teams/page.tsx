import { LogoutButton } from '~/components'
import { getUser, getUserTeams } from '~/lib/actions'
import { db } from '~/server/db'

import { CreateTeamModal } from './_components/CreateTeamModal'
import { Notifications } from './_components/Notifications'
import { ProfileInfo } from './_components/ProfileInfo'
import { TeamSwitcher } from './_components/TeamSwitcher'

export default async function Page() {
    const user = await getUser()
    const userTeams = await getUserTeams()
    const invitesWithTeam = await db.invite.findMany({
        where: {
            email: user?.email ?? undefined,
        },
        include: {
            team: true,
        },
    })
    const isMember = userTeams.length > 0

    return (
        <div className="grid gap-6">
            <div className="flex space-x-4 absolute top-2 right-2">
                <Notifications userEmail={user?.email ?? null} invitesWithTeam={invitesWithTeam}/>
                <LogoutButton/>
            </div>

            {user?.name && <ProfileInfo username={user.name} isMember={isMember} teamsAmount={userTeams.length}/>}

            <CreateTeamModal/>

            {isMember && <>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">or enter your team</span>
                    </div>
                </div>
                <TeamSwitcher teams={userTeams}/>
            </>}
        </div>
    )
}
