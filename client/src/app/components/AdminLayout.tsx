import { Button, Layout, Menu, Space, Typography } from 'antd'
import { ComponentProps, FC, PropsWithChildren, ReactNode, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Content, Sider, Header } = Layout
const { Text } = Typography

type Props = {
    onClick: ComponentProps<typeof Menu>['onClick']
    current: string
    logout: () => void
    menuItems: Array<{
        key: string
        icon: ReactNode
        label: ReactNode
        children?: Array<{
            key: number
            label: ReactNode
        }>
    }>
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({ children, logout, current, onClick, menuItems }) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => setCollapsed(prev => !prev)

    return (
        <Layout hasSider className="h-full">
            <Sider trigger={null} width={300} collapsible collapsed={collapsed}>
                <Menu onClick={onClick} selectedKeys={[current]} theme="dark" mode="inline" items={menuItems}/>
                <div className="absolute w-full px-5 bottom-5">
                    <Button
                        hidden={collapsed}
                        danger block type="primary"
                        onClick={logout}
                    >Logout</Button>
                </div>
            </Sider>
            <Layout className="h-full bg-white">
                <Header className="p-0 bg-transparent">
                    <Space>
                        <Text className="text-2xl m-2">
                            {collapsed ? <MenuUnfoldOutlined onClick={toggle}/> : <MenuFoldOutlined onClick={toggle}/>}
                        </Text>
                    </Space>
                </Header>
                <Content className="p-3">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}
