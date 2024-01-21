'use client'

import { usePathname } from 'next/navigation'
import { Button } from '~/components/ui/button'
import Link from 'next/link'
import { type FC } from 'react'

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
