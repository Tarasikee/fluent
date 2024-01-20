'use client'

import { SessionProvider } from 'next-auth/react'
import { type FC, type PropsWithChildren } from 'react'

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => (
    <SessionProvider>
        {children}
    </SessionProvider>
)
