import { type FC } from 'react'

import { NavLink } from './NavLink'

export const MainNav: FC<{ teamId: string }> = async ({ teamId }) => {
    const mainUrl = `/app/${teamId}`

    const routes = [
        { href: mainUrl, label: 'Overview' },
        { href: `${mainUrl}/manage-team`, label: 'Manage team' },
    ]

    return (
        <nav className="flex items-center space-x-6 mx-6">
            {routes.map(props => <NavLink key={props.href} {...props}/>)}
        </nav>
    )
}
