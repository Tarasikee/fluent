import { type ReactNode } from 'react'
import { MainNav } from './_components/MainNav'
import { UserNav } from './_components/UserNav'

export const metadata = {
    title: 'Overview',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col">
            <div className="border-b">
                <div className="flex h-12 items-center px-4">
                    <MainNav/>
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav/>
                    </div>
                </div>
            </div>

            <div className="mx-3 mt-5 flex flex-col flex-1">
                <div className="flex-1">{children}</div>
            </div>
        </div>
    )
}
