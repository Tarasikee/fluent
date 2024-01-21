'use client'

import { redirect, usePathname } from 'next/navigation'
import { type FC, type PropsWithChildren } from 'react'

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname()

    if (pathname === '/') {
        redirect('/user')
    }

    return children
}
