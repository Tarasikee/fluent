import { type FC, type ReactNode } from 'react'

import { FluentLogo, Typography } from '~/components'
import { getServerAuthSession } from '~/server/auth'

const Layout: FC<{ auth: ReactNode, teams: ReactNode }> = async ({ auth, teams }) => {
    const session = await getServerAuthSession()
    const isLogged = session !== null

    return (
        <div className="h-screen grid grid-cols-2">
            <div className="bg-zinc-900 p-10 text-white">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex items-center justify-start">
                        <FluentLogo className="w-[90px]"/>
                        <Typography.H1>Fluent</Typography.H1>
                    </div>
                    <p>
                        Fluent is a bug tracking tool that helps you plan, manage, and release great software.
                    </p>
                </div>
            </div>
            <div className="flex w-full justify-center items-center">
                <div className="p-8 w-[500px]">
                    {isLogged ? teams : auth}
                </div>
            </div>
        </div>
    )
}

export default Layout
