'use client'

import { BellIcon } from '@radix-ui/react-icons'
import { useAtomValue } from 'jotai'

import { Button } from '~/components/ui/button'
import { PopoverTrigger } from '~/components/ui/popover'

import { invitesWithTeamCountAtom } from './atoms'

export const Trigger = () => {
    const invitesCount = useAtomValue(invitesWithTeamCountAtom)

    return (
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
    )
}
