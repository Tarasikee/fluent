'use client'

import { signOut } from 'next-auth/react'
import { type FC } from 'react'

import { Button } from '~/components/ui/button'

export const LogoutButton: FC = () => <Button onClick={() => signOut()} variant="outline"> Logout</Button>

