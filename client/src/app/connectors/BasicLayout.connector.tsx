import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { BasicLayout } from '../components/BasicLayout'
import { FC } from 'react'
import { FullScreenLoader } from '~/components'
import storageToken from '~/common/storageToken'
import { useCheckQuery } from '~/store/api/userApi'

export const BasicLayoutConnector: FC = () => {
    const token = storageToken.get()
    const location = useLocation()
    const { isLoading } = useCheckQuery(undefined, { skip: !token })

    function logout() {
        storageToken.remove()
        window.location.reload()
    }

    if (location.pathname === '/') {
        return <Navigate to="/login" replace/>
    }

    return (
        <BasicLayout>
            {isLoading ? <FullScreenLoader/> : <Outlet/>}
        </BasicLayout>
    )
}
