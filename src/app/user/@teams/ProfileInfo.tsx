import { type FC } from 'react'

import { Typography } from '~/components'

type Props = {
    username: string
    isMember: boolean
    teamsAmount: number
}

export const ProfileInfo: FC<Props> = ({ isMember, teamsAmount, username }) => (
    <div>
        <Typography.H2>Hello {username}</Typography.H2>
        <p className="text-gray-500">
            {isMember ? `You are a member of ${teamsAmount} team(s).` : 'You are not a member of any teams.'}
        </p>
    </div>
)
