'use client'

import { CaretSortIcon, CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { Avatar, AvatarFallback,AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

export const TeamSwitcher = () => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a team"
                    className="w-[200px] justify-between"
                >
                    <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                            className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search team..."/>
                        <CommandEmpty>No team found.</CommandEmpty>
                        <CommandGroup heading="Teams">
                            <CommandItem onSelect={() => setOpen(false)} className="text-sm">
                                <Avatar className="mr-2 h-5 w-5">
                                    <AvatarFallback>T</AvatarFallback>
                                </Avatar>
                                Team 1
                                <CheckIcon className="ml-auto h-4 w-4 opacity-100"/>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={() => setOpen(false)}>
                                <PlusCircledIcon className="mr-2 h-5 w-5"/>
                                Create Team
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
