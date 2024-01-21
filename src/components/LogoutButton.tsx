'use client'

import { signOut } from 'next-auth/react'
import { type ComponentProps,type FC } from 'react'

import { Button } from '~/components/ui/button'

type Props = Omit<ComponentProps<typeof Button>, 'onClick' | 'variant'>

export const LogoutButton: FC<Props> = props => (
    <Button onClick={() => signOut()} variant="secondary" {...props}>
        Logout
    </Button>
)
