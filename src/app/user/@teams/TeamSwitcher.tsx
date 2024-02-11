import { type Team } from '@prisma/client'
import Link from 'next/link'
import { type FC } from 'react'

import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'

type Props = {
    teams: Team[]
}

export const TeamSwitcher: FC<Props> = ({ teams }) => (
    <ScrollArea className="max-h-72 w-full rounded-md border">
        <div className="p-4">
            {teams.map((team, idx) =>
                <Link key={team.id} href={`/app/${team.id}`}>
                    <span>{team.name}</span>
                    <Separator className={cn(idx === teams.length - 1 ? 'hidden' : 'my-2')}/>
                </Link>,
            )}
        </div>
    </ScrollArea>
)
