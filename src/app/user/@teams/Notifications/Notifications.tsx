'use client'

import { type Invite, type Team } from '@prisma/client'
import { BellIcon } from '@radix-ui/react-icons'
import { useAtomValue, useSetAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { type FC, useEffect } from 'react'

import { Button } from '~/components/ui/button'
import { Popover, PopoverTrigger } from '~/components/ui/popover'
import { clientOnInvite, clientSubscribeToInvite, clientUnsubscribeFromInvite } from '~/lib/pusher/invite'

import { invitesWithTeamAtom, invitesWithTeamCountAtom } from './atoms'
import { Content } from './Content'

type InviteWithTeam = Invite & { team: Team }

type Props = {
    userEmail: string | null
    invitesWithTeam: InviteWithTeam[]
}

export const Notifications: FC<Props> = ({ invitesWithTeam: invitesWithTeamFromServer, userEmail }) => {
    useHydrateAtoms([[invitesWithTeamAtom, invitesWithTeamFromServer]])
    const setInvitesWithTeam = useSetAtom(invitesWithTeamAtom)
    const invitesCount = useAtomValue(invitesWithTeamCountAtom)

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
            <PopoverTrigger asChild>
                <Button size="icon" variant="outline" className="relative">
                    <BellIcon/>
                    {invitesCount > 0 &&
                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary border-2 border-white rounded-full -top-2 -end-2">
                            {invitesCount}
                        </div>
                    }
                </Button>
            </PopoverTrigger>
            <Content/>
        </Popover>
    )
}
