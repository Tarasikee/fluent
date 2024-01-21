import { TeamSwitcher } from '~/app/user/@teams/_components/TeamSwitcher'
import { LogoutButton } from '~/components'
import { getUser } from '~/lib/actions'
import { db } from '~/server/db'

import { CreateTeamModal } from './_components/CreateTeamModal'
import { ProfileInfo } from './_components/ProfileInfo'
import { Separator } from './_components/Separator'

export default async function Page() {
    const user = await getUser()
    const myTeams = await db.team.findMany({ where: { members: { some: { user: user! } } } })
    const isMember = myTeams.length > 0

    return (
        <div className="grid gap-6">
            <LogoutButton className="absolute top-2 right-2"/>
            {user?.name && <ProfileInfo username={user.name} isMember={isMember} teamsAmount={myTeams.length}/>}
            <CreateTeamModal/>
            {isMember && <>
                <Separator/>
                <TeamSwitcher teams={myTeams}/>
            </>}
        </div>
    )
}
