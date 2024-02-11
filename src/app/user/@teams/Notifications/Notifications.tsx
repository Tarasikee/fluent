'use client'

import { type Invite, type Team } from '@prisma/client'
import { BellIcon } from '@radix-ui/react-icons'
import { useAtom,useAtomValue  } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { type FC, useEffect } from 'react'

import { Typography } from '~/components'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent,PopoverTrigger } from '~/components/ui/popover'
import { Separator } from '~/components/ui/separator'
import { clientOnInvite, clientSubscribeToInvite, clientUnsubscribeFromInvite } from '~/lib/pusher/invite'

import { AcceptButton } from './AcceptButton'
import { invitesWithTeamAtom, invitesWithTeamCountAtom } from './atoms'
import { DeclineButton } from './DeclineButton'

type InviteWithTeam = Invite & { team: Team }

type Props = {
    userEmail: string | null
    invitesWithTeam: InviteWithTeam[]
}

export const Notifications: FC<Props> = ({ invitesWithTeam: invitesWithTeamFromServer, userEmail }) => {
    useHydrateAtoms([[invitesWithTeamAtom, invitesWithTeamFromServer]])

    const [invitesWithTeam, setInvitesWithTeam] = useAtom(invitesWithTeamAtom)
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
            <PopoverContent align="end" className="overflow-auto h-[400px]">
                <Typography.H4 className="mb-4">
                    Notifications ({invitesCount})
                </Typography.H4>

                {invitesWithTeam.map((invite) =>
                    <div key={invite.id} className="text-sm">
                        <p>
                            You got invited to join {' '}
                            <span className="font-bold">{invite.team.name}</span>
                        </p>
                        <div className="flex space-x-2 mt-2">
                            <AcceptButton invite={invite}/>
                            <DeclineButton invite={invite}/>
                        </div>
                        <Separator className="my-2"/>
                    </div>,
                )}
            </PopoverContent>
        </Popover>
    )
}
