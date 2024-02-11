import Link from 'next/link'

import { Typography, UserLayout } from '~/components'
import { Button } from '~/components/ui/button'

export default function NotFound() {
    return (
        <UserLayout>
            <Typography.H1>404</Typography.H1>
            <Typography.H2>Page not found</Typography.H2>
            <p className="text-gray-500">The page you are looking for does not exist.</p>

            <Button className="mt-5" asChild>
                <Link href={'/user'} replace>
                    Go back to the user page
                </Link>
            </Button>
        </UserLayout>
    )
}
