import { type FC, type ReactNode } from 'react'

import { UserLayout } from '~/components'
import { getServerAuthSession } from '~/server/auth'

const Layout: FC<{ auth: ReactNode, teams: ReactNode }> = async ({ auth, teams }) => {
    const session = await getServerAuthSession()
    const isLogged = session !== null

    return (
        <UserLayout>
            {isLogged ? teams : auth}
        </UserLayout>
    )
}

export default Layout
