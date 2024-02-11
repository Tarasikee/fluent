import { type Invite, type Team } from '@prisma/client'

import { pusherClient,pusherServer } from '~/lib/pusher/index'

type InviteWithTeam = Invite & { team: Team }
export const INVITE = 'INVITE_EVENT'

export const clientSubscribeToInvite = (userEmail: string) => pusherClient.subscribe(userEmail)
export const clientUnsubscribeFromInvite = (userEmail: string) => pusherClient.unsubscribe(userEmail)

export const clientOnInvite = (callback: (inviteWithTeam: InviteWithTeam) => void) => pusherClient.bind(INVITE, callback)

export function serverInvite(email: string, inviteWithTeam: InviteWithTeam) {
    return pusherServer.trigger(email, INVITE, inviteWithTeam)
}
