'use client'

import { Button } from '~/components/ui/button'
import { signOut } from 'next-auth/react'
import { type FC, type ComponentProps } from 'react'

type Props = Omit<ComponentProps<typeof Button>, 'onClick' | 'variant'>

export const LogoutButton: FC<Props> = props => (
    <Button onClick={() => signOut()} variant="secondary" {...props}>
        Logout
    </Button>
)
