import { AppstoreAddOutlined, FundOutlined, HistoryOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { FC } from 'react'
import { FullScreenLoader } from '~/components'
import storageToken from '~/common/storageToken'
import { useCheckQuery } from '~/store/api/userApi'

export const AdminLayoutConnector: FC = () => {
    const { data: user, isLoading } = useCheckQuery()
    const token = storageToken.get()

    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        { key: '/admin', icon: <FundOutlined/>, label: 'Overview' },
        { key: '/admin/history', icon: <HistoryOutlined/>, label: 'History' },
        { key: '/admin/new-order', icon: <AppstoreAddOutlined/>, label: 'New order' },
        { key: '/admin/category', icon: <UnorderedListOutlined/>, label: 'Category' },
    ]

    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace/>
    }

    return (
        <AdminLayout
            current={location.pathname}
            onClick={({ key }) => navigate(key)}
            menuItems={menuItems}
        >
            {isLoading ? <FullScreenLoader/> : <Outlet/>}
        </AdminLayout>
    )
}
