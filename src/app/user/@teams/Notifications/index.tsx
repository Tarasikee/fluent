'use client'

import { type Invite, type Team } from '@prisma/client'
import { useSetAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { type FC, useEffect } from 'react'

import { Popover } from '~/components/ui/popover'
import { clientOnInvite, clientSubscribeToInvite, clientUnsubscribeFromInvite } from '~/lib/pusher/invite'

import { invitesWithTeamAtom } from './atoms'
import { Content } from './Content'
import { Trigger } from './Trigger'

type InviteWithTeam = Invite & { team: Team }

type Props = {
    userEmail: string | null
    invitesWithTeam: InviteWithTeam[]
}

export const Notifications: FC<Props> = ({ invitesWithTeam: invitesWithTeamFromServer, userEmail }) => {
    useHydrateAtoms([[invitesWithTeamAtom, invitesWithTeamFromServer]])
    const setInvitesWithTeam = useSetAtom(invitesWithTeamAtom)

    useEffect(() => {
        if (!userEmail) return
        clientSubscribeToInvite(userEmail)

        clientOnInvite((inviteWithTeam: InviteWithTeam) => {
            setInvitesWithTeam((prev) => {
                if (prev.some((invite) => invite.id === inviteWithTeam.id)) {
                    return prev
                }

                return [...prev, inviteWithTeam]
            })
        })

        return () => {
            clientUnsubscribeFromInvite(userEmail)
        }
    }, [setInvitesWithTeam, userEmail])

    return (
        <Popover>
            <Trigger/>
            <Content/>
        </Popover>
    )
}
