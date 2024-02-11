import { type FC, type PropsWithChildren } from 'react'

import { FluentLogo } from '~/components/FluentLogo'
import { Typography } from '~/components/Typography'

export const UserLayout: FC<PropsWithChildren> = ({ children }) => (
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
                {children}
            </div>
        </div>
    </div>
)
