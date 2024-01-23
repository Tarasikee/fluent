import { Notifications } from '~/app/user/@teams/_components/Notifications'
import { LogoutButton } from '~/components'
import { getUser, getUserTeams } from '~/lib/actions'

import { CreateTeamModal } from './_components/CreateTeamModal'
import { ProfileInfo } from './_components/ProfileInfo'
import { Separator } from './_components/Separator'
import { TeamSwitcher } from './_components/TeamSwitcher'

export default async function Page() {
    const user = await getUser()
    const userTeams = await getUserTeams()
    const isMember = userTeams.length > 0

    return (
        <div className="grid gap-6">
            <div className="flex space-x-4 absolute top-2 right-2">
                <Notifications/>
                <LogoutButton/>
            </div>
            {user?.name && <ProfileInfo username={user.name} isMember={isMember} teamsAmount={userTeams.length}/>}
            <CreateTeamModal/>
            {isMember && <>
                <Separator/>
                <TeamSwitcher teams={userTeams}/>
            </>}
        </div>
    )
}
