'use client'

import { type Invite } from '@prisma/client'
import { useAtom } from 'jotai/index'
import { type FC } from 'react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'

import { invitesWithTeamAtom } from './atoms'

type Props = {
    invite: Invite
}

export const DeclineButton: FC<Props> = ({ invite }) => {
    const [invitesWithTeam, setInvitesWithTeam] = useAtom(invitesWithTeamAtom)

    async function declineInvite(id: string) {
        const inviteToRemove = invitesWithTeam.find((invite) => invite.id === id)

        try {
            setInvitesWithTeam((invites) => invites.filter((invite) => invite.id !== id))
            await fetch(`/api/invite/${id}`, { method: 'PUT', body: 'REJECTED' }).then((response) => {
                if (response.ok) return response.json()
                throw new Error('Something went wrong')
            })
        } catch (error) {
            if (!inviteToRemove) return
            setInvitesWithTeam((invites) => [...invites, inviteToRemove])
            toast.error('Failed to decline invite. Try again later.')
        }
    }

    return (
        <Button size="sm" variant="destructive" onClick={() => declineInvite(invite.id)}>
            Decline
        </Button>
    )
}
