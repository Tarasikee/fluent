'use client'

import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Typography } from '~/components'
import { Button } from '~/components/ui/button'
import { PopoverContent } from '~/components/ui/popover'
import { Separator } from '~/components/ui/separator'

import { invitesWithTeamAtom, invitesWithTeamCountAtom } from './atoms'

export const Content = () => {
    const router = useRouter()

    const [invitesWithTeam, setInvitesWithTeam] = useAtom(invitesWithTeamAtom)
    const invitesCount = useAtomValue(invitesWithTeamCountAtom)

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

    async function acceptInvite(id: string) {
        try {
            const response = await fetch(`/api/invite/${id}`, { method: 'DELETE', redirect: 'follow' })
            router.push(response.url)
            toast.success('Invitation accepted. Redirecting...')
        } catch {
            toast.error('Failed to accept invite. Try again later.')
        } finally {

        }
    }

    return (
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
                        <Button size="sm" onClick={() => acceptInvite(invite.id)}>
                            Accept
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => declineInvite(invite.id)}>
                            Decline
                        </Button>
                    </div>
                    <Separator className="my-2"/>
                </div>,
            )}
        </PopoverContent>
    )
}
