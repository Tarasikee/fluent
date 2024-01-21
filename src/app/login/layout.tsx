import { FluentLogo, Typography } from '~/components'
import { type FC, type ReactNode } from 'react'
import { getServerAuthSession } from '~/server/auth'

const Layout: FC<{ auth: ReactNode, teams: ReactNode }> = async ({ auth, teams }) => {
    const session = await getServerAuthSession()
    const isLogged = session !== null

    return (
        <div
            className="h-screen max-w-none grid grid-cols-1 container relative flex-col items-center justify-center px-0 lg:grid-cols-2">
            <div className="relative hidden h-full flex-col items-center bg-zinc-900 p-10 text-white lg:flex">
                <FluentLogo className="w-full h-full"/>
                <Typography.H1>Fluent</Typography.H1>
                <p>The bug tracking system</p>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    {isLogged ? teams : auth}
                </div>
            </div>
        </div>
    )
}

export default Layout
