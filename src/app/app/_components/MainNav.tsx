'use client'

import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { usePathname } from 'next/navigation'
import { api } from '~/trpc/react'

const TextLink = ({ href, label }: { href: string, label: string }) => {
    const pathname = usePathname()
    const active = pathname === href
    const { data, isLoading } = api.teams.getMy.useQuery()

    console.log(data?.id)

    return (
        <Button asChild variant={active ? 'default' : 'disabled'}>
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}

export const MainNav = () => (
    <nav className="flex items-center space-x-6 mx-6">
        <TextLink href="/app" label="Overview"/>
        <TextLink href="/team" label="Manage team"/>
        <TextLink href="/test" label="Some random link"/>
        <TextLink href="/test" label="That are disabled"/>
        <TextLink href="/test" label="Beacuse user isn't part of a team"/>
    </nav>
)
