'use client'

import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'

import { invitesWithTeamAtom, invitesWithTeamCountAtom } from './atoms'

export const AcceptButton = () => {
    return null
    // const router = useRouter()
    //
    // const [invitesWithTeam, setInvitesWithTeam] = useAtom(invitesWithTeamAtom)
    // const invitesCount = useAtomValue(invitesWithTeamCountAtom)
    //
    // async function acceptInvite(id: string, teamId: string) {
    //     try {
    //         await fetch(`/api/invite/${id}`, { method: 'DELETE' }).then((response) => {
    //             if (response.ok) return response.json()
    //             throw new Error('Something went wrong')
    //         })
    //         toast.success('Invitation accepted. Redirecting...')
    //         router.push(`/app/${teamId}`)
    //     } catch {
    //         toast.error('Failed to accept invite. Try again later.')
    //     }
    // }
    //
    // return (
    //     <Button size="sm" onClick={() => acceptInvite(invite.id, invite.team.id)}>
    //         Accept
    //     </Button>
    // )
}
