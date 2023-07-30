import { ComponentProps, FC, PropsWithChildren, ReactNode, useState } from 'react'
import { Layout, Menu, Space, Typography } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Content, Sider, Header } = Layout
const { Text, Title } = Typography

type Props = {
    onClick: ComponentProps<typeof Menu>['onClick']
    current: string
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

export const AdminLayout: FC<PropsWithChildren<Props>> = ({ children, current, onClick, menuItems }) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => setCollapsed(prev => !prev)

    return (
        <Layout hasSider className="h-full">
            <Sider trigger={null} width={300} collapsible collapsed={collapsed}>
                <Menu onClick={onClick} selectedKeys={[current]} theme="dark" mode="inline"  items={menuItems}/>
            </Sider>
            <Layout className="h-full">
                <Header className="p-0 bg-transparent">
                    <Space>
                        <Text className="text-2xl m-2">
                            {collapsed ? <MenuUnfoldOutlined onClick={toggle}/> : <MenuFoldOutlined onClick={toggle}/>}
                        </Text>
                        <Title level={3} className="text-white !mb-0">
                            {menuItems.find(item => item.key === current)?.label}
                        </Title>
                    </Space>
                </Header>
                <Content className="mt-3 p-1 bg-gray-200">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}
