import { type Invite, type Team } from '@prisma/client'
import { atom } from 'jotai'


export type InviteWithTeam = Invite & { team: Team }

export const invitesWithTeamAtom = atom<InviteWithTeam[]>([])
export const invitesWithTeamCountAtom = atom(get => get(invitesWithTeamAtom).length)
