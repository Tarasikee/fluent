'use client'

import { BellIcon } from '@radix-ui/react-icons'
import { type FC, useState } from 'react'

import { Typography } from '~/components'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

export const Notifications: FC = () => {
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)

    return (
        <Popover defaultOpen open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size="icon" variant="outline">
                    <BellIcon/>
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end">
                <Typography.H4>Notifications</Typography.H4>
            </PopoverContent>
        </Popover>
    )
}
