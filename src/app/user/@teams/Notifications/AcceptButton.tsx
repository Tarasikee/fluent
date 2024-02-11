import { type Invite } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FC, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'

type Props = {
    invite: Invite
}

export const AcceptButton: FC<Props> = ({ invite }) => {
    const [isAccepting, setIsAccepting] = useState(false)
    const router = useRouter()

    async function acceptInvite(id: string) {
        try {
            setIsAccepting(true)
            const response = await fetch(`/api/invite/${id}`, { method: 'DELETE', redirect: 'follow' })
            router.push(response.url)
            toast.success('Invitation accepted. Redirecting...')
        } catch {
            toast.error('Failed to accept invite. Try again later.')
        } finally {
            setIsAccepting(false)
        }
    }

    return (
        <Button size="sm" onClick={() => acceptInvite(invite.id)}>
            {isAccepting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {isAccepting ? 'Accepting...' : 'Accept'}
        </Button>
    )
}
