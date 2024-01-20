import Link from 'next/link'
import { Button } from '~/components/ui/button'

const TextLink = ({ href, label }: { href: string, label: string }) => (
    <Button asChild variant="link">
        <Link href={href}>
            {label}
        </Link>
    </Button>
)

export const MainNav = () => (
    <nav className="flex items-center space-x-6">
        <TextLink href="/app" label="Overview"/>
    </nav>
)
