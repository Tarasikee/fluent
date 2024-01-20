'use client'

import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { type FC, type PropsWithChildren } from 'react'

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
    const { status } = useSession()
    const pathname = usePathname()

    if (status === 'loading') {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-10">
                    App is loading :)
                </p>
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

export default AuthGuard
