'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'

import { Button } from '~/components/ui/button'

type Props = {
    href: string
    label: string
}

export const NavLink: FC<Props> = ({ href, label }) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Button asChild variant={isActive ? 'default' : 'ghost'}>
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}
