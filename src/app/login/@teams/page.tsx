import { Typography, LogoutButton } from '~/components'
import { api } from '~/trpc/server'
import { getServerAuthSession } from '~/server/auth'
import { Button } from '~/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

export default async function Page() {
    const session = await getServerAuthSession()
    const teams = await api.teams.getMy.query()
    const isMember = teams.length > 0

    return (
        <div className="grid gap-6">
            <LogoutButton className="absolute top-2 right-2" />

            <div>
                <Typography.H2>Hello {session?.user.name}</Typography.H2>
                <p className="text-gray-500">
                    {isMember ? `You are a member of ${teams.length} team(s).` : 'You are not a member of any teams.'}
                </p>
            </div>

            <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4"/>
                Create a team
            </Button>

            {isMember && (
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">or enter your team</span>
                    </div>
                </div>
            )}
        </div>
    )
}
