'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'

import { cn } from '~/lib/utils'

type Props = {
    href: string
    label: string
}

export const NavLink: FC<Props> = ({ href, label }) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link href={href} className={cn(
            'text-sm font-medium hover:text-primary',
            isActive ? 'transition-colors' : 'text-muted-foreground hover:text-primary',
        )}>
            {label}
        </Link>
    )
}
