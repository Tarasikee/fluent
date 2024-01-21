'use client'

import { type Team } from '@prisma/client'
import Link from 'next/link'
import { type FC, useState } from 'react'

import { Button } from '~/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

type Props = {
    teams: Team[]
}

export const TeamSwitcher: FC<Props> = ({ teams }) => {
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button>Find your team</Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search team..."/>
                        <CommandEmpty>No team found.</CommandEmpty>
                        <CommandGroup heading="Teams">
                            {teams.map((team, idx) =>
                                <CommandItem key={team.id} onSelect={close} className="text-sm">
                                    <Link href={`/app/${team.id}`}>
                                        <span className="text-gray-500 mr-2">{idx + 1}. </span>
                                        <span>{team.name}</span>
                                    </Link>
                                </CommandItem>,
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
