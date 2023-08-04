import { Route, Routes } from 'react-router-dom'
import { AdminLayoutConnector } from './connectors/AdminLayout.connector'
import { BasicLayoutConnector } from './connectors/BasicLayout.connector'
import CategoryIdPage from './pages/Admin/Category/pages/[categoryId]/[categoryId].page'
import CategoryPage from './pages/Admin/Category/Category.page'
import { FC } from 'react'
import LoginPage from './pages/Login/Login.page'
import { RedirectLoggedIn } from './connectors/RedirectLoggedIn'
import RegisterPage from './pages/Register/Register.page'

const AppPage: FC = () => (
    <Routes>
        <Route path="" element={<BasicLayoutConnector/>}>
            <Route path="" element={<RedirectLoggedIn/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
            </Route>

            <Route path="admin" element={<AdminLayoutConnector/>}>
                <Route path="" element={<div/>} />
                <Route path="history" element={<div/>} />
                <Route path="new-order" element={<div/>} />

                <Route path="category">
                    <Route path="" element={<CategoryPage/>} />
                    <Route path=":categoryId" element={<CategoryIdPage/>} />
                </Route>
            </Route>
        </Route>
    </Routes>
)

export default AppPage
