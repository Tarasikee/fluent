'use client'

import { EnterIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'
import * as React from 'react'
import { signIn } from 'next-auth/react'

export const LoginButton = () => (
    <Button onClick={() => signIn('google')} variant="outline" type="button">
        <EnterIcon className="mr-2 h-4 w-4"/>
        Google
    </Button>
)
