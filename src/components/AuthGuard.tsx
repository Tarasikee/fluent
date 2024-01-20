'use client'

import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { type FC, type PropsWithChildren } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
    const { status } = useSession()
    const pathname = usePathname()

    if (status === 'loading') {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        )
    }

    if (pathname === '/' && status === 'unauthenticated') {
        return children
    }

    if (pathname === '/login' && status === 'unauthenticated') {
        return children
    }

    if (status === 'unauthenticated') {
        redirect('/login')
    }

    if (pathname === '/login' && status === 'authenticated') {
        redirect('/app')
    }

    return children
}
