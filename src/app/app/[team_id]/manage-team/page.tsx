import { getUser } from '~/lib/actions'
import { db } from '~/server/db'

import { AddTeamMember } from './AddTeamMember/AddTeamMember'
import { TableFilters } from './TeamTable/TableFilters'
import { TeamTable } from './TeamTable/TeamTable'

export default async function Page({ params }: { params: { team_id: string } }) {
    const teamId = params.team_id
    const currentUser = await getUser()
    const member = await db.member.findFirst({ where: { userId: currentUser?.id, teamId } })

    return (
        <div>
            <div className="flex justify-between items-center">
                <TableFilters/>
                {member?.role !== 'MEMBER' && <AddTeamMember/>}
            </div>

            <TeamTable />
        </div>
    )
}
