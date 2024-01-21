'use client'

import { GitHubLogoIcon, VercelLogoIcon } from '@radix-ui/react-icons'
import { signIn } from 'next-auth/react'

import { Button } from '~/components/ui/button'

export const LoginButton = () => (
    <div className="flex flex-col space-y-3">
        <Button onClick={() => signIn('google')} variant="blue">
            Google
        </Button>
        <Button onClick={() => signIn('google')}>
            <GitHubLogoIcon className="mr-2 h-4 w-4"/>
            GitHub
        </Button>
        <Button onClick={() => signIn('google')} variant='outline'>
            <VercelLogoIcon className="mr-2 h-4 w-4"/>
            Vercel
        </Button>
    </div>
)
