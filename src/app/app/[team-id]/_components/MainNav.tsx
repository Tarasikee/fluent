import { NavLink } from './NavLink'

const routes = [
    { href: '/app', label: 'Overview' },
    { href: '/app/test', label: 'Test' },
    { href: '/app/team', label: 'Manage team' },
] as const

export const MainNav = async () => (
    <nav className="flex items-center space-x-6 mx-6">
        {routes.map(props => <NavLink key={props.href} {...props}/>)}
    </nav>
)
