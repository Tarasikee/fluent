import { Navigate, Outlet } from 'react-router-dom'
import { FC } from 'react'
import { useCheckQuery } from '~/store/api/userApi'

export const RedirectLoggedIn: FC = () => {
    const { data: user } = useCheckQuery()

    if (user) {
        return <Navigate to={'/admin'} replace/>
    }

    return <Outlet/>
}
